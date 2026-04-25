// netlify/functions/chat.ts
import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const N8N_PRODUCTION_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';
const N8N_TEST_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook-test/ovivo-agent';

function fallbackReply(lang: string) {
  if (lang === 'ar') return 'شكرًا لتواصلك معنا. كيف يمكنني مساعدتك اليوم؟';
  if (lang === 'en') return 'Thank you for contacting us. How can I help you today?';
  return 'Vielen Dank für Ihre Nachricht. Wie kann ich Ihnen heute helfen?';
}

async function callN8n(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  return { response, rawText };
}

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, reply: 'Method not allowed' }) };
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
          reply: lang === 'ar' ? 'الرجاء إدخال رسالة صحيحة.' : lang === 'en' ? 'Please enter a valid message.' : 'Bitte geben Sie eine gültige Nachricht ein.',
        }),
      };
    }

    const payload = {
      message,
      chatInput: message,
      lang,
      sessionId,
      source: 'website_chat',
      timestamp: new Date().toISOString(),
    };

    let { response, rawText } = await callN8n(N8N_PRODUCTION_WEBHOOK_URL, payload);
    let usedWebhook = 'production';

    // Fallback only for debugging/testing. This works only while n8n is listening for a test event.
    if (!response.ok) {
      console.error('n8n production webhook error:', response.status, rawText);
      const testResult = await callN8n(N8N_TEST_WEBHOOK_URL, payload);
      response = testResult.response;
      rawText = testResult.rawText;
      usedWebhook = 'test';
    }

    if (!response.ok) {
      console.error('n8n webhook error:', usedWebhook, response.status, rawText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          webhook: usedWebhook,
          reply: lang === 'ar'
            ? 'الأتمتة لم ترد حاليًا. تأكد أن Workflow في n8n مفعل Active وأن Webhook Production يعمل.'
            : lang === 'en'
            ? 'The automation is not responding. Please make sure the n8n workflow is active and the production webhook is working.'
            : 'Die Automatisierung antwortet derzeit nicht. Bitte stellen Sie sicher, dass der n8n-Workflow aktiv ist und der Production-Webhook funktioniert.',
        }),
      };
    }

    let data: any = {};
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { reply: rawText };
    }

    const reply = data.reply || data.text || data.output || data.response || data.message || data?.data?.reply || data?.data?.text || fallbackReply(lang);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        webhook: usedWebhook,
        reply: String(reply).trim(),
        sessionId,
        hasLead: Boolean(data.hasLead),
        lead: data.lead || null,
      }),
    };
  } catch (error) {
    console.error('Netlify chat function error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, reply: 'عذرًا، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' }) };
  }
};

export { handler };
