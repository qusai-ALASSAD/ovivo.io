'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Clock, Users, Zap, MessageSquare, Calendar, Star, AlertTriangle } from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

export interface IndustryData {
  slug: string;
  emoji: string;
  badge: string;
  heroTitle: string;
  heroGradient: string;
  heroSub: string;
  painPoints: { icon: string; title: string; desc: string }[];
  solutions: { title: string; desc: string; result: string }[];
  stats: { value: string; label: string }[];
  caseStudy: { name: string; result: string; quote: string };
  automations: string[];
  faq: { q: string; a: string }[];
}

interface Props {
  lang: Lang;
  data: IndustryData;
}

export function IndustryPage({ lang, data }: Props) {
  const rtl = isRTL(lang);
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';

  const ctaLabel = lang === 'ar' ? 'احصل على تحليل مجاني' : lang === 'en' ? 'Get Free Analysis' : 'Kostenlose Analyse anfragen';
  const painLabel = lang === 'ar' ? 'المشاكل الشائعة' : lang === 'en' ? 'Common Problems' : 'Typische Probleme';
  const solutionsLabel = lang === 'ar' ? 'كيف نحلها' : lang === 'en' ? 'How We Solve Them' : 'Unsere Lösungen';
  const automationsLabel = lang === 'ar' ? 'ما نؤتمته لك' : lang === 'en' ? 'What We Automate' : 'Was wir automatisieren';
  const caseLabel = lang === 'ar' ? 'قصة نجاح حقيقية' : lang === 'en' ? 'Real Success Story' : 'Echte Erfolgsgeschichte';
  const faqLabel = lang === 'ar' ? 'أسئلة شائعة' : lang === 'en' ? 'FAQ' : 'Häufige Fragen';
  const ctaTitle = lang === 'ar' ? 'هل أنت مستعد لتحويل عملك؟' : lang === 'en' ? 'Ready to transform your business?' : 'Bereit Ihr Business zu transformieren?';
  const ctaSub = lang === 'ar' ? '30 دقيقة مجانية — نحلل وضعك ونبني لك خطة أتمتة مخصصة.' : lang === 'en' ? '30 minutes free — we analyze your situation and build a custom automation plan.' : '30 Minuten kostenlos — wir analysieren Ihre Situation und bauen einen maßgeschneiderten Automationsplan.';

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-blue-500/10 blur-[130px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-5xl mb-6 block">{data.emoji}</span>
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
              {data.badge}
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
              {data.heroTitle}<br />
              <span className="text-gradient">{data.heroGradient}</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
              {data.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${prefix}/consultation`}>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-bold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all group">
                  <span className="flex items-center gap-2">
                    {ctaLabel}
                    <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.02] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {data.stats.map((s) => (
              <StaggerItem key={s.label}>
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-black text-gradient mb-2">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">
              <AlertTriangle className="h-3.5 w-3.5" />
              {painLabel}
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              {lang === 'ar' ? 'هذه المشاكل تكلفك مالاً كل يوم' : lang === 'en' ? 'These problems cost you money every day' : 'Diese Probleme kosten Sie täglich Geld'}
            </h2>
          </RevealSection>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.painPoints.map((p) => (
              <StaggerItem key={p.title}>
                <GlassCard className="p-6 h-full border-red-500/10">
                  <div className="text-2xl mb-4">{p.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Solutions */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
              <Zap className="h-3.5 w-3.5" />
              {solutionsLabel}
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              {lang === 'ar' ? 'أتمتة ذكية تحل كل مشكلة' : lang === 'en' ? 'Smart automation solves every problem' : 'Intelligente Automation löst jedes Problem'}
            </h2>
          </RevealSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-3">
            {data.solutions.map((s, i) => (
              <StaggerItem key={s.title}>
                <GlassCard className="p-7 h-full flex flex-col">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 mb-5 text-sm font-black text-blue-400">
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-emerald-400">{s.result}</span>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What we automate */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection className="text-center mb-10">
            <h2 className="text-3xl font-black text-white sm:text-4xl mb-4">{automationsLabel}</h2>
          </RevealSection>
          <RevealSection>
            <GlassCard className="p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {data.automations.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{a}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      {/* Case Study */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-3xl text-center">
          <RevealSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-8">
              <Star className="h-3.5 w-3.5" />
              {caseLabel}
            </span>
            <GlassCard className="p-10">
              <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-lg text-gray-200 italic leading-relaxed mb-6">"{data.caseStudy.quote}"</p>
              <p className="font-bold text-white">{data.caseStudy.name}</p>
              <div className="inline-flex items-center gap-2 mt-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">{data.caseStudy.result}</span>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <RevealSection className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">{faqLabel}</h2>
          </RevealSection>
          <RevealSection>
            <div className="space-y-4">
              {data.faq.map((f) => (
                <GlassCard key={f.q} className="p-6">
                  <h3 className="font-bold text-white mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
                </GlassCard>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <span className="text-4xl block mb-6">{data.emoji}</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl mb-4">{ctaTitle}</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{ctaSub}</p>
              <Link href={`${prefix}/consultation`}>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-6 text-base font-bold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all group">
                  <span className="flex items-center gap-2">
                    {ctaLabel}
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
