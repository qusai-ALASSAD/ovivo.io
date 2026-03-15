'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Bot, Clock, MessageSquare, TrendingUp, Shield } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-5">AI Chatbot — Live Preview</p>
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          Hi! I'm your AI assistant. I can help with bookings, questions, and pricing. What brings you in today?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl rounded-tr-none p-3 text-xs text-gray-200 max-w-[80%]">
          I'd like to book a consultation
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          <span className="text-emerald-400 font-semibold">Great choice!</span> I have availability this week:
          <div className="mt-2 space-y-1.5">
            {['Tue 14 Jan — 10:00am', 'Wed 15 Jan — 2:00pm', 'Thu 16 Jan — 11:00am'].map((slot) => (
              <button key={slot} className="block w-full text-left text-[11px] bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-600">
      <span>Powered by Ovivo AI</span>
      <span className="flex items-center gap-1.5 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Online 24/7</span>
    </div>
  </div>
);

export default function AIChatbotPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="AI Chatbot for Business"
      heroTitle="Your Business,"
      heroGradient="Always Available."
      heroSubtitle="A custom-trained AI assistant that answers questions, qualifies leads, and books appointments on your behalf — 24 hours a day, 7 days a week."
      heroImage={heroImage}
      whyTitle="Why Every Business Needs an AI Chatbot"
      whyItems={[
        { icon: Clock, title: '24/7 Availability', desc: 'Never miss an inquiry again. Your AI handles customers at 3am just as well as 3pm.' },
        { icon: MessageSquare, title: 'Instant Responses', desc: '90% of customers expect a reply within 10 minutes. Your AI responds in seconds.' },
        { icon: TrendingUp, title: 'Qualified Leads Only', desc: 'The AI asks smart questions and filters out time-wasters before they reach your calendar.' },
        { icon: Shield, title: 'Consistent Quality', desc: 'Every conversation follows your exact tone, rules, and processes — every single time.' },
      ]}
      beforeAfter={[
        { before: 'Leads wait hours for a reply and go to competitors', after: 'Instant responses keep leads engaged and moving forward' },
        { before: 'Staff spend hours answering the same basic questions', after: 'AI handles FAQs automatically, freeing your team completely' },
        { before: 'Missed inquiries outside business hours', after: 'Every inquiry captured and qualified 24/7' },
        { before: 'Inconsistent answers depending on who responds', after: 'Perfect, on-brand responses every single time' },
      ]}
      deliverables={[
        {
          category: 'Chatbot Setup',
          items: ['Custom AI personality & tone of voice', 'Training on your products, services & FAQs', 'Multi-platform deployment (website, Instagram, WhatsApp)', 'Conversation flow design'],
        },
        {
          category: 'Lead Qualification',
          items: ['Smart qualification questions', 'Lead scoring & categorisation', 'Hot lead alerts to your phone/email', 'CRM auto-capture integration'],
        },
        {
          category: 'Booking Integration',
          items: ['Calendar sync (Google, Calendly, etc.)', 'Auto-booking flow in conversation', 'Confirmation & reminder messages', 'Rescheduling & cancellation handling'],
        },
        {
          category: 'Knowledge Base',
          items: ['Trained on your pricing & packages', 'Location, hours & contact info', 'Common objection handling', 'Custom escalation to human agent'],
        },
        {
          category: 'Analytics',
          items: ['Conversation volume dashboard', 'Lead qualification rate tracking', 'Booking conversion reporting', 'Monthly AI performance review'],
        },
        {
          category: 'Ongoing Support',
          items: ['AI retraining as your business evolves', 'Monthly conversation review', 'A/B testing different flows', '30–90 days support included'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Answer reservation questions, collect booking details, and send confirmation — all without staff involvement.' },
        { industry: 'Cleaning Companies', icon: '🧹', example: 'Qualify leads with address, frequency, and budget questions before passing to a human for final quote.' },
        { industry: 'Hair Salons', icon: '✂️', example: 'Handle service inquiries, show availability, and book appointments directly in conversation.' },
        { industry: 'Clinics', icon: '🏥', example: 'Answer common patient questions, collect intake information, and schedule appointments automatically.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Handle order queries, returns, product questions, and upsell recommendations in real time.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'We document your FAQs, services, pricing, and how you want the AI to represent your brand.' },
        { step: '02', title: 'Training', desc: 'We train the AI on all your content, set rules, and design every conversation flow.' },
        { step: '03', title: 'Integration', desc: 'We deploy the chatbot on your website, social media, and messaging platforms.' },
        { step: '04', title: 'Testing', desc: 'We run 50+ test conversations to ensure the AI handles every scenario correctly.' },
        { step: '05', title: 'Optimise', desc: 'Monthly review of conversations to improve responses, add new knowledge, and increase conversion.' },
      ]}
      packages={[
        {
          name: 'AI Chatbot Starter',
          price: 'from €1,200',
          timeline: 'Delivery in 7 days',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Website chatbot deployment',
            'FAQ training (up to 30 questions)',
            'Lead capture to email/CRM',
            'Basic booking flow',
            '30-day support',
          ],
        },
        {
          name: 'AI Chatbot Growth',
          price: 'from €2,500',
          timeline: 'Delivery in 10 days',
          badge: 'Most Popular',
          badgeClass: 'bg-emerald-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Everything in Starter',
            'Multi-platform (website + Instagram + WhatsApp)',
            'Advanced lead qualification flows',
            'Full calendar booking integration',
            'Hot lead instant notifications',
            'Conversation analytics dashboard',
            '60-day support & retraining',
          ],
        },
        {
          name: 'AI Chatbot Scale',
          price: 'from €4,500',
          timeline: 'Delivery in 14 days',
          badge: 'Full System',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'Everything in Growth',
            'Unlimited FAQ training',
            'Custom AI personality & voice',
            'Multi-language support',
            'CRM + automation integration',
            'Monthly AI performance review',
            '90-day dedicated support',
          ],
        },
      ]}
      faqs={[
        { q: 'Which platforms can the chatbot be deployed on?', a: 'We deploy on your website, Instagram DMs, WhatsApp Business, Facebook Messenger, and more depending on your package.' },
        { q: 'How accurate is the AI?', a: 'After training, our chatbots handle 85–95% of inquiries correctly. For edge cases, we build in a seamless handoff to a human agent.' },
        { q: 'Can the chatbot book appointments directly?', a: 'Yes. We integrate with Google Calendar, Calendly, and most booking platforms so the AI can confirm and book appointments without human involvement.' },
        { q: 'What language does it speak?', a: 'The AI can be trained in any language. Multi-language support (e.g., German + English) is available on the Scale package.' },
        { q: 'How long does setup take?', a: 'Starter systems are live within 7 days. Full multi-platform deployments take 10–14 days including all testing.' },
      ]}
      relatedServices={[
        { href: '/services/automation', label: 'Automation Systems' },
        { href: '/services/crm-email', label: 'CRM + Email Sequences' },
        { href: '/services/funnels', label: 'Website + Funnel Build' },
      ]}
    />
  );
}
