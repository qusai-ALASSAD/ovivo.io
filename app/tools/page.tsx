'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Target, Mic, TrendingUp, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';

const tools = [
  {
    href: '/business-plan',
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    title: 'Business Plan Generator',
    desc: 'Create a comprehensive business plan with market analysis, financial projections, and actionable strategies in minutes.',
    features: ['Executive Summary', 'Market Analysis', 'Financial Projections', 'Operations Plan', 'Marketing Strategy'],
    cta: 'Generate Business Plan',
    glow: true,
  },
  {
    href: '/marketing-plan',
    icon: Target,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Marketing Plan Generator',
    desc: 'Get a complete 30-day marketing strategy with content calendar, ad campaigns, and KPIs tailored to your business.',
    features: ['30-Day Content Calendar', 'Social Media Strategy', 'Ad Campaign Plans', 'Funnel Strategy', 'Performance KPIs'],
    cta: 'Generate Marketing Plan',
    glow: false,
  },
  {
    href: '/voice',
    icon: Mic,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: 'Voice Over Generator',
    desc: 'Convert any text into natural-sounding voiceovers for videos, ads, presentations, and more with AI.',
    features: ['Natural AI Voices', 'Multiple Languages', 'Speed Control', 'Commercial License', 'Instant Download'],
    cta: 'Generate Voice Over',
    glow: false,
  },
  {
    href: '#',
    icon: TrendingUp,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10 border-gray-500/20',
    title: 'Funnel Builder',
    desc: 'Build complete sales funnels with landing pages, email sequences, and automation workflows.',
    features: ['Landing Page Builder', 'Email Automation', 'Payment Integration', 'Analytics Dashboard', 'A/B Testing'],
    cta: 'Coming Soon',
    disabled: true,
    glow: false,
  },
];

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <SectionHeader
              badge="AI-Powered Tools"
              title="AI Tools to"
              titleGradient="Accelerate Growth"
              subtitle="Generate professional business plans, marketing strategies, and voiceovers in minutes with AI."
            />
          </RevealSection>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <StaggerItem key={tool.title}>
                  <GlassCard glow={tool.glow} className={`p-8 h-full flex flex-col ${tool.disabled ? 'opacity-60' : ''}`}>
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl border ${tool.bg} mb-6`}>
                      <Icon className={`h-7 w-7 ${tool.color}`} />
                    </div>
                    {tool.disabled && (
                      <span className="inline-flex w-fit mb-3 items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                        Coming Soon
                      </span>
                    )}
                    <h2 className="text-2xl font-bold text-white mb-3">{tool.title}</h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">{tool.desc}</p>
                    <ul className="space-y-2 mb-8 flex-1">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className={`h-1.5 w-1.5 rounded-full ${tool.disabled ? 'bg-gray-600' : 'bg-blue-400'}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {tool.disabled ? (
                      <Button disabled className="w-full bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed">
                        {tool.cta}
                      </Button>
                    ) : (
                      <Link href={tool.href} className="w-full">
                        <Button className={`w-full group ${tool.glow ? 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'} transition-all duration-300`}>
                          {tool.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* AI Chat CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="mx-auto max-w-3xl text-center">
          <RevealSection>
            <MessageSquare className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Or Try AI Chat</h2>
            <p className="text-gray-400 mb-8">
              Have a conversation with Ovivo AI to generate custom plans and strategies
            </p>
            <Link href="/chat">
              <Button size="lg" className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Start AI Chat
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* DFY CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.12)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <Sparkles className="mx-auto h-12 w-12 text-blue-400 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Need Help Implementing?</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                Our Done-For-You service handles everything from planning to full execution in 14 days.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/services">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    View Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
