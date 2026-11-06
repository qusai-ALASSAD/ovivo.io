'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CalendarDays, FileText, Boxes, ClipboardList, Sparkles, Wrench, Dumbbell, ExternalLink, LayoutDashboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

type Product={id:string;icon:LucideIcon;name:string;category:'operations'|'industry'|'platform';status:'private'|'pending'|'private';description:{de:string;en:string;ar:string};features:{de:string[];en:string[];ar:string[]};};
const products:Product[]=[
 {id:'invoicing',icon:FileText,name:'OVIVO Invoice Manager – Rechnungen & Angebote',category:'operations',status:'pending',
 description:{de:'Individuelle Softwarelösung für Rechnungen, Angebote, Kundenverwaltung und PDF-Dokumente. Umfang und Funktionen werden nach Projektanalyse vereinbart.',en:'Invoice and document management project with PDFs, receipts and customers.',ar:'مشروع لإدارة الفواتير والعملاء والمستندات وملفات PDF.'},
 features:{de:['Angebote & Rechnungen','Kunden & Kontakte','PDF-Dokumente','Zahlungsstatus','Dokumentenarchiv','Individuelle Anpassungen'],en:['Invoice management','Receipt archive','PDF output'],ar:['إدارة الفواتير','أرشيف المستندات','ملفات PDF']}},
 {id:'putzgo',icon:Sparkles,name:'PutzGo',category:'platform',status:'private',
 description:{de:'Plattform für Reinigungsanfragen und die Vermittlung passender Reinigungsunternehmen.',en:'Platform for cleaning inquiries and connecting customers with cleaning companies.',ar:'منصة لاستقبال طلبات التنظيف وربط العملاء بشركات التنظيف.'},
 features:{de:['Reinigungsanfragen','Dienstleistungsauswahl','Firmenprofile','Partnerbereich','Angebotsanfragen'],en:['Customer inquiries','Business profiles','Partner area'],ar:['طلبات العملاء','ملفات الشركات','لوحة الشركاء']}},
 {id:'workhub',icon:Wrench,name:'OVIVO WorkHub – Betriebsmanagement',category:'operations',status:'private',
 description:{de:'Zentrales Betriebssystem für Aufgaben, Projekte, Mitarbeiter, Lager, Angebote und interne Kommunikation.',en:'Work platform for projects, orders, materials, maintenance and operations.',ar:'منصة لإدارة المشاريع والطلبات والمواد والصيانة والعمليات.'},
 features:{de:['Aufträge & Projekte','Aufgaben & Team-Feed','Mitarbeiter & Rollen','Lager & Bestellungen','Angebote & Rechnungen','Berichte & Fotogalerie'],en:['Orders & projects','Material requests','Invoice workflows'],ar:['الطلبات والمشاريع','طلبات المواد','إدارة الفواتير']}},
 {id:'resto',icon:ClipboardList,name:'Ostvell Resto',category:'industry',status:'private',
 description:{de:'Gastronomie-Software-Demo für digitale Abläufe in Restaurants und Cafés.',en:'Restaurant and café software demo for digital operations.',ar:'عرض برمجي لإدارة العمليات الرقمية في المطاعم والمقاهي.'},
 features:{de:['Gastronomie-Prozesse','Digitale Oberfläche','Betriebsorganisation','Individuelle Erweiterungen'],en:['Hospitality','Digital workflow','View demo'],ar:['قطاع المطاعم','تنظيم العمليات','تجربة العرض']}},
 {id:'plan',icon:CalendarDays,name:'OVIVO Dienstplaner / Ostvell Plan',category:'operations',status:'private',
 description:{de:'Digitaler Dienstplan für Mitarbeitende, Schichten, Urlaub, Krankmeldungen und Arbeitsstunden — mit Berichten und Abrechnung.',en:'Employee scheduling with shifts, worked hours and personnel cost tracking.',ar:'برنامج دوام الموظفين والورديات وساعات العمل وحساب تكلفة الموظفين.'},
 features:{de:['Raster / Woche / Kalender','Früh-, Spät- & Nachtschicht','Urlaub & Krankheit','Anträge & Aufgaben','Abrechnung & Stunden','Wochen & Monate kopieren'],en:['Shift planning','Hours & shifts','Staff costs'],ar:['جداول الدوام','الساعات والورديات','تكاليف الموظفين']}},
 {id:'inventory',icon:Boxes,name:'Inventur & Lager',category:'operations',status:'private',
 description:{de:'Inventur- und Bestandsverwaltung mit Wareneingang, Belegarchiv und Auswertungen.',en:'Inventory management with goods receiving, document archive and reporting.',ar:'إدارة الجرد والمخزون واستلام البضاعة وأرشفة الفواتير والتقارير.'},
 features:{de:['Inventur & Artikel','Wareneingang','Belegarchiv','Bestandsbewegungen','Monatsauswertungen'],en:['Stocktaking','Goods & receipts','Monthly overview'],ar:['الجرد والمخزون','الفواتير واستلام البضاعة','التقارير الشهرية']}},
 {id:'housekeeping',icon:LayoutDashboard,name:'Hotel Housekeeping System',category:'industry',status:'private',
 description:{de:'Housekeeping-Verwaltung für Hotels, Mitarbeitende, Zimmer, Arbeitszeiten und Qualitätskontrolle.',en:'Housekeeping management for hotels, staff, rooms, hours and quality checks.',ar:'تطبيق لإدارة تنظيف الفنادق والموظفين والغرف وساعات العمل والجودة.'},
 features:{de:['Hotels & Zimmertypen','Aufgabenzuweisung','Mitarbeiter & Berechtigungen','Stunden & Zimmerleistung','Qualitätskontrolle','Monatsberichte'],en:['Rooms & staff','Hours & output','Quality checks'],ar:['الغرف والموظفين','ساعات العمل والإنتاجية','التفتيش والجودة']}},
 {id:'gym',icon:Dumbbell,name:'Gym / Fitness App',category:'industry',status:'pending',
 description:{de:'Konzept für Fitness- und Studioverwaltung. Individuelle Funktionen werden erst nach Projektabstimmung festgelegt.',en:'Fitness and gym application listed as a project; public demo link to be added.',ar:'مشروع برنامج جيم/لياقة بدنية، سيتم إضافة رابط الديمو عند توفره.'},
 features:{de:['Mitglieder (Konzept)','Kurse & Termine (Konzept)','Mitgliedschaften (Konzept)','Auswertungen (Konzept)'],en:['Fitness software','App project','Demo pending'],ar:['برنامج لياقة','مشروع تطبيق','رابط الديمو لاحقاً']}},
 {id:'cost',icon:FileText,name:'OVIVO Cost Calculator',category:'operations',status:'pending',
 description:{de:'Kalkulationskonzept für Personal-, Material- und Projektkosten als Grundlage für individuelle Angebote.',en:'Cost-calculation concept for staffing, materials and project estimates.',ar:'فكرة برنامج لحساب تكاليف الموظفين والمواد والمشاريع وتجهيز عروض الأسعار.'},
 features:{de:['Personalkosten (Konzept)','Materialaufwand (Konzept)','Projektkalkulation (Konzept)','Angebotsbasis (Konzept)'],en:['Staff cost estimates','Material estimates','Project costs','Quote preparation'],ar:['تكاليف الموظفين','تكاليف المواد','حساب تكلفة المشروع','تجهيز عرض سعر']}},
];

const copy={
 de:{badge:'SOFTWARE & APPS',title:'Software, die im',accent:'Alltag hilft.',intro:'Entdecken Sie unsere Lösungen für Rechnungen, Personalplanung, Betriebssteuerung und weitere Geschäftsprozesse. Für jedes Unternehmen erstellen wir ein individuelles Angebot.',filterAll:'Alle Projekte',filterOperations:'Business & Verwaltung',filterIndustry:'Branchensoftware',filterPlatform:'Plattformen',view:'Angebot anfordern',pending:'Keine öffentliche Demo',request:'Ähnliche Software anfragen',status:'Projekt / Demo',pendingStatus:'In Entwicklung',privateStatus:'Interne Referenz',note:'Keine öffentlichen Programmzugänge. Softwarelösungen werden individuell angeboten; vertrauliche Kundenprojekte bleiben geschützt.',footerTitle:'Sie benötigen eine eigene Software?',footerText:'Wir besprechen Ihre Prozesse und planen eine passende individuelle Web-App oder Automationslösung.',footerButton:'Software-Projekt anfragen',imageHint:'Projektvorschau — Screenshot wird ergänzt'},
 en:{badge:'SOFTWARE & APPS',title:'Software built for',accent:'real work.',intro:'Explore tailored software solutions for invoices, workforce scheduling and business management. Request a personalized offer for your business.',filterAll:'All projects',filterOperations:'Business & operations',filterIndustry:'Industry apps',filterPlatform:'Platforms',view:'Request quote',pending:'No public demo',request:'Request similar software',status:'Project / demo',pendingStatus:'In development',privateStatus:'Private project',note:'No direct software access is offered. We prepare tailored proposals and protect private customer systems.',footerTitle:'Need your own application?',footerText:'Tell us about your workflows and we can plan a custom web application or automation solution.',footerButton:'Request software project',imageHint:'Project preview — screenshot to be added'},
 ar:{badge:'البرامج والتطبيقات',title:'برامج من تطويرنا',accent:'لإدارة الأعمال.',intro:'حلول برمجية للفواتير وإدارة الموظفين والمشاريع، مع عروض أسعار مخصصة لاحتياجات كل شركة.',filterAll:'كل المشاريع',filterOperations:'الإدارة والأعمال',filterIndustry:'برامج القطاعات',filterPlatform:'المنصات',view:'اطلب عرض سعر',pending:'لا يوجد ديمو عام',request:'اطلب برنامجاً مشابهاً',status:'مشروع / ديمو',pendingStatus:'قيد التطوير',privateStatus:'مشروع خاص',note:'لا توجد روابط مباشرة للبرامج. نقدم عروضاً مخصصة ونحمي أنظمة العملاء الخاصة.',footerTitle:'تحتاج برنامجاً خاصاً بشركتك؟',footerText:'نناقش عمليات شركتك ونصمم لك تطبيق ويب أو نظام أتمتة مناسب.',footerButton:'اطلب تطوير برنامج',imageHint:'معاينة المشروع — سيتم إضافة صورة لاحقاً'},
};

function SoftwarePreview({id,lang}:{id:string;lang:Lang}) {
  // Illustrative, synthetic UI only. No real client screenshots, names, customer records or live URLs.
  const labels:Record<string,{title:string;nav:string[];metrics:[string,string,string];rows:string[];accent:string}>={
    workhub:{title:'WorkHub · Übersicht',nav:['Aufträge','Aufgaben','Projekte','Lager','Mitarbeiter'],metrics:['12 Projekte','4 Aufgaben','3 Teams'],rows:['Projekt A','Auftrag B','Wartung C'],accent:'#2563EB'},
    plan:{title:'Dienstplan · Juli',nav:['Raster','Woche','Kalender'],metrics:['Früh','Spät','Nacht'],rows:['Team 01','Team 02','Team 03'],accent:'#6366F1'},
    invoicing:{title:'Rechnungen · Demo-Konzept',nav:['Rechnungen','Angebote','Kunden'],metrics:['12 Entwürfe','8 bezahlt','4 offen'],rows:['Angebot 001','Rechnung 002','Entwurf 003'],accent:'#3B82F6'},
    inventory:{title:'Lager · Inventur',nav:['Artikel','Bestand','Belege'],metrics:['24 Artikel','3 Hinweise','8 Zugänge'],rows:['Material A','Produkt B','Verbrauch C'],accent:'#0D9488'},
    housekeeping:{title:'Housekeeping · Übersicht',nav:['Zimmer','Team','Berichte'],metrics:['18 Zimmer','5 Teams','12 fertig'],rows:['Zimmer 101','Zimmer 102','Zimmer 103'],accent:'#0891B2'},
    resto:{title:'Resto · Demo',nav:['Betrieb','Service','Abläufe'],metrics:['Tischplan','Anfragen','Team'],rows:['Service A','Service B','Service C'],accent:'#F97316'},
    putzgo:{title:'PutzGo · Portal',nav:['Services','Anfragen','Partner'],metrics:['Anfrage','Angebot','Partner'],rows:['Reinigung A','Reinigung B','Reinigung C'],accent:'#2563EB'},
    gym:{title:'Fitness App · Konzept',nav:['Mitglieder','Kurse','Statistik'],metrics:['Mitglieder','Kurse','Termine'],rows:['Training A','Training B','Training C'],accent:'#885CF6'},
    cost:{title:'Cost Calculator · Konzept',nav:['Kosten','Personal','Angebote'],metrics:['Stunden','Material','Gesamt'],rows:['Leistung A','Projekt B','Projekt C'],accent:'#0D9488'},
  };
  const x=labels[id] || labels.workhub;
  return <div dir="ltr" aria-label={lang==='de'?'Illustrative Software-Visualisierung':lang==='en'?'Illustrative software interface':'عرض توضيحي لواجهة البرنامج'} className="relative h-[202px] overflow-hidden rounded-t-[24px] border-b border-[#E0E7FF] bg-[#EAF0FB] p-4">
    <div className="mx-auto h-[210px] max-w-[450px] overflow-hidden rounded-xl border border-[#CBD7EA] bg-white shadow-[0_16px_32px_rgba(11,31,77,.12)] transition-transform duration-300 group-hover:translate-y-[-3px]">
      <div className="flex h-9 items-center justify-between gap-2 border-b border-[#E0E7FF] bg-[#F7F9FE] px-3">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{background:x.accent}}/><span className="truncate text-[10px] font-bold text-[#0B1F4D]">{x.title}</span></span>
        <span className="rounded bg-[#EAF1FE] px-2 py-1 text-[8px] font-semibold text-[#52647E]">{id==='plan'?'2026':'DEMO'}</span>
      </div>
      <div className="flex h-full">
       <div className="w-[91px] shrink-0 border-r border-[#E0E7FF] bg-[#FAFBFE] p-2">
        {x.nav.map((n,i)=><div key={n} className={'mb-1 rounded px-1.5 py-1.5 text-[8px] font-semibold '+(i===0?'bg-[#EAF1FE] text-[#2563EB]':'text-[#71829B]')}>{n}</div>)}
       </div>
       <div className="min-w-0 flex-1 p-2.5">
        <div className="mb-2 grid grid-cols-3 gap-1.5">
         {x.metrics.map((metric,i)=><div key={i} className="rounded border border-[#E3EAF6] bg-white px-1.5 py-2"><div className="mb-1.5 h-1.5 w-5 rounded" style={{background:x.accent,opacity:.3+i*.2}}/><p className="truncate text-[8px] font-bold text-[#0B1F4D]">{metric}</p></div>)}
        </div>
        {id==='plan'?<div className="overflow-hidden rounded border border-[#E3EAF6]"><div className="grid grid-cols-8 gap-px bg-[#E3EAF6] p-px">{['Team','Mo','Di','Mi','Do','Fr','Sa','So',...Array.from({length:24},(_,i)=>i%8===0?'Team '+(Math.floor(i/8)+1):'')].map((a,i)=><div key={i} className="flex h-8 items-center justify-center bg-white text-[7px] text-[#52647E]">{a|| (i%7===2?<span className="rounded bg-[#E7E9FF] px-1.5 py-1 font-bold text-[#6366F1]">F</span>:i%5===0?<span className="rounded bg-[#E8F6F2] px-1.5 py-1 text-emerald-700">S</span>:'')}</div>)}</div></div>:
        <div className="overflow-hidden rounded border border-[#E3EAF6]">{x.rows.map((r,i)=><div key={r} className="flex items-center justify-between gap-2 border-b border-[#EEF2FA] px-2 py-2.5 last:border-0"><span className="text-[8px] font-semibold text-[#52647E]">{r}</span><span className="h-1.5 w-10 rounded-full" style={{background:x.accent,opacity:.24+i*.15}}/></div>)}</div>}
       </div>
      </div>
    </div>
    <span className="absolute bottom-2 right-3 rounded-full border border-[#DCE5F7] bg-white/95 px-2 py-1 text-[9px] font-semibold text-[#52647E]">{lang==='de'?'Illustrative Vorschau':lang==='en'?'Illustrative preview':'معاينة توضيحية'}</span>
  </div>;
}

export function SoftwarePage({lang}:{lang:Lang}){
 const t=copy[lang];const prefix=lang==='de'?'':'/'+lang;
 const groups= [
  {id:'all',label:t.filterAll},{id:'operations',label:t.filterOperations},{id:'industry',label:t.filterIndustry},{id:'platform',label:t.filterPlatform}
 ] as const;
 const [filter,setFilter]=React.useState<string>('all');
 return <main dir={lang==='ar'?'rtl':'ltr'} className="min-h-screen bg-[#F4F7FB] px-4 pb-20 pt-20 sm:px-6">
  <div className="mx-auto max-w-7xl">
   <div className="mx-auto mb-10 max-w-4xl text-center">
    <span className="inline-flex rounded-full border border-[#DCE5F7] bg-white px-4 py-2 text-xs font-extrabold tracking-widest text-[#3B82F6]">{t.badge}</span>
    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#0B1F4D] sm:text-5xl">{t.title} <span className="bg-gradient-to-r from-[#3B82F6] to-[#885CF6] bg-clip-text text-transparent">{t.accent}</span></h1>
    <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#52647E]">{t.intro}</p>
   </div>
   <div className="mb-10 flex flex-wrap justify-center gap-2" aria-label={t.filterAll}>
    {groups.map(g=><button key={g.id} type="button" onClick={()=>setFilter(g.id)} aria-pressed={filter===g.id} className={'rounded-full border px-4 py-2 text-sm font-semibold transition-colors '+(filter===g.id?'border-[#3B82F6] bg-[#3B82F6] text-white':'border-[#DCE5F7] bg-white text-[#52647E] hover:border-[#3B82F6] hover:text-[#0B1F4D]')}>{g.label}</button>)}
   </div>
   <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
    {products.filter(p=>filter==='all'||p.category===filter).map(p=>{
      const Icon=p.icon;
      const requestUrl=prefix+'/request?service=other&project='+encodeURIComponent(p.name);
      return <article key={p.id} className="group flex h-full flex-col overflow-hidden rounded-[25px] border border-[#DCE5F7] bg-white shadow-[0_12px_36px_rgba(11,31,77,.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#AAC7FA] hover:shadow-[0_22px_46px_rgba(59,130,246,.11)]">
       {p.status==='pending' ? <div className="flex h-[110px] items-center gap-4 border-b border-[#E0E7FF] bg-[#F4F7FB] px-6"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#3B82F6] shadow-sm"><Icon size={29}/></div><p className="text-xs font-bold text-[#52647E]">{lang==='de'?'Individuelle Softwarelösung · Angebot auf Anfrage':lang==='en'?'Custom software solution · Request a quote':'حل برمجي مخصص · عرض سعر عند الطلب'}</p></div> : <div className="flex h-[110px] items-center gap-4 border-b border-[#E0E7FF] bg-[#F4F7FB] px-6"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#3B82F6] shadow-sm"><Icon size={29}/></div><p className="text-xs font-bold text-[#52647E]">{lang==='de'?'Software für Ihren Betrieb':lang==='en'?'Business software':'برنامج لإدارة أعمالك'}</p></div>}
       <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
         <h2 className="text-xl font-extrabold text-[#0B1F4D]">{p.name}</h2>
         <span className={'rounded-full border px-2.5 py-1 text-[10px] font-bold '+(p.status==='link'?'border-[#CCE0FF] bg-[#EFF5FF] text-[#2563EB]':'border-[#E0E7FF] bg-[#F4F7FB] text-[#52647E]')}>{p.status==='link'?t.status:p.status==='private'?t.privateStatus:t.pendingStatus}</span>
        </div>
        <p className="mt-3 min-h-[70px] text-sm leading-6 text-[#52647E]">{p.description[lang]}</p>
        <div className="mt-4 flex flex-wrap gap-2">{p.features[lang].map(feat=><span key={feat} className="rounded-lg border border-[#E0E7FF] bg-[#F8FAFF] px-2.5 py-1 text-[11px] font-medium text-[#36547A]">{feat}</span>)}</div>
        <div className="mt-auto space-y-3 pt-6">
         
         <Link href={requestUrl} className="flex min-h-[43px] items-center justify-center gap-2 rounded-xl border border-[#BFD3F8] bg-white px-3 text-xs font-bold text-[#0B1F4D] transition-colors hover:bg-[#EEF5FF]">{lang==='de'?'Angebot anfordern':lang==='en'?'Request a quote':'اطلب عرض سعر'}<ArrowRight size={14}/></Link>
        </div>
       </div>
      </article>;
    })}
   </div>
   <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-6 text-[#52647E]">{t.note}</p>
   <section className="mt-20 rounded-[28px] border border-[#DCE5F7] bg-white p-8 text-center shadow-[0_15px_48px_rgba(11,31,77,.06)] sm:p-12">
    <h2 className="text-2xl font-extrabold text-[#0B1F4D] sm:text-3xl">{t.footerTitle}</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-[#52647E]">{t.footerText}</p>
    <Link href={prefix+'/request?service=other&project=Software'} className="ovivo-software-primary mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-7 text-sm font-bold text-white shadow-[0_10px_26px_rgba(59,130,246,.19)] hover:bg-[#2563EB]">{t.footerButton}<ArrowUpRight size={17}/></Link>
   </section>
  </div>
 </main>;
}
