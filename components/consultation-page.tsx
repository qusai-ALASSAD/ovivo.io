'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot, Send, User, Sparkles, ArrowRight, CircleCheck as CheckCircle,
  Phone, Mail, MessageSquare, Zap, Shield, Clock, Star, Calendar,
} from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const aiResponses = {
  de: [
    {
      triggers: ['hallo', 'hi', 'guten tag', 'guten morgen', 'hey', 'start', 'starten'],
      response: 'Schön, dass Sie hier sind! Ich bin Ihr persönlicher Berater bei Ovivo — kein Chatbot, sondern ein KI-Assistent, der wirklich versteht, wie Betriebe wie Ihrer funktionieren.\n\nWas beschäftigt Sie gerade am meisten: zu viele manuelle Aufgaben, verpasste Buchungen, oder möchten Sie einfach mehr über unsere Lösungen erfahren?',
    },
    {
      triggers: ['restaurant', 'gastronomie', 'essen', 'bistro', 'bar'],
      response: 'Gastronomie kenne ich gut — es ist eine Branche, in der jede verpasste Reservierung echtes Geld kostet.\n\nFür Restaurants setzen wir typischerweise um:\n✓ Automatische Tischreservierungen (24/7 — auch nachts)\n✓ WhatsApp-Automation für Gästekommunikation\n✓ Erinnerungen & No-Show-Reduktion\n✓ Follow-up & Bewertungsanfragen nach dem Besuch\n\nEin Restaurant in München spart damit täglich 2 Stunden und hat 35% mehr Umsatz generiert. Wie viele Tische haben Sie, und wie kommen aktuell Ihre Reservierungen rein?',
    },
    {
      triggers: ['café', 'cafe', 'kaffee', 'bäckerei', 'konditorei'],
      response: 'Cafés und Bäckereien profitieren enorm von Automation — besonders bei den Stoßzeiten, wenn das Team sowieso ausgelastet ist.\n\nWas wir für Cafés einrichten:\n✓ Vorbestellungen automatisch verwalten\n✓ Tagesspecials per WhatsApp an Stammkunden\n✓ KI beantwortet Menü- und Öffnungszeitfragen sofort\n✓ Treue-Programm ohne zusätzlichen Aufwand\n\nEin Café in Hamburg hat die Stammkundenbesuche um 40% gesteigert — in nur 3 Monaten. Was ist bei Ihnen aktuell das größte Problem?',
    },
    {
      triggers: ['friseur', 'beauty', 'salon', 'kosmetik', 'massage', 'spa'],
      response: 'Beauty & Wellness — eine Branche, in der Terminsystem und Kundenbindung alles sind.\n\nFür Salons und Studios richten wir ein:\n✓ Online-Terminbuchung, die rund um die Uhr funktioniert\n✓ Automatische Erinnerungen (fast keine No-Shows mehr)\n✓ Follow-up nach dem Termin + Bewertungsanfrage\n✓ WhatsApp für schnelle Rückfragen und Umbuchungen\n\nUnsere Kunden berichten von 45% weniger No-Shows und deutlich mehr Neubuchungen. Wie viele Termine nehmen Sie aktuell pro Woche an?',
    },
    {
      triggers: ['fitness', 'gym', 'sport', 'training', 'studio'],
      response: 'Fitness-Studios haben oft das gleiche Problem: viele Anfragen, wenig Zeit für echte Betreuung.\n\nMit Ovivo automatisieren wir:\n✓ Probe-Training Buchungen und Erinnerungen\n✓ Mitglieder-Follow-up (Retention verbessern)\n✓ Kursplan-Kommunikation per WhatsApp\n✓ Lead Capture für Interessenten, die noch unentschlossen sind\n\nWie viele aktive Mitglieder haben Sie, und was kostet Sie aktuell die meiste Zeit?',
    },
    {
      triggers: ['preis', 'kosten', 'wie viel', 'was kostet', 'preise', 'pakete', 'angebot'],
      response: 'Gute Frage — ich bin transparent bei Preisen:\n\n🔹 Starter — ab €1.200 Setup + €120/Monat\nKI-Chatbot, Lead Capture, WhatsApp Integration\nIdeal für Einsteiger und kleinere Betriebe\n\n🔷 Business — ab €2.200 Setup + €220/Monat\nErweiterter Chatbot, Buchungssystem, CRM, Follow-up\nFür Betriebe, die alles aus einer Hand wollen\n\n🔶 Full Automation — ab €3.200 Setup + €450/Monat\nKomplettes System + Marketing Automation\nFür Betriebe mit hohem Volumen und ambitionierten Zielen\n\nDer genaue Preis hängt von Ihrer Betriebsgröße ab. In einer kostenlosen Beratung zeige ich Ihnen, welches Paket sich rechnet — und warum.',
    },
    {
      triggers: ['wie lange', 'wie schnell', 'setup', 'einrichtung', 'dauer', 'wann'],
      response: 'Schneller als die meisten erwarten:\n\n• Starter: 5–7 Werktage\n• Business: 7–10 Werktage\n• Full Automation: 10–14 Werktage\n\nSie müssen nichts selbst tun — wir übernehmen die komplette Einrichtung, Integration und Schulung. Nach dem Go-live stehen wir für Optimierungen und Support zur Seite.\n\nWann würden Sie idealerweise starten wollen?',
    },
    {
      triggers: ['whatsapp', 'messaging', 'nachrichten', 'chat'],
      response: 'WhatsApp ist der stärkste Kanal, den wir einsetzen — weil Ihre Kunden ihn bereits täglich nutzen.\n\nWir richten ein:\n✓ Automatische Antworten auf häufige Fragen (24/7)\n✓ Buchungsbestätigungen und -erinnerungen\n✓ Broadcast-Nachrichten für Angebote & Events\n✓ Lead-Qualifizierung direkt im Chat\n\nAlles DSGVO-konform, auf Deutsch und vollständig automatisiert. Haben Sie aktuell schon eine WhatsApp Business-Nummer?',
    },
    {
      triggers: ['beratung', 'kontakt', 'anfrage', 'besprechen', 'gespräch', 'termin', 'kennenlernen'],
      response: 'Sehr gerne! Eine 30-minütige kostenlose Beratung ist unser bester erster Schritt.\n\nDarin analysieren wir Ihren Betrieb, zeigen Ihnen konkret welches Potenzial Sie aktuell verschenken, und entwickeln einen maßgeschneiderten Automation-Plan — ohne Verkaufsdruck.\n\nFüllen Sie einfach das Formular rechts aus — ich sorge dafür, dass Sie innerhalb von 24 Stunden von einem unserer Experten kontaktiert werden.',
    },
  ],
  en: [
    {
      triggers: ['hello', 'hi', 'good morning', 'hey', 'start'],
      response: "Great to have you here! I'm your personal advisor at Ovivo — not a generic chatbot, but an AI assistant that genuinely understands how businesses like yours work.\n\nWhat's on your mind most right now: too many manual tasks, missed bookings, or just wanting to learn more about what we offer?",
    },
    {
      triggers: ['restaurant', 'hospitality', 'food', 'bistro', 'bar', 'dining'],
      response: "I know hospitality well — it's an industry where every missed reservation is real lost money.\n\nFor restaurants we typically implement:\n✓ Automatic table reservations (24/7 — even at night)\n✓ WhatsApp automation for guest communication\n✓ Reminders & no-show reduction\n✓ Follow-up & review requests after the visit\n\nA restaurant in Munich now saves 2 hours daily and generated 35% more revenue. How many tables do you have, and how do your reservations come in currently?",
    },
    {
      triggers: ['café', 'cafe', 'coffee', 'bakery'],
      response: "Cafés and bakeries benefit enormously from automation — especially during peak hours when the team is already stretched.\n\nWhat we set up for cafés:\n✓ Manage pre-orders automatically\n✓ Daily specials via WhatsApp to regulars\n✓ AI instantly answers menu & opening hour questions\n✓ Loyalty program without extra effort\n\nA café in Hamburg increased regular customer visits by 40% in just 3 months. What's your biggest challenge right now?",
    },
    {
      triggers: ['hair', 'beauty', 'salon', 'spa', 'massage', 'cosmetic'],
      response: "Beauty & wellness — an industry where booking systems and customer retention are everything.\n\nFor salons and studios we set up:\n✓ Online booking that works around the clock\n✓ Automatic reminders (nearly no more no-shows)\n✓ Follow-up after appointment + review request\n✓ WhatsApp for quick questions and rebooking\n\nOur clients report 45% fewer no-shows and significantly more new bookings. How many appointments do you currently take per week?",
    },
    {
      triggers: ['price', 'cost', 'how much', 'pricing', 'packages', 'quote'],
      response: "Good question — I'm transparent about pricing:\n\n🔹 Starter — from €1,200 setup + €120/month\nAI chatbot, lead capture, WhatsApp integration\nIdeal for beginners and smaller businesses\n\n🔷 Business — from €2,200 setup + €220/month\nAdvanced chatbot, booking system, CRM, follow-up\nFor businesses that want everything from one source\n\n🔶 Full Automation — from €3,200 setup + €450/month\nComplete system + marketing automation\nFor high-volume businesses with ambitious goals\n\nThe exact price depends on your business size. In a free consultation I'll show you which package makes sense — and why.",
    },
    {
      triggers: ['how long', 'how fast', 'setup', 'installation', 'when'],
      response: "Faster than most expect:\n\n• Starter: 5–7 business days\n• Business: 7–10 business days\n• Full Automation: 10–14 business days\n\nYou don't have to do anything yourself — we handle the complete setup, integration, and training. After go-live, we stay available for optimizations and support.\n\nWhen would you ideally like to start?",
    },
    {
      triggers: ['whatsapp', 'messaging', 'chat'],
      response: "WhatsApp is the most powerful channel we use — because your customers already use it every day.\n\nWe set up:\n✓ Automatic replies to common questions (24/7)\n✓ Booking confirmations and reminders\n✓ Broadcast messages for offers & events\n✓ Lead qualification directly in the chat\n\nAll GDPR-compliant and fully automated. Do you already have a WhatsApp Business number?",
    },
    {
      triggers: ['consultation', 'contact', 'inquiry', 'discuss', 'call', 'meeting'],
      response: "Absolutely! A 30-minute free consultation is our best first step.\n\nIn it we analyze your business, show you exactly what potential you're currently leaving on the table, and develop a tailored automation plan — no sales pressure.\n\nJust fill in the form on the right — I'll make sure one of our experts contacts you within 24 hours.",
    },
  ],
};

const aiResponsesAR = [
  {
    triggers: ['مرحبا', 'مرحباً', 'السلام', 'هلا', 'أهلا', 'أهلاً', 'ابدأ', 'ابدا'],
    response: 'أهلاً بك! أنا مستشارك الذكي في أوفيفو — هنا لأفهم عملك وأريك تحديداً كيف يمكن للأتمتة أن ترفع إيراداتك.\n\nأخبرني: ما أكبر تحدٍّ يواجهك الآن — كثرة الاستفسارات اليدوية؟ حجوزات فائتة؟ أم تريد معرفة المزيد عن حلولنا؟',
  },
  {
    triggers: ['مطعم', 'مطاعم', 'مقهى', 'مقاهي', 'كافيه', 'كافيهات', 'فندق', 'ضيافة'],
    response: 'قطاع المطاعم هو تخصصنا الأول — وكل حجز فائت يعني خسارة حقيقية.\n\nما نطبقه للمطاعم:\n✓ حجز الطاولات تلقائياً (24/7 — حتى في منتصف الليل)\n✓ أتمتة واتساب للتواصل مع الضيوف\n✓ تذكيرات تلقائية لتقليل الغياب\n✓ طلبات تقييم بعد الزيارة تُرسل تلقائياً\n\nأحد مطاعمنا وفّر ساعتين يومياً وحقق 35% نمواً في الإيرادات. كم عدد طاولاتك وكيف تصلك الحجوزات حالياً؟',
  },
  {
    triggers: ['صالون', 'تجميل', 'حلاق', 'مساج', 'سبا', 'لياقة', 'جيم'],
    response: 'قطاع الجمال واللياقة — نظام المواعيد وولاء العملاء هما كل شيء فيه.\n\nما نعده لك:\n✓ حجز مواعيد أونلاين يعمل على مدار الساعة\n✓ تذكيرات تلقائية (تقليل الغياب بنسبة 45%)\n✓ متابعة بعد الموعد + طلب تقييم\n✓ واتساب للردود السريعة وإعادة الجدولة\n\nعملاؤنا يرون 45% أقل غياب وحجوزات جديدة أكثر بكثير. كم موعداً تستقبل أسبوعياً؟',
  },
  {
    triggers: ['سعر', 'تكلفة', 'كم', 'أسعار', 'باقة', 'باقات', 'عرض'],
    response: 'نحن شفافون تماماً في الأسعار:\n\n🔹 الباقة الأساسية — من €1,200 إعداد + €120/شهر\nروبوت دردشة ذكي، التقاط العملاء، تكامل واتساب\nمثالي للمشاريع الصغيرة\n\n🔷 باقة الأعمال — من €2,200 إعداد + €220/شهر\nروبوت متطور، نظام حجز، إدارة علاقات العملاء، متابعة تلقائية\nللشركات التي تريد حلاً شاملاً\n\n🔶 الأتمتة الكاملة — من €3,200 إعداد + €450/شهر\nنظام ذكاء اصطناعي متكامل + أتمتة تسويق\nللشركات ذات الحجم العالي والطموح الكبير\n\nالسعر الدقيق يعتمد على حجم عملك. في استشارة مجانية، أريك أي باقة تناسبك وتحقق لك أفضل عائد.',
  },
  {
    triggers: ['مدة', 'وقت', 'متى', 'سرعة', 'إعداد', 'تشغيل'],
    response: 'أسرع مما تتوقع:\n\n• الباقة الأساسية: 5–7 أيام عمل\n• باقة الأعمال: 7–10 أيام عمل\n• الأتمتة الكاملة: 10–14 يوم عمل\n\nلا تحتاج لفعل أي شيء بنفسك — نحن نتولى الإعداد الكامل، التكامل، والتدريب. بعد الإطلاق نبقى معك للدعم والتحسين المستمر.\n\nمتى تريد البدء؟',
  },
  {
    triggers: ['واتساب', 'whatsapp', 'رسائل', 'تواصل'],
    response: 'واتساب هو أقوى قناة نستخدمها — لأن عملاءك يستخدمونه يومياً أصلاً.\n\nما نعده:\n✓ ردود تلقائية على الأسئلة الشائعة (24/7)\n✓ تأكيدات الحجز والتذكيرات\n✓ رسائل جماعية للعروض والفعاليات\n✓ تأهيل العملاء المحتملين مباشرة في المحادثة\n\nكل شيء آمن ومتوافق مع أنظمة الخصوصية، وتلقائي بالكامل. هل لديك حساب واتساب بزنس حالياً؟',
  },
  {
    triggers: ['استشارة', 'تواصل', 'موعد', 'كلام', 'اتصال', 'محادثة'],
    response: 'بكل سرور! استشارة 30 دقيقة مجانية هي أفضل خطوة أولى.\n\nفيها نحلل عملك، نريك بالضبط ما تخسره حالياً، ونضع خطة أتمتة مخصصة لك — بدون أي ضغط للبيع.\n\nاملأ النموذج على الجانب وسيتواصل معك أحد خبرائنا خلال 24 ساعة.',
  },
];

const defaultResponses = {
  de: 'Gute Frage! Für eine präzise Antwort, die wirklich auf Ihren Betrieb passt, empfehle ich ein kurzes Gespräch. Ich kann Ihnen dann gezielt zeigen, was in Ihrer Situation den größten Unterschied macht. Haben Sie noch weitere Fragen?',
  en: "Great question! For a precise answer that truly fits your business, I recommend a quick call. I can then show you specifically what makes the biggest difference in your situation. Do you have any other questions?",
  ar: 'سؤال رائع! للحصول على إجابة دقيقة تناسب وضعك تحديداً، أنصحك بمحادثة قصيرة مع أحد خبرائنا. هل تريد حجز استشارة مجانية الآن؟',
};

const quickPrompts = {
  de: [
    'Was kostet eine Automation?',
    'Wie schnell ist die Einrichtung?',
    'Für Restaurants geeignet?',
    'Was macht Ovivo anders?',
  ],
  en: [
    'What does automation cost?',
    'How fast is the setup?',
    'Suitable for restaurants?',
    'What makes Ovivo different?',
  ],
  ar: [
    'ما تكلفة الأتمتة؟',
    'كم يستغرق الإعداد؟',
    'مناسب للمطاعم؟',
    'ما الذي يميز أوفيفو؟',
  ],
};

const tx = {
  de: {
    badge: 'Kostenlose Beratung',
    headline: 'Bereit, Ihren Betrieb auf',
    headlineGradient: 'Autopilot zu setzen?',
    sub: 'Sprechen Sie zuerst mit unserem KI-Assistenten — oder füllen Sie direkt das Formular aus. Unser Team meldet sich innerhalb von 24 Stunden für ein kostenloses, unverbindliches Strategiegespräch.',
    chatTitle: 'Ovivo KI-Berater',
    chatSub: 'Fragen Sie mich alles — ich beantworte ehrlich',
    online: 'Online',
    placeholder: 'Ihre Frage...',
    quickLabel: 'Häufige Fragen',
    formTitle: 'Jetzt Beratungstermin anfragen',
    formSub: 'Kostenlos · Unverbindlich · Antwort in 24h',
    nameLabel: 'Ihr Name',
    emailLabel: 'E-Mail Adresse',
    phoneLabel: 'Telefon (optional)',
    companyLabel: 'Unternehmen & Branche',
    messageLabel: 'Was möchten Sie automatisieren?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max@restaurant.de',
    phonePlaceholder: '+49 176 ...',
    companyPlaceholder: 'Restaurant Bella Vista, Gastronomie',
    messagePlaceholder: 'Ich betreibe ein Restaurant mit 40 Tischen und möchte Reservierungen und WhatsApp automatisieren...',
    submitBtn: 'Beratungstermin anfragen',
    submitting: 'Wird gesendet...',
    successTitle: 'Anfrage erhalten!',
    successMsg: 'Perfekt! Wir melden uns innerhalb von 24 Stunden per E-Mail oder Telefon — mit einem konkreten Plan für Ihren Betrieb.',
    viewPricing: 'Pakete & Preise ansehen',
    trust: ['DSGVO-konform', 'Kostenlos & unverbindlich', 'Antwort in 24h'],
    contactDirect: 'Oder direkt Kontakt aufnehmen',
    statsTitle: 'Was unsere Kunden erreichen',
    stats: [
      { value: '94%', label: 'Anfragen automatisch beantwortet' },
      { value: '-70%', label: 'Weniger manuelle Arbeit' },
      { value: '+35%', label: 'Mehr Umsatz im Schnitt' },
      { value: '5–14', label: 'Tage bis zur Livestellung' },
    ],
    benefitsTitle: 'Was Sie in der Beratung erhalten',
    benefits: [
      'Analyse Ihres Betriebs & aktueller Schwachstellen',
      'Konkrete Automation-Strategie für Ihr Unternehmen',
      'Klare Kosten- & ROI-Einschätzung',
      'Ehrliche Empfehlung — kein Verkaufsdruck',
    ],
  },
  en: {
    badge: 'Free Consultation',
    headline: 'Ready to put your business on',
    headlineGradient: 'autopilot?',
    sub: 'Chat with our AI advisor first — or fill in the form directly. Our team will reach out within 24 hours for a free, no-obligation strategy call.',
    chatTitle: 'Ovivo AI Advisor',
    chatSub: 'Ask me anything — I answer honestly',
    online: 'Online',
    placeholder: 'Your question...',
    quickLabel: 'Common questions',
    formTitle: 'Request a consultation',
    formSub: 'Free · No obligation · Response in 24h',
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone (optional)',
    companyLabel: 'Business & Industry',
    messageLabel: 'What would you like to automate?',
    namePlaceholder: 'John Smith',
    emailPlaceholder: 'john@restaurant.com',
    phonePlaceholder: '+49 176 ...',
    companyPlaceholder: 'Restaurant Bella Vista, Hospitality',
    messagePlaceholder: "I run a restaurant with 40 tables and want to automate reservations and WhatsApp...",
    submitBtn: 'Request Consultation',
    submitting: 'Sending...',
    successTitle: 'Request received!',
    successMsg: "Perfect! We'll get back to you within 24 hours by email or phone — with a concrete plan for your business.",
    viewPricing: 'View packages & pricing',
    trust: ['GDPR compliant', 'Free & no obligation', 'Response in 24h'],
    contactDirect: 'Or contact us directly',
    statsTitle: 'What our clients achieve',
    stats: [
      { value: '94%', label: 'Inquiries answered automatically' },
      { value: '-70%', label: 'Less manual work' },
      { value: '+35%', label: 'More revenue on average' },
      { value: '5–14', label: 'Days to go live' },
    ],
    benefitsTitle: 'What you get in the consultation',
    benefits: [
      'Analysis of your business & current bottlenecks',
      'Concrete automation strategy for your company',
      'Clear cost & ROI assessment',
      'Honest recommendation — no sales pressure',
    ],
  },
  ar: {
    badge: 'استشارة مجانية — بلا التزام',
    headline: 'حوّل عملك إلى آلة',
    headlineGradient: 'تعمل بلا توقف',
    sub: 'ابدأ بمحادثة مع مستشارنا الذكي — أو أرسل طلبك مباشرة. سيتواصل معك خبير من فريقنا خلال 24 ساعة بخطة عملية واضحة لأعمالك.',
    chatTitle: 'المستشار الذكي لأوفيفو',
    chatSub: 'اسألني أي شيء — إجابات صادقة وعملية',
    online: 'متاح الآن',
    placeholder: 'اكتب سؤالك هنا...',
    quickLabel: 'أسئلة يطرحها كثيرون',
    formTitle: 'احجز استشارتك المجانية',
    formSub: 'مجاني تماماً · بلا التزام · رد مضمون خلال 24 ساعة',
    nameLabel: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'رقم الهاتف (اختياري)',
    companyLabel: 'اسم الشركة والقطاع',
    messageLabel: 'ما الذي تريد أتمتته في عملك؟',
    namePlaceholder: 'محمد أحمد',
    emailPlaceholder: 'mohammed@example.com',
    phonePlaceholder: '+966 5x xxx xxxx',
    companyPlaceholder: 'مطعم النخبة، قطاع المطاعم',
    messagePlaceholder: 'أدير مطعماً وأريد أتمتة الحجوزات وردود واتساب وتذكير العملاء...',
    submitBtn: 'احجز استشارتي المجانية',
    submitting: 'جارٍ الإرسال...',
    successTitle: 'تم استلام طلبك بنجاح!',
    successMsg: 'شكراً! سيتواصل معك أحد خبرائنا خلال 24 ساعة عبر البريد أو الهاتف — مع خطة أتمتة مخصصة لعملك.',
    viewPricing: 'استعرض الباقات والأسعار',
    trust: ['آمن وموثوق', 'مجاني وبلا التزام', 'رد خلال 24 ساعة'],
    contactDirect: 'أو تواصل معنا مباشرة',
    statsTitle: 'نتائج حقيقية يحققها عملاؤنا',
    stats: [
      { value: '94%', label: 'من الاستفسارات تُجاب تلقائياً' },
      { value: '-70%', label: 'انخفاض في العمل اليدوي' },
      { value: '+35%', label: 'نمو في الإيرادات بالمتوسط' },
      { value: '5–14', label: 'يوم فقط حتى الإطلاق' },
    ],
    benefitsTitle: 'ماذا ستحصل في استشارتك؟',
    benefits: [
      'تشخيص دقيق لعملك وتحديد نقاط الهدر الحالية',
      'خطة أتمتة مخصصة 100% لطبيعة نشاطك التجاري',
      'صورة واضحة للتكاليف والعائد المتوقع على الاستثمار',
      'نصيحة صريحة وموضوعية — بدون أي ضغط للبيع',
    ],
  },
};

interface Props {
  lang: Lang;
}

export function ConsultationPage({ lang }: Props) {
  const t = tx[lang] ?? tx.de;
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';
  const rtl = isRTL(lang);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: lang === 'de'
        ? 'Guten Tag! Ich bin Ihr persönlicher KI-Berater bei Ovivo.\n\nErzählen Sie mir kurz von Ihrem Betrieb — was machen Sie, und was kostet Sie aktuell die meiste Zeit oder den meisten Umsatz?'
        : lang === 'ar'
        ? 'مرحباً! أنا مستشارك الشخصي الذكي في أوفيفو.\n\nأخبرني باختصار عن عملك — ماذا تفعل، وما الذي يأخذ منك أكثر وقت أو يكلفك أكثر إيراد؟'
        : "Hello! I'm your personal AI advisor at Ovivo.\n\nTell me briefly about your business — what do you do, and what's currently costing you the most time or revenue?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function getResponse(userMsg: string): string {
    const lower = userMsg.toLowerCase();
    if (lang === 'ar') {
      for (const item of aiResponsesAR) {
        if (item.triggers.some((trigger) => lower.includes(trigger))) {
          return item.response;
        }
      }
    } else {
      const responses = aiResponses[lang as keyof typeof aiResponses] ?? aiResponses.de;
      for (const item of responses) {
        if (item.triggers.some((trigger) => lower.includes(trigger))) {
          return item.response;
        }
      }
    }
    return defaultResponses[lang] ?? defaultResponses.de;
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const response = getResponse(userMsg);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message: `${message}${phone ? ` | Tel: ${phone}` : ''}`, source: 'consultation' }),
      });
    } catch {
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  const prompts = quickPrompts[lang] ?? quickPrompts.de;

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-blue-500/7 blur-[130px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {t.badge}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-5 leading-tight">
                {t.headline}{' '}
                <span className="text-gradient">{t.headlineGradient}</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400 leading-relaxed">
                {t.sub}
              </p>
            </motion.div>
          </RevealSection>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* AI Chat */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <GlassCard className="flex flex-col h-[580px] overflow-hidden p-0">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-500/20">
                    <Bot className="h-5 w-5 text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a0e1a]" />
                  </div>
                  <div className={rtl ? 'text-right' : ''}>
                    <p className="text-sm font-bold text-white">{t.chatTitle}</p>
                    <p className="text-xs text-gray-500">{t.chatSub}</p>
                  </div>
                  <div className={`${rtl ? 'mr-auto' : 'ml-auto'} flex items-center gap-1.5`}>
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-semibold">{t.online}</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${msg.role === 'user' ? (rtl ? 'flex-row' : 'flex-row-reverse') : ''}`}
                    >
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/10 border border-white/10'}`}>
                        {msg.role === 'assistant'
                          ? <Bot className="h-4 w-4 text-blue-400" />
                          : <User className="h-4 w-4 text-gray-400" />
                        }
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-blue-500 text-white'} ${rtl ? 'text-right' : ''}`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
                        <Bot className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-gray-400"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-5 py-2.5 border-t border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">{t.quickLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {prompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="text-xs text-gray-400 border border-white/10 rounded-full px-2.5 py-1 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-white/10">
                  <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.placeholder}
                      className="flex-1 bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                      dir={rtl ? 'rtl' : 'ltr'}
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="bg-blue-500 hover:bg-blue-400 text-white px-3 disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </GlassCard>
            </motion.div>

            {/* Form + Info */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <GlassCard className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-center py-10 ${rtl ? 'text-right' : ''}`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto mb-5"
                      >
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-3">{t.successTitle}</h3>
                      <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.successMsg}</p>
                      <Link href={`${prefix}/pricing`}>
                        <Button className="bg-blue-500 hover:bg-blue-400 text-white px-6">
                          {t.viewPricing}
                          <ArrowRight className={`h-4 w-4 ${rtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className={`flex items-start gap-3 mb-6 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
                          <Calendar className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight">{t.formTitle}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{t.formSub}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.nameLabel}</label>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={t.namePlaceholder}
                              className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                              dir={rtl ? 'rtl' : 'ltr'}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.phoneLabel}</label>
                            <Input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={t.phonePlaceholder}
                              className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.emailLabel} *</label>
                          <Input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.emailPlaceholder}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.companyLabel}</label>
                          <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder={t.companyPlaceholder}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                            dir={rtl ? 'rtl' : 'ltr'}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.messageLabel}</label>
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t.messagePlaceholder}
                            rows={3}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 resize-none"
                            dir={rtl ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white font-semibold py-5 text-base transition-all duration-300 hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] group"
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              {t.submitting}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {t.submitBtn}
                              <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                            </span>
                          )}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Button>
                      </form>

                      <div className={`mt-4 flex flex-wrap gap-3 ${rtl ? 'justify-end' : 'justify-center'}`}>
                        {t.trust.map((item) => (
                          <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>

              {/* Direct contact */}
              <div>
                <p className={`text-xs text-gray-600 uppercase tracking-widest mb-3 ${rtl ? 'text-right' : ''}`}>{t.contactDirect}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Phone, label: lang === 'de' ? 'Anrufen' : lang === 'ar' ? 'اتصل' : 'Call', href: 'tel:+4917656565322', color: 'text-emerald-400' },
                    { icon: MessageSquare, label: 'WhatsApp', href: 'https://wa.me/4917656565322', color: 'text-emerald-400' },
                    { icon: Mail, label: lang === 'de' ? 'E-Mail' : lang === 'ar' ? 'بريد' : 'Email', href: 'mailto:hello@ovivo.io', color: 'text-blue-400' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="glass rounded-xl p-3.5 flex flex-col items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
                      >
                        <Icon className={`h-5 w-5 ${item.color}`} />
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection>
            <p className={`text-xs font-semibold uppercase tracking-widest text-gray-600 mb-8 ${rtl ? 'text-right' : 'text-center'}`}>
              {t.statsTitle}
            </p>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <GlassCard className={`p-6 text-center hover:border-white/20 transition-all`}>
                    <p className="text-3xl font-extrabold text-gradient mb-1.5">{stat.value}</p>
                    <p className="text-xs text-gray-500 leading-snug">{stat.label}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </RevealSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <RevealSection>
            <GlassCard className="p-8 sm:p-10">
              <div className={`flex items-center gap-3 mb-7 ${rtl ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <Star className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{t.benefitsTitle}</h2>
              </div>
              <div className="space-y-4">
                {t.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`flex items-center gap-4 ${rtl ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                      {i + 1}
                    </div>
                    <p className={`text-gray-300 text-sm leading-relaxed ${rtl ? 'text-right' : ''}`}>{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  {lang === 'de' ? 'DSGVO-konform' : lang === 'ar' ? 'متوافق مع حماية البيانات' : 'GDPR compliant'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  {lang === 'de' ? 'Antwort in 24h' : lang === 'ar' ? 'رد خلال 24 ساعة' : 'Response in 24h'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  {lang === 'de' ? 'Live in 5–14 Tagen' : lang === 'ar' ? 'تشغيل خلال 5–14 يوماً' : 'Live in 5–14 days'}
                </div>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
