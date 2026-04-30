'use client';

import { useEffect } from 'react';

const copy = {
  de: {
    badge: 'Pakete',
    title: 'Pakete nach Geschäftsart',
    sub: 'Keine festen Preise auf der Website. Wir empfehlen das passende Paket nach Betrieb, Anfragevolumen und gewünschter Automatisierung.',
    cta: 'Paket besprechen',
    note: 'Das konkrete Angebot kommt nach der kostenlosen Analyse.',
    plans: [
      {
        name: 'Restaurant-Paket',
        ideal: 'Für Restaurants, Lieferdienste und Reservierungen',
        asks: ['Tischreservierungen automatisch prüfen', 'WhatsApp- und Website-Anfragen beantworten', 'Bestellungen und Rückfragen sauber weiterleiten'],
      },
      {
        name: 'Café-Paket',
        ideal: 'Für Cafés, Bäckereien und kleine Teams',
        asks: ['Öffnungszeiten, Menü und Tagesangebote beantworten', 'Stammkunden automatisch erinnern', 'Anfragen sammeln, auch wenn niemand am Telefon ist'],
      },
      {
        name: 'Reinigungsfirma-Paket',
        ideal: 'Für Reinigungsfirmen und lokale Dienstleister',
        asks: ['Adresse, Objektgröße und Wunschtermin abfragen', 'Leads sortieren und ans Team schicken', 'Besichtigung oder Rückruf vorbereiten'],
      },
    ],
  },
  en: {
    badge: 'Packages',
    title: 'Packages by business type',
    sub: 'No fixed prices on the site. We recommend the right package after checking your business, request volume, and automation needs.',
    cta: 'Discuss package',
    note: 'Your exact proposal comes after the free analysis.',
    plans: [
      {
        name: 'Restaurant Package',
        ideal: 'For restaurants, delivery, and table bookings',
        asks: ['Check reservation requests automatically', 'Answer WhatsApp and website inquiries', 'Route orders and questions to the right place'],
      },
      {
        name: 'Café Package',
        ideal: 'For cafés, bakeries, and small teams',
        asks: ['Answer opening hours, menu, and daily specials', 'Remind regular customers automatically', 'Capture requests even when the phone is busy'],
      },
      {
        name: 'Cleaning Company Package',
        ideal: 'For cleaning companies and local services',
        asks: ['Collect address, property size, and preferred time', 'Sort leads and send them to the team', 'Prepare inspection or callback requests'],
      },
    ],
  },
  ar: {
    badge: 'الباقات',
    title: 'باقات حسب نوع العمل',
    sub: 'ما في أسعار ثابتة على الموقع. نختار الباقة المناسبة بعد ما نعرف نوع شغلك، حجم الطلبات، وشو بدك الأتمتة تعمل.',
    cta: 'احجز استشارة للباقه',
    note: 'العرض النهائي يطلع بعد تحليل مجاني وواضح لشغلك.',
    plans: [
      {
        name: 'باقة المطعم',
        ideal: 'للمطاعم، الطلبات، وحجوزات الطاولات',
        asks: ['يفحص طلبات الحجز قبل التأكيد', 'يرد على واتساب والموقع', 'يجمع الاسم، الهاتف، اليوم والساعة'],
      },
      {
        name: 'باقة الكافيه',
        ideal: 'للكافيهات، المخابز، والفرق الصغيرة',
        asks: ['يرد على المنيو، أوقات الدوام والعروض', 'يجمع طلبات الزبائن وقت الضغط', 'يرسل تذكير أو رد تلقائي للعميل'],
      },
      {
        name: 'باقة شركة تنظيف',
        ideal: 'لشركات التنظيف والخدمات المحلية',
        asks: ['يسأل عن العنوان ونوع التنظيف', 'يجمع حجم المكان والوقت المناسب', 'يرتب طلب معاينة أو اتصال من الفريق'],
      },
    ],
  },
};

function getLang() {
  if (typeof window === 'undefined') return 'de';
  const path = window.location.pathname;
  if (path.startsWith('/ar')) return 'ar';
  if (path.startsWith('/en')) return 'en';
  return 'de';
}

function renderPackages() {
  const lang = getLang() as keyof typeof copy;
  const t = copy[lang];
  const prefix = lang === 'ar' ? '/ar' : lang === 'en' ? '/en' : '';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return `
    <div class="mx-auto max-w-7xl" dir="${dir}">
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300 mb-4">${t.badge}</div>
        <h2 class="text-3xl sm:text-5xl font-bold text-white mb-4">${t.title}</h2>
        <p class="mx-auto max-w-2xl text-gray-400 leading-relaxed">${t.sub}</p>
      </div>
      <div class="grid gap-6 sm:grid-cols-3">
        ${t.plans.map((plan, index) => `
          <article class="relative rounded-2xl flex flex-col glass h-full p-8 border ${index === 1 ? 'border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.2)]' : 'border-white/10'}">
            ${index === 1 ? '<span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold w-fit mb-4 bg-blue-500 text-white border-transparent">' + (lang === 'ar' ? 'الأكثر طلباً' : lang === 'en' ? 'Most requested' : 'Am häufigsten') + '</span>' : ''}
            <h3 class="text-xl font-bold text-white mb-2">${plan.name}</h3>
            <p class="text-sm text-gray-400 mb-5 leading-relaxed">${plan.ideal}</p>
            <div class="mb-5 rounded-xl bg-white/5 border border-white/5 p-4">
              <p class="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">${lang === 'ar' ? 'ماذا يطلب؟' : lang === 'en' ? 'What it handles' : 'Was wird abgefragt?'}</p>
              <p class="text-sm font-semibold text-white">${lang === 'ar' ? 'نحدد السعر بعد فهم الطلبات الفعلية.' : lang === 'en' ? 'Pricing is defined after we understand the real workflow.' : 'Der Preis wird nach dem echten Workflow festgelegt.'}</p>
            </div>
            <ul class="space-y-3 mb-6 flex-1">
              ${plan.asks.map((item) => `<li class="flex items-start gap-2.5 text-sm text-gray-300"><span class="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0"></span><span>${item}</span></li>`).join('')}
            </ul>
            <a href="${prefix}/consultation" class="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">${t.cta}</a>
          </article>
        `).join('')}
      </div>
      <p class="mt-8 text-center text-sm text-gray-500 italic">${t.note}</p>
    </div>
  `;
}

export function PackageOverrides() {
  useEffect(() => {
    const apply = () => {
      const section = document.getElementById('pakete');
      if (!section || section.dataset.packageOverride === 'true') return;
      section.dataset.packageOverride = 'true';
      section.className = 'px-4 py-24 sm:px-6 lg:px-8';
      section.innerHTML = renderPackages();
    };

    apply();
    const timer = window.setTimeout(apply, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
