'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Users, TrendingUp, Heart, Target } from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const t = {
  de: {
    hero: {
      badge: 'Über Ovivo',
      title: 'Wir automatisieren',
      titleGradient: 'Ihren Betrieb',
      sub: 'Ovivo wurde gegründet, weil wir täglich sahen, wie gute Unternehmen Kunden verlieren — nicht wegen schlechter Qualität, sondern wegen verpasster Anfragen und fehlender Erreichbarkeit. Wir haben die Lösung gebaut.',
    },
    story: {
      badge: 'Unsere Geschichte',
      title: 'Warum Ovivo',
      titleGradient: 'entstanden ist',
      p1: 'Wir haben beobachtet, wie Restaurants, Cafés und Servicebetriebe täglich Kunden verlieren — nicht wegen schlechter Qualität, sondern wegen fehlender Erreichbarkeit und langsamer Reaktionszeiten.',
      p2: 'Telefonleitungen besetzt, WhatsApp-Nachrichten ohne Antwort, Reservierungsanfragen die zu spät bearbeitet werden — diese Probleme kosten echtes Geld. Und sie haben alle eine Lösung: Automation.',
      p3: 'Ovivo wurde gegründet, um genau diese Lücke zu schließen. Wir bauen KI-Systeme, die 24/7 für Ihr Unternehmen arbeiten — professionell, zuverlässig und vollautomatisch. Das Ergebnis: Mehr Umsatz, weniger Stress.',
    },
    mission: {
      badge: 'Mission & Werte',
      title: 'Was uns',
      titleGradient: 'antreibt',
      values: [
        { icon: Zap, title: 'Effizienz durch Automation', desc: 'Manuelle, repetitive Aufgaben sollten von KI übernommen werden — damit Menschen sich auf kreative und strategische Arbeit konzentrieren können.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'Ehrliche Partnerschaft', desc: 'Wir verkaufen keine leeren Versprechen. Wir bauen Systeme, die messbare Ergebnisse liefern — und stehen langfristig an Ihrer Seite.', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'Datenschutz first', desc: 'Alle unsere Systeme sind DSGVO-konform. Ihre Kundendaten und die Daten Ihrer Kunden sind bei uns sicher.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'Warum Ovivo',
      title: 'Was uns',
      titleGradient: 'unterscheidet',
      items: [
        { icon: Target, title: 'Branchenfokus', desc: 'Wir arbeiten ausschließlich mit Gastronomie und Servicebetrieben — unsere Lösungen sind tief auf Ihre Bedürfnisse optimiert.' },
        { icon: Users, title: 'Persönlicher Service', desc: 'Kein anonymes Ticket-System. Sie haben einen festen Ansprechpartner, der Ihr Business kennt und für Sie da ist.' },
        { icon: TrendingUp, title: 'Messbare Ergebnisse', desc: 'Wir tracken alle wichtigen KPIs und zeigen Ihnen genau, welchen ROI unsere Systeme liefern — transparent und nachvollziehbar.' },
        { icon: Zap, title: 'Schnelle Umsetzung', desc: 'Von der Beratung bis zum laufenden System in 5–14 Tagen. Kein langer Procurement-Prozess, kein IT-Aufwand für Sie.' },
      ],
    },
    stats: [
      { value: '200+', label: 'Betriebe automatisiert' },
      { value: '94%', label: 'Anfragen automatisch beantwortet' },
      { value: '+35%', label: 'Mehr Umsatz im Schnitt' },
      { value: '5–14', label: 'Tage bis zum Live-System' },
    ],
    cta: {
      title: 'Bereit für den nächsten Schritt?',
      sub: 'Buchen Sie eine kostenlose Beratung — wir analysieren Ihren Betrieb und zeigen Ihnen konkret, wie viel Umsatzpotenzial Sie gerade verschenken.',
      btn: 'Kostenlose Beratung anfragen',
    },
  },
  en: {
    hero: {
      badge: 'About Ovivo',
      title: 'We automate',
      titleGradient: 'your business',
      sub: 'Ovivo was founded because we watched great businesses lose customers daily — not from poor quality, but from missed inquiries and unavailability. We built the solution.',
    },
    story: {
      badge: 'Our Story',
      title: 'Why Ovivo',
      titleGradient: 'was founded',
      p1: 'We watched restaurants, cafés, and service businesses lose customers every day — not because of poor quality, but because of unavailability and slow response times.',
      p2: "Busy phone lines, unanswered WhatsApp messages, reservation requests processed too late — these problems cost real money. And they all have one solution: automation.",
      p3: 'Ovivo was founded to close exactly this gap. We build AI systems that work for your business 24/7 — professionally, reliably, and fully automatically. The result: more revenue, less stress.',
    },
    mission: {
      badge: 'Mission & Values',
      title: 'What drives',
      titleGradient: 'us',
      values: [
        { icon: Zap, title: 'Efficiency Through Automation', desc: 'Manual, repetitive tasks should be handled by AI — so people can focus on creative and strategic work.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'Honest Partnership', desc: "We don't sell empty promises. We build systems that deliver measurable results — and stand by your side long-term.", color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'Privacy First', desc: "All our systems are GDPR-compliant. Your data and your customers' data is safe with us.", color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'Why Ovivo',
      title: 'What sets',
      titleGradient: 'us apart',
      items: [
        { icon: Target, title: 'Industry Focus', desc: 'We work exclusively with hospitality and service businesses — our solutions are deeply optimized for your specific needs.' },
        { icon: Users, title: 'Personal Service', desc: 'No anonymous ticket system. You have a dedicated contact person who knows your business and is always there for you.' },
        { icon: TrendingUp, title: 'Measurable Results', desc: 'We track all key KPIs and show you exactly what ROI our systems deliver — transparent and verifiable.' },
        { icon: Zap, title: 'Fast Implementation', desc: 'From consultation to live system in 5–14 days. No lengthy procurement process, no IT effort required from you.' },
      ],
    },
    stats: [
      { value: '200+', label: 'Businesses automated' },
      { value: '94%', label: 'Inquiries answered automatically' },
      { value: '+35%', label: 'Average revenue increase' },
      { value: '5–14', label: 'Days to live system' },
    ],
    cta: {
      title: 'Ready for the next step?',
      sub: 'Book a free consultation — we analyze your business and show you exactly how much revenue potential you are currently leaving behind.',
      btn: 'Request free consultation',
    },
  },
  ar: {
    hero: {
      badge: 'من نحن',
      title: 'نحن نؤتمت',
      titleGradient: 'أعمالك',
      sub: 'تأسس أوفيفو لأننا رأينا كيف تخسر شركات رائعة عملاءها يومياً — ليس بسبب ضعف الجودة، بل بسبب الاستفسارات الفائتة وعدم التوفر. بنينا الحل.',
    },
    story: {
      badge: 'قصتنا',
      title: 'لماذا تأسس',
      titleGradient: 'أوفيفو',
      p1: 'رأينا كيف تخسر المطاعم والمقاهي وشركات الخدمات عملاءها يومياً — ليس بسبب ضعف الجودة، بل بسبب عدم التوفر وبطء الاستجابة.',
      p2: 'خطوط هاتف مشغولة، رسائل واتساب بلا رد، طلبات حجز تُعالج متأخرة — هذه المشاكل تكلف أموالاً حقيقية. وكلها لها حل واحد: الأتمتة.',
      p3: 'تأسس أوفيفو لسد هذه الفجوة تحديداً. نبني أنظمة ذكاء اصطناعي تعمل لصالح أعمالك 24/7 — باحترافية وموثوقية وبشكل كامل تلقائي. النتيجة: مزيد من الإيرادات، أقل توتر.',
    },
    mission: {
      badge: 'مهمتنا وقيمنا',
      title: 'ما الذي',
      titleGradient: 'يحركنا',
      values: [
        { icon: Zap, title: 'الكفاءة عبر الأتمتة', desc: 'المهام اليدوية المتكررة يجب أن يتولاها الذكاء الاصطناعي — حتى يتفرغ الناس للعمل الإبداعي والاستراتيجي.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'شراكة صادقة', desc: 'نحن لا نبيع وعوداً فارغة. نبني أنظمة تحقق نتائج قابلة للقياس — ونقف إلى جانبك على المدى البعيد.', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'الخصوصية أولاً', desc: 'جميع أنظمتنا متوافقة مع لوائح حماية البيانات. بياناتك وبيانات عملائك في أمان تام معنا.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'لماذا أوفيفو',
      title: 'ما الذي',
      titleGradient: 'يميزنا',
      items: [
        { icon: Target, title: 'تركيز على القطاع', desc: 'نعمل حصرياً مع المطاعم وشركات الخدمات — حلولنا محسّنة بعمق لاحتياجاتك الخاصة.' },
        { icon: Users, title: 'خدمة شخصية', desc: 'لا نظام تذاكر مجهول. لديك متخصص مخصص يعرف أعمالك وهو دائماً في خدمتك.' },
        { icon: TrendingUp, title: 'نتائج قابلة للقياس', desc: 'نتتبع جميع مؤشرات الأداء الرئيسية ونريك بالضبط ما يحققه نظامنا من عائد استثمار — بشفافية وإثبات.' },
        { icon: Zap, title: 'تنفيذ سريع', desc: 'من الاستشارة إلى النظام الحي في 5–14 يوماً. لا عملية شراء طويلة، لا جهد تقني مطلوب منك.' },
      ],
    },
    stats: [
      { value: '+200', label: 'شركة تم أتمتتها' },
      { value: '94%', label: 'استفسارات تُجاب تلقائياً' },
      { value: '+35%', label: 'متوسط زيادة الإيرادات' },
      { value: '5–14', label: 'يوماً حتى التشغيل الحي' },
    ],
    cta: {
      title: 'هل أنت مستعد للخطوة التالية؟',
      sub: 'احجز استشارة مجانية — نحلل أعمالك ونريك بالضبط كم من الإيرادات تتركها وراءك الآن.',
      btn: 'اطلب استشارة مجانية',
    },
  },
};

interface Props {
  lang: Lang;
}

export function AboutPage({ lang }: Props) {
  const tx = t[lang];
  const rtl = isRTL(lang);
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';

  const caseStudies = lang === 'ar'
    ? [
        { icon: '🍽️', label: 'مطعم بيلا فيستا، ميونخ', result: '90% حجوزات مؤتمتة' },
        { icon: '☕', label: 'كافيه آم زيه، هامبورغ', result: '+40% احتفاظ بالعملاء' },
        { icon: '💇', label: 'صالون إليز، برلين', result: '+45% حجوزات أكثر' },
        { icon: '🏋️', label: 'فيت لايف ستوديو، فرانكفورت', result: '-60% جهد يدوي' },
      ]
    : lang === 'en'
    ? [
        { icon: '🍽️', label: 'Restaurant Bella Vista, Munich', result: '90% reservations automated' },
        { icon: '☕', label: 'Café am See, Hamburg', result: '+40% customer retention' },
        { icon: '💇', label: 'Salon Elise, Berlin', result: '+45% more bookings' },
        { icon: '🏋️', label: 'FitLife Studio, Frankfurt', result: '-60% manual effort' },
      ]
    : [
        { icon: '🍽️', label: 'Restaurant Bella Vista, München', result: '90% Reservierungen automatisiert' },
        { icon: '☕', label: 'Café am See, Hamburg', result: '+40% Stammkundenbindung' },
        { icon: '💇', label: 'Salon Elise, Berlin', result: '+45% mehr Buchungen' },
        { icon: '🏋️', label: 'FitLife Studio, Frankfurt', result: '-60% manueller Aufwand' },
      ];

  return (
    <div className="flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <SectionHeader
              badge={tx.hero.badge}
              title={tx.hero.title}
              titleGradient={tx.hero.titleGradient}
              subtitle={tx.hero.sub}
            />
          </RevealSection>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {tx.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-1 text-gradient">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <RevealSection>
              <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
                {tx.story.badge}
              </span>
              <h2 className="text-3xl font-bold text-white mb-3">
                {tx.story.title} <span className="text-gradient">{tx.story.titleGradient}</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{tx.story.p1}</p>
                <p>{tx.story.p2}</p>
                <p>{tx.story.p3}</p>
              </div>
            </RevealSection>
            <RevealSection>
              <GlassCard className="p-8">
                <div className="space-y-5">
                  {caseStudies.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-emerald-400">{item.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={tx.mission.badge} title={tx.mission.title} titleGradient={tx.mission.titleGradient} />
          </RevealSection>
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {tx.mission.values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <GlassCard className="p-8 text-center h-full">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${v.bg} mb-6`}>
                      <Icon className={`h-7 w-7 ${v.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Ovivo */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={tx.why.badge} title={tx.why.title} titleGradient={tx.why.titleGradient} />
          </RevealSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tx.why.items.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <GlassCard className="p-6 h-full">
                    <Icon className="h-6 w-6 text-blue-400 mb-4" />
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{tx.cta.title}</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{tx.cta.sub}</p>
              <Link href={`${prefix}/consultation`}>
                <Button size="lg" className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <span className="flex items-center gap-2">
                    {tx.cta.btn}
                    <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
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
