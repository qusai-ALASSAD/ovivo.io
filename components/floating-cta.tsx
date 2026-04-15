'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en');
  const isAr = pathname?.startsWith('/ar');
  const isConsultation = pathname?.includes('/consultation');
  const prefix = isEn ? '/en' : isAr ? '/ar' : '';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? scrolled / total : 0);
      setIsVisible(scrolled > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const label = isEn ? 'Free Consultation' : isAr ? 'استشارة مجانية' : 'Kostenlose Beratung';
  // Hide when chat widget visible (bottom-right) and when on consultation page
  if (isConsultation) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-24 z-40 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 sm:bottom-7"
        >
          <div className="relative">
            {/* Progress ring hint */}
            {scrollPct > 0.5 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-emerald-400 border-2 border-[#0a0e1a] flex items-center justify-center z-10"
              >
                <span className="text-[8px] font-black text-[#0a0e1a]">!</span>
              </motion.span>
            )}
            <Link href={`${prefix}/consultation`}>
              <Button
                size="lg"
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 shadow-[0_8px_32px_rgba(37,99,235,0.55)] px-6 py-5 text-sm font-bold transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,99,235,0.8)] hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  {label}
                </span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-blue-400/30"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
