import Link from 'next/link';
import { ArrowRight, Bot, Workflow, CalendarDays, Database, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

const c={
de:{
badge:'KI-AUTOMATION FÜR UNTERNEHMEN',title:'KI-Automation & n8n-Workflows für Unternehmen',
subtitle:'Weniger manuelle Arbeit, schnellere Abläufe und besser organisierte Kundenanfragen: OVIVO entwickelt KI-Automation, intelligente Assistenten und individuelle Workflow-Integrationen für Unternehmen in Deutschland.',
cta:'Kostenlose Automationsanalyse anfragen',ctaSecondary:'Alle Softwarelösungen',
heading:'Welche Prozesse können wir automatisieren?',heading2:'So entsteht Ihre individuelle Automation',faqTitle:'Häufige Fragen zur KI-Automation',
items:[
['KI-Chatbots & Kundenservice','KI-Assistenten unterstützen bei häufigen Kundenfragen, Kontaktaufnahme und der strukturierten Bearbeitung von Anfragen.'],
['n8n Workflow-Automation','Wir verbinden geeignete Anwendungen und automatisieren wiederkehrende Aufgaben, Benachrichtigungen und Datenflüsse.'],
['CRM & Lead-Automation','Neue Kontakte erfassen, Leads strukturieren und sinnvolle Nachfassprozesse mit CRM-Systemen verbinden.'],
['Termin- & Buchungsautomation','Terminwünsche aufnehmen, Kalender integrieren und Bestätigungen oder Erinnerungen vorbereiten.'],
['WhatsApp & E-Mail Workflows','Wiederkehrende Kommunikation anhand definierter Regeln und genehmigter Integrationen organisieren.'],
['Individuelle Schnittstellen','Bestehende Tools und Unternehmenssoftware über geeignete APIs und sichere Prozesse verbinden.']
],steps:[
['Prozesse analysieren','Wir erfassen Ihre aktuellen Abläufe, Systeme und wiederkehrenden Tätigkeiten.'],
['Automationskonzept erstellen','Sie erhalten eine auf Ihren Betrieb zugeschnittene Empfehlung und ein individuelles Angebot.'],
['Entwickeln & testen','Wir entwickeln die vereinbarten Workflows und testen sie vor einer produktiven Freigabe.'],
['Einführung & Betreuung','Wir dokumentieren die Lösung und vereinbaren die passende technische Betreuung.']
],faq:[
['Was kostet eine KI-Automation?','Die Kosten hängen von Integrationen, Komplexität, Nutzungsvolumen und Betreuung ab. Nach einer kurzen Analyse erhalten Sie ein individuelles Angebot.'],
['Kann OVIVO n8n mit meinem CRM verbinden?','Bei geeigneten Schnittstellen können wir n8n mit CRM-, Kalender-, E-Mail- und weiteren Anwendungen integrieren.'],
['Brauche ich eine neue Software?','Nicht unbedingt. Häufig können vorhandene Tools über APIs oder geeignete Integrationen miteinander verbunden werden.'],
['Wie wird der Datenschutz berücksichtigt?','Wir prüfen Datenflüsse und Anbieter im jeweiligen Projekt. Die rechtliche und technische Umsetzung richtet sich nach den konkreten Anforderungen.']
],industries:'Für Gastronomie, Dienstleister, Handwerk, Agenturen und andere Unternehmen mit wiederkehrenden Abläufen.',
note:'Keine pauschalen Erfolgsgarantien: Umfang, Laufzeiten und Integrationen werden projektspezifisch vereinbart.'
},
en:{badge:'AI AUTOMATION FOR BUSINESS',title:'AI automation & n8n workflows for businesses',subtitle:'Simplify recurring processes and customer inquiries. OVIVO builds AI assistants, n8n workflows and integrations tailored to your business.',cta:'Request a free automation review',ctaSecondary:'Explore software services',heading:'What can we automate?',heading2:'How we build your automation',faqTitle:'AI automation FAQ',items:[['AI chatbots & support','Assistants for common questions and inquiries.'],['n8n workflow automation','Connect apps and automate routine tasks.'],['CRM & lead automation','Capture and organize inquiries and follow-ups.'],['Bookings & scheduling','Connect calendars and organize reminders.'],['WhatsApp & email flows','Streamline recurring communications.'],['Custom integrations','Connect your software using suitable APIs.']],steps:[['Review','Understand your processes and tools.'],['Design','Plan workflows and prepare a proposal.'],['Build and test','Implement and test agreed integrations.'],['Launch and support','Document and maintain the solution.']],faq:[['How much does it cost?','Pricing depends on scope, integrations and usage. We provide individual quotes.'],['Can you integrate n8n with our CRM?','Yes, where suitable APIs or integrations are available.'],['Do we need new software?','Often existing tools can be connected.'],['What about privacy?','We assess data flows and applicable requirements for each project.']],industries:'For hospitality, services, trades and teams with repetitive work.',note:'Results, timelines and scope depend on the individual project.'},
ar:{badge:'أتمتة الذكاء الاصطناعي للشركات',title:'أتمتة الأعمال بالذكاء الاصطناعي وn8n',subtitle:'نبني مساعدين ذكيين وسير عمل مؤتمتاً لربط الأدوات وتنظيم طلبات العملاء والعمليات المتكررة حسب احتياجات شركتك.',cta:'اطلب تحليل أتمتة مجاني',ctaSecondary:'تصفح حلول البرامج',heading:'شو العمليات التي يمكن أتمتتها؟',heading2:'كيف نبني نظام الأتمتة؟',faqTitle:'الأسئلة الشائعة',items:[['الشات الذكي وخدمة العملاء','مساعدون ذكيون للاستفسارات والأسئلة المتكررة.'],['أتمتة n8n','ربط البرامج وتبسيط الأعمال الروتينية.'],['CRM ومتابعة العملاء','جمع بيانات العملاء وتنظيم المتابعة.'],['المواعيد والحجوزات','ربط التقويم وتنظيم رسائل التذكير.'],['واتساب والبريد الإلكتروني','تنظيم التواصل المتكرر باستخدام أدوات مناسبة.'],['الربط المخصص','ربط أنظمة شركتك بواجهات API متاحة.']],steps:[['التحليل','نراجع أدوات الشركة وعملياتها.'],['التخطيط','نقترح الحل ونجهز عرض سعر مخصصاً.'],['البرمجة والاختبار','ننفذ ونختبر العمليات المتفق عليها.'],['التشغيل والدعم','نوثق النظام ونتفق على الدعم.']],faq:[['كم التكلفة؟','التكلفة تعتمد على حجم المشروع والربط والاستخدام.'],['هل يمكن ربط CRM مع n8n؟','نعم إذا كانت واجهات الربط مناسبة ومتاحة.'],['هل أحتاج برنامجاً جديداً؟','في حالات كثيرة يمكن ربط أدواتك الحالية.'],['كيف تحمون البيانات؟','نراجع تدفق البيانات والمتطلبات الخاصة بكل مشروع.']],industries:'للمطاعم والشركات الخدمية والحرفيين وأي نشاط يتكرر فيه العمل الإداري.',note:'النتائج والمدة ونطاق العمل تختلف حسب المشروع.'}
} as const;

const icons=[Bot,Workflow,Database,CalendarDays,MessageCircle,ShieldCheck];
export function AutomationLanding({lang}:{lang:Lang}){
 const x=c[lang];const prefix=lang==='de'?'':'/'+lang;
 return <div dir={lang==='ar'?'rtl':'ltr'} className="bg-[#F4F7FB] px-4 pb-20 pt-20 sm:px-6">
  <div className="mx-auto max-w-6xl">
    <header className="max-w-4xl">
      <span className="rounded-full border border-[#BBD4FF] bg-white px-4 py-2 text-xs font-bold tracking-wide text-[#2563EB]">{x.badge}</span>
      <h1 className="mt-7 text-4xl font-extrabold leading-tight text-[#0B1F4D] sm:text-5xl">{x.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#52647E]">{x.subtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={prefix+'/request?service=automation'} className="ovivo-consultation-trigger inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-bold text-white hover:bg-[#2563EB]">{x.cta}<ArrowRight size={17}/></Link>
        <Link href={prefix+'/software'} className="inline-flex min-h-[52px] items-center rounded-xl border border-[#BFD3F8] bg-white px-6 text-sm font-semibold text-[#0B1F4D]">{x.ctaSecondary}</Link>
      </div>
    </header>
    <section className="mt-20" aria-labelledby="ovivo-automation-services">
      <h2 id="ovivo-automation-services" className="text-3xl font-extrabold text-[#0B1F4D]">{x.heading}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {x.items.map(([title,desc],i)=>{const Icon=icons[i];return <article key={title} className="rounded-2xl border border-[#DCE5F7] bg-white p-6 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF3FF] text-[#2563EB]"><Icon size={24}/></span><h3 className="mt-5 text-lg font-bold text-[#0B1F4D]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#52647E]">{desc}</p></article>})}
      </div>
    </section>
    <section className="mt-20" aria-labelledby="ovivo-automation-process">
      <h2 id="ovivo-automation-process" className="text-3xl font-extrabold text-[#0B1F4D]">{x.heading2}</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{x.steps.map(([title,desc],i)=><article key={title} className="rounded-2xl border border-[#DCE5F7] bg-white p-5"><span className="text-xs font-extrabold text-[#2563EB]">0{i+1}</span><h3 className="mt-3 font-bold text-[#0B1F4D]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#52647E]">{desc}</p></article>)}</div>
      <p className="mt-5 text-sm leading-7 text-[#52647E]">{x.industries}</p>
    </section>
    <section className="mt-20" aria-labelledby="ovivo-automation-faq">
      <h2 id="ovivo-automation-faq" className="text-3xl font-extrabold text-[#0B1F4D]">{x.faqTitle}</h2>
      <div className="mt-6 space-y-3">{x.faq.map(([q,a])=><details key={q} className="rounded-xl border border-[#DCE5F7] bg-white px-6 py-5"><summary className="cursor-pointer font-bold text-[#0B1F4D]">{q}</summary><p className="mt-3 text-sm leading-7 text-[#52647E]">{a}</p></details>)}</div>
      <p className="mt-7 text-xs leading-6 text-[#52647E]">{x.note}</p>
    </section>
  </div>
 </div>;
}
