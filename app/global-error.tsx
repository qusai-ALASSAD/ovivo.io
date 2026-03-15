'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: '#0a0e1a', color: '#fff', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>A critical error occurred. Please reload the page.</p>
          <button
            onClick={reset}
            style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
