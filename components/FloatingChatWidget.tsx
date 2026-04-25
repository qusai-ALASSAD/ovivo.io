'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

function RobotFace({ small = false }: { small?: boolean }) {
  const size = small ? 26 : 32;
  return (
    <div className="ovivo-robot" style={{ width: size, height: size }}>
      <span className="ovivo-eye left" />
      <span className="ovivo-eye right" />
      <span className="ovivo-smile" />
    </div>
  );
}

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
        <div style={{ position: 'fixed', right: 20, bottom: 92, width: 370, maxWidth: 'calc(100vw - 32px)', height: 500, zIndex: 999999, background: '#0b1220', color: '#fff', borderRadius: 18, border: '1px solid rgba(59,130,246,.35)', boxShadow: '0 20px 60px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: 14, background: 'linear-gradient(135deg,#0f172a,#1e3a8a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><RobotFace small /><div><b>{label}</b><div style={{ fontSize: 12, color: '#bfdbfe' }}>● Online</div></div></div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,.12)', color: '#fff', border: 0, borderRadius: 8, width: 36, height: 36 }}><X size={19}/></button>
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
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999999, width: 58, height: 58, borderRadius: 18, border: 0, background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 16px 40px rgba(37,99,235,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen ? <X size={24}/> : <RobotFace />} 
      </button>
      <style jsx global>{`
        .ovivo-robot{position:relative;border-radius:12px;background:linear-gradient(145deg,#ffffff,#bfdbfe);box-shadow:inset 0 -4px 8px rgba(37,99,235,.28),0 8px 18px rgba(59,130,246,.35);animation:ovivoFloat 2.6s ease-in-out infinite}
        .ovivo-robot:before{content:'';position:absolute;left:50%;top:-5px;width:4px;height:7px;background:#93c5fd;border-radius:8px;transform:translateX(-50%)}
        .ovivo-eye{position:absolute;top:35%;width:5px;height:5px;background:#2563eb;border-radius:50%;animation:ovivoBlink 4s infinite}
        .ovivo-eye.left{left:28%}.ovivo-eye.right{right:28%}
        .ovivo-smile{position:absolute;left:50%;bottom:24%;width:14px;height:7px;border-bottom:2px solid #2563eb;border-radius:0 0 14px 14px;transform:translateX(-50%)}
        @keyframes ovivoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes ovivoBlink{0%,92%,100%{transform:scaleY(1)}94%,96%{transform:scaleY(.12)}}
      `}</style>
    </>
  );
}
