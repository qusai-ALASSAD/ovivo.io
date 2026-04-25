// netlify/functions/chat.ts
import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const N8N_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';

function fallbackReply(lang: string) {
  if (lang === 'ar') return 'شكرًا لتواصلك معنا. كيف يمكنني مساعدتك اليوم؟';
  if (lang === 'en') return 'Thank you for contacting us. How can I help you today?';
  return 'Vielen Dank für Ihre Nachricht. Wie kann ich Ihnen heute helfen?';
}

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

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
    const body = JSON.parse(event.body || '{}');
    const message = String(body.message || body.chatInput || '').trim();
    const lang = String(body.lang || 'de').toLowerCase();
    const sessionId = body.sessionId || `s_${Date.now()}`;

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          reply: lang === 'ar'
            ? 'الرجاء إدخال رسالة صحيحة.'
            : lang === 'en'
            ? 'Please enter a valid message.'
            : 'Bitte geben Sie eine gültige Nachricht ein.',
        }),
      };
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        chatInput: message,
        lang,
        sessionId,
        source: 'website_chat',
        timestamp: new Date().toISOString(),
      }),
    });

    const rawText = await response.text();

    if (!response.ok) {
      console.error('n8n error:', response.status, rawText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          reply: lang === 'ar'
            ? 'عذرًا، يوجد خطأ مؤقت في الاتصال بالأتمتة. حاول مرة أخرى بعد قليل.'
            : lang === 'en'
            ? 'Sorry, there is a temporary automation connection issue. Please try again shortly.'
            : 'Entschuldigung, es gibt ein vorübergehendes Verbindungsproblem mit der Automatisierung. Bitte versuchen Sie es gleich erneut.',
        }),
      };
    }

    let data: any = {};
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { reply: rawText };
    }

    const reply =
      data.reply ||
      data.text ||
      data.output ||
      data.response ||
      data.message ||
      data?.data?.reply ||
      data?.data?.text ||
      fallbackReply(lang);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reply: String(reply).trim(),
        sessionId,
        hasLead: Boolean(data.hasLead),
        lead: data.lead || null,
      }),
    };
  } catch (error) {
    console.error('Netlify chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        reply: 'عذرًا، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
      }),
    };
  }
};

export { handler };
