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
        background: linear-gradient(145deg, #1d4ed8, #06b6d4) !important;
      }

      nav a.group > div.relative.flex.h-10.w-10 > svg {
        display: none;
      }

      nav a.group > div.relative.flex.h-10.w-10::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 25px;
        height: 25px;
        border-radius: 999px;
        border: 6px solid rgba(255, 255, 255, 0.94);
        box-shadow: 0 7px 18px rgba(37, 99, 235, 0.35), inset 0 0 0 7px rgba(15, 23, 42, 0.22);
        transform: translate(-50%, -50%);
      }

      nav a.group > div.relative.flex.h-10.w-10::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 23px;
        height: 23px;
        transform: translate(-50%, -50%);
        background:
          radial-gradient(circle at 50% 50%, #ffffff 0 3px, transparent 4px),
          radial-gradient(circle at 18% 18%, #22c55e 0 3px, transparent 4px),
          radial-gradient(circle at 84% 18%, #06b6d4 0 3px, transparent 4px),
          radial-gradient(circle at 18% 84%, #8b5cf6 0 3px, transparent 4px),
          radial-gradient(circle at 84% 84%, #2563eb 0 3px, transparent 4px),
          linear-gradient(42deg, transparent 45%, #bfdbfe 46% 54%, transparent 55%),
          linear-gradient(-42deg, transparent 45%, #bfdbfe 46% 54%, transparent 55%);
      }
    `}</style>
  );
}
