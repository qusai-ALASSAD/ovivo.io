'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Bot,
  Brain,
  CalendarCheck,
  Database,
  GitBranch,
  Link2,
  MessageSquare,
  Send,
  Star,
  Utensils,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

export interface FlowStep {
  id: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  label: string;
  sub: string;
}

export interface FlowCard {
  id: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  title: string;
  desc: string;
}

export interface FlowSectionText {
  badge: string;
  title: string;
  titleGradient: string;
  subtitle: string;
}

interface Props {
  lang: Lang;
  customSteps?: FlowStep[];
  customCards?: FlowCard[];
  customText?: FlowSectionText;
}

const restaurantText: Record<Lang, FlowSectionText> = {
  de: {
    badge: 'Restaurant-Automation live',
    title: 'So arbeitet Ihr Restaurant',
    titleGradient: 'mit Ovivo automatisch',
    subtitle:
      'Ein Gast schreibt im Chat. Ovivo versteht die Anfrage, beantwortet Fragen, erkennt Reservierungen, speichert Leads und informiert Ihr Team automatisch.',
  },
  en: {
    badge: 'Restaurant automation live',
    title: 'How your restaurant runs',
    titleGradient: 'automatically with Ovivo',
    subtitle:
      'A guest writes in the chat. Ovivo understands the request, answers questions, detects bookings, saves leads, and notifies your team automatically.',
  },
  ar: {
    badge: 'أتمتة مطعم مباشرة',
    title: 'هكذا يعمل مطعمك',
    titleGradient: 'تلقائياً مع Ovivo',
    subtitle:
      'العميل يكتب في الشات. Ovivo يفهم الطلب، يرد على الأسئلة، يميّز الحجز، يحفظ بيانات العميل، ويبلغ فريق المطعم تلقائياً.',
  },
};

const restaurantNodes: Record<Lang, FlowStep[]> = {
  de: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'Website-Chat empfängt Anfrage' },
    { id: 'message', icon: MessageSquare, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Gästenachricht', sub: 'Reservierung, Menü oder Frage' },
    { id: 'chain', icon: Bot, color: '#a78bfa', glow: 'rgba(167,139,250,0.38)', label: 'Restaurant AI Chain', sub: 'Antwort wird vorbereitet' },
    { id: 'reply', icon: Send, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Antwort senden', sub: 'Direkt zurück in den Chat' },
    { id: 'model', icon: Brain, color: '#8b5cf6', glow: 'rgba(139,92,246,0.38)', label: 'OpenAI Modell', sub: 'Versteht Kontext & Sprache' },
    { id: 'decision', icon: GitBranch, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Reservierung erkannt?', sub: 'Name, Datum, Uhrzeit, Gäste' },
    { id: 'save', icon: Database, color: '#0ea5e9', glow: 'rgba(14,165,233,0.35)', label: 'Lead speichern', sub: 'Kontakt + Buchungsdaten' },
    { id: 'notify', icon: Bell, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Team informieren', sub: 'Telegram-Nachricht ans Restaurant' },
  ],
  en: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'Website chat receives inquiry' },
    { id: 'message', icon: MessageSquare, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'Guest Message', sub: 'Booking, menu, or question' },
    { id: 'chain', icon: Bot, color: '#a78bfa', glow: 'rgba(167,139,250,0.38)', label: 'Restaurant AI Chain', sub: 'Reply is prepared' },
    { id: 'reply', icon: Send, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'Return Reply', sub: 'Back into the chat instantly' },
    { id: 'model', icon: Brain, color: '#8b5cf6', glow: 'rgba(139,92,246,0.38)', label: 'OpenAI Model', sub: 'Understands context & language' },
    { id: 'decision', icon: GitBranch, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'Booking detected?', sub: 'Name, date, time, guests' },
    { id: 'save', icon: Database, color: '#0ea5e9', glow: 'rgba(14,165,233,0.35)', label: 'Save Lead', sub: 'Contact + booking details' },
    { id: 'notify', icon: Bell, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'Notify Team', sub: 'Telegram message to restaurant' },
  ],
  ar: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'الشات يستقبل طلب العميل' },
    { id: 'message', icon: MessageSquare, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', label: 'رسالة العميل', sub: 'حجز، منيو، أو سؤال' },
    { id: 'chain', icon: Bot, color: '#a78bfa', glow: 'rgba(167,139,250,0.38)', label: 'Restaurant AI Chain', sub: 'تحضير الرد المناسب' },
    { id: 'reply', icon: Send, color: '#06b6d4', glow: 'rgba(6,182,212,0.35)', label: 'إرجاع الرد', sub: 'يرجع مباشرة داخل الشات' },
    { id: 'model', icon: Brain, color: '#8b5cf6', glow: 'rgba(139,92,246,0.38)', label: 'OpenAI Model', sub: 'يفهم اللغة والسياق' },
    { id: 'decision', icon: GitBranch, color: '#10b981', glow: 'rgba(16,185,129,0.35)', label: 'هل يوجد حجز؟', sub: 'الاسم، الوقت، التاريخ، العدد' },
    { id: 'save', icon: Database, color: '#0ea5e9', glow: 'rgba(14,165,233,0.35)', label: 'حفظ العميل', sub: 'بيانات التواصل والحجز' },
    { id: 'notify', icon: Bell, color: '#f97316', glow: 'rgba(249,115,22,0.35)', label: 'إشعار الفريق', sub: 'رسالة تيليجرام للمطعم' },
  ],
};

const restaurantCards: Record<Lang, FlowCard[]> = {
  de: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Sofortige Chat-Antworten', desc: 'Gäste bekommen Antworten zu Öffnungszeiten, Menü, Verfügbarkeit und Buchungen ohne Wartezeit.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Reservierungen erkennen', desc: 'Das System erkennt Buchungsabsichten und sammelt Name, Datum, Uhrzeit und Gästezahl sauber ein.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Lead automatisch speichern', desc: 'Jeder wichtige Kontakt wird strukturiert gespeichert, damit kein Gast und keine Anfrage verloren geht.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Team direkt benachrichtigen', desc: 'Sobald ein Lead oder eine Reservierung entsteht, bekommt das Restaurant eine klare interne Meldung.' },
  ],
  en: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Instant chat replies', desc: 'Guests get answers about opening hours, menu, availability, and bookings without waiting.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Booking intent detected', desc: 'The system recognizes reservations and collects name, date, time, and party size.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Lead saved automatically', desc: 'Every important contact is stored clearly so no guest or inquiry gets lost.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Team notified instantly', desc: 'When a lead or booking appears, the restaurant receives a clear internal alert.' },
  ],
  ar: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'رد فوري داخل الشات', desc: 'العميل يحصل على جواب عن الدوام، المنيو، التوفر، والحجوزات بدون انتظار.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'تمييز نية الحجز', desc: 'النظام يعرف أن العميل يريد حجزاً ويجمع الاسم، التاريخ، الوقت، وعدد الأشخاص.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'حفظ بيانات العميل', desc: 'كل تواصل مهم يُحفظ بشكل منظم حتى لا يضيع أي عميل أو طلب.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'تنبيه فريق المطعم', desc: 'عند ظهور حجز أو عميل مهم، يصل إشعار واضح لفريق المطعم فوراً.' },
  ],
};

function WorkflowNode({ step, index, rtl }: { step: FlowStep; index: number; rtl: boolean }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="relative min-h-[104px] rounded-xl border bg-white/[0.035] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.22)]"
      style={{ borderColor: `${step.color}66`, boxShadow: `0 0 26px ${step.glow}` }}
    >
      <div className={`flex items-start gap-3 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-black/20" style={{ borderColor: `${step.color}88` }}>
          <Icon className="h-6 w-6" style={{ color: step.color }} />
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: step.color }}>
            {index + 1}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-snug text-white">{step.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">{step.sub}</p>
          <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-gray-600">{index === 0 ? 'POST' : index === 5 ? 'IF' : 'NODE'}</p>
        </div>
      </div>
    </motion.div>
  );
}

function WorkflowCanvas({ steps, lang }: { steps: FlowStep[]; lang: Lang }) {
  const rtl = isRTL(lang);
  const visibleSteps = steps.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#060a12]"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="hidden text-[11px] font-mono text-gray-500 sm:block">
            {lang === 'ar' ? 'restaurant-chat-workflow.n8n' : 'restaurant-chat-workflow.n8n'}
          </span>
        </div>
        <LiveIndicator lang={lang} />
      </div>

      <div className="relative p-5 sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 470" preserveAspectRatio="none" fill="none">
          <path d="M150 90 C260 85 330 90 420 90" stroke="#22c55e" strokeOpacity="0.45" strokeWidth="2" />
          <path d="M530 90 C620 90 700 90 820 90" stroke="#06b6d4" strokeOpacity="0.38" strokeWidth="2" />
          <path d="M500 140 C500 178 500 208 500 250" stroke="#a78bfa" strokeOpacity="0.42" strokeWidth="2" strokeDasharray="5 7" />
          <path d="M820 145 C760 220 720 270 650 325" stroke="#10b981" strokeOpacity="0.42" strokeWidth="2" />
          <path d="M650 350 C725 350 790 350 860 350" stroke="#f97316" strokeOpacity="0.42" strokeWidth="2" />
          <path d="M350 350 C440 350 500 350 570 350" stroke="#8b5cf6" strokeOpacity="0.34" strokeWidth="2" />
        </svg>

        <div className="relative grid gap-5 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          <div className="lg:col-start-1 lg:row-start-1"><WorkflowNode step={visibleSteps[0]} index={0} rtl={rtl} /></div>
          <div className="lg:col-start-2 lg:row-start-1"><WorkflowNode step={visibleSteps[1]} index={1} rtl={rtl} /></div>
          <div className="lg:col-start-3 lg:row-start-1"><WorkflowNode step={visibleSteps[2]} index={2} rtl={rtl} /></div>
          <div className="lg:col-start-4 lg:row-start-1"><WorkflowNode step={visibleSteps[3]} index={3} rtl={rtl} /></div>
          <div className="lg:col-start-3 lg:row-start-2"><WorkflowNode step={visibleSteps[4]} index={4} rtl={rtl} /></div>
          <div className="lg:col-start-3 lg:row-start-3"><WorkflowNode step={visibleSteps[5]} index={5} rtl={rtl} /></div>
          <div className="lg:col-start-2 lg:row-start-3"><WorkflowNode step={visibleSteps[6]} index={6} rtl={rtl} /></div>
          <div className="lg:col-start-4 lg:row-start-3"><WorkflowNode step={visibleSteps[7]} index={7} rtl={rtl} /></div>
        </div>

        <div className="relative mt-6 flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest">
          <span className="flex items-center gap-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {lang === 'ar' ? 'النظام يعمل' : lang === 'en' ? 'workflow active' : 'workflow aktiv'}
          </span>
          <span className="text-gray-600">
            {lang === 'ar' ? 'شات المطعم + الرد + حفظ العميل + إشعار الفريق' : lang === 'en' ? 'restaurant chat + reply + lead save + team alert' : 'restaurant-chat + antwort + lead-save + team-alert'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FlowCardView({ card, rtl }: { card: FlowCard; rtl: boolean }) {
  const Icon = card.icon;
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => setActive((value) => !value)}
      className={`relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${card.bg} ${active ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
      style={{ boxShadow: active ? `0 0 30px ${card.color}30` : 'none' }}
    >
      <div className={`flex items-start gap-3 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border" style={{ backgroundColor: `${card.color}18`, borderColor: `${card.color}40` }}>
          <Icon className="h-5 w-5" style={{ color: card.color }} />
        </div>
        <div>
          <p className="mb-1 text-sm font-bold leading-snug text-white">{card.title}</p>
          <AnimatePresence>
            <motion.p className="text-xs leading-relaxed text-gray-400" initial={{ opacity: 0.75 }} animate={{ opacity: 1 }}>
              {card.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function LiveIndicator({ lang }: { lang: Lang }) {
  const label = lang === 'ar' ? 'نشط' : lang === 'en' ? 'Live' : 'Live';
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-blue-500/60"
            animate={{ height: [4, 12 + i, 4] }}
            transition={{ duration: 0.75 + i * 0.08, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400">{label}</span>
    </div>
  );
}

export function AutomationFlowSection({ lang, customSteps, customCards, customText }: Props) {
  const rtl = isRTL(lang);
  const text = customText ?? restaurantText[lang];
  const steps = customSteps ?? restaurantNodes[lang];
  const cards = customCards ?? restaurantCards[lang];

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <SectionHeader badge={text.badge} title={text.title} titleGradient={text.titleGradient} subtitle={text.subtitle} />
        </div>

        <WorkflowCanvas steps={steps} lang={lang} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <FlowCardView key={card.id} card={card} rtl={rtl} />
          ))}
        </div>
      </div>
    </section>
  );
}
