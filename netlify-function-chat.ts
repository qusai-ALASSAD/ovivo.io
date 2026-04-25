// netlify/functions/chat.ts
// Netlify Function to proxy chat requests to n8n webhook

import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const N8N_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { message, lang = 'de' } = body;

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          reply: lang === 'ar' 
            ? 'الرجاء إدخال رسالة صحيحة'
            : lang === 'en'
            ? 'Please enter a valid message'
            : 'Bitte geben Sie eine gültige Nachricht ein'
        })
      };
    }

    // Send to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        lang: lang,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        reply: data.reply || data.text || 'شكراً على رسالتك. سنرد عليك قريباً.'
      })
    };

  } catch (error) {
    console.error('Chat Function Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        reply: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
      })
    };
  }
};

export { handler };
