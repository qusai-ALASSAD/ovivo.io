'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, X } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export function LeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const isAr = pathname?.startsWith('/ar');
  const isEn = pathname?.startsWith('/en');

  const t = isAr ? {
    title: 'احصل على خطة تسويق مجانية',
    desc: 'انضم إلى أكثر من 200 شركة تستخدم الذكاء الاصطناعي لتنمية أعمالها.',
    placeholder: 'أدخل بريدك الإلكتروني',
    btn: 'احصل عليها مجاناً',
    loading: 'جاري الإرسال...',
    privacy: 'نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    success: 'تم! تحقق من بريدك الإلكتروني.',
    error: 'حدث خطأ. حاول مرة أخرى.',
    emailError: 'أدخل بريداً إلكترونياً صحيحاً.',
  } : isEn ? {
    title: 'Get Your Free AI Marketing Plan',
    desc: 'Join 200+ businesses using AI to grow. Get instant access to our marketing plan template.',
    placeholder: 'Enter your email',
    btn: 'Get Free Template',
    loading: 'Sending...',
    privacy: 'We respect your privacy. Unsubscribe at any time.',
    success: 'Success! Check your email.',
    error: 'Something went wrong. Please try again.',
    emailError: 'Please enter a valid email address.',
  } : {
    title: 'Kostenlosen KI-Marketing-Plan sichern',
    desc: 'Über 200 Betriebe nutzen KI zum Wachsen. Holen Sie sich jetzt Ihr kostenloses Template.',
    placeholder: 'Ihre E-Mail-Adresse',
    btn: 'Kostenlos anfordern',
    loading: 'Wird gesendet...',
    privacy: 'Wir respektieren Ihre Privatsphäre. Jederzeit abmeldbar.',
    success: 'Erfolg! Prüfen Sie Ihre E-Mails.',
    error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
    emailError: 'Bitte gültige E-Mail-Adresse eingeben.',
  };

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('ovivo_lead_magnet_shown');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => { setIsOpen(true); }, 25000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { toast.error(t.emailError); return; }
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup_lead_magnet' }),
      });
      toast.success(t.success);
      setIsOpen(false);
      localStorage.setItem('ovivo_lead_magnet_shown', 'true');
      setEmail('');
    } catch {
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('ovivo_lead_magnet_shown', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        dir={isAr ? 'rtl' : 'ltr'}
        className="sm:max-w-sm border border-white/10 bg-[#0d1117] shadow-2xl rounded-2xl p-6"
      >
        <button onClick={handleClose} className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <Gift className="h-7 w-7 text-white" />
          </div>
          <DialogTitle className="text-center text-xl font-bold text-white">{t.title}</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-400 leading-relaxed">{t.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input
            type="email" placeholder={t.placeholder} value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
            required dir={isAr ? 'rtl' : 'ltr'}
          />
          <Button type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 font-semibold"
            disabled={loading}>
            {loading ? t.loading : t.btn}
          </Button>
          <p className="text-center text-xs text-gray-500">{t.privacy}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
      }
