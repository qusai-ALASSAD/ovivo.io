// app/api/chat/route.ts

import { NextResponse } from 'next/server';

type Lead = {
  name?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  channels?: string[];
  problem?: string;
};

type ChatPayload = {
  message?: string;
  chatInput?: string;
  lang?: string;
  sessionId?: string;
  lead?: Lead;
  history?: Array<{ role: string; content: string }>;
};

const N8N_TEST_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook-test/ovivo-agent';
const N8N_PRODUCTION_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';

function createSessionId() {
  return `ovivo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function detectLanguage(message: string, requestedLang = 'de') {
  if (/[\u0600-\u06FF]/.test(message)) return 'ar';
  if (['ar', 'en', 'de'].includes(requestedLang)) return requestedLang;
  if (/\b(hello|hi|help|business|shop|automation)\b/i.test(message)) return 'en';
  return 'de';
}

function fallbackReply(lang: string) {
  if (lang === 'ar') {
    return 'أهلًا بك. نحن في Ovivo نساعد المطاعم والشركات على الرد على العملاء تلقائيًا وتحويل الاستفسارات إلى طلبات أو عملاء محتملين. ما نوع عملك؟';
  }

  if (lang === 'en') {
    return 'Welcome. Ovivo helps businesses automate customer inquiries and turn them into leads, bookings, or orders. What type of business do you run?';
  }

  return 'Willkommen. Ovivo hilft Unternehmen, Kundenanfragen automatisch zu beantworten und daraus Leads, Buchungen oder Bestellungen zu machen. Welche Art von Unternehmen haben Sie?';
}

function extractReply(data: unknown) {
  if (typeof data === 'string') return data;
  if (!data || typeof data !== 'object') return '';

  const item = Array.isArray(data) ? data[0] : data;
  if (!item || typeof item !== 'object') return '';

  const record = item as Record<string, any>;
  return String(
    record.reply ||
      record.text ||
      record.output ||
      record.response ||
      record.answer ||
      record.data?.reply ||
      record.data?.text ||
      record.data?.output ||
      ''
  ).trim();
}

async function callN8n(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  let data: unknown = rawText;

  try {
    data = JSON.parse(rawText);
  } catch {
    data = rawText;
  }

  return { response, data };
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatPayload;
    const message = String(body.message || body.chatInput || '').trim();
    const requestedLang = String(body.lang || 'de').toLowerCase();
    const lang = detectLanguage(message, requestedLang);
    const sessionId = String(body.sessionId || createSessionId());
    const lead = body.lead || {};

    if (!message) {
      const reply = lang === 'ar'
        ? 'الرجاء إدخال رسالة صحيحة.'
        : lang === 'en'
          ? 'Please enter a valid message.'
          : 'Bitte geben Sie eine gültige Nachricht ein.';

      return NextResponse.json({ success: false, reply, sessionId, lang, lead }, { status: 400 });
    }

    const payload = {
      message,
      chatInput: message,
      lang,
      sessionId,
      lead,
      history: Array.isArray(body.history) ? body.history.slice(-10) : [],
      source: 'ovivo.io',
      timestamp: new Date().toISOString(),
    };

    let usedWebhook = 'test';
    let result = await callN8n(N8N_TEST_WEBHOOK_URL, payload);

    if (!result.response.ok) {
      usedWebhook = 'production';
      result = await callN8n(N8N_PRODUCTION_WEBHOOK_URL, payload);
    }

    const n8nReply = result.response.ok ? extractReply(result.data) : '';
    const reply = n8nReply || fallbackReply(lang);

    return NextResponse.json({
      success: true,
      webhook: result.response.ok ? usedWebhook : 'fallback',
      reply,
      sessionId,
      lang,
      lead,
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    return NextResponse.json({
      success: true,
      webhook: 'fallback',
      reply: fallbackReply('ar'),
    });
  }
}
