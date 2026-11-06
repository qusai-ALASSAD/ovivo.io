'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

const options = [
  { id:'starter',de:'AI Starter',en:'AI Starter',ar:'AI Starter' },
  { id:'business',de:'AI Business',en:'AI Business',ar:'AI Business' },
  { id:'growth',de:'AI Growth',en:'AI Growth',ar:'AI Growth' },
  { id:'ai-chatbot',de:'KI-Chatbot',en:'AI Chatbot',ar:'شات بوت ذكي' },
  { id:'automation',de:'n8n & Workflow Automation',en:'n8n & Workflow Automation',ar:'أتمتة n8n والعمليات' },
  { id:'crm-email',de:'CRM & E-Mail Automation',en:'CRM & Email Automation',ar:'أتمتة CRM والبريد' },
  { id:'ads',de:'Google & Social Ads',en:'Google & Social Ads',ar:'إعلانات غوغل والسوشيال' },
  { id:'branding',de:'Branding & Design',en:'Branding & Design',ar:'الهوية والتصميم' },
  { id:'funnels',de:'Landing Pages & Funnels',en:'Landing Pages & Funnels',ar:'صفحات الهبوط والتحويل' },
  { id:'restaurants',de:'Automation für Restaurants',en:'Restaurant automation',ar:'أتمتة المطاعم' },
  { id:'cafes',de:'Automation für Cafés',en:'Café automation',ar:'أتمتة المقاهي' },
  { id:'services',de:'Automation für Dienstleister',en:'Service business automation',ar:'أتمتة شركات الخدمات' },
  { id:'other',de:'Andere individuelle Lösung',en:'Other custom solution',ar:'حل مخصص آخر' },
] as const;

const copy={
de:{badge:'PROJEKTANFRAGE',title:'Ihre Automation. Ihr Angebot.',sub:'Beschreiben Sie uns kurz Ihr Vorhaben. Wir prüfen den Umfang und erstellen ein passendes, unverbindliches Angebot.',chosen:'Gewünschte Lösung',name:'Ihr Name',email:'Geschäftliche E-Mail',phone:'Telefon (optional)',company:'Unternehmen / Branche',message:'Was möchten Sie umsetzen?',placeholder:'Welche Aufgaben sollen automatisiert werden? Welche Tools nutzen Sie bereits?',submit:'Projektanfrage senden',sending:'Wird gesendet…',privacy:'Wir verwenden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage.',privacyLink:'Datenschutzerklärung',success:'Vielen Dank! Ihre Projektanfrage wurde erfolgreich übermittelt.',error:'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',back:'Zurück zu den Paketen',note:'Kostenlos & unverbindlich · Individuelles Angebot nach Prüfung',invalid:'Bitte prüfen Sie Ihre Angaben.'},
en:{badge:'PROJECT REQUEST',title:'Your automation. Your quote.',sub:'Tell us a little about your project. We will review your needs and prepare a tailored, no-obligation quote.',chosen:'Selected service',name:'Your name',email:'Business email',phone:'Phone (optional)',company:'Company / industry',message:'What would you like to build?',placeholder:'Which tasks should be automated? What tools do you use today?',submit:'Send project request',sending:'Sending…',privacy:'We use your details only to handle your inquiry.',privacyLink:'Privacy policy',success:'Thank you! Your project request was successfully sent.',error:'Your request could not be sent. Please try again.',back:'Back to plans',note:'Free & no obligation · Custom quote after review',invalid:'Please check your details.'},
ar:{badge:'طلب مشروع',title:'اطلب حل الأتمتة المناسب لشركتك.',sub:'أخبرنا باختصار عن مشروعك وسنراجع احتياجاتك لنقدم عرض سعر مناسباً دون التزام.',chosen:'الخدمة المطلوبة',name:'الاسم',email:'البريد الإلكتروني المهني',phone:'الهاتف (اختياري)',company:'الشركة / القطاع',message:'شو حابب تنفذ؟',placeholder:'شو العمليات اللي بدك تؤتمتها؟ وشو الأنظمة اللي تستخدمها؟',submit:'إرسال طلب المشروع',sending:'جاري الإرسال…',privacy:'نستخدم بياناتك فقط لمعالجة طلبك.',privacyLink:'سياسة الخصوصية',success:'شكراً لك! تم إرسال طلب مشروعك بنجاح.',error:'تعذّر إرسال الطلب، يرجى المحاولة مجدداً.',back:'العودة للباقات',note:'مجاني وبدون التزام · السعر النهائي بعد مراجعة الطلب',invalid:'يرجى التأكد من البيانات.'},
};

export function ServiceRequestPage({lang}:{lang:Lang}) {
  const t=copy[lang];const params=useSearchParams();const prefix=lang==='de'?'':'/'+lang;
  const requested=params?.get('service')||'other';
  const selected=options.find(o=>o.id===requested)?.id||'other';
  const [service,setService]=useState<string>(selected);
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [phone,setPhone]=useState('');const [company,setCompany]=useState('');const [message,setMessage]=useState('');
  const [loading,setLoading]=useState(false);const [sent,setSent]=useState(false);const [error,setError]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(loading)return;
    if(!name.trim()||!email.trim()){setError(t.invalid);return;}
    setLoading(true);setError('');
    try {
      const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        name:name.trim().slice(0,120),email:email.trim().slice(0,254),
        company:company.trim().slice(0,160),
        message:['Service: '+service,'Phone: '+phone.trim().slice(0,45),'Request: '+message.trim().slice(0,2500)].join('\n'),
        source:'service_request',
      })});
      if(!response.ok)throw new Error('Failed');
      setSent(true);
    }catch{setError(t.error);}finally{setLoading(false);}
  }
  return <section dir={lang==='ar'?'rtl':'ltr'} className="relative min-h-[75vh] bg-[#F4F7FB] px-4 pb-20 pt-16 sm:px-6">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,.09),transparent_70%)]"/>
    <div className="relative mx-auto max-w-3xl">
      <Link href={prefix+'/pricing'} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#52647E] hover:text-[#3B82F6]"><ArrowLeft size={17} className={lang==='ar'?'rotate-180':''}/>{t.back}</Link>
      <div className="rounded-[28px] border border-[#DCE5F7] bg-white p-5 shadow-[0_22px_65px_rgba(11,31,77,.08)] sm:p-10">
        <div className="mb-7 flex flex-col items-start gap-3 border-b border-[#E0E7FF] pb-7">
          <span className="rounded-full border border-[#E0E7FF] bg-[#F4F7FB] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#3B82F6]">{t.badge}</span>
          <h1 className="text-3xl font-extrabold leading-tight text-[#0B1F4D] sm:text-4xl">{t.title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#52647E]">{t.sub}</p>
        </div>
        {sent?<div role="status" className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-bold text-emerald-800"><CheckCircle2 size={22}/>{t.success}</div>:
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm font-semibold text-[#0B1F4D]">{t.chosen}
            <select value={service} onChange={e=>setService(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100">
              {options.map(item=><option key={item.id} value={item.id}>{item[lang]}</option>)}
            </select>
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.name} *
              <input required maxLength={120} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"/>
            </label>
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.email} *
              <input required type="email" maxLength={254} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"/>
            </label>
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.phone}
              <input type="tel" maxLength={45} autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"/>
            </label>
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.company}
              <input maxLength={160} autoComplete="organization" value={company} onChange={e=>setCompany(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"/>
            </label>
          </div>
          <label className="block text-sm font-semibold text-[#0B1F4D]">{t.message}
            <textarea rows={4} maxLength={2500} value={message} onChange={e=>setMessage(e.target.value)} placeholder={t.placeholder} className="mt-2 w-full resize-y rounded-xl border border-[#CBD7EA] bg-white p-4 text-sm leading-6 text-[#0B1F4D] placeholder:text-[#71829B] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"/>
          </label>
          <p className="text-xs leading-6 text-[#52647E]"><ShieldCheck size={15} className="me-1 inline text-[#3B82F6]"/>{t.privacy}{' '}<Link href={prefix+'/privacy'} className="font-semibold text-[#2563EB] underline">{t.privacyLink}</Link></p>
          {error&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={loading} className="ovivo-service-request-submit flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(59,130,246,.18)] transition-colors hover:bg-[#2563EB] disabled:opacity-50"><Send size={18}/>{loading?t.sending:t.submit}</button>
          <p className="text-center text-xs text-[#52647E]">{t.note}</p>
        </form>}
      </div>
    </div>
  </section>;
}
