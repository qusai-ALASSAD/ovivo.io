'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { AutomationFlowSection } from '@/components/automation-flow-section';
import {
  Zap, Clock, Users, TrendingUp, Mail, Calendar, Star,
} from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-8 border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.1)]">
    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">Live Automation Flow</p>
    <div className="space-y-3">
      {[
        { icon: Users, label: 'Lead submits form', status: 'complete', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
        { icon: Zap, label: 'Instantly added to CRM', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Mail, label: 'Welcome email sent', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Calendar, label: 'Booking reminder sent', status: 'active', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
        { icon: Star, label: 'Review request (Day 7)', status: 'pending', color: 'text-gray-500', bg: 'bg-white/5 border-white/10' },
      ].map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-center gap-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border flex-shrink-0 ${step.bg}`}>
              <Icon className={`h-4 w-4 ${step.color}`} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className={`text-sm font-medium ${step.status === 'pending' ? 'text-gray-600' : 'text-gray-200'}`}>{step.label}</span>
              {step.status === 'complete' && <span className="text-[10px] text-emerald-400 font-bold">DONE</span>}
              {step.status === 'active' && <span className="text-[10px] text-orange-400 font-bold animate-pulse">LIVE</span>}
              {step.status === 'pending' && <span className="text-[10px] text-gray-600 font-bold">SOON</span>}
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-white">47</div>
        <div className="text-xs text-gray-500">leads today</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-emerald-400">100%</div>
        <div className="text-xs text-gray-500">followed up</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-blue-400">0</div>
        <div className="text-xs text-gray-500">manual tasks</div>
      </div>
    </div>
  </div>
);

const diagramSection = <AutomationFlowSection lang="en" />;

export default function AutomationPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Automation Systems"
      heroTitle="Stop Doing Tasks."
      heroGradient="Start Scaling."
      heroSubtitle="We build custom automation systems that capture every lead, follow up instantly, and convert prospects into customers — completely on autopilot."
      heroImage={heroImage}
      whyTitle="Why Your Business Needs Automation"
      whyItems={[
        { icon: Clock, title: 'Save 20+ Hours/Week', desc: 'Eliminate repetitive manual tasks and reclaim time for high-value work.' },
        { icon: Users, title: 'Zero Missed Leads', desc: 'Every lead is captured, tagged, and followed up — even at 2am on a Sunday.' },
        { icon: TrendingUp, title: 'Better Customer Experience', desc: 'Instant responses and personalised touchpoints make clients feel valued.' },
        { icon: Mail, title: 'Consistent Follow-Up', desc: 'Multi-step sequences that nurture every lead until they buy or opt out.' },
      ]}
      beforeAfter={[
        { before: 'Leads fall through the cracks', after: 'Every lead is captured and tagged automatically' },
        { before: 'Hours spent on manual follow-ups', after: 'Sequences run 24/7 without human input' },
        { before: 'Inconsistent customer communication', after: 'Every client gets the same premium experience' },
        { before: 'No-shows and forgotten bookings', after: 'Automated reminders reduce no-shows by 60%' },
      ]}
      deliverables={[
        {
          category: 'Lead Capture',
          items: ['Form to CRM integration', 'Lead scoring & tagging', 'Instant notification setup', 'Source tracking & attribution'],
        },
        {
          category: 'Email & Messaging',
          items: ['Welcome email sequence', 'Multi-step nurture flows (5–7 emails)', 'WhatsApp follow-up integration', 'Re-engagement campaigns'],
        },
        {
          category: 'Booking & Scheduling',
          items: ['Calendar integration & automation', 'Appointment confirmation flows', 'Reminder sequences (24h, 1h)', 'No-show follow-up automation'],
        },
        {
          category: 'Post-Sale',
          items: ['Review request automation', 'Upsell/cross-sell triggers', 'Referral request flows', 'Loyalty & re-booking campaigns'],
        },
        {
          category: 'E-Commerce',
          items: ['Abandoned cart recovery', 'Order confirmation sequences', 'Shipping update automation', 'Post-purchase review requests'],
        },
        {
          category: 'Reporting & Monitoring',
          items: ['Automation performance dashboard', 'Open/click rate tracking', 'Conversion funnel reporting', '30-day support & optimisation'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Auto-confirm reservations, send menu links, and request Google reviews after every visit.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Automated quotes, booking confirmations, and recurring appointment reminders.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Appointment reminders, rebooking flows, and loyalty reward triggers after every 5th visit.' },
        { industry: 'Clinics', icon: '🏥', example: 'Patient intake forms, appointment reminders, and post-visit follow-up sequences.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Abandoned cart flows, order updates, review requests, and upsell sequences.' },
      ]}
      process={[
        { step: '01', title: 'Discovery Call', desc: 'We map your current workflow and identify every manual touchpoint we can automate.' },
        { step: '02', title: 'Flow Design', desc: 'We design the full automation architecture and get your sign-off before building.' },
        { step: '03', title: 'Build & Connect', desc: 'We build all flows, connect your tools, and write every email and message.' },
        { step: '04', title: 'Test & Launch', desc: 'We test every trigger, every flow, and every edge case before going live.' },
        { step: '05', title: 'Optimise', desc: 'Monthly check-ins to review open rates, conversion data, and improve performance.' },
      ]}
      packages={[
        {
          name: 'Automation Starter',
          price: 'from €1,500',
          timeline: 'Delivery in 7 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Lead capture to CRM integration',
            '3-step welcome email sequence',
            'Appointment confirmation flow',
            'Basic reminder automation',
            '30-day support',
          ],
        },
        {
          name: 'Automation Growth',
          price: 'from €3,000',
          timeline: 'Delivery in 10 days',
          badge: 'Most Popular',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Multi-channel sequences (email + WhatsApp)',
            '7-step nurture flow',
            'Abandoned cart / re-booking automation',
            'Review request automation',
            'Google Analytics integration',
            '60-day support & optimisation',
          ],
        },
        {
          name: 'Automation Scale',
          price: 'from €5,000',
          timeline: 'Delivery in 14 days',
          badge: 'Full System',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'Everything in Growth',
            'Full funnel automation (10+ flows)',
            'Advanced segmentation & personalisation',
            'CRM pipeline automation',
            'Upsell & referral sequences',
            'Monthly performance reporting',
            '90-day dedicated support',
          ],
        },
      ]}
      faqs={[
        { q: 'What tools do you use for automation?', a: 'We work with Make.com, Zapier, GoHighLevel, Klaviyo, ActiveCampaign, and more — whichever best fits your existing stack and budget.' },
        { q: 'Do I need a CRM to get started?', a: 'No. If you don\'t have a CRM yet, we\'ll recommend and set one up as part of the project. This is included in all packages.' },
        { q: 'Can you automate WhatsApp messages?', a: 'Yes, we integrate with WhatsApp Business API via platforms like Twilio or 360dialog to send automated, personalised messages.' },
        { q: 'How long before the automations go live?', a: 'Starter systems are live within 7 days. Full-scale systems go live within 14 days, with testing and optimisation included.' },
        { q: 'What if something breaks after launch?', a: 'All packages include post-launch support ranging from 30 to 90 days. We monitor, fix, and optimise every automation flow.' },
      ]}
      relatedServices={[
        { href: '/services/crm-email', label: 'CRM + Email Sequences' },
        { href: '/services/ai-chatbot', label: 'AI Chatbot' },
        { href: '/services/funnels', label: 'Website + Funnel Build' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
      ]}
      extraSection={diagramSection}
    />
  );
}
