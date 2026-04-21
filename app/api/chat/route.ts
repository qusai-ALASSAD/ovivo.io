// app/api/chat/route.ts
// Updated to use n8n webhook + Automation Expert feature

import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';

export async function POST(req: Request) {
    try {
          const body = await req.json();
          const { message, messages, lang = 'ar', sessionId, name, phone, company } = body;

      // التحقق من نوع الرسالة
      const isAutomationExpert = message?.toLowerCase().includes('خبير') || 
                                       message?.toLowerCase().includes('expert') ||
                                       message?.toLowerCase().includes('automation');

      // إرسال إلى n8n webhook
      const response = await fetch(N8N_WEBHOOK_URL, {
              method: 'POST',
              headers: {
                        'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                        message: message || messages?.[messages.length - 1]?.content || '',
                        lang,
                        sessionId: sessionId || `session_${Date.now()}`,
                        name: name || '',
                        phone: phone || '',
                        company: company || '',
                        expertMode: isAutomationExpert, // ميزة خبير الأتمتة
              }),
      });

      if (!response.ok) {
              throw new Error(`n8n webhook error: ${response.status}`);
      }

      const data = await response.json();

      return NextResponse.json({
              reply: data.reply || 'شكراً على تواصلك.',
              sessionId: data.sessionId || sessionId,
              hasLead: data.hasLead || false,
              lead: data.lead || null,
      });

    } catch (error) {
          console.error('Chat API Error:', error);
          return NextResponse.json(
            { 
                    error: 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
                      reply: 'عذراً، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'
            },
            { status: 500 }
                );
    }
}

// GET endpoint للتحقق من الحالة
export async function GET() {
    return NextResponse.json({ 
                                 status: 'active',
          webhook: N8N_WEBHOOK_URL,
          features: ['n8n_integration', 'automation_expert'],
          version: '2.0.0'
    });
}
