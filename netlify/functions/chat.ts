// netlify/functions/chat.ts
import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

const N8N_PRODUCTION_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook/ovivo-agent';
const N8N_TEST_WEBHOOK_URL = 'http://187.77.89.15:5678/webhook-test/ovivo-agent';

type Lead = { name?: string; phone?: string; company?: string; businessType?: string; channels?: string[]; problem?: string };

function detectLanguage(message: string, requestedLang: string) {
  if (/[\u0600-\u06FF]/.test(message)) return 'ar';
  if (/\b(hello|hi|help|business|restaurant|service|shop|automation)\b/i.test(message)) return 'en';
  return requestedLang === 'ar' || requestedLang === 'en' ? requestedLang : 'de';
}

function extractLead(message: string, previous: Lead = {}) {
  const lead: Lead = { ...previous };
  const lower = message.toLowerCase();
  const phone = message.match(/(\+?\d[\d\s().-]{6,}\d)/);
  if (phone) lead.phone = phone[1].replace(/\s+/g, ' ').trim();

  if (/مطعم|restaurant|gastronomie|cafe|café|مقهى/.test(lower)) lead.businessType = 'restaurant';
  else if (/شركة|خدمات|service|dienstleister|betrieb|company/.test(lower)) lead.businessType = 'service';
  else if (/متجر|shop|store|handel/.test(lower)) lead.businessType = 'shop';

  const channels: string[] = lead.channels || [];
  if (/واتساب|whatsapp/i.test(message) && !channels.includes('whatsapp')) channels.push('whatsapp');
  if (/انستغرام|إنستغرام|instagram|insta/i.test(message) && !channels.includes('instagram')) channels.push('instagram');
  if (/فيسبوك|facebook/i.test(message) && !channels.includes('facebook')) channels.push('facebook');
  if (/email|e-mail|ايميل|إيميل/i.test(message) && !channels.includes('email')) channels.push('email');
  if (/telefon|phone|هاتف|اتصال|تلفون/i.test(message) && !channels.includes('phone')) channels.push('phone');
  if (channels.length) lead.channels = channels;

  if (/طلبات|طلبيات|orders|bestellungen|حجوزات|bookings|reservierungen|زيد|زيادة/.test(lower)) lead.problem = 'increase_orders_or_bookings';
  if (/تأخر|بطيء|slow|spät|late|ضغط|stress/.test(lower)) lead.problem = 'slow_replies_or_workload';

  const nameMatch = message.match(/(?:اسمي|انا|أنا|name is|ich bin)\s+([\u0600-\u06FFa-zA-Z ]{2,30})/i);
  if (nameMatch && !lead.name) lead.name = nameMatch[1].trim();

  const companyMatch = message.match(/(?:شركة|مطعم|company|firma|restaurant)\s+([\u0600-\u06FFa-zA-Z0-9 &.-]{2,40})/i);
  if (companyMatch && !lead.company) lead.company = companyMatch[1].trim();

  return lead;
}

function salesReply(lang: string, message: string, lead: Lead) {
  const hasBusiness = Boolean(lead.businessType);
  const hasChannels = Boolean(lead.channels?.length);
  const hasProblem = Boolean(lead.problem);
  const hasName = Boolean(lead.name);
  const hasPhone = Boolean(lead.phone);
  const hasCompany = Boolean(lead.company);

  if (lang === 'ar') {
    if (!hasBusiness) return 'أهلًا بك. نحن في Ovivo نساعد المطاعم والشركات على الرد على العملاء تلقائيًا وتحويل الاستفسارات إلى طلبات أو عملاء محتملين. ما نوع عملك؟';
    if (!hasChannels) return 'ممتاز، هذا النوع من العمل يمكن أن يستفيد كثيرًا من الأتمتة. من أين تأتيك استفسارات العملاء غالبًا؟ واتساب، إنستغرام، فيسبوك، إيميل، أم اتصال هاتفي؟';
    if (!hasProblem) return 'فهمت. عادةً أكبر خسارة تكون في تأخر الرد أو ضياع العميل قبل أن يقرر الشراء. ما الهدف الأهم لك الآن: زيادة الطلبات، تسريع الرد، تنظيم الحجوزات، أم تقليل الضغط على الفريق؟';
    if (!hasName || !hasPhone || !hasCompany) return 'هذا مناسب جدًا لنظام Ovivo. يمكننا ربط قنوات التواصل لديك بنظام ذكي يرد فورًا، يجمع بيانات العملاء، وينظم الطلبات أو الحجوزات تلقائيًا. حتى نجهز لك تصورًا مناسبًا، أرسل لي الاسم، رقم الهاتف، واسم الشركة أو المطعم.';
    return 'تم تسجيل معلوماتك بنجاح. سيتواصل معك فريق Ovivo قريبًا لشرح الحل المناسب لعملك وكيف يمكن أن يساعدك على زيادة العملاء وتقليل الجهد اليدوي.';
  }

  if (lang === 'en') {
    if (!hasBusiness) return 'Welcome. Ovivo helps businesses automate customer inquiries and turn them into leads, bookings, or orders. What type of business do you run?';
    if (!hasChannels) return 'Great. This kind of business can benefit a lot from automation. Where do most customer inquiries come from: WhatsApp, Instagram, Facebook, email, or phone calls?';
    if (!hasProblem) return 'Understood. Usually the biggest loss happens when replies are slow or leads are missed. What is your main goal right now: more orders, faster replies, booking automation, or reducing workload?';
    if (!hasName || !hasPhone || !hasCompany) return 'This is a strong fit for Ovivo. We can connect your channels to an AI system that replies instantly, captures leads, and organizes bookings or requests. Please send your name, phone number, and company name.';
    return 'Your information has been registered successfully. The Ovivo team will contact you soon to explain the right solution and how it can help you get more customers with less manual work.';
  }

  if (!hasBusiness) return 'Willkommen. Ovivo hilft Unternehmen, Kundenanfragen automatisch zu beantworten und daraus Leads, Buchungen oder Bestellungen zu machen. Welche Art von Unternehmen haben Sie?';
  if (!hasChannels) return 'Sehr gut. Diese Art von Unternehmen kann stark von Automatisierung profitieren. Woher kommen Ihre Kundenanfragen meistens: WhatsApp, Instagram, Facebook, E-Mail oder Telefon?';
  if (!hasProblem) return 'Verstanden. Der größte Verlust entsteht oft durch langsame Antworten oder verpasste Anfragen. Was möchten Sie aktuell verbessern: mehr Bestellungen, schnellere Antworten, automatische Buchungen oder weniger Aufwand im Team?';
  if (!hasName || !hasPhone || !hasCompany) return 'Das passt sehr gut zu Ovivo. Wir können Ihre Kanäle mit einem KI-System verbinden, das sofort antwortet, Leads erfasst und Anfragen oder Buchungen organisiert. Bitte senden Sie mir Ihren Namen, Ihre Telefonnummer und den Firmennamen.';
  return 'Ihre Informationen wurden erfolgreich registriert. Das Ovivo-Team wird sich bald bei Ihnen melden und die passende Lösung erklären.';
}

async function callN8n(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const rawText = await response.text();
  return { response, rawText };
}

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ success: false, reply: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const message = String(body.message || body.chatInput || '').trim();
    const requestedLang = String(body.lang || 'de').toLowerCase();
    const lang = detectLanguage(message, requestedLang);
    const sessionId = body.sessionId || `s_${Date.now()}`;
    const lead = extractLead(message, body.lead || {});

    if (!message) return { statusCode: 400, headers, body: JSON.stringify({ success: false, reply: lang === 'ar' ? 'الرجاء إدخال رسالة صحيحة.' : lang === 'en' ? 'Please enter a valid message.' : 'Bitte geben Sie eine gültige Nachricht ein.' }) };

    const payload = { message, chatInput: message, lang, sessionId, lead, source: 'website_chat', timestamp: new Date().toISOString() };
    let data: any = {};
    let usedWebhook = 'local-sales-fallback';

    try {
      let result = await callN8n(N8N_PRODUCTION_WEBHOOK_URL, payload);
      usedWebhook = 'production';
      if (!result.response.ok) { result = await callN8n(N8N_TEST_WEBHOOK_URL, payload); usedWebhook = 'test'; }
      if (result.response.ok) { try { data = JSON.parse(result.rawText); } catch { data = { reply: result.rawText }; } }
    } catch (err) { console.error('n8n unavailable:', err); }

    const reply = data.reply || data.text || data.output || data.response || data.message || data?.data?.reply || data?.data?.text || salesReply(lang, message, lead);
    const hasLead = Boolean(lead.name && lead.phone && lead.company);

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, webhook: usedWebhook, reply: String(reply).trim(), sessionId, hasLead, lead }) };
  } catch (error) {
    console.error('Netlify chat function error:', error);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, reply: 'عذرًا، حدث خطأ مؤقت. كيف يمكنني مساعدتك؟' }) };
  }
};

export { handler };
