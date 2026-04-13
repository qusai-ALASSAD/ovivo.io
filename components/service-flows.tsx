'use client';

import { Target, ChartBar as BarChart3, TrendingUp, Zap, RefreshCw, Bot, MessageSquare, Calendar, UserCheck, Star, UserPlus, Mail, ShoppingCart, Bell, Palette, LayoutGrid as Layout, FileText, CircleCheck as CheckCircle, Database, Tag, Send, RotateCcw, Globe, MousePointer, CreditCard, Award, Megaphone, Eye, ArrowUpRight, Filter } from 'lucide-react';
import type { FlowStep, FlowCard, FlowSectionText } from './automation-flow-section';

// ─── ADS ──────────────────────────────────────────────────────────────────────

export const adsFlowText: FlowSectionText = {
  badge: 'Campaign Lifecycle',
  title: 'From Ad Click',
  titleGradient: 'To Paying Customer',
  subtitle: 'Every euro tracked. Every lead captured. Every campaign optimised automatically — so you scale what works and cut what doesn\'t.',
};

export const adsFlowSteps: FlowStep[] = [
  { id: 'audience', icon: Filter, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Audience Targeting', sub: 'Custom & lookalike audiences' },
  { id: 'ad', icon: Megaphone, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Ad Delivered', sub: 'Meta / Google / TikTok' },
  { id: 'click', icon: MousePointer, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Click → Landing Page', sub: 'Optimised funnel page' },
  { id: 'lead', icon: UserPlus, color: '#f59e0b', glow: 'rgba(245,158,11,0.35)', label: 'Lead Captured', sub: 'Form or direct call' },
  { id: 'crm', icon: Database, color: '#ec4899', glow: 'rgba(236,72,153,0.35)', label: 'CRM + Follow-Up', sub: 'Auto-tagged & nurtured' },
  { id: 'optimise', icon: TrendingUp, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Campaign Optimised', sub: 'Weekly bid & creative refresh' },
];

export const adsFlowCards: FlowCard[] = [
  { id: 'roas', icon: ArrowUpRight, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'ROAS Tracking', desc: 'Know exactly which ad, audience, and creative drives revenue — down to the last cent.' },
  { id: 'retarget', icon: Eye, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Retargeting Campaigns', desc: 'Automatically re-engage visitors who didn\'t convert with tailored follow-up ads.' },
  { id: 'ab', icon: RefreshCw, color: '#ec4899', bg: 'bg-pink-500/10 border-pink-500/20', title: 'A/B Test Automation', desc: 'Creatives rotate automatically. Winners scale. Losers stop. No manual work needed.' },
  { id: 'report', icon: BarChart3, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Auto Reporting', desc: 'Weekly performance reports land in your inbox — no dashboards to check manually.' },
];

// ─── AI CHATBOT ───────────────────────────────────────────────────────────────

export const chatbotFlowText: FlowSectionText = {
  badge: 'Chatbot Conversation Flow',
  title: 'Visitor Arrives.',
  titleGradient: 'Chatbot Converts.',
  subtitle: 'Your AI assistant qualifies, answers, and books — 24/7, without a single human involved.',
};

export const chatbotFlowSteps: FlowStep[] = [
  { id: 'visit', icon: Globe, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Visitor Lands', sub: 'Website, ad, or link' },
  { id: 'greet', icon: Bot, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Bot Greets', sub: 'Instant personalised message' },
  { id: 'qualify', icon: UserCheck, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Lead Qualified', sub: 'Budget, need, timeline' },
  { id: 'answer', icon: MessageSquare, color: '#f59e0b', glow: 'rgba(245,158,11,0.35)', label: 'FAQs Answered', sub: 'Pricing, availability, services' },
  { id: 'book', icon: Calendar, color: '#ec4899', glow: 'rgba(236,72,153,0.35)', label: 'Booking Offered', sub: 'Calendar slot selected' },
  { id: 'crm', icon: Zap, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'CRM Updated', sub: 'Lead saved & follow-up triggered' },
];

export const chatbotFlowCards: FlowCard[] = [
  { id: 'qualify', icon: UserCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Lead Qualification', desc: 'The bot asks the right questions to score and segment every visitor before they talk to anyone.' },
  { id: '247', icon: Bell, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: '24/7 Availability', desc: 'Midnight, weekend, holiday — your bot never sleeps, never misses a lead.' },
  { id: 'faq', icon: MessageSquare, color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Instant FAQ Handling', desc: 'Prices, availability, policies — answered in seconds without any human involvement.' },
  { id: 'handoff', icon: UserPlus, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Seamless Handoff', desc: 'When needed, the bot escalates to your team with full conversation context included.' },
];

// ─── CRM + EMAIL ──────────────────────────────────────────────────────────────

export const crmFlowText: FlowSectionText = {
  badge: 'Lead Nurturing Pipeline',
  title: 'Every Lead Nurtured.',
  titleGradient: 'Every Sale Tracked.',
  subtitle: 'From first contact to loyal customer — your CRM and email sequences work together automatically.',
};

export const crmFlowSteps: FlowStep[] = [
  { id: 'capture', icon: UserPlus, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Lead Captured', sub: 'Form, ad, or chatbot' },
  { id: 'tag', icon: Tag, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Auto-Tagged', sub: 'Source, service, score' },
  { id: 'welcome', icon: Mail, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Welcome Sequence', sub: '3-email onboarding flow' },
  { id: 'nurture', icon: TrendingUp, color: '#f59e0b', glow: 'rgba(245,158,11,0.35)', label: 'Nurture Campaign', sub: 'Day 2, 5, 10, 21 emails' },
  { id: 'convert', icon: CreditCard, color: '#ec4899', glow: 'rgba(236,72,153,0.35)', label: 'Conversion Trigger', sub: 'Offer sent at right moment' },
  { id: 'review', icon: Star, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Post-Sale Review', sub: 'Auto review + upsell request' },
];

export const crmFlowCards: FlowCard[] = [
  { id: 'pipeline', icon: Database, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Visual Pipeline', desc: 'See every lead\'s stage at a glance. Drag-and-drop deals. Nothing falls through the cracks.' },
  { id: 'sequences', icon: Send, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Email Sequences', desc: 'Multi-step campaigns that fire automatically based on behaviour, not just time.' },
  { id: 'segment', icon: Filter, color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Smart Segmentation', desc: 'Group leads by service, location, or engagement level and personalise every message.' },
  { id: 'reactivate', icon: RotateCcw, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Re-activation Flows', desc: 'Leads gone cold? Automated win-back campaigns bring them back without manual effort.' },
];

// ─── BRANDING ─────────────────────────────────────────────────────────────────

export const brandingFlowText: FlowSectionText = {
  badge: 'Brand Development Process',
  title: 'Raw Vision.',
  titleGradient: 'Premium Brand Identity.',
  subtitle: 'From first brief to final delivery — a systematic process that builds a brand your customers instantly trust.',
};

export const brandingFlowSteps: FlowStep[] = [
  { id: 'brief', icon: FileText, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Discovery Brief', sub: 'Values, audience, goals' },
  { id: 'research', icon: Target, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Market Research', sub: 'Competitors & positioning' },
  { id: 'concept', icon: Palette, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Concept Design', sub: 'Logo directions & moodboard' },
  { id: 'refine', icon: RefreshCw, color: '#f59e0b', glow: 'rgba(245,158,11,0.35)', label: 'Refine & Approve', sub: '2 rounds of revisions' },
  { id: 'system', icon: Layout, color: '#ec4899', glow: 'rgba(236,72,153,0.35)', label: 'Brand System Built', sub: 'Colours, fonts, templates' },
  { id: 'deliver', icon: CheckCircle, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Full Delivery', sub: 'All files + brand guidelines' },
];

export const brandingFlowCards: FlowCard[] = [
  { id: 'logo', icon: Palette, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Logo System', desc: 'Primary, secondary, and icon marks — all variations you\'ll ever need, across every format.' },
  { id: 'guidelines', icon: FileText, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Brand Guidelines', desc: 'A complete playbook so your brand looks consistent everywhere — from Instagram to invoices.' },
  { id: 'templates', icon: Layout, color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Ready-to-Use Templates', desc: 'Social media, presentations, proposals — all designed and ready to use on day one.' },
  { id: 'trust', icon: Award, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Premium Positioning', desc: 'A brand that commands higher prices, attracts better clients, and builds instant trust.' },
];

// ─── FUNNELS ──────────────────────────────────────────────────────────────────

export const funnelsFlowText: FlowSectionText = {
  badge: 'Conversion Funnel Flow',
  title: 'Visitor Enters.',
  titleGradient: 'Customer Leaves.',
  subtitle: 'A funnel isn\'t just a page — it\'s a complete journey engineered to convert every qualified visitor into a paying customer.',
};

export const funnelsFlowSteps: FlowStep[] = [
  { id: 'traffic', icon: Megaphone, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Traffic Source', sub: 'Ad, SEO, or social' },
  { id: 'landing', icon: Globe, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Landing Page', sub: 'Headline, offer, proof' },
  { id: 'cta', icon: MousePointer, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'CTA Clicked', sub: 'Form or booking button' },
  { id: 'thank', icon: CheckCircle, color: '#f59e0b', glow: 'rgba(245,158,11,0.35)', label: 'Thank-You Page', sub: 'Upsell or next step' },
  { id: 'follow', icon: Mail, color: '#ec4899', glow: 'rgba(236,72,153,0.35)', label: 'Auto Follow-Up', sub: 'Email + WhatsApp sequence' },
  { id: 'convert', icon: CreditCard, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Conversion', sub: 'Sale or booking confirmed' },
];

export const funnelsFlowCards: FlowCard[] = [
  { id: 'speed', icon: Zap, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Speed Optimised', desc: 'Every page loads in under 2 seconds. Slow pages kill conversions — ours don\'t.' },
  { id: 'mobile', icon: Globe, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Mobile-First Design', desc: 'Over 70% of traffic is mobile. Every funnel is designed for thumbs first.' },
  { id: 'ab', icon: RefreshCw, color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/20', title: 'A/B Tested Copy', desc: 'Headlines, CTAs, and layouts tested systematically until we find what converts best.' },
  { id: 'track', icon: BarChart3, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Full Tracking Setup', desc: 'GA4, Meta Pixel, and heatmaps configured from day one so nothing is a guessing game.' },
];

// ─── AUTOMATION (override existing generic one with service-specific) ──────────

export const automationFlowText: FlowSectionText = {
  badge: 'See It Live',
  title: 'Your Automation',
  titleGradient: 'Flow Visualised',
  subtitle: 'Every step is automated. Every lead is captured. Every follow-up is sent — without you touching a thing.',
};
