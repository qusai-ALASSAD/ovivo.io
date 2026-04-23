'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

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
        className="fixed bottom-6 right-6 z-50 group"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          animation: isOpen ? 'none' : 'bounce 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <span
              className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"
              style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50"
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '600px',
            maxHeight: 'calc(100vh - 140px)',
            borderRadius: '16px',
            background: 'white',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease-out'
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
              💬 مساعد Ovivo
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>
              متصل الآن
            </p>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              background: '#f8f9fa',
              direction: 'rtl'
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                <MessageCircle className="w-12 h-12 mx-auto mb-3" style={{ opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>
                  مرحباً! كيف يمكنني مساعدتك اليوم؟
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
                        : 'white',
                      color: msg.role === 'user' ? 'white' : '#1f2937',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
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
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea' }} />
                    <div className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animationDelay: '0.1s' }} />
                    <div className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              background: 'white',
              borderTop: '1px solid #e5e7eb',
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
                    : '#e5e7eb',
                  color: input.trim() && !isLoading ? 'white' : '#9ca3af',
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
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  textAlign: 'right'
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
      `}</style>
    </>
  );
}
