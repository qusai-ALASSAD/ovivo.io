'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge, title, titleGradient, subtitle, centered = true,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' }}
      className={centered ? 'text-center' : ''}
    >
      {badge && (
        <span className="mb-5 inline-flex items-center rounded-full border border-[#D8E5FF] bg-[#F1F6FF] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#2563EB]">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0B1F4D] sm:text-4xl lg:text-[44px]">
        {title}
        {titleGradient && <> <span className="bg-gradient-to-r from-[#2563EB] to-[#885CF6] bg-clip-text text-transparent">{titleGradient}</span></>}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-8 text-[#52647E] sm:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
