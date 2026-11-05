'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Tag, ShieldCheck, MessagesSquare, Settings2, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { OpenConsultationButton } from '@/components/lead-magnet';
import type { Lang } from '@/lib/i18n';

type Feature = 'chat' | 'leads' | 'workflow' | 'calendar' | 'crm' | 'integration' | 'analytics' | 'support' | 'marketing';
const offers = [
  { id: 'starter', setup: 891, original: 990, monthly: 99, features: ['chat', 'leads', 'support'] as Feature[] },
  { id: 'business', setup: 2490, monthly: 249, recommended: true, features: ['chat', 'leads', 'workflow', 'calendar', 'crm', 'integration', 'support'] as Feature[] },
  { id: 'growth', setup: 4990, monthly: 449, features: ['chat', 'leads', 'workflow', 'calendar', 'crm', 'integration', 'analytics', 'support', 'marketing'] as Feature[] },
];
const allFeatures: Feature[] = ['chat','leads','workflow','calendar','crm','integration','analytics','support','marketing'];
const content = {
  de: {
    badge: 'KI-AUTOMATION · PAKETE & PREISE',
    title: 'Weniger Routine.',
    gradient: 'Mehr Zeit fürs Geschäft.',
    intro: 'Starten Sie mit einer passenden KI-Lösung – vom intelligenten Assistenten bis zur vernetzten Automatisierung.',
    stripTitle: 'Klein starten. Intelligent wachsen.',
    stripText: 'Klare Einstiegspakete mit persönlicher Einrichtung und laufender Betreuung – passend zu den Prozessen Ihres Unternehmens.',
    trusts: ['Kostenloses Erstgespräch','Individuelles Angebot','Transparente Projektplanung'],
    names: ['AI Starter','AI Business','AI Growth'],
    desc: [
      'Der einfache Einstieg für Selbstständige, kleine Unternehmen und lokale Dienstleister.',
      'Für Teams, die Kundenanfragen, Buchungen und bestehende Systeme verbinden möchten.',
      'Für wachsende Unternehmen mit mehreren Prozessen und erweitertem Automationsbedarf.',
    ],
    scope: [
      '1 Website-KI-Assistent mit FAQ-Wissensbasis und Kontaktweiterleitung',
      'Bis zu 2 vereinbarte n8n-Workflows und 1 Standard-Integration',
      'Bis zu 4 vereinbarte Workflows und 2 Standard-Integrationen',
    ],
    features: {
      chat:'KI-Assistent für häufige Kundenfragen',leads:'Kontaktanfragen erfassen',workflow:'n8n-Workflow-Automation',
      calendar:'Kalender- & Terminanfragen',crm:'CRM-Anbindung im vereinbarten Umfang',
      integration:'Anbindung vorhandener Systeme',analytics:'Basis-Reporting der Automationen',
      support:'Einrichtung, Tests & vereinbarte Betreuung',marketing:'Marketing-Automation-Basis',
    },
    setup:'Einmalige Einrichtung', monthly:'Monatliche Betreuung', from:'ab', per:'/ Monat',
    discount:'10 % Einführungsrabatt', savings:'99 € sparen', recommended:'Unsere Empfehlung',
    note:'10 % Rabatt ausschließlich auf die einmalige Starter-Einrichtung (990 € → 891 €). Der Monatspreis bleibt unverändert.',
    button:'Paket anfragen', included:'Leistungen im Überblick',
    compare:'Leistungen vergleichen', compareSub:'Wählen Sie den Umfang, der zu Ihrem Unternehmen passt.',
    fine:'Unverbindliche B2B-Einstiegspreise, netto (ggf. zzgl. gesetzlicher Umsatzsteuer). Einrichtung und monatliche Betreuung werden separat berechnet. API-, KI-Modell-, WhatsApp-, Telefonie-, Hosting- und Drittanbietergebühren können zusätzlich anfallen. Leistungsumfang, Nutzungsgrenzen, Laufzeit und Kündigungsbedingungen werden im individuellen Angebot festgelegt.',
    questions:'Häufige Fragen', faqs:[
      ['Was bedeutet „ab“ beim Preis?','Der Preis gilt für den beschriebenen grundlegenden Leistungsumfang. Individuelle Zusatzfunktionen und Sonderintegrationen werden vorab kalkuliert.'],
      ['Wofür gelten die 10 % Rabatt?','Nur für die einmalige Einrichtung von AI Starter: ab 891 € statt ab 990 €. Der Monatspreis bleibt bei ab 99 €.'],
      ['Sind KI- und n8n-Kosten inklusive?','Verbrauchsabhängige API-Kosten, Hosting und Drittanbieterleistungen sind nicht automatisch enthalten. Wir informieren vor Vertragsabschluss.'],
      ['Wie lange läuft der Vertrag?','Laufzeit und Kündigungsbedingungen stehen transparent im schriftlichen Angebot.'],
    ],
    endTitle:'Welche Automation lohnt sich für Sie?',endText:'Wir prüfen Ihre bestehenden Abläufe und empfehlen einen sinnvollen Einstieg.',endButton:'Kostenlose KI-Erstberatung',
  },
  en: {
    badge:'AI AUTOMATION · PLANS & PRICING',title:'Less busywork.',gradient:'More time for business.',
    intro:'Start with the right AI solution – from a smart assistant to connected business automation.',
    stripTitle:'Start small. Grow intelligently.',stripText:'Clear packages, personal setup and ongoing support tailored to your business.',
    trusts:['Free initial call','Tailored proposal','Clear project plan'],names:['AI Starter','AI Business','AI Growth'],
    desc:['An easy entry point for freelancers, small businesses and local services.','For teams connecting customer inquiries, bookings and existing systems.','For growing businesses with several processes and more advanced automation.'],
    scope:['1 website AI assistant with FAQ knowledge and contact forwarding','Up to 2 agreed n8n workflows with 1 standard integration','Up to 4 agreed workflows with 2 standard integrations'],
    features:{chat:'AI assistant for frequent questions',leads:'Capture customer inquiries',workflow:'n8n workflow automation',calendar:'Calendar & booking inquiries',crm:'CRM connection within agreed scope',integration:'Connect existing tools',analytics:'Basic automation reporting',support:'Setup, testing & agreed support',marketing:'Marketing automation basics'},
    setup:'One-time setup',monthly:'Monthly support',from:'from',per:'/ month',discount:'10% introductory discount',savings:'Save €99',recommended:'Recommended',
    note:'10% off the one-time AI Starter setup only (€990 → €891). Monthly support remains unchanged.',
    button:'Ask about this plan',included:'Included services',compare:'Compare packages',compareSub:'Choose the scope that suits your business.',
    fine:'Non-binding B2B starting prices, net (VAT may apply). Setup and monthly support are charged separately. Usage-based AI/API, WhatsApp, phone, hosting and third-party fees may apply. Final scope, usage limits, duration and cancellation are specified in the individual proposal.',
    questions:'Frequently asked questions',faqs:[
      ['What does “from” mean?','Prices cover the stated basic scope. Extra features and custom integrations are quoted separately.'],
      ['What does the 10% offer cover?','AI Starter one-time setup only: from €891 instead of €990. Monthly support stays from €99.'],
      ['Are AI and n8n costs included?','Usage-based API, hosting and third-party costs are not automatically included.'],
      ['Is there a contract term?','Duration and cancellation terms are set out in your written offer.'],
    ],
    endTitle:'Which automation makes sense for you?',endText:'We review your current workflows and suggest a sensible starting point.',endButton:'Free AI consultation',
  },
  ar: {
    badge:'أتمتة الذكاء الاصطناعي · الباقات والأسعار',title:'مهام متكررة أقل.',gradient:'وقت أكثر لنمو شركتك.',
    intro:'ابدأ بحل يناسب نشاطك، من مساعد ذكي إلى أتمتة العمليات وربط الأنظمة.',
    stripTitle:'ابدأ ببساطة. وتوسّع بذكاء.',stripText:'باقات واضحة مع الإعداد والمتابعة بحسب احتياجات شركتك.',
    trusts:['استشارة أولية مجانية','عرض مخصص','خطة تنفيذ واضحة'],names:['AI Starter','AI Business','AI Growth'],
    desc:['بداية مناسبة للأعمال الصغيرة والمستقلين والشركات المحلية.','للشركات التي تريد ربط الاستفسارات والمواعيد والأنظمة الحالية.','للشركات النامية التي تحتاج أتمتة عمليات مترابطة.'],
    scope:['مساعد AI واحد للموقع مع أسئلة شائعة وتحويل طلبات التواصل','حتى عمليتي n8n متفق عليهما مع تكامل قياسي واحد','حتى 4 عمليات أتمتة وتكاملين قياسيين بحسب الاتفاق'],
    features:{chat:'مساعد AI للأسئلة الشائعة',leads:'تنظيم طلبات العملاء',workflow:'أتمتة العمليات عبر n8n',calendar:'المواعيد والتقويم',crm:'ربط CRM حسب نطاق الاتفاق',integration:'ربط الأدوات الحالية',analytics:'تقارير مبسطة للأتمتة',support:'الإعداد والاختبار والمتابعة',marketing:'أساسيات أتمتة التسويق'},
    setup:'رسوم إعداد لمرة واحدة',monthly:'متابعة شهرية',from:'ابتداءً من',per:'/ شهرياً',discount:'خصم 10% على البداية',savings:'وفّر 99€',recommended:'الباقة الموصى بها',
    note:'خصم 10% على رسوم تأسيس AI Starter فقط (990€ ← 891€)، دون تغيير الاشتراك الشهري.',
    button:'استفسر عن الباقة',included:'الخدمات',compare:'مقارنة الباقات',compareSub:'اختر الخدمات التي تناسب طريقة عملك.',
    fine:'أسعار استرشادية للشركات، صافية (قد تُضاف ضريبة القيمة المضافة). رسوم التأسيس منفصلة عن المتابعة الشهرية. تكاليف AI وAPI وواتساب والاتصالات والاستضافة والخدمات الخارجية قد تُحسب بشكل إضافي. يحدد العرض المكتوب نطاق الخدمة وحدود الاستخدام ومدة العقد والإلغاء.',
    questions:'الأسئلة الشائعة',faqs:[
      ['ماذا يعني «ابتداءً من»؟','السعر يشمل نطاقاً أساسياً محدداً، ويُسعّر العمل الإضافي مسبقاً.'],
      ['ما الذي يشمله خصم 10%؟','رسوم تأسيس AI Starter فقط: ابتداءً من 891€ بدلاً من 990€. الاشتراك الشهري يبدأ من 99€.'],
      ['هل تكاليف AI وn8n مشمولة؟','تكاليف الاستهلاك والـAPI والاستضافة والخدمات الخارجية غير مشمولة تلقائياً.'],
      ['هل هناك مدة عقد ملزمة؟','مدة العقد وشروط الإلغاء تُحدد بوضوح في العرض المكتوب.'],
    ],
    endTitle:'أي أتمتة تناسب شركتك؟',endText:'نراجع خطوات العمل ونقترح حلاً يناسب الاحتياج.',endButton:'استشارة AI مجانية',
  },
};
const euro = (x: number) => '€' + new Intl.NumberFormat('de-DE').format(x);
export function PricingPage({lang}: {lang: Lang}) {
 const t = content[lang];
 const rtl = lang === 'ar';
 const prefix = lang === 'de' ? '' : '/' + lang;
 return (
  <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F4F7FB]">
   <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:pt-36">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.11),transparent_68%)]" />
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-4xl text-center">
      <SectionHeader badge={t.badge} title={t.title} titleGradient={t.gradient} subtitle={t.intro} />
     </div>
     <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-3xl border border-[#DCE5F7] bg-white px-6 py-6 shadow-[0_12px_42px_rgba(11,31,77,.05)] sm:flex-row sm:px-8">
      <div className="flex items-center gap-4">
       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2563EB]"><Sparkles size={22}/></div>
       <div><h2 className="text-lg font-extrabold text-[#0B1F4D]">{t.stripTitle}</h2><p className="mt-1 max-w-lg text-sm leading-6 text-[#52647E]">{t.stripText}</p></div>
      </div>
      <OpenConsultationButton lang={lang} />
     </div>
     <div className="mt-8 flex flex-wrap justify-center gap-3">
      {t.trusts.map((item,i)=>{
       const Icon = [MessagesSquare,ShieldCheck,Settings2][i];
       return <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#DCE5F7] bg-white px-4 py-2 text-xs font-semibold text-[#52647E]"><Icon size={15} className="text-[#3B82F6]"/>{item}</span>;
      })}
     </div>
     <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
      {offers.map((plan,index)=>(
       <motion.article key={plan.id} whileHover={{y:-3}} transition={{duration:.2}}
        className={'relative flex h-full min-w-0 flex-col rounded-[28px] border bg-white p-6 shadow-[0_16px_55px_rgba(11,31,77,.06)] sm:p-8 ' + (plan.recommended?'border-[#8BB3FF] ring-2 ring-[#E0E9FF]':'border-[#DCE5F7]')}>
        <div className="mb-4 flex min-h-[30px] flex-wrap items-center gap-2">
         {'original' in plan && <><span className="inline-flex items-center gap-1 rounded-full bg-[#EEE9FF] px-3 py-1.5 text-xs font-extrabold text-[#683DC7]"><Tag size={13}/>{t.discount}</span><span className="text-xs font-semibold text-[#52647E]">{t.savings}</span></>}
         {'recommended' in plan && <span className="rounded-full bg-[#2563EB] px-3 py-1.5 text-xs font-bold text-white">{t.recommended}</span>}
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-[#0B1F4D]">{t.names[index]}</h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#52647E]">{t.desc[index]}</p>
        <div className="mt-5 rounded-2xl border border-[#DFE7FA] bg-[#F8FAFF] p-5">
         <p className="text-xs font-bold uppercase tracking-wide text-[#52647E]">{t.setup}</p>
         <div className="mt-2 flex flex-wrap items-end gap-3">
          <span className="text-xs text-[#52647E]">{t.from}</span>
          <span className="text-3xl font-extrabold tracking-tight text-[#0B1F4D]">{euro(plan.setup)}</span>
          {'original' in plan && typeof plan.original === 'number' && <span className="pb-1 text-sm text-[#52647E] line-through">{euro(plan.original)}</span>}
         </div>
         <div className="my-4 h-px bg-[#DFE7FA]"/>
         <p className="text-xs font-bold uppercase tracking-wide text-[#52647E]">{t.monthly}</p>
         <p className="mt-2 text-2xl font-extrabold text-[#2563EB]"><span className="text-xs font-normal text-[#52647E]">{t.from} </span>{euro(plan.monthly)} <span className="text-xs font-medium text-[#52647E]">{t.per}</span></p>
        </div>
        <p className="mt-5 rounded-xl bg-[#EFF5FF] px-4 py-3 text-sm font-semibold leading-6 text-[#27466D]">{t.scope[index]}</p>
        <ul className="mt-6 flex-1 space-y-3">
         {plan.features.map(feature=>(
          <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[#36547A]">
           <span className="mt-1 rounded-full bg-[#E7F9F0] p-1 text-[#118E61]"><Check size={13}/></span>{t.features[feature]}
          </li>
         ))}
        </ul>
        <Link href={prefix + '/consultation'} className={'mt-8 flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-4 text-center text-sm font-bold transition-colors ' + (plan.recommended?'bg-[#2563EB] text-white hover:bg-[#1D4ED8]':'border border-[#B6CBF7] bg-white text-[#0B1F4D] hover:bg-[#EDF4FF]')}>
         {t.button}<ArrowRight size={16} className={rtl?'rotate-180':''}/>
        </Link>
       </motion.article>
      ))}
     </div>
     <p className="mx-auto mt-6 max-w-4xl text-center text-xs font-semibold leading-6 text-[#52647E]">{t.note}</p>
     <p className="mx-auto mt-2 max-w-5xl text-center text-xs leading-6 text-[#52647E]">{t.fine}</p>
     <section className="mt-24">
      <div className="mb-8 text-center"><h2 className="text-2xl font-extrabold text-[#0B1F4D] sm:text-3xl">{t.compare}</h2><p className="mt-3 text-[#52647E]">{t.compareSub}</p></div>
      <div className="overflow-x-auto rounded-3xl border border-[#DCE5F7] bg-white shadow-sm">
       <table className="w-full min-w-[600px]">
        <thead className="bg-[#F3F7FF]"><tr><th className="px-5 py-4 text-start text-sm text-[#0B1F4D]">{t.included}</th>{t.names.map(n=><th key={n} className="px-4 py-4 text-center text-sm text-[#0B1F4D]">{n}</th>)}</tr></thead>
        <tbody>{allFeatures.map((feature,i)=><tr key={feature} className={'border-t border-[#E9EFFA] ' +(i%2?'bg-[#FAFCFF]':'')}>
         <td className="px-5 py-3.5 text-sm text-[#36547A]">{t.features[feature]}</td>
         {offers.map(plan=><td key={plan.id} className="px-4 py-3.5 text-center">{plan.features.includes(feature)?<Check aria-label="Included" size={18} className="mx-auto text-[#13966B]"/>:<span aria-label="Not included" className="text-[#A1B0C6]">—</span>}</td>)}
        </tr>)}</tbody>
       </table>
      </div>
     </section>
     <section className="mx-auto mt-24 max-w-4xl">
      <h2 className="mb-8 text-center text-2xl font-extrabold text-[#0B1F4D] sm:text-3xl">{t.questions}</h2>
      <div className="space-y-3">{t.faqs.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#DCE5F7] bg-white p-5 shadow-sm">
       <summary className="cursor-pointer text-sm font-bold text-[#0B1F4D]">{q}</summary>
       <p className="mt-3 text-sm leading-7 text-[#52647E]">{a}</p>
      </details>)}</div>
     </section>
     <section className="mx-auto mt-24 max-w-4xl rounded-[28px] border border-[#D2DFFF] bg-white p-8 text-center shadow-[0_20px_65px_rgba(11,31,77,.06)] sm:p-12">
      <h2 className="text-2xl font-extrabold text-[#0B1F4D] sm:text-3xl">{t.endTitle}</h2>
      <p className="mx-auto mt-4 max-w-xl text-[#52647E]">{t.endText}</p>
      <div className="mt-7"><OpenConsultationButton lang={lang}/></div>
     </section>
    </div>
   </section>
  </div>
 );
}
