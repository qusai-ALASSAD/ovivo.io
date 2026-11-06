import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

const steps = ['received', 'classified', 'crm_demo', 'confirmation_demo', 'team_notification_demo'];

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  if (Number(request.headers.get('content-length') || 0) > 2048) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }
  const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
  const limit = rateLimit('n8n-demo:' + ip, 3, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '60' } });
  }

  const endpoint = process.env.N8N_DEMO_WEBHOOK_URL;
  const token = process.env.N8N_DEMO_WEBHOOK_TOKEN;
  if (!endpoint || !token) {
    return NextResponse.json({ error: 'Workflow demo not connected', code: 'NOT_CONFIGURED' }, { status: 503 });
  }
  let url: URL;
  try {
    url = new URL(endpoint);
    if (url.protocol !== 'https:' || !url.hostname || !url.pathname.includes('/webhook/')) throw new Error('Invalid URL');
  } catch {
    return NextResponse.json({ error: 'Invalid server configuration' }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Only send anonymized, fixed demonstration data; do not forward visitor PII.
  const lang = body.lang === 'en' || body.lang === 'ar' ? body.lang : 'de';
  const scenario = ['booking', 'lead', 'support'].includes(String(body.scenario)) ? body.scenario : 'booking';
  const runId = randomUUID();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    // Workflow should use Respond to Webhook with JSON:
    // { "runId": "<echo input.runId>", "status": "completed", "steps": ["received",...]}
    // Each demo scenario must run with sandbox/test connections, NEVER live customer messages.
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ovivo-Demo-Token': token,
        'X-Ovivo-Run-Id': runId,
      },
      body: JSON.stringify({
        runId, lang, scenario,
        demo: true,
        syntheticCustomer: { displayName: 'Demo Customer', company: 'Example Business' },
        requestedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: 'no-store',
      redirect: 'error',
    });
    if (!response.ok) {
      return NextResponse.json({ error: 'Workflow service failed' }, { status: 502 });
    }
    let result: unknown;
    try { result = await response.json(); }
    catch { return NextResponse.json({ error: 'Workflow returned invalid JSON' }, { status: 502 }); }
    if (!result || typeof result !== 'object') return NextResponse.json({ error: 'Invalid workflow result' }, { status: 502 });
    const output = result as Record<string, unknown>;
    if (output.runId !== runId || output.status !== 'completed' || !Array.isArray(output.steps)) {
      return NextResponse.json({ error: 'Workflow completion not verified' }, { status: 502 });
    }
    const verifiedSteps = output.steps.filter((step): step is string => typeof step === 'string' && steps.includes(step));
    if (verifiedSteps.length !== steps.length || new Set(verifiedSteps).size !== steps.length) {
      return NextResponse.json({ error: 'Workflow stages not verified' }, { status: 502 });
    }
    return NextResponse.json({ runId, status: 'completed', steps: verifiedSteps }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Workflow service unavailable' }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
