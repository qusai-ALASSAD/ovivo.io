'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader as Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const OPENING_MESSAGE_DE: Message = {
  role: 'assistant',
  content: 'Hallo! 👋 Willkommen bei OVIVO.IO. Ich zeige Ihnen gerne, wie KI-Automation Ihr Unternehmen unterstützen kann. Was möchten Sie automatisieren?',
};

const OPENING_MESSAGE_EN: Message = {
  role: 'assistant',
  content: "Hello! 👋 Welcome to OVIVO.IO. I can show you how AI automation may help your business. What would you like to automate?",
};

const OPENING_MESSAGE_AR: Message = {
  role: 'assistant',
  content: 'مرحباً 👋 أهلاً بك في OVIVO.IO. يمكنني مساعدتك في استكشاف أتمتة أعمالك. ما العمليات التي ترغب بأتمتتها؟',
};

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

export function SalesChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [unread, setUnread] = useState(false);
  const messagesPaneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en') ?? false;
  const isAr = pathname?.startsWith('/ar') ?? false;
  const rtl = isAr;
  const isConsultationPage = pathname?.includes('/consultation') ?? false;

  const openingMessage = isEn ? OPENING_MESSAGE_EN : isAr ? OPENING_MESSAGE_AR : OPENING_MESSAGE_DE;

  const widgetLabel = isEn ? 'Chat with OVIVO AI' : isAr ? 'تحدث مع OVIVO AI' : 'Mit OVIVO AI chatten';
  const placeholderText = isEn ? 'Ask OVIVO AI a question…' : isAr ? 'اسأل OVIVO AI...' : 'Stellen Sie OVIVO AI Ihre Frage…';
  const headerTitle = 'OVIVO AI';
  const headerSubtitle = isEn ? 'Your automation guide' : isAr ? 'مساعدك للأتمتة الذكية' : 'Ihr digitaler Automationsberater';
  const availabilityLabel = isEn ? 'AI demo' : isAr ? 'تجربة ذكاء اصطناعي' : 'KI-Demo';
  const errorMsg = isEn
    ? 'Sorry, something went wrong. Please try again.'
    : isAr
    ? 'عذراً، حدث خطأ ما. يرجى المحاولة مجدداً.'
    : 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([openingMessage]);
    }
  }, [open]);

  useEffect(() => {
    if (!open && messages.length > 1) {
      setUnread(true);
    }
  }, [messages.length, open]);

  useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  useEffect(() => {
    const pane = messagesPaneRef.current;
    if (pane && open) pane.scrollTop = pane.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const saveLead = useCallback(async (lead: { name: string; company: string; email: string; phone: string }) => {
    if (leadSaved) return;
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lead.name, email: lead.email, company: [lead.company, lead.phone].filter(Boolean).join(' | ').slice(0,200), message: '', source: 'sales_chat' }),
      });
      if (!response.ok) throw new Error('Lead was not saved');
      setLeadSaved(true);
    } catch {
      // Keep the lead eligible for a later retry; never report a failed save as complete.
    }
  }, [leadSaved]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: 'sales',
          plan: 'free',
        }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMessage]);

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
        { role: 'assistant', content: errorMsg },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, saveLead, errorMsg]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isConsultationPage) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="ovivo-floating-chat fixed bottom-24 right-4 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[24px] border border-[#DCE5F7] bg-white shadow-[0_28px_75px_rgba(11,31,77,.18)] sm:right-6"
            style={{ height: 'min(560px,calc(100dvh - 120px))' }}
            dir={rtl ? 'rtl' : 'ltr'}
          >
            <div className="h-1 shrink-0 bg-gradient-to-r from-[#3B82F6] via-[#885CF6] to-[#3B82F6]" aria-hidden="true" />
            <div className={`flex shrink-0 items-center justify-between gap-3 border-b border-[#E6ECF8] bg-white px-5 py-4 ${rtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex min-w-0 items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DCE5F7] bg-[#F4F7FB] shadow-sm">
                  <img src="/ovivo-favicon.svg" alt="" className="h-10 w-10 object-contain" />
                </div>
                <div className={`min-w-0 ${rtl ? 'text-right' : ''}`}>
                  <p className="text-[17px] font-extrabold leading-tight tracking-tight text-[#0B1F4D]">{headerTitle}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#52647E]">{headerSubtitle}</p>
                  <div className={`mt-1 flex items-center gap-1.5 ${rtl ? 'flex-row-reverse justify-end' : ''}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                    <p className="text-[10px] font-semibold text-[#4264A0]">{availabilityLabel}</p>
                  </div>
                </div>
              </div>
              <button type="button"
                onClick={() => setOpen(false)}
                aria-label={isEn ? 'Close chat' : isAr ? 'إغلاق' : 'Chat schließen'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E0E7FF] bg-[#F8FAFF] text-[#52647E] transition-colors hover:border-[#BFD3F8] hover:bg-[#EAF2FF] hover:text-[#0B1F4D]"
              ><X className="h-4 w-4" /></button>
            </div>

            <div ref={messagesPaneRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#F6F8FD] px-4 py-5 sm:px-5" aria-live="polite">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? (rtl ? 'justify-start' : 'justify-end') : (rtl ? 'justify-end' : 'justify-start')}`}>
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-[18px] px-4 py-3 text-[13px] leading-[1.75] shadow-sm ${
                      msg.role === 'user'
                        ? `ovivo-floating-user bg-[#3B82F6] text-white ${rtl ? 'rounded-bl-sm' : 'rounded-br-sm'}`
                        : `bg-white text-[#0B1F4D] ${rtl ? 'rounded-br-sm' : 'rounded-bl-sm'} border border-[#DBE6F7]`
                    }`}
                    style={{ direction: rtl ? 'rtl' : 'ltr', textAlign: rtl ? 'right' : 'left' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className={`flex ${rtl ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-white border border-[#E0E7FF] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
            </div>

            <div className="shrink-0 border-t border-[#E0E7FF] bg-white px-4 pb-4 pt-3">
              <div className={`ovivo-floating-composer flex items-end gap-2 rounded-2xl border border-[#D8E4F7] bg-white px-3 py-2.5 shadow-[0_3px_14px_rgba(11,31,77,.045)] transition-colors focus-within:border-[#3B82F6] focus-within:ring-[3px] focus-within:ring-blue-500/10 ${rtl ? 'flex-row-reverse' : ''}`}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholderText}
                  rows={1}
                  dir={rtl ? 'rtl' : 'ltr'}
                  className="min-h-[34px] min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-1 py-1.5 text-sm leading-relaxed text-[#0B1F4D] placeholder:text-[#71829B] focus:outline-none"
                  style={{ scrollbarWidth: 'none' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  type="button" aria-label={isEn ? 'Send message' : isAr ? 'إرسال الرسالة' : 'Nachricht senden'} className="ovivo-floating-send flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_6px_14px_rgba(59,130,246,.20)] transition-colors hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className={`h-3.5 w-3.5 ${rtl ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.button
            key="close-btn"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#E0E7FF] hover:bg-[#F4F7FB] transition-all shadow-lg sm:bottom-6 sm:right-6" aria-label={isEn ? 'Close AI chat' : isAr ? 'إغلاق المحادثة' : 'KI-Chat schließen'}
          >
            <X className="h-5 w-5 text-[#0B1F4D]" />
          </motion.button>
        ) : (
          <motion.button
            key="open-btn"
            type="button"
            onClick={() => setOpen(true)}
            aria-label={widgetLabel}
            title={widgetLabel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="group fixed bottom-5 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_32px_rgba(59,130,246,.25)] ring-1 ring-[#E0E7FF] transition-shadow hover:shadow-[0_14px_40px_rgba(136,92,246,.32)] sm:bottom-6 sm:right-6"
          >
            <span className="ovivo-chat-orbit pointer-events-none absolute inset-[-4px] rounded-full" aria-hidden="true" />
            <img src="/ovivo-favicon.svg" alt="" className="relative z-10 h-12 w-12 rounded-full object-contain" />
            {unread && <span className="absolute right-0 top-0 z-20 h-3 w-3 rounded-full border-2 border-white bg-[#885CF6]" aria-hidden="true" />}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
