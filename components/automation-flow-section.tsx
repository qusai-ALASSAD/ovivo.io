'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, Zap, Mail, Calendar, TrendingUp, Star,
  ShoppingCart, Clock, MessageSquare, ArrowRight, Brain,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const flowSteps = {
  de: [
    {
      id: 'lead',
      icon: UserPlus,
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.35)',
      label: 'Lead Arrives',
      sub: 'Formular, Ad oder Empfehlung',
    },
    {
      id: 'crm',
      icon: Zap,
      color: '#06b6d4',
      glow: 'rgba(6,182,212,0.35)',
      label: 'CRM Entry',
      sub: 'Auto-markiert & bewertet',
    },
    {
      id: 'email',
      icon: Mail,
      color: '#10b981',
      glow: 'rgba(16,185,129,0.35)',
      label: 'Email Sent',
      sub: 'Personalisierte Begrüßung',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.35)',
      label: 'Booking Flow',
      sub: 'Kalender-Link gesendet',
    },
    {
      id: 'followup',
      icon: TrendingUp,
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.35)',
      label: 'Follow-Up',
      sub: 'Tag 2, 5, 10 Sequenzen',
    },
    {
      id: 'review',
      icon: Star,
      color: '#f97316',
      glow: 'rgba(249,115,22,0.35)',
      label: 'Review Request',
      sub: 'Auto-Bewertungsanfrage',
    },
  ],
  en: [
    {
      id: 'lead',
      icon: UserPlus,
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.35)',
      label: 'Lead Arrives',
      sub: 'Form, ad, or referral',
    },
    {
      id: 'crm',
      icon: Zap,
      color: '#06b6d4',
      glow: 'rgba(6,182,212,0.35)',
      label: 'CRM Entry',
      sub: 'Auto-tagged & scored',
    },
    {
      id: 'email',
      icon: Mail,
      color: '#10b981',
      glow: 'rgba(16,185,129,0.35)',
      label: 'Email Sent',
      sub: 'Personalised welcome',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.35)',
      label: 'Booking Flow',
      sub: 'Calendar link sent',
    },
    {
      id: 'followup',
      icon: TrendingUp,
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.35)',
      label: 'Follow-Up',
      sub: 'Day 2, 5, 10 sequences',
    },
    {
      id: 'review',
      icon: Star,
      color: '#f97316',
      glow: 'rgba(249,115,22,0.35)',
      label: 'Review Request',
      sub: 'Auto-sent after service',
    },
  ],
  ar: [
    {
      id: 'lead',
      icon: UserPlus,
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.35)',
      label: 'وصول العميل',
      sub: 'نموذج، إعلان، أو إحالة',
    },
    {
      id: 'crm',
      icon: Zap,
      color: '#06b6d4',
      glow: 'rgba(6,182,212,0.35)',
      label: 'تسجيل في CRM',
      sub: 'تصنيف وتقييم تلقائي',
    },
    {
      id: 'email',
      icon: Mail,
      color: '#10b981',
      glow: 'rgba(16,185,129,0.35)',
      label: 'إرسال البريد',
      sub: 'رسالة ترحيب مخصصة',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.35)',
      label: 'تدفق الحجز',
      sub: 'إرسال رابط الموعد',
    },
    {
      id: 'followup',
      icon: TrendingUp,
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.35)',
      label: 'المتابعة التلقائية',
      sub: 'تسلسل اليوم 2، 5، 10',
    },
    {
      id: 'review',
      icon: Star,
      color: '#f97316',
      glow: 'rgba(249,115,22,0.35)',
      label: 'طلب التقييم',
      sub: 'يُرسل تلقائياً بعد الخدمة',
    },
  ],
};

const flowCards = {
  de: [
    {
      id: 'abandoned',
      icon: ShoppingCart,
      color: '#3b82f6',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Verlorene Interessenten zurückgewinnen',
      desc: 'Wer nicht sofort bucht, bekommt automatische Follow-up-Nachrichten über WhatsApp & E-Mail — bis er bereit ist.',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#10b981',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Terminbuchung vollautomatisch',
      desc: 'Erinnerungen, Bestätigungen und No-Show-Reduktion passieren ohne manuellen Aufwand. Immer pünktlich, immer professionell.',
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      color: '#22c55e',
      bg: 'bg-green-500/10 border-green-500/20',
      title: 'WhatsApp / E-Mail Sequenzen',
      desc: 'Mehrstufige Kommunikation auf den Kanälen, die Ihre Kunden tatsächlich nutzen — automatisiert und personalisiert.',
    },
    {
      id: 'reviews',
      icon: Star,
      color: '#f97316',
      bg: 'bg-orange-500/10 border-orange-500/20',
      title: 'Google-Bewertungen automatisch anfragen',
      desc: 'Nach jeder abgeschlossenen Dienstleistung wird eine Bewertungsanfrage ausgelöst — mehr Sterne, mehr Vertrauen, mehr Neukunden.',
    },
  ],
  en: [
    {
      id: 'abandoned',
      icon: ShoppingCart,
      color: '#3b82f6',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Abandoned Cart Flow',
      desc: 'Automatically follow up with prospects who left without booking — via WhatsApp & email until they convert.',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#10b981',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Appointment Booking',
      desc: 'Automate reminders, confirmations, and no-show follow-ups. Always on time, always professional.',
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      color: '#22c55e',
      bg: 'bg-green-500/10 border-green-500/20',
      title: 'WhatsApp / Email',
      desc: 'Multi-channel sequences that meet customers where they are — automated and personalised at every step.',
    },
    {
      id: 'reviews',
      icon: Star,
      color: '#f97316',
      bg: 'bg-orange-500/10 border-orange-500/20',
      title: 'Google Review Requests',
      desc: 'Trigger review requests after every completed service. More stars, more trust, more new customers.',
    },
  ],
  ar: [
    {
      id: 'abandoned',
      icon: ShoppingCart,
      color: '#3b82f6',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'استعادة العملاء المترددين',
      desc: 'متابعة تلقائية مع كل من زار ولم يكمل الحجز — عبر واتساب والبريد حتى يتحول إلى عميل فعلي.',
    },
    {
      id: 'booking',
      icon: Calendar,
      color: '#10b981',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'حجز المواعيد تلقائياً',
      desc: 'تذكيرات، تأكيدات، وتقليل حالات الغياب — بدون أي جهد يدوي. دائماً في الوقت المناسب.',
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      color: '#22c55e',
      bg: 'bg-green-500/10 border-green-500/20',
      title: 'واتساب والبريد الإلكتروني',
      desc: 'تسلسلات متعددة القنوات تلتقي بالعملاء حيث هم — مؤتمتة ومخصصة في كل خطوة.',
    },
    {
      id: 'reviews',
      icon: Star,
      color: '#f97316',
      bg: 'bg-orange-500/10 border-orange-500/20',
      title: 'طلبات تقييم Google',
      desc: 'يُطلق طلب التقييم بعد كل خدمة مكتملة — المزيد من النجوم يعني المزيد من الثقة والعملاء الجدد.',
    },
  ],
};

const sectionText = {
  de: {
    badge: 'Automation live erleben',
    title: 'Ihr Automation',
    titleGradient: 'Flow visualisiert',
    subtitle: 'Jeder Schritt ist automatisiert. Jeder Lead wird erfasst. Jede Nachricht gesendet — ohne dass Sie einen Finger rühren müssen.',
  },
  en: {
    badge: 'See it live',
    title: 'Your Automation',
    titleGradient: 'Flow Visualised',
    subtitle: 'Every step is automated. Every lead is captured. Every follow-up is sent — without you touching a thing.',
  },
  ar: {
    badge: 'شاهد الأتمتة مباشرة',
    title: 'تدفق أتمتتك',
    titleGradient: 'مرئياً أمامك',
    subtitle: 'كل خطوة مؤتمتة. كل عميل يُسجَّل. كل رسالة تُرسَل — دون أن تتدخل بشيء.',
  },
};

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

const PULSE = 1.8;

function AgentNode({ lang }: { lang?: string }) {
  const label = lang === 'ar' ? 'AI Agent' : 'AI Agent';
  const sub = lang === 'ar' ? 'يحلل ويقرر' : lang === 'en' ? 'Thinks & decides' : 'Denkt & entscheidet';
  return (
    <motion.div
      className="flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2"
        style={{
          borderColor: '#a78bfa90',
          background: 'linear-gradient(135deg, #7c3aed18, #a78bfa22)',
          backdropFilter: 'blur(8px)',
        }}
        animate={{
          boxShadow: [
            '0 0 0px rgba(167,139,250,0.2)',
            '0 0 32px rgba(167,139,250,0.6)',
            '0 0 0px rgba(167,139,250,0.2)',
          ],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          boxShadow: { duration: PULSE * 0.9, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent 60%, rgba(167,139,250,0.4) 80%, transparent 100%)',
          }}
        />
        <Brain className="h-6 w-6 sm:h-7 sm:w-7 relative z-10" style={{ color: '#a78bfa' }} />
        <motion.span
          className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full flex items-center justify-center z-10"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
        </motion.span>
      </motion.div>
      <div className="text-center">
        <p className="text-[11px] sm:text-xs font-bold text-white leading-snug">{label}</p>
        <p className="text-[9px] sm:text-[10px] text-gray-500 leading-snug">{sub}</p>
      </div>
    </motion.div>
  );
}

interface NodePos { x: number; y: number; r: number; }
interface AgentPos { x: number; y: number; w: number; h: number; }
interface ConnPaths { agentPaths: string[]; hRow0: { x1:number;y1:number;x2:number;y2:number }[]; hRow1: { x1:number;y1:number;x2:number;y2:number }[]; svgW: number; svgH: number; }

function pointOnCircle(cx: number, cy: number, r: number, toX: number, toY: number) {
  const dx = toX - cx; const dy = toY - cy;
  const len = Math.sqrt(dx*dx + dy*dy);
  return { x: cx + (dx/len)*r, y: cy + (dy/len)*r };
}

function pointOnRect(ax: number, ay: number, hw: number, hh: number, fromX: number, fromY: number) {
  const dx = fromX - ax; const dy = fromY - ay;
  if (dx === 0 && dy === 0) return { x: ax, y: ay };
  const scaleX = dx !== 0 ? hw / Math.abs(dx) : Infinity;
  const scaleY = dy !== 0 ? hh / Math.abs(dy) : Infinity;
  const s = Math.min(scaleX, scaleY);
  return { x: ax + dx*s, y: ay + dy*s };
}

function curvePath(sx: number, sy: number, ex: number, ey: number) {
  const dy = ey - sy;
  const t = Math.abs(dy) * 0.55;
  const dirY = dy >= 0 ? 1 : -1;
  return `M ${sx} ${sy} C ${sx} ${sy + dirY * t}, ${ex} ${ey - dirY * t}, ${ex} ${ey}`;
}

function NodeGraph({ steps, lang }: { steps: FlowStep[]; lang?: string }) {
  const COL = 3;
  const row0Steps = steps.slice(0, COL);
  const row1Steps = steps.slice(COL, COL * 2);

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agentRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<ConnPaths | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current || !agentRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const agentBox = agentRef.current.getBoundingClientRect();

    const agent: AgentPos = {
      x: agentBox.left - box.left + agentBox.width / 2,
      y: agentBox.top  - box.top  + agentBox.height / 2,
      w: agentBox.width,
      h: agentBox.height,
    };

    const nodes: NodePos[] = circleRefs.current.map(el => {
      if (!el) return { x: 0, y: 0, r: 0 };
      const b = el.getBoundingClientRect();
      return {
        x: b.left - box.left + b.width  / 2,
        y: b.top  - box.top  + b.height / 2,
        r: b.width / 2,
      };
    });

    const agentPaths = nodes.map((n, i) => {
      if (n.r === 0) return '';
      const isRow0 = i < COL;
      const sx = n.x;
      const sy = isRow0 ? n.y + n.r : n.y - n.r;
      const ex = agent.x;
      const ey = isRow0 ? agent.y - agent.h / 2 : agent.y + agent.h / 2;
      return curvePath(sx, sy, ex, ey);
    });

    const hRow0 = row0Steps.slice(0,-1).map((_, ci) => {
      const a = nodes[ci];   const b = nodes[ci+1];
      if (!a || !b || a.r === 0) return { x1:0,y1:0,x2:0,y2:0 };
      const start = pointOnCircle(a.x, a.y, a.r, b.x, b.y);
      const end   = pointOnCircle(b.x, b.y, b.r, a.x, a.y);
      return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
    });

    const hRow1 = row1Steps.slice(0,-1).map((_, ci) => {
      const a = nodes[COL+ci];   const b = nodes[COL+ci+1];
      if (!a || !b || a.r === 0) return { x1:0,y1:0,x2:0,y2:0 };
      const start = pointOnCircle(a.x, a.y, a.r, b.x, b.y);
      const end   = pointOnCircle(b.x, b.y, b.r, a.x, a.y);
      return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
    });

    setPaths({ agentPaths, hRow0, hRow1, svgW: box.width, svgH: box.height });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  function renderRow(rowSteps: FlowStep[], rowOffset: number) {
    return (
      <div className="flex items-stretch w-full">
        {rowSteps.map((step, colIdx) => {
          const i = rowOffset + colIdx;
          const Icon = step.icon;
          const delay = i * PULSE * 0.55;
          return (
            <motion.div
              key={step.id}
              className="flex flex-col items-center gap-2.5 py-5 flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <div ref={el => { circleRefs.current[i] = el; }} className="inline-flex">
                <motion.div
                  className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2"
                  style={{ borderColor: step.color + '70', backgroundColor: step.color + '12' }}
                  animate={{ boxShadow: [`0 0 0px ${step.glow}`,`0 0 28px ${step.glow}`,`0 0 0px ${step.glow}`] }}
                  transition={{ duration: PULSE, repeat: Infinity, delay, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: step.color }} />
                  <span
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center z-10"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </span>
                </motion.div>
              </div>
              <div className="text-center px-1">
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{step.label}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-snug">{step.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {renderRow(row0Steps, 0)}
      <div style={{ height: 64 }} />
      {renderRow(row1Steps, COL)}

      {paths && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={paths.svgW}
          height={paths.svgH}
          viewBox={`0 0 ${paths.svgW} ${paths.svgH}`}
          fill="none"
          style={{ top: 0, left: 0 }}
        >
          {paths.hRow0.map((seg, ci) => {
            const mx = (seg.x1 + seg.x2) / 2;
            const my = seg.y1 - Math.abs(seg.x2 - seg.x1) * 0.04;
            const d = `M ${seg.x1} ${seg.y1} Q ${mx} ${my}, ${seg.x2} ${seg.y2}`;
            return (
              <motion.path
                key={`h0-${ci}`}
                d={d}
                stroke={row0Steps[ci].color}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: PULSE, repeat: Infinity, delay: ci * PULSE * 0.4, ease: 'easeInOut' }}
                style={{ filter: `drop-shadow(0 0 4px ${row0Steps[ci].color})` }}
              />
            );
          })}

          {paths.hRow1.map((seg, ci) => {
            const mx = (seg.x1 + seg.x2) / 2;
            const my = seg.y1 + Math.abs(seg.x2 - seg.x1) * 0.04;
            const d = `M ${seg.x1} ${seg.y1} Q ${mx} ${my}, ${seg.x2} ${seg.y2}`;
            return (
              <motion.path
                key={`h1-${ci}`}
                d={d}
                stroke={row1Steps[ci].color}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: PULSE, repeat: Infinity, delay: (COL + ci) * PULSE * 0.4, ease: 'easeInOut' }}
                style={{ filter: `drop-shadow(0 0 4px ${row1Steps[ci].color})` }}
              />
            );
          })}

          {paths.agentPaths.map((d, i) => (
            <motion.path
              key={`ac-${steps[i].id}`}
              d={d}
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: [0.15, 0.72, 0.15] }}
              transition={{ duration: PULSE * 1.2, repeat: Infinity, delay: i * PULSE * 0.22, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(167,139,250,0.9))' }}
            />
          ))}
        </svg>
      )}

      <div
        className="absolute left-1/2 z-20"
        style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div ref={agentRef}>
          <AgentNode lang={lang} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  lang: Lang;
  customSteps?: FlowStep[];
  customCards?: FlowCard[];
  customText?: FlowSectionText;
}

export function AutomationFlowSection({ lang, customSteps, customCards, customText }: Props) {
  const rtl = isRTL(lang);
  const t = customText ?? (sectionText[lang] ?? sectionText.de);
  const steps = customSteps ?? (flowSteps[lang] ?? flowSteps.de);
  const cards = customCards ?? (flowCards[lang] ?? flowCards.de);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section
      dir={rtl ? 'rtl' : 'ltr'}
      className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SectionHeader
            badge={t.badge}
            title={t.title}
            titleGradient={t.titleGradient}
            subtitle={t.subtitle}
          />
        </div>

        {/* Live Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 bg-[#060a12] overflow-hidden mb-12"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[11px] font-mono text-gray-500 hidden sm:block">
                {lang === 'ar' ? 'سير-عمل-الأتمتة.تدفق' : 'automation-workflow.flow'}
              </span>
            </div>
            <LiveIndicator lang={lang} />
          </div>

          {/* Node Graph — always LTR layout, fixed direction */}
          <div className="px-4 pt-8 pb-6" dir="ltr">
            <NodeGraph steps={steps} lang={lang} />
          </div>

          {/* Bottom label row */}
          <div className="px-5 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="h-2 w-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-widest">
                {lang === 'ar' ? 'يعمل الآن' : lang === 'en' ? 'Running live' : 'Läuft live'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-600">
              {lang === 'ar' ? 'كل خطوة تلقائية ١٠٠٪' : lang === 'en' ? '100% automated, 0 manual steps' : '100% automatisiert, 0 manuelle Schritte'}
            </span>
          </div>
        </motion.div>

        {/* Use-case cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isActive = activeCard === card.id;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                onClick={() => setActiveCard(isActive ? null : card.id)}
                className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${card.bg} ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                style={{
                  boxShadow: isActive ? `0 0 30px ${card.color}30` : 'none',
                }}
              >
                <div className={`flex items-start gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: card.color + '18', borderColor: card.color + '40' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: card.color }} />
                  </div>
                  <div className={rtl ? 'text-right' : ''}>
                    <p className="text-sm font-bold text-white leading-snug mb-1">{card.title}</p>
                    <AnimatePresence>
                      <motion.p
                        className="text-xs text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.desc}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LiveIndicator({ lang }: { lang: Lang }) {
  const label = lang === 'ar' ? 'مباشر' : lang === 'en' ? 'Live' : 'Live';
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-blue-500/60"
            animate={{ height: [4, 12 + Math.random() * 8, 4] }}
            transition={{
              duration: 0.7 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
