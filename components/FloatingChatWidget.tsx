'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // كشف اللغة من URL فوراً
  const currentLang = pathname?.startsWith('/ar') ? 'ar' : pathname?.startsWith('/en') ? 'en' : 'de';

  // توليد sessionId
  useEffect(() => {
    let sid = localStorage.getItem('ovivo_session_id');
    if (!sid) {
      sid = `ovivo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ovivo_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // رسالة الترحيب تتغير فوراً مع اللغة
  useEffect(() => {
    if (isOpen && sessionId) {
      const greetings = {
        ar: 'مرحباً! أنا مساعد Ovivo. أساعد أصحاب الأعمال في أتمتة الاستفسارات وكسب عملاء جدد 7/24. ما نوع عملك؟',
        de: 'Hallo! Ich bin der Ovivo Assistent. Welche Art von Unternehmen haben Sie?',
        en: 'Hello! I am the Ovivo Assistant. What type of business do you have?'
      };

      // تحديث أو إضافة رسالة الترحيب
      setMessages(prev => {
        if (prev.length === 0 || (prev.length === 1 && prev[0].sender === 'bot')) {
          return [{
            id: 'greeting',
            text: greetings[currentLang],
            sender: 'bot',
            timestamp: new Date(),
          }];
        }
        return prev;
      });
    }
  }, [isOpen, sessionId, currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          lang: currentLang,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessages = {
        ar: 'عذراً، حدث خطأ.',
        de: 'Entschuldigung, ein Fehler ist aufgetreten.',
        en: 'Sorry, an error occurred.'
      };
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: errorMessages[currentLang],
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const labels = {
    ar: { title: 'مساعد Ovivo', status: 'متصل', placeholder: 'رسالتك...' },
    de: { title: 'Ovivo Assistent', status: 'Aktiv', placeholder: 'Ihre Nachricht...' },
    en: { title: 'Ovivo Assistant', status: 'Active', placeholder: 'Your message...' }
  };

  const l = labels[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
          style={{
            background: '#050914 url(/chat-icon.svg) center / cover no-repeat',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 16px 42px rgba(37, 99, 235, 0.42)'
          }}
        >
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 rounded-lg shadow-2xl flex flex-col z-50 border border-gray-700" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full" style={{ background: 'url(/chat-icon.svg) center / cover' }} />
              <div>
                <h3 className="font-semibold">{l.title}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>{l.status}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                placeholder={l.placeholder}
                className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={isLoading}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;
