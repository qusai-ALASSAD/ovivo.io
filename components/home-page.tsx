'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, Zap, ArrowRight, CircleCheck as CheckCircle, Star, ChevronLeft, ChevronRight, Bot, Target, ChartBar as BarChart3, Users, Clock, TrendingUp, MessageSquare, Mail, Calendar, Phone, Settings, CircleAlert as AlertCircle, Circle as XCircle, ShieldCheck, Repeat, Database, Award } from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import { AutomationFlowSection } from '@/components/automation-flow-section';
import type { Lang } from '@/lib/i18n';
import { content, isRTL } from '@/lib/i18n';

const solutionIcons = [Bot, Phone, Target, Calendar, Mail, Database];
const solutionColors = [
  { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', result: 'text-blue-400' },
  { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', result: 'text-emerald-400' },
  { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', result: 'text-orange-400' },
  { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', result: 'text-rose-400' },
  { color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', result: 'text-cyan-400' },
  { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', result: 'text-amber-400' },
];

const problemIcons = [MessageSquare, XCircle, Settings, Clock];
const problemColors = [
  { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
];

const offerStatColors = ['text-emerald-400', 'text-blue-400', 'text-orange-400', 'text-cyan-400'];

const industries = {
  de: [
    { icon: '🍽️', label: 'Restaurants & Gastronomie' },
    { icon: '☕', label: 'Cafés & Bäckereien' },
    { icon: '💇', label: 'Friseure & Beauty' },
    { icon: '🏋️', label: 'Fitnessstudios' },
    { icon: '🏥', label: 'Arzt & Praxen' },
    { icon: '🏠', label: 'Handwerk & Service' },
    { icon: '🛒', label: 'Einzelhandel' },
    { icon: '🏨', label: 'Hotels & Unterkünfte' },
  ],
  en: [
    { icon: '🍽️', label: 'Restaurants & Hospitality' },
    { icon: '☕', label: 'Cafés & Bakeries' },
    { icon: '💇', label: 'Hair & Beauty' },
    { icon: '🏋️', label: 'Fitness Studios' },
    { icon: '🏥', label: 'Medical Practices' },
    { icon: '🏠', label: 'Trades & Services' },
    { icon: '🛒', label: 'Retail' },
    { icon: '🏨', label: 'Hotels & Accommodation' },
  ],
  ar: [
    { icon: '🍽️', label: 'المطاعم والضيافة' },
    { icon: '☕', label: 'المقاهي والمخابز' },
    { icon: '💇', label: 'الصالونات والتجميل' },
    { icon: '🏋️', label: 'صالات اللياقة' },
    { icon: '🏥', label: 'العيادات الطبية' },
    { icon: '🏠', label: 'الخدمات والحرف' },
    { icon: '🛒', label: 'تجارة التجزئة' },
    { icon: '🏨', label: 'الفنادق والإقامة' },
  ],
};

const testimonials = {
  de: [
    {
      quote: 'Seit wir den KI-Chatbot haben, werden 90% der Tischreservierungen automatisch bestätigt. Wir sparen täglich 2 Stunden — und die Gäste sind begeistert.',
      name: 'Thomas K.',
      role: 'Restaurant-Inhaber, München',
      result: '+2h täglich gespart',
    },
    {
      quote: 'WhatsApp läuft jetzt vollautomatisch. Bestellungen, Rückfragen, Erinnerungen — alles ohne Mitarbeiter. Unser Umsatz ist in 3 Monaten um 35% gestiegen.',
      name: 'Sabrina M.',
      role: 'Café-Betreiberin, Hamburg',
      result: '+35% Umsatz in 3 Monaten',
    },
    {
      quote: 'Das CRM-System hat unsere Kundenpflege komplett verändert. Stammkunden werden automatisch angeschrieben, Bewertungen kommen von selbst. Ich musste nichts lernen.',
      name: 'Michael R.',
      role: 'Inhaber Friseursalon, Berlin',
      result: '+40% mehr Stammkunden',
    },
  ],
  en: [
    {
      quote: 'Since we got the AI chatbot, 90% of table reservations are confirmed automatically. We save 2 hours every day — and guests love it.',
      name: 'Thomas K.',
      role: 'Restaurant Owner, Munich',
      result: '2h saved every day',
    },
    {
      quote: 'WhatsApp now runs fully automatically. Orders, questions, reminders — all without staff. Our revenue grew by 35% in 3 months.',
      name: 'Sabrina M.',
      role: 'Café Owner, Hamburg',
      result: '+35% revenue in 3 months',
    },
    {
      quote: "The CRM system completely changed how we handle customer relationships. Regular customers are contacted automatically, reviews come in by themselves. I didn't have to learn anything.",
      name: 'Michael R.',
      role: 'Hair Salon Owner, Berlin',
      result: '+40% more returning customers',
    },
  ],
  ar: [
    {
      quote: 'منذ تركيب روبوت الذكاء الاصطناعي، تأكد 90% من حجوزات الطاولات تلقائياً. نوفر ساعتين يومياً — والضيوف سعداء جداً.',
      name: 'توماس ك.',
      role: 'صاحب مطعم، ميونخ',
      result: 'توفير ساعتين يومياً',
    },
    {
      quote: 'واتساب يعمل الآن بشكل تلقائي كامل. الطلبات، الاستفسارات، التذكيرات — كلها دون موظفين. إيراداتنا ارتفعت 35% في 3 أشهر.',
      name: 'سابرينا م.',
      role: 'صاحبة مقهى، هامبورغ',
      result: '+35% إيرادات في 3 أشهر',
    },
    {
      quote: 'نظام CRM غيّر طريقة تعاملنا مع العملاء كلياً. العملاء الدائمون يُتابَعون تلقائياً والتقييمات تأتي من تلقاء نفسها. لم أحتج أن أتعلم شيئاً.',
      name: 'مايكل ر.',
      role: 'صاحب صالون تجميل، برلين',
      result: '+40% عملاء متكررون',
    },
  ],
};

const faqs = {
  de: [
    { q: 'Für welche Branchen ist Ovivo geeignet?', a: 'Ovivo ist speziell für Gastronomie (Restaurants, Cafés, Bars), Service-Unternehmen (Friseure, Beauty, Fitness) und lokale Dienstleister konzipiert — überall dort, wo Kundenanfragen und Buchungen täglich anfallen.' },
    { q: 'Wie lange dauert die Einrichtung?', a: 'Je nach Paket dauert die vollständige Implementierung 5–14 Werktage. Wir übernehmen alles — von der technischen Einrichtung bis zur Schulung Ihres Teams.' },
    { q: 'Brauche ich technische Kenntnisse?', a: 'Nein. Wir kümmern uns um die gesamte technische Einrichtung. Sie erhalten ein fertiges System, das Sie ohne IT-Kenntnisse bedienen können.' },
    { q: 'Was ist im monatlichen Support enthalten?', a: 'Der monatliche Support umfasst Wartung, Updates, technischen Support und monatliche Optimierungen Ihres Systems.' },
    { q: 'Kann ich monatlich kündigen?', a: 'Ja, der monatliche Support ist monatlich kündbar. Die einmalige Setup-Gebühr ist nicht rückerstattbar.' },
    { q: 'Was passiert nach der Beratung?', a: 'Nach der kostenlosen Beratung erhalten Sie ein konkretes Angebot. Wenn Sie zustimmen, beginnen wir innerhalb von 48 Stunden mit der Umsetzung.' },
  ],
  en: [
    { q: 'Which industries is Ovivo suitable for?', a: 'Ovivo is designed specifically for hospitality (restaurants, cafés, bars), service businesses (hair, beauty, fitness), and local service providers — anywhere customer inquiries and bookings happen daily.' },
    { q: 'How long does setup take?', a: 'Depending on the package, full implementation takes 5–14 business days. We handle everything — from technical setup to team training.' },
    { q: 'Do I need technical knowledge?', a: 'No. We handle all the technical setup. You receive a ready-to-use system that you can operate without any IT knowledge.' },
    { q: "What's included in monthly support?", a: 'Monthly support includes maintenance, updates, technical support, and monthly optimizations of your system.' },
    { q: 'Can I cancel monthly?', a: 'Yes, monthly support is cancelable on a monthly basis. The one-time setup fee is non-refundable.' },
    { q: 'What happens after the consultation?', a: "After the free consultation, you'll receive a concrete proposal. If you agree, we start implementation within 48 hours." },
  ],
  ar: [
    { q: 'ما القطاعات التي يخدمها أوفيفو؟', a: 'أوفيفو مصمم خصيصاً للمطاعم والمقاهي والبارات، وشركات الخدمات (صالونات التجميل، اللياقة البدنية)، ومقدمي الخدمات المحليين — في أي مكان تحدث فيه استفسارات وحجوزات يومية.' },
    { q: 'كم من الوقت يستغرق الإعداد؟', a: 'حسب الباقة، يستغرق التنفيذ الكامل 5–14 يوم عمل. نتولى كل شيء — من الإعداد التقني إلى تدريب فريقك.' },
    { q: 'هل أحتاج إلى معرفة تقنية؟', a: 'لا. نحن نتولى جميع الجوانب التقنية. ستحصل على نظام جاهز للاستخدام يمكنك تشغيله دون أي معرفة تقنية.' },
    { q: 'ما المقصود بالدعم الشهري؟', a: 'يشمل الدعم الشهري الصيانة والتحديثات والدعم التقني والتحسينات الشهرية لنظامك.' },
    { q: 'هل يمكنني الإلغاء شهرياً؟', a: 'نعم، يمكن إلغاء الاشتراك الشهري في أي وقت. رسوم الإعداد لمرة واحدة غير قابلة للاسترداد.' },
    { q: 'ماذا يحدث بعد الاستشارة؟', a: 'بعد الاستشارة المجانية، ستحصل على عرض محدد. إذا وافقت، نبدأ التنفيذ خلال 48 ساعة.' },
  ],
};

const stats = {
  de: [
    { icon: Users, value: '200+', label: 'Betriebe vertrauen Ovivo' },
    { icon: Clock, value: '24/7', label: 'Immer erreichbar' },
    { icon: TrendingUp, value: '+35%', label: 'Mehr Umsatz im Schnitt' },
    { icon: ShieldCheck, value: '98%', label: 'Kundenzufriedenheit' },
  ],
  en: [
    { icon: Users, value: '200+', label: 'Businesses trust Ovivo' },
    { icon: Clock, value: '24/7', label: 'Always available' },
    { icon: TrendingUp, value: '+35%', label: 'Average revenue increase' },
    { icon: ShieldCheck, value: '98%', label: 'Customer satisfaction' },
  ],
  ar: [
    { icon: Users, value: '+200', label: 'شركة تثق بأوفيفو' },
    { icon: Clock, value: '24/7', label: 'متاح دائماً' },
    { icon: TrendingUp, value: '+35%', label: 'متوسط زيادة الإيرادات' },
    { icon: ShieldCheck, value: '98%', label: 'رضا العملاء' },
  ],
};

const stepIcons = [Phone, Bot, Database, Zap];

const pricingData = {
  de: {
    badge: 'Pakete & Preise',
    title: 'Transparent.',
    titleGradient: 'Leistungsstark.',
    sub: 'Drei Pakete für jeden Bedarf. Einmaliger Setup + monatliche Betreuung.',
    monthly: 'Monatlich',
    cta: 'Paket anfragen',
    note: 'Endpreis abhängig von Betriebsgröße und Automatisierungsumfang.',
    plans: [
      {
        name: 'Starter',
        setup: 'ab €1.200',
        monthly: 'ab €120 / Monat',
        badge: null,
        highlighted: false,
        ideal: 'Für Einzelbetriebe & Einsteiger',
        outcome: 'Kundenkommunikation läuft automatisch',
        features: ['KI-Chatbot 24/7', 'Lead-Erfassung', 'WhatsApp Integration', 'Basis-Support'],
      },
      {
        name: 'Business',
        setup: 'ab €2.200',
        monthly: 'ab €220 / Monat',
        badge: 'Beliebtestes Paket',
        highlighted: true,
        ideal: 'Für Restaurants, Cafés & Dienstleister',
        outcome: '+35% mehr Buchungen in 60 Tagen',
        features: ['Erweiterter KI-Chatbot', 'WhatsApp Automation', 'Buchungssystem', 'CRM Integration', 'Priority Support'],
      },
      {
        name: 'Full',
        setup: 'ab €3.200',
        monthly: 'ab €450 / Monat',
        badge: 'Maximale Leistung',
        highlighted: false,
        ideal: 'Für wachsende Betriebe & Ketten',
        outcome: 'Vollständiger Wachstumsmotor auf Autopilot',
        features: ['Komplettes KI-System', 'Marketing Automation', 'CRM-System', 'Monatliche Optimierung', 'Technischer Support'],
      },
    ],
  },
  en: {
    badge: 'Packages & Pricing',
    title: 'Transparent.',
    titleGradient: 'Powerful.',
    sub: 'Three packages for every stage. One-time setup + monthly support.',
    monthly: 'Monthly',
    cta: 'Request this plan',
    note: 'Final price depends on business size and automation requirements.',
    plans: [
      {
        name: 'Starter',
        setup: 'from €1,200',
        monthly: 'from €120 / mo',
        badge: null,
        highlighted: false,
        ideal: 'For sole traders & beginners',
        outcome: 'Customer comms run automatically',
        features: ['AI Chatbot 24/7', 'Lead Capture', 'WhatsApp Integration', 'Basic Support'],
      },
      {
        name: 'Business',
        setup: 'from €2,200',
        monthly: 'from €220 / mo',
        badge: 'Most Popular',
        highlighted: true,
        ideal: 'For restaurants, cafés & services',
        outcome: '+35% more bookings within 60 days',
        features: ['Advanced AI Chatbot', 'WhatsApp Automation', 'Booking System', 'CRM Integration', 'Priority Support'],
      },
      {
        name: 'Full',
        setup: 'from €3,200',
        monthly: 'from €450 / mo',
        badge: 'Maximum Power',
        highlighted: false,
        ideal: 'For growing businesses & chains',
        outcome: 'Full growth engine on autopilot',
        features: ['Complete AI System', 'Marketing Automation', 'CRM System', 'Monthly Optimization', 'Technical Support'],
      },
    ],
  },
  ar: {
    badge: 'الباقات والأسعار',
    title: 'شفاف.',
    titleGradient: 'قوي.',
    sub: '3 باقات تناسب كل مرحلة. إعداد لمرة واحدة + رعاية شهرية.',
    monthly: 'شهرياً',
    cta: 'اطلب هذه الباقة',
    note: 'السعر النهائي يعتمد على حجم الشركة ومتطلبات الأتمتة.',
    plans: [
      {
        name: 'الأساسية',
        setup: 'من €1,200',
        monthly: 'من €120 / شهر',
        badge: null,
        highlighted: false,
        ideal: 'لأصحاب الأعمال الفردية والبدايات',
        outcome: 'التواصل مع العملاء يعمل تلقائياً',
        features: ['روبوت دردشة ذكي 24/7', 'التقاط العملاء', 'تكامل واتساب', 'دعم أساسي'],
      },
      {
        name: 'الأعمال',
        setup: 'من €2,200',
        monthly: 'من €220 / شهر',
        badge: 'الأكثر طلباً',
        highlighted: true,
        ideal: 'للمطاعم والمقاهي والشركات النامية',
        outcome: '+35% حجوزات خلال 60 يوماً',
        features: ['روبوت دردشة متطور', 'أتمتة واتساب كاملة', 'نظام حجز تلقائي', 'تكامل CRM', 'دعم مميز'],
      },
      {
        name: 'المتقدمة',
        setup: 'من €3,500',
        monthly: 'من €350 / شهر',
        badge: 'أقصى أداء',
        highlighted: false,
        ideal: 'للشركات التي تريد التوسع بسرعة',
        outcome: 'ماكينة نمو متكاملة تعمل وحدها',
        features: ['نظام ذكاء اصطناعي متكامل', 'أتمتة كاملة للتسويق', 'CRM متقدم', 'تحسين شهري', 'دعم VIP'],
      },
    ],
  },
};

interface Props {
  lang: Lang;
}

export function HomePage({ lang }: Props) {
  const t = content[lang];
  const rtl = isRTL(lang);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';
  const pd = pricingData[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials[lang].length);
    }, 6000);
    return () => clearInterval(timer);
  }, [lang]);

  const liveLabel = lang === 'de' ? 'Automation live — Restaurant Bella Vista' : lang === 'ar' ? 'أتمتة مباشرة — مطعم بيلا فيستا' : 'Live automation — Restaurant Bella Vista';
  const activeLabel = lang === 'de' ? 'Aktiv' : lang === 'ar' ? 'نشط' : 'Active';
  const automatedLabel = lang === 'de' ? 'Heute: 47 Aktionen automatisiert' : lang === 'ar' ? 'اليوم: 47 إجراء آلي' : 'Today: 47 actions automated';
  const noManualLabel = lang === 'de' ? '0 manuelle Eingriffe' : lang === 'ar' ? '0 تدخل يدوي' : '0 manual interventions';
  const businessesLabel = lang === 'de' ? '200+ Betriebe aktiv' : lang === 'ar' ? '+200 شركة نشطة' : '200+ businesses active';
  const setupLabel = lang === 'de' ? 'Setup in 5–14 Tagen' : lang === 'ar' ? 'تشغيل في 5–14 يوماً' : 'Setup in 5–14 days';

  const testimonialsLabel = lang === 'de' ? 'Kundenstimmen' : lang === 'ar' ? 'آراء العملاء' : 'Testimonials';
  const whatBusinessesSay = lang === 'de' ? 'Was echte Betriebe' : lang === 'ar' ? 'ما يقوله عملاؤنا' : 'What real businesses';
  const aboutOvivo = lang === 'de' ? 'über Ovivo sagen' : lang === 'ar' ? 'عن أوفيفو' : 'say about Ovivo';
  const faqBadge = lang === 'de' ? 'Häufige Fragen' : lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ';
  const industriesLabel = lang === 'de' ? 'Wir bauen KI-Automation für diese Branchen' : lang === 'ar' ? 'القطاعات التي نبني لها الأتمتة الذكية' : 'We build AI automation for these industries';

  const chatItems = lang === 'ar'
    ? [
        { icon: MessageSquare, label: 'واتساب', msg: 'طاولة لـ 4 أشخاص الجمعة الساعة 7 مساءً؟', reply: 'تم التأكيد تلقائياً ✓', time: '09:12', color: 'text-emerald-400', dot: 'bg-emerald-400' },
        { icon: Calendar, label: 'حجز', msg: 'تم استلام حجز إلكتروني', reply: 'أضيف للتقويم + أُرسل التأكيد', time: '09:14', color: 'text-blue-400', dot: 'bg-blue-400' },
        { icon: Bot, label: 'روبوت', msg: 'هل لديكم خيارات نباتية؟', reply: 'ردّ الذكاء الاصطناعي + أُرسل رابط القائمة', time: '09:18', color: 'text-orange-400', dot: 'bg-orange-400' },
        { icon: Mail, label: 'متابعة', msg: 'طلب تقييم (بعد يومين من الزيارة)', reply: 'أُرسل تلقائياً لـ 12 ضيف', time: '09:30', color: 'text-rose-400', dot: 'bg-rose-400' },
      ]
    : lang === 'en'
    ? [
        { icon: MessageSquare, label: 'WhatsApp', msg: 'Table for 4 on Friday at 7pm?', reply: 'Auto confirmed ✓', time: '09:12', color: 'text-emerald-400', dot: 'bg-emerald-400' },
        { icon: Calendar, label: 'Booking', msg: 'Online reservation received', reply: 'Added to calendar + confirmation sent', time: '09:14', color: 'text-blue-400', dot: 'bg-blue-400' },
        { icon: Bot, label: 'Chatbot', msg: 'Do you have vegan options?', reply: 'AI replied + menu link sent', time: '09:18', color: 'text-orange-400', dot: 'bg-orange-400' },
        { icon: Mail, label: 'Follow-up', msg: 'Review request (2 days after visit)', reply: 'Automatically sent to 12 guests', time: '09:30', color: 'text-rose-400', dot: 'bg-rose-400' },
      ]
    : [
        { icon: MessageSquare, label: 'WhatsApp', msg: 'Tisch für 4 Personen am Freitag 19 Uhr?', reply: 'Automatisch bestätigt ✓', time: '09:12', color: 'text-emerald-400', dot: 'bg-emerald-400' },
        { icon: Calendar, label: 'Buchung', msg: 'Online-Reservierung eingegangen', reply: 'In Kalender eingetragen + Bestätigung gesendet', time: '09:14', color: 'text-blue-400', dot: 'bg-blue-400' },
        { icon: Bot, label: 'Chatbot', msg: 'Haben Sie vegane Optionen?', reply: 'KI hat geantwortet + Menülink gesendet', time: '09:18', color: 'text-orange-400', dot: 'bg-orange-400' },
        { icon: Mail, label: 'Follow-up', msg: 'Bewertungsanfrage (2 Tage nach Besuch)', reply: 'Automatisch an 12 Gäste gesendet', time: '09:30', color: 'text-rose-400', dot: 'bg-rose-400' },
      ];

  return (
    <div className="flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[1100px] rounded-full bg-blue-500/12 blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 h-[500px] w-[700px] rounded-full bg-cyan-500/6 blur-[110px]" />
          <div className="absolute top-1/3 left-0 h-[300px] w-[400px] rounded-full bg-blue-600/5 blur-[90px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: rtl ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
            >
              <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
                <Sparkles className="mr-2 h-3 w-3 rtl:ml-2 rtl:mr-0" />
                {t.hero.badge}
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                {t.hero.headline1}<br />
                <span className="text-gradient">{t.hero.headline2}</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-lg">
                {t.hero.sub}
              </p>
              <div className="mt-10">
                <Link href={`${prefix}/consultation`}>
                  <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-10 py-7 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] rounded-xl">
                    <span className="relative z-10 flex items-center gap-2">
                      {t.hero.cta}
                      <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">
                {t.hero.trust.map((text) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="relative"
            >
              <div className="glass rounded-2xl overflow-hidden border-white/10 shadow-2xl">
                <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {liveLabel}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 rounded-full px-2 py-0.5">
                    {activeLabel}
                  </span>
                </div>
                <div className="p-5 space-y-3" dir={rtl ? 'rtl' : 'ltr'}>
                  {chatItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="glass rounded-xl p-3.5 border-white/10">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                            <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                            <span className={`text-xs font-bold ${item.color}`}>{item.label}</span>
                          </div>
                          <span className="text-[10px] text-gray-600">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 ms-5 mb-0.5">{item.msg}</p>
                        <p className="text-xs text-gray-600 ms-5">{item.reply}</p>
                      </div>
                    );
                  })}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-gray-600 px-1">
                    <span>{automatedLabel}</span>
                    <span className="text-emerald-500 font-semibold">{noManualLabel}</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-emerald-400 border-emerald-500/30 shadow-lg hidden sm:flex items-center gap-1.5"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {businessesLabel}
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-blue-400 border-blue-500/30 shadow-lg hidden sm:flex items-center gap-1.5"
              >
                <Zap className="h-3 w-3" />
                {setupLabel}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-600 mb-7">
            {industriesLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {industries[lang].map((ind) => (
              <div key={ind.label} className="flex items-center gap-2 glass rounded-full px-4 py-2 border-white/10">
                <span className="text-base">{ind.icon}</span>
                <span className="text-sm text-gray-400 font-medium">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER / VALUE PROP ───────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-6">
            <SectionHeader
              badge={t.offer.badge}
              title={t.offer.title}
              titleGradient={t.offer.titleGradient}
              subtitle={t.offer.sub}
            />
          </RevealSection>
          <RevealSection className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 px-6 py-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold text-emerald-300">
                {lang === 'de' ? '30-Tage-Garantie — messbare Ergebnisse oder kostenlose Nacharbeit' : lang === 'ar' ? 'ضمان 30 يوماً — نتائج قابلة للقياس أو نستمر مجاناً' : '30-Day Guarantee — measurable results or we keep optimizing for free'}
              </p>
            </div>
          </RevealSection>
          <StaggerContainer className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {t.offer.items.map((item, i) => (
              <StaggerItem key={item.label}>
                <GlassCard className="p-7 text-center border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`text-4xl font-bold mb-3 ${offerStatColors[i]} group-hover:scale-105 transition-transform duration-300`}>{item.stat}</div>
                  <div className="text-sm text-gray-400 leading-snug">{item.label}</div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <RevealSection className="mt-10 text-center">
            <Link href={`${prefix}/consultation`}>
              <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-10 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] rounded-xl">
                <span className="relative z-10 flex items-center gap-2">
                  {lang === 'de' ? 'Kostenlose Wachstumsanalyse anfragen' : lang === 'ar' ? 'احصل على تحليل نمو مجاني' : 'Get Your Free Growth Analysis'}
                  <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
            <p className="mt-3 text-xs text-gray-600">
              {lang === 'de' ? 'Kostenlos. Kein Pitch. Konkretes Ergebnis in 30 Minuten.' : lang === 'ar' ? 'مجاناً. لا ضغط. نتيجة ملموسة في 30 دقيقة.' : 'Free. No pitch. Concrete insights in 30 minutes.'}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── PROBLEMS ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-white/[0.015] border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={t.problems.badge}
              title={t.problems.title}
              titleGradient={t.problems.titleGradient}
              subtitle={t.problems.subtitle}
            />
          </RevealSection>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.problems.items.map((p, i) => {
              const Icon = problemIcons[i];
              const c = problemColors[i];
              return (
                <StaggerItem key={p.title}>
                  <GlassCard className="p-7 h-full">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${c.bg} mb-5`}>
                      <Icon className={`h-6 w-6 ${c.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SOLUTIONS ────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={t.solutions.badge}
              title={t.solutions.title}
              titleGradient={t.solutions.titleGradient}
              subtitle={t.solutions.subtitle}
            />
          </RevealSection>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.solutions.items.map((f, i) => {
              const Icon = solutionIcons[i];
              const c = solutionColors[i];
              const item = f as { label: string; desc: string; result: string };
              return (
                <StaggerItem key={item.label}>
                  <GlassCard className="p-7 h-full flex flex-col">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${c.bg} mb-5`}>
                      <Icon className={`h-6 w-6 ${c.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.desc}</p>
                    {item.result && (
                      <div className={`mt-4 pt-4 border-t border-white/5 text-xs font-semibold ${c.result}`}>
                        {item.result}
                      </div>
                    )}
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── AUTOMATION FLOW ──────────────────────────────────────────────── */}
      <AutomationFlowSection lang={lang} />

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8 border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats[lang].map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <GlassCard className="p-6 text-center">
                    <Icon className="h-5 w-5 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" id="how-it-works">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={t.howItWorks.badge}
              title={t.howItWorks.title}
              titleGradient={t.howItWorks.titleGradient}
              subtitle={t.howItWorks.subtitle}
            />
          </RevealSection>
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            {t.howItWorks.steps.map((item, i) => {
              const Icon = stepIcons[i];
              return (
                <StaggerItem key={item.title}>
                  <div className="text-center relative">
                    {i < 3 && (
                      <div className={`hidden lg:block absolute top-8 ${rtl ? 'right-[60%]' : 'left-[60%]'} w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent`} />
                    )}
                    <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl glass border-blue-500/20 mb-6">
                      <Icon className="h-7 w-7 text-blue-400" />
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.015] border-y border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={testimonialsLabel}
              title={whatBusinessesSay}
              titleGradient={aboutOvivo}
            />
          </RevealSection>
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: rtl ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: rtl ? 30 : -30 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <GlassCard className="p-10 text-center">
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed italic mb-6">
                    &ldquo;{testimonials[lang][testimonialIndex].quote}&rdquo;
                  </p>
                  <div className="mb-4">
                    <p className="font-semibold text-white">{testimonials[lang][testimonialIndex].name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{testimonials[lang][testimonialIndex].role}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">{testimonials[lang][testimonialIndex].result}</span>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials[lang].length) % testimonials[lang].length)}
                className="h-9 w-9 rounded-full glass border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials[lang].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-blue-500 w-6' : 'bg-white/20 w-2'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials[lang].length)}
                className="h-9 w-9 rounded-full glass border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" id="pakete">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={pd.badge}
              title={pd.title}
              titleGradient={pd.titleGradient}
              subtitle={pd.sub}
            />
          </RevealSection>

          <StaggerContainer className="grid gap-6 sm:grid-cols-3">
            {pd.plans.map((plan) => (
              <StaggerItem key={plan.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl flex flex-col glass h-full p-8 ${plan.highlighted ? 'border border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.2)]' : 'border border-white/10'}`}
                >
                  {plan.highlighted && (
                    <>
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-2xl"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 65%)' }}
                      />
                    </>
                  )}
                  {plan.badge && (
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold w-fit mb-4 ${plan.highlighted ? 'bg-blue-500 text-white border-transparent' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`}>
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 italic">{plan.ideal}</p>

                  <div className="space-y-2 mb-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Setup</span>
                      <span className="text-xl font-bold text-white">{plan.setup}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{pd.monthly}</span>
                      <span className={`text-base font-bold ${plan.highlighted ? 'text-blue-400' : 'text-gray-300'}`}>{plan.monthly}</span>
                    </div>
                  </div>

                  <div className={`mb-4 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${plan.highlighted ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    <Award className="h-3.5 w-3.5 flex-shrink-0" />
                    {plan.outcome}
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`${prefix}/consultation`}>
                    <Button className={`w-full font-semibold transition-all duration-300 py-5 ${plan.highlighted ? 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'}`}>
                      {pd.cta}
                      <ArrowRight className={`ml-2 h-4 w-4 ${rtl ? 'rotate-180 mr-2 ml-0' : ''}`} />
                    </Button>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <RevealSection className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">{pd.note}</p>
            <div className="mt-4">
              <Link href={`${prefix}/pricing`} className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4">
                {lang === 'de' ? 'Alle Pakete & Details ansehen' : lang === 'ar' ? 'عرض جميع الباقات والتفاصيل' : 'View all packages & details'}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-3xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={faqBadge} title={lang === 'de' ? 'Häufige Fragen' : lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'} titleGradient="" />
          </RevealSection>
          <RevealSection>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
              <Accordion type="single" collapsible>
                {faqs[lang].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-none px-6">
                    <AccordionTrigger className="text-white hover:text-blue-400 text-left py-5 hover:no-underline transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <Zap className="mx-auto h-12 w-12 text-blue-400 mb-6" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{t.cta.title}</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{t.cta.sub}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`${prefix}/consultation`}>
                  <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <span className="relative z-10 flex items-center gap-2">
                      {t.cta.btn}
                      <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
                <Link href="#pakete">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 px-8 py-6 text-base">
                    {t.cta.btnSecondary}
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-gray-600 mt-5">{t.cta.note}</p>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
