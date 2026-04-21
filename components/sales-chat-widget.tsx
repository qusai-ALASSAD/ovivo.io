'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Minimize2, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message { role: 'assistant' | 'user'; content: string; }

const SP_DE = 'Du bist Vertriebsmitarbeiter bei Ovivo KI-Automatisierung. Kurze klare Saetze. Kein JSON sichtbar. Schritte: 1)Unternehmenstyp 2)Anfragekanal 3)Problem 4)Loesung 5)Demo 6)Name+Tel+Firma 7)Bestaetigung. Nach Daten: {"lead":{"name":"Max","company":"Firma","email":"","phone":"01234"}}';
const SP_EN = 'You are sales agent at Ovivo AI automation. Short clear sentences. No visible JSON. Steps: 1)Business type 2)Inquiry source 3)Problem 4)Solution 5)Demo 6)Name+phone+company 7)Confirm. After data: {"lead":{"name":"John","company":"Co","email":"","phone":"01234"}}';
const SP_AR = 'أنت موظف مبيعات Ovivo. جمل قصيرة. بدون JSON ظاهر. خطوات: 1)نوع العمل 2)مصدر الاستفسارات 3)المشكلة 4)الحل 5)عرض تجريبي 6)الاسم+هاتف+شركة 7)تأكيد. بعد البيانات: {"lead":{"name":"محمد","company":"شركة","email":"","phone":"0501234"}}';

const OPENINGS = {
  de: 'Willkommen bei Ovivo 👋\n\nWie kann ich Ihnen helfen?',
  en: 'Welcome to Ovivo 👋\n\nHow can I help you today?',
  ar: 'مرحباً بك في Ovivo 👋\n\nكيف يمكنني مساعدتك؟',
};

const QP = {
  de: ['Restaurant / Café', 'Friseur / Beauty', 'Fitness', 'Preise'],
  en: ['Restaurant / Café', 'Hair / Beauty', 'Fitness', 'Pricing'],
  ar: ['مطعم / مقهى', 'صالون / تجميل', 'لياقة', 'أسعار'],
};

function extractLead(t: string) {
  try {
    const m = t.match(/\{"lead"\s*:\s*(\{[^}]+\})\s*\}/);
    if (m) { const l = JSON.parse(m[1]); if (l.name||l.phone) return l; }
    const n=t.match(/"name"\s*:\s*"([^"]+)"/), p=t.match(/"phone"\s*:\s*"?([0-9+][0-9 +\-]{4,})"?/), c=t.match(/"company"\s*:\s*"([^"]+)"/);
    if (n||p) return {name:n?.[1]||'',phone:p?.[1]||'',email:'',company:c?.[1]||''};
  } catch {}
  return null;
}

function stripJson(t: string) { return t.replace(/\{"lead"\s*:\s*\{[^}]+\}\s*\}/g,'').trim(); }

export function SalesChatWidget() {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState<Message[]>([]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [saved,setSaved]=useState(false);
  const [unread,setUnread]=useState(false);
  const [min,setMin]=useState(false);
  const [quick,setQuick]=useState(true);
  const [langOv,setLangOv]=useState<string|null>(null);
  const btm=useRef<HTMLDivElement>(null);
  const inp=useRef<HTMLTextAreaElement>(null);
  const path=usePathname();
  const isEn=path?.startsWith('/en')??false;
  const isAr=path?.startsWith('/ar')??false;
  const rtl=isAr;
  const isConsult=path?.includes('/consultation')??false;

  const dl=isEn?'en':isAr?'ar':(()=>{
    if(typeof navigator!=='undefined'){const b=(navigator.language??'').toLowerCase();if(b.startsWith('ar'))return 'ar';if(b.startsWith('en'))return 'en';}
    return 'de';
  })();
  const lang=(langOv??dl) as 'de'|'en'|'ar';
  const sp=lang==='en'?SP_EN:lang==='ar'?SP_AR:SP_DE;

  const L={
    de:{trigger:'Mit Ovivo sprechen',ph:'Nachricht...',title:'Ovivo',err:'Fehler. Erneut versuchen.'},
    en:{trigger:'Talk to Ovivo',ph:'Message...',title:'Ovivo',err:'Error. Try again.'},
    ar:{trigger:'تحدث مع Ovivo',ph:'رسالة...',title:'Ovivo',err:'حدث خطأ. حاول مجدداً.'},
  }[lang];

  useEffect(()=>{if(!isConsult){const t=setTimeout(()=>setUnread(true),15000);return()=>clearTimeout(t);}},[isConsult]);
  useEffect(()=>{if(open&&msgs.length===0)setMsgs([{role:'assistant',content:OPENINGS[lang]}]);},[open,lang]);
  useEffect(()=>{if(!open&&msgs.length>1)setUnread(true);},[msgs.length,open]);
  useEffect(()=>{btm.current?.scrollIntoView({behavior:'smooth'});},[msgs,loading]);
  useEffect(()=>{if(open&&!min)setTimeout(()=>inp.current?.focus(),300);},[open,min]);

  const saveLead=useCallback(async(lead:Record<string,string>|null)=>{
    if(!lead||saved||(!lead.name&&!lead.phone))return;
    setSaved(true);
    try{await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...lead,message:'chat',source:'chat_widget'})});}catch{}
  },[saved]);

  async function send(text:string){
    const t=text.trim();if(!t||loading)return;
    setInput('');setQuick(false);
    const nm:Message[]=[...msgs,{role:'user',content:t}];
    setMsgs(nm);setLoading(true);
    try{
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:nm.map(m=>({role:m.role,content:m.content})),mode:'sales_widget',plan:'free',systemOverride:sp})});
      if(!r.ok)throw new Error();
      const reader=r.body!.getReader(),dec=new TextDecoder();let full='';
      setMsgs(p=>[...p,{role:'assistant',content:''}]);
      while(true){const{done,value}=await reader.read();if(done)break;full+=dec.decode(value,{stream:true});const d=stripJson(full);setMsgs(p=>{const u=[...p];u[u.length-1]={role:'assistant',content:d};return u;});}
      await saveLead(extractLead(full));
    }catch{setMsgs(p=>[...p,{role:'assistant',content:L.err}]);}
    finally{setLoading(false);}
  }

  if(isConsult)return null;

  return(
    <div className='fixed bottom-5 right-5 z-50' dir={rtl?'rtl':'ltr'}>
      {open&&!min&&(
        <div className="mb-3 w-[350px] sm:w-[370px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" style={{background:'rgba(10,14,26,0.97)',backdropFilter:'blur(20px)'}}>
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/8" style={{background:'linear-gradient(135deg,rgba(37,99,235,0.12) 0%,transparent 70%)'}}>
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Bot className="h-[14px] w-[14px] text-white"/>
            </div>
            <div className="flex-1"><p className="text-[13px] font-bold text-white">{L.title}</p></div>
            <div className="flex gap-0.5 mr-1">
              {(['de','en','ar'] as const).map(l=>(
                <button key={l} onClick={()=>{setLangOv(l);setMsgs([]);}} className={`h-5 px-1.5 rounded text-[9px] font-bold ${lang===l?'bg-blue-500/30 text-blue-300':'text-gray-600 hover:text-gray-400'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <button onClick={()=>setMin(true)} className="h-6 w-6 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-300 transition-all"><Minimize2 className="h-3 w-3"/></button>
            <button onClick={()=>setOpen(false)} className="h-6 w-6 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-300 transition-all"><X className="h-3 w-3"/></button>
          </div>

          <div className="h-[300px] overflow-y-auto px-3.5 py-3 space-y-2" style={{scrollbarWidth:'none'}}>
            {msgs.map((m,i)=>(
              <div key={i} className={`flex gap-2 ${m.role==='user'?(rtl?'flex-row':'flex-row-reverse'):''}`}>
                {m.role==='assistant'&&<div className="h-5 w-5 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Bot className="h-2.5 w-2.5 text-blue-400"/></div>}
                <div className={`max-w-[84%] rounded-xl px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-line ${m.role==='assistant'?`bg-white/[0.055] border border-white/[0.07] text-gray-100 ${rtl?'rounded-tr-sm':'rounded-tl-sm'}`:`bg-blue-500 text-white ${rtl?'rounded-tl-sm':'rounded-tr-sm'}`} ${rtl?'text-right':''}`}>
                  {m.content||<span className="flex gap-1">{[0,1,2].map(j=><span key={j} className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse" style={{animationDelay:`${j*0.15}s`}}/>)}</span>}
                </div>
              </div>
            ))}
            {loading&&msgs[msgs.length-1]?.role!=='assistant'&&(
              <div className="flex gap-2">
                <div className="h-5 w-5 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0"><Bot className="h-2.5 w-2.5 text-blue-400"/></div>
                <div className="bg-white/[0.055] border border-white/[0.07] rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
                  {[0,1,2].map(j=><span key={j} className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse" style={{animationDelay:`${j*0.15}s`}}/>)}
                </div>
              </div>
            )}
            <div ref={btm}/>
          </div>

          {quick&&msgs.length<=1&&(
            <div className="border-t border-white/5 px-3.5 py-2">
              <div className="flex flex-wrap gap-1.5">
                {QP[lang].map(p=><button key={p} onClick={()=>send(p)} className="text-[11px] text-gray-500 border border-white/8 rounded-full px-2.5 py-1 hover:text-white hover:border-blue-500/30 transition-all">{p}</button>)}
              </div>
            </div>
          )}

          <div className="border-t border-white/8 px-3.5 pb-3 pt-2">
            <div className="flex gap-2 items-end">
              <textarea ref={inp} value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(input);}}}
                placeholder={L.ph} rows={1} dir={rtl?'rtl':'ltr'}
                className="flex-1 bg-white/[0.05] border border-white/[0.09] rounded-xl px-3 py-2 text-[12.5px] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 resize-none leading-snug"
                style={{minHeight:'34px',maxHeight:'80px'}}
                onInput={e=>{const t=e.currentTarget;t.style.height='auto';t.style.height=Math.min(t.scrollHeight,80)+'px';}}
              />
              <button onClick={()=>send(input)} disabled={!input.trim()||loading} className="h-9 w-9 flex-shrink-0 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-25 flex items-center justify-center transition-all">
                <Send className="h-3.5 w-3.5 text-white"/>
              </button>
            </div>
          </div>
        </div>
      )}

      {open&&min&&(
        <button onClick={()=>setMin(false)} className="mb-3 rounded-2xl border border-white/10 px-3.5 py-2.5 flex items-center gap-2 hover:border-white/20 transition-all" style={{background:'rgba(10,14,26,0.96)',backdropFilter:'blur(16px)'}}>
          <Bot className="h-4 w-4 text-blue-400 flex-shrink-0"/>
          <span className="text-[13px] font-semibold text-white">{L.title}</span>
          <ChevronDown className="h-3 w-3 text-gray-500 rotate-180 ml-1 flex-shrink-0"/>
        </button>
      )}

      <button
        onClick={()=>{setOpen(v=>!v);setUnread(false);setMin(false);}}
        className="relative flex items-center gap-2.5 rounded-2xl px-4 py-3 transition-colors"
        style={{background:'linear-gradient(135deg,#1a1f2e,#0f1420)',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 4px 20px rgba(0,0,0,0.4)'}}
      >
        {unread&&<span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-blue-400 border-2 border-[#090d18]"/>}
        <Sparkles className="h-4 w-4 text-white/80 flex-shrink-0"/>
        <span className="text-[13px] font-semibold text-white/90 whitespace-nowrap">{L.trigger}</span>
        {open&&<X className="h-3.5 w-3.5 text-white/50 flex-shrink-0"/>}
      </button>
    </div>
  );
                                }
