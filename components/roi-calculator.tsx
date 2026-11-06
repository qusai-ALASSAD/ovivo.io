'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { OpenConsultationButton } from '@/components/lead-magnet';
import { Clock3, TrendingUp } from 'lucide-react';

const wording = {
  de: {
    title: 'Wie viel Zeit könnte Ihr Unternehmen sparen?',
    caption: 'Berechnen Sie eine unverbindliche Schätzung für wiederkehrende Aufgaben.',
    hours: 'Manuelle Stunden pro Woche', cost: 'Interne Kosten pro Stunde (€)', percent: 'Potenzial der Automatisierung (%)',
    saved: 'Geschätzte monatliche Zeitersparnis', equivalent: 'Geschätzter monatlicher Gegenwert',
    unit: 'Stunden', disclaimer: 'Unverbindliche Modellrechnung. Die tatsächliche Einsparung hängt von Ihren Prozessen und dem Automatisierungsgrad ab.',
  },
  en: {
    title: 'How much time could your business save?',
    caption: 'Estimate the potential impact of automating repetitive work.',
    hours: 'Manual hours per week', cost: 'Internal cost per hour (€)', percent: 'Automation potential (%)',
    saved: 'Estimated monthly time saving', equivalent: 'Estimated monthly equivalent value',
    unit: 'hours', disclaimer: 'Illustrative estimate only. Actual savings depend on your processes and degree of automation.',
  },
  ar: {
    title: 'كم من الوقت يمكن لشركتك توفيره؟',
    caption: 'احسب تقديراً مبسطاً لأثر أتمتة المهام المتكررة.',
    hours: 'ساعات العمل اليدوي أسبوعياً', cost: 'تكلفة الساعة داخلياً (€)', percent: 'نسبة الأتمتة الممكنة (%)',
    saved: 'الوقت الموفّر شهرياً (تقديري)', equivalent: 'القيمة الشهرية التقديرية',
    unit: 'ساعة', disclaimer: 'حساب تقديري غير ملزم. يعتمد التوفير الفعلي على عمليات شركتك ونسبة الأتمتة.',
  },
};

function clamp(value: string, max: number): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.min(max, Math.max(0, numeric)) : 0;
}

export function RoiCalculator({ lang }: { lang: Lang; prefix: string }) {
  const t = wording[lang];
  const [hours, setHours] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(25);
  const [automation, setAutomation] = useState(40);
  const savedHours = hours * (automation / 100) * (52 / 12);
  const savedEuros = savedHours * hourlyCost;
  const locale = lang === 'de' ? 'de-DE' : lang === 'ar' ? 'ar' : 'en-US';

  return (
    <section className="px-4 py-16 sm:px-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-5xl rounded-[28px] border border-[#E0E7FF] bg-white p-6 shadow-[0_22px_70px_rgba(11,31,77,.06)] sm:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1F4D] sm:text-3xl">{t.title}</h2>
          <p className="mt-3 text-sm text-[#52647e]">{t.caption}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {([
            { label: t.hours, value: hours, change: setHours, max: 168 },
            { label: t.cost, value: hourlyCost, change: setHourlyCost, max: 500 },
            { label: t.percent, value: automation, change: setAutomation, max: 100 },
          ] as const).map((field) => (
            <label key={field.label} className="flex flex-col gap-2 text-sm font-medium text-[#52647e]">
              {field.label}
              <input type="number" min={0} max={field.max} step={1} value={field.value}
                onChange={(event) => field.change(clamp(event.target.value, field.max))}
                className="w-full rounded-xl border border-[#DCE5FF] bg-white px-4 py-3 text-base font-semibold text-[#0B1F4D] outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100" />
            </label>
          ))}
        </div>
        <div className="mt-8 grid gap-4 rounded-2xl border border-[#CBD7FF] bg-[#E0E7FF] p-5 sm:grid-cols-2 sm:p-7" aria-live="polite">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#36547A]"><Clock3 size={18} />{t.saved}</div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#0B1F4D] sm:text-4xl">
              {savedHours.toLocaleString(locale, { maximumFractionDigits: 1 })} <span className="text-lg">{t.unit}</span>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#36547A]"><TrendingUp size={18} />{t.equivalent}</div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#0B1F4D] sm:text-4xl">{savedEuros.toLocaleString(locale, { maximumFractionDigits: 0, style: 'currency', currency: 'EUR' })}</p>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-[#52647e]">{t.disclaimer}</p>
        <div className="mt-6"><OpenConsultationButton lang={lang} /></div>
      </div>
    </section>
  );
}
