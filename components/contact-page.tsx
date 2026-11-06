'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Mail, Phone, MessageCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';

const copy={
  de:{badge:'KONTAKT',title:'Sprechen wir über',gradient:'Ihre Ideen.',sub:'Sie haben eine Frage? Kontaktieren Sie uns direkt oder nutzen Sie unseren OVIVO AI Chat unten rechts. Für konkrete Leistungen können Sie eine individuelle Projektanfrage stellen.',direct:'Kontaktieren Sie uns direkt',whatsapp:'Per WhatsApp schreiben',phone:'Jetzt anrufen',email:'E-Mail senden',requestTitle:'Sie möchten eine Lösung beauftragen?',requestText:'Beschreiben Sie Ihr Vorhaben in unserem Projektformular – passend zu Ihrer gewünschten Leistung.',request:'Projektanfrage starten',chat:'Für schnelle Fragen: OVIVO AI über das schwebende Chat-Symbol öffnen.',privacy:'Ihre Nachrichten werden entsprechend unserer Datenschutzerklärung verarbeitet.',privacyLink:'Datenschutzerklärung',formTitle:'Schreiben Sie uns direkt',formIntro:'Eine Frage zu KI-Automation, n8n oder individueller Software? Nutzen Sie dieses Formular.',formName:'Ihr Name',formEmail:'Ihre E-Mail',formCompany:'Unternehmen (optional)',formMessage:'Ihre Nachricht',formPlaceholder:'Welche Prozesse möchten Sie automatisieren?',formSend:'Nachricht senden',formSending:'Wird gesendet…',formSuccess:'Vielen Dank! Ihre Nachricht wurde übermittelt.',formError:'Senden nicht möglich. Bitte versuchen Sie es erneut.'},
  en:{badge:'CONTACT',title:'Let’s talk about',gradient:'your ideas.',sub:'Have a question? Contact us directly or use OVIVO AI in the floating chat icon at the bottom right. For a specific solution, start a project request.',direct:'Get in touch',whatsapp:'Message on WhatsApp',phone:'Call us',email:'Send an email',requestTitle:'Ready to request a solution?',requestText:'Describe your needs using our dedicated project request form.',request:'Start a project request',chat:'For quick questions: open OVIVO AI using the floating chat icon.',privacy:'Your messages are handled in accordance with our privacy policy.',privacyLink:'Privacy policy',formTitle:'Send us a message',formIntro:'Questions about AI automation, n8n or custom software? Use the form below.',formName:'Your name',formEmail:'Your email',formCompany:'Company (optional)',formMessage:'Your message',formPlaceholder:'Which business processes would you like to automate?',formSend:'Send message',formSending:'Sending…',formSuccess:'Thank you! Your message was submitted.',formError:'Unable to send. Please try again.'},
  ar:{badge:'تواصل معنا',title:'خلينا نحكي عن',gradient:'فكرتك.',sub:'عندك سؤال؟ تواصل معنا مباشرة أو استخدم أيقونة OVIVO AI العائمة أسفل الصفحة. إذا بدك خدمة محددة استخدم صفحة طلب المشروع.',direct:'تواصل مباشر',whatsapp:'راسلنا على واتساب',phone:'اتصل بنا',email:'أرسل إيميل',requestTitle:'جاهز تطلب خدمة؟',requestText:'اكتب تفاصيل مشروعك في نموذج الطلب المخصص للخدمة.',request:'ابدأ طلب المشروع',chat:'للأسئلة السريعة: افتح OVIVO AI من أيقونة الشات العائمة.',privacy:'تُعالج رسائلك وفق سياسة الخصوصية.',privacyLink:'سياسة الخصوصية',formTitle:'ارسل رسالة مباشرة',formIntro:'عندك سؤال عن أتمتة الذكاء الاصطناعي أو n8n أو البرامج الخاصة؟ اكتب لنا هنا.',formName:'الاسم',formEmail:'البريد الإلكتروني',formCompany:'الشركة (اختياري)',formMessage:'رسالتك',formPlaceholder:'ما هي العمليات التي تريد أتمتتها؟',formSend:'إرسال الرسالة',formSending:'جاري الإرسال…',formSuccess:'شكراً لك! تم إرسال رسالتك.',formError:'تعذّر الإرسال. يرجى إعادة المحاولة.'},
};
const methods=[
  {id:'whatsapp',icon:MessageCircle,href:'https://wa.me/4917656565322',detail:'WhatsApp',external:true},
  {id:'phone',icon:Phone,href:'tel:+4917656565322',detail:'+49 176 56565322',external:false},
  {id:'email',icon:Mail,href:'mailto:hello@ovivo.io',detail:'hello@ovivo.io',external:false},
] as const;

export function ContactPage({lang}:{lang:Lang}){
 const t=copy[lang];const prefix=lang==='de'?'':'/'+lang;
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [company,setCompany]=useState('');const [message,setMessage]=useState('');
 const [sending,setSending]=useState(false);const [sent,setSent]=useState(false);const [error,setError]=useState(false);
 async function sendContact(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault(); if(sending)return;setSending(true);setError(false);
  try {const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.trim(),email:email.trim(),company:company.trim(),message:message.trim(),source:'contact'})});
  if(!response.ok)throw new Error('Contact failed');setSent(true);setName('');setEmail('');setCompany('');setMessage('');
  }catch{setError(true);}finally{setSending(false);}
 }

 return <div dir={lang==='ar'?'rtl':'ltr'} className="min-h-[75vh] bg-[#F4F7FB] px-4 pb-24 pt-20 sm:px-6">
   <div className="mx-auto max-w-6xl">
    <div className="mx-auto mb-12 max-w-3xl">
      <SectionHeader badge={t.badge} title={t.title} titleGradient={t.gradient} subtitle={t.sub}/>
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      {methods.map((method)=>{
        const Icon=method.icon;
        return <a key={method.id} href={method.href} {...(method.external?{target:'_blank',rel:'noopener noreferrer'}:{})}
          className="group flex flex-col items-start gap-4 rounded-[24px] border border-[#DCE5F7] bg-white p-7 shadow-[0_14px_40px_rgba(11,31,77,.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#93B9FF] hover:shadow-[0_22px_48px_rgba(59,130,246,.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#885CF6]">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3B82F6]"><Icon size={25}/></span>
          <span className="text-xl font-extrabold text-[#0B1F4D]">{t[method.id]}</span>
          <span className="text-sm text-[#52647E]">{method.detail}</span>
          <ArrowRight size={19} className="mt-1 text-[#3B82F6] transition-transform group-hover:translate-x-1"/>
        </a>;
      })}
    </div>
    <div className="mt-8 rounded-[26px] border border-[#DCE5F7] bg-white p-6 shadow-[0_14px_40px_rgba(11,31,77,.05)] sm:p-9">
      <h2 className="text-2xl font-extrabold text-[#0B1F4D]">{t.formTitle}</h2>
      <p className="mt-2 text-sm leading-7 text-[#52647E]">{t.formIntro}</p>
      {sent?<div role="status" className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-5 text-sm font-bold text-emerald-800"><CheckCircle2 size={20}/>{t.formSuccess}</div>:
        <form onSubmit={sendContact} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.formName} *
              <input required maxLength={120} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"/>
            </label>
            <label className="block text-sm font-semibold text-[#0B1F4D]">{t.formEmail} *
              <input required type="email" maxLength={254} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"/>
            </label>
          </div>
          <label className="block text-sm font-semibold text-[#0B1F4D]">{t.formCompany}
            <input maxLength={160} autoComplete="organization" value={company} onChange={e=>setCompany(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#CBD7EA] bg-white px-4 text-sm text-[#0B1F4D] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"/>
          </label>
          <label className="block text-sm font-semibold text-[#0B1F4D]">{t.formMessage} *
            <textarea required rows={5} maxLength={2500} value={message} onChange={e=>setMessage(e.target.value)} placeholder={t.formPlaceholder} className="mt-2 w-full resize-y rounded-xl border border-[#CBD7EA] bg-white p-4 text-sm text-[#0B1F4D] outline-none placeholder:text-[#71829B] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"/>
          </label>
          <p className="text-xs leading-6 text-[#52647E]">{t.privacy}{' '}<Link href={prefix+'/privacy'} className="font-semibold text-[#2563EB] underline">{t.privacyLink}</Link></p>
          {error&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{t.formError}</p>}
          <button disabled={sending} type="submit" className="ovivo-contact-request inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-bold text-white transition-colors hover:bg-[#2563EB] disabled:opacity-60 sm:w-auto"><Send size={17}/>{sending?t.formSending:t.formSend}</button>
        </form>}
    </div>
    <div className="mt-8 rounded-[26px] border border-[#DCE5F7] bg-white p-7 shadow-[0_14px_40px_rgba(11,31,77,.05)] sm:p-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold text-[#0B1F4D]">{t.requestTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-[#52647E]">{t.requestText}</p>
        </div>
        <Link href={prefix+'/request?service=other'} className="ovivo-contact-request inline-flex min-h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(59,130,246,.18)] transition-colors hover:bg-[#2563EB]">
          {t.request}<ArrowRight size={17}/>
        </Link>
      </div>
    </div>
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#E0E7FF] bg-white px-6 py-5">
      <Sparkles size={19} className="shrink-0 text-[#885CF6]"/>
      <p className="text-sm font-medium leading-6 text-[#36547A]">{t.chat}</p>
    </div>
    <p className="mt-8 text-center text-xs text-[#52647E]">{t.privacy}{' '}<Link className="font-semibold text-[#3B82F6] underline" href={prefix+'/privacy'}>{t.privacyLink}</Link></p>
   </div>
 </div>;
}
