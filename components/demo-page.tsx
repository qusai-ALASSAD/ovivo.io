'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot, Send, User, Sparkles, ArrowRight, CircleCheck as CheckCircle,
  Phone, Mail, MessageSquare, Loader as Loader2,
} from 'lucide-react';
import { GlassCard, RevealSection } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function extractLead(text: string): { name: string; company: string; email: string; phone: string } | null {
  try {
    const match = text.match(/\{"lead"\s*:\s*\{[^}]+\}\s*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return parsed.lead ?? null;
    }
  } catch {}
  return null;
}

function stripLeadJson(text: string): string {
  return text.replace(/\{"lead"\s*:\s*\{[^}]+\}\s*\}/g, '').trim();
}

const t = {
  de: {
    badge: 'Live Demo',
    title: 'Testen Sie unseren',
    titleGradient: 'KI-Assistenten',
    subtitle: 'Sprechen Sie direkt mit unserem KI-Assistenten und erfahren Sie, wie wir Ihren Betrieb automatisieren können.',
    chatTitle: 'Ovivo KI-Assistent',
    chatSub: 'Fragen Sie mich alles über KI-Automation',
    online: 'Online',
    placeholder: 'Stellen Sie eine Frage...',
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
    chatTitle: 'Ovivo AI Assistant',
    chatSub: 'Ask me anything about AI automation',
    online: 'Online',
    placeholder: 'Ask a question...',
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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        lang === 'de'
          ? 'Hallo! Ich bin der Ovivo KI-Assistent. Welche Art von Unternehmen haben Sie?'
          : "Hello! I'm the Ovivo AI assistant. What type of business do you have?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveLead = useCallback(
    async (lead: { name: string; company: string; email: string; phone: string }) => {
      if (leadSaved) return;
      setLeadSaved(true);
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lead, message: '', source: 'demo_chat' }),
        });
      } catch {}
    },
    [leadSaved]
  );

  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg || loading) return;

      const userMessage: Message = { role: 'user', content: msg };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages, mode: 'sales', plan: 'free' }),
        });

        if (!res.ok || !res.body) throw new Error('API error');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: assistantText };
            return next;
          });
        }

        const lead = extractLead(assistantText);
        if (lead && lead.email) {
          saveLead(lead);
          const clean = stripLeadJson(assistantText);
          if (clean) {
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: 'assistant', content: clean };
              return next;
            });
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              lang === 'de'
                ? 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
                : 'Sorry, something went wrong. Please try again.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, saveLead, lang]
  );

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
            {/* Chat */}
            <GlassCard className="flex flex-col h-[600px] overflow-hidden p-0">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800">
                  <Bot className="h-5 w-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a0e1a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{tx.chatTitle}</p>
                  <p className="text-xs text-gray-500">{tx.chatSub}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-semibold">{tx.online}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'assistant'
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-white/10 border border-white/10'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-blue-400" />
                      ) : (
                        <User className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'assistant'
                          ? 'bg-white/5 border border-white/10 text-gray-300'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
                      <Bot className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-gray-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tx.placeholder}
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-3 disabled:opacity-40"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </GlassCard>

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
