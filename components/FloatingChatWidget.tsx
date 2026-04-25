'use client';

import { useState, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) setLang('ar');
    else if (browserLang.startsWith('en')) setLang('en');
    else setLang('de');
  }, []);

  const label = lang === 'ar' ? 'مساعد Ovivo' : lang === 'en' ? 'Ovivo Assistant' : 'Ovivo Assistent';
  const welcome = lang === 'ar' ? 'مرحبًا! كيف يمكنني مساعدتك؟' : lang === 'en' ? 'Hello! How can I help you?' : 'Hallo! Wie kann ich Ihnen helfen?';
  const placeholder = lang === 'ar' ? 'اكتب رسالتك...' : lang === 'en' ? 'Type your message...' : 'Ihre Nachricht...';
  const errorText = lang === 'ar' ? 'عذرًا، حدث خطأ في الاتصال.' : lang === 'en' ? 'Connection error.' : 'Verbindungsfehler.';

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, chatInput: userMessage, lang })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.text || errorText }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div style={{ position: 'fixed', right: 20, bottom: 92, width: 340, maxWidth: 'calc(100vw - 32px)', height: 460, zIndex: 999999, background: '#0b1220', color: '#fff', borderRadius: 18, border: '1px solid rgba(59,130,246,.35)', boxShadow: '0 20px 60px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: 14, background: 'linear-gradient(135deg,#0f172a,#1e3a8a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Bot size={22}/><div><b>{label}</b><div style={{ fontSize: 12, color: '#bfdbfe' }}>● Online</div></div></div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,.12)', color: '#fff', border: 0, borderRadius: 8, width: 32, height: 32 }}><X size={18}/></button>
          </div>
          <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#08111f' }}>
            {messages.length === 0 && <div style={{ background: '#111827', padding: 10, borderRadius: 12, marginBottom: 10 }}>{welcome}</div>}
            {messages.map((m, i) => <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}><div style={{ maxWidth: '85%', background: m.role === 'user' ? '#2563eb' : '#111827', padding: 10, borderRadius: 12, fontSize: 13, whiteSpace: 'pre-wrap' }}>{m.content}</div></div>)}
            {isLoading && <div style={{ color: '#93c5fd', fontSize: 13 }}>...</div>}
          </div>
          <div style={{ padding: 10, background: '#0f172a', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={placeholder} style={{ flex: 1, background: '#020617', color: '#fff', border: '1px solid #334155', borderRadius: 10, padding: '0 10px' }} />
            <button onClick={sendMessage} style={{ width: 40, border: 0, borderRadius: 10, color: '#fff', background: '#2563eb' }}><Send size={17}/></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999999, width: 54, height: 54, borderRadius: 18, border: 0, background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 16px 40px rgba(37,99,235,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen ? <X size={23}/> : <Bot size={25}/>} 
      </button>
    </>
  );
}
