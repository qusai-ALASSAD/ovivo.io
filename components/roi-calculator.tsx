'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, Euro, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const copy = {
  de: {
    badge: 'ROI-Rechner',
    title: 'Was kostet Sie Ihr aktuelles',
    titleGradient: 'System jeden Monat?',
    sub: 'Schieben Sie die Regler — sehen Sie live, wie viel Umsatz und Zeit Ovivo für Ihren Betrieb freisetzt.',
    bookingsLabel: 'Buchungen / Anfragen pro Monat',
    convLabel: 'Aktuelle Konversionsrate (%)',
    revenueLabel: 'Durchschnittlicher Umsatz pro Buchung (€)',
    hoursLabel: 'Stunden für manuelle Kommunikation / Tag',
    hourlyLabel: 'Ihr Stundensatz (€)',
    resultsTitle: 'Ihr geschätzter Gewinn mit Ovivo',
    extraBookings: 'Zusätzliche Buchungen / Monat',
    extraRevenue: 'Zusätzlicher Umsatz / Monat',
    timeSaved: 'Eingesparte Stunden / Monat',
    moneySaved: 'Gesparte Personalkosten / Monat',
    totalGain: 'Gesamtgewinn / Monat',
    roiLabel: 'ROI im ersten Jahr',
    note: '* Basierend auf Kundendurchschnittswerten. Individuelles Ergebnis kann variieren.',
    cta: 'Kostenlose Analyse anfragen',
    ctaSub: 'Wir zeigen Ihnen Ihre genauen Zahlen — kostenlos.',
    pkg: 'Empfohlenes Paket:',
  },
  en: {
    badge: 'ROI Calculator',
    title: 'How much is your current system',
    titleGradient: 'costing you monthly?',
    sub: 'Move the sliders — see live how much revenue and time Ovivo unlocks for your business.',
    bookingsLabel: 'Bookings / inquiries per month',
    convLabel: 'Current conversion rate (%)',
    revenueLabel: 'Average revenue per booking (€)',
    hoursLabel: 'Hours on manual communication / day',
    hourlyLabel: 'Your hourly rate (€)',
    resultsTitle: 'Your estimated gain with Ovivo',
    extraBookings: 'Additional bookings / month',
    extraRevenue: 'Additional revenue / month',
    timeSaved: 'Hours saved / month',
    moneySaved: 'Staff cost savings / month',
    totalGain: 'Total gain / month',
    roiLabel: 'ROI in year one',
    note: '* Based on customer averages. Individual results may vary.',
    cta: 'Get your free analysis',
    ctaSub: 'We show you your exact numbers — for free.',
    pkg: 'Recommended package:',
  },
  ar: {
    badge: 'حاسبة العائد',
    title: 'كم يكلفك نظامك الحالي',
    titleGradient: 'كل شهر؟',
    sub: 'حرّك الأشرطة — شاهد مباشرةً كم يحرر أوفيفو من إيرادات ووقت لعملك.',
    bookingsLabel: 'الحجوزات / الاستفسارات شهرياً',
    convLabel: 'معدل التحويل الحالي (%)',
    revenueLabel: 'متوسط الإيراد لكل حجز (€)',
    hoursLabel: 'ساعات التواصل اليدوي يومياً',
    hourlyLabel: 'تكلفة ساعة العمل (€)',
    resultsTitle: 'مكسبك المقدر مع أوفيفو',
    extraBookings: 'حجوزات إضافية / شهر',
    extraRevenue: 'إيراد إضافي / شهر',
    timeSaved: 'ساعات موفرة / شهر',
    moneySaved: 'توفير تكاليف الموظفين / شهر',
    totalGain: 'إجمالي المكسب / شهر',
    roiLabel: 'العائد في السنة الأولى',
    note: '* بناءً على متوسطات العملاء. النتائج الفردية قد تختلف.',
    cta: 'احصل على تحليلك المجاني',
    ctaSub: 'نريك أرقامك الدقيقة — مجاناً.',
    pkg: 'الباقة المقترحة:',
  },
};

interface Props {
  lang: Lang;
  prefix: string;
}

export function RoiCalculator({ lang, prefix }: Props) {
  const t = copy[lang];
  const rtl = isRTL(lang);

  const [bookings, setBookings] = useState(150);
  const [conv, setConv] = useState(40);
  const [revenue, setRevenue] = useState(60);
  const [hours, setHours] = useState(2);
  const [hourly, setHourly] = useState(20);

  const results = useMemo(() => {
    // Ovivo increases conversions by ~35% and response speed
    const improvedConv = Math.min(conv * 1.35, 95);
    const extraBookings = Math.round(bookings * (improvedConv - conv) / 100);
    const extraRevenue = extraBookings * revenue;
    const hoursPerMonth = hours * 26; // working days
    const timeSaved = Math.round(hoursPerMonth * 0.7); // 70% automation
    const moneySaved = Math.round(timeSaved * hourly);
    const totalMonthly = extraRevenue + moneySaved;
    const annualGain = totalMonthly * 12;
    const setupCost = totalMonthly > 500 ? 2200 : 1200;
    const monthlyCost = totalMonthly > 500 ? 220 : 120;
    const yearOneCost = setupCost + monthlyCost * 12;
    const roi = Math.round(((annualGain - yearOneCost) / yearOneCost) * 100);
    const pkg = totalMonthly > 800
      ? (lang === 'de' ? 'Full Automation' : lang === 'ar' ? 'الأتمتة الكاملة' : 'Full Automation')
      : totalMonthly > 300
      ? (lang === 'de' ? 'Business Automation' : lang === 'ar' ? 'باقة الأعمال' : 'Business Automation')
      : (lang === 'de' ? 'Starter Automation' : lang === 'ar' ? 'الباقة الأساسية' : 'Starter Automation');

    return { extraBookings, extraRevenue, timeSaved, moneySaved, totalMonthly, roi, pkg };
  }, [bookings, conv, revenue, hours, hourly, lang]);

  const fmt = (n: number) => n.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US');

  const sliders = [
    { label: t.bookingsLabel, value: bookings, min: 20, max: 600, step: 10, set: setBookings, suffix: '' },
    { label: t.convLabel, value: conv, min: 10, max: 80, step: 5, set: setConv, suffix: '%' },
    { label: t.revenueLabel, value: revenue, min: 20, max: 500, step: 10, set: setRevenue, suffix: '€' },
    { label: t.hoursLabel, value: hours, min: 0.5, max: 8, step: 0.5, set: setHours, suffix: 'h' },
    { label: t.hourlyLabel, value: hourly, min: 12, max: 80, step: 2, set: setHourly, suffix: '€' },
  ];

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-blue-500/6 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-5">
            <TrendingUp className="h-3.5 w-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            {t.title}{' '}
            <span className="text-gradient">{t.titleGradient}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t.sub}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Sliders */}
          <div className="space-y-6 bg-white/[0.03] rounded-2xl border border-white/8 p-6 sm:p-8">
            {sliders.map((s) => (
              <div key={s.label}>
                <div className={`flex items-center justify-between mb-2.5 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <label className="text-sm font-medium text-gray-300">{s.label}</label>
                  <span className="text-sm font-bold text-blue-400 tabular-nums min-w-[56px] text-center bg-blue-500/10 border border-blue-500/20 rounded-lg px-2 py-0.5">
                    {s.suffix === '€' && !s.label.includes('Umsatz') && !s.label.includes('revenue') && !s.label.includes('إيراد') && !s.label.includes('تكلفة') ? `${s.value}€` : s.suffix === '€' ? `€${s.value}` : `${s.value}${s.suffix}`}
                  </span>
                </div>
                <input
                  type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                  onChange={e => s.set(Number(e.target.value))}
                  dir="ltr"
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer accent-blue-500"
                  style={{ background: `linear-gradient(to right, #3b82f6 ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.1) 0%)` }}
                />
                <div className={`flex justify-between text-[10px] text-gray-600 mt-1 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <span>{s.min}{s.suffix}</span>
                  <span>{s.max}{s.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-white/[0.03] rounded-2xl border border-white/8 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">{t.resultsTitle}</p>
              <div className="space-y-3">
                {[
                  { label: t.extraBookings, value: `+${fmt(results.extraBookings)}`, color: 'text-blue-400', icon: TrendingUp },
                  { label: t.extraRevenue, value: `+€${fmt(results.extraRevenue)}`, color: 'text-emerald-400', icon: Euro },
                  { label: t.timeSaved, value: `${fmt(results.timeSaved)}h`, color: 'text-cyan-400', icon: Clock },
                  { label: t.moneySaved, value: `+€${fmt(results.moneySaved)}`, color: 'text-amber-400', icon: Euro },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.label} className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-2.5 ${rtl ? 'flex-row-reverse' : ''}`}>
                        <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Icon className={`h-3.5 w-3.5 ${r.color}`} />
                        </div>
                        <span className="text-sm text-gray-400">{r.label}</span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.span key={r.value} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className={`text-sm font-bold tabular-nums ${r.color}`}>
                          {r.value}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Big total */}
            <motion.div
              key={results.totalMonthly}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-blue-500/5 p-6"
            >
              <div className={`flex items-start justify-between mb-1 ${rtl ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{t.totalGain}</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={results.totalMonthly} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-black text-white mt-1">
                      +€{fmt(results.totalMonthly)}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{t.roiLabel}</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={results.roi} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-2xl font-black text-emerald-400 mt-1">
                      {results.roi}%
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div className={`mt-4 pt-4 border-t border-white/10 flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>
                <Zap className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  {t.pkg} <span className="font-semibold text-blue-400">{results.pkg}</span>
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            </motion.div>

            <Link href={`${prefix}/consultation`}>
              <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-6 text-base rounded-xl hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] transition-all group">
                <span className="flex items-center gap-2">
                  {t.cta}
                  <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                </span>
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-600">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
