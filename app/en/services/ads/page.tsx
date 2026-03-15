'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { ChartBar as BarChart3, Target, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-rose-500/20 shadow-[0_0_60px_rgba(244,63,94,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-5">Campaign Performance</p>
    <div className="grid grid-cols-2 gap-4 mb-5">
      {[
        { label: 'Impressions', value: '48,200', change: '+12%', up: true },
        { label: 'Clicks', value: '1,840', change: '+28%', up: true },
        { label: 'Cost Per Lead', value: '€6.40', change: '-18%', up: false },
        { label: 'ROAS', value: '4.2x', change: '+0.8x', up: true },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-3 border-white/10">
          <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] font-semibold mt-0.5 text-emerald-400">{stat.change} this month</div>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Top Performing Ads</div>
      {[
        { name: 'Video Ad — Before/After', spend: '€320', leads: '48', cpl: '€6.67' },
        { name: 'Carousel — Services', spend: '€280', leads: '42', cpl: '€6.67' },
        { name: 'Static — Offer CTA', spend: '€200', leads: '34', cpl: '€5.88' },
      ].map((ad) => (
        <div key={ad.name} className="flex items-center justify-between text-xs">
          <span className="text-gray-400 truncate flex-1">{ad.name}</span>
          <div className="flex gap-4 text-gray-500">
            <span>{ad.spend}</span>
            <span className="text-emerald-400">{ad.leads} leads</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function AdsEnPage() {
  return (
    <ServicePageLayout
      lang="en"
      badge="Ads & Performance Marketing"
      heroTitle="Every Euro Spent"
      heroGradient="Tracked & Optimised."
      heroSubtitle="We build and manage data-driven paid campaigns on Meta and Google that generate consistent, qualified leads with a measurable return on every euro spent."
      heroImage={heroImage}
      whyTitle="Why Performance Marketing Changes Everything"
      whyItems={[
        { icon: Target, title: 'Predictable Lead Flow', desc: 'Stop relying on referrals and word-of-mouth. Paid ads give you a reliable, scalable lead generation system.' },
        { icon: BarChart3, title: 'Full Attribution', desc: 'Know exactly which ad, audience, and creative drives revenue — not just clicks.' },
        { icon: TrendingUp, title: 'Compounding Results', desc: 'The longer we run and optimise your campaigns, the lower your cost per lead and the higher your return.' },
        { icon: Zap, title: 'Fast Results', desc: 'Unlike SEO, paid ads can generate leads within 48 hours of going live.' },
      ]}
      beforeAfter={[
        { before: 'No consistent source of new leads', after: 'Predictable, daily lead flow from paid campaigns' },
        { before: 'Ad budget wasted on the wrong audiences', after: 'Laser-targeted ads reaching your ideal customers' },
        { before: 'No idea which ads generate revenue', after: 'Full attribution tracking from ad to sale' },
        { before: 'Campaigns set up and forgotten', after: 'Weekly optimisation to improve every metric' },
      ]}
      deliverables={[
        {
          category: 'Campaign Strategy',
          items: ['Audience research & competitor analysis', 'Full-funnel campaign architecture', 'Budget allocation strategy', 'Platform selection (Meta, Google, TikTok)'],
        },
        {
          category: 'Ad Creatives',
          items: ['Ad copy for 5+ creatives per campaign', 'Image ad specifications & guidelines', 'Video ad script writing', 'A/B test variant planning'],
        },
        {
          category: 'Meta Ads',
          items: ['Facebook & Instagram campaign setup', 'Custom audience & lookalike creation', 'Retargeting campaign setup', 'Lead form or landing page campaigns'],
        },
        {
          category: 'Google Ads',
          items: ['Search campaign setup', 'Keyword research & negative list', 'Display & remarketing campaigns', 'Google Business Profile optimisation'],
        },
        {
          category: 'Tracking & Analytics',
          items: ['Meta Pixel & Conversion API setup', 'Google Tag Manager configuration', 'GA4 goals & event tracking', 'Monthly performance reporting'],
        },
        {
          category: 'Ongoing Management',
          items: ['Weekly bid & budget optimisation', 'Creative refresh every 3–4 weeks', 'Audience expansion testing', 'Monthly strategy review call'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Local awareness + event promotion campaigns driving table reservations and private dining bookings.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Lead generation campaigns targeting homeowners and landlords with direct quote requests.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Before/after carousel ads and new client offer campaigns targeting local audiences on Instagram.' },
        { industry: 'Clinics', icon: '🏥', example: 'Condition-specific search campaigns capturing high-intent patients researching treatment options.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Full-funnel campaigns: awareness on Meta, retargeting for cart abandoners, loyalty campaigns for repeat buyers.' },
      ]}
      process={[
        { step: '01', title: 'Audit & Strategy', desc: 'We audit your existing assets, research your market, and create a full paid media strategy.' },
        { step: '02', title: 'Setup', desc: 'We build every campaign, audience, and tracking configuration from scratch — the right way.' },
        { step: '03', title: 'Launch', desc: 'Campaigns go live with a test budget to gather initial data within the first 7 days.' },
        { step: '04', title: 'Optimise', desc: 'Weekly optimisations: cut losing ads, scale winners, test new creatives continuously.' },
        { step: '05', title: 'Scale', desc: 'Once we find winning formulas, we systematically scale budget while maintaining cost per lead.' },
      ]}
      packages={[
        {
          name: 'Ads Starter',
          price: 'from €1,500/mo',
          timeline: 'Launch in 5 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Meta OR Google campaign setup',
            'Up to 3 ad sets',
            'Ad copy for 5 creatives',
            'Pixel + basic tracking setup',
            'Monthly performance report',
          ],
        },
        {
          name: 'Ads Growth',
          price: 'from €2,500/mo',
          timeline: 'Launch in 5 days',
          badge: 'Most Popular',
          badgeClass: 'bg-rose-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Meta + Google campaigns',
            'Retargeting campaigns',
            'Full conversion tracking (Pixel + GA4)',
            'Weekly optimisation',
            'Ad creative A/B testing',
            'Monthly strategy call',
          ],
        },
        {
          name: 'Ads Scale',
          price: 'from €4,500/mo',
          timeline: 'Launch in 7 days',
          badge: 'Full Management',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Everything in Growth',
            'Meta + Google + TikTok',
            'Full creative production guidance',
            'Lookalike audience scaling',
            'Full attribution modelling',
            'Dedicated account manager',
            'Bi-weekly strategy calls',
          ],
        },
      ]}
      faqs={[
        { q: 'What ad spend budget do I need separately?', a: "Ad spend (the budget you give to Meta/Google) is separate from our management fee. We recommend a minimum of €500/month ad spend for Starter, €1,500+ for Growth, and €3,000+ for Scale packages." },
        { q: 'How quickly will I see results?', a: 'Most clients see their first leads within 48–72 hours of going live. Optimal results typically come after 30–60 days as the algorithm learns and we optimise based on data.' },
        { q: 'Do you create the ad images and videos?', a: "We write all ad copy and creative briefs. For images and videos, we work with your existing assets or guide you on what to shoot. Full creative production is available as an add-on." },
        { q: 'Can you take over existing campaigns?', a: "Yes. We'll audit your existing campaigns, fix structural issues, and improve performance — typically within the first 30 days." },
        { q: 'Is there a minimum contract length?', a: 'We recommend a minimum 3-month commitment to allow for proper optimisation cycles. Month-to-month options are available on the Starter plan.' },
      ]}
      relatedServices={[
        { href: '/en/services/funnels', label: 'Website + Funnel Build' },
        { href: '/en/services/automation', label: 'Automation Systems' },
        { href: '/en/services/crm-email', label: 'CRM + Email Sequences' },
        { href: '/en/services/branding', label: 'Brand Identity' },
      ]}
    />
  );
}
