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

  const examples = {
    de: ['Termine automatisch buchen', 'Wie funktioniert ein KI-Chatbot?', 'n8n mit meinem CRM verbinden'],
    en: ['Automate appointment bookings', 'How does an AI chatbot work?', 'Connect n8n with my CRM'],
    ar: ['أتمتة حجز المواعيد', 'كيف يعمل الشات بوت؟', 'ربط n8n مع CRM'],
  }[lang];

  return (
    <section className="ovivo-ai-lab relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-24" dir={isRtl ? 'rtl' : 'ltr'} aria-label={t.title}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.10),transparent_70%)] blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCE7FF] bg-white px-4 py-2 text-[11px] font-extrabold tracking-[.13em] text-[#2563EB] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#885CF6]" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0B1F4D] sm:text-4xl lg:text-[46px]">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52647E] sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#DCE6FF] bg-white shadow-[0_26px_80px_rgba(11,31,77,.10)]">
          <div className="border-b border-[#E7ECFB] bg-[#F8FAFF] p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2" role="tablist" aria-label={lang === 'ar' ? 'التجارب التفاعلية' : 'AI experiences'}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = mode === tab.mode;
                return (
                  <button key={tab.mode} id={'ovivo-tab-' + tab.mode} type="button" role="tab"
                    aria-selected={selected} aria-controls="ovivo-demo-panel"
                    onClick={() => setMode(tab.mode)}
                    className={'ovivo-ai-tab flex min-h-[64px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center text-xs font-bold transition-colors sm:min-h-[60px] sm:flex-row sm:gap-3 sm:text-sm ' +
                      (selected ? 'ovivo-ai-tab-active border-[#3B82F6] bg-[#2563EB] text-white shadow-[0_8px_24px_rgba(59,130,246,.22)]' :
                        'border-[#E0E7FF] bg-white text-[#405473] hover:border-[#9BB9FF] hover:bg-[#EDF4FF]')}>
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="ovivo-demo-panel" role="tabpanel" aria-labelledby={'ovivo-tab-' + mode}
            className="min-h-[440px] bg-white p-4 sm:p-7">
            {mode === 'chat' && (
              <div className="flex min-h-[415px] flex-col">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E0E7FF] bg-[#F4F7FB]">
                    <img src="/ovivo-favicon.svg" alt="" className="h-9 w-9" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-[#0B1F4D]">OVIVO AI Assistant</h3>
                    <p className="mt-0.5 text-xs leading-5 text-[#64748B]">{t.description}</p>
                  </div>
                </div>

                <div aria-live="polite" aria-relevant="additions text" className="ovivo-ai-transcript min-h-[205px] max-h-[330px] flex-1 space-y-4 overflow-y-auto rounded-2xl border border-[#E5EBFA] bg-[#F6F9FF] px-4 py-5 sm:px-6">
                  {messages.map((message, index) => (
                    <div key={index} className={'flex ' + (message.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <div className={'max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] ' +
                        (message.role === 'user' ? 'ovivo-ai-user-bubble rounded-br-sm bg-[#2563EB] text-white' :
                        'rounded-bl-sm border border-[#DFE8F9] bg-white text-[#233858] shadow-sm')}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {busy && (
                    <div className="flex justify-start"><div className="flex items-center gap-1.5 rounded-2xl border border-[#DFE8F9] bg-white px-4 py-3" role="status" aria-label="AI is responding">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#3B82F6]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#885CF6] [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#3B82F6] [animation-delay:300ms]" />
                    </div></div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2" aria-label={lang === 'ar' ? 'أسئلة مقترحة' : 'Suggested questions'}>
                  {examples.map((example) => (
                    <button key={example} type="button" disabled={busy}
                      onClick={() => void askAI(example)}
                      className="rounded-full border border-[#D7E3FF] bg-white px-3.5 py-2 text-xs font-semibold text-[#36547A] transition-colors hover:border-[#3B82F6] hover:bg-[#EFF5FF] disabled:opacity-50">
                      {example}
                    </button>
                  ))}
                </div>

                <form onSubmit={(event) => { event.preventDefault(); void askAI(input); }} className="mt-5 flex items-center gap-3 rounded-2xl border border-[#D9E4FB] bg-white p-2.5 shadow-[0_4px_18px_rgba(11,31,77,.05)] focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-blue-500/10">
                  <label htmlFor="ovivo-ai-chat-input" className="sr-only">{t.placeholder}</label>
                  <input id="ovivo-ai-chat-input" autoComplete="off" value={input} maxLength={400}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={t.placeholder}
                    className="h-11 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm font-medium text-[#0B1F4D] placeholder:text-[#72839E] focus:outline-none focus:ring-0" />
                  <button type="submit" aria-label={t.send} title={t.send} disabled={busy || !input.trim()}
                    className="ovivo-ai-send flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#AABBDD] disabled:shadow-none">
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </button>
                </form>
              </div>
            )}

            {mode === 'voice' && (
              <div className="flex min-h-[415px] flex-col items-center justify-center gap-5 px-2 text-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#DDE6FF] bg-gradient-to-br from-[#EEF5FF] to-[#F4EEFF]">
                  {listening && <span className="absolute inset-[-9px] animate-pulse rounded-[35px] border-2 border-[#885CF6]/40" aria-hidden="true" />}
                  <Mic className="h-10 w-10 text-[#3B82F6]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F4D]">{t.voice}</h3>
                <p className="max-w-lg text-sm leading-7 text-[#52647E]">{voiceSupported ? t.voiceTip : t.voiceUnavailable}</p>
                <button type="button" onClick={beginVoice} disabled={!voiceSupported || busy}
                  className="ovivo-ai-action inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-7 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-[#1D4ED8] disabled:opacity-50">
                  {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}{listening ? t.voiceStop : t.voiceStart}
                </button>
                {messages.length > 1 && <p aria-live="polite" className="max-w-lg rounded-2xl border border-[#DFE8F9] bg-[#F6F9FF] p-4 text-sm leading-6 text-[#233858]">{messages[messages.length - 1].content}</p>}
              </div>
            )}

            {mode === 'workflow' && (
              <div className="flex min-h-[415px] flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]"><Workflow className="h-6 w-6 text-[#3B82F6]" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F4D]">{t.workflow}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#52647E]">{t.workflowTip}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-5">
                  {t.steps.map((label, index) => (
                    <div key={label} className={'rounded-2xl border px-3 py-5 text-center transition-colors ' +
                      (step >= index ? 'border-[#93B8FF] bg-[#EAF2FF]' : 'border-[#E2E9F6] bg-[#FAFBFE]')}>
                      <span className={'mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold ' + (step >= index ? 'bg-[#2563EB] text-white' : 'bg-[#E8ECF5] text-[#52647E]')}>{index + 1}</span>
                      <span className="block text-xs font-semibold leading-5 text-[#0B1F4D]">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="button" disabled={workflowBusy} onClick={runWorkflow}
                    className="ovivo-ai-action inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-bold text-white hover:bg-[#1D4ED8] disabled:opacity-50">
                    <Play className="h-4 w-4" />{t.workflowStart}
                  </button>
                  <button type="button" onClick={() => { setStep(-1); setWorkflowRunId(''); setWorkflowError(''); }} disabled={workflowBusy}
                    className="min-h-[48px] rounded-xl border border-[#D6E0F6] bg-white px-6 text-sm font-semibold text-[#405473] hover:bg-[#F4F7FB] disabled:opacity-50">
                    {t.workflowReset}
                  </button>
                </div>
                {workflowBusy && <p role="status" className="mt-5 text-sm text-[#2563EB]">{lang === 'de' ? 'n8n-Workflow wird ausgeführt…' : lang === 'en' ? 'Running n8n workflow…' : 'جاري تشغيل n8n…'}</p>}
                {workflowError && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{workflowError}</p>}
                {step === t.steps.length - 1 && workflowRunId && <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{t.completed} · ID: {workflowRunId.slice(0, 8)}</p>}
              </div>
            )}
          </div>
          <div className="border-t border-[#E9EEFA] bg-[#F8FAFF] px-5 py-4 sm:px-7">
            <p className="text-xs leading-6 text-[#5F718C]">{t.privacy}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link href={lang === 'de' ? '/consultation' : '/' + lang + '/consultation'}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[#D7E4FF] bg-white px-5 text-sm font-bold text-[#2563EB] shadow-sm transition-colors hover:border-[#3B82F6] hover:bg-[#EFF5FF]">
            {t.consultancy}<ArrowRight className={isRtl ? 'h-4 w-4 rotate-180' : 'h-4 w-4'} />
          </Link>
        </div>
      </div>
    </section>
  );
}
