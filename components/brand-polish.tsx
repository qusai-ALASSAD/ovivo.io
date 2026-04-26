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

  next = next.replace(/الأسعار/g, 'الباقات');
  next = next.replace(/الباقات والأسعار/g, 'الباقات');
  next = next.replace(/Packages & Pricing/g, 'Packages');
  next = next.replace(/Pricing/g, 'Packages');
  next = next.replace(/Pakete & Preise/g, 'Pakete');
  next = next.replace(/Preise/g, 'Pakete');

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
        overflow: visible;
        background: linear-gradient(145deg, #2563eb, #06b6d4) !important;
      }

      nav a.group > div.relative.flex.h-10.w-10 > svg {
        display: none;
      }

      nav a.group > div.relative.flex.h-10.w-10::before {
        content: '';
        position: absolute;
        inset: 9px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 10px 22px rgba(37, 99, 235, 0.32);
      }

      nav a.group > div.relative.flex.h-10.w-10::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 22px;
        height: 22px;
        transform: translate(-50%, -50%);
        background:
          radial-gradient(circle at 50% 50%, #2563eb 0 3px, transparent 4px),
          radial-gradient(circle at 15% 15%, #06b6d4 0 3px, transparent 4px),
          radial-gradient(circle at 85% 18%, #22c55e 0 3px, transparent 4px),
          radial-gradient(circle at 18% 85%, #8b5cf6 0 3px, transparent 4px),
          radial-gradient(circle at 84% 84%, #2563eb 0 3px, transparent 4px),
          linear-gradient(45deg, transparent 45%, #2563eb 46% 54%, transparent 55%),
          linear-gradient(-45deg, transparent 45%, #06b6d4 46% 54%, transparent 55%),
          linear-gradient(90deg, transparent 45%, #22c55e 46% 54%, transparent 55%);
      }
    `}</style>
  );
}
