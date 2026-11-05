'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { Bot, Mic, Workflow, Send, Square, Play, ArrowRight } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type Mode = 'chat' | 'voice' | 'workflow';

type BrowserRecognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const copy = {
  de: {
    eyebrow: 'OVIVO.IO · KI ERLEBEN',
    title: 'Erleben Sie KI-Automation selbst.',
    subtitle: 'Drei interaktive Beispiele: KI-Chat, Sprachassistent und automatisierter Kundenprozess.',
    chat: 'KI-Chatbot', voice: 'Sprachassistent', workflow: 'Workflow',
    description: 'Fragen Sie unseren KI-Demoassistenten nach Automatisierung für Ihr Unternehmen.',
    placeholder: 'Zum Beispiel: Wie automatisiere ich Terminanfragen?',
    send: 'Senden', greeting: 'Hallo! Welche Aufgaben möchten Sie in Ihrem Unternehmen automatisieren?',
    voiceTip: 'Klicken Sie auf das Mikrofon und sprechen Sie. Die Antworten werden von einer KI erstellt und vom Browser vorgelesen.',
    voiceStart: 'Sprechen', voiceStop: 'Stoppen', voiceUnavailable: 'Spracherkennung ist in diesem Browser nicht verfügbar. Nutzen Sie bitte den KI-Chatbot.',
    workflowTip: 'Starten Sie einen echten n8n-Testworkflow mit Beispieldaten. Es werden keine echten CRM-Einträge oder Nachrichten erstellt.',
    workflowStart: 'Beispielprozess starten', workflowReset: 'Zurücksetzen',
    steps: ['Anfrage erfasst', 'Anfrage kategorisiert', 'Kontakt im Demo-CRM angelegt', 'Bestätigung simuliert', 'Team-Benachrichtigung simuliert'],
    completed: 'Der n8n-Workflow wurde ausgeführt und bestätigt. Keine echten Kundennachrichten wurden gesendet.',
    privacy: 'Demo-Hinweis: Im Chat werden Ihre Eingaben an den KI-Anbieter übermittelt. Bitte keine persönlichen oder vertraulichen Daten eingeben. Die Sprachfunktion verwendet zusätzlich die Spracherkennung Ihres Browsers. Keine echte Telefonanlage.',
    unavailable: 'Der KI-Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.',
    consultancy: 'Kostenlose KI-Beratung',
  },
  en: {
    eyebrow: 'OVIVO.IO · EXPERIENCE AI',
    title: 'Try AI automation for yourself.',
    subtitle: 'Three interactive examples: AI chat, voice assistant and an automated customer workflow.',
    chat: 'AI Chatbot', voice: 'Voice assistant', workflow: 'Workflow',
    description: 'Ask our AI demo assistant about automation for your business.',
    placeholder: 'For example: How can I automate bookings?', send: 'Send',
    greeting: 'Hello! What would you like to automate in your business?',
    voiceTip: 'Tap the microphone and speak. An AI generates the answer; your browser reads it aloud.',
    voiceStart: 'Speak', voiceStop: 'Stop', voiceUnavailable: 'Speech recognition is unavailable in this browser. Please use the AI Chatbot.',
    workflowTip: 'Run a real n8n demo workflow with synthetic data. No real CRM entries, emails or messages will be created.',
    workflowStart: 'Run sample workflow', workflowReset: 'Reset',
    steps: ['Request received', 'Request classified', 'Demo CRM entry created', 'Confirmation simulated', 'Team notification simulated'],
    completed: 'n8n confirmed the demo workflow. No real customer messages were sent.',
    privacy: 'Demo notice: Chat messages are sent to an AI provider. Do not enter personal or confidential information. Voice input additionally uses browser speech recognition. Not a real phone system.',
    unavailable: 'The AI service is currently unavailable. Please try again later.',
    consultancy: 'Free AI consultation',
  },
  ar: {
    eyebrow: 'OVIVO.IO · جرّب الذكاء الاصطناعي',
    title: 'جرّب أتمتة أعمالك بنفسك.',
    subtitle: 'ثلاث تجارب تفاعلية: محادثة ذكية، مساعد صوتي، وسير عمل مؤتمت.',
    chat: 'المحادثة الذكية', voice: 'المساعد الصوتي', workflow: 'سير العمل',
    description: 'اسأل المساعد التجريبي عن أتمتة العمليات في شركتك.',
    placeholder: 'مثال: كيف أؤتمت حجز المواعيد؟', send: 'إرسال',
    greeting: 'مرحباً! ما العمليات التي تريد أتمتتها في عملك؟',
    voiceTip: 'اضغط الميكروفون وتحدث. الذكاء الاصطناعي ينشئ الرد والمتصفح يقرأه صوتياً.',
    voiceStart: 'تحدث', voiceStop: 'إيقاف', voiceUnavailable: 'التعرّف الصوتي غير مدعوم في هذا المتصفح. استخدم الدردشة.',
    workflowTip: 'شغّل سير عمل حقيقياً عبر n8n باستخدام بيانات تجريبية، دون إرسال رسائل أو إنشاء سجلات عملاء حقيقية.',
    workflowStart: 'ابدأ التجربة', workflowReset: 'إعادة',
    steps: ['استلام الطلب', 'تصنيف الطلب', 'إضافة سجل تجريبي', 'محاكاة التأكيد', 'محاكاة إشعار الفريق'],
    completed: 'أكد n8n تنفيذ سير العمل التجريبي دون إرسال رسائل حقيقية للعملاء.',
    privacy: 'ملاحظة: تُرسل رسائل الدردشة لمزود الذكاء الاصطناعي. لا تدخل بيانات شخصية أو سرية. تستخدم التجربة الصوتية أيضاً التعرف الصوتي في المتصفح؛ وهي ليست نظام هاتف فعلياً.',
    unavailable: 'خدمة الذكاء الاصطناعي غير متاحة الآن. حاول لاحقاً.',
    consultancy: 'استشارة مجانية',
  },
};

export function AiExperienceLab({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [mode, setMode] = useState<Mode>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: t.greeting }]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [step, setStep] = useState(-1);
  const [workflowError, setWorkflowError] = useState('');
  const [workflowBusy, setWorkflowBusy] = useState(false);
  const [workflowRunId, setWorkflowRunId] = useState('');
  const controller = useRef<AbortController | null>(null);
  const recognition = useRef<BrowserRecognition | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.greeting }]);
  }, [t.greeting]);

  useEffect(() => {
    const browser = window as typeof window & { SpeechRecognition?: new () => BrowserRecognition; webkitSpeechRecognition?: new () => BrowserRecognition };
    setVoiceSupported(Boolean(browser.SpeechRecognition || browser.webkitSpeechRecognition));
    return () => {
      controller.current?.abort();
      recognition.current?.stop();
      window.speechSynthesis?.cancel();
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  async function askAI(question: string, speak = false) {
    const trimmed = question.trim().slice(0, 400);
    if (!trimmed || busy) return;
    setMessages((previous) => [...previous, { role: 'user', content: trimmed }]);
    setInput('');
    setBusy(true);
    controller.current = new AbortController();
    try {
      const response = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, lang }),
        signal: controller.current.signal,
      });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== 'string') throw new Error('Demo unavailable');
      const answer = data.answer.slice(0, 1500);
      setMessages((previous) => [...previous, { role: 'assistant', content: answer }]);
      if (speak && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(answer);
        utterance.lang = lang === 'ar' ? 'ar' : lang === 'en' ? 'en-US' : 'de-DE';
        utterance.rate = 0.96;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setMessages((previous) => [...previous, { role: 'assistant', content: t.unavailable }]);
      }
    } finally {
      setBusy(false);
    }
  }

  function beginVoice() {
    if (listening) {
      recognition.current?.stop();
      setListening(false);
      return;
    }
    const browser = window as typeof window & { SpeechRecognition?: new () => BrowserRecognition; webkitSpeechRecognition?: new () => BrowserRecognition };
    const SpeechRecognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!SpeechRecognition) { setVoiceSupported(false); return; }
    window.speechSynthesis?.cancel();
    const recognizer = new SpeechRecognition();
    recognition.current = recognizer;
    recognizer.lang = lang === 'ar' ? 'ar' : lang === 'en' ? 'en-US' : 'de-DE';
    recognizer.interimResults = false;
    recognizer.onresult = (event) => {
      setListening(false);
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) void askAI(transcript, true);
    };
    recognizer.onerror = () => setListening(false);
    recognizer.onend = () => setListening(false);
    try { recognizer.start(); setListening(true); } catch { setListening(false); }
  }

  async function runWorkflow() {
    if (workflowBusy) return;
    setWorkflowError('');
    setWorkflowRunId('');
    setStep(-1);
    setWorkflowBusy(true);
    try {
      const response = await fetch('/api/demo-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, scenario: 'booking' }),
      });
      const data = await response.json();
      if (!response.ok || data?.status !== 'completed' || !Array.isArray(data.steps)) {
        throw new Error(data?.code === 'NOT_CONFIGURED' ? 'NOT_CONFIGURED' : 'WORKFLOW_ERROR');
      }
      setWorkflowRunId(String(data.runId || ''));
      setStep(Math.min(t.steps.length - 1, data.steps.length - 1));
    } catch (error) {
      setWorkflowError((error as Error).message === 'NOT_CONFIGURED'
        ? (lang === 'de' ? 'Die n8n-Verbindung ist noch nicht eingerichtet.' : lang === 'ar' ? 'لم يتم إعداد اتصال n8n بعد.' : 'The n8n connection has not been configured yet.')
        : (lang === 'de' ? 'Der echte n8n-Workflow konnte nicht bestätigt werden.' : lang === 'ar' ? 'تعذّر التحقق من تنفيذ سير العمل الفعلي عبر n8n.' : 'The live n8n workflow could not be verified.'));
    } finally {
      setWorkflowBusy(false);
    }
  }

  const isRtl = lang === 'ar';
  const tabs: { mode: Mode; icon: typeof Bot; label: string }[] = [
    { mode: 'chat', icon: Bot, label: t.chat },
    { mode: 'voice', icon: Mic, label: t.voice },
    { mode: 'workflow', icon: Workflow, label: t.workflow },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <p className="text-sm font-semibold tracking-widest text-blue-400">{t.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">{t.title}</h1>
      <p className="mt-4 max-w-3xl text-gray-400">{t.subtitle}</p>
      <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label="AI demos">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.mode} type="button" role="tab" aria-selected={mode === tab.mode} onClick={() => setMode(tab.mode)}
              className={'flex min-h-[56px] items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ' + (mode === tab.mode ? 'border-blue-400 bg-blue-500/15 text-white' : 'border-white/15 bg-white/5 text-gray-300 hover:border-blue-400/50')}>
              <Icon size={20} /> {tab.label}
            </button>
          );
        })}
      </div>
      <section className="mt-6 min-h-[340px] rounded-2xl border border-white/10 bg-white p-5 shadow-xl sm:p-7">
        {mode === 'chat' && (
          <div>
            <p className="mb-5 text-sm text-gray-300">{t.description}</p>
            <div aria-live="polite" className="mb-4 max-h-[350px] min-h-[190px] space-y-3 overflow-y-auto rounded-xl bg-black/20 p-4">
              {messages.map((m, i) => (
                <p key={i} className={'max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ' + (m.role === 'user' ? 'ms-auto bg-blue-600 text-white' : 'bg-white/10 text-gray-100')}>{m.content}</p>
              ))}
              {busy && <p className="text-sm text-gray-400">...</p>}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); void askAI(input); }} className="flex gap-2">
              <input aria-label={t.placeholder} value={input} onChange={(e) => setInput(e.target.value)} maxLength={400} className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder={t.placeholder} />
              <button type="submit" disabled={busy || !input.trim()} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"><Send size={19} aria-label={t.send} /></button>
            </form>
          </div>
        )}
        {mode === 'voice' && (
          <div className="flex min-h-[310px] flex-col items-center justify-center gap-5 text-center">
            <div className="rounded-full bg-blue-500/10 p-6"><Mic className="h-12 w-12 text-blue-400" /></div>
            <h2 className="text-xl font-bold text-white">{t.voice}</h2>
            <p className="max-w-lg text-gray-300">{voiceSupported ? t.voiceTip : t.voiceUnavailable}</p>
            <button type="button" onClick={beginVoice} disabled={!voiceSupported || busy} className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white disabled:opacity-50">
              {listening ? <Square size={18} /> : <Mic size={18} />}{listening ? t.voiceStop : t.voiceStart}
            </button>
            {messages.length > 1 && <p aria-live="polite" className="max-w-xl text-sm text-gray-300">{messages[messages.length - 1].content}</p>}
          </div>
        )}
        {mode === 'workflow' && (
          <div>
            <p className="mb-5 text-gray-300">{t.workflowTip}</p>
            <div className="grid gap-3 sm:grid-cols-5">
              {t.steps.map((label, i) => (
                <div key={label} className={'rounded-xl border p-4 text-center text-sm ' + (step >= i ? 'border-blue-400/60 bg-blue-500/15 text-white' : 'border-white/10 bg-white/5 text-gray-400')}>
                  <div className="mb-2 text-lg font-bold">{String(i + 1).padStart(2, '0')}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
            {workflowBusy && <p role="status" className="mt-5 text-sm text-blue-600">{lang === 'ar' ? 'جاري تشغيل n8n...' : lang === 'de' ? 'n8n-Workflow wird ausgeführt...' : 'Running n8n workflow...'}</p>}
            {workflowError && <p role="alert" className="mt-5 text-sm text-red-600">{workflowError}</p>}
            {step === t.steps.length - 1 && workflowRunId && <p role="status" className="mt-5 text-sm text-emerald-700">{t.completed} · ID: {workflowRunId.slice(0, 8)}</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" disabled={workflowBusy} onClick={runWorkflow} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"><Play size={17} />{t.workflowStart}</button>
              <button type="button" onClick={() => { if (timer.current) clearInterval(timer.current); timer.current = null; setStep(-1); setWorkflowError(''); setWorkflowRunId(''); }} className="rounded-xl border border-white/20 px-5 py-3 text-white">{t.workflowReset}</button>
            </div>
          </div>
        )}
      </section>
      <p className="mt-5 text-xs leading-relaxed text-gray-400">{t.privacy}</p>
      <Link href={lang === 'de' ? '/consultation' : '/' + lang + '/consultation'} className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-400 hover:text-blue-300">{t.consultancy}<ArrowRight size={18} /></Link>
    </div>
  );
}
