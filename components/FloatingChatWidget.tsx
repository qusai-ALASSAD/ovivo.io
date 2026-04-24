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
    // Detect browser language
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
      return 'مرحباً! أنا مساعدك الذكي من Ovivo\nكيف يمكنني مساعدتك اليوم؟';
    } else if (lang === 'en') {
      return 'Hello! I\'m your smart assistant from Ovivo\nHow can I help you today?';
    } else {
      return 'Hallo! Ich bin Ihr intelligenter Assistent von Ovivo\nWie kann ich Ihnen heute helfen?';
    }
  };

  const getPlaceholder = () => {
    if (lang === 'ar') return 'اكتب رسالتك...';
    if (lang === 'en') return 'Type your message...';
    return 'Geben Sie Ihre Nachricht ein...';
  };

  return (
    <>
      {/* Floating Button - 3D Modern Design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
          boxShadow: isOpen 
            ? '0 8px 32px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)' 
            : '0 6px 24px rgba(59, 130, 246, 0.4), 0 12px 48px rgba(0, 0, 0, 0.3)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          animation: isOpen ? 'none' : 'floatBounce 3s ease-in-out infinite',
          position: 'relative',
          overflow: 'visible'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.6), 0 0 0 6px rgba(59, 130, 246, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.95)' : 'scale(1)';
          e.currentTarget.style.boxShadow = isOpen 
            ? '0 8px 32px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)' 
            : '0 6px 24px rgba(59, 130, 246, 0.4), 0 12px 48px rgba(0, 0, 0, 0.3)';
        }}
      >
        {/* Pulse Ring */}
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid rgba(59, 130, 246, 0.4)',
            animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            pointerEvents: 'none'
          }}
        />
        
        {isOpen ? (
          <X className="w-7 h-7 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 3D Robot Icon */}
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 100 100" 
              fill="none"
              style={{ 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                animation: 'subtleBob 2s ease-in-out infinite'
              }}
            >
              {/* Antenna with glow */}
              <defs>
                <radialGradient id="antennaGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#e0e7ff" stopOpacity="1"/>
                </linearGradient>
              </defs>
              
              {/* Antenna ball glow */}
              <circle cx="50" cy="15" r="8" fill="url(#antennaGlow)" />
              
              {/* Antenna stick */}
              <line x1="50" y1="18" x2="50" y2="28" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" 
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
              
              {/* Antenna ball */}
              <circle cx="50" cy="15" r="5" fill="#60a5fa">
                <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              
              {/* Robot head - 3D effect with gradient */}
              <rect x="22" y="28" width="56" height="50" rx="10" fill="url(#bodyGrad)" 
                    stroke="#cbd5e1" strokeWidth="1.5"/>
              
              {/* Inner shadow for depth */}
              <rect x="25" y="31" width="50" height="44" rx="8" fill="rgba(59, 130, 246, 0.03)" />
              
              {/* Left eye - 3D with reflection */}
              <circle cx="38" cy="50" r="7" fill="#3b82f6"/>
              <circle cx="36" cy="48" r="2.5" fill="#60a5fa" opacity="0.8"/>
              <circle cx="40" cy="52" r="1.5" fill="rgba(0,0,0,0.2)"/>
              
              {/* Right eye - 3D with reflection */}
              <circle cx="62" cy="50" r="7" fill="#3b82f6"/>
              <circle cx="60" cy="48" r="2.5" fill="#60a5fa" opacity="0.8"/>
              <circle cx="64" cy="52" r="1.5" fill="rgba(0,0,0,0.2)"/>
              
              {/* Smile - curved with shadow */}
              <path d="M 32 63 Q 50 72 68 63" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none"
                    style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }} />
              
              {/* Side panels for 3D effect */}
              <path d="M 22 35 L 18 38 L 18 70 L 22 73 Z" fill="rgba(203, 213, 225, 0.4)" />
              <path d="M 78 35 L 82 38 L 82 70 L 78 73 Z" fill="rgba(148, 163, 184, 0.3)" />
            </svg>
            
            {/* Online indicator with enhanced glow */}
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#10b981',
                border: '3px solid white',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3), 0 2px 8px rgba(16, 185, 129, 0.4)',
                animation: 'statusPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          </div>
        )}
      </button>

      {/* Chat Window - Premium Design */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50"
          style={{
            width: '400px',
            maxWidth: 'calc(100vw - 48px)',
            height: '620px',
            maxHeight: 'calc(100vh - 140px)',
            borderRadius: '20px',
            background: '#ffffff',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '1px solid rgba(203, 213, 225, 0.3)'
          }}
        >
          {/* Header - Modern Gradient with Glass Effect */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              padding: '24px 24px 20px',
              color: 'white',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em' }}>
                {lang === 'ar' ? 'مساعد Ovivo' : lang === 'en' ? 'Ovivo Assistant' : 'Ovivo Assistent'}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                  animation: 'statusPulse 2s infinite'
                }} />
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.95, fontWeight: '500' }}>
                  {lang === 'ar' ? 'متصل الآن' : lang === 'en' ? 'Online now' : 'Jetzt online'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages - Clean White Background */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              background: '#f8fafc',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
                }}>
                  <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="25" width="60" height="50" rx="10" fill="white" fillOpacity="0.95" />
                    <line x1="50" y1="15" x2="50" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="50" cy="12" r="5" fill="white" />
                    <circle cx="38" cy="48" r="6" fill="#3b82f6" />
                    <circle cx="62" cy="48" r="6" fill="#3b82f6" />
                    <path d="M 32 62 Q 50 70 68 62" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '15px', 
                  lineHeight: '1.7', 
                  color: '#475569',
                  fontWeight: '500',
                  whiteSpace: 'pre-line' 
                }}>
                  {getWelcomeMessage()}
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? (lang === 'ar' ? 'flex-start' : 'flex-end') : (lang === 'ar' ? 'flex-end' : 'flex-start'),
                    animation: 'messageSlideIn 0.3s ease-out'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '14px 18px',
                      borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                        : '#ffffff',
                      color: msg.role === 'user' ? 'white' : '#1e293b',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      boxShadow: msg.role === 'user' 
                        ? '0 4px 12px rgba(59, 130, 246, 0.25)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.06)',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
                      whiteSpace: 'pre-line',
                      fontWeight: '500'
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '18px 18px 18px 4px',
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(226, 232, 240, 0.8)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', animation: 'dotBounce 1.4s infinite ease-in-out' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', animation: 'dotBounce 1.4s infinite ease-in-out 0.2s' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', animation: 'dotBounce 1.4s infinite ease-in-out 0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input - Modern Elevated Design */}
          <div
            style={{
              padding: '20px',
              background: '#ffffff',
              borderTop: '1px solid rgba(226, 232, 240, 0.8)',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={getPlaceholder()}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '2px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  background: '#f8fafc',
                  color: '#1e293b',
                  transition: 'all 0.2s',
                  fontWeight: '500',
                  order: lang === 'ar' ? 1 : 0
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: input.trim() && !isLoading
                    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    : '#e2e8f0',
                  color: 'white',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: input.trim() && !isLoading ? '0 4px 12px rgba(59, 130, 246, 0.25)' : 'none',
                  order: lang === 'ar' ? 0 : 1
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.35)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = input.trim() && !isLoading ? '0 4px 12px rgba(59, 130, 246, 0.25)' : 'none';
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1); }
        }
        @keyframes pulseRing {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.15);
            opacity: 0.5;
          }
          100% { 
            transform: scale(1.3);
            opacity: 0;
          }
        }
        @keyframes statusPulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(0.95);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes subtleBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dotBounce {
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
