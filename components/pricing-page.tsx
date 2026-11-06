'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Tag, ShieldCheck, MessagesSquare, Settings2, Sparkles, Zap, Crown, Headphones } from 'lucide-react';
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
    title: 'KI-Automation.',
    gradient: 'Klare Lösungen. Faire Preise.',
    intro: 'Weniger manuelle Arbeit. Mehr Zeit für Ihre Kunden. Drei Pakete für den passenden Einstieg.',
    stripTitle: 'Der richtige Einstieg in KI-Automation.',
    stripText: 'Von einem smarten KI-Assistenten bis zur vernetzten Prozessautomatisierung – wir begleiten Sie vom Setup bis zur laufenden Optimierung.',
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
    button:'Jetzt Beratung anfragen', included:'Leistungen im Überblick',
    compare:'Leistungen vergleichen', compareSub:'Wählen Sie den Umfang, der zu Ihrem Unternehmen passt.',
    fine:'AI Starter: unverbindlicher B2B-Einstiegspreis netto, ggf. zzgl. Umsatzsteuer. Business und Growth: individuelles Angebot nach Prüfung. API-, KI-, WhatsApp-, Telefonie-, Hosting- und Drittanbietergebühren können zusätzlich anfallen. Leistungsumfang und Vertragsbedingungen werden schriftlich festgelegt.',
    questions:'Häufige Fragen', faqs:[
      ['Was bedeutet „ab“ beim Preis?','Der Preis gilt für den beschriebenen grundlegenden Leistungsumfang. Individuelle Zusatzfunktionen und Sonderintegrationen werden vorab kalkuliert.'],
      ['Wofür gelten die 10 % Rabatt?','Nur für die einmalige Einrichtung von AI Starter: ab 891 € statt ab 990 €. Der Monatspreis bleibt bei ab 99 €.'],
      ['Sind KI- und n8n-Kosten inklusive?','Verbrauchsabhängige API-Kosten, Hosting und Drittanbieterleistungen sind nicht automatisch enthalten. Wir informieren vor Vertragsabschluss.'],
      ['Wie lange läuft der Vertrag?','Laufzeit und Kündigungsbedingungen stehen transparent im schriftlichen Angebot.'],
    ],
    endTitle:'Welche Automation lohnt sich für Sie?',endText:'Wir prüfen Ihre bestehenden Abläufe und empfehlen einen sinnvollen Einstieg.',endButton:'Kostenlose KI-Erstberatung',
  },
  en: {
    badge:'AI AUTOMATION · PLANS & PRICING',title:'AI automation.',gradient:'Clear solutions. Fair prices.',
    intro:'Less repetitive work, more time for customers. Three plans for a practical start.',
    stripTitle:'The right start with AI automation.',stripText:'From a smart AI assistant to connected workflows, we guide you from setup to optimization.',
    trusts:['Free initial call','Tailored proposal','Clear project plan'],names:['AI Starter','AI Business','AI Growth'],
    desc:['An easy entry point for freelancers, small businesses and local services.','For teams connecting customer inquiries, bookings and existing systems.','For growing businesses with several processes and more advanced automation.'],
    scope:['1 website AI assistant with FAQ knowledge and contact forwarding','Up to 2 agreed n8n workflows with 1 standard integration','Up to 4 agreed workflows with 2 standard integrations'],
    features:{chat:'AI assistant for frequent questions',leads:'Capture customer inquiries',workflow:'n8n workflow automation',calendar:'Calendar & booking inquiries',crm:'CRM connection within agreed scope',integration:'Connect existing tools',analytics:'Basic automation reporting',support:'Setup, testing & agreed support',marketing:'Marketing automation basics'},
    setup:'One-time setup',monthly:'Monthly support',from:'from',per:'/ month',discount:'10% introductory discount',savings:'Save €99',recommended:'Recommended',
    note:'10% off the one-time AI Starter setup only (€990 → €891). Monthly support remains unchanged.',
    button:'Request a consultation',included:'Included services',compare:'Compare packages',compareSub:'Choose the scope that suits your business.',
    fine:'AI Starter is a non-binding B2B starting price, net (VAT may apply). Business and Growth are individually quoted. AI, API, hosting and third-party charges may apply. Final scope and terms are agreed in writing.',
    questions:'Frequently asked questions',faqs:[
      ['What does “from” mean?','Prices cover the stated basic scope. Extra features and custom integrations are quoted separately.'],
      ['What does the 10% offer cover?','AI Starter one-time setup only: from €891 instead of €990. Monthly support stays from €99.'],
      ['Are AI and n8n costs included?','Usage-based API, hosting and third-party costs are not automatically included.'],
      ['Is there a contract term?','Duration and cancellation terms are set out in your written offer.'],
    ],
    endTitle:'Which automation makes sense for you?',endText:'We review your current workflows and suggest a sensible starting point.',endButton:'Free AI consultation',
  },
  ar: {
    badge:'أتمتة الذكاء الاصطناعي · الباقات والأسعار',title:'أتمتة أعمالك.',gradient:'حلول واضحة وأسعار مناسبة.',
    intro:'مهام يدوية أقل ووقت أكثر للعملاء، مع ثلاث باقات تناسب احتياجاتك.',
    stripTitle:'البداية الصحيحة مع أتمتة الأعمال.',stripText:'من المساعد الذكي إلى ربط العمليات، نساعدك في الإعداد والتطوير والمتابعة.',
    trusts:['استشارة أولية مجانية','عرض مخصص','خطة تنفيذ واضحة'],names:['AI Starter','AI Business','AI Growth'],
    desc:['بداية مناسبة للأعمال الصغيرة والمستقلين والشركات المحلية.','للشركات التي تريد ربط الاستفسارات والمواعيد والأنظمة الحالية.','للشركات النامية التي تحتاج أتمتة عمليات مترابطة.'],
    scope:['مساعد AI واحد للموقع مع أسئلة شائعة وتحويل طلبات التواصل','حتى عمليتي n8n متفق عليهما مع تكامل قياسي واحد','حتى 4 عمليات أتمتة وتكاملين قياسيين بحسب الاتفاق'],
    features:{chat:'مساعد AI للأسئلة الشائعة',leads:'تنظيم طلبات العملاء',workflow:'أتمتة العمليات عبر n8n',calendar:'المواعيد والتقويم',crm:'ربط CRM حسب نطاق الاتفاق',integration:'ربط الأدوات الحالية',analytics:'تقارير مبسطة للأتمتة',support:'الإعداد والاختبار والمتابعة',marketing:'أساسيات أتمتة التسويق'},
    setup:'رسوم إعداد لمرة واحدة',monthly:'متابعة شهرية',from:'ابتداءً من',per:'/ شهرياً',discount:'خصم 10% على البداية',savings:'وفّر 99€',recommended:'الباقة الموصى بها',
    note:'خصم 10% على رسوم تأسيس AI Starter فقط (990€ ← 891€)، دون تغيير الاشتراك الشهري.',
    button:'اطلب استشارة الآن',included:'الخدمات',compare:'مقارنة الباقات',compareSub:'اختر الخدمات التي تناسب طريقة عملك.',
    fine:'Starter سعر مبدئي للشركات قبل الضريبة المحتملة. باقتا Business وGrowth بسعر مخصص بعد دراسة الطلب. قد تُضاف تكاليف API والذكاء الاصطناعي والاستضافة والخدمات الخارجية. تُحدد التفاصيل والشروط في العرض المكتوب.',
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
  <div dir={rtl ? 'rtl' : 'ltr'} className="ovivo-pricing-page min-h-screen overflow-x-hidden bg-[#FFFFFF]">
   <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:pt-36">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_68%)]" />
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-3xl text-center">
      <SectionHeader badge={t.badge} title={t.title} titleGradient={t.gradient} subtitle={t.intro} />
     </div>
     <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-[0_12px_34px_rgba(15,23,42,.04)] md:flex-row md:p-8">
      <div className="flex items-center gap-4">
       <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]"><Sparkles size={22}/></div>
       <div><h2 className="text-xl font-extrabold text-[#0B1F4D]">{t.stripTitle}</h2><p className="mt-2 max-w-xl text-sm leading-7 text-[#5B6B84]">{t.stripText}</p></div>
      </div>
      <Link href={prefix + '/consultation'} className="ovivo-pricing-hero-cta group inline-flex min-h-[54px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-center text-sm font-bold text-white shadow-[0_10px_26px_rgba(59,130,246,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-[0_15px_34px_rgba(59,130,246,.24)] motion-reduce:transform-none">{lang === 'de' ? 'Jetzt kostenlose Erstberatung sichern' : lang === 'en' ? 'Book a free consultation' : 'احجز استشارة مجانية'}<ArrowRight size={17} className={rtl ? 'rotate-180' : ''}/></Link>
     </div>
     <div className="mt-8 flex flex-wrap justify-center gap-3">
      {t.trusts.map((item,i)=>{
       const Icon = [MessagesSquare,ShieldCheck,Settings2][i];
       return <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#DCE5F7] bg-white px-4 py-2 text-xs font-semibold text-[#52647E]"><Icon size={15} className="text-[#3B82F6]"/>{item}</span>;
      })}
     </div>
     <div className="mt-12 grid items-stretch gap-7 lg:grid-cols-3">
      {offers.map((plan,index)=>{
       const PlanIcon = plan.id === 'starter' ? Zap : plan.id === 'business' ? Sparkles : Crown;
       return (
       <motion.article key={plan.id} whileHover={{y:plan.recommended ? -6 : -5}} transition={{duration:.25,ease:'easeOut'}}
        className={'ovivo-price-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border bg-white p-7 transition-all duration-300 sm:p-8 ' + (plan.recommended ? 'ovivo-price-featured border-[#2563EB] shadow-[0_18px_48px_rgba(37,99,235,.13)] ring-1 ring-[#2563EB] hover:shadow-[0_28px_65px_rgba(37,99,235,.20)]' : 'border-[#E2E8F0] shadow-[0_12px_36px_rgba(15,23,42,.055)] hover:border-[#93C5FD] hover:shadow-[0_24px_55px_rgba(15,23,42,.12)]')}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#3B82F6] to-[#885CF6] opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
        <div className="mb-6 flex min-h-[54px] items-center justify-between gap-2">
         <div className={'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ' + (plan.recommended ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20' : 'bg-[#EFF6FF] text-[#2563EB]')}><PlanIcon size={26}/></div>
         <div className="flex flex-wrap justify-end gap-2">
         {'original' in plan && <><span className="inline-flex items-center gap-1 rounded-full border border-[#DDD0FF] bg-[#F1EAFE] px-3 py-1.5 text-xs font-extrabold text-[#6D28D9]"><Tag size={13}/>{t.discount}</span><span className="text-xs font-semibold text-[#52647E]">{t.savings}</span></>}
         {'recommended' in plan && <span className="ovivo-price-featured-badge rounded-full bg-[#3B82F6] px-3 py-1.5 text-xs font-bold text-white shadow-sm">{t.recommended}</span>}
         </div>
        </div>
        <h3 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#0B1F4D] md:text-[36px]">{t.names[index]}</h3>
        <p className="mt-3 min-h-[74px] text-[15px] leading-7 text-[#5B6B84]">{t.desc[index]}</p>
        <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
         <p className="text-xs font-bold uppercase tracking-wide text-[#52647E]">{plan.id==='starter'?t.setup:(lang==='de'?'Individuelles Angebot':lang==='en'?'Tailored quote':'عرض سعر مخصص')}</p>
         <div className="mt-2 flex flex-wrap items-end gap-3">
          {plan.id==='starter' ? <><span className="text-xs text-[#52647E]">{t.from}</span><span className="text-4xl font-extrabold tracking-tight text-[#0B1F4D]">{euro(plan.setup)}</span></> : <span className="text-xl font-extrabold leading-7 text-[#0B1F4D]">{lang==='de'?'Preis auf Anfrage':lang==='en'?'Price on request':'السعر بعد دراسة الطلب'}</span>}
          {'original' in plan && typeof plan.original === 'number' && <span className="pb-1 text-sm text-[#52647E] line-through">{euro(plan.original)}</span>}
         </div>
         <div className="my-4 h-px bg-[#DFE7FA]"/>
         <p className="text-xs font-bold uppercase tracking-wide text-[#52647E]">{t.monthly}</p>
         {plan.id==='starter' ? <p className="mt-2 text-3xl font-extrabold text-[#2563EB]"><span className="text-xs font-normal text-[#52647E]">{t.from} </span>{euro(plan.monthly)} <span className="text-xs font-medium text-[#52647E]">{t.per}</span></p> : <p className="mt-2 text-base font-bold text-[#52647E]">{lang==='de'?'Nach Leistungsumfang':lang==='en'?'Based on service scope':'بحسب نطاق الخدمة'}</p>}
        </div>
        <p className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold leading-6 text-[#334155]">{t.scope[index]}</p>
        <ul className="mt-7 flex-1 space-y-4">
         {plan.features.map(feature=>(
          <li key={feature} className="flex items-start gap-3 text-[15px] leading-7 text-[#36547A] transition-colors duration-200 group-hover:text-[#0B1F4D]">
           <span className="mt-1 rounded-full bg-[#EAF8F1] p-1 text-[#13966B]"><Check size={13}/></span>{t.features[feature]}
          </li>
         ))}
        </ul>
        <Link href={prefix + '/request?service=' + plan.id} className={'ovivo-pricing-cta mt-9 flex min-h-[56px] items-center justify-center gap-2 rounded-xl px-5 text-center text-sm font-extrabold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#885CF6] motion-reduce:transform-none ' + (plan.recommended ? 'ovivo-pricing-cta-primary bg-[#3B82F6] text-white shadow-[0_12px_30px_rgba(37,99,235,.25)] hover:bg-[#1D4ED8] hover:shadow-[0_18px_40px_rgba(37,99,235,.32)]' : plan.id === 'growth' ? 'ovivo-pricing-cta-growth border border-[#0B1F4D] bg-white text-[#0B1F4D] shadow-[0_10px_25px_rgba(16,24,40,.20)] hover:bg-[#E0E7FF]' : 'ovivo-pricing-cta-secondary border-2 border-[#0B1F4D] bg-white text-[#1D4ED8] shadow-sm hover:bg-[#EFF6FF] hover:shadow-[0_12px_26px_rgba(37,99,235,.10)]')}>
         {plan.id === 'starter' ? (lang === 'de' ? 'Mit Starter beginnen' : lang === 'en' ? 'Start with Starter' : 'ابدأ مع Starter') : plan.recommended ? (lang === 'de' ? 'Empfohlene Lösung anfragen' : lang === 'ar' ? 'اطلب الحل الموصى به' : 'Request recommended solution') : (lang === 'de' ? 'Wachstumslösung anfragen' : lang === 'en' ? 'Explore Growth' : 'استكشف Growth')}<ArrowRight size={16} className={rtl?'rotate-180':''}/>
        </Link>
       </motion.article>
       );
      })}
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
     <section className="mx-auto mt-24 max-w-4xl rounded-[30px] border border-[#D9E4F5] bg-white p-8 text-center shadow-[0_20px_60px_rgba(11,31,77,.07)] sm:p-12">
      <h2 className="text-2xl font-extrabold text-[#0B1F4D] sm:text-3xl">{t.endTitle}</h2>
      <p className="mx-auto mt-4 max-w-xl text-[#52647E]">{t.endText}</p>
      <div className="mt-7"><OpenConsultationButton lang={lang}/></div>
     </section>
    </div>
   </section>
  </div>
 );
}
