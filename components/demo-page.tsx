'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot, ArrowRight, CircleCheck as CheckCircle,
  Phone, Mail, MessageSquare, Sparkles, Zap, Shield, Clock,
} from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import { useChatWidget } from '@/lib/chat-context';
import type { Lang } from '@/lib/i18n';

const t = {
  de: {
    badge: 'Live Demo',
    title: 'Testen Sie unseren',
    titleGradient: 'KI-Assistenten',
    subtitle: 'Sprechen Sie direkt mit unserem KI-Assistenten und erfahren Sie, wie wir Ihren Betrieb automatisieren können.',
    ctaTitle: 'Jetzt mit dem KI-Assistenten chatten',
    ctaSub: 'Unser Assistent ist live und bereit. Stellen Sie jetzt Ihre erste Frage.',
    ctaBtn: 'Chat starten',
    features: [
      { icon: Zap, label: 'Sofortige Antworten', desc: 'Keine Wartezeit — der Assistent antwortet in Echtzeit.' },
      { icon: Bot, label: 'KI-gestützt', desc: 'Trainiert auf Ihre Branche und Ihren Anwendungsfall.' },
      { icon: Shield, label: 'DSGVO-konform', desc: 'Ihre Daten sind sicher und werden nicht weitergegeben.' },
      { icon: Clock, label: '24/7 verfügbar', desc: 'Immer erreichbar — auch nachts und am Wochenende.' },
    ],
    leadTitle: 'Kostenlose Beratung anfragen',
    leadSub: 'Hinterlassen Sie Ihre Kontaktdaten — wir melden uns innerhalb von 24 Stunden.',
    nameLabel: 'Ihr Name',
    emailLabel: 'E-Mail Adresse',
    companyLabel: 'Unternehmen / Branche',
    messageLabel: 'Was möchten Sie automatisieren?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max@beispiel.de',
    companyPlaceholder: 'Restaurant Bella Vista',
    messagePlaceholder: 'Ich betreibe ein Restaurant und möchte Reservierungen automatisieren...',
    submitBtn: 'Kostenlose Beratung anfragen',
    successTitle: 'Anfrage gesendet!',
    successMsg: 'Wir melden uns innerhalb von 24 Stunden. Bis dahin können Sie unsere Pakete ansehen.',
    viewPackages: 'Pakete ansehen',
    trust: ['DSGVO-konform', 'Kostenlos & unverbindlich', 'Antwort in 24h'],
  },
  en: {
    badge: 'Live Demo',
    title: 'Try our',
    titleGradient: 'AI Assistant',
    subtitle: 'Chat directly with our AI assistant and discover how we can automate your business.',
    ctaTitle: 'Chat with the AI Assistant Now',
    ctaSub: 'Our assistant is live and ready. Ask your first question right now.',
    ctaBtn: 'Start Chat',
    features: [
      { icon: Zap, label: 'Instant Replies', desc: 'No waiting — the assistant responds in real time.' },
      { icon: Bot, label: 'AI-Powered', desc: 'Trained on your industry and use case.' },
      { icon: Shield, label: 'GDPR Compliant', desc: 'Your data is secure and never shared.' },
      { icon: Clock, label: '24/7 Available', desc: 'Always reachable — nights and weekends included.' },
    ],
    leadTitle: 'Request Free Consultation',
    leadSub: "Leave your contact details — we'll get back to you within 24 hours.",
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    companyLabel: 'Business / Industry',
    messageLabel: 'What would you like to automate?',
    namePlaceholder: 'John Smith',
    emailPlaceholder: 'john@example.com',
    companyPlaceholder: 'Restaurant Bella Vista',
    messagePlaceholder: 'I run a restaurant and want to automate reservations...',
    submitBtn: 'Request Free Consultation',
    successTitle: 'Request sent!',
    successMsg: "We'll get back to you within 24 hours. In the meantime, check out our packages.",
    viewPackages: 'View packages',
    trust: ['GDPR compliant', 'Free & no obligation', 'Reply within 24h'],
  },
};

interface Props {
  lang: Lang;
}

export function DemoPage({ lang }: Props) {
  const tx = t[lang];
  const prefix = lang === 'en' ? '/en' : '';
  const { open } = useChatWidget();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message, source: 'demo' }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <RevealSection className="text-center mb-14">
            <SectionHeader
              badge={tx.badge}
              title={tx.title}
              titleGradient={tx.titleGradient}
              subtitle={tx.subtitle}
            />
          </RevealSection>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Chat CTA */}
            <div className="space-y-6">
              <GlassCard className="p-8 flex flex-col items-center text-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                  <Bot className="h-10 w-10 text-white" />
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#0a0e1a]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tx.ctaTitle}</h3>
                <p className="text-sm text-gray-400 mb-8 max-w-sm">{tx.ctaSub}</p>
                <Button
                  onClick={open}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-5 text-base w-full max-w-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  {tx.ctaBtn}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </GlassCard>

              <StaggerContainer className="grid grid-cols-2 gap-3">
                {tx.features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <StaggerItem key={feature.label}>
                      <GlassCard className="p-4">
                        <Icon className="h-5 w-5 text-blue-400 mb-2" />
                        <p className="text-sm font-semibold text-white mb-1">{feature.label}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                      </GlassCard>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* Lead Form */}
            <div className="space-y-6">
              <GlassCard className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{tx.successTitle}</h3>
                      <p className="text-gray-400 text-sm mb-6">{tx.successMsg}</p>
                      <Link href={`${prefix}/pricing`}>
                        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                          {tx.viewPackages}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
                          <Sparkles className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{tx.leadTitle}</h3>
                          <p className="text-xs text-gray-500">{tx.leadSub}</p>
                        </div>
                      </div>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.nameLabel}</label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={tx.namePlaceholder}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                            {tx.emailLabel} *
                          </label>
                          <Input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={tx.emailPlaceholder}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.companyLabel}</label>
                          <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder={tx.companyPlaceholder}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.messageLabel}</label>
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={tx.messagePlaceholder}
                            rows={3}
                            className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 resize-none"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-5 transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]"
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              {lang === 'de' ? 'Wird gesendet...' : 'Sending...'}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {tx.submitBtn}
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                      <div className="mt-4 flex flex-wrap gap-3 justify-center">
                        {tx.trust.map((item) => (
                          <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Phone, label: lang === 'de' ? 'Anrufen' : 'Call', href: 'tel:+4917656565322', color: 'text-emerald-400' },
                  { icon: MessageSquare, label: 'WhatsApp', href: 'https://wa.me/4917656565322', color: 'text-emerald-400' },
                  { icon: Mail, label: lang === 'de' ? 'E-Mail' : 'Email', href: 'mailto:hello@ovivo.io', color: 'text-blue-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="glass rounded-xl p-3 flex flex-col items-center gap-2 border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
                    >
                      <Icon className={`h-5 w-5 ${item.color}`} />
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
