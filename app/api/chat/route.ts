// app/api/chat/route.ts
// Smart chat API that connects to n8n automation

import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang = 'de' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({
        success: false,
        reply: lang === 'ar' 
          ? 'الرجاء إدخال رسالة صحيحة'
          : lang === 'en'
          ? 'Please enter a valid message'
          : 'Bitte geben Sie eine gültige Nachricht ein'
      }, { status: 400 });
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
    
    // n8n returns {success, reply} format
    return NextResponse.json({
      success: true,
      reply: data.reply || data.text || 'شكراً على رسالتك. سنرد عليك قريباً.',
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      success: false,
      reply: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
    }, { status: 500 });
  }
}
