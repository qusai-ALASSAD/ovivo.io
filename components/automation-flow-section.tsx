'use client';

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Bot,
  Brain,
  CalendarCheck,
  Database,
  GitBranch,
  Globe2,
  Link2,
  MessageSquare,
  Send,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

export interface FlowStep {
  id: string;
  icon: ElementType;
  color: string;
  glow: string;
  label: string;
  sub: string;
}

export interface FlowCard {
  id: string;
  icon: ElementType;
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
    subtitle: 'Ein Gast schreibt im Chat. Ovivo versteht die Anfrage, beantwortet Fragen, erkennt Reservierungen, speichert Leads und informiert Ihr Team automatisch.',
  },
  en: {
    badge: 'Restaurant automation live',
    title: 'How your restaurant runs',
    titleGradient: 'automatically with Ovivo',
    subtitle: 'A guest writes in the chat. Ovivo understands the request, answers questions, detects bookings, saves leads, and notifies your team automatically.',
  },
  ar: {
    badge: 'أتمتة مطعم مباشرة',
    title: 'هكذا يعمل مطعمك',
    titleGradient: 'تلقائياً مع Ovivo',
    subtitle: 'العميل يكتب في الشات. Ovivo يفهم الطلب، يرد على الأسئلة، يميّز الحجز، يحفظ بيانات العميل، ويبلغ فريق المطعم تلقائياً.',
  },
};

const restaurantNodes: Record<Lang, FlowStep[]> = {
  de: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'POST: /webhook/restaurant-chat' },
    { id: 'chat', icon: MessageSquare, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'When chat message received', sub: 'Gast schreibt im Website-Chat' },
    { id: 'chain', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Basic LLM Chain', sub: 'Restaurant-Antwort vorbereiten' },
    { id: 'reply', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Return Reply', sub: 'Antwort zurück an den Gast' },
    { id: 'lead', icon: GitBranch, color: '#22c55e', glow: 'rgba(34,197,94,0.3)', label: 'Has Lead?', sub: 'Reservierung oder Kontakt erkannt' },
    { id: 'save', icon: Globe2, color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)', label: 'Save Lead', sub: 'POST: /api/leads' },
    { id: 'telegram', icon: Globe2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Telegram (Deactivated)', sub: 'Team über neuen Gast informieren' },
    { id: 'template', icon: Send, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Send template (Deactivated)', sub: 'Reservierungsbestätigung senden' },
    { id: 'model', icon: Brain, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'OpenAI Chat Model', sub: 'Model' },
    { id: 'memory', icon: Database, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Simple Memory', sub: 'Memory' },
  ],
  en: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'POST: /webhook/restaurant-chat' },
    { id: 'chat', icon: MessageSquare, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'When chat message received', sub: 'Guest writes in website chat' },
    { id: 'chain', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Basic LLM Chain', sub: 'Prepare restaurant reply' },
    { id: 'reply', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Return Reply', sub: 'Reply back to guest' },
    { id: 'lead', icon: GitBranch, color: '#22c55e', glow: 'rgba(34,197,94,0.3)', label: 'Has Lead?', sub: 'Booking or contact detected' },
    { id: 'save', icon: Globe2, color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)', label: 'Save Lead', sub: 'POST: /api/leads' },
    { id: 'telegram', icon: Globe2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Telegram (Deactivated)', sub: 'Notify team about new guest' },
    { id: 'template', icon: Send, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Send template (Deactivated)', sub: 'Send booking confirmation' },
    { id: 'model', icon: Brain, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'OpenAI Chat Model', sub: 'Model' },
    { id: 'memory', icon: Database, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Simple Memory', sub: 'Memory' },
  ],
  ar: [
    { id: 'webhook', icon: Link2, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'Chat Webhook', sub: 'POST: /webhook/restaurant-chat' },
    { id: 'chat', icon: MessageSquare, color: '#22c55e', glow: 'rgba(34,197,94,0.35)', label: 'When chat message received', sub: 'العميل يكتب داخل شات الموقع' },
    { id: 'chain', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Basic LLM Chain', sub: 'تحضير رد المطعم المناسب' },
    { id: 'reply', icon: Link2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Return Reply', sub: 'إرجاع الرد للعميل' },
    { id: 'lead', icon: GitBranch, color: '#22c55e', glow: 'rgba(34,197,94,0.3)', label: 'Has Lead?', sub: 'هل يوجد حجز أو بيانات عميل؟' },
    { id: 'save', icon: Globe2, color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)', label: 'Save Lead', sub: 'POST: /api/leads' },
    { id: 'telegram', icon: Globe2, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Telegram (Deactivated)', sub: 'تنبيه فريق المطعم' },
    { id: 'template', icon: Send, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Send template (Deactivated)', sub: 'إرسال تأكيد الحجز' },
    { id: 'model', icon: Brain, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'OpenAI Chat Model', sub: 'Model' },
    { id: 'memory', icon: Database, color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'Simple Memory', sub: 'Memory' },
  ],
};

const restaurantCards: Record<Lang, FlowCard[]> = {
  de: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Chat-Anfragen beantworten', desc: 'Öffnungszeiten, Menü, Reservierungen und Fragen werden direkt im Chat beantwortet.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Reservierung erkennen', desc: 'Das System erkennt Name, Datum, Uhrzeit und Gästezahl und leitet sie weiter.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Lead speichern', desc: 'Wichtige Anfragen werden strukturiert gespeichert, damit nichts verloren geht.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Team informieren', desc: 'Bei Bedarf bekommt das Restaurant eine interne Meldung oder Vorlage.' },
  ],
  en: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Answer chat inquiries', desc: 'Opening hours, menu, bookings, and questions are answered directly in chat.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Detect reservation', desc: 'The system recognizes name, date, time, and party size, then routes the details.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Save lead', desc: 'Important inquiries are saved in a structured way so nothing gets lost.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Notify team', desc: 'When needed, the restaurant receives an internal message or confirmation template.' },
  ],
  ar: [
    { id: 'instant', icon: MessageSquare, color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20', title: 'الرد على رسائل الشات', desc: 'الدوام، المنيو، الحجوزات، والأسئلة يتم الرد عليها مباشرة داخل الشات.' },
    { id: 'booking', icon: CalendarCheck, color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'تمييز الحجز', desc: 'النظام يلتقط الاسم، التاريخ، الوقت، وعدد الأشخاص ثم يوجّه البيانات.' },
    { id: 'lead', icon: Database, color: '#0ea5e9', bg: 'bg-sky-500/10 border-sky-500/20', title: 'حفظ العميل', desc: 'الطلبات المهمة تُحفظ بشكل منظم حتى لا يضيع أي عميل.' },
    { id: 'team', icon: Bell, color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20', title: 'تنبيه الفريق', desc: 'عند الحاجة، يصل للمطعم إشعار داخلي أو قالب تأكيد.' },
  ],
};

const positions: Record<string, { x: number; y: number; type?: 'circle' | 'wide' }> = {
  webhook: { x: 10, y: 35 },
  chat: { x: 10, y: 61 },
  chain: { x: 33, y: 42, type: 'wide' },
  reply: { x: 55, y: 42 },
  lead: { x: 72, y: 42 },
  save: { x: 83, y: 15 },
  telegram: { x: 83, y: 43 },
  template: { x: 83, y: 65 },
  model: { x: 34, y: 73, type: 'circle' },
  memory: { x: 49, y: 62, type: 'circle' },
};

function WorkflowNode({ step }: { step: FlowStep }) {
  const Icon = step.icon;
  const pos = positions[step.id] ?? { x: 50, y: 50 };
  const isCircle = pos.type === 'circle';
  const isWide = pos.type === 'wide';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="relative mb-8 lg:absolute lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`relative flex items-center justify-center border border-white/15 bg-[#24262c] shadow-[0_10px_28px_rgba(0,0,0,0.25)] ${isCircle ? 'h-14 w-14 rounded-full' : isWide ? 'h-16 w-36 rounded-md' : 'h-16 w-16 rounded-md'}`}
        >
          <span className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-white/25 bg-[#30323a]" />
          {!isCircle && <span className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-white/25 bg-[#30323a]" />}
          <Icon className="h-7 w-7" style={{ color: step.color }} />
          {step.id === 'lead' && (
            <>
              <span className="absolute -right-2 top-[34%] h-3 w-3 rounded-full border border-white/25 bg-[#30323a]" />
              <span className="absolute -right-2 top-[66%] h-3 w-3 rounded-full border border-white/25 bg-[#30323a]" />
            </>
          )}
          {(step.id === 'save' || step.id === 'telegram' || step.id === 'template') && (
            <span className="absolute -right-10 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded bg-[#25272d] text-xs text-gray-400">+</span>
          )}
        </div>
        <p className="mt-2 max-w-[150px] text-[12px] font-bold leading-tight text-white">{step.label}</p>
        <p className="mt-1 max-w-[170px] text-[10px] leading-tight text-gray-500">{step.sub}</p>
      </div>
    </motion.div>
  );
}

function WorkflowCanvas({ steps, lang }: { steps: FlowStep[]; lang: Lang }) {
  const fallback = restaurantNodes[lang];
  const nodeList = fallback.map((node, index) => steps.find((item) => item.id === node.id) ?? steps[index] ?? node);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#151515]"
    >
      <div className="relative min-h-[720px] p-8 lg:min-h-[560px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px)', backgroundSize: '13px 13px' }}
        />
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none">
          <path d="M150 225 C225 225 275 250 330 250" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M150 365 C240 365 250 270 330 250" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M420 250 C475 250 510 250 550 250" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M615 250 C655 250 690 250 720 250" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M755 230 C800 160 805 105 830 105" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M755 250 C790 250 808 250 830 250" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M755 272 C790 365 805 365 830 365" stroke="#6b7280" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M370 282 C365 365 355 405 345 415" stroke="#6b7280" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 7" />
          <path d="M420 285 C455 330 475 345 500 350" stroke="#6b7280" strokeOpacity="0.32" strokeWidth="2" strokeDasharray="6 7" />
        </svg>
        <div className="relative lg:absolute lg:inset-0">
          {nodeList.map((step) => (
            <WorkflowNode key={step.id} step={step} />
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
          <div className="rounded-md bg-[#ff665a] px-8 py-4 text-base font-bold text-white shadow-lg">Execute workflow</div>
          <div className="rounded-md border border-white/15 bg-[#1b1b1f] px-8 py-4 text-base font-bold text-white">Open chat</div>
        </div>
      </div>
    </motion.div>
  );
}

function FlowCardView({ card, rtl }: { card: FlowCard; rtl: boolean }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.01] ${card.bg}`}
    >
      <div className={`flex items-start gap-3 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border" style={{ backgroundColor: `${card.color}18`, borderColor: `${card.color}40` }}>
          <Icon className="h-5 w-5" style={{ color: card.color }} />
        </div>
        <div>
          <p className="mb-1 text-sm font-bold leading-snug text-white">{card.title}</p>
          <p className="text-xs leading-relaxed text-gray-400">{card.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function AutomationFlowSection({ lang, customSteps, customCards, customText }: Props) {
  const rtl = isRTL(lang);
  const text = customText ?? restaurantText[lang];
  const steps = customSteps && customSteps.length >= 8 ? customSteps : restaurantNodes[lang];
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
