'use client';

import { useEffect } from 'react';

const OLD_ARABIC_HERO_SUB =
  'اجذب المزيد من العملاء بدون أي جهد يدوي. مع Ovivo يتم الرد على جميع الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة. وفّر وقتك وركّز على تطوير عملك.';

const DUPLICATE_ARABIC_SENTENCE = 'اجذب المزيد من العملاء بدون أي جهد يدوي.';

const NEW_ARABIC_HERO_SUB =
  'مع Ovivo يتم الرد على الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة، حتى عندما يكون فريقك مشغولاً. وفّر وقتك وركّز على تطوير عملك بينما يعمل النظام في الخلفية.';

function currentLang() {
  if (window.location.pathname.startsWith('/ar')) return 'ar';
  if (window.location.pathname.startsWith('/en')) return 'en';
  return 'de';
}

function packageCopy() {
  const lang = currentLang();
  if (lang === 'ar') return 'حسب حجم الشركة والعمل';
  if (lang === 'en') return 'Tailored to company size';
  return 'Nach Unternehmensgröße';
}

function replaceTextContent(value: string) {
  const lang = currentLang();
  let next = value;

  next = next.replace(OLD_ARABIC_HERO_SUB, NEW_ARABIC_HERO_SUB);
  next = next.replace(DUPLICATE_ARABIC_SENTENCE, '');

  next = next.replace(/Ihr Betrieb füllt sich/g, 'Mehr Anfragen für Ihren Betrieb');
  next = next.replace(/ohne dass Sie einen Finger rühren\./g, 'automatisch rund um die Uhr.');
  next = next.replace(/Bereit, Ihren Betrieb auf Autopilot zu setzen\?/g, 'Bereit, Kundenanfragen und Buchungen zuverlässig zu automatisieren?');
  next = next.replace(/Your business stays full/g, 'More inquiries for your business');
  next = next.replace(/without lifting a finger\./g, 'automatically, around the clock.');
  next = next.replace(/اجذب المزيد من العملاء/g, 'زِد طلبات العملاء لعملك');
  next = next.replace(/بدون أي جهد يدوي\./g, 'تلقائياً على مدار الساعة.');

  next = next.replace(/الأسعار/g, 'الباقات');
  next = next.replace(/الباقات والأسعار/g, 'الباقات');
  next = next.replace(/Packages & Pricing/g, 'Packages');
  next = next.replace(/Pricing/g, 'Packages');
  next = next.replace(/Pakete & Preise/g, 'Pakete');
  next = next.replace(/Preise/g, 'Pakete');

  next = next.replace(/مضمونة أو نواصل مجاناً\./g, 'مضمونة أو نواصل التحسين حتى تظهر النتائج.');
  next = next.replace(/أو نواصل مجاناً/g, 'أو نواصل التحسين حتى تظهر النتائج');
  next = next.replace(/نواصل مجاناً/g, 'نواصل التحسين حتى تظهر النتائج');

  if (/^(ab|from|من)\s*€?[\d.,]+/i.test(next.trim()) || /€\s?[\d.,]+/.test(next)) {
    next = packageCopy();
  }

  if (lang === 'ar') {
    next = next.replace(/3 باقات تناسب كل مرحلة\. إعداد لمرة واحدة \+ رعاية شهرية\./g, 'باقات مرنة تُحدد حسب حجم شركتك ونوع الأتمتة المطلوبة.');
    next = next.replace(/السعر النهائي يعتمد على حجم الشركة ومتطلبات الأتمتة\./g, 'كل عرض يُجهّز حسب حجم الشركة، عدد القنوات، وحجم العمل المطلوب.');
  } else if (lang === 'en') {
    next = next.replace(/Three packages for every stage\. One-time setup \+ monthly support\./g, 'Flexible packages tailored to your company size, channels, and automation scope.');
    next = next.replace(/Final price depends on business size and automation requirements\./g, 'Each offer is tailored to company size, channels, and automation scope.');
  } else {
    next = next.replace(/Drei Pakete für jeden Bedarf\. Einmaliger Setup \+ monatliche Betreuung\./g, 'Flexible Pakete, angepasst an Unternehmensgröße, Kanäle und Automatisierungsumfang.');
    next = next.replace(/Endpreis abhängig von Betriebsgröße und Automatisierungsumfang\./g, 'Jedes Angebot richtet sich nach Unternehmensgröße, Kanälen und Automatisierungsumfang.');
  }

  return next;
}

function polishVisibleCopy() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const value = node.nodeValue || '';
    const next = replaceTextContent(value);
    if (next !== value) node.nodeValue = next;
  });
}

export function BrandPolish() {
  useEffect(() => {
    polishVisibleCopy();
    const timers = [100, 500, 1200, 2500].map((delay) => setTimeout(polishVisibleCopy, delay));
    const observer = new MutationObserver(() => polishVisibleCopy());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <style jsx global>{`
      html[dir='rtl'] h1,
      html[lang='ar'] h1,
      body:has(a[href='/ar']) h1 {
        line-height: 1.18 !important;
      }

      nav a.group > div.relative.flex.h-10.w-10 {
        overflow: hidden;
        background: radial-gradient(circle at 35% 25%, #111827 0%, #0b1220 55%, #07101d 100%) !important;
        border: 1px solid rgba(59, 130, 246, 0.35);
        box-shadow: 0 10px 28px rgba(0, 209, 255, 0.18), inset 0 0 22px rgba(59, 130, 246, 0.14);
      }

      nav a.group > div.relative.flex.h-10.w-10 > svg {
        display: none;
      }

      nav a.group > div.relative.flex.h-10.w-10::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        transform: translate(-50%, -50%);
        background: conic-gradient(from 205deg, #00d1ff 0deg, #2563eb 145deg, #7b61ff 235deg, #ff5ce0 330deg, #00d1ff 360deg);
        -webkit-mask: radial-gradient(farthest-side, transparent 0 54%, #000 56% 68%, transparent 70% 100%);
        mask: radial-gradient(farthest-side, transparent 0 54%, #000 56% 68%, transparent 70% 100%);
        filter: drop-shadow(0 0 7px rgba(0, 209, 255, 0.72));
      }

      nav a.group > div.relative.flex.h-10.w-10::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 31px;
        height: 31px;
        transform: translate(-50%, -50%);
        background:
          radial-gradient(circle at 6% 50%, #00d1ff 0 3px, transparent 3.6px),
          radial-gradient(circle at 18% 22%, #20c8ff 0 2.4px, transparent 3px),
          radial-gradient(circle at 42% 6%, #3b82f6 0 2.4px, transparent 3px),
          radial-gradient(circle at 67% 11%, #7b61ff 0 2.4px, transparent 3px),
          radial-gradient(circle at 89% 29%, #b43cff 0 2.8px, transparent 3.4px),
          radial-gradient(circle at 94% 55%, #ff5ce0 0 3px, transparent 3.7px),
          radial-gradient(circle at 78% 83%, #b43cff 0 2.6px, transparent 3.2px),
          radial-gradient(circle at 51% 94%, #7b61ff 0 2.4px, transparent 3px),
          radial-gradient(circle at 24% 83%, #3b82f6 0 2.4px, transparent 3px),
          radial-gradient(circle at 11% 67%, #00d1ff 0 2.6px, transparent 3.2px),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0 2px, transparent 2.6px),
          linear-gradient(30deg, transparent 43%, rgba(125, 211, 252, 0.75) 45%, transparent 47%),
          linear-gradient(-35deg, transparent 44%, rgba(196, 181, 253, 0.7) 46%, transparent 48%),
          linear-gradient(92deg, transparent 47%, rgba(59, 130, 246, 0.68) 49%, transparent 51%);
        opacity: 0.98;
      }
    `}</style>
  );
}
