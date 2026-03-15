'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Palette, Star, TrendingUp, Users } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">Brand System</p>

    <div className="flex items-center gap-4 mb-6 p-4 bg-white/[0.03] rounded-xl border border-white/10">
      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
        A
      </div>
      <div>
        <div className="text-base font-bold text-white">Aria Salon</div>
        <div className="text-xs text-gray-500 mt-0.5">Premium Hair & Beauty Studio</div>
        <div className="flex gap-1 mt-2">
          {['#1E40AF', '#3B82F6', '#BFDBFE', '#0F172A', '#F8FAFC'].map((color) => (
            <div key={color} className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Typography</p>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Playfair Display</div>
        <div className="text-sm text-gray-400">Inter — for body text & UI</div>
      </div>
    </div>

    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Content Calendar — Week 1</p>
      <div className="space-y-2">
        {[
          { day: 'Mon', type: 'Before/After', platform: 'IG' },
          { day: 'Wed', type: 'Team Spotlight', platform: 'FB + IG' },
          { day: 'Fri', type: 'Weekend Offer', platform: 'Stories' },
        ].map((post) => (
          <div key={post.day} className="flex items-center gap-3 text-xs glass rounded-lg px-3 py-2 border-white/10">
            <span className="w-8 text-amber-400 font-bold">{post.day}</span>
            <span className="flex-1 text-gray-300">{post.type}</span>
            <span className="text-gray-600">{post.platform}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function BrandingPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Brand Identity + Social Content"
      heroTitle="Look Premium."
      heroGradient="Get Noticed."
      heroSubtitle="We create a complete visual identity and a 30-day content system that positions your brand as the go-to authority in your market — and keeps it that way."
      heroImage={heroImage}
      whyTitle="Why Brand Identity Is Your Most Valuable Asset"
      whyItems={[
        { icon: Palette, title: 'First Impressions Win', desc: 'Customers decide in 0.05 seconds whether to trust your brand. Premium design makes that decision easy.' },
        { icon: TrendingUp, title: 'Premium Positioning = Higher Prices', desc: 'A professional brand commands higher prices and attracts better clients who don\'t haggle.' },
        { icon: Star, title: 'Consistency Builds Trust', desc: 'Consistent branding across all channels increases revenue by up to 23% according to Forbes.' },
        { icon: Users, title: 'Content That Converts', desc: '30 days of pre-planned, on-brand social content that builds your audience and drives inquiries.' },
      ]}
      beforeAfter={[
        { before: 'Inconsistent visuals that look unprofessional', after: 'Cohesive brand identity that commands respect' },
        { before: 'No idea what to post on social media', after: 'Full 30-day content calendar ready to execute' },
        { before: 'Competing on price because brand looks generic', after: 'Premium positioning that justifies higher prices' },
        { before: 'DIY logo that doesn\'t represent the business', after: 'Professional identity that attracts your ideal client' },
      ]}
      deliverables={[
        {
          category: 'Logo & Identity',
          items: ['Primary logo (3 variations)', 'Colour palette (primary + secondary)', 'Typography system (2 fonts)', 'Brand pattern or texture', 'Brand style guide PDF'],
        },
        {
          category: 'Business Assets',
          items: ['Business card design', 'Email signature template', 'Letterhead & invoice template', 'Presentation template', 'Digital banner set'],
        },
        {
          category: 'Social Media',
          items: ['Profile photo & cover design for 3 platforms', 'Story highlight covers (12 icons)', 'Post template designs (5 formats)', 'Bio & caption tone-of-voice guide'],
        },
        {
          category: 'Content Calendar',
          items: ['30-day content plan', 'Caption writing for 30 posts', 'Hashtag strategy per platform', 'Best-time-to-post schedule', 'Content pillar framework'],
        },
        {
          category: 'Photography Direction',
          items: ['Mood board for brand photography', 'Shot list for DIY or professional shoot', 'Editing style guide & presets', 'Image sourcing guide (stock)'],
        },
        {
          category: 'Brand Guidelines',
          items: ['Do\'s and don\'ts document', 'Logo usage rules', 'Brand voice & tone guide', 'Social media posting guidelines'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Premium menu design, food photography direction, and a content calendar featuring dishes, stories, and promotions.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Professional identity that differentiates from competitors, with content showcasing before/after results and team profiles.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Luxury visual identity with before/after content, stylist spotlights, and promotional campaign templates.' },
        { industry: 'Clinics', icon: '🏥', example: 'Trust-building brand identity with patient education content, team introductions, and treatment result posts.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Product photography direction, unboxing content templates, and a 30-day launch content calendar.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'We run a brand discovery session to understand your values, audience, competitors, and positioning goals.' },
        { step: '02', title: 'Concept', desc: 'We present 2 brand direction concepts — moodboard, colour direction, and logo concepts — for your feedback.' },
        { step: '03', title: 'Design', desc: 'Full identity system developed: logo, colours, fonts, templates, and all digital assets.' },
        { step: '04', title: 'Content Plan', desc: '30-day content calendar written, formatted, and delivered with instructions for implementation.' },
        { step: '05', title: 'Handover', desc: 'All files delivered in every format. Full brand guide provided. Training on how to maintain consistency.' },
      ]}
      packages={[
        {
          name: 'Brand Starter',
          price: 'from €1,500',
          timeline: 'Delivery in 10 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Logo design (2 variations)',
            'Brand colour palette & fonts',
            'Brand style guide',
            'Social media profile assets',
            '2-week content calendar',
          ],
        },
        {
          name: 'Brand Growth',
          price: 'from €3,000',
          timeline: 'Delivery in 14 days',
          badge: 'Most Popular',
          badgeClass: 'bg-amber-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Full identity system (all assets)',
            'Business card + stationery',
            'Social media post templates (5)',
            '30-day content calendar',
            'Caption writing for 30 posts',
            'Brand voice guide',
          ],
        },
        {
          name: 'Brand Scale',
          price: 'from €5,500',
          timeline: 'Delivery in 21 days',
          badge: 'Premium',
          badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          deliverables: [
            'Everything in Growth',
            'Photography direction & moodboard',
            'Full presentation template',
            'Packaging design (if applicable)',
            '90-day content calendar',
            'Monthly content creation support',
            'Brand ambassador guidelines',
          ],
        },
      ]}
      faqs={[
        { q: 'How many logo revisions are included?', a: 'All packages include unlimited revisions on the chosen direction. We present 2 concepts and refine your selected one until you\'re completely happy.' },
        { q: 'Do you write the social media captions?', a: 'Yes. The Growth and Scale packages include professionally written captions for every post in your content calendar, aligned with your brand voice.' },
        { q: 'What file formats are delivered?', a: 'You receive all files in AI, EPS, SVG, PDF, PNG, and JPEG formats. Everything is print-ready and web-ready.' },
        { q: 'Can you refresh an existing brand?', a: 'Absolutely. We offer brand refresh services where we modernise your existing identity while keeping the recognition you\'ve built. Prices are similar to new brand builds.' },
        { q: 'Do you also manage social media posting?', a: 'The content calendar gives you everything you need to post yourself. For ongoing social media management (posting + engagement), we offer monthly retainer packages as an add-on.' },
      ]}
      relatedServices={[
        { href: '/services/funnels', label: 'Website + Funnel Build' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
        { href: '/services/crm-email', label: 'CRM + Email Sequences' },
      ]}
    />
  );
}
