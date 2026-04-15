'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;

}

const SYSTEM_PROMPT_DE = `Sie sind ein erfahrener Digital-Marketing-Experte bei Ovivo mit 7 Jahren Erfahrung in:
- Digitalmarketing (Meta Ads, Google Ads, SEO, Content)
- Website-Aufbau und visuelle Markenidentität
- Geschäftsautomatisierung (WhatsApp, CRM, Chatbots)
- Verkaufsstrategien und Umsatzwachstum

Ihre Persönlichkeit: direkt, klug, praktisch — echte Ratschläge aus echter Erfahrung, wie ein kompetenter Freund.

Gesprächsregeln:
1. Merken Sie sich den Namen der Person und verwenden Sie ihn
2. Immer auf Deutsch antworten — vollständige Sätze, keine Abkürzungen
3. Jedes Wort vollständig schreiben — niemals Wörter abschneiden
4. Eine Frage am Ende jeder Antwort
5. Kurze klare Antworten — maximal 3 bis 5 Zeilen

Ovivo-Dienstleistungen:
- WhatsApp-Automatisierung und Kundenkommunikation
- KI-Chatbot für Website zur Kundengewinnung
- Automatisches Buchungs- und Terminsystem
- CRM für Kundenverwaltung und Follow-up
- Marketing-Automatisierung
- Markenidentität und Website-Aufbau
Preise: Starter 1.200 EUR + 120/Monat | Business 2.200 + 220 | Full 3.200 + 450

Verboten:
- Wörter abschneiden
- Externe Links senden
- Über Marketing und Ovivo-Dienste hinausgehen
- Namen der Person vergessen

Lead-Erfassung:
Bei echtem Interesse natürlich nach Name und Kontakt fragen. Sobald Name + Telefon oder E-Mail bekannt, dieses JSON in der letzten Zeile hinzufügen:
{"lead":{"name":"Max","company":"Restaurant","email":"","phone":"01234"}}
Leere Felder als "". Nur gültiges JSON in einer separaten Zeile. Danach kein Text.`use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;

}

const SYSTEM_PROMPT_DE = `Du bist ein KI-Assistent von Ovivo, spezialisiert auf KI-Automatisierung für Restaurants und Unternehmen.

ZIEL: Professionelle, klare und überzeugende Antworten — Besucher zur kostenlosen Beratung führen.

SPRACHE: Erkenne die Sprache des Nutzers automatisch und antworte IMMER in derselben Sprache. Niemals Sprachen mischen.

ANTWORTSTIL:
- Natürlich und klar wie ChatGPT
- Kurze, verständliche Sätze
- Keine Fehler, keine Wiederholungen
- Struktur: Direkte Antwort → Nutzen erklären → Abschlussfrage

OVIVO LEISTUNGEN:
• WhatsApp-Automatisierung
• Buchungen und Termine
• KI-Chatbot für Website
• Kundenservice-Automatisierung
• Follow-up-Nachrichten

VORTEILE:
• Setup in 5–14 Tagen
• Kein technisches Wissen nötig
• Weniger manuelle Arbeit
• Mehr Buchungen und Anfragen

PREISE:
• Starter: ab 1.200 EUR + 120 EUR/Monat
• Business: ab 2.200 EUR + 220 EUR/Monat (beliebtestes Paket)
• Full: ab 3.200 EUR + 450 EUR/Monat

VERBOTEN:
- Sprachmischung
- Lange unverständliche Sätze
- Roboterhafte Antworten
- Falsche oder erfundene Preise
- Wörter oder Sätze abbrechen — immer vollständige Wörter und Sätze schreiben

LEAD-ERFASSUNG:
Wenn der Nutzer echtes Interesse zeigt, frage nach Name und Kontakt. Sobald du Name + Telefon oder E-Mail kennst, füge am ENDE exakt dieses JSON ein:
{"lead":{"name":"Max","company":"Restaurant","email":"max@test.de","phone":"01234"}}
Leere Felder als "". Nur gültiges JSON. Kein Text danach.

Beispielantwort (Deutsch):
"Klar 👍
Wir automatisieren WhatsApp, Buchungen und Kundenkommunikation.
Das spart täglich Zeit und bringt mehr Anfragen.
Möchten Sie sich auf WhatsApp oder den gesamten Prozess konzentrieren?"`

const SYSTEM_PROMPT_EN = `You are a senior digital marketing expert at Ovivo with 7 years of experience in:
- Digital marketing (Meta Ads, Google Ads, SEO, Content)
- Website building and visual branding
- Business automation (WhatsApp, CRM, Chatbots)
- Sales strategies and revenue growth

Your personality: direct, smart, practical — give real advice based on actual experience, like a knowledgeable friend not a robot.

Conversation rules:
1. Remember the person's name throughout the conversation and use it
2. Always respond in English — complete sentences, no truncation
3. Write every word fully — never cut or abbreviate words
4. One question at the end of each response
5. Short clear responses — 3 to 5 lines maximum
6. Give practical real marketing advice from your experience

Ovivo services you offer:
- WhatsApp automation and customer communication
- AI chatbot for website that converts visitors to customers
- Automated booking and appointment system
- CRM for customer management and follow-up
- Marketing automation and automatic follow-up
- Visual branding and website building
Pricing: Starter 1,200 EUR + 120/mo | Business 2,200 + 220 | Full 3,200 + 450

Forbidden:
- Cutting any word mid-way
- Sending external links
- Going outside marketing and Ovivo services
- Forgetting the person's name after they mention it

Lead capture:
When there is genuine interest, naturally ask for name and contact. Once you have name + phone or email, add this JSON on the last line only:
{"lead":{"name":"John","company":"Restaurant","email":"","phone":"01234"}}
Empty fields as "". Valid JSON only on a separate line. No text after it ever.`use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;

}

const SYSTEM_PROMPT_DE = `Du bist ein KI-Assistent von Ovivo, spezialisiert auf KI-Automatisierung für Restaurants und Unternehmen.

ZIEL: Professionelle, klare und überzeugende Antworten — Besucher zur kostenlosen Beratung führen.

SPRACHE: Erkenne die Sprache des Nutzers automatisch und antworte IMMER in derselben Sprache. Niemals Sprachen mischen.

ANTWORTSTIL:
- Natürlich und klar wie ChatGPT
- Kurze, verständliche Sätze
- Keine Fehler, keine Wiederholungen
- Struktur: Direkte Antwort → Nutzen erklären → Abschlussfrage

OVIVO LEISTUNGEN:
• WhatsApp-Automatisierung
• Buchungen und Termine
• KI-Chatbot für Website
• Kundenservice-Automatisierung
• Follow-up-Nachrichten

VORTEILE:
• Setup in 5–14 Tagen
• Kein technisches Wissen nötig
• Weniger manuelle Arbeit
• Mehr Buchungen und Anfragen

PREISE:
• Starter: ab 1.200 EUR + 120 EUR/Monat
• Business: ab 2.200 EUR + 220 EUR/Monat (beliebtestes Paket)
• Full: ab 3.200 EUR + 450 EUR/Monat

VERBOTEN:
- Sprachmischung
- Lange unverständliche Sätze
- Roboterhafte Antworten
- Falsche oder erfundene Preise
- Wörter oder Sätze abbrechen — immer vollständige Wörter und Sätze schreiben

LEAD-ERFASSUNG:
Wenn der Nutzer echtes Interesse zeigt, frage nach Name und Kontakt. Sobald du Name + Telefon oder E-Mail kennst, füge am ENDE exakt dieses JSON ein:
{"lead":{"name":"Max","company":"Restaurant","email":"max@test.de","phone":"01234"}}
Leere Felder als "". Nur gültiges JSON. Kein Text danach.

Beispielantwort (Deutsch):
"Klar 👍
Wir automatisieren WhatsApp, Buchungen und Kundenkommunikation.
Das spart täglich Zeit und bringt mehr Anfragen.
Möchten Sie sich auf WhatsApp oder den gesamten Prozess konzentrieren?"`

const SYSTEM_PROMPT_EN = `You are an AI assistant for Ovivo, specialized in AI automation for restaurants and businesses.

GOAL: Professional, clear and persuasive answers — guide visitors toward a free consultation.

LANGUAGE: Detect the user's language automatically and ALWAYS respond in the same language. Never mix languages.

RESPONSE STYLE:
- Natural and clear like ChatGPT
- Short, easy-to-understand sentences
- No errors, no repetition
- Structure: Direct answer → Explain benefit → Closing question

OVIVO SERVICES:
• WhatsApp automation
• Bookings and appointments
• AI chatbot for website
• Customer service automation
• Follow-up messages

BENEFITS:
• Setup in 5–14 days
• No technical knowledge needed
• Less manual work
• More bookings and inquiries

PRICING:
• Starter: from 1,200 EUR + 120 EUR/month
• Business: from 2,200 EUR + 220 EUR/month (most popular)
• Full: from 3,200 EUR + 450 EUR/month

FORBIDDEN:
- Mixing languages
- Long confusing sentences
- Robotic answers
- Made-up prices
- Cutting words or sentences mid-way — always complete every word and sentence fully

LEAD CAPTURE:
When the user shows genuine interest, ask for name and contact. Once you have name + phone or email, add this JSON at the END:
{"lead":{"name":"John","company":"Restaurant","email":"john@test.com","phone":"01234"}}
Empty fields as "". Valid JSON only. No text after it.

Example answer (English):
"Sure 👍
We automate WhatsApp, bookings, and customer communication.
This saves time daily and increases inquiries.
Would you like to focus on WhatsApp or the full process?"`


const SYSTEM_PROMPT_AR = `أنت خبير تسويق ورقمي متمرس لدى Ovivo، خبرتك 7 سنوات في:
- التسويق الرقمي (Meta Ads, Google Ads, SEO, Content)
- بناء المواقع والهوية البصرية
- أتمتة الأعمال (WhatsApp, CRM, Chatbots)
- استراتيجيات المبيعات وزيادة الإيرادات

شخصيتك: مباشر، ذكي، عملي — تعطي نصائح حقيقية بناءً على خبرة فعلية، مثل صديق خبير وليس روبوت.

قواعد المحادثة:
1. تذكّر اسم الشخص طوال المحادثة واستخدمه
2. رد دائماً بالعربية — جمل كاملة بدون أي قطع أو حذف
3. اكتب كل كلمة كاملة — ممنوع اختصار أو قطع الكلمات
4. سؤال واحد في نهاية كل رد
5. ردود قصيرة وواضحة — 3 إلى 5 أسطر كحد أقصى
6. تقديم نصائح تسويقية عملية وحقيقية من خبرتك

خدمات Ovivo التي تقدمها:
- أتمتة واتساب والتواصل مع العملاء
- شات ذكي للموقع يحول الزوار لعملاء
- نظام حجوزات ومواعيد تلقائي
- CRM لإدارة العملاء ومتابعتهم
- أتمتة التسويق والمتابعة التلقائية
- بناء الهوية البصرية والمواقع
الأسعار: أساسية 1200 يورو + 120 شهرياً | أعمال 2200 + 220 | كاملة 3200 + 450

ممنوع:
- قطع أي كلمة في المنتصف
- إرسال روابط خارجية
- الخروج عن مجال التسويق وخدمات Ovivo
- نسيان اسم الشخص بعد ذكره

التقاط بيانات العميل:
عند اهتمام حقيقي، اطلب الاسم والتواصل بشكل طبيعي. بمجرد معرفة الاسم مع الهاتف أو البريد، أضف هذا JSON في السطر الأخير فقط:
{"lead":{"name":"محمد","company":"مطعم","email":"","phone":"0501234"}}
الحقول الفارغة كـ "". JSON صحيح فقط في سطر منفصل. لا نص بعده أبداً.`use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;

}

const SYSTEM_PROMPT_DE = `Du bist ein KI-Assistent von Ovivo, spezialisiert auf KI-Automatisierung für Restaurants und Unternehmen.

ZIEL: Professionelle, klare und überzeugende Antworten — Besucher zur kostenlosen Beratung führen.

SPRACHE: Erkenne die Sprache des Nutzers automatisch und antworte IMMER in derselben Sprache. Niemals Sprachen mischen.

ANTWORTSTIL:
- Natürlich und klar wie ChatGPT
- Kurze, verständliche Sätze
- Keine Fehler, keine Wiederholungen
- Struktur: Direkte Antwort → Nutzen erklären → Abschlussfrage

OVIVO LEISTUNGEN:
• WhatsApp-Automatisierung
• Buchungen und Termine
• KI-Chatbot für Website
• Kundenservice-Automatisierung
• Follow-up-Nachrichten

VORTEILE:
• Setup in 5–14 Tagen
• Kein technisches Wissen nötig
• Weniger manuelle Arbeit
• Mehr Buchungen und Anfragen

PREISE:
• Starter: ab 1.200 EUR + 120 EUR/Monat
• Business: ab 2.200 EUR + 220 EUR/Monat (beliebtestes Paket)
• Full: ab 3.200 EUR + 450 EUR/Monat

VERBOTEN:
- Sprachmischung
- Lange unverständliche Sätze
- Roboterhafte Antworten
- Falsche oder erfundene Preise
- Wörter oder Sätze abbrechen — immer vollständige Wörter und Sätze schreiben

LEAD-ERFASSUNG:
Wenn der Nutzer echtes Interesse zeigt, frage nach Name und Kontakt. Sobald du Name + Telefon oder E-Mail kennst, füge am ENDE exakt dieses JSON ein:
{"lead":{"name":"Max","company":"Restaurant","email":"max@test.de","phone":"01234"}}
Leere Felder als "". Nur gültiges JSON. Kein Text danach.

Beispielantwort (Deutsch):
"Klar 👍
Wir automatisieren WhatsApp, Buchungen und Kundenkommunikation.
Das spart täglich Zeit und bringt mehr Anfragen.
Möchten Sie sich auf WhatsApp oder den gesamten Prozess konzentrieren?"`

const SYSTEM_PROMPT_EN = `You are an AI assistant for Ovivo, specialized in AI automation for restaurants and businesses.

GOAL: Professional, clear and persuasive answers — guide visitors toward a free consultation.

LANGUAGE: Detect the user's language automatically and ALWAYS respond in the same language. Never mix languages.

RESPONSE STYLE:
- Natural and clear like ChatGPT
- Short, easy-to-understand sentences
- No errors, no repetition
- Structure: Direct answer → Explain benefit → Closing question

OVIVO SERVICES:
• WhatsApp automation
• Bookings and appointments
• AI chatbot for website
• Customer service automation
• Follow-up messages

BENEFITS:
• Setup in 5–14 days
• No technical knowledge needed
• Less manual work
• More bookings and inquiries

PRICING:
• Starter: from 1,200 EUR + 120 EUR/month
• Business: from 2,200 EUR + 220 EUR/month (most popular)
• Full: from 3,200 EUR + 450 EUR/month

FORBIDDEN:
- Mixing languages
- Long confusing sentences
- Robotic answers
- Made-up prices
- Cutting words or sentences mid-way — always complete every word and sentence fully

LEAD CAPTURE:
When the user shows genuine interest, ask for name and contact. Once you have name + phone or email, add this JSON at the END:
{"lead":{"name":"John","company":"Restaurant","email":"john@test.com","phone":"01234"}}
Empty fields as "". Valid JSON only. No text after it.

Example answer (English):
"Sure 👍
We automate WhatsApp, bookings, and customer communication.
This saves time daily and increases inquiries.
Would you like to focus on WhatsApp or the full process?"`


const SYSTEM_PROMPT_AR = `أنت مساعد ذكاء اصطناعي لشركة Ovivo، متخصصة في أتمتة الأعمال للمطاعم والشركات.

الهدف: تقديم إجابات احترافية وواضحة ومقنعة — توجيه الزائر نحو الاستشارة المجانية.

اللغة: اكتشف لغة المستخدم تلقائياً وأجب دائماً بنفس اللغة. لا تخلط بين اللغات أبداً.

أسلوب الرد:
- طبيعي وواضح مثل ChatGPT
- جمل قصيرة وسهلة الفهم
- بلا أخطاء ولا تكرار
- الترتيب: رد مباشر ← شرح الفائدة ← سؤال ختامي ذكي

خدمات Ovivo:
• أتمتة واتساب
• الحجوزات والمواعيد
• شات ذكي للموقع
• خدمة العملاء التلقائية
• رسائل المتابعة

المزايا:
• إعداد خلال 5 إلى 14 يوم
• لا تحتاج خبرة تقنية
• تقليل العمل اليدوي
• زيادة الطلبات والحجوزات

الأسعار:
• الباقة الأساسية: من 1200 يورو + 120 يورو شهرياً
• باقة الأعمال: من 2200 يورو + 220 يورو شهرياً (الأكثر طلباً)
• الباقة الكاملة: من 3200 يورو + 450 يورو شهرياً

ممنوع:
- خلط اللغات
- الجمل الطويلة غير المفهومة
- الردود الآلية الباردة
- ذكر أسعار غير محددة
- قطع الكلمات أو الجمل في المنتصف — أكمل كل كلمة وكل جملة دائماً
- الردود المختصرة جداً التي تحذف أجزاء مهمة

التقاط بيانات العميل:
عند اهتمام حقيقي من المستخدم، اسأله عن اسمه وطريقة التواصل. بمجرد معرفة الاسم مع الهاتف أو البريد، أضف هذا JSON في نهاية ردك:
{"lead":{"name":"محمد","company":"مطعم","email":"","phone":"0501234"}}
الحقول الفارغة كـ "". JSON صحيح فقط. لا نص بعده.

مثال على رد صحيح بالعربية:
"تمام 👌
نقدر نساعدك في أتمتة واتساب واستقبال الطلبات وتنظيم المواعيد.
هذا يوفر وقتك ويزيد عدد عملائك.
هل تريد التركيز على واتساب أم إدارة العمليات بالكامل؟"`


const OPENINGS = {
  de: 'Willkommen bei Ovivo 👋\n\nIch helfe Ihnen bei der Automatisierung von WhatsApp, Buchungen und Kundenservice mit KI.\n\nWie kann ich Ihnen helfen?',
  en: 'Welcome to Ovivo 👋\n\nI can help you automate WhatsApp, bookings, and customer communication with AI.\n\nHow can I help you today?',
  ar: 'مرحباً بك في Ovivo 👋\n\nيمكنني مساعدتك في أتمتة واتساب والحجوزات وخدمة العملاء بالذكاء الاصطناعي.\n\nكيف يمكنني مساعدتك؟',
};

const QUICK_PROMPTS = {
  de: ['Restaurant / Café', 'Friseur / Beauty', 'Fitness / Wellness', 'Preise zeigen'],
  en: ['Restaurant / Café', 'Hair / Beauty', 'Fitness / Wellness', 'Show pricing'],
  ar: ['مطعم / مقهى', 'صالون / تجميل', 'لياقة / رفاهية', 'أرني الأسعار'],
};

function extractLead(text: string): Record<string, string> | null {
  try {
    // Pattern 1: {"lead":{...}}
    const m1 = text.match(/\{"lead"\s*:\s*(\{[^}]+\})\s*\}/);
    if (m1) {
      const lead = JSON.parse(m1[1]) as Record<string, string>;
      if (lead.name || lead.email || lead.phone) return lead;
    }
    // Pattern 2: flat {"name":...,"phone":...}
    const m2 = text.match(/\{[^{}]*"name"\s*:[^{}]*\}/);
    if (m2) {
      const obj = JSON.parse(m2[0]) as Record<string, string>;
      if (obj.name || obj.email || obj.phone) return obj;
    }
    // Pattern 3: extract fields manually if JSON is malformed
    const nameM = text.match(/"name"\s*:\s*"([^"]+)"/);
    const phoneM = text.match(/"phone"\s*:\s*"?([0-9+][0-9 +\-]{5,})"?/);
    const emailM = text.match(/"email"\s*:\s*"([^"@]+@[^"]+)"/);
    const companyM = text.match(/"company"\s*:\s*"([^"]+)"/);
    if (nameM || phoneM || emailM) {
      return {
        name: nameM?.[1] ?? '',
        phone: phoneM?.[1] ?? '',
        email: emailM?.[1] ?? '',
        company: companyM?.[1] ?? '',
      };
    }
  } catch {}
  return null;
}

function stripLeadJson(text: string): string {
  return text.replace(/\{"lead"\s*:\s*\{[^}]+\}\s*\}/g, '').trim();
}

export function SalesChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [unread, setUnread] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [langOverride, setLangOverride] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en') ?? false;
  const isAr = pathname?.startsWith('/ar') ?? false;
  const rtl = isAr;
  const isConsultationPage = pathname?.includes('/consultation') ?? false;

  // Detect language from URL, then browser language, then default DE
  const detectedLang = isEn ? 'en' : isAr ? 'ar' : (() => {
    if (typeof navigator !== 'undefined') {
      const bl = (navigator.language ?? '').toLowerCase();
      if (bl.startsWith('ar')) return 'ar';
      if (bl.startsWith('en')) return 'en';
    }
    return 'de';
  })();
  const lang = (langOverride ?? detectedLang) as 'de' | 'en' | 'ar';
  const systemPrompt = lang === 'en' ? SYSTEM_PROMPT_EN : lang === 'ar' ? SYSTEM_PROMPT_AR : SYSTEM_PROMPT_DE;

  const labels = {
    de: { trigger: 'Mit Ovivo sprechen', placeholder: 'Nachricht...', title: 'Ovivo', sub: '', error: 'Fehler. Bitte erneut versuchen.' },
    en: { trigger: 'Talk to Ovivo', placeholder: 'Message...', title: 'Ovivo', sub: '', error: 'Something went wrong. Try again.' },
    ar: { trigger: 'تحدث مع Ovivo', placeholder: 'رسالة...', title: 'Ovivo', sub: '', error: 'حدث خطأ. حاول مجدداً.' },
  }[lang];

  // Auto-open after 15s
  useEffect(() => {
    if (isConsultationPage) return;
    const t = setTimeout(() => { setOpen(true); setUnread(false); }, 15000);
    return () => clearTimeout(t);
  }, [isConsultationPage]);

  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ role: 'assistant', content: OPENINGS[lang] }]);
  }, [open, lang]);

  useEffect(() => {
    if (!open && messages.length > 1) setUnread(true);
  }, [messages.length, open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, minimized]);

  const saveLead = useCallback(async (lead: Record<string, string> | null) => {
    if (!lead || leadSaved || (!lead.name && !lead.email && !lead.phone)) return;
    setLeadSaved(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lead.name, email: lead.email, company: lead.company, message: lead.phone ? `Phone: ${lead.phone}` : 'via chat', source: 'chat_widget' }),
      });
    } catch {}
  }, [leadSaved]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');
    setShowQuick(false);
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build messages for API: system prompt first as a user-injected context
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, mode: 'sales_widget', plan: 'free', systemOverride: systemPrompt }),
      });

      if (!res.ok) throw new Error();
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const display = stripLeadJson(full);
        setMessages((prev) => {
          const u = [...prev];
          u[u.length - 1] = { role: 'assistant', content: display };
          return u;
        });
      }

      // Try to fix truncated JSON before extracting lead
      let fixedFull = full;
      if (full.includes('{"lead":') && !full.includes('}}')) {
        fixedFull = full + '}}';
      } else if (full.includes('"phone":"') && !full.endsWith('}}')) {
        const jsonStart = full.lastIndexOf('{"lead":');
        if (jsonStart !== -1) {
          const partial = full.slice(jsonStart);
          const phoneMatch = partial.match(/"phone":"([^"]*)/);
          const nameMatch = partial.match(/"name":"([^"]*)/);
          const companyMatch = partial.match(/"company":"([^"]*)/);
          const emailMatch = partial.match(/"email":"([^"]*)/);
          if (phoneMatch || nameMatch) {
            fixedFull = full.slice(0, jsonStart) + JSON.stringify({
              lead: {
                name: nameMatch?.[1] ?? '',
                company: companyMatch?.[1] ?? '',
                email: emailMatch?.[1] ?? '',
                phone: phoneMatch?.[1] ?? '',
              }
            });
          }
        }
      }

      await saveLead(extractLead(fixedFull));
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: labels.error }]);
    } finally {
      setLoading(false);
    }
  }

  if (isConsultationPage) return null;

  return (
    <div className='fixed bottom-5 right-5 z-50' dir={rtl ? 'rtl' : 'ltr'}>
      {/* Chat window */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[350px] sm:w-[370px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
            style={{ background: 'rgba(9,13,24,0.98)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/8"
              style={{ background: 'linear-gradient(135deg,rgba(37,99,235,0.18) 0%,transparent 70%)' }}>
              <div className="relative flex-shrink-0">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-blue-500/30 shadow-lg">
                  <Bot className="h-[15px] w-[15px] text-white" />
                </div>
                <span className="absolute -bottom-px -right-px h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#090d18]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-white leading-none truncate">{labels.title}</p>
                {labels.sub && <p className="text-[10px] text-emerald-400/80 mt-0.5">{labels.sub}</p>}
              </div>
              <div className="flex gap-0.5">
                <div className="flex gap-0.5 mr-1">
                  {(['de','en','ar'] as const).map(l => (
                    <button key={l} onClick={() => { setLangOverride(l); setMessages([]); }}
                      className={`h-5 px-1.5 rounded text-[9px] font-bold transition-all ${lang === l ? 'bg-blue-500/30 text-blue-300' : 'text-gray-600 hover:text-gray-400'}`}>
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button onClick={() => setMinimized(true)} className="h-6 w-6 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-300 hover:bg-white/8 transition-all">
                  <Minimize2 className="h-3 w-3" />
                </button>
                <button onClick={() => setOpen(false)} className="h-6 w-6 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-300 hover:bg-white/8 transition-all">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto px-3.5 py-3.5 space-y-2.5" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex gap-2 ${msg.role === 'user' ? (rtl ? 'flex-row' : 'flex-row-reverse') : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-5 w-5 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-2.5 w-2.5 text-blue-400" />
                    </div>
                  )}
                  <div className={`max-w-[84%] rounded-xl px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'assistant'
                      ? `bg-white/[0.055] border border-white/[0.07] text-gray-100 ${rtl ? 'rounded-tr-sm' : 'rounded-tl-sm'}`
                      : `bg-blue-500 text-white ${rtl ? 'rounded-tl-sm' : 'rounded-tr-sm'}`
                  } ${rtl ? 'text-right' : ''}`}>
                    {msg.content || (
                      <span className="flex gap-1 items-center">
                        {[0,1,2].map(j => <motion.span key={j} className="h-1.5 w-1.5 rounded-full bg-gray-500 block" animate={{opacity:[0.3,1,0.3],y:[0,-2,0]}} transition={{duration:0.8,repeat:Infinity,delay:j*0.15}} />)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && messages[messages.length-1]?.role !== 'assistant' && (
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-2.5 w-2.5 text-blue-400" />
                  </div>
                  <div className="bg-white/[0.055] border border-white/[0.07] rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
                    {[0,1,2].map(j => <motion.span key={j} className="h-1.5 w-1.5 rounded-full bg-gray-500 block" animate={{opacity:[0.3,1,0.3],y:[0,-2,0]}} transition={{duration:0.8,repeat:Infinity,delay:j*0.15}} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <AnimatePresence>
              {showQuick && messages.length <= 1 && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 px-3.5 py-2.5">
                    {QUICK_PROMPTS[lang].map(p => (
                      <button key={p} onClick={() => send(p)}
                        className="text-[11px] text-gray-500 border border-white/8 rounded-full px-2.5 py-1 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/8 transition-all">
                        {p}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-white/8 px-3.5 pb-3.5 pt-2.5">
              <div className="flex gap-2 items-end">
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder={labels.placeholder} rows={1} dir={rtl ? 'rtl' : 'ltr'}
                  className="flex-1 bg-white/[0.05] border border-white/[0.09] rounded-xl px-3 py-2 text-[12.5px] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 resize-none leading-snug"
                  style={{ minHeight: '36px', maxHeight: '88px' }}
                  onInput={e => { const t = e.currentTarget; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight,88)+'px'; }}
                />
                <button onClick={() => send(input)} disabled={!input.trim() || loading}
                  className="h-9 w-9 flex-shrink-0 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-25 flex items-center justify-center transition-all shadow-lg shadow-blue-500/20">
                  <Send className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized bar */}
      <AnimatePresence>
        {open && minimized && (
          <motion.button initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}
            onClick={() => setMinimized(false)}
            className="mb-3 rounded-2xl border border-white/10 px-3.5 py-2.5 flex items-center gap-2 shadow-xl hover:border-white/20 transition-all"
            style={{ background: 'rgba(9,13,24,0.96)', backdropFilter: 'blur(16px)' }}>
            <Bot className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-[13px] font-semibold text-white">{labels.title}</span>
            <ChevronDown className="h-3 w-3 text-gray-500 rotate-180 ml-1 flex-shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => { setOpen(v => !v); setUnread(false); setMinimized(false); }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        className="relative flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(37,99,235,0.5)] border border-blue-500/25 transition-all"
        style={{ background: 'linear-gradient(135deg,#2563eb,#1e40af)' }}
      >
        {unread && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-[#090d18] animate-pulse" />
        )}
        <Sparkles className="h-4 w-4 text-white flex-shrink-0" />
        <span className="text-[13px] font-bold text-white whitespace-nowrap">{labels.trigger}</span>
        <AnimatePresence>
          {open && <motion.div initial={{opacity:0,rotate:-90}} animate={{opacity:1,rotate:0}} exit={{opacity:0}}>
            <X className="h-3.5 w-3.5 text-white/60" />
          </motion.div>}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
