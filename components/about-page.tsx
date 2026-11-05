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
      sub: 'OVIVO.IO entwickelt praktische KI-Automation für Unternehmen — vom intelligenten Kundenservice bis zur Verbindung bestehender Tools und Workflows.',
    },
    story: {
      badge: 'Unsere Geschichte',
      title: 'Warum Ovivo',
      titleGradient: 'entstanden ist',
      p1: 'Viele Unternehmen verbringen täglich wertvolle Zeit mit wiederkehrenden Kundenanfragen, Terminabsprachen und der Übertragung von Daten zwischen Systemen.',
      p2: 'Ob Kundenservice, Terminmanagement oder interne Abläufe: Nicht jede Aufgabe braucht mehr Personal oder neue Software. Häufig hilft eine gut geplante Integration vorhandener Werkzeuge.',
      p3: 'Unser Ansatz: Wir analysieren Ihre Abläufe und entwickeln passende KI-Assistenten und n8n-Workflows. Webdesign und digitales Marketing ergänzen die Automationslösungen dort, wo sie sinnvoll sind.',
    },
    mission: {
      badge: 'Mission & Werte',
      title: 'Was uns',
      titleGradient: 'antreibt',
      values: [
        { icon: Zap, title: 'Effizienz durch Automation', desc: 'Manuelle, repetitive Aufgaben sollten von KI übernommen werden — damit Menschen sich auf kreative und strategische Arbeit konzentrieren können.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'Ehrliche Partnerschaft', desc: 'Wir verkaufen keine leeren Versprechen. Wir bauen Systeme, die messbare Ergebnisse liefern — und stehen langfristig an Ihrer Seite.', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'Datenschutz first', desc: 'Wir berücksichtigen Datenschutz und Datensicherheit bei Planung und Umsetzung. Die rechtlichen Anforderungen prüfen wir abhängig vom konkreten Projekt.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'Warum Ovivo',
      title: 'Was uns',
      titleGradient: 'unterscheidet',
      items: [
        { icon: Target, title: 'Branchenfokus', desc: 'Wir entwickeln Automation für Unternehmen verschiedener Branchen, besonders für wiederkehrende Anfragen und Prozesse.' },
        { icon: Users, title: 'Persönlicher Service', desc: 'Kein anonymes Ticket-System. Sie haben einen festen Ansprechpartner, der Ihr Business kennt und für Sie da ist.' },
        { icon: TrendingUp, title: 'Messbare Ergebnisse', desc: 'Wo möglich, definieren wir vorab messbare Ziele und prüfen gemeinsam die Ergebnisse der Automation.' },
        { icon: Zap, title: 'Schnelle Umsetzung', desc: 'Wir planen Umfang, Integrationen und Termine gemeinsam. Die Umsetzungsdauer hängt vom jeweiligen Projekt ab.' },
      ],
    },
    stats: [
      { value: 'KI', label: 'Individuelle KI-Automation' },
      { value: '24/7', label: 'Automatisierte Prozesse möglich' },
      { value: 'CRM', label: 'Integration vorhandener Systeme' },
      { value: 'n8n', label: 'Vernetzte Workflows' },
    ],
    cta: {
      title: 'Bereit für den nächsten Schritt?',
      sub: 'Besprechen Sie Ihre Geschäftsprozesse mit uns. Gemeinsam prüfen wir, welche Schritte sich sinnvoll automatisieren lassen.',
      btn: 'Kostenlose Beratung anfragen',
    },
  },
  en: {
    hero: {
      badge: 'About Ovivo',
      title: 'We automate',
      titleGradient: 'your business',
      sub: 'OVIVO.IO builds practical AI automation for businesses, from customer assistance to integrations and connected workflows.',
    },
    story: {
      badge: 'Our Story',
      title: 'Why Ovivo',
      titleGradient: 'was founded',
      p1: 'Many businesses spend valuable time handling repetitive customer inquiries, scheduling and moving information between tools.',
      p2: 'Whether for customer support, scheduling or internal operations, thoughtful automation can simplify repetitive work using existing tools.',
      p3: 'We review your workflows and develop suitable AI assistants and n8n automations. Web design and digital marketing complement our solutions where they add value.',
    },
    mission: {
      badge: 'Mission & Values',
      title: 'What drives',
      titleGradient: 'us',
      values: [
        { icon: Zap, title: 'Efficiency Through Automation', desc: 'Manual, repetitive tasks should be handled by AI — so people can focus on creative and strategic work.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'Honest Partnership', desc: "We don't sell empty promises. We build systems that deliver measurable results — and stand by your side long-term.", color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'Privacy First', desc: 'We consider privacy and data security throughout planning and implementation, based on the requirements of each project.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'Why Ovivo',
      title: 'What sets',
      titleGradient: 'us apart',
      items: [
        { icon: Target, title: 'Industry Focus', desc: 'We create automations for businesses across industries, especially where inquiries and workflows repeat.' },
        { icon: Users, title: 'Personal Service', desc: 'No anonymous ticket system. You have a dedicated contact person who knows your business and is always there for you.' },
        { icon: TrendingUp, title: 'Measurable Results', desc: 'When possible, we define measurable goals up front and review automation outcomes together.' },
        { icon: Zap, title: 'Fast Implementation', desc: 'We plan the scope, integrations and delivery with you. Timelines depend on the project.' },
      ],
    },
    stats: [
      { value: 'AI', label: 'Tailored AI automation' },
      { value: '24/7', label: 'Automated workflows possible' },
      { value: 'CRM', label: 'Integrate your existing tools' },
      { value: 'n8n', label: 'Connected workflows' },
    ],
    cta: {
      title: 'Ready for the next step?',
      sub: 'Tell us about your processes. We will explore which steps make sense to automate.',
      btn: 'Request free consultation',
    },
  },
  ar: {
    hero: {
      badge: 'من نحن',
      title: 'نحن نؤتمت',
      titleGradient: 'أعمالك',
      sub: 'تقدم OVIVO.IO حلول أتمتة عملية للشركات، من المساعد الذكي إلى ربط الأدوات والعمليات.',
    },
    story: {
      badge: 'قصتنا',
      title: 'لماذا تأسس',
      titleGradient: 'أوفيفو',
      p1: 'تقضي شركات كثيرة وقتاً طويلاً في الرد على الاستفسارات المتكررة وتنظيم المواعيد ونقل البيانات بين الأنظمة.',
      p2: 'يمكن للأتمتة المدروسة تبسيط خدمة العملاء وتنظيم المواعيد والمهام الداخلية، مع الاستفادة من الأدوات الموجودة بالفعل.',
      p3: 'نراجع عمليات شركتك ونطور مساعدين أذكياء وسير عمل n8n بحسب الحاجة. وتكمل هذه الحلول خدمات تصميم المواقع والتسويق الرقمي.',
    },
    mission: {
      badge: 'مهمتنا وقيمنا',
      title: 'ما الذي',
      titleGradient: 'يحركنا',
      values: [
        { icon: Zap, title: 'الكفاءة عبر الأتمتة', desc: 'المهام اليدوية المتكررة يجب أن يتولاها الذكاء الاصطناعي — حتى يتفرغ الناس للعمل الإبداعي والاستراتيجي.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { icon: Heart, title: 'شراكة صادقة', desc: 'نحن لا نبيع وعوداً فارغة. نبني أنظمة تحقق نتائج قابلة للقياس — ونقف إلى جانبك على المدى البعيد.', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
        { icon: Shield, title: 'الخصوصية أولاً', desc: 'نراعي حماية البيانات وأمن المعلومات أثناء التخطيط والتنفيذ بحسب متطلبات كل مشروع.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
      ],
    },
    why: {
      badge: 'لماذا أوفيفو',
      title: 'ما الذي',
      titleGradient: 'يميزنا',
      items: [
        { icon: Target, title: 'تركيز على القطاع', desc: 'نقدم الأتمتة لشركات من قطاعات مختلفة، خاصة في العمليات والاستفسارات المتكررة.' },
        { icon: Users, title: 'خدمة شخصية', desc: 'لا نظام تذاكر مجهول. لديك متخصص مخصص يعرف أعمالك وهو دائماً في خدمتك.' },
        { icon: TrendingUp, title: 'نتائج قابلة للقياس', desc: 'نحدد أهدافاً قابلة للقياس عندما يكون ذلك ممكناً ونراجع النتائج مع العميل.' },
        { icon: Zap, title: 'تنفيذ سريع', desc: 'نحدد نطاق العمل والربط والجدول الزمني بحسب متطلبات المشروع.' },
      ],
    },
    stats: [
      { value: 'AI', label: 'مساعدون أذكياء' },
      { value: 'AI', label: 'حلول أتمتة مخصصة' },
      { value: 'CRM', label: 'ربط أنظمة إدارة العملاء' },
      { value: 'n8n', label: 'أتمتة سير العمل' },
    ],
    cta: {
      title: 'هل أنت مستعد للخطوة التالية؟',
      sub: 'أخبرنا عن عمليات شركتك، وسنناقش معك الخطوات التي يمكن أتمتتها بشكل عملي.',
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

  // These are illustrative use cases, not client references or measured outcomes.
  const useCases = lang === 'ar'
    ? [
        { icon: '💬', label: 'خدمة العملاء', result: 'مساعد يجيب عن الأسئلة الشائعة' },
        { icon: '📅', label: 'المواعيد والحجوزات', result: 'تنظيم الاستفسارات والتقويم' },
        { icon: '🔄', label: 'ربط CRM وn8n', result: 'نقل البيانات بين الأنظمة' },
        { icon: '📈', label: 'متابعة العملاء', result: 'سير عمل لمتابعة الطلبات' },
      ]
    : lang === 'en'
    ? [
        { icon: '💬', label: 'Customer support', result: 'AI assistant for common questions' },
        { icon: '📅', label: 'Appointments & bookings', result: 'Handle inquiries and calendar workflows' },
        { icon: '🔄', label: 'CRM and n8n integrations', result: 'Connect your existing tools' },
        { icon: '📈', label: 'Lead follow-up', result: 'Structured follow-up workflows' },
      ]
    : [
        { icon: '💬', label: 'Kundenservice', result: 'KI-Assistent für häufige Fragen' },
        { icon: '📅', label: 'Termine & Buchungen', result: 'Anfragen und Kalenderprozesse verbinden' },
        { icon: '🔄', label: 'CRM & n8n-Integration', result: 'Daten zwischen Systemen übertragen' },
        { icon: '📈', label: 'Lead-Nachverfolgung', result: 'Strukturierte Folgeprozesse einrichten' },
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
                  <div className="text-3xl font-bold text-[#0B1F4D] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#52647E]">{stat.label}</div>
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
              <h2 className="text-3xl font-bold text-[#0B1F4D] mb-3">
                {tx.story.title} <span className="text-gradient">{tx.story.titleGradient}</span>
              </h2>
              <div className="space-y-4 text-[#52647E] leading-relaxed">
                <p>{tx.story.p1}</p>
                <p>{tx.story.p2}</p>
                <p>{tx.story.p3}</p>
              </div>
            </RevealSection>
            <RevealSection>
              <GlassCard className="p-8">
                <div className="space-y-5">
                  {useCases.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0B1F4D]">{item.label}</p>
                        <p className="text-xs text-[#52647E]">{item.result}</p>
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
                    <h3 className="text-lg font-bold text-[#0B1F4D] mb-3">{v.title}</h3>
                    <p className="text-sm text-[#52647E] leading-relaxed">{v.desc}</p>
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
                    <h3 className="text-base font-bold text-[#0B1F4D] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#52647E] leading-relaxed">{item.desc}</p>
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
