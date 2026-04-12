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

          {/* Steps grid */}
          <div className="px-6 pt-8 pb-6">
            {/* Mobile: single column vertical flow */}
            <div className="flex flex-col sm:hidden gap-0">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLastStep = i === steps.length - 1;
                const PULSE_DURATION = 1.8;
                const stepDelay = i * PULSE_DURATION * 0.55;
                return (
                  <div key={step.id} className="flex flex-col items-stretch">
                    <motion.div
                      className="relative flex items-center gap-4 rounded-xl border p-4"
                      style={{
                        borderColor: step.color + '30',
                        backgroundColor: step.color + '0a',
                      }}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <motion.div
                        className="relative flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl border-2"
                        style={{
                          borderColor: step.color + '60',
                          backgroundColor: step.color + '15',
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 0px ${step.glow}`,
                            `0 0 20px ${step.glow}`,
                            `0 0 0px ${step.glow}`,
                          ],
                        }}
                        transition={{
                          duration: PULSE_DURATION,
                          repeat: Infinity,
                          delay: stepDelay,
                          ease: 'easeInOut',
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                        <span
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                          style={{ backgroundColor: step.color }}
                        >
                          {i + 1}
                        </span>
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white leading-snug">{step.label}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{step.sub}</p>
                      </div>
                    </motion.div>

                    {!isLastStep && (
                      <div className="flex justify-center py-1">
                        <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
                          <motion.line
                            x1="8" y1="0" x2="8" y2="20"
                            stroke={step.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                            transition={{
                              duration: PULSE_DURATION,
                              repeat: Infinity,
                              delay: stepDelay + PULSE_DURATION * 0.35,
                              ease: 'easeOut',
                              times: [0, 0.55, 1],
                            }}
                          />
                          <motion.polyline
                            points="4,16 8,22 12,16"
                            stroke={step.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 1, 1] }}
                            transition={{
                              duration: PULSE_DURATION,
                              repeat: Infinity,
                              delay: stepDelay + PULSE_DURATION * 0.35,
                              times: [0, 0.5, 0.65, 1],
                            }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop: 3-column grid */}
            <div className="hidden sm:grid grid-cols-3 gap-x-0 gap-y-0">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const col = i % 3;
                const row = Math.floor(i / 3);
                const totalRows = Math.ceil(steps.length / 3);
                const isLastInRow = col === 2;
                const isLastRow = row === totalRows - 1;
                const isLastStep = i === steps.length - 1;
                const PULSE_DURATION = 1.8;
                const stepDelay = i * PULSE_DURATION * 0.55;

                return (
                  <div key={step.id} className="contents">
                    <motion.div
                      className="relative m-2 flex items-center gap-3 rounded-xl border p-4 overflow-visible"
                      style={{
                        borderColor: step.color + '25',
                        backgroundColor: step.color + '08',
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="relative flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl border-2"
                        style={{
                          borderColor: step.color + '60',
                          backgroundColor: step.color + '15',
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 0px ${step.glow}`,
                            `0 0 20px ${step.glow}`,
                            `0 0 0px ${step.glow}`,
                          ],
                        }}
                        transition={{
                          duration: PULSE_DURATION,
                          repeat: Infinity,
                          delay: stepDelay,
                          ease: 'easeInOut',
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                        <span
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                          style={{ backgroundColor: step.color }}
                        >
                          {i + 1}
                        </span>
                      </motion.div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white leading-snug">{step.label}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{step.sub}</p>
                      </div>

                      {!isLastInRow && !isLastStep && (
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 flex items-center w-8 overflow-hidden">
                          <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className="w-full">
                            <motion.line
                              x1="0" y1="8" x2="24" y2="8"
                              stroke={step.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                              transition={{
                                duration: PULSE_DURATION,
                                repeat: Infinity,
                                delay: stepDelay + PULSE_DURATION * 0.3,
                                ease: 'easeOut',
                                times: [0, 0.5, 1],
                              }}
                            />
                            <motion.polyline
                              points="20,4 26,8 20,12"
                              stroke={step.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0, 1, 1] }}
                              transition={{
                                duration: PULSE_DURATION,
                                repeat: Infinity,
                                delay: stepDelay + PULSE_DURATION * 0.3,
                                times: [0, 0.45, 0.6, 1],
                              }}
                            />
                          </svg>
                        </div>
                      )}

                      {isLastInRow && !isLastRow && !isLastStep && (
                        <div className="absolute -bottom-6 right-0 z-20 w-full">
                          <svg width="100%" height="24" viewBox="0 0 200 24" preserveAspectRatio="none" fill="none">
                            <motion.path
                              d="M 190 0 L 190 16 L 10 16"
                              stroke={step.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                              transition={{
                                duration: PULSE_DURATION,
                                repeat: Infinity,
                                delay: stepDelay + PULSE_DURATION * 0.35,
                                ease: 'easeOut',
                                times: [0, 0.6, 1],
                              }}
                            />
                            <motion.polyline
                              points="14,12 8,16 14,20"
                              stroke={step.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0, 1, 1] }}
                              transition={{
                                duration: PULSE_DURATION,
                                repeat: Infinity,
                                delay: stepDelay + PULSE_DURATION * 0.35,
                                times: [0, 0.55, 0.7, 1],
                              }}
                            />
                          </svg>
                        </div>
                      )}
                    </motion.div>
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
