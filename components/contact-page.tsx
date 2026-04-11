'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CircleCheck as CheckCircle, Mail, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const t = {
  de: {
    badge: 'Kontakt',
    title: 'Sprechen wir',
    titleGradient: 'über Ihr Projekt',
    sub: 'Füllen Sie das Formular aus oder kontaktieren Sie uns direkt — wir melden uns innerhalb von 24 Stunden.',
    formTitle: 'Kostenlose Beratung anfragen',
    formSub: 'Unverbindlich. Kostenlos. Innerhalb von 24h Antwort.',
    nameLabel: 'Ihr Name',
    emailLabel: 'E-Mail Adresse',
    phoneLabel: 'Telefon (optional)',
    companyLabel: 'Unternehmen & Branche',
    messageLabel: 'Was möchten Sie automatisieren?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max@restaurant.de',
    phonePlaceholder: '+49 176 56565322',
    companyPlaceholder: 'Restaurant Bella Vista — Gastronomie',
    messagePlaceholder: 'Wir betreiben ein Restaurant mit 80 Plätzen und möchten Reservierungen, WhatsApp-Anfragen und Stammkundenpflege automatisieren...',
    submitBtn: 'Anfrage senden',
    successTitle: 'Anfrage gesendet!',
    successMsg: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden per E-Mail oder Telefon.',
    trust: ['DSGVO-konform', 'Kostenlos & unverbindlich', '24h Antwortzeit'],
    contactTitle: 'Direkter Kontakt',
    whatsappLabel: 'WhatsApp',
    whatsappDesc: 'Schreiben Sie uns direkt auf WhatsApp — schnellste Antwortzeit.',
    whatsappBtn: 'WhatsApp öffnen',
    emailAddr: 'hello@ovivo.io',
    emailDesc: 'Für detaillierte Anfragen und Dokumente.',
    phoneDesc: 'Mo–Fr, 9–18 Uhr',
    location: 'Hamburg, Deutschland',
    responseTime: 'Antwort in < 24h',
    responseDesc: 'Wir antworten auf alle Anfragen innerhalb von 24 Stunden.',
    faqTitle: 'Häufige Fragen',
    faqs: [
      { q: 'Was passiert nach meiner Anfrage?', a: 'Wir melden uns innerhalb von 24 Stunden und vereinbaren ein kostenloses 30-Minuten-Gespräch, um Ihren Betrieb zu analysieren.' },
      { q: 'Muss ich technisches Wissen mitbringen?', a: 'Nein. Wir kümmern uns um alles Technische. Sie müssen nur wissen, was Sie automatisieren möchten.' },
      { q: 'Gibt es eine Mindestlaufzeit?', a: 'Der monatliche Support ist monatlich kündbar. Wir vertrauen auf die Qualität unserer Arbeit.' },
    ],
  },
  en: {
    badge: 'Contact',
    title: "Let's talk",
    titleGradient: 'about your project',
    sub: 'Fill out the form or contact us directly — we\'ll get back to you within 24 hours.',
    formTitle: 'Request Free Consultation',
    formSub: 'No obligation. Free. Response within 24 hours.',
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone (optional)',
    companyLabel: 'Business & Industry',
    messageLabel: 'What would you like to automate?',
    namePlaceholder: 'John Smith',
    emailPlaceholder: 'john@restaurant.com',
    phonePlaceholder: '+49 176 56565322',
    companyPlaceholder: 'Restaurant Bella Vista — Hospitality',
    messagePlaceholder: 'We run a restaurant with 80 seats and want to automate reservations, WhatsApp inquiries, and customer retention...',
    submitBtn: 'Send inquiry',
    successTitle: 'Inquiry sent!',
    successMsg: 'Thank you! We\'ll get back to you within 24 hours by email or phone.',
    trust: ['GDPR compliant', 'Free & no obligation', '24h response time'],
    contactTitle: 'Direct Contact',
    whatsappLabel: 'WhatsApp',
    whatsappDesc: 'Message us directly on WhatsApp — fastest response time.',
    whatsappBtn: 'Open WhatsApp',
    emailAddr: 'hello@ovivo.io',
    emailDesc: 'For detailed inquiries and documents.',
    phoneDesc: 'Mon–Fri, 9am–6pm',
    location: 'Hamburg, Germany',
    responseTime: 'Response in < 24h',
    responseDesc: 'We respond to all inquiries within 24 hours.',
    faqTitle: 'Common Questions',
    faqs: [
      { q: 'What happens after my inquiry?', a: 'We\'ll get back to you within 24 hours and schedule a free 30-minute call to analyze your business.' },
      { q: 'Do I need technical knowledge?', a: 'No. We handle all the technical aspects. You just need to know what you want to automate.' },
      { q: 'Is there a minimum contract period?', a: 'Monthly support is cancelable monthly. We trust the quality of our work.' },
    ],
  },
  ar: {
    badge: 'تواصل معنا',
    title: 'دعنا نتحدث',
    titleGradient: 'عن مشروعك',
    sub: 'املأ النموذج أو تواصل معنا مباشرة — سنرد عليك خلال 24 ساعة.',
    formTitle: 'اطلب استشارة مجانية',
    formSub: 'بدون التزام. مجاناً. رد خلال 24 ساعة.',
    nameLabel: 'اسمك',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'الهاتف (اختياري)',
    companyLabel: 'الشركة والقطاع',
    messageLabel: 'ما الذي تريد أتمتته؟',
    namePlaceholder: 'محمد أحمد',
    emailPlaceholder: 'mohammed@restaurant.com',
    phonePlaceholder: '+49 176 56565322',
    companyPlaceholder: 'مطعم بيلا فيستا — ضيافة',
    messagePlaceholder: 'ندير مطعماً بـ 80 مقعداً ونريد أتمتة الحجوزات واستفسارات واتساب والاحتفاظ بالعملاء...',
    submitBtn: 'إرسال الطلب',
    successTitle: 'تم إرسال الطلب!',
    successMsg: 'شكراً لك! سنتواصل معك خلال 24 ساعة عبر البريد الإلكتروني أو الهاتف.',
    trust: ['متوافق مع حماية البيانات', 'مجاني وبدون التزام', 'رد خلال 24 ساعة'],
    contactTitle: 'تواصل مباشر',
    whatsappLabel: 'واتساب',
    whatsappDesc: 'راسلنا مباشرة على واتساب — أسرع وقت استجابة.',
    whatsappBtn: 'فتح واتساب',
    emailAddr: 'hello@ovivo.io',
    emailDesc: 'للاستفسارات التفصيلية والوثائق.',
    phoneDesc: 'الاثنين–الجمعة، 9 صباحاً–6 مساءً',
    location: 'هامبورغ، ألمانيا',
    responseTime: 'رد خلال 24 ساعة',
    responseDesc: 'نرد على جميع الاستفسارات خلال 24 ساعة.',
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      { q: 'ماذا يحدث بعد طلبي؟', a: 'سنتواصل معك خلال 24 ساعة ونجدول مكالمة مجانية لمدة 30 دقيقة لتحليل أعمالك.' },
      { q: 'هل أحتاج إلى معرفة تقنية؟', a: 'لا. نحن نتولى جميع الجوانب التقنية. تحتاج فقط أن تعرف ما تريد أتمتته.' },
      { q: 'هل هناك حد أدنى لمدة العقد؟', a: 'الدعم الشهري قابل للإلغاء شهرياً. نثق بجودة عملنا.' },
    ],
  },
};

interface Props {
  lang: Lang;
}

export function ContactPage({ lang }: Props) {
  const tx = t[lang] ?? t['de'];
  const rtl = isRTL(lang);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: `${company} | Tel: ${phone}`, message, source: 'contact' }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  return (
    <div className="flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={tx.badge} title={tx.title} titleGradient={tx.titleGradient} subtitle={tx.sub} />
          </RevealSection>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <GlassCard className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{tx.successTitle}</h3>
                      <p className="text-gray-400">{tx.successMsg}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h2 className="text-xl font-bold text-white mb-1">{tx.formTitle}</h2>
                      <p className="text-sm text-gray-500 mb-7">{tx.formSub}</p>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.nameLabel}</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tx.namePlaceholder} className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.emailLabel} *</label>
                            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tx.emailPlaceholder} className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50" />
                          </div>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.phoneLabel}</label>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={tx.phonePlaceholder} className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.companyLabel}</label>
                            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder={tx.companyPlaceholder} className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.messageLabel}</label>
                          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={tx.messagePlaceholder} rows={5} className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 resize-none" />
                        </div>
                        <Button type="submit" disabled={submitting} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-5 text-base transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]">
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                              {lang === 'de' ? 'Wird gesendet...' : lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {tx.submitBtn}
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                        <div className="flex flex-wrap gap-4 justify-center">
                          {tx.trust.map((item) => (
                            <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </div>

            {/* Contact sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <GlassCard className="p-6">
                <h3 className="text-base font-bold text-white mb-5">{tx.contactTitle}</h3>
                <div className="space-y-4">
                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/4917656565322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all group"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{tx.whatsappLabel}</p>
                      <p className="text-xs text-gray-400">{tx.whatsappDesc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {[
                    { icon: Mail, label: tx.emailAddr, desc: tx.emailDesc, href: `mailto:${tx.emailAddr}`, color: 'text-blue-400' },
                    { icon: Phone, label: '+49 176 56565322', desc: tx.phoneDesc, href: 'tel:+4917656565322', color: 'text-gray-400' },
                    { icon: MapPin, label: tx.location, desc: '', href: '#', color: 'text-gray-400' },
                    { icon: Clock, label: tx.responseTime, desc: tx.responseDesc, href: '#', color: 'text-amber-400' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-3 group"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 flex-shrink-0 mt-0.5">
                          <Icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </GlassCard>

              {/* FAQ */}
              <GlassCard className="p-6">
                <h3 className="text-base font-bold text-white mb-4">{tx.faqTitle}</h3>
                <div className="space-y-4">
                  {tx.faqs.map((faq) => (
                    <div key={faq.q} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-white mb-1">{faq.q}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
