'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, Zap, Mail, Calendar, TrendingUp, Star,
  ShoppingCart, Clock, MessageSquare, ArrowRight,
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

interface Props {
  lang: Lang;
}

export function AutomationFlowSection({ lang }: Props) {
  const rtl = isRTL(lang);
  const t = sectionText[lang] ?? sectionText.de;
  const steps = flowSteps[lang] ?? flowSteps.de;
  const cards = flowCards[lang] ?? flowCards.de;
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

          {/* Steps row */}
          <div className="px-6 pt-8 pb-6 overflow-x-auto">
            <div className="flex items-start gap-0 min-w-max mx-auto" style={{ direction: 'ltr' }}>
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className="flex flex-col items-center gap-3 w-[100px] sm:w-[120px]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2"
                        style={{
                          borderColor: step.color + '60',
                          backgroundColor: step.color + '15',
                        }}
                        whileHover={{
                          boxShadow: `0 0 30px ${step.glow}`,
                          scale: 1.08,
                          borderColor: step.color,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 0px ${step.glow}`,
                            `0 0 18px ${step.glow}`,
                            `0 0 0px ${step.glow}`,
                          ],
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2.2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'easeInOut',
                          },
                          scale: { duration: 0.2 },
                        }}
                      >
                        <Icon className="h-6 w-6" style={{ color: step.color }} />
                        <span
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                          style={{ backgroundColor: step.color }}
                        >
                          {i + 1}
                        </span>
                      </motion.div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-white leading-snug">{step.label}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{step.sub}</p>
                      </div>
                    </motion.div>

                    {i < steps.length - 1 && (
                      <div className="relative flex items-center justify-center w-10 sm:w-14 flex-shrink-0 mb-8">
                        <div className="w-full h-px bg-white/10" />
                        <motion.div
                          className="absolute w-full h-px origin-left"
                          style={{ backgroundColor: step.color }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.25 + 0.6, duration: 0.4, ease: 'easeOut' }}
                        />
                        <ArrowRight
                          className="absolute h-3.5 w-3.5 opacity-50"
                          style={{ color: step.color }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
