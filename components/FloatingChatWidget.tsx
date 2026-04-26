'use client';

import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type Lead = {
  name?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  channels?: string[];
  problem?: string;
};

const MEMORY_KEY = 'ovivo_chat_memory_v2';
const MEMORY_TTL_MS = 24 * 60 * 60 * 1000;

function createSessionId() {
  return `ovivo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'de';
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('en')) return 'en';
  return 'de';
}

function getCopy(lang: string) {
  if (lang === 'ar') {
    return {
      title: 'مساعد Ovivo',
      status: 'متصل',
      welcome: 'أهلًا! أنا مساعد Ovivo الذكي. أخبرني عن نوع عملك، وسأساعدك في معرفة كيف يمكن للأتمتة زيادة الطلبات وتنظيم الردود.',
      placeholder: 'اكتب رسالتك...',
      error: 'عذرًا، حدث خطأ مؤقت. حاول مرة أخرى.',
      newChat: 'محادثة جديدة',
    };
  }

  if (lang === 'en') {
    return {
      title: 'Ovivo Assistant',
      status: 'Online',
      welcome: 'Hello! I am Ovivo’s smart assistant. Tell me what type of business you run, and I will help you see how automation can bring more leads and faster replies.',
      placeholder: 'Type your message...',
      error: 'Sorry, a temporary error occurred. Please try again.',
      newChat: 'New chat',
    };
  }

  return {
    title: 'Ovivo Assistent',
    status: 'Online',
    welcome: 'Hallo! Ich bin der Ovivo Assistent. Erzählen Sie mir kurz, welche Art von Unternehmen Sie haben, und ich zeige Ihnen, wie Automatisierung mehr Anfragen und schnellere Antworten bringen kann.',
    placeholder: 'Ihre Nachricht...',
    error: 'Entschuldigung, es gab ein kurzes Problem. Bitte versuchen Sie es erneut.',
    newChat: 'Neuer Chat',
  };
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('de');
  const [sessionId, setSessionId] = useState('');
  const [lead, setLead] = useState<Lead>({});

  const copy = useMemo(() => getCopy(lang), [lang]);
  const isRtl = lang === 'ar';

  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    const now = Date.now();

    try {
      const saved = JSON.parse(localStorage.getItem(MEMORY_KEY) || 'null');
      if (saved?.expiresAt > now && saved?.sessionId) {
        setSessionId(saved.sessionId);
        setMessages(Array.isArray(saved.messages) ? saved.messages : []);
        setLead(saved.lead || {});
        setLang(saved.lang || detectedLang);
        return;
      }
    } catch {
      localStorage.removeItem(MEMORY_KEY);
    }

    const nextSessionId = createSessionId();
    setSessionId(nextSessionId);
    setLang(detectedLang);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    localStorage.setItem(
      MEMORY_KEY,
      JSON.stringify({
        sessionId,
        messages,
        lead,
        lang,
        expiresAt: Date.now() + MEMORY_TTL_MS,
      })
    );
  }, [sessionId, messages, lead, lang]);

  const resetChat = () => {
    const nextSessionId = createSessionId();
    setMessages([]);
    setLead({});
    setSessionId(nextSessionId);
    localStorage.setItem(
      MEMORY_KEY,
      JSON.stringify({
        sessionId: nextSessionId,
        messages: [],
        lead: {},
        lang,
        expiresAt: Date.now() + MEMORY_TTL_MS,
      })
    );
  };

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setInput('');
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          chatInput: userMessage,
          lang,
          sessionId: sessionId || createSessionId(),
          lead,
          history: nextMessages.slice(-10),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (data.sessionId) setSessionId(String(data.sessionId));
      if (data.lang) setLang(String(data.lang));
      if (data.lead) setLead(data.lead);

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: String(data.reply || data.text || copy.error) },
      ]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            right: 20,
            bottom: 92,
            width: 370,
            maxWidth: 'calc(100vw - 32px)',
            height: 510,
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 999999,
            background: '#0b1220',
            color: '#fff',
            borderRadius: 16,
            border: '1px solid rgba(59, 130, 246, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          <div
            style={{
              padding: 14,
              background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
              <div className="ovivo-chat-avatar"><MessageCircle size={20} /></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{copy.title}</div>
                <div style={{ fontSize: 12, color: '#86efac', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span className="ovivo-online-dot" /> {copy.status}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={resetChat} aria-label={copy.newChat} title={copy.newChat} className="ovivo-chat-icon-button">
                <RotateCcw size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close" title="Close" className="ovivo-chat-icon-button">
                <X size={17} />
              </button>
            </div>
          </div>

          <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#08111f' }}>
            {messages.length === 0 && <div className="ovivo-chat-bubble assistant">{copy.welcome}</div>}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? (isRtl ? 'flex-start' : 'flex-end') : (isRtl ? 'flex-end' : 'flex-start'),
                  marginBottom: 10,
                }}
              >
                <div className={`ovivo-chat-bubble ${message.role}`}>{message.content}</div>
              </div>
            ))}
            {isLoading && <div className="ovivo-chat-typing">...</div>}
          </div>

          <div style={{ padding: 14, background: '#0f172a', display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              value={input}
              disabled={isLoading}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') sendMessage();
              }}
              placeholder={copy.placeholder}
              style={{
                flex: 1,
                height: 46,
                minWidth: 0,
                background: '#020617',
                color: '#fff',
                border: '1px solid #334155',
                borderRadius: 12,
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                textAlign: isRtl ? 'right' : 'left',
              }}
            />
            <button onClick={sendMessage} disabled={!input.trim() || isLoading} aria-label="Send" className="ovivo-chat-send-button">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen((open) => !open)} aria-label={copy.title} className="ovivo-chat-launcher">
        {isOpen ? <X size={24} /> : <MessageCircle size={25} />}
        <span className="ovivo-chat-launcher-dot" />
      </button>

      <style jsx global>{`
        .ovivo-chat-launcher {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 999999;
          width: 58px;
          height: 58px;
          border: 0;
          border-radius: 18px;
          color: #fff;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ovivo-chat-launcher-dot,
        .ovivo-online-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18), 0 0 11px #22c55e;
        }
        .ovivo-chat-launcher-dot {
          position: absolute;
          right: 8px;
          top: 8px;
          border: 2px solid #fff;
        }
        .ovivo-chat-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ovivo-chat-icon-button,
        .ovivo-chat-send-button {
          border: 0;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ovivo-chat-icon-button {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.1);
        }
        .ovivo-chat-send-button {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #2563eb;
          flex-shrink: 0;
        }
        .ovivo-chat-send-button:disabled {
          cursor: not-allowed;
          background: #334155;
          opacity: 0.75;
        }
        .ovivo-chat-bubble {
          max-width: 86%;
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .ovivo-chat-bubble.user {
          background: #2563eb;
          color: #fff;
        }
        .ovivo-chat-bubble.assistant {
          background: #111827;
          color: #e5e7eb;
        }
        .ovivo-chat-typing {
          color: #93c5fd;
          font-size: 18px;
          letter-spacing: 2px;
          padding: 0 4px;
        }
      `}</style>
    </>
  );
}
