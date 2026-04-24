'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          lang: 'ar'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ. حاول مرة أخرى.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: isOpen ? '0 6px 25px rgba(102, 126, 234, 0.5)' : '0 4px 20px rgba(102, 126, 234, 0.4)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          animation: isOpen ? 'none' : 'bounce 2s infinite'
        }}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <div style={{ position: 'relative' }}>
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 100 100" 
              fill="none"
              style={{ animation: 'robotBlink 3s infinite' }}
            >
              <rect x="25" y="30" width="50" height="45" rx="8" fill="white" />
              <line x1="50" y1="20" x2="50" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="17" r="4" fill="white" />
              <circle cx="40" cy="50" r="5" fill="#667eea" className="robot-eye-left" />
              <circle cx="60" cy="50" r="5" fill="#667eea" className="robot-eye-right" />
              <path d="M 35 63 Q 50 70 65 63" stroke="#667eea" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid white',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          </div>
        )}
      </button>

      {/* Chat Window - Dark Theme */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50"
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '600px',
            maxHeight: 'calc(100vh - 140px)',
            borderRadius: '16px',
            background: '#1f2937',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease-out',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px',
              color: 'white',
              textAlign: 'right',
              direction: 'rtl'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
              🤖 مساعد Ovivo
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>
              متصل الآن • مدعوم بالذكاء الاصطناعي
            </p>
          </div>

          {/* Messages - Dark Background */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              background: '#111827',
              direction: 'rtl'
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 16px', opacity: 0.5 }}>
                  <rect x="20" y="25" width="60" height="50" rx="8" fill="#667eea" />
                  <line x1="50" y1="15" x2="50" y2="25" stroke="#667eea" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="12" r="5" fill="#667eea" />
                  <circle cx="38" cy="45" r="6" fill="white" />
                  <circle cx="62" cy="45" r="6" fill="white" />
                  <path d="M 32 60 Q 50 68 68 60" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#d1d5db' }}>
                  مرحباً! أنا مساعدك الذكي 🤖<br/>
                  كيف يمكنني مساعدتك اليوم؟
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#374151',
                      color: 'white',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#374151',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1s infinite' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1s infinite 0.1s' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1s infinite 0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input - Dark Theme */}
          <div
            style={{
              padding: '16px',
              background: '#1f2937',
              borderTop: '1px solid #374151',
              direction: 'rtl'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: input.trim() && !isLoading
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#374151',
                  color: 'white',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <Send className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اكتب رسالتك..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid #374151',
                  fontSize: '14px',
                  outline: 'none',
                  textAlign: 'right',
                  background: '#111827',
                  color: 'white'
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes robotBlink {
          0%, 45%, 55%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .robot-eye-left, .robot-eye-right {
          animation: eyeBlink 4s infinite;
        }
        .robot-eye-right {
          animation-delay: 0.1s;
        }
        @keyframes eyeBlink {
          0%, 48%, 52%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
      `}</style>
    </>
  );
}
