// netlify/functions/chat.ts

type HandlerEvent = {
  httpMethod: string;
  body: string | null;
};

type HandlerResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

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

const N8N_PRODUCTION_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';
const N8N_TEST_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook-test/ovivo-agent';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function createSessionId() {
  return `ovivo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function detectLanguage(message: string, requestedLang = 'de') {
  if (/[\u0600-\u06FF]/.test(message)) return 'ar';
  if (/\b(hello|hi|help|business|restaurant|service|shop|automation)\b/i.test(message)) return 'en';
  return ['ar', 'en', 'de'].includes(requestedLang) ? requestedLang : 'de';
}

function fallbackReply(lang: string) {
  if (lang === 'ar') return 'عذرًا، الاتصال بالمساعد تأخر قليلًا. اكتب نوع عملك وسأساعدك مباشرة.';
  if (lang === 'en') return 'Sorry, the assistant connection is taking a moment. Tell me what type of business you run and I will help you.';
  return 'Entschuldigung, die Verbindung zum Assistenten dauert kurz. Welche Art von Unternehmen haben Sie?';
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
      record.message ||
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

const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, reply: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}') as ChatPayload;
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

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, reply, sessionId, lang, lead }),
      };
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

    let usedWebhook = 'production';
    let result = await callN8n(N8N_PRODUCTION_WEBHOOK_URL, payload);

    if (!result.response.ok) {
      usedWebhook = 'test';
      result = await callN8n(N8N_TEST_WEBHOOK_URL, payload);
    }

    const reply = extractReply(result.data) || fallbackReply(lang);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: result.response.ok,
        webhook: usedWebhook,
        reply,
        sessionId,
        lang,
        lead,
      }),
    };
  } catch (error) {
    console.error('Netlify chat function error:', error);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        reply: fallbackReply('ar'),
      }),
    };
  }
};

export { handler };
