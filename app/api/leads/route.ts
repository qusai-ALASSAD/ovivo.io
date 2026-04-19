import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL || 'http://srv1401042.hstgr.cloud:5678/webhook/ovivo-lead';

async function triggerN8n(data: Record<string, string>) {
  try {
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // Silent fail - don't block the user if n8n is down
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  const { allowed } = rateLimit(`leads:${ip}`, 5, 60_000);

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { name = '', email = '', phone = '', company = '', message = '', source = 'contact' } = body;

    // Save to Supabase
    try {
      const db = createServiceClient();
      await db.from('leads').insert([{ name, email, company, message, source }]);
    } catch {
      // Continue even if Supabase fails
    }

    // Trigger n8n workflow
    await triggerN8n({ name, email, phone, company, message, source, time: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
