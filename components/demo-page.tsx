'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot, Send, User, Sparkles, ArrowRight, CircleCheck as CheckCircle,
  Phone, Mail, Calendar, MessageSquare, Zap, X
} from 'lucide-react';
import { GlassCard, RevealSection } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const demoResponses = {
  de: [
    {
      triggers: ['hallo', 'hi', 'guten tag', 'guten morgen', 'hey'],
      response: 'Hallo! Ich bin der KI-Assistent von Ovivo. Ich helfe Ihnen dabei, mehr über unsere Automation-Lösungen für Ihr Unternehmen zu erfahren. Für welche Branche suchen Sie eine Lösung — Restaurant, Café oder Serviceunternehmen?',
    },
    {
      triggers: ['restaurant', 'gastronomie', 'essen'],
      response: 'Perfekt! Für Restaurants bieten wir:\n\n✓ Automatische Tischreservierungen (24/7)\n✓ WhatsApp-Automation für Gästekommunikation\n✓ Event-Promotion an Stammgäste\n✓ CRM & Follow-up System\n\nUnsere Restaurant-Kunden sparen durchschnittlich 2 Stunden täglich und steigern ihren Umsatz um 35%. Soll ich Ihnen ein konkretes Angebot erstellen?',
    },
    {
      triggers: ['café', 'cafe', 'kaffee', 'bäckerei'],
      response: 'Für Cafés haben wir spezialisierte Lösungen:\n\n✓ KI beantwortet Menü-Fragen sofort\n✓ Vorbestellungen automatisch verwalten\n✓ Stammgast-Treueprogramm\n✓ Automatische Tagesspecials per WhatsApp\n\nEin Café in Hamburg steigerte die Stammkundenbesuche um 40% in den ersten 3 Monaten. Interessiert Sie das?',
    },
    {
      triggers: ['service', 'friseur', 'fitness', 'praxis', 'handwerk', 'termin'],
      response: 'Für Serviceunternehmen setzen wir auf:\n\n✓ Automatische Online-Terminbuchung\n✓ Lead Capture (kein Interessent geht verloren)\n✓ WhatsApp Support rund um die Uhr\n✓ CRM mit automatischen Follow-ups\n\nUnsere Kunden berichten von +45% mehr Buchungen nach der Implementierung. Welche Art von Servicebetrieb führen Sie?',
    },
    {
      triggers: ['preis', 'kosten', 'wie viel', 'was kostet', 'preise', 'pakete'],
      response: 'Unsere Pakete:\n\n🔹 Starter (ab €1.200 Setup + €120/Monat)\nKI-Chatbot, Lead Capture, WhatsApp Integration\n\n🔷 Business (ab €2.200 Setup + €220/Monat)\nErweiterter Chatbot, Buchungssystem, CRM\n\n🔶 Full Automation (ab €3.200 Setup + €450/Monat)\nKomplettes System inkl. Marketing Automation\n\nDer genaue Preis hängt von Ihrer Betriebsgröße ab. Eine kostenlose Beratung zeigt Ihnen, welches Paket optimal ist.',
    },
    {
      triggers: ['wie lange', 'wie schnell', 'setup', 'einrichtung', 'dauer'],
      response: 'Die Einrichtung dauert in der Regel 5–14 Werktage, je nach Paket:\n\n• Starter: 5–7 Tage\n• Business: 7–10 Tage\n• Full Automation: 10–14 Tage\n\nSie benötigen kein technisches Wissen — wir kümmern uns um alles von der Einrichtung bis zur Schulung Ihres Teams.',
    },
    {
      triggers: ['beratung', 'kontakt', 'anfrage', 'besprechen', 'gespräch'],
      response: 'Gerne! Eine kostenlose Beratung ist der beste erste Schritt. In 30 Minuten analysieren wir Ihren Betrieb und erstellen einen konkreten Automation-Plan.\n\nSie können direkt über unser Kontaktformular oder WhatsApp anfragen. Hinterlassen Sie auch gerne Ihren Namen und Ihre E-Mail unten — wir melden uns innerhalb von 24 Stunden.',
    },
    {
      triggers: ['whatsapp', 'messaging', 'nachrichten'],
      response: 'WhatsApp ist eines unserer stärksten Automation-Tools! Wir richten ein:\n\n✓ Automatische Antworten auf häufige Fragen\n✓ Buchungsbestätigungen und -erinnerungen\n✓ Broadcast-Listen für Angebote & Events\n✓ Lead-Qualifizierung via Chat\n\nAlles DSGVO-konform und vollständig auf Deutsch. Möchten Sie eine Demo sehen?',
    },
  ],
  en: [
    {
      triggers: ['hello', 'hi', 'good morning', 'hey'],
      response: "Hello! I'm Ovivo's AI assistant. I help you learn about our automation solutions for your business. Which industry are you in — restaurant, café, or service business?",
    },
    {
      triggers: ['restaurant', 'hospitality', 'food'],
      response: "Perfect! For restaurants we offer:\n\n✓ Automatic table reservations (24/7)\n✓ WhatsApp automation for guest communication\n✓ Event promotion to regular guests\n✓ CRM & follow-up system\n\nOur restaurant clients save an average of 2 hours daily and increase revenue by 35%. Want me to put together a concrete proposal?",
    },
    {
      triggers: ['café', 'cafe', 'coffee', 'bakery'],
      response: "For cafés we have specialized solutions:\n\n✓ AI instantly answers menu questions\n✓ Automatically manage pre-orders\n✓ Regular customer loyalty program\n✓ Automatic daily specials via WhatsApp\n\nA café in Hamburg increased regular customer visits by 40% in the first 3 months. Interested?",
    },
    {
      triggers: ['service', 'hair', 'fitness', 'clinic', 'trades', 'appointment'],
      response: "For service businesses we focus on:\n\n✓ Automatic online appointment booking\n✓ Lead capture (no prospect lost)\n✓ WhatsApp support around the clock\n✓ CRM with automatic follow-ups\n\nOur clients report +45% more bookings after implementation. What type of service business do you run?",
    },
    {
      triggers: ['price', 'cost', 'how much', 'pricing', 'packages'],
      response: "Our packages:\n\n🔹 Starter (from €1,200 setup + €120/month)\nAI chatbot, lead capture, WhatsApp integration\n\n🔷 Business (from €2,200 setup + €220/month)\nAdvanced chatbot, booking system, CRM\n\n🔶 Full Automation (from €3,200 setup + €450/month)\nComplete system including marketing automation\n\nThe exact price depends on your business size. A free consultation will show you which package is optimal.",
    },
    {
      triggers: ['how long', 'how fast', 'setup', 'installation', 'duration'],
      response: "Setup typically takes 5–14 business days depending on the package:\n\n• Starter: 5–7 days\n• Business: 7–10 days\n• Full Automation: 10–14 days\n\nNo technical knowledge required — we handle everything from setup to training your team.",
    },
    {
      triggers: ['consultation', 'contact', 'inquiry', 'discuss', 'call'],
      response: "Of course! A free consultation is the best first step. In 30 minutes we analyze your business and create a concrete automation plan.\n\nYou can inquire directly via our contact form or WhatsApp. You can also leave your name and email below — we'll get back to you within 24 hours.",
    },
    {
      triggers: ['whatsapp', 'messaging', 'messages'],
      response: "WhatsApp is one of our most powerful automation tools! We set up:\n\n✓ Automatic replies to common questions\n✓ Booking confirmations and reminders\n✓ Broadcast lists for offers & events\n✓ Lead qualification via chat\n\nAll GDPR-compliant and fully configured. Want to see a demo?",
    },
  ],
};

const defaultResponses = {
  de: 'Das ist eine gute Frage! Für eine detaillierte Antwort empfehle ich eine kostenlose Beratung. Unser Team erklärt Ihnen genau, wie wir Ihre spezifischen Herausforderungen lösen können. Haben Sie noch weitere Fragen zur KI-Automation?',
  en: "That's a great question! For a detailed answer, I recommend a free consultation. Our team will explain exactly how we can solve your specific challenges. Do you have any other questions about AI automation?",
};

const quickPrompts = {
  de: [
    'Was kostet eine Automation?',
    'Wie funktioniert WhatsApp Automation?',
    'Für Restaurants geeignet?',
    'Wie schnell ist die Einrichtung?',
  ],
  en: [
    'What does automation cost?',
    'How does WhatsApp automation work?',
    'Suitable for restaurants?',
    'How fast is the setup?',
  ],
};

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
    send: 'Senden',
    quickLabel: 'Schnellfragen:',
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
    send: 'Send',
    quickLabel: 'Quick questions:',
    leadTitle: 'Request Free Consultation',
    leadSub: 'Leave your contact details — we\'ll get back to you within 24 hours.',
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
    successMsg: 'We\'ll get back to you within 24 hours. In the meantime, check out our packages.',
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
      content: lang === 'de'
        ? 'Hallo! Ich bin der KI-Assistent von Ovivo. Ich helfe Ihnen dabei, mehr über unsere Automation-Lösungen zu erfahren. Für welche Branche oder welches Thema interessieren Sie sich?'
        : "Hello! I'm Ovivo's AI assistant. I'm here to help you learn about our automation solutions. What industry or topic are you interested in?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function getResponse(userMsg: string): string {
    const lower = userMsg.toLowerCase();
    const responses = demoResponses[lang];
    for (const item of responses) {
      if (item.triggers.some((t) => lower.includes(t))) {
        return item.response;
      }
    }
    return defaultResponses[lang];
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
    const response = getResponse(userMsg);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
  }

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
              {/* Chat Header */}
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/10 border border-white/10'}`}>
                      {msg.role === 'assistant'
                        ? <Bot className="h-4 w-4 text-blue-400" />
                        : <User className="h-4 w-4 text-gray-400" />
                      }
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-blue-500 text-white'}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
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

              {/* Quick prompts */}
              <div className="px-5 py-2 border-t border-white/5">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">{tx.quickLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts[lang].map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-xs text-gray-400 border border-white/10 rounded-full px-2.5 py-1 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-5 pb-5 pt-3 border-t border-white/10">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
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
                    disabled={!input.trim() || isTyping}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-3 disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
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
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tx.emailLabel} *</label>
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

              {/* Contact options */}
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
