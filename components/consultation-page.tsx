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

const quickPrompts = {
  de: [
    'Was kostet eine Automation?',
    'Wie schnell ist die Einrichtung?',
    'Wie automatisiere ich Kundenanfragen?',
    'Was macht Ovivo anders?',
  ],
  en: [
    'What does automation cost?',
    'How fast is the setup?',
    'How do I automate inquiries?',
    'What makes Ovivo different?',
  ],
  ar: [
    'كم تكلفة الباقات؟',
    'كم وقت الإعداد؟',
    'كيف أؤتمت استفسارات العملاء؟',
    'وش يميزكم عن غيركم؟',
  ],
};

const tx = {
  de: {
    badge: 'Kostenlose Beratung',
    headline: 'Bereit, Ihren Betrieb auf',
    headlineGradient: 'Autopilot zu setzen?',
    sub: 'Sprechen Sie zuerst mit unserem KI-Assistenten — oder füllen Sie direkt das Formular aus. Unser Team meldet sich so bald wie möglich für ein kostenloses, unverbindliches Strategiegespräch.',
    chatTitle: 'OVIVO AI',
    chatSub: 'Ihr digitaler Automationsberater',
    online: 'KI-Demo',
    placeholder: 'Ihre Frage...',
    quickLabel: 'Häufige Fragen',
    formTitle: 'Jetzt Beratungstermin anfragen',
    formSub: 'Kostenlos · Unverbindlich · Rückmeldung so bald wie möglich',
    nameLabel: 'Ihr Name',
    emailLabel: 'E-Mail Adresse',
    phoneLabel: 'Telefon (optional)',
    companyLabel: 'Unternehmen & Branche',
    messageLabel: 'Was möchten Sie automatisieren?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'name@unternehmen.de',
    phonePlaceholder: '+49 176 ...',
    companyPlaceholder: 'Ihr Unternehmen / Ihre Branche',
    messagePlaceholder: 'Ich betreibe ein Restaurant mit 40 Tischen und möchte Reservierungen und WhatsApp automatisieren...',
    submitBtn: 'Beratungstermin anfragen',
    submitting: 'Wird gesendet...',
    successTitle: 'Anfrage erhalten!',
    successMsg: 'Perfekt! Wir melden uns so bald wie möglich per E-Mail oder Telefon — mit einem konkreten Plan für Ihren Betrieb.',
    viewPricing: 'Pakete & Preise ansehen',
    trust: ['Datenschutz im Fokus', 'Kostenlos & unverbindlich', 'Rückmeldung so bald wie möglich'],
    contactDirect: 'Oder direkt Kontakt aufnehmen',
    statsTitle: 'Was unsere Kunden erreichen',
    stats: [
      { value: 'KI', label: 'Intelligente Kundenkommunikation' },
      { value: 'KI', label: 'Weniger manuelle Arbeit' },
      { value: 'CRM', label: 'Systeme verbinden' },
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
    sub: 'Chat with our AI advisor first — or fill in the form directly. Our team will reach out as soon as possible for a free, no-obligation strategy call.',
    chatTitle: 'OVIVO AI',
    chatSub: 'Your automation guide',
    online: 'KI-Demo',
    placeholder: 'Your question...',
    quickLabel: 'Common questions',
    formTitle: 'Request a consultation',
    formSub: 'Free · No obligation · Reply as soon as possible',
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
    successMsg: "Perfect! We'll get back to you as soon as possible by email or phone — with a concrete plan for your business.",
    viewPricing: 'View packages & pricing',
    trust: ['Privacy focused', 'Free & no obligation', 'Reply as soon as possible'],
    contactDirect: 'Or contact us directly',
    statsTitle: 'What our clients achieve',
    stats: [
      { value: 'AI', label: 'Smart customer communication' },
      { value: 'KI', label: 'Less manual work' },
      { value: 'CRM', label: 'Connect existing tools' },
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
    sub: 'تحدّث مع مستشارنا الذكي — أو أرسل طلبك مباشرة. سيتواصل معك خبير من فريقنا بأقرب فرصة بخطة عملية واضحة لأعمالك.',
    chatTitle: 'OVIVO AI',
    chatSub: 'مساعدك للأتمتة الذكية',
    online: 'متاح الآن',
    placeholder: 'اكتب سؤالك هنا...',
    quickLabel: 'أسئلة شائعة',
    formTitle: 'احجز استشارتك المجانية',
    formSub: 'مجاني · بلا التزام · الرد بأقرب فرصة',
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
    successTitle: 'تم استلام طلبك!',
    successMsg: 'سيتواصل معك أحد خبرائنا بأقرب فرصة عبر البريد أو الهاتف — مع خطة أتمتة مخصصة لعملك.',
    viewPricing: 'استعرض الباقات والأسعار',
    trust: ['آمن وموثوق', 'مجاني وبلا التزام', 'الرد بأقرب فرصة'],
    contactDirect: 'أو تواصل معنا مباشرة',
    statsTitle: 'نتائج حقيقية يحققها عملاؤنا',
    stats: [
      { value: 'AI', label: 'تواصل ذكي مع العملاء' },
      { value: 'KI', label: 'انخفاض في العمل اليدوي' },
      { value: 'CRM', label: 'ربط أنظمة العملاء' },
      { value: '5–14', label: 'يوم فقط حتى الإطلاق' },
    ],
    benefitsTitle: 'ماذا ستحصل في استشارتك؟',
    benefits: [
      'تشخيص دقيق لعملك وتحديد نقاط الهدر الحالية',
      'خطة أتمتة مخصصة 100% لطبيعة نشاطك التجاري',
      'صورة واضحة للتكاليف والعائد المتوقع على الاستثمار',
      'توصية صريحة وموضوعية — بدون أي ضغط للبيع',
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
        ? 'أهلاً! أنا المستشار الذكي لأوفيفو.\n\nأنا هنا لأفهم وضع عملك وأرى معك إذا كانت الأتمتة تناسبك فعلاً — وكيف تحقق أكبر عائد بأقل جهد.\n\nخبرني: ما نوع عملك؟ وما أكثر شيء يأخذ منك وقتاً أو يسبب لك ضغطاً يومياً؟'
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [chatError, setChatError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Scroll only within the message pane; scrollIntoView also scrolls document ancestors.
  useEffect(() => {
    const pane = messagesContainerRef.current;
    if (!pane) return;
    pane.scrollTop = pane.scrollHeight;
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    const userMsg = text.trim().slice(0, 400);
    if (!userMsg || isTyping) return;
    setChatError('');
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    try {
      const response = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, lang }),
      });
      const json: unknown = await response.json();
      if (!response.ok || !json || typeof json !== 'object' || !('answer' in json) || typeof json.answer !== 'string') {
        throw new Error('AI unavailable');
      }
      const answer = (json as { answer: string }).answer;
      setMessages((prev) => [...prev, { role: 'assistant', content: answer.slice(0, 1500) }]);
    } catch {
      setChatError(lang === 'de' ? 'Der KI-Assistent ist derzeit nicht erreichbar. Bitte nutzen Sie das Formular.' :
        lang === 'ar' ? 'المساعد الذكي غير متاح حالياً. يمكنك إرسال طلبك عبر النموذج.' :
        'The AI assistant is temporarily unavailable. Please use the form.');
    } finally {
      setIsTyping(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !email.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), company: company.trim(), message: `${message.trim()}${phone.trim() ? ` | Tel: ${phone.trim()}` : ''}`, source: 'consultation' }),
      });
      if (!response.ok) throw new Error('Save failed');
      setSubmitted(true);
    } catch {
      setSubmitError(lang === 'de' ? 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.' :
        lang === 'ar' ? 'تعذّر إرسال طلبك. يرجى المحاولة مجدداً.' :
        'Your request could not be sent. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                {t.badge}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#0B1F4D] sm:text-5xl lg:text-6xl mb-5 leading-tight">
                {t.headline}{' '}
                <span className="text-gradient">{t.headlineGradient}</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
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
              <GlassCard className="ovivo-consultation-chat flex h-[min(650px,calc(100dvh-150px))] min-h-[490px] flex-col overflow-hidden rounded-[26px] border border-[#DCE5F7] bg-white p-0 shadow-[0_24px_70px_rgba(11,31,77,.08)]">
                <div className="flex shrink-0 items-center gap-3 border-b border-[#E0E7FF] bg-white px-5 py-4">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E0E7FF] bg-[#F4F7FB]">
                    <img src="/ovivo-favicon.svg" alt="" className="h-8 w-8 object-contain" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className={rtl ? 'text-right' : ''}>
                    <p className="text-sm font-bold text-[#0B1F4D]">{t.chatTitle}</p>
                    <p className="text-xs text-[#52647E]">{t.chatSub}</p>
                  </div>
                  <div className={`${rtl ? 'mr-auto' : 'ml-auto'} flex items-center gap-1.5`}>
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-700 font-semibold">{t.online}</span>
                  </div>
                </div>

                <div ref={messagesContainerRef} aria-live="polite" aria-relevant="additions text" className="ovivo-consultation-transcript min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#F6F9FF] p-4 scrollbar-thin sm:p-5">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${msg.role === 'user' ? (rtl ? 'flex-row' : 'flex-row-reverse') : ''}`}
                    >
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'border border-[#DCE5F7] bg-[#EAF2FF]' : 'border border-[#DCE5F7] bg-white'}`}>
                        {msg.role === 'assistant'
                          ? <Bot className="h-4 w-4 text-blue-400" />
                          : <User className="h-4 w-4 text-[#52647E]" />
                        }
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'border border-[#DCE5F7] bg-white text-[#233858] shadow-sm' : 'ovivo-consultation-user bg-[#2563EB] text-white'} ${rtl ? 'text-right' : ''}`}>
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
                      <div className="flex items-center gap-1.5 rounded-2xl border border-[#DCE5F7] bg-white px-4 py-3">
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
                  {chatError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{chatError}</p>}
                </div>

                <div className="shrink-0 border-t border-[#E0E7FF] bg-white px-4 py-3 sm:px-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#52647E]">{t.quickLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {prompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        disabled={isTyping} type="button" className="rounded-full border border-[#DCE5F7] bg-[#F8FAFF] px-3 py-1.5 text-xs font-semibold text-[#36547A] transition-colors hover:border-[#3B82F6] hover:bg-[#EEF5FF] disabled:opacity-50"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 border-t border-[#E0E7FF] bg-white px-4 pb-4 pt-3 sm:px-5">
                  <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                    className="flex items-center gap-2 rounded-2xl border border-[#DCE5F7] bg-white p-2 shadow-sm focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-blue-500/10"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.placeholder}
                      className="h-11 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm font-medium text-[#0B1F4D] placeholder:text-[#71829B] shadow-none focus-visible:ring-0"
                      dir={rtl ? 'rtl' : 'ltr'}
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      aria-label={lang === 'de' ? 'Nachricht senden' : lang === 'ar' ? 'إرسال الرسالة' : 'Send message'} className="ovivo-consultation-send h-11 w-11 shrink-0 rounded-xl bg-[#2563EB] p-0 text-white hover:bg-[#1D4ED8] disabled:opacity-40"
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
              <GlassCard className="rounded-[26px] border border-[#DCE5F7] bg-white p-6 shadow-[0_24px_70px_rgba(11,31,77,.08)] sm:p-8">
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
                      <h3 className="text-2xl font-bold text-[#0B1F4D] mb-3">{t.successTitle}</h3>
                      <p className="text-[#52647E] text-sm mb-8 leading-relaxed">{t.successMsg}</p>
                      <Link href={`${prefix}/pricing`}>
                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6">
                          {t.viewPricing}
                          <ArrowRight className={`h-4 w-4 ${rtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className={`flex items-start gap-3 mb-6 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
                          <Calendar className="h-5 w-5 text-[#2563EB]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#0B1F4D] leading-tight">{t.formTitle}</h3>
                          <p className="text-xs text-[#52647E] mt-0.5">{t.formSub}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className={`block text-xs font-semibold text-gray-300 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.nameLabel}</label>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={t.namePlaceholder}
                              className="h-12 rounded-xl border-[#DCE5F7] bg-white px-4 text-[#0B1F4D] placeholder:text-[#71829B] focus-visible:border-[#3B82F6] focus-visible:ring-blue-500/20"
                              dir={rtl ? 'rtl' : 'ltr'}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold text-gray-300 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.phoneLabel}</label>
                            <Input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={t.phonePlaceholder}
                              className="h-12 rounded-xl border-[#DCE5F7] bg-white px-4 text-[#0B1F4D] placeholder:text-[#71829B] focus-visible:border-[#3B82F6] focus-visible:ring-blue-500/20"
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
                            className="h-12 rounded-xl border-[#DCE5F7] bg-white px-4 text-[#0B1F4D] placeholder:text-[#71829B] focus-visible:border-[#3B82F6] focus-visible:ring-blue-500/20"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold text-gray-400 mb-1.5 ${rtl ? 'text-right' : ''}`}>{t.companyLabel}</label>
                          <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder={t.companyPlaceholder}
                            className="h-12 rounded-xl border-[#DCE5F7] bg-white px-4 text-[#0B1F4D] placeholder:text-[#71829B] focus-visible:border-[#3B82F6] focus-visible:ring-blue-500/20"
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
                            className="min-h-[105px] resize-none rounded-xl border-[#DCE5F7] bg-white px-4 py-3 text-[#0B1F4D] placeholder:text-[#71829B] focus-visible:border-[#3B82F6] focus-visible:ring-blue-500/20"
                            dir={rtl ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="group ovivo-consultation-send relative w-full overflow-hidden rounded-xl bg-[#2563EB] py-6 text-base font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,.18)] transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
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
                        {submitError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{submitError}</p>}
                      </form>

                      <div className={`mt-4 flex flex-wrap gap-3 ${rtl ? 'justify-end' : 'justify-center'}`}>
                        {t.trust.map((item) => (
                          <div key={item} className="flex items-center gap-1.5 text-xs text-gray-400">
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
                <p className={`text-xs text-gray-400 uppercase tracking-widest mb-3 ${rtl ? 'text-right' : ''}`}>{t.contactDirect}</p>
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
                        <span className="text-xs font-medium text-[#52647E] group-hover:text-[#2563EB] transition-colors">{item.label}</span>
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
            <p className={`text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8 ${rtl ? 'text-right' : 'text-center'}`}>
              {t.statsTitle}
            </p>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <GlassCard className={`p-6 text-center hover:border-white/20 transition-all`}>
                    <p className="text-3xl font-extrabold text-gradient mb-1.5">{stat.value}</p>
                    <p className="text-xs text-[#52647E] leading-snug">{stat.label}</p>
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
                <h2 className="text-xl font-bold text-[#0B1F4D]">{t.benefitsTitle}</h2>
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
                    <p className={`text-[#36547A] text-sm leading-relaxed ${rtl ? 'text-right' : ''}`}>{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  {lang === 'de' ? 'Datenschutz im Fokus' : lang === 'ar' ? 'متوافق مع حماية البيانات' : 'Privacy focused'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  {lang === 'de' ? 'Rückmeldung so bald wie möglich' : lang === 'ar' ? 'الرد بأقرب فرصة' : 'Reply as soon as possible'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  {lang === 'de' ? 'Live in Individuelle Planungn' : lang === 'ar' ? 'تشغيل خلال حسب المشروع' : 'Live in Project planning'}
                </div>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
