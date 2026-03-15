'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const prefix = isEn ? '/en' : '';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 sm:left-auto sm:translate-x-0 sm:bottom-8 sm:right-28"
        >
          <Link href={`${prefix}/demo`}>
            <Button
              size="lg"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_100%] hover:bg-right text-white border-0 shadow-2xl shadow-blue-500/50 px-8 py-6 text-base font-semibold animate-glow transition-all duration-500 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                {isEn ? 'Try Demo' : 'Demo testen'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
