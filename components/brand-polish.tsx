'use client';

import { useEffect } from 'react';

const OLD_ARABIC_HERO_SUB =
  'اجذب المزيد من العملاء بدون أي جهد يدوي. مع Ovivo يتم الرد على جميع الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة. وفّر وقتك وركّز على تطوير عملك.';

const NEW_ARABIC_HERO_SUB =
  'مع Ovivo يتم الرد على الاستفسارات وتأكيد الحجوزات تلقائياً على مدار الساعة، حتى عندما يكون فريقك مشغولاً. وفّر وقتك وركّز على تطوير عملك بينما يعمل النظام في الخلفية.';

export function BrandPolish() {
  useEffect(() => {
    if (!window.location.pathname.startsWith('/ar')) return;

    document.querySelectorAll('p').forEach((node) => {
      if (node.textContent?.trim() === OLD_ARABIC_HERO_SUB) {
        node.textContent = NEW_ARABIC_HERO_SUB;
      }
    });
  }, []);

  return (
    <style jsx global>{`
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
        left: 50%;
        top: 50%;
        width: 26px;
        height: 24px;
        border-radius: 9px;
        background: linear-gradient(145deg, #f8fbff, #9fd3ff);
        border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: inset 0 -5px 8px rgba(37, 99, 235, 0.26), 0 8px 18px rgba(59, 130, 246, 0.34);
        transform: translate(-50%, -45%);
      }

      nav a.group > div.relative.flex.h-10.w-10::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 5px;
        height: 5px;
        border-radius: 999px;
        background: #1d4ed8;
        box-shadow: 9px 0 0 #1d4ed8, 4px 8px 0 -1px #1d4ed8, 4px -18px 0 #22c55e;
        transform: translate(-7px, -5px);
      }
    `}</style>
  );
}
