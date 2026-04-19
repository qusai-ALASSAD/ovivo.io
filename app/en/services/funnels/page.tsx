'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Globe, Target, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl overflow-hidden border-orange-500/20 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
    <div className="bg-white/[0.03] border-b border-white/10 px-5 py-3 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="flex-1 mx-3 h-5 rounded-full bg-white/5 border border-white/10 flex items-center px-3">
        <span className="text-[10px] text-gray-600">yoursite.com</span>
      </div>
    </div>
    <div className="p-5 space-y-4">
      {[
        { label: 'Landing Page', visitors: '2,400', pct: 100, color: 'bg-orange-500' },
        { label: 'Lead Capture', visitors: '960', pct: 40, color: 'bg-blue-500' },
        { label: 'Booking Page', visitors: '384', pct: 16, color: 'bg-emerald-500' },
        { label: 'Confirmed Clients', visitors: '115', pct: 5, color: 'bg-amber-500' },
      ].map((stage) => (
        <div key={stage.label}>
          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
            <span className="font-semibold">{stage.label}</span>
            <span>{stage.visitors} visitors</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="pt-2 grid grid-cols-3 gap-3">
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-white">4.8%</div>
          <div className="text-[10px] text-gray-500">Conv. Rate</div>
        </div>
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-orange-400">€38</div>
          <div className="text-[10px] text-gray-500">Cost/Lead</div>
        </div>
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-emerald-400">€12k</div>
          <div className="text-[10px] text-gray-500">Revenue</div>
        </div>
      </div>
    </div>
  </div>
);

export default function FunnelsEnPage() {
  return (
    <ServicePageLayout
      lang="en"
      badge="Website + Funnel Build"
      heroTitle="A Website That"
      heroGradient="Actually Converts."
      heroSubtitle="We build full conversion systems — landing pages, sales funnels, and booking flows that turn visitors into paying customers."
      heroImage={heroImage}
      whyTitle="Why Most Websites Fail — and How We Fix It"
      whyItems={[
        { icon: Globe, title: 'Built to Convert', desc: 'Every page element is designed with one goal: turning visitors into leads and leads into clients.' },
        { icon: Target, title: 'Funnel-First Thinking', desc: 'We map the full customer journey before writing a single line of code.' },
        { icon: TrendingUp, title: 'Trackable ROI', desc: 'Full analytics setup so you know exactly which pages and traffic sources generate revenue.' },
        { icon: Zap, title: '14-Day Delivery', desc: 'From briefing to live website in 14 days — without compromising on quality.' },
      ]}
      beforeAfter={[
        { before: 'Generic website with no clear call to action', after: 'Conversion-optimised site with clear user journey' },
        { before: 'No way to track which visitors become clients', after: 'Full analytics & attribution tracking installed' },
        { before: 'Visitors leave without leaving contact details', after: 'Lead capture on every page with automated follow-up' },
        { before: 'Slow, unresponsive site losing mobile traffic', after: 'Lightning-fast, mobile-first design' },
      ]}
      deliverables={[
        {
          category: 'Website',
          items: ['Up to 8 custom pages', 'Mobile-first responsive design', 'SEO foundation (meta, schema, sitemap)', 'Contact forms + lead capture', 'Google Analytics 4 setup', 'Page speed optimisation'],
        },
        {
          category: 'Sales Funnels',
          items: ['3 high-converting landing pages', 'Lead magnet page + thank-you flow', 'Sales page with VSL placeholder', 'Checkout page integration (Stripe)', 'Upsell / downsell flows'],
        },
        {
          category: 'Conversion Elements',
          items: ['Headline & copy writing', 'Social proof sections', 'FAQ + objection handling sections', 'CTA button optimisation', 'A/B test framework setup'],
        },
        {
          category: 'Lead Capture',
          items: ['Email opt-in forms', 'Pop-up & exit-intent triggers', 'Lead magnet delivery automation', 'CRM integration (contact capture)'],
        },
        {
          category: 'Technical',
          items: ['Domain + hosting setup', 'SSL certificate', 'CDN configuration', 'Core Web Vitals optimisation', 'Cookie consent & GDPR compliance'],
        },
        {
          category: 'Post-Launch',
          items: ['30-day bug-fix guarantee', 'Full training on how to update content', 'Video walkthrough documentation', 'Heatmap tool installation (Hotjar)'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Table booking funnel, event enquiry page, and loyalty sign-up landing page.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Instant quote funnel capturing address, size, and service type — then booking directly.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Service menu pages, before/after gallery, online booking funnel, and loyalty programme sign-up.' },
        { industry: 'Clinics', icon: '🏥', example: 'Condition-specific landing pages, consultation booking funnel, and patient intake forms.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Product launch pages, bundle funnels, and post-purchase upsell flows.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'We map your audience, goals, and competition to create the right strategy before any design begins.' },
        { step: '02', title: 'Wireframe', desc: 'We present a full wireframe of every page for your approval — no surprises at the end.' },
        { step: '03', title: 'Design & Build', desc: 'Premium design with full functionality — forms, automations, payments, and CRM all connected.' },
        { step: '04', title: 'Test & Launch', desc: 'We test on all devices and browsers, then launch with monitoring tools active from day one.' },
        { step: '05', title: 'Optimise', desc: 'We review heatmaps and analytics in the first 30 days and make data-driven improvements.' },
      ]}
      packages={[
        {
          name: 'Funnel Starter',
          price: 'from €2,000',
          timeline: 'Delivery in 10 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            '5-page conversion website',
            '1 sales funnel (3 pages)',
            'Lead capture + CRM integration',
            'Google Analytics setup',
            '30-day support',
          ],
        },
        {
          name: 'Funnel Growth',
          price: 'from €4,000',
          timeline: 'Delivery in 14 days',
          badge: 'Most Popular',
          badgeClass: 'bg-orange-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Up to 8 pages + 3 funnels',
            'Email automation integration',
            'Stripe payment setup',
            'Exit-intent & pop-up capture',
            'A/B testing framework',
            '60-day support & CRO',
          ],
        },
        {
          name: 'Funnel Scale',
          price: 'from €7,000',
          timeline: 'Delivery in 14 days',
          badge: 'Full System',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Everything in Growth',
            'Multi-funnel architecture (5+ funnels)',
            'Membership / gated content setup',
            'Advanced CRM + marketing automation',
            'Full SEO foundation',
            'Heatmap & user recording setup',
            '90-day optimisation support',
          ],
        },
      ]}
      faqs={[
        { q: 'What platform do you build on?', a: "We build on the platform that best fits your needs — Next.js, Webflow, WordPress, or ClickFunnels depending on your requirements and budget." },
        { q: 'Do you write the copy for the pages?', a: 'Yes. All packages include professional copywriting for every page. We research your audience and write persuasive, conversion-focused copy.' },
        { q: 'Can I update the content myself after launch?', a: 'Absolutely. We build with content management in mind and provide video tutorials so you can make changes without needing us.' },
        { q: 'Is SEO included?', a: 'All packages include SEO foundation setup — meta tags, schema markup, sitemap, and page speed optimisation. Ongoing SEO campaigns are a separate service.' },
        { q: 'How fast will the website load?', a: 'We optimise every site to score 90+ on Google PageSpeed. Fast load times are non-negotiable for both conversions and SEO.' },
      ]}
      relatedServices={[
        { href: '/en/services/automation', label: 'Automation Systems' },
        { href: '/en/services/ads', label: 'Ads & Performance Marketing' },
        { href: '/en/services/crm-email', label: 'CRM + Email Sequences' },
        { href: '/en/services/branding', label: 'Brand Identity' },
      ]}
    />
  );
}
