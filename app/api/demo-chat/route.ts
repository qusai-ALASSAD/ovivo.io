import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

const languageNames = { de: 'German', en: 'English', ar: 'Arabic' } as const;
type DemoLanguage = keyof typeof languageNames;

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expectedOrigin = new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
  const limit = rateLimit('ovivo-demo:' + ip, 8, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Rate limit reached' }, { status: 429, headers: { 'Retry-After': '60' } });
  }

  const key = process.env.OPENAI_API_KEY;
  const n8nEndpoint = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!key && !n8nEndpoint) return NextResponse.json({ error: 'Demo not configured' }, { status: 503 });

  let parsed: unknown;
  try { parsed = await request.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!parsed || typeof parsed !== 'object') return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const body = parsed as Record<string, unknown>;
  if (typeof body.message !== 'string' || body.message.trim().length < 2 || body.message.length > 400) {
    return NextResponse.json({ error: 'Message must be 2–400 characters' }, { status: 400 });
  }
  const lang: DemoLanguage = body.lang === 'en' || body.lang === 'ar' ? body.lang : 'de';


  // Optional production n8n agent: one isolated request per visitor, no shared conversation state.
  if (n8nEndpoint) {
    const token = process.env.N8N_CHAT_WEBHOOK_TOKEN;
    let webhook: URL;
    try {
      webhook = new URL(n8nEndpoint);
      if (webhook.protocol !== 'https:' || !webhook.pathname.includes('/webhook/') || !token) throw new Error('Invalid webhook config');
    } catch {
      return NextResponse.json({ error: 'n8n chat integration not configured securely' }, { status: 503 });
    }
    const requestId = randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(webhook.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Ovivo-Demo-Token': token },
        body: JSON.stringify({ requestId, lang, message: body.message.trim(), demo: true }),
        signal: controller.signal,
        cache: 'no-store',
        redirect: 'error',
      });
      if (!response.ok) return NextResponse.json({ error: 'n8n agent unavailable' }, { status: 502 });
      const result: unknown = await response.json();
      if (!result || typeof result !== 'object') return NextResponse.json({ error: 'Invalid agent response' }, { status: 502 });
      const data = result as Record<string, unknown>;
      if (data.requestId !== requestId || typeof data.answer !== 'string' || !data.answer.trim()) {
        return NextResponse.json({ error: 'Agent response not verified' }, { status: 502 });
      }
      return NextResponse.json({ answer: data.answer.slice(0, 1500), provider: 'n8n' }, { headers: { 'Cache-Control': 'no-store' } });
    } catch {
      return NextResponse.json({ error: 'n8n agent temporarily unavailable' }, { status: 503 });
    } finally { clearTimeout(timeout); }
  }
  const prompt = 'You are the OVIVO.IO demo AI assistant. Reply briefly in ' + languageNames[lang] + '. Explain how AI automation, customer-service chatbots, voice assistants, CRM integrations and workflows can help small and medium sized businesses. Webdesign and marketing are complementary offerings. Do not claim guaranteed results, real customer case studies or specific statistics. Do not request personal information. This is a demonstration, not a booking service, and cannot perform real-world actions. Keep responses under 130 words and offer a consultation when useful.';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 13000);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model: process.env.OVIVO_DEMO_MODEL || 'gpt-4o-mini',
        max_tokens: 230,
        temperature: 0.4,
        messages: [{ role: 'system', content: prompt }, { role: 'user', content: body.message.trim() }],
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) return NextResponse.json({ error: 'AI provider unavailable' }, { status: 502 });
    const result = await response.json();
    const answer = result?.choices?.[0]?.message?.content;
    if (typeof answer !== 'string') return NextResponse.json({ error: 'No answer generated' }, { status: 502 });
    return NextResponse.json({ answer: answer.slice(0, 1500) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Demo temporarily unavailable' }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
