import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { buildSystemPrompt } from '@/lib/plan-prompts';
import type { Plan } from '@/lib/chat-usage';

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) return new Response(JSON.stringify({ error: 'Invalid origin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  if (!String(req.headers.get('content-type') || '').includes('application/json')) return new Response(JSON.stringify({ error: 'JSON required' }), { status: 415 });
  if (Number(req.headers.get('content-length') || 0) > 20000) return new Response(JSON.stringify({ error: 'Request too large' }), { status: 413 });
  const ip = (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown').split(',')[0].trim();
  const { allowed } = rateLimit(`chat:${ip}`, 30, 60_000);

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please slow down.' }),
      { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
    );
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    const messages: { role: string; content: string }[] = body.messages ?? [];
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 20 ||
      messages.some((m: unknown) => !m || typeof m !== 'object' ||
        !['user', 'assistant'].includes(String((m as Record<string, unknown>).role)) ||
        typeof (m as Record<string, unknown>).content !== 'string' ||
        (m as { content: string }).content.length > 1800)) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const mode: string = typeof body.mode === 'string' && ['sales', 'general'].includes(body.mode) ? body.mode : 'general';
    // Public endpoint: do not trust a client-supplied paid plan to raise token limits.
    const plan: Plan = 'free';

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = buildSystemPrompt(mode, plan);
    const maxTokens = mode === 'sales' ? 700 : 1100;

    const openAIMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        stream: true,
        max_tokens: maxTokens,
        temperature: 0.65,
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `OpenAI error: ${response.status}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices?.[0]?.delta?.content;
                if (token) {
                  controller.enqueue(new TextEncoder().encode(token));
                }
              } catch {}
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
