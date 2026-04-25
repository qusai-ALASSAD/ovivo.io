'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) setLang('ar');
    else if (browserLang.startsWith('en')) setLang('en');
    else setLang('de');
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, lang })
      });

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || '...'
      }]);

    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      style={{ position: 'fixed', bottom: 20, right: 20 }}
    >
      Chat
    </button>
  );
}
