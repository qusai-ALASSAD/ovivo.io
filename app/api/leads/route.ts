import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedSources = new Set(['popup', 'contact', 'other']);
const sourceLabels = new Set(['consultation_modal', 'sales_chat', 'service_request', 'contact', 'popup', 'other']);

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'JSON body required' }, { status: 415 });
  }
  if (Number(req.headers.get('content-length') || 0) > 8192) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }
  const ip = (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown').split(',')[0].trim();
  const { allowed } = rateLimit('leads:' + ip, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait before submitting again.' }, { status: 429, headers: { 'Retry-After': '60' } });
  }

  let data: unknown;
  try { data = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const body = data as Record<string, unknown>;
  // Quietly discard basic bot submissions that fill the off-screen website field.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  }
  const fields = ['name', 'email', 'company', 'message', 'source'];
  if (fields.some(k => body[k] !== undefined && typeof body[k] !== 'string')) {
    return NextResponse.json({ error: 'Invalid field type' }, { status: 400 });
  }
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const company = String(body.company || '').trim();
  const message = String(body.message || '').trim();
  const source = String(body.source || 'other').trim();
  if (name.length > 120 || !emailPattern.test(email) || email.length > 254 || company.length > 200 || message.length > 3000 || !sourceLabels.has(source)) {
    return NextResponse.json({ error: 'Invalid or oversized form fields' }, { status: 400 });
  }

  // Preserve the precise UI source while respecting the current DB check constraint.
  const dbSource = allowedSources.has(source) ? source : 'other';
  const sourceNote = dbSource === 'other' && source !== 'other' ? 'Form source: ' + source + '\n' : '';
  try {
    const db = createServiceClient();
    const { error } = await db.from('leads').insert([{
      name,
      email,
      company,
      message: (sourceNote + message).slice(0,3100),
      source: dbSource,
    }]);
    if (error) {
      console.error('Lead insertion failed', { code: error.code });
      throw error;
    }
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Unable to save inquiry. Please retry later.' }, { status: 503 });
  }
}
