'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, CircleCheck as CheckCircle, X, ShieldCheck, Clock, MessageSquare, Repeat
} from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const t = {
  de: {
    badge: 'Pakete & Preise',
    title: 'Transparent.',
    titleGradient: 'Leistungsstark.',
    sub: 'Drei Pakete für jeden Bedarf — einmaliger Setup + monatliche Betreuung. Endpreis abhängig von Betriebsgröße und Anforderungen.',
    setupLabel: 'Setup',
    monthlyLabel: 'Monatlich',
    ctaBtn: 'Kostenlose Beratung anfragen',
    disclaimer: 'Der endgültige Preis hängt von der Unternehmensgröße und den Anforderungen ab.',
    trustBadges: [
      { icon: ShieldCheck, label: 'DSGVO-konform' },
      { icon: MessageSquare, label: 'Kostenlose Beratung' },
      { icon: Clock, label: 'Setup 5–14 Tage' },
      { icon: Repeat, label: 'Monatlich kündbar' },
    ],
    packages: [
      {
        id: 'starter',
        name: 'Starter Automation',
        setup: 'ab €1.200',
        monthly: 'ab €120 / Monat',
        badge: null,
        highlighted: false,
        color: 'gray',
        ideal: 'Ideal für Einzelbetriebe & Einsteiger',
        features: ['KI-Chatbot für Kundenanfragen', 'Einfaches Automations-Setup', 'Lead Capture System', 'WhatsApp Integration', 'Einfaches Dashboard', 'Basis-Support'],
        notIncluded: ['Buchungssystem', 'CRM Integration', 'Marketing Automation'],
      },
      {
        id: 'business',
        name: 'Business Automation',
        setup: 'ab €2.200',
        monthly: 'ab €220 / Monat',
        badge: 'Beliebtestes Paket',
        highlighted: true,
        color: 'blue',
        ideal: 'Ideal für Restaurants, Cafés & Dienstleister',
        features: ['Erweiterter KI-Chatbot', 'WhatsApp Automation', 'Reservierungs- & Buchungssystem', 'CRM Integration', 'Automatische Kundennachverfolgung', 'Analytics Dashboard', 'Priority Support'],
        notIncluded: ['Marketing Automation'],
      },
      {
        id: 'full',
        name: 'Full Automation + Marketing',
        setup: 'ab €3.200',
        monthly: 'ab €450 / Monat',
        badge: 'Maximale Leistung',
        highlighted: false,
        color: 'orange',
        ideal: 'Ideal für wachsende Betriebe & Ketten',
        features: ['Komplettes KI-Automation System', 'Website KI-Assistent', 'WhatsApp Automation', 'Buchungs- & Reservierungssystem', 'CRM-System', 'Marketing Automation', 'Kundendatenbank', 'Monatliche Optimierung', 'Technischer Support', 'Optionales Marketing Management'],
        notIncluded: [],
      },
    ],
    comparison: {
      title: 'Leistungsvergleich',
      features: [
        { label: 'KI-Chatbot', starter: true, business: true, full: true },
        { label: 'WhatsApp Integration', starter: true, business: true, full: true },
        { label: 'Lead Capture', starter: true, business: true, full: true },
        { label: 'Buchungssystem', starter: false, business: true, full: true },
        { label: 'CRM Integration', starter: false, business: true, full: true },
        { label: 'Analytics Dashboard', starter: false, business: true, full: true },
        { label: 'WhatsApp Automation', starter: false, business: true, full: true },
        { label: 'Marketing Automation', starter: false, business: false, full: true },
        { label: 'Monatliche Optimierung', starter: false, business: false, full: true },
        { label: 'Kundendatenbank', starter: false, business: false, full: true },
      ],
    },
    faqTitle: 'Häufige Fragen zu den Preisen',
    faqs: [
      { q: 'Was ist in der Setup-Gebühr enthalten?', a: 'Die Setup-Gebühr umfasst die vollständige Implementierung aller Systeme, technische Einrichtung, individuelle Konfiguration auf Ihren Betrieb und Schulung Ihres Teams.' },
      { q: 'Was kostet der monatliche Support?', a: 'Der monatliche Support umfasst Wartung, Updates, technischen Support und — je nach Paket — regelmäßige Optimierungen Ihres Systems.' },
      { q: 'Kann ich upgraden?', a: 'Ja, jederzeit. Sie können Ihr Paket jederzeit erweitern. Wir berechnen nur die Differenz.' },
      { q: 'Gibt es einen Mindestvertrag?', a: 'Die Setup-Gebühr ist einmalig. Der monatliche Support ist monatlich kündbar — ohne Mindestlaufzeit.' },
      { q: 'Was ist, wenn ich nicht zufrieden bin?', a: 'Wir stehen hinter unserer Arbeit. Wenn das System nicht funktioniert wie besprochen, überarbeiten wir es kostenlos.' },
    ],
    ctaTitle: 'Bereit loszulegen?',
    ctaSub: 'Kostenlose Beratung — wir finden das richtige Paket für Ihren Betrieb.',
  },
  en: {
    badge: 'Packages & Pricing',
    title: 'Transparent.',
    titleGradient: 'Powerful.',
    sub: 'Three packages for every need — one-time setup + monthly support. Final price depends on business size and requirements.',
    setupLabel: 'Setup',
    monthlyLabel: 'Monthly',
    ctaBtn: 'Request free consultation',
    disclaimer: 'Final price depends on business size and automation requirements.',
    trustBadges: [
      { icon: ShieldCheck, label: 'GDPR compliant' },
      { icon: MessageSquare, label: 'Free consultation' },
      { icon: Clock, label: 'Setup 5–14 days' },
      { icon: Repeat, label: 'Cancel monthly' },
    ],
    packages: [
      {
        id: 'starter',
        name: 'Starter Automation',
        setup: 'from €1,200',
        monthly: 'from €120 / mo',
        badge: null,
        highlighted: false,
        color: 'gray',
        ideal: 'Ideal for sole traders & beginners',
        features: ['AI Chatbot for inquiries', 'Basic automation setup', 'Lead capture system', 'WhatsApp integration', 'Simple dashboard', 'Basic support'],
        notIncluded: ['Booking system', 'CRM integration', 'Marketing automation'],
      },
      {
        id: 'business',
        name: 'Business Automation',
        setup: 'from €2,200',
        monthly: 'from €220 / mo',
        badge: 'Most Popular',
        highlighted: true,
        color: 'blue',
        ideal: 'Ideal for restaurants, cafés & service businesses',
        features: ['Advanced AI chatbot', 'WhatsApp automation', 'Reservation & booking system', 'CRM integration', 'Automatic customer follow-up', 'Analytics dashboard', 'Priority support'],
        notIncluded: ['Marketing automation'],
      },
      {
        id: 'full',
        name: 'Full Automation + Marketing',
        setup: 'from €3,200',
        monthly: 'from €450 / mo',
        badge: 'Maximum Power',
        highlighted: false,
        color: 'orange',
        ideal: 'Ideal for growing businesses & chains',
        features: ['Complete AI automation system', 'Website AI assistant', 'WhatsApp automation', 'Booking & reservation system', 'CRM system', 'Marketing automation', 'Customer database', 'Monthly optimization', 'Technical support', 'Optional marketing management'],
        notIncluded: [],
      },
    ],
    comparison: {
      title: 'Feature Comparison',
      features: [
        { label: 'AI Chatbot', starter: true, business: true, full: true },
        { label: 'WhatsApp Integration', starter: true, business: true, full: true },
        { label: 'Lead Capture', starter: true, business: true, full: true },
        { label: 'Booking System', starter: false, business: true, full: true },
        { label: 'CRM Integration', starter: false, business: true, full: true },
        { label: 'Analytics Dashboard', starter: false, business: true, full: true },
        { label: 'WhatsApp Automation', starter: false, business: true, full: true },
        { label: 'Marketing Automation', starter: false, business: false, full: true },
        { label: 'Monthly Optimization', starter: false, business: false, full: true },
        { label: 'Customer Database', starter: false, business: false, full: true },
      ],
    },
    faqTitle: 'Frequently Asked Questions about Pricing',
    faqs: [
      { q: "What's included in the setup fee?", a: 'The setup fee covers complete implementation of all systems, technical setup, individual configuration for your business, and team training.' },
      { q: "What does monthly support include?", a: 'Monthly support includes maintenance, updates, technical support, and — depending on the package — regular optimizations of your system.' },
      { q: 'Can I upgrade?', a: 'Yes, at any time. You can upgrade your package anytime. We only charge the difference.' },
      { q: 'Is there a minimum contract?', a: 'The setup fee is one-time. Monthly support is cancelable monthly — no minimum term.' },
      { q: "What if I'm not satisfied?", a: 'We stand behind our work. If the system doesn\'t work as discussed, we revise it at no cost.' },
    ],
    ctaTitle: 'Ready to get started?',
    ctaSub: 'Free consultation — we\'ll find the right package for your business.',
  },
  ar: {
    badge: 'الباقات والأسعار',
    title: 'شفاف.',
    titleGradient: 'قوي.',
    sub: '3 باقات تناسب كل مرحلة — إعداد لمرة واحدة + رعاية شهرية.',
    setupLabel: 'SETUP',
    monthlyLabel: 'شهرياً',
    ctaBtn: 'اطلب هذه الباقة',
    disclaimer: 'السعر النهائي يعتمد على حجم الشركة ومتطلبات الأتمتة.',
    trustBadges: [
      { icon: ShieldCheck, label: 'متوافق مع حماية البيانات' },
      { icon: MessageSquare, label: 'استشارة مجانية' },
      { icon: Clock, label: 'إعداد خلال 5–14 يوماً' },
      { icon: Repeat, label: 'إلغاء شهري' },
    ],
    packages: [
      {
        id: 'starter',
        name: 'الباقة الأساسية',
        setup: 'من €1,200',
        monthly: 'من €120 / شهر',
        badge: null,
        highlighted: false,
        color: 'gray',
        ideal: 'مثالي لأصحاب الأعمال الفردية والبدايات',
        cta: 'اطلب هذه الباقة',
        features: ['روبوت دردشة ذكي', 'التقاط العملاء المحتملين', 'تكامل واتساب', 'دعم أساسي'],
        notIncluded: ['نظام الحجز', 'تكامل CRM', 'أتمتة التسويق'],
      },
      {
        id: 'business',
        name: 'باقة الأعمال',
        setup: 'من €2,200',
        monthly: 'من €220 / شهر',
        badge: 'الأكثر طلباً',
        highlighted: true,
        color: 'blue',
        ideal: 'مثالي للمطاعم والمقاهي والشركات النامية',
        cta: 'اطلب هذه الباقة',
        features: ['روبوت دردشة متطور', 'أتمتة واتساب كاملة', 'نظام حجز تلقائي', 'تكامل CRM', 'دعم مميز'],
        notIncluded: ['أتمتة التسويق'],
      },
      {
        id: 'full',
        name: 'أتمتة كاملة + تسويق',
        setup: 'من €3,500',
        monthly: 'من €350 / شهر',
        badge: 'أقصى أداء',
        highlighted: false,
        color: 'orange',
        ideal: 'مثالي للشركات التي تريد التوسع بسرعة',
        cta: 'ابدأ الآن',
        features: ['نظام ذكاء اصطناعي متكامل', 'أتمتة كاملة للتواصل والتسويق', 'Funnel مبيعات جاهز', 'CRM متقدم + تتبع العملاء', 'حملات واتساب وإيميل أوتوماتيكية', 'دعم VIP'],
        notIncluded: [],
      },
    ],
    comparison: {
      title: 'مقارنة المميزات',
      features: [
        { label: 'روبوت الذكاء الاصطناعي', starter: true, business: true, full: true },
        { label: 'تكامل واتساب', starter: true, business: true, full: true },
        { label: 'التقاط العملاء المحتملين', starter: true, business: true, full: true },
        { label: 'نظام الحجز', starter: false, business: true, full: true },
        { label: 'تكامل CRM', starter: false, business: true, full: true },
        { label: 'لوحة التحليلات', starter: false, business: true, full: true },
        { label: 'أتمتة واتساب', starter: false, business: true, full: true },
        { label: 'أتمتة التسويق', starter: false, business: false, full: true },
        { label: 'تحسين شهري', starter: false, business: false, full: true },
        { label: 'قاعدة بيانات العملاء', starter: false, business: false, full: true },
      ],
    },
    faqTitle: 'أسئلة شائعة حول الأسعار',
    faqs: [
      { q: 'ما الذي يتضمنه رسم الإعداد؟', a: 'يشمل رسم الإعداد التنفيذ الكامل لجميع الأنظمة، والإعداد التقني، والتكوين المخصص لعملك، وتدريب فريقك — بدون تكاليف مخفية.' },
      { q: 'ما الذي يتضمنه الدعم الشهري؟', a: 'يتضمن الدعم الشهري الصيانة والتحديثات والدعم التقني، وحسب الباقة تحسينات منتظمة لنظامك بحيث يشتغل دايماً بأفضل مستوى.' },
      { q: 'هل يمكنني الترقية لاحقاً؟', a: 'نعم، في أي وقت وبدون تعقيد. نحن نتقاضى فقط الفرق بين الباقتين.' },
      { q: 'هل هناك عقد بحد أدنى؟', a: 'رسم الإعداد يُدفع مرة واحدة فقط. الرعاية الشهرية قابلة للإلغاء في أي وقت — بدون التزامات.' },
      { q: 'ماذا لو لم أكن راضياً عن النتائج؟', a: 'نحن واثقون من عملنا. إذا ما اشتغل النظام كما اتفقنا، نراجعه ونصلحه مجاناً بدون نقاش.' },
    ],
    ctaTitle: 'أي باقة تناسبك؟',
    ctaSub: 'كل بزنس مختلف — ونحن ما نعطيك حل جاهز. احجز استشارة مجانية ونحلل شغلك ونبني لك النظام المناسب 100%.',
  },
};

const planColors = {
  gray: {
    border: 'border-white/10',
    glow: '',
    button: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
    badge: 'bg-white/10 text-gray-300 border-white/20',
  },
  blue: {
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_60px_rgba(59,130,246,0.2)]',
    button: 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]',
    badge: 'bg-blue-500 text-white border-transparent',
  },
  orange: {
    border: 'border-orange-500/20',
    glow: '',
    button: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
};

interface Props {
  lang: Lang;
}

export function PricingPage({ lang }: Props) {
  const tx = (t as Record<string, typeof t['de']>)[lang] ?? t['de'];
  const rtl = isRTL(lang);
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';

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

          {/* Trust badges */}
          <RevealSection className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {tx.trustBadges.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex items-center gap-2 glass rounded-full px-4 py-2 border-white/10">
                    <Icon className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-300 font-medium">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </RevealSection>

          {/* Packages */}
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start mb-6">
            {tx.packages.map((plan) => {
              const colors = planColors[plan.color as keyof typeof planColors];
              return (
                <StaggerItem key={plan.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-2xl flex flex-col glass h-full ${colors.border} ${colors.glow} ${plan.highlighted ? 'lg:scale-[1.03]' : ''}`}
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
                    <div className="p-8 flex flex-col h-full">
                      {plan.badge && (
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold w-fit mb-4 ${colors.badge}`}>
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>

                      <div className="space-y-2 mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{tx.setupLabel}</span>
                          <span className="text-xl font-bold text-white">{plan.setup}</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{tx.monthlyLabel}</span>
                          <span className={`text-base font-bold ${plan.highlighted ? 'text-blue-400' : 'text-gray-300'}`}>{plan.monthly}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-4 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                        {plan.notIncluded.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <X className="h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <p className="text-xs text-gray-600 mb-5 italic">{plan.ideal}</p>

                      <Link href={`${prefix}/consultation`}>
                        <Button className={`w-full font-semibold transition-all duration-300 py-5 ${colors.button}`}>
                          {(plan as { cta?: string }).cta ?? tx.ctaBtn}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <RevealSection className="text-center mb-20">
            <p className="text-sm text-gray-500 italic">{tx.disclaimer}</p>
          </RevealSection>

          {/* Comparison Table */}
          <RevealSection className="mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{tx.comparison.title}</h2>
            <GlassCard className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">{lang === 'de' ? 'Funktion' : lang === 'ar' ? 'الميزة' : 'Feature'}</th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-300 text-center">Starter</th>
                      <th className="px-4 py-4 text-sm font-bold text-blue-400 text-center">Business</th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-300 text-center">Full</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tx.comparison.features.map((row, i) => (
                      <tr key={row.label} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                        <td className="px-6 py-3.5 text-sm text-gray-300">{row.label}</td>
                        <td className="px-4 py-3.5 text-center">
                          {row.starter ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {row.business ? <CheckCircle className="h-4 w-4 text-blue-400 mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {row.full ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </RevealSection>

          {/* FAQs */}
          <RevealSection className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{tx.faqTitle}</h2>
            <div className="space-y-4">
              {tx.faqs.map((faq) => (
                <GlassCard key={faq.q} className="p-6">
                  <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </GlassCard>
              ))}
            </div>
          </RevealSection>

          {/* CTA */}
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] p-12 text-center max-w-4xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{tx.ctaTitle}</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{tx.ctaSub}</p>
              <Link href={`${prefix}/consultation`}>
                <Button size="lg" className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <span className="flex items-center gap-2">
                    {tx.ctaBtn}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
