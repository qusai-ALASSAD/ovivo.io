'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CircleCheck as CheckCircle, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { RevealSection, StaggerContainer, StaggerItem, GlassCard } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { LucideIcon } from 'lucide-react';

export interface ServicePackage {
  name: string;
  price: string;
  timeline: string;
  badge: string;
  badgeClass: string;
  highlighted?: boolean;
  deliverables: string[];
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceUseCase {
  industry: string;
  icon: string;
  example: string;
}

export interface ServiceDeliverableGroup {
  category: string;
  items: string[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePageProps {
  lang?: 'de' | 'en' | 'ar';
  badge: string;
  heroTitle: string;
  heroGradient: string;
  heroSubtitle: string;
  heroImage: React.ReactNode;
  whyTitle: string;
  whyItems: { icon: LucideIcon; title: string; desc: string }[];
  beforeAfter?: { before: string; after: string }[];
  deliverables: ServiceDeliverableGroup[];
  useCases: ServiceUseCase[];
  process: ServiceProcess[];
  packages: ServicePackage[];
  faqs: ServiceFaq[];
  relatedServices: { href: string; label: string }[];
  extraSection?: React.ReactNode;
}

export function ServicePageLayout({
  lang = 'de',
  badge,
  heroTitle,
  heroGradient,
  heroSubtitle,
  heroImage,
  whyTitle,
  whyItems,
  beforeAfter,
  deliverables,
  useCases,
  process,
  packages,
  faqs,
  relatedServices,
  extraSection,
}: ServicePageProps) {
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';
  const sPrefix = lang === 'en' ? '/en/services' : lang === 'ar' ? '/ar/services' : '/services';

  const t = lang === 'ar' ? {
    services: 'الخدمات',
    whyItMatters: 'لماذا هذا مهم',
    withoutService: 'بدون هذه الخدمة',
    withService: 'مع هذه الخدمة',
    deliverablesBadge: 'ما تحصل عليه',
    deliverablesTitle: 'كل ما',
    deliverablesGradient: 'تحصل عليه',
    deliverablesSubtitle: 'كل شيء مشمول — بدون تكاليف خفية.',
    useCasesBadge: 'حالات الاستخدام',
    useCasesTitle: 'يناسب',
    useCasesGradient: 'كل القطاعات',
    useCasesSubtitle: 'نتائج مثبتة في مختلف أنواع الأعمال.',
    processBadge: 'العملية',
    processTitle: 'كيف',
    processGradient: 'نعمل معاً',
    processSubtitle: 'عملية منظمة من 5 خطوات من البداية حتى النتائج.',
    packagesBadge: 'الباقات',
    packagesTitle: 'اختر',
    packagesGradient: 'باقتك',
    packagesSubtitle: 'باقات مصممة لتناسب مرحلتك وطموحاتك.',
    faqBadge: 'أسئلة شائعة',
    faqTitle: 'الأسئلة',
    faqGradient: 'المتكررة',
    relatedLabel: 'خدمات ذات صلة',
    requestQuote: 'اطلب عرض سعر',
    bookCall: 'احجز مكالمة',
    applyNow: 'ابدأ الآن',
    strategyCall: 'احجز استشارة مجانية',
  } : lang === 'en' ? {
    services: 'Services',
    whyItMatters: 'Why It Matters',
    withoutService: 'Without This Service',
    withService: 'With This Service',
    deliverablesBadge: 'Deliverables',
    deliverablesTitle: 'What You',
    deliverablesGradient: 'Get',
    deliverablesSubtitle: 'Everything included — no hidden extras.',
    useCasesBadge: 'Use Cases',
    useCasesTitle: 'Works For',
    useCasesGradient: 'Every Industry',
    useCasesSubtitle: 'Proven results across different business types.',
    processBadge: 'Process',
    processTitle: 'How We',
    processGradient: 'Work Together',
    processSubtitle: 'A structured 5-step process from kickoff to results.',
    packagesBadge: 'Packages',
    packagesTitle: 'Choose Your',
    packagesGradient: 'Investment Level',
    packagesSubtitle: 'Tailored packages to match your stage and ambitions.',
    faqBadge: 'FAQ',
    faqTitle: 'Frequently Asked',
    faqGradient: 'Questions',
    relatedLabel: 'Related Services',
    requestQuote: 'Request a Quote',
    bookCall: 'Book a Call',
    applyNow: 'Apply Now',
    strategyCall: 'Book a Free Strategy Call',
  } : {
    services: 'Leistungen',
    whyItMatters: 'Warum es wichtig ist',
    withoutService: 'Ohne diesen Service',
    withService: 'Mit diesem Service',
    deliverablesBadge: 'Leistungsumfang',
    deliverablesTitle: 'Was Sie',
    deliverablesGradient: 'erhalten',
    deliverablesSubtitle: 'Alles inklusive — keine versteckten Kosten.',
    useCasesBadge: 'Anwendungsfälle',
    useCasesTitle: 'Funktioniert für',
    useCasesGradient: 'jede Branche',
    useCasesSubtitle: 'Nachgewiesene Ergebnisse in verschiedenen Geschäftsbereichen.',
    processBadge: 'Prozess',
    processTitle: 'So arbeiten',
    processGradient: 'wir zusammen',
    processSubtitle: 'Ein strukturierter 5-Schritte-Prozess vom Kickoff bis zu Ergebnissen.',
    packagesBadge: 'Pakete',
    packagesTitle: 'Wählen Sie Ihr',
    packagesGradient: 'Investitionsniveau',
    packagesSubtitle: 'Maßgeschneiderte Pakete für Ihre Ziele und Ihr Budget.',
    faqBadge: 'FAQ',
    faqTitle: 'Häufig gestellte',
    faqGradient: 'Fragen',
    relatedLabel: 'Weitere Leistungen',
    requestQuote: 'Angebot anfragen',
    bookCall: 'Termin buchen',
    applyNow: 'Jetzt starten',
    strategyCall: 'Kostenloses Strategiegespräch buchen',
  };

  return (
    <div className="flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-blue-500/10 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Link href={`${sPrefix}`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t.services}</Link>
                <ChevronRight className="h-3 w-3 text-gray-700" />
                <span className="text-xs text-blue-400">{badge}</span>
              </div>
              <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
                {badge}
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight mb-6">
                {heroTitle}{' '}
                <span className="text-gradient">{heroGradient}</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg mb-10">
                {heroSubtitle}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href={`${prefix}/consultation`}>
                  <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <span className="relative z-10 flex items-center gap-2">
                      {t.requestQuote}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
                <Link href={`${prefix}/consultation`}>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 px-8 py-6 text-base">
                    {t.bookCall}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="relative"
            >
              {heroImage}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.whyItMatters} title={whyTitle} titleGradient="" />
          </RevealSection>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <GlassCard className="p-6 h-full">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {beforeAfter && beforeAfter.length > 0 && (
            <RevealSection className="mt-12">
              <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
                <div className="glass rounded-2xl p-6 border-red-500/20">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">{t.withoutService}</p>
                  <ul className="space-y-3">
                    {beforeAfter.map((item) => (
                      <li key={item.before} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                        {item.before}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-2xl p-6 border-emerald-500/20">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">{t.withService}</p>
                  <ul className="space-y-3">
                    {beforeAfter.map((item) => (
                      <li key={item.after} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item.after}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      {/* Extra Section (diagram, etc.) */}
      {extraSection && (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {extraSection}
          </div>
        </section>
      )}

      {/* Deliverables */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.deliverablesBadge} title={t.deliverablesTitle} titleGradient={t.deliverablesGradient} subtitle={t.deliverablesSubtitle} />
          </RevealSection>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((group) => (
              <StaggerItem key={group.category}>
                <GlassCard className="p-6 h-full">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">{group.category}</p>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.useCasesBadge} title={t.useCasesTitle} titleGradient={t.useCasesGradient} subtitle={t.useCasesSubtitle} />
          </RevealSection>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {useCases.map((uc) => (
              <StaggerItem key={uc.industry}>
                <GlassCard className="p-5 h-full text-center">
                  <div className="text-3xl mb-3">{uc.icon}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{uc.industry}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{uc.example}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.processBadge} title={t.processTitle} titleGradient={t.processGradient} subtitle={t.processSubtitle} />
          </RevealSection>
          <StaggerContainer className="grid gap-6 md:grid-cols-5">
            {process.map((step, i) => (
              <StaggerItem key={step.step}>
                <div className="text-center">
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl glass border-blue-500/20 mb-4 mx-auto">
                    <span className="text-xl font-bold text-blue-400">{step.step}</span>
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/[0.02]" id="packages">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.packagesBadge} title={t.packagesTitle} titleGradient={t.packagesGradient} subtitle={t.packagesSubtitle} />
          </RevealSection>
          <StaggerContainer className="grid gap-8 lg:grid-cols-3">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl flex flex-col glass h-full ${pkg.highlighted ? 'border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.2)]' : 'border-white/10'}`}
                >
                  {pkg.highlighted && (
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  )}
                  <div className="p-8 flex flex-col h-full">
                    <Badge className={`w-fit text-xs border mb-4 ${pkg.badgeClass}`}>{pkg.badge}</Badge>
                    <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-white my-4">{pkg.price}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
                      <Clock className="h-3 w-3" />
                      {pkg.timeline}
                    </div>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {pkg.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <Link href={`${prefix}/consultation`}>
                      <Button className={`w-full font-semibold transition-all duration-300 ${pkg.highlighted ? 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'}`}>
                        {t.applyNow}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge={t.faqBadge} title={t.faqTitle} titleGradient={t.faqGradient} />
          </RevealSection>
          <RevealSection>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
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

      {/* Related Services */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <RevealSection>
            <div className="pt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-6 text-center">{t.relatedLabel}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedServices.map((s) => (
                  <Link key={s.href} href={s.href}>
                    <Button variant="outline" size="sm" className="border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                      {s.label}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link href={`${prefix}/consultation`}>
            <Button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] rounded-full">
              {t.strategyCall}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
