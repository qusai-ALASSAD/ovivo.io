'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const MEMORY_KEY = 'ovivo_chat_memory_v1';
const MEMORY_TTL = 24 * 60 * 60 * 1000;

function RobotFace({ small = false }: { small?: boolean }) {
  const size = small ? 28 : 36;
  return <div className="ovivo-robot" style={{ width: size, height: size }}><span className="ovivo-ear left" /><span className="ovivo-ear right" /><span className="ovivo-antenna" /><span className="ovivo-eye left" /><span className="ovivo-eye right" /><span className="ovivo-mouth" /></div>;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('de');
  const [sessionId, setSessionId] = useState('');
  const [lead, setLead] = useState<any>({});

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detected = browserLang.startsWith('ar') ? 'ar' : browserLang.startsWith('en') ? 'en' : 'de';
    setLang(detected);
    const now = Date.now();
    try {
      const saved = JSON.parse(localStorage.getItem(MEMORY_KEY) || 'null');
      if (saved && saved.expiresAt > now) {
        setSessionId(saved.sessionId || `s_${now}`); setMessages(saved.messages || []); setLead(saved.lead || {}); setLang(saved.lang || detected);
      } else {
        const sid = `s_${now}`; setSessionId(sid); localStorage.setItem(MEMORY_KEY, JSON.stringify({ sessionId: sid, messages: [], lead: {}, lang: detected, expiresAt: now + MEMORY_TTL }));
      }
    } catch { setSessionId(`s_${now}`); }
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    localStorage.setItem(MEMORY_KEY, JSON.stringify({ sessionId, messages, lead, lang, expiresAt: Date.now() + MEMORY_TTL }));
  }, [sessionId, messages, lead, lang]);

  const label = lang === 'ar' ? 'مساعد Ovivo' : lang === 'en' ? 'Ovivo Assistant' : 'Ovivo Assistent';
  const welcome = lang === 'ar' ? 'أهلًا! أنا مساعد Ovivo الذكي. أستطيع مساعدتك في فهم كيف نزيد الطلبات وننظم الردود تلقائيًا. ما نوع عملك؟' : lang === 'en' ? 'Hello! I’m Ovivo’s smart assistant. I can show you how to get more leads and automate replies. What type of business do you run?' : 'Hallo! Ich bin der Ovivo Assistent. Ich zeige Ihnen, wie Sie mehr Anfragen gewinnen und Antworten automatisieren. Welche Art von Unternehmen haben Sie?';
  const placeholder = lang === 'ar' ? 'اكتب رسالتك...' : lang === 'en' ? 'Type your message...' : 'Ihre Nachricht...';
  const errorText = lang === 'ar' ? 'أنا هنا لمساعدتك. ما نوع عملك؟' : lang === 'en' ? 'I am here to help. What type of business do you run?' : 'Ich helfe Ihnen gerne. Welche Art von Unternehmen haben Sie?';

  const sendMessage = async () => {
    const userMessage = input.trim(); if (!userMessage || isLoading) return;
    setInput(''); const nextMessages = [...messages, { role: 'user', content: userMessage }]; setMessages(nextMessages); setIsLoading(true);
    try {
      const res = await fetch('/.netlify/functions/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMessage, chatInput: userMessage, lang, sessionId, lead, history: nextMessages.slice(-10) }) });
      const data = await res.json(); if (data.lead) setLead(data.lead); if (data.sessionId) setSessionId(data.sessionId);
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.text || errorText }]);
    } catch { setMessages(prev => [...prev, { role: 'assistant', content: errorText }]); } finally { setIsLoading(false); }
  };

  const resetChat = () => { const sid = `s_${Date.now()}`; setMessages([]); setLead({}); setSessionId(sid); localStorage.setItem(MEMORY_KEY, JSON.stringify({ sessionId: sid, messages: [], lead: {}, lang, expiresAt: Date.now() + MEMORY_TTL })); };

  return <>
    {isOpen && <div style={{ position: 'fixed', right: 20, bottom: 92, width: 370, maxWidth: 'calc(100vw - 32px)', height: 500, zIndex: 999999, background: '#0b1220', color: '#fff', borderRadius: 18, border: '1px solid rgba(59,130,246,.35)', boxShadow: '0 20px 60px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: 14, background: 'linear-gradient(135deg,#0f172a,#1e3a8a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><RobotFace small /><div><b>{label}</b><div style={{ fontSize: 12, color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span className="ovivo-online-dot" /> Active · Online</div></div></div>
        <button onClick={resetChat} title="New chat" style={{ background: 'rgba(34,197,94,.16)', color: '#bbf7d0', border: '1px solid rgba(34,197,94,.25)', borderRadius: 8, height: 34, padding: '0 10px', fontSize: 12 }}>New</button>
      </div>
      <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#08111f' }}>
        {messages.length === 0 && <div style={{ background: '#111827', padding: 10, borderRadius: 12, marginBottom: 10 }}>{welcome}</div>}
        {messages.map((m, i) => <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}><div style={{ maxWidth: '85%', background: m.role === 'user' ? '#2563eb' : '#111827', padding: 10, borderRadius: 12, fontSize: 13, whiteSpace: 'pre-wrap' }}>{m.content}</div></div>)}
        {isLoading && <div style={{ color: '#93c5fd', fontSize: 13 }}>...</div>}
      </div>
      <div style={{ padding: 14, background: '#0f172a', display: 'flex', gap: 10, alignItems: 'center' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={placeholder} style={{ flex: 1, height: 48, background: '#020617', color: '#fff', border: '1px solid #334155', borderRadius: 14, padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
        <button onClick={sendMessage} style={{ width: 48, height: 48, border: 0, borderRadius: 14, color: '#fff', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Send size={19}/></button>
      </div>
    </div>}
    <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999999, width: 58, height: 58, borderRadius: 18, border: 0, background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 16px 40px rgba(37,99,235,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isOpen ? <X size={24}/> : <RobotFace />}</button>
    <style jsx global>{`.ovivo-robot{position:relative;border-radius:12px;background:linear-gradient(145deg,#f8fbff,#bfdbfe);box-shadow:inset 0 -5px 9px rgba(37,99,235,.28),inset 0 3px 6px rgba(255,255,255,.9),0 9px 20px rgba(59,130,246,.4);animation:ovivoFloat 2.6s ease-in-out infinite}.ovivo-robot:before{content:'';position:absolute;left:50%;top:-8px;width:4px;height:8px;background:#93c5fd;border-radius:8px;transform:translateX(-50%)}.ovivo-antenna{position:absolute;left:50%;top:-12px;width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 12px #22c55e;transform:translateX(-50%)}.ovivo-ear{position:absolute;top:35%;width:4px;height:10px;background:#93c5fd;border-radius:8px}.ovivo-ear.left{left:-4px}.ovivo-ear.right{right:-4px}.ovivo-eye{position:absolute;top:34%;width:6px;height:6px;background:#1d4ed8;border-radius:50%;animation:ovivoBlink 4s infinite}.ovivo-eye.left{left:27%}.ovivo-eye.right{right:27%}.ovivo-mouth{position:absolute;left:50%;bottom:23%;width:15px;height:7px;border-bottom:2px solid #1d4ed8;border-radius:0 0 14px 14px;transform:translateX(-50%)}.ovivo-online-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.18),0 0 10px #22c55e}@keyframes ovivoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes ovivoBlink{0%,92%,100%{transform:scaleY(1)}94%,96%{transform:scaleY(.12)}}`}</style>
  </>;
}
