'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';

const copy={
  de:{badge:'KONTAKT',title:'Sprechen wir über',gradient:'Ihre Ideen.',sub:'Sie haben eine Frage? Kontaktieren Sie uns direkt oder nutzen Sie unseren OVIVO AI Chat unten rechts. Für konkrete Leistungen können Sie eine individuelle Projektanfrage stellen.',direct:'Kontaktieren Sie uns direkt',whatsapp:'Per WhatsApp schreiben',phone:'Jetzt anrufen',email:'E-Mail senden',requestTitle:'Sie möchten eine Lösung beauftragen?',requestText:'Beschreiben Sie Ihr Vorhaben in unserem Projektformular – passend zu Ihrer gewünschten Leistung.',request:'Projektanfrage starten',chat:'Für schnelle Fragen: OVIVO AI über das schwebende Chat-Symbol öffnen.',privacy:'Ihre Nachrichten werden entsprechend unserer Datenschutzerklärung verarbeitet.',privacyLink:'Datenschutzerklärung'},
  en:{badge:'CONTACT',title:'Let’s talk about',gradient:'your ideas.',sub:'Have a question? Contact us directly or use OVIVO AI in the floating chat icon at the bottom right. For a specific solution, start a project request.',direct:'Get in touch',whatsapp:'Message on WhatsApp',phone:'Call us',email:'Send an email',requestTitle:'Ready to request a solution?',requestText:'Describe your needs using our dedicated project request form.',request:'Start a project request',chat:'For quick questions: open OVIVO AI using the floating chat icon.',privacy:'Your messages are handled in accordance with our privacy policy.',privacyLink:'Privacy policy'},
  ar:{badge:'تواصل معنا',title:'خلينا نحكي عن',gradient:'فكرتك.',sub:'عندك سؤال؟ تواصل معنا مباشرة أو استخدم أيقونة OVIVO AI العائمة أسفل الصفحة. إذا بدك خدمة محددة استخدم صفحة طلب المشروع.',direct:'تواصل مباشر',whatsapp:'راسلنا على واتساب',phone:'اتصل بنا',email:'أرسل إيميل',requestTitle:'جاهز تطلب خدمة؟',requestText:'اكتب تفاصيل مشروعك في نموذج الطلب المخصص للخدمة.',request:'ابدأ طلب المشروع',chat:'للأسئلة السريعة: افتح OVIVO AI من أيقونة الشات العائمة.',privacy:'تُعالج رسائلك وفق سياسة الخصوصية.',privacyLink:'سياسة الخصوصية'},
};
const methods=[
  {id:'whatsapp',icon:MessageCircle,href:'https://wa.me/4917656565322',detail:'WhatsApp',external:true},
  {id:'phone',icon:Phone,href:'tel:+4917656565322',detail:'+49 176 56565322',external:false},
  {id:'email',icon:Mail,href:'mailto:hello@ovivo.io',detail:'hello@ovivo.io',external:false},
] as const;

export function ContactPage({lang}:{lang:Lang}){
 const t=copy[lang];const prefix=lang==='de'?'':'/'+lang;
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
