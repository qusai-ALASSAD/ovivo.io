'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
      setLang('ar');
    } else if (browserLang.startsWith('en')) {
      setLang('en');
    } else {
      setLang('de');
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          lang: lang
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        const errorMsg = lang === 'ar' 
          ? 'عذراً، حدث خطأ. حاول مرة أخرى.'
          : lang === 'en'
          ? 'Sorry, an error occurred. Please try again.'
          : 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      }
    } catch (error) {
      const errorMsg = lang === 'ar'
        ? 'عذراً، حدث خطأ في الاتصال.'
        : lang === 'en'
        ? 'Sorry, connection error occurred.'
        : 'Entschuldigung, Verbindungsfehler aufgetreten.';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWelcomeMessage = () => {
    if (lang === 'ar') {
      return 'مرحباً! أنا مساعدك الذكي من Ovivo. كيف يمكنني مساعدتك اليوم؟';
    } else if (lang === 'en') {
      return 'Hello! I\'m your smart assistant from Ovivo. How can I help you today?';
    } else {
      return 'Guten Tag! Ich bin Ihr persönlicher KI-Berater bei Ovivo. Erzählen Sie mir kurz von Ihrem Betrieb — was machen Sie, und woher kommen die meisten Kundenanfragen?';
    }
  };

  const getPlaceholder = () => {
    if (lang === 'ar') return 'اكتب رسالتك...';
    if (lang === 'en') return 'Type your message...';
    return 'Ihre Nachricht...';
  };

  return (
    <>
      {/* Floating Button - SMALL SIZE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50"
        style={{
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#3b82f6',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          position: 'fixed'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(59, 130, 246, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.4)';
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white" fillOpacity="0.9"/>
            <circle cx="9" cy="10" r="1.5" fill="white"/>
            <circle cx="15" cy="10" r="1.5" fill="white"/>
            <path d="M12 17.5C14.33 17.5 16.32 16.04 17.05 14H6.95C7.68 16.04 9.67 17.5 12 17.5Z" fill="white"/>
          </svg>
        )}
        
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid white'
          }}
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50"
          style={{
            bottom: '100px',
            right: '24px',
            width: '360px',
            maxWidth: 'calc(100vw - 48px)',
            height: '500px',
            maxHeight: 'calc(100vh - 140px)',
            borderRadius: '12px',
            background: '#1a1f2e',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            position: 'fixed'
          }}
        >
          {/* Header with CLOSE BUTTON */}
          <div
            style={{
              padding: '14px 16px',
              background: '#1a1f2e',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.9"/>
                  <circle cx="9" cy="10" r="1.5" fill="#3b82f6"/>
                  <circle cx="15" cy="10" r="1.5" fill="#3b82f6"/>
                  <path d="M12 17.5C14.33 17.5 16.32 16.04 17.05 14H6.95C7.68 16.04 9.67 17.5 12 17.5Z" fill="#3b82f6"/>
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                  {lang === 'ar' ? 'مساعد Ovivo' : lang === 'en' ? 'Ovivo Assistant' : 'Ovivo Assistent'}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10b981'
                  }} />
                  <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
                    {lang === 'ar' ? 'متصل' : lang === 'en' ? 'Online' : 'Online'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              background: '#0f1419',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div
                  style={{
                    display: 'inline-block',
                    maxWidth: '90%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#1a1f2e',
                    color: '#e5e7eb',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    marginBottom: '10px'
                  }}
                >
                  {getWelcomeMessage()}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? (lang === 'ar' ? 'flex-start' : 'flex-end') : (lang === 'ar' ? 'flex-end' : 'flex-start')
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: msg.role === 'user' ? '#3b82f6' : '#1a1f2e',
                      color: '#ffffff',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#1a1f2e'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', animation: 'bounce 1.4s infinite ease-in-out' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px',
              background: '#1a1f2e',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={getPlaceholder()}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '13px',
                  outline: 'none',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  background: '#0f1419',
                  color: '#ffffff',
                  transition: 'all 0.2s',
                  order: lang === 'ar' ? 1 : 0
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  background: input.trim() && !isLoading ? '#3b82f6' : '#374151',
                  color: 'white',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: lang === 'ar' ? 0 : 1
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.currentTarget.style.background = '#2563eb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = input.trim() && !isLoading ? '#3b82f6' : '#374151';
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
