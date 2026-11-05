'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const content = {
  de: {
    eyebrow: 'Kostenlose Erstberatung',
    title: 'Entdecken Sie, was KI für Ihr Unternehmen automatisieren kann.',
    description: 'Erhalten Sie eine kurze, unverbindliche Einschätzung Ihrer Automationsmöglichkeiten.',
    placeholder: 'Ihre geschäftliche E-Mail-Adresse',
    submit: 'Kostenlose KI-Analyse anfragen',
    loading: 'Wird gesendet…',
    success: 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.',
    error: 'Ihre Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut.',
    privacy: 'Wir verwenden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage.',
    privacyLabel: 'Datenschutzerklärung',
    close: 'Schließen',
    cta: 'Kostenlose KI-Analyse anfragen',
  },
  en: {
    eyebrow: 'Free initial consultation',
    title: 'Discover what AI can automate for your business.',
    description: 'Get a brief, no-obligation assessment of your automation opportunities.',
    placeholder: 'Your business email address',
    submit: 'Request a free AI analysis',
    loading: 'Sending…',
    success: 'Thank you! Your request has been submitted. We will contact you as soon as possible.',
    error: 'Your request could not be sent. Please try again.',
    privacy: 'We use your details only to respond to your inquiry.',
    privacyLabel: 'Privacy policy',
    close: 'Close',
    cta: 'Request a free AI analysis',
  },
  ar: {
    eyebrow: 'استشارة أولية مجانية',
    title: 'اكتشف ما يمكن للذكاء الاصطناعي أتمتته في شركتك.',
    description: 'احصل على تقييم أولي مختصر ومجاني لفرص الأتمتة في شركتك.',
    placeholder: 'بريدك الإلكتروني المهني',
    submit: 'اطلب تحليل AI مجانياً',
    loading: 'جاري الإرسال…',
    success: 'شكراً لك! تم إرسال طلبك بنجاح وسنتواصل معك بأقرب فرصة.',
    error: 'تعذر إرسال طلبك، يرجى المحاولة مرة أخرى.',
    privacy: 'نستخدم بياناتك فقط للرد على طلبك.',
    privacyLabel: 'سياسة الخصوصية',
    close: 'إغلاق',
    cta: 'اطلب تحليل أتمتة مجاني',
  },
};

export function LeadMagnet() {
  const pathname = usePathname();
  const lang = pathname?.startsWith('/ar') ? 'ar' : pathname?.startsWith('/en') ? 'en' : 'de';
  const t = content[lang];
  const prefix = lang === 'de' ? '' : '/' + lang;
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const openDialog = () => {
      setStatus('idle');
      setIsOpen(true);
    };
    window.addEventListener('ovivo:open-consultation', openDialog);
    return () => window.removeEventListener('ovivo:open-consultation', openDialog);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: '', company: '', message: 'Request for a free AI automation analysis', source: 'consultation_modal' }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="ovivo-consultation-modal max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[430px] overflow-y-auto rounded-[24px] border border-[#E0E7FF] bg-white p-5 text-[#0B1F4D] shadow-[0_24px_76px_rgba(11,31,77,.16)] sm:p-7"
      >
        <DialogHeader className="space-y-2.5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E0E7FF] bg-[#F4F7FB]">
            <img src="/ovivo-favicon.svg" alt="" width={36} height={36} className="h-9 w-9" />
          </div>
          <span className="text-center text-[11px] font-bold uppercase tracking-[.08em] text-[#3B82F6]">{t.eyebrow}</span>
          <DialogTitle className="mx-auto max-w-[360px] text-center text-[22px] font-extrabold leading-[1.24] tracking-tight text-[#0B1F4D] sm:text-[24px]">{t.title}</DialogTitle>
          <DialogDescription className="mx-auto max-w-[345px] text-center text-[13px] leading-6 text-[#52647E]">{t.description}</DialogDescription>
        </DialogHeader>
        {status === 'success' ? (
          <div role="status" className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-900">
            {t.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <label className="sr-only" htmlFor="ovivo-consultation-email">{t.placeholder}</label>
            <input
              id="ovivo-consultation-email"
              type="email" required maxLength={254} autoComplete="email" value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.placeholder}
              className="h-[50px] w-full rounded-xl border border-[#D7E3F6] bg-white px-4 text-sm text-[#0B1F4D] placeholder:text-[#71829B] shadow-none outline-none focus:border-[#3B82F6] focus:outline-none focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3B82F6]"
            />
            <button type="submit" disabled={loading} className="ovivo-consultation-submit flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(59,130,246,.18)] transition-colors hover:bg-[#2563EB] disabled:opacity-60">
              {loading ? t.loading : t.submit}
            </button>
            {status === 'error' && <p role="alert" className="text-sm text-red-700">{t.error}</p>}
            <p className="text-center text-[11px] leading-[1.65] text-[#52647E]">
              {t.privacy}{' '}
              <Link href={prefix + '/privacy'} className="font-semibold text-[#2563eb] underline underline-offset-2">{t.privacyLabel}</Link>
            </p>
          </form>
        )}
        <button type="button" onClick={() => setIsOpen(false)} className="mx-auto mt-0 text-xs font-medium text-[#52647E] underline underline-offset-2 hover:text-[#0B1F4D]">{t.close}</button>
      </DialogContent>
    </Dialog>
  );
}

// User-initiated trigger for the consultation dialog. No timed popup or auto-open on scroll.
export function OpenConsultationButton({ lang = 'de' }: { lang?: 'de' | 'en' | 'ar' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('ovivo:open-consultation'))}
      className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition-colors hover:bg-[#2563eb]"
    >
      {content[lang].cta}
    </button>
  );
}
