'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader as Loader2, Bot } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const OPENING_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hallo! Ich bin der Ovivo KI-Assistent. Welche Art von Unternehmen haben Sie?',
};

const OPENING_MESSAGE_EN: Message = {
  role: 'assistant',
  content: 'Hello! I\'m the Ovivo AI assistant. What type of business do you have?',
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en') ?? false;

  const openingMessage = isEn ? OPENING_MESSAGE_EN : OPENING_MESSAGE;

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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const saveLead = useCallback(async (lead: { name: string; company: string; email: string; phone: string }) => {
    if (leadSaved) return;
    setLeadSaved(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, message: '', source: 'sales_chat' }),
      });
    } catch {}
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
        { role: 'assistant', content: isEn ? 'Sorry, something went wrong. Please try again.' : 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, saveLead, isEn]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ height: '480px' }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">Ovivo KI-Assistent</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-blue-100">{isEn ? 'Online' : 'Online'}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#0f1117]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white/8 text-gray-100 rounded-bl-sm border border-white/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-3 bg-[#0f1117] border-t border-white/10 flex-shrink-0">
              <div className="flex items-end gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isEn ? 'Type a message...' : 'Nachricht eingeben...'}
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 resize-none outline-none leading-relaxed max-h-24 overflow-y-auto"
                  style={{ scrollbarWidth: 'none' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-[#0f1117] animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
