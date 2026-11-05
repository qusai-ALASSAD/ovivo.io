'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/i18n';

export function RoiCalculator({ lang, prefix }: { lang: Lang; prefix: string }) {
 const [hours, setHours] = useState(5);
 const [hourlyCost, setHourlyCost] = useState(25);
 const [automation, setAutomation] = useState(40);
 const savedHours = Math.round(hours * 4.33 * automation) / 100;
 const savedEuros = Math.round(savedHours * hourlyCost);
 const copy = {
  de: ['Unverbindlicher Zeitersparnis-Rechner','Manuelle Stunden pro Woche','Interne Kosten pro Stunde (€)','Potenzial der Automatisierung (%)','Rechnerische monatliche Zeitersparnis','Stunden','Entspricht rechnerisch','Nur eine Modellrechnung, keine zugesicherte Einsparung. Echte Ergebnisse hängen von Ihren Prozessen ab.','Kostenlose Beratung'],
  en: ['Illustrative time savings calculator','Manual hours per week','Internal cost per hour (€)','Automation potential (%)','Illustrative monthly time saving','hours','Illustrative value','An estimate only, not a guarantee. Real outcomes depend on your workflows.','Free consultation'],
  ar: ['حاسبة تقديرية لتوفير الوقت','ساعات العمل اليدوي أسبوعياً','تكلفة الساعة داخلياً (€)','نسبة الأتمتة الممكنة (%)','الوقت الموفّر شهرياً (تقديري)','ساعة','القيمة التقريبية','حساب توضيحي وليس ضماناً؛ النتائج تعتمد على عمليات شركتك.','استشارة مجانية']
 }[lang];
 return <section className="px-4 py-16 sm:px-6"><div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-10" dir={lang === 'ar' ? 'rtl':'ltr'}>
  <h2 className="mb-7 text-2xl font-bold text-white sm:text-3xl">{copy[0]}</h2>
  <div className="grid gap-6 md:grid-cols-3">
   <label className="text-sm text-gray-300">{copy[1]}<input type="number" min={0} max={168} value={hours} onChange={e=>setHours(Math.min(168,Math.max(0,Number(e.target.value)||0)))} className="mt-2 w-full rounded-lg border border-white/20 bg-[#0b1730] px-4 py-3 text-white" /></label>
   <label className="text-sm text-gray-300">{copy[2]}<input type="number" min={0} max={500} value={hourlyCost} onChange={e=>setHourlyCost(Math.min(500,Math.max(0,Number(e.target.value)||0)))} className="mt-2 w-full rounded-lg border border-white/20 bg-[#0b1730] px-4 py-3 text-white" /></label>
   <label className="text-sm text-gray-300">{copy[3]}<input type="number" min={0} max={100} value={automation} onChange={e=>setAutomation(Math.min(100,Math.max(0,Number(e.target.value)||0)))} className="mt-2 w-full rounded-lg border border-white/20 bg-[#0b1730] px-4 py-3 text-white" /></label>
  </div>
  <div className="mt-8 rounded-xl bg-blue-500/10 p-5 text-white"><p className="text-sm text-gray-300">{copy[4]}</p><p className="mt-2 text-3xl font-bold">{savedHours.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')} {copy[5]}</p><p className="mt-2">{copy[6]}: € {savedEuros.toLocaleString('de-DE')}</p></div>
  <p className="mt-4 text-xs text-gray-400">{copy[7]}</p><Link href={prefix + '/consultation'} className="mt-5 inline-block font-semibold text-blue-400">{copy[8]} →</Link>
 </div></section>;
}
