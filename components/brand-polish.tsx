'use client';

import { useEffect } from 'react';

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

const heroTitleByLang = {
  ar: 'زِد طلبات العملاء لعملك\nتلقائياً على مدار الساعة 24/7.',
  de: 'Mehr Anfragen für Ihren Betrieb\nautomatisch rund um die Uhr 24/7.',
  en: 'More inquiries for your business\nautomatically, around the clock 24/7.',
} as const;

function replaceTextContent(value: string) {
  const lang = currentLang();
  const heroTitle = heroTitleByLang[lang];
  let next = value;

  if (value.includes('24/7')) {
    return value;
  }

  if (lang === 'ar') {
    next = next.replace(/اجذب المزيد من العملاء بدون أي جهد يدوي\. مع Ovivo يتم الرد على جميع الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة\. وفّر وقتك وركّز على تطوير عملك\./g, 'مع Ovivo يتم الرد على الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة، حتى عندما يكون فريقك مشغولاً. وفّر وقتك وركّز على تطوير عملك بينما يعمل النظام في الخلفية.');
    next = next.replace(/اجذب المزيد من العملاء بدون أي جهد يدوي\./g, '');
    next = next.replace(/اجذب المزيد من العملاء/g, heroTitle);
    next = next.replace(/أتمتة ذكية تراها بوضوح/g, heroTitle);
    next = next.replace(/زِد طلبات العملاء لعملك/g, heroTitle);
    next = next.replace(/تلقائياً على مدار الساعة\.?\s*7\/24/g, '');
    next = next.replace(/بدون أي جهد يدوي\./g, '');
    next = next.replace(/وتتحكم بها بثقة\./g, '');
  } else if (lang === 'en') {
    next = next.replace(/Your business stays full/g, heroTitle);
    next = next.replace(/AI automation you can see/g, heroTitle);
    next = next.replace(/More inquiries for your business/g, heroTitle);
    next = next.replace(/automatically, around the clock\.r\.?\s*7\/24/g, '');
    next = next.replace(/automatically, around the clock\.?\s*7\/24/g, '');
    next = next.replace(/without lifting a finger\./g, '');
    next = next.replace(/and control with confidence\./g, '');
  } else {
    next = next.replace(/Ihr Betrieb füllt sich/g, heroTitle);
    next = next.replace(/KI-Automation, die Sie sehen/g, heroTitle);
    next = next.replace(/Mehr Anfragen für Ihren Betrieb/g, heroTitle);
    next = next.replace(/automatisch rund um die U+hr\s*7\/24/g, '');
    next = next.replace(/ohne dass Sie einen Finger rühren\./g, '');
    next = next.replace(/und zuverlässig steuern\./g, '');
    next = next.replace(/Bereit, Ihren Betrieb auf Autopilot zu setzen\?/g, 'Bereit, Kundenanfragen und Buchungen zuverlässig zu automatisieren?');
  }

  next = next.replace(/الأسعار/g, 'الباقات');
  next = next.replace(/الباقات والباقات/g, 'الباقات');
  next = next.replace(/الباقات و الأسعار/g, 'الباقات');
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

  return next.replace(/\n\s*\n/g, '\n');
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

function applyPlatformPolish() {
  document.documentElement.classList.add('ovivo-platform-ui');

  const sections = Array.from(document.querySelectorAll('main section'));
  sections[0]?.classList.add('ovivo-hero-command');
  sections[1]?.classList.add('ovivo-proof-console');

  sections.forEach((section) => {
    const text = section.textContent || '';
    if (
      text.includes('Restaurant-Automation live') ||
      text.includes('Restaurant automation live') ||
      text.includes('أتمتة مطعم مباشرة')
    ) {
      section.classList.add('ovivo-workflow-theater');
    }
  });
}

export function BrandPolish() {
  useEffect(() => {
    const run = () => {
      polishVisibleCopy();
      applyPlatformPolish();
    };

    run();
    const timers = [100, 500, 1200, 2500].map((delay) => setTimeout(run, delay));
    const observer = new MutationObserver(() => run());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <style jsx global>{`
      .ovivo-platform-ui body {
        background:
          radial-gradient(circle at 18% 12%, rgba(0, 209, 255, 0.13), transparent 24rem),
          radial-gradient(circle at 86% 8%, rgba(123, 97, 255, 0.14), transparent 26rem),
          linear-gradient(180deg, #070b12 0%, #0a111d 42%, #070b12 100%) !important;
      }

      .ovivo-platform-ui body::before {
        background-image:
          linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px),
          radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 34rem) !important;
        background-size: 42px 42px, 42px 42px, auto !important;
        opacity: 0.92 !important;
      }

      nav {
        background: rgba(7, 11, 19, 0.78) !important;
        border-bottom: 1px solid rgba(148, 163, 184, 0.14) !important;
        backdrop-filter: blur(22px) saturate(150%) !important;
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.22) !important;
      }

      nav a,
      nav button {
        letter-spacing: 0 !important;
      }

      nav a.group > div.relative.flex.h-10.w-10 {
        overflow: hidden;
        background: #080f1a url('/icon.svg') center / 118% 118% no-repeat !important;
        border: 1px solid rgba(59, 130, 246, 0.35);
        box-shadow: 0 10px 28px rgba(0, 209, 255, 0.18), inset 0 0 22px rgba(59, 130, 246, 0.14);
      }

      nav a.group > div.relative.flex.h-10.w-10 > svg,
      nav a.group > div.relative.flex.h-10.w-10::before,
      nav a.group > div.relative.flex.h-10.w-10::after {
        display: none !important;
        content: none !important;
      }

      .ovivo-hero-command {
        position: relative !important;
        min-height: calc(100vh - 80px) !important;
        padding-top: clamp(4rem, 8vw, 7rem) !important;
        padding-bottom: clamp(3rem, 6vw, 5rem) !important;
      }

      .ovivo-hero-command > div {
        max-width: 1240px !important;
      }

      .ovivo-platform-ui body main h1,
      .ovivo-platform-ui body main h2 {
        hyphens: none !important;
        overflow-wrap: normal !important;
        text-wrap: balance;
        word-break: normal !important;
      }

      .ovivo-hero-command h1 {
        max-width: 980px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        font-size: clamp(3rem, 6.2vw, 6.6rem) !important;
        line-height: 1.02 !important;
        letter-spacing: 0 !important;
        white-space: pre-line;
        text-wrap: balance;
      }

      html[dir='rtl'] h1,
      html[lang='ar'] h1,
      body:has(a[href='/ar']) h1 {
        line-height: 1.12 !important;
      }

      .ovivo-hero-command h1 + p,
      .ovivo-hero-command p:has(+ div) {
        max-width: 760px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        color: rgba(203, 213, 225, 0.86) !important;
        font-size: clamp(1rem, 1.6vw, 1.28rem) !important;
      }

      .ovivo-hero-command .glass,
      .ovivo-proof-console .glass,
      .ovivo-workflow-theater .glass {
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(7, 11, 19, 0.72)) !important;
        border-color: rgba(148, 163, 184, 0.16) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 90px rgba(0, 0, 0, 0.28) !important;
      }

      .ovivo-platform-ui a[href*='consultation'] button,
      .ovivo-platform-ui button.bg-blue-500 {
        background: linear-gradient(135deg, #2f7cff 0%, #7461ff 55%, #b832f7 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.16) !important;
        border-radius: 12px !important;
        box-shadow: 0 16px 42px rgba(47, 124, 255, 0.28) !important;
      }

      .ovivo-platform-ui button[variant='outline'],
      .ovivo-platform-ui a[href='#pakete'] button {
        background: rgba(7, 11, 19, 0.76) !important;
        border: 1px solid rgba(148, 163, 184, 0.18) !important;
      }

      .ovivo-proof-console {
        border-top: 1px solid rgba(148, 163, 184, 0.1) !important;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1) !important;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.38), rgba(7, 11, 19, 0.18)) !important;
      }

      .ovivo-workflow-theater {
        padding-top: clamp(5rem, 8vw, 8rem) !important;
        padding-bottom: clamp(5rem, 8vw, 8rem) !important;
        background:
          radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.12), transparent 34rem),
          linear-gradient(180deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.035)) !important;
        border-top: 1px solid rgba(148, 163, 184, 0.1);
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      }

      .ovivo-workflow-theater svg {
        border-radius: 24px !important;
        box-shadow: 0 34px 120px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(148, 163, 184, 0.12) !important;
      }

      .ovivo-workflow-theater h2,
      .ovivo-workflow-theater [class*='text-gradient'] {
        text-wrap: balance;
      }

      .ovivo-platform-ui section h2 {
        letter-spacing: 0 !important;
        text-wrap: balance;
      }

      .ovivo-platform-ui .rounded-3xl {
        border-radius: 24px !important;
      }

      .ovivo-platform-ui .rounded-2xl {
        border-radius: 18px !important;
      }

      @media (max-width: 768px) {
        .ovivo-hero-command {
          min-height: auto !important;
          padding-top: 3.75rem !important;
        }

        .ovivo-hero-command h1 {
          font-size: clamp(2.05rem, 9.4vw, 3.2rem) !important;
          line-height: 1.08 !important;
        }

        .ovivo-workflow-theater svg text {
          font-size: 16px !important;
        }
      }
    `}</style>
  );
}
