'use client';

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { Bell, CalendarCheck, Database, MessageSquare } from 'lucide-react';
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
    title: 'Ein kompletter Workflow',
    titleGradient: 'für Ihr Restaurant',
    subtitle: 'Vom ersten Chat bis zur gespeicherten Reservierung: Ovivo beantwortet Gäste, erkennt Leads und informiert Ihr Team automatisch.',
  },
  en: {
    badge: 'Restaurant automation live',
    title: 'A complete workflow',
    titleGradient: 'for your restaurant',
    subtitle: 'From the first chat to a saved reservation: Ovivo answers guests, detects leads, and notifies your team automatically.',
  },
  ar: {
    badge: 'أتمتة مطعم مباشرة',
    title: 'سير عمل كامل',
    titleGradient: 'لمطعمك',
    subtitle: 'من أول رسالة في الشات حتى حفظ الحجز: Ovivo يرد على العملاء، يميّز الطلبات المهمة، ويبلغ فريقك تلقائياً.',
  },
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

const workflowCopy = {
  de: {
    chat: 'Gast schreibt im Chat',
    ai: 'KI versteht die Anfrage',
    reply: 'Antwort an den Gast',
    lead: 'Reservierung erkannt?',
    save: 'Lead speichern',
    team: 'Team informieren',
    memory: 'Kontext behalten',
    booking: 'Buchung bestätigen',
    footer: 'Restaurant-Automation: Chat + KI-Antwort + Reservierung + Lead-Speicherung + Team-Benachrichtigung',
  },
  en: {
    chat: 'Guest writes in chat',
    ai: 'AI understands request',
    reply: 'Reply to guest',
    lead: 'Booking detected?',
    save: 'Save lead',
    team: 'Notify team',
    memory: 'Keep context',
    booking: 'Confirm booking',
    footer: 'Restaurant automation: chat + AI reply + reservation + lead save + team notification',
  },
  ar: {
    chat: 'العميل يكتب في الشات',
    ai: 'الذكاء يفهم الطلب',
    reply: 'رد مباشر للعميل',
    lead: 'هل يوجد حجز؟',
    save: 'حفظ بيانات العميل',
    team: 'تنبيه فريق المطعم',
    memory: 'حفظ السياق',
    booking: 'تأكيد الحجز',
    footer: 'أتمتة مطعم: شات + رد ذكي + حجز + حفظ العميل + إشعار الفريق',
  },
};

function WorkflowIllustration({ lang }: { lang: Lang }) {
  const copy = workflowCopy[lang];
  const titleAnchor = lang === 'ar' ? 'end' : 'middle';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080f1a] shadow-[0_30px_100px_rgba(15,23,42,0.35)]"
    >
      <svg viewBox="0 0 1156 822" className="block h-auto w-full" role="img" aria-label="Restaurant automation workflow">
        <defs>
          <radialGradient id="wf-bg" cx="50%" cy="45%" r="70%">
            <stop offset="0" stopColor="#101827" />
            <stop offset="1" stopColor="#070b13" />
          </radialGradient>
          <linearGradient id="wf-line" x1="130" y1="360" x2="1010" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00d1ff" />
            <stop offset="0.48" stopColor="#7b61ff" />
            <stop offset="1" stopColor="#ff5ce0" />
          </linearGradient>
          <linearGradient id="wf-card" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#182235" />
            <stop offset="1" stopColor="#111827" />
          </linearGradient>
          <filter id="wf-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="wf-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94a3b8" opacity="0.22" />
          </pattern>
        </defs>

        <rect width="1156" height="822" rx="32" fill="url(#wf-bg)" />
        <rect width="1156" height="822" fill="url(#wf-grid)" opacity="0.42" />
        <circle cx="575" cy="410" r="310" fill="#2563eb" opacity="0.055" />
        <circle cx="850" cy="270" r="210" fill="#a855f7" opacity="0.07" />
        <circle cx="285" cy="560" r="180" fill="#06b6d4" opacity="0.065" />

        <path d="M214 390 C300 310 390 305 478 372" stroke="url(#wf-line)" strokeWidth="4" opacity="0.65" fill="none" />
        <path d="M478 372 C550 425 623 425 696 372" stroke="url(#wf-line)" strokeWidth="4" opacity="0.62" fill="none" />
        <path d="M696 372 C765 310 860 312 938 390" stroke="url(#wf-line)" strokeWidth="4" opacity="0.62" fill="none" />
        <path d="M575 458 C538 518 505 570 454 628" stroke="#7b61ff" strokeWidth="3" opacity="0.55" fill="none" strokeDasharray="10 12" />
        <path d="M575 458 C622 520 690 578 759 628" stroke="#00d1ff" strokeWidth="3" opacity="0.52" fill="none" strokeDasharray="10 12" />
        <path d="M938 390 C990 465 1000 560 930 640" stroke="#ff5ce0" strokeWidth="4" opacity="0.6" fill="none" />
        <path d="M938 390 C1000 320 1010 245 940 184" stroke="#00d1ff" strokeWidth="4" opacity="0.55" fill="none" />

        <WorkflowSvgNode x={128} y={320} color="#00d1ff" label={copy.chat} sub="Website Chat" icon="chat" />
        <WorkflowSvgNode x={408} y={302} color="#7b61ff" label={copy.ai} sub="Restaurant AI Chain" icon="brain" wide />
        <WorkflowSvgNode x={642} y={302} color="#3b82f6" label={copy.reply} sub="Return Reply" icon="reply" />
        <WorkflowSvgNode x={834} y={320} color="#22c55e" label={copy.lead} sub="Has Lead?" icon="branch" />
        <WorkflowSvgNode x={834} y={112} color="#00d1ff" label={copy.save} sub="POST /api/leads" icon="database" />
        <WorkflowSvgNode x={834} y={570} color="#ff5ce0" label={copy.team} sub="Telegram / WhatsApp" icon="bell" />
        <WorkflowSvgNode x={330} y={575} color="#7b61ff" label={copy.memory} sub="Simple Memory" icon="memory" round />
        <WorkflowSvgNode x={630} y={575} color="#f97316" label={copy.booking} sub="Reservation Template" icon="calendar" round />

        <circle cx="305" cy="332" r="7" fill="#00d1ff" filter="url(#wf-glow)" />
        <circle cx="578" cy="420" r="8" fill="#ffffff" opacity="0.92" filter="url(#wf-glow)" />
        <circle cx="790" cy="335" r="7" fill="#22c55e" filter="url(#wf-glow)" />
        <circle cx="940" cy="247" r="7" fill="#00d1ff" filter="url(#wf-glow)" />
        <circle cx="932" cy="532" r="7" fill="#ff5ce0" filter="url(#wf-glow)" />

        <rect x="190" y="724" width="776" height="56" rx="18" fill="#0f172a" opacity="0.82" stroke="#243044" />
        <text x="578" y="759" textAnchor={titleAnchor} fill="#cbd5e1" fontSize="19" fontWeight="700" fontFamily="Inter, Arial, sans-serif">
          {copy.footer}
        </text>
      </svg>
    </motion.div>
  );
}

function WorkflowSvgNode({ x, y, color, label, sub, icon, wide = false, round = false }: {
  x: number;
  y: number;
  color: string;
  label: string;
  sub: string;
  icon: 'chat' | 'brain' | 'reply' | 'branch' | 'database' | 'bell' | 'memory' | 'calendar';
  wide?: boolean;
  round?: boolean;
}) {
  const w = wide ? 220 : round ? 92 : 118;
  const h = round ? 92 : 96;
  const rx = round ? 46 : 20;
  const cx = x + w / 2;
  const cy = y + 42;

  return (
    <g filter="url(#wf-glow)">
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="url(#wf-card)" stroke={color} strokeOpacity="0.65" strokeWidth="2" />
      <circle cx={x - 8} cy={y + h / 2} r="7" fill="#0f172a" stroke="#94a3b8" opacity="0.9" />
      {!round && <circle cx={x + w + 8} cy={y + h / 2} r="7" fill="#0f172a" stroke="#94a3b8" opacity="0.9" />}
      <g transform={`translate(${cx - 18} ${cy - 22})`} stroke={color} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'chat' && <path d="M4 8h28v18H15l-9 7v-7H4z" />}
        {icon === 'brain' && <path d="M12 25c-6 0-9-5-7-10 1-3 4-5 7-5 1-5 8-7 12-3 5-1 10 3 10 8 4 2 4 10-2 12-2 6-10 7-14 2-2 2-4 3-6 3z" />}
        {icon === 'reply' && <path d="M30 8H13l-8 8 8 8h17M13 16h22" />}
        {icon === 'branch' && <path d="M7 18h18M25 18l7-7M25 18l7 7M7 18v13" />}
        {icon === 'database' && <path d="M6 10c0 4 24 4 24 0s-24-4-24 0zm0 0v18c0 4 24 4 24 0V10M6 19c0 4 24 4 24 0" />}
        {icon === 'bell' && <path d="M10 27h20M13 27V16c0-6 4-10 7-10s7 4 7 10v11M18 31c1 2 5 2 6 0" />}
        {icon === 'memory' && <path d="M8 9h20v20H8zM14 4v8M22 4v8M14 26v8M22 26v8M4 14h8M4 22h8M26 14h8M26 22h8" />}
        {icon === 'calendar' && <path d="M7 10h26v23H7zM12 5v9M28 5v9M7 18h26M14 25l5 5 9-10" />}
      </g>
      <text x={cx} y={y + h + 32} textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="Inter, Arial, sans-serif">
        {label}
      </text>
      <text x={cx} y={y + h + 58} textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="Inter, Arial, sans-serif">
        {sub}
      </text>
    </g>
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

export function AutomationFlowSection({ lang, customCards, customText }: Props) {
  const rtl = isRTL(lang);
  const text = customText ?? restaurantText[lang];
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

        <WorkflowIllustration lang={lang} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <FlowCardView key={card.id} card={card} rtl={rtl} />
          ))}
        </div>
      </div>
    </section>
  );
}
