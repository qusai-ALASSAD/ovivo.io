'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { AutomationFlowSection } from '@/components/automation-flow-section';
import { crmFlowSteps, crmFlowCards, crmFlowText } from '@/components/service-flows';
import { Mail, Users, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5">CRM Pipeline</p>
    <div className="flex gap-3 overflow-x-auto pb-2">
      {[
        { stage: 'New Lead', count: 24, color: 'border-blue-500/30 bg-blue-500/10', tag: 'text-blue-400' },
        { stage: 'Contacted', count: 18, color: 'border-cyan-500/30 bg-cyan-500/10', tag: 'text-cyan-400' },
        { stage: 'Proposal', count: 9, color: 'border-orange-500/30 bg-orange-500/10', tag: 'text-orange-400' },
        { stage: 'Closed', count: 6, color: 'border-emerald-500/30 bg-emerald-500/10', tag: 'text-emerald-400' },
      ].map((col) => (
        <div key={col.stage} className={`flex-shrink-0 w-24 rounded-xl border p-3 ${col.color}`}>
          <p className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${col.tag}`}>{col.stage}</p>
          <div className="text-2xl font-bold text-white mb-1">{col.count}</div>
          <div className="space-y-1.5">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-5 space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Active Email Sequences</div>
      {[
        { name: 'Welcome Sequence', active: 47, step: 'Step 2/5' },
        { name: 'Re-engagement Flow', active: 23, step: 'Step 1/3' },
        { name: 'Post-Purchase Upsell', active: 12, step: 'Step 3/4' },
      ].map((seq) => (
        <div key={seq.name} className="flex items-center justify-between text-xs glass rounded-lg px-3 py-2 border-white/10">
          <span className="text-gray-300">{seq.name}</span>
          <div className="flex gap-3 text-gray-500">
            <span className="text-cyan-400">{seq.active} contacts</span>
            <span>{seq.step}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function CrmEmailPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="CRM Setup + Email Sequences"
      heroTitle="Every Lead Nurtured."
      heroGradient="Every Sale Tracked."
      heroSubtitle="We set up your CRM from scratch and build email automation sequences that guide every lead from first contact to paying customer — completely on autopilot."
      heroImage={heroImage}
      whyTitle="Why a CRM + Email System is Non-Negotiable"
      whyItems={[
        { icon: Users, title: 'Never Lose a Lead', desc: 'Every contact is stored, tracked, and followed up automatically — nothing falls through the cracks.' },
        { icon: Mail, title: 'Revenue on Autopilot', desc: 'Email sequences generate revenue 24/7 by nurturing leads through your pipeline without manual effort.' },
        { icon: TrendingUp, title: 'Data-Driven Decisions', desc: 'See exactly where deals stall, which emails convert, and what\'s driving revenue.' },
        { icon: Zap, title: 'Scale Without Hiring', desc: 'A properly configured CRM lets one person do the work of five — by automating repetitive relationship tasks.' },
      ]}
      beforeAfter={[
        { before: 'Leads stored in spreadsheets and sticky notes', after: 'Every contact organised in a structured, searchable CRM' },
        { before: 'Manual follow-ups that never happen', after: 'Automated sequences follow up on every lead consistently' },
        { before: 'No idea where leads are in the pipeline', after: 'Visual pipeline showing every deal and its status' },
        { before: 'Email newsletters with no automation', after: 'Smart sequences triggered by behaviour and timing' },
      ]}
      deliverables={[
        {
          category: 'CRM Setup',
          items: ['Platform selection & account setup', 'Custom pipeline configuration', 'Contact property & tag structure', 'Lead source tracking setup', 'Team access & permissions'],
        },
        {
          category: 'Email Sequences',
          items: ['Welcome sequence (5 emails)', 'Lead nurture flow (7 emails)', 'Re-engagement campaign (3 emails)', 'Post-purchase upsell sequence', 'Professional email copy for every step'],
        },
        {
          category: 'Automations',
          items: ['Lead capture to CRM automation', 'Pipeline stage triggers', 'Task & reminder automation', 'Deal won/lost workflows', 'Notification setup for hot leads'],
        },
        {
          category: 'Integrations',
          items: ['Website form integration', 'Landing page / funnel sync', 'Calendar booking integration', 'Social media lead form sync'],
        },
        {
          category: 'Templates & Design',
          items: ['On-brand email template design', 'Signature template', 'Newsletter template', 'Promotional email template'],
        },
        {
          category: 'Training & Support',
          items: ['Team training sessions', 'Video walkthrough library', 'Usage guide documentation', '30–90 days post-launch support'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'CRM for event enquiries with follow-up sequences, loyalty campaigns, and re-booking emails after each visit.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Quote pipeline from enquiry to closed, with automated follow-up for prospects who didn\'t respond.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Client database with rebooking sequences, birthday promotions, and loyalty tier automation.' },
        { industry: 'Clinics', icon: '🏥', example: 'Patient pipeline from consultation request to treatment, with automated appointment reminders and aftercare sequences.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Customer lifecycle sequences: welcome → first purchase → repeat buyer → VIP tier, all automated.' },
      ]}
      process={[
        { step: '01', title: 'Audit', desc: 'We review your current contact database, tools, and workflows to plan the migration.' },
        { step: '02', title: 'Architecture', desc: 'We design your pipeline, contact structure, and automation logic before building anything.' },
        { step: '03', title: 'Build', desc: 'CRM setup, sequence writing, and all automation connections built and tested.' },
        { step: '04', title: 'Migrate', desc: 'We import your existing contacts cleanly and ensure all data is accurate and tagged correctly.' },
        { step: '05', title: 'Launch & Train', desc: 'Go live with full team training and a 30-day check-in to optimise based on real data.' },
      ]}
      packages={[
        {
          name: 'CRM Starter',
          price: 'from €1,000',
          timeline: 'Delivery in 7 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'CRM platform setup & configuration',
            '3-stage pipeline setup',
            'Welcome email sequence (3 emails)',
            'Form to CRM integration',
            '30-day support',
          ],
        },
        {
          name: 'CRM Growth',
          price: 'from €2,200',
          timeline: 'Delivery in 10 days',
          badge: 'Most Popular',
          badgeClass: 'bg-cyan-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Full pipeline with 5+ stages',
            'Welcome + nurture sequences (12 emails)',
            'Re-engagement campaign',
            'Post-purchase upsell flow',
            'On-brand email template design',
            '60-day support & optimisation',
          ],
        },
        {
          name: 'CRM Scale',
          price: 'from €4,000',
          timeline: 'Delivery in 14 days',
          badge: 'Full System',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Everything in Growth',
            'Full marketing automation stack',
            'Advanced segmentation & scoring',
            'Multi-pipeline setup',
            'Team training & documentation',
            'Contact migration from existing CRM',
            '90-day dedicated support',
          ],
        },
      ]}
      faqs={[
        { q: 'Which CRM platform do you set up?', a: 'We work with GoHighLevel, HubSpot, ActiveCampaign, Klaviyo, and Pipedrive. We recommend the best fit based on your budget and business type.' },
        { q: 'Do you migrate our existing contacts?', a: 'Yes. All packages include contact migration from spreadsheets, Mailchimp, or other CRMs. We clean and tag your data as part of the process.' },
        { q: 'Do you write the emails?', a: 'Absolutely. We write all email copy in your brand voice — welcome sequences, nurture flows, re-engagement campaigns, and everything in between.' },
        { q: 'How long before our first email sequence is live?', a: 'Starter systems are live within 7 days. Full Growth and Scale systems are live within 10–14 days.' },
        { q: 'What email open rates can we expect?', a: 'With a properly warmed sender domain and relevant content, our clients typically see 35–55% open rates — well above the industry average of 20%.' },
      ]}
      relatedServices={[
        { href: '/services/automation', label: 'Automation Systems' },
        { href: '/services/ai-chatbot', label: 'AI Chatbot' },
        { href: '/services/funnels', label: 'Website + Funnel Build' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
      ]}
      extraSection={
        <AutomationFlowSection
          lang="de"
          customSteps={crmFlowSteps}
          customCards={crmFlowCards}
          customText={crmFlowText}
        />
      }
    />
  );
}
