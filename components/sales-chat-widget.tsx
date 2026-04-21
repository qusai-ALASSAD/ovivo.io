'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const SYSTEM_PROMPT_DE = 'Du bist ein professioneller Vertriebsmitarbeiter bei Ovivo fuer KI-Automatisierung. Ziel: Besucher in qualifizierte Leads umwandeln.';
const SYSTEM_PROMPT_EN = 'You are a professional sales agent at Ovivo for AI automation. Goal: Convert visitors into qualified leads.';
const SYSTEM_PROMPT_AR = 'أنت موظف مبيعات محترف لشركة Ovivo. هدفك تحويل المستخدم إلى عميل.';

export function SalesChatWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isConsultationPage = pathname?.includes('/consultation') ?? false;
  if (isConsultationPage) return null;
  return (
    <button onClick={() => setOpen(v=>!v)} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl px-4 py-3" style={{background:'linear-gradient(135deg,#1e2433,#141820)',border:'1px solid rgba(255,255,255,0.1)'}}>
      <Sparkles className="h-4 w-4 text-white/80" />
      <span className="text-[13px] font-semibold text-white/90">Talk to Ovivo</span>
    </button>
  );
}
