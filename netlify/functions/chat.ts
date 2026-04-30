// netlify/functions/chat.ts

type HandlerEvent = { httpMethod: string; body: string | null };
type HandlerResponse = { statusCode: number; headers?: Record<string, string>; body: string };

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  businessType?: string;
  channels?: string[];
  problem?: string;
  goal?: string;
  requestedPackage?: string;
  lastDiscussed?: string;
  marketingPlanRequested?: boolean;
  consultationRequested?: boolean;
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
  if (/\b(hello|hi|help|business|shop|automation|marketing|plan|restaurant)\b/i.test(message)) return 'en';
  if (['ar', 'en', 'de'].includes(requestedLang)) return requestedLang;
  return 'de';
}

function extractLead(message: string, previous: Lead = {}) {
  const lead: Lead = { ...previous };
  const lower = message.toLowerCase();

  const email = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (email) lead.email = email[0].trim();

  const phone = message.match(/(\+?\d[\d\s().-]{6,}\d)/);
  if (phone) lead.phone = phone[1].replace(/\s+/g, ' ').trim();

  if (/تنظيف|شركة تنظيف|cleaning|cleaner|reinigung|gebäudereinigung/.test(lower)) {
    lead.businessType = 'cleaning_company';
    lead.requestedPackage = 'cleaning_company_package';
  } else if (/مطعم|restaurant|gastronomie/.test(lower)) {
    lead.businessType = 'restaurant';
    lead.requestedPackage = 'restaurant_package';
  } else if (/كافيه|مقهى|قهوة|cafe|café|coffee|bäckerei|bakery/.test(lower)) {
    lead.businessType = 'cafe';
    lead.requestedPackage = 'cafe_package';
  } else if (/شركة|خدمات|service|dienstleister|betrieb|company/.test(lower)) {
    lead.businessType = 'service';
  } else if (/متجر|shop|store|handel/.test(lower)) {
    lead.businessType = 'shop';
  }

  if (/ماركت|تسويق|خطة|خطة تسويق|marketing|marketing plan|plan/i.test(message)) lead.marketingPlanRequested = true;
  if (/استشارة|موعد|احجز|حجز|consultation|beratung|termin|appointment/i.test(message)) lead.consultationRequested = true;

  const channels: string[] = lead.channels || [];
  if (/واتساب|whatsapp/i.test(message) && !channels.includes('whatsapp')) channels.push('whatsapp');
  if (/انستغرام|إنستغرام|instagram|insta/i.test(message) && !channels.includes('instagram')) channels.push('instagram');
  if (/فيسبوك|facebook/i.test(message) && !channels.includes('facebook')) channels.push('facebook');
  if (/email|e-mail|ايميل|إيميل/i.test(message) && !channels.includes('email')) channels.push('email');
  if (/telefon|phone|هاتف|اتصال|تلفون/i.test(message) && !channels.includes('phone')) channels.push('phone');
  if (channels.length) lead.channels = channels;

  if (/طلبات|طلبيات|orders|bestellungen|حجوزات|bookings|reservierungen|زيد|زيادة/.test(lower)) lead.problem = 'increase_orders_or_bookings';
  if (/تأخر|بطيء|slow|spät|late|ضغط|stress/.test(lower)) lead.problem = 'slow_replies_or_workload';
  if (/سعر|اسعار|أسعار|تكلفة|باقات|package|pricing|preise|paket/.test(lower)) lead.lastDiscussed = 'packages_or_pricing';
  else if (/استشارة|موعد|احجز|حجز|consultation|beratung|termin|appointment/i.test(message)) lead.lastDiscussed = 'consultation_request';
  else if (lead.businessType) lead.lastDiscussed = lead.businessType;

  const nameMatch = message.match(/(?:اسمي|انا|أنا|name is|ich bin)\s+([\u0600-\u06FFa-zA-Z ]{2,30})/i);
  if (nameMatch && !lead.name) lead.name = nameMatch[1].trim();

  const companyMatch = message.match(/(?:شركة|مطعم|كافيه|مقهى|company|firma|restaurant|cafe|café)\s+([\u0600-\u06FFa-zA-Z0-9 &.-]{2,40})/i);
  if (companyMatch && !lead.company) lead.company = companyMatch[1].trim();

  return lead;
}

function labelBusinessType(type: string | undefined, lang: string) {
  const labels: Record<string, Record<string, string>> = {
    restaurant: { ar: 'مطعم', en: 'restaurant', de: 'Restaurant' },
    cafe: { ar: 'كافيه', en: 'cafe', de: 'Cafe' },
    cleaning_company: { ar: 'شركة تنظيف', en: 'cleaning company', de: 'Reinigungsfirma' },
    service: { ar: 'شركة خدمات', en: 'service business', de: 'Dienstleister' },
    shop: { ar: 'متجر', en: 'shop', de: 'Shop' },
  };
  return type ? labels[type]?.[lang] || type : lang === 'ar' ? 'غير محدد بعد' : lang === 'en' ? 'not specified yet' : 'noch nicht angegeben';
}

function labelPackage(pkg: string | undefined, lang: string) {
  const labels: Record<string, Record<string, string>> = {
    restaurant_package: { ar: 'باقة المطعم', en: 'Restaurant Package', de: 'Restaurant-Paket' },
    cafe_package: { ar: 'باقة الكافيه', en: 'Cafe Package', de: 'Cafe-Paket' },
    cleaning_company_package: { ar: 'باقة شركة تنظيف', en: 'Cleaning Company Package', de: 'Reinigungsfirma-Paket' },
  };
  return pkg ? labels[pkg]?.[lang] || pkg : lang === 'ar' ? 'لم يتم اختيار باقة بعد' : lang === 'en' ? 'no package selected yet' : 'noch kein Paket ausgewählt';
}

function buildClientSummary(lead: Lead, history: Array<{ role: string; content: string }> = [], message: string, lang: string) {
  const recentUserMessages = [...history, { role: 'user', content: message }]
    .filter((item) => item.role === 'user' && item.content)
    .slice(-5)
    .map((item) => item.content.trim());

  const business = labelBusinessType(lead.businessType, lang);
  const selectedPackage = labelPackage(lead.requestedPackage, lang);
  const requestedActions = [
    lead.consultationRequested ? (lang === 'ar' ? 'طلب استشارة أو موعد' : lang === 'en' ? 'requested a consultation or appointment' : 'Beratung oder Termin angefragt') : '',
    lead.marketingPlanRequested ? (lang === 'ar' ? 'طلب خطة تسويق' : lang === 'en' ? 'requested a marketing plan' : 'Marketingplan angefragt') : '',
  ].filter(Boolean);

  const missingFields = [
    !lead.name ? (lang === 'ar' ? 'الاسم' : 'name') : '',
    !lead.phone ? (lang === 'ar' ? 'الهاتف' : 'phone') : '',
    !lead.email ? (lang === 'ar' ? 'الإيميل' : 'email') : '',
    !lead.businessType ? (lang === 'ar' ? 'نوع العمل' : 'business type') : '',
  ].filter(Boolean);

  const summary = lang === 'ar'
    ? `العميل مهتم بـ ${business}. الباقة الأقرب: ${selectedPackage}. ${requestedActions.length ? `الإجراء المطلوب: ${requestedActions.join('، ')}.` : 'لم يطلب إجراء نهائي بعد.'} آخر موضوع: ${lead.lastDiscussed || 'محادثة عامة'}.`
    : lang === 'en'
      ? `Client is interested in ${business}. Closest package: ${selectedPackage}. ${requestedActions.length ? `Requested action: ${requestedActions.join(', ')}.` : 'No final action requested yet.'} Last topic: ${lead.lastDiscussed || 'general chat'}.`
      : `Kunde interessiert sich für ${business}. Passendes Paket: ${selectedPackage}. ${requestedActions.length ? `Gewünschte Aktion: ${requestedActions.join(', ')}.` : 'Noch keine finale Aktion angefragt.'} Letztes Thema: ${lead.lastDiscussed || 'allgemeiner Chat'}.`;

  return {
    summary,
    businessType: lead.businessType || null,
    businessLabel: business,
    requestedPackage: lead.requestedPackage || null,
    requestedPackageLabel: selectedPackage,
    requestedActions,
    lastDiscussed: lead.lastDiscussed || null,
    problem: lead.problem || null,
    channels: lead.channels || [],
    missingFields,
    recentUserMessages,
    latestMessage: message,
  };
}

function fallbackReply(lang: string, lead: Lead) {
  if (lead.marketingPlanRequested && lead.email && lead.businessType) {
    if (lang === 'ar') return `تمام، تم تسجيل طلب خطة التسويق على البريد: ${lead.email}. سيقوم النظام بإرسال الخطة بعد تفعيل خطوة الإيميل في الأتمتة.`;
    if (lang === 'en') return `Great, your marketing plan request has been saved for: ${lead.email}. The email will be sent once the automation email step is active.`;
    return `Alles klar, die Marketingplan-Anfrage wurde für ${lead.email} gespeichert. Der Versand erfolgt, sobald der E-Mail-Schritt in der Automatisierung aktiv ist.`;
  }

  if (lang === 'ar') return 'أهلًا بك. نحن في Ovivo نساعد المطاعم والكافيهات وشركات الخدمات على الرد على العملاء تلقائياً وتحويل الاستفسارات إلى طلبات أو عملاء محتملين. ما نوع عملك؟';
  if (lang === 'en') return 'Welcome. Ovivo helps businesses automate customer inquiries and turn them into leads, bookings, or orders. What type of business do you run?';
  return 'Willkommen. Ovivo hilft Unternehmen, Kundenanfragen automatisch zu beantworten und daraus Leads, Buchungen oder Bestellungen zu machen. Welche Art von Unternehmen haben Sie?';
}

function extractReply(data: unknown) {
  if (typeof data === 'string') return data;
  if (!data || typeof data !== 'object') return '';
  const item = Array.isArray(data) ? data[0] : data;
  if (!item || typeof item !== 'object') return '';
  const record = item as Record<string, any>;
  return String(record.reply || record.text || record.output || record.response || record.answer || record.data?.reply || record.data?.text || record.data?.output || '').trim();
}

function actionFlags(data: unknown) {
  const item = Array.isArray(data) ? data[0] : data;
  const record = item && typeof item === 'object' ? (item as Record<string, any>) : {};
  return {
    emailSent: Boolean(record.emailSent || record.email_sent || record.data?.emailSent),
    whatsappSent: Boolean(record.whatsappSent || record.whatsapp_sent || record.data?.whatsappSent),
    calendarBooked: Boolean(record.calendarBooked || record.calendar_booked || record.data?.calendarBooked),
  };
}

function preventFalseSendingClaims(reply: string, lang: string, flags: { emailSent: boolean; whatsappSent: boolean; calendarBooked: boolean }, lead: Lead) {
  const claimsEmail = /أرسلت|ارسلت|بعثت|تم إرسال|sent|send|gesendet|verschickt/i.test(reply) && /email|e-mail|إيميل|ايميل|بريد|mail/i.test(reply);
  const claimsWhatsApp = /أرسلت|ارسلت|بعثت|تم إرسال|sent|send|gesendet|verschickt/i.test(reply) && /whatsapp|واتساب/i.test(reply);
  const claimsBooking = /تم تأكيد|confirmed|gebucht|bestätigt/i.test(reply) && /موعد|termin|appointment|booking|consultation|استشارة/i.test(reply);

  if (claimsEmail && !flags.emailSent) {
    if (lang === 'ar') return `تم تجهيز طلبك${lead.email ? ` على البريد ${lead.email}` : ''}. لن أؤكد الإرسال إلا بعد أن ينفّذ نظام الإيميل العملية فعلياً.`;
    if (lang === 'en') return `Your request is ready${lead.email ? ` for ${lead.email}` : ''}. I will only confirm the email after the automation sends it successfully.`;
    return `Ihre Anfrage ist vorbereitet${lead.email ? ` für ${lead.email}` : ''}. Ich bestätige den E-Mail-Versand erst, wenn die Automatisierung ihn erfolgreich gesendet hat.`;
  }

  if (claimsWhatsApp && !flags.whatsappSent) {
    if (lang === 'ar') return 'تم تجهيز رسالة واتساب، لكن لن أؤكد الإرسال إلا بعد أن ينفّذ نظام واتساب العملية فعلياً.';
    if (lang === 'en') return 'The WhatsApp message is ready, but I will only confirm it after the automation sends it successfully.';
    return 'Die WhatsApp-Nachricht ist vorbereitet, aber ich bestätige den Versand erst nach erfolgreicher Automatisierung.';
  }

  if (claimsBooking && !flags.calendarBooked) {
    if (lang === 'ar') return 'سأتحقق أولاً من توفر الموعد في التقويم. لا أستطيع تأكيد الموعد قبل فحص التوفر.';
    if (lang === 'en') return 'I will first check calendar availability. I cannot confirm the appointment before checking the slot.';
    return 'Ich prüfe zuerst die Kalenderverfügbarkeit. Ich kann den Termin erst bestätigen, wenn der Slot frei ist.';
  }

  return reply;
}

async function callN8n(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const rawText = await response.text();
  let data: unknown = rawText;
  try { data = JSON.parse(rawText); } catch { data = rawText; }
  return { response, data };
}

const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ success: false, reply: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}') as ChatPayload;
    const message = String(body.message || body.chatInput || '').trim();
    const requestedLang = String(body.lang || 'de').toLowerCase();
    const lang = detectLanguage(message, requestedLang);
    const sessionId = String(body.sessionId || createSessionId());
    const lead = extractLead(message, body.lead || {});
    const history = Array.isArray(body.history) ? body.history.slice(-10) : [];
    const clientSummary = buildClientSummary(lead, history, message, lang);

    if (!message) {
      const reply = lang === 'ar' ? 'الرجاء إدخال رسالة صحيحة.' : lang === 'en' ? 'Please enter a valid message.' : 'Bitte geben Sie eine gültige Nachricht ein.';
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, reply, sessionId, lang, lead, clientSummary }) };
    }

    const payload = {
      message,
      chatInput: message,
      lang,
      sessionId,
      lead,
      leadSummary: clientSummary.summary,
      clientSummary,
      requestedAction: lead.marketingPlanRequested ? 'send_marketing_plan_email' : lead.consultationRequested ? 'consultation_request' : 'chat',
      actionRule: 'Do not claim that email, WhatsApp, or calendar booking was sent/confirmed unless the executed node returns emailSent:true, whatsappSent:true, or calendarBooked:true.',
      history,
      source: 'ovivo.io',
      timestamp: new Date().toISOString(),
    };

    let usedWebhook = 'production';
    let result = await callN8n(N8N_PRODUCTION_WEBHOOK_URL, payload);
    if (!result.response.ok) { usedWebhook = 'test'; result = await callN8n(N8N_TEST_WEBHOOK_URL, payload); }

    const flags = result.response.ok ? actionFlags(result.data) : { emailSent: false, whatsappSent: false, calendarBooked: false };
    const n8nReply = result.response.ok ? extractReply(result.data) : '';
    const safeReply = preventFalseSendingClaims(n8nReply || fallbackReply(lang, lead), lang, flags, lead);

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, webhook: result.response.ok ? usedWebhook : 'fallback', reply: safeReply, sessionId, lang, lead, leadSummary: clientSummary.summary, clientSummary, ...flags }) };
  } catch (error) {
    console.error('Netlify chat function error:', error);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, webhook: 'fallback', reply: fallbackReply('ar', {}) }) };
  }
};

export { handler };
