'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  CheckCircle, ArrowRight, Clock, Zap, Globe, TrendingUp, Rocket,
  Users, Shield, Star, Lock, Target,
} from 'lucide-react';
import { RevealSection, StaggerContainer, StaggerItem, GlassCard } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';

const packages = [
  {
    id: 'launch',
    name: 'Launch System',
    tagline: 'Your professional foundation, live in 14 days.',
    price: 'From €1,490',
    priceNote: 'One-time investment',
    timeline: '14–18 days',
    badge: 'Foundation',
    badgeClass: 'bg-white/10 text-gray-300 border-white/20',
    highlighted: false,
    color: 'gray',
    icon: Globe,
    technical: [
      'Professional website design & development (up to 6 pages)',
      'Brand identity system (logo, colours, fonts)',
      'Lead capture forms + CRM integration',
      'AI chatbot (basic — FAQ + booking flow)',
      'Email welcome sequence (3 emails)',
      'Google Analytics + basic tracking',
    ],
    outcomes: [
      'Professional online presence that builds instant trust',
      'Lead capture system active from day one',
      'Clear brand positioning across all touchpoints',
      'Foundation ready to scale with ads and funnels',
    ],
  },
  {
    id: 'growth',
    name: 'Growth System',
    tagline: 'Funnels, automation, and ads working as one system.',
    price: 'From €2,990',
    priceNote: 'One-time + 60 days support',
    timeline: '21–25 days',
    badge: 'Most Applied',
    badgeClass: 'bg-blue-500 text-white border-transparent',
    highlighted: true,
    color: 'blue',
    icon: TrendingUp,
    technical: [
      'Everything in Launch System',
      'Sales funnel (3-page conversion system)',
      'Email automation sequences (7 flows)',
      'CRM pipeline setup + lead scoring',
      'AI chatbot (advanced — lead qualification + booking)',
      'Facebook & Instagram ads campaign setup',
      'Conversion tracking (Meta Pixel + GA4)',
      '60-day support + 1 strategy call/month',
    ],
    outcomes: [
      'Automated lead nurturing running 24/7',
      'Paid ad infrastructure generating qualified leads',
      'Full attribution — know what drives revenue',
      'Scalable system compounding results over time',
    ],
  },
  {
    id: 'scale',
    name: 'Scale System',
    tagline: 'Full-stack AI-integrated growth machine.',
    price: 'From €5,900',
    priceNote: 'One-time + 90 days management',
    timeline: '30 days + ongoing optimisation',
    badge: 'Full Arsenal',
    badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    highlighted: false,
    color: 'orange',
    icon: Rocket,
    technical: [
      'Everything in Growth System',
      'Multi-funnel architecture (5+ conversion funnels)',
      'Advanced automation (10+ workflows)',
      'Multi-channel ads: Meta + Google + TikTok',
      'Advanced AI chatbot with custom training',
      'Dedicated Ovivo AI account (Pro plan included)',
      'Content production (30 days managed)',
      'Monthly performance reporting + optimisation',
      '90-day dedicated account manager',
    ],
    outcomes: [
      'Market-dominating presence across every channel',
      'Automated revenue engine running on autopilot',
      'Expert-managed campaigns optimised monthly',
      'Premium positioning that commands attention and price',
    ],
  },
];

const process = [
  { step: '01', icon: Users, title: 'Application', desc: 'Submit a short application. We review your business, goals, and fit within 24 hours.' },
  { step: '02', icon: Target, title: 'Strategy Call', desc: 'A 60-minute deep-dive session to map your exact system, goals, and success metrics.' },
  { step: '03', icon: Zap, title: 'Build Phase', desc: 'Our team builds every element — design, copy, automation, integrations — in parallel.' },
  { step: '04', icon: Shield, title: 'Testing & QA', desc: 'Every flow, every automation, and every page is tested across devices before launch.' },
  { step: '05', icon: Rocket, title: 'Launch & Hand-Off', desc: 'Go live with full training, documentation, and ongoing support included.' },
];

const faqs = [
  { q: 'How is this different from the SaaS plan?', a: 'Ovivo SaaS (Starter/Pro/Agency) is a self-serve platform you use to generate AI plans and run automations yourself. Implementation Systems are done-for-you — our team builds everything from scratch, including your website, funnels, CRM, chatbot, and ad campaigns.' },
  { q: 'Do I need to be on the SaaS plan too?', a: 'The Growth and Scale Systems include access to the Ovivo Pro SaaS plan as part of the build. The Launch System includes a 30-day trial. You can continue your SaaS subscription independently after the build is complete.' },
  { q: 'Is this a one-time fee or recurring?', a: 'The system build is a one-time investment. Support periods are included. After the support period, you can continue independently or move to a monthly maintenance retainer.' },
  { q: 'How do you handle revisions?', a: 'All packages include unlimited revisions during the build phase. After launch, revisions are covered during the support period.' },
  { q: 'What if I\'m not happy with the result?', a: 'We present a full strategy and wireframes for approval before building anything. If the final delivery doesn\'t match what was agreed, we fix it — no questions asked.' },
  { q: 'Can I upgrade from Launch to Growth later?', a: 'Yes. If you start with the Launch System and want to add funnels, automation, and ads later, we apply a credit from your Launch investment toward the Growth System.' },
];

const planColors: Record<string, { border: string; glow: string; iconBg: string; button: string }> = {
  gray: {
    border: 'border-white/10',
    glow: '',
    iconBg: 'bg-white/5 border-white/10',
    button: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
  },
  blue: {
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_80px_rgba(59,130,246,0.2)]',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
    button: 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]',
  },
  orange: {
    border: 'border-orange-500/20',
    glow: '',
    iconBg: 'bg-orange-500/15 border-orange-500/20',
    button: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
  },
};

export default function SystemsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-blue-500/8 blur-[160px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Private Implementation
                </span>
                <span className="text-xs text-gray-600">Selective intake</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight mb-6">
                We Build It.<br />
                <span className="text-gradient">You Scale It.</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg mb-8">
                Done-for-you implementation services for businesses that want everything built, integrated, and launched — without touching a single line of code.
              </p>
              <div className="glass rounded-2xl p-5 border-white/10 mb-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">What makes this different from DIY tools</p>
                {[
                  'Our team builds everything — you just approve and launch',
                  'Every system is custom-built to your business, not templated',
                  'AI, automation, CRM, ads, and website all connected and working together',
                  'Fixed price. No hidden fees. Results guaranteed.',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Apply for Private Build
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                    Book a Discovery Call
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">What gets built for you</p>
                <div className="space-y-3">
                  {[
                    { icon: Globe, label: 'Website + Landing Pages', desc: 'Design, build, go live', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                    { icon: Zap, label: 'Automation Workflows', desc: 'Leads, follow-ups, bookings', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                    { icon: TrendingUp, label: 'CRM + Email Sequences', desc: 'Pipeline & nurture flows', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
                    { icon: Target, label: 'Paid Ad Campaigns', desc: 'Meta, Google, TikTok', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                    { icon: Rocket, label: 'AI Chatbot', desc: 'Custom trained, always on', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                    { icon: Star, label: 'Brand Identity', desc: 'Logo, colours, content system', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className={`flex items-center gap-3 rounded-xl border p-3 ${item.bg}`}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/20 flex-shrink-0">
                          <Icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-200">{item.label}</p>
                          <p className="text-[10px] text-gray-500">{item.desc}</p>
                        </div>
                        <CheckCircle className="h-4 w-4 text-emerald-500/60 ml-auto flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 pt-4 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-500">Limited spots per quarter. Application required.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.02]" id="packages">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-16">
            <SectionHeader
              badge="Packages"
              title="Choose Your"
              titleGradient="System Level"
              subtitle="Three complete implementation packages — each one a fully integrated business system, not just a website."
            />
          </RevealSection>

          <StaggerContainer className="grid gap-8 lg:grid-cols-3">
            {packages.map((pkg) => {
              const colors = planColors[pkg.color];
              const Icon = pkg.icon;
              return (
                <StaggerItem key={pkg.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-2xl flex flex-col glass h-full ${colors.border} ${colors.glow} ${pkg.highlighted ? 'lg:scale-105 lg:-my-4' : ''}`}
                  >
                    {pkg.highlighted && (
                      <>
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-2xl"
                          animate={{ opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.16) 0%, transparent 65%)' }}
                        />
                      </>
                    )}
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-5">
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${pkg.badgeClass}`}>
                          {pkg.badge}
                        </span>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors.iconBg}`}>
                          <Icon className="h-5 w-5 text-current" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{pkg.tagline}</p>

                      <div className="mb-6">
                        <div className="text-4xl font-bold text-white">{pkg.price}</div>
                        <p className="text-xs text-gray-600 mt-1">{pkg.priceNote}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {pkg.timeline}
                        </div>
                      </div>

                      <div className="mb-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Technical Deliverables</p>
                        <ul className="space-y-2">
                          {pkg.technical.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`rounded-xl p-4 mb-6 ${pkg.highlighted ? 'bg-blue-500/8 border border-blue-500/20' : 'bg-white/[0.03] border border-white/8'}`}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Business Outcomes</p>
                        <ul className="space-y-1.5">
                          {pkg.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2 text-sm text-gray-400">
                              <TrendingUp className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-blue-400' : 'text-emerald-400/60'}`} />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href="/contact" className="mt-auto">
                        <Button className={`w-full font-semibold transition-all duration-300 ${colors.button}`}>
                          Apply for Private Build
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <RevealSection className="mt-8 text-center">
            <p className="text-xs text-gray-600">Selective intake. Application required. Limited spots per quarter.</p>
          </RevealSection>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge="Process" title="From Application" titleGradient="to Launch" subtitle="A structured, transparent process — so you always know exactly where your project stands." />
          </RevealSection>
          <StaggerContainer className="grid gap-6 md:grid-cols-5">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="text-center">
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl glass border-blue-500/20 mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust & Proof */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '150+', label: 'Systems Delivered' },
              { icon: Star, value: '4.9/5', label: 'Client Satisfaction' },
              { icon: Clock, value: '14–30d', label: 'Average Build Time' },
              { icon: Lock, value: 'Fixed', label: 'Price Guarantee' },
            ].map((stat) => {
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

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader badge="FAQ" title="Common" titleGradient="Questions" />
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

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_100px_rgba(59,130,246,0.18)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <Rocket className="mx-auto h-12 w-12 text-blue-400 mb-6" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                Ready to Get It Built?
              </h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                Apply now — we'll review your application and reach out within 24 hours to schedule a discovery call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Apply for Private Build
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                    Or try the SaaS platform
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-gray-600 mt-5">Selective intake. Limited spots per quarter. No obligation to apply.</p>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
