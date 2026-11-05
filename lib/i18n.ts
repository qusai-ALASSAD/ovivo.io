export type Lang = 'de' | 'en' | 'ar';

export const content = {
  de: {
    meta: {
      title: 'ovivo.io – KI-Automation für Unternehmen',
      description: 'ovivo.io automatisiert Kundenanfragen und Prozesse mit KI, ergänzt durch Webdesign und digitales Marketing.',
    },
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      pricing: 'Preise',
      about: 'Über uns',
      consultation: 'Kostenlose Beratung',
      servicesOverview: 'Alle Leistungen',
      cta: 'Kostenlose Beratung',
      ctaSecondary: 'Pakete ansehen',
      langSwitch: 'EN',
      langSwitchHref: '/en',
      langSwitch2: 'AR',
      langSwitch2Href: '/ar',
    },
    hero: {
      badge: 'KI-Automation für Unternehmen',
      headline1: 'Weniger Routine.',
      headline2: 'Mehr Wachstum. Mit KI.',
      sub: 'OVIVO.IO automatisiert wiederkehrende Geschäftsprozesse, Kundenanfragen und Terminbuchungen. Intelligente KI-Lösungen, ergänzt durch Webdesign und digitales Marketing.',
      cta: 'Kostenlose Analyse anfragen',
      ctaSecondary: 'Wie es funktioniert',
      trust: ['Individuelle Automatisierung', 'Integration bestehender Tools', 'Persönliche Beratung'],
    },
    offer: {
      badge: 'Das Ovivo-Versprechen',
      title: 'Weniger manuelle Arbeit —',
      titleGradient: 'mehr Zeit für Ihr Kerngeschäft.',
      sub: 'Wir bauen kein Standardprodukt. Wir analysieren Ihren Betrieb, finden genau die Stellen, an denen Sie täglich Umsatz verlieren — und schließen diese Lücken vollautomatisch.',
      items: [
        { stat: 'KI', label: 'Automatisierte Antworten auf häufige Anfragen' },
        { stat: 'CRM', label: 'Kundendaten besser organisieren' },
        { stat: '24/7', label: 'Automatisierte Prozesse rund um die Uhr' },
        { stat: 'API', label: 'Ihre vorhandenen Systeme verbinden' },
      ],
    },
    problems: {
      badge: 'Das kennen Sie',
      title: 'Warum Ihnen täglich',
      titleGradient: 'Umsatz entgeht',
      subtitle: 'Diese vier Probleme kosten Restaurants und Servicebetriebe täglich echtes Geld — und alle vier lassen sich vollständig automatisieren.',
      items: [
        {
          title: 'Anfragen, die zu spät ankommen',
          desc: 'Ein Kunde schreibt auf WhatsApp um 21 Uhr. Am nächsten Morgen hat er bereits woanders gebucht. Jede unbeantwortete Nachricht ist verlorener Umsatz.',
        },
        {
          title: 'Manuelle Buchungen fressen Zeit',
          desc: 'Reservierungen per Hand eintragen, Bestätigungen einzeln verschicken, Erinnerungen schreiben — das kostet täglich 2–3 Stunden, die Sie anders brauchen.',
        },
        {
          title: 'Interessenten fallen durchs Raster',
          desc: 'Wer heute nicht antwortet, verliert den Auftrag. Ohne System gehen Kontakte verloren, bevor sie Kunden werden. Das passiert täglich — unbemerkt.',
        },
        {
          title: 'Null Präsenz außerhalb der Öffnungszeiten',
          desc: 'Kunden suchen abends und am Wochenende. Wenn dann niemand erreichbar ist, buchen sie woanders. 24/7-Verfügbarkeit ohne Extra-Personal ist möglich.',
        },
      ],
    },
    solutions: {
      badge: 'Was wir für Sie aufbauen',
      title: 'Ihr Betrieb.',
      titleGradient: 'Vollautomatisch am Laufen.',
      subtitle: 'Keine Features-Liste — nur Ergebnisse. Sechs Systeme, die Ihren Betrieb produktiver, profitabler und unabhängiger von manuellem Aufwand machen.',
      items: [
        {
          label: 'Kunden werden sofort bedient',
          desc: 'Ihr KI-Assistent antwortet auf jede Anfrage — professionell, auf Deutsch, 24 Stunden am Tag. Keine Wartezeiten. Keine verpassten Kunden.',
          result: 'Ziel: Anfragen schneller beantworten',
        },
        {
          label: 'WhatsApp arbeitet für Sie',
          desc: 'Buchungsbestätigungen, Erinnerungen und Angebote laufen vollautomatisch über WhatsApp — dem Kanal, den Ihre Kunden ohnehin täglich nutzen.',
          result: 'Ziel: Wiederkehrende Nachrichten automatisieren',
        },
        {
          label: 'Kein Interessent geht verloren',
          desc: 'Jeder Kontakt wird automatisch erfasst, qualifiziert und weiterbearbeitet — auch wenn Sie gerade nicht da sind. Kein Lead fällt mehr durchs Raster.',
          result: 'Ziel: Leads strukturiert erfassen',
        },
        {
          label: 'Reservierungen laufen von selbst',
          desc: 'Tische, Termine, Events — alles wird automatisch gebucht, bestätigt und erinnert. Ohne Telefon. Ohne E-Mail-Pingpong. Einfach automatisch.',
          result: 'Ziel: Termin- und Buchungsverwaltung vereinfachen',
        },
        {
          label: 'Einmalkunde wird Stammkunde',
          desc: 'Follow-up-Nachrichten, Bewertungsanfragen, Treueangebote — alles läuft automatisch nach dem Besuch. So bleiben Kunden und empfehlen Sie weiter.',
          result: 'Ziel: Kundenkommunikation effizienter gestalten',
        },
        {
          label: 'Alle Kundendaten an einem Ort',
          desc: 'CRM, Buchungshistorie, Kommunikation — zentral gespeichert, immer aktuell. So kennen Sie Ihre Kunden und können besser entscheiden.',
          result: 'Ziel: Kundendaten übersichtlich bereitstellen',
        },
      ],
    },
    howItWorks: {
      badge: 'Der Prozess',
      title: 'Von der Anfrage',
      titleGradient: 'zum zahlenden Stammkunden',
      subtitle: 'Unser System begleitet jeden Kontakt — von der ersten Nachricht bis zur Bewertung nach dem Besuch.',
      steps: [
        { title: 'Kontakt kommt rein', desc: 'Ein Interessent schreibt auf WhatsApp oder Ihrer Website — egal ob 9 Uhr morgens oder 23 Uhr nachts.' },
        { title: 'KI reagiert sofort', desc: 'Der Assistent antwortet in Sekunden: beantwortet Fragen, empfiehlt Leistungen, nimmt die Buchung an.' },
        { title: 'Alles wird gespeichert', desc: 'Kontaktdaten, Buchung, Wünsche — strukturiert im CRM. Ihr Team sieht alles auf einen Blick.' },
        { title: 'Nachverfolgung läuft automatisch', desc: 'Bestätigungen, Erinnerungen, Follow-ups — alles geht raus ohne einen einzigen manuellen Schritt.' },
      ],
    },
    cta: {
      title: 'Lassen Sie uns zeigen, was in Ihrem Betrieb möglich ist.',
      sub: '30 Minuten. Kostenlos. Wir analysieren Ihren Betrieb und zeigen Ihnen genau, welches Potenzial Sie aktuell verschenken.',
      btn: 'Jetzt kostenlos beraten lassen',
      btnSecondary: 'Pakete ansehen',
      note: 'Keine Verpflichtung. Antwort innerhalb von 24 Stunden.',
    },
    footer: {
      desc: 'KI-Automation für Gastronomie & Servicebetriebe. Mehr Buchungen, mehr Umsatz, weniger Aufwand — vollautomatisch.',
      solutions: 'Lösungen',
      industries: 'Branchen',
      company: 'Unternehmen',
      copyright: 'Alle Rechte vorbehalten.',
    },
  },
  en: {
    meta: {
      title: 'ovivo.io – AI Automation for Businesses',
      description: 'ovivo.io helps businesses automate workflows and customer inquiries with AI, supported by web design and digital marketing.',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      consultation: 'Free Consultation',
      servicesOverview: 'All Services',
      cta: 'Free Consultation',
      ctaSecondary: 'View Packages',
      langSwitch: 'DE',
      langSwitchHref: '/',
      langSwitch2: 'AR',
      langSwitch2Href: '/ar',
    },
    hero: {
      badge: 'AI Automation for Businesses',
      headline1: 'Less busywork.',
      headline2: 'More growth. Powered by AI.',
      sub: 'OVIVO.IO automates repetitive processes, customer questions and bookings through AI, supported by web design and digital marketing.',
      cta: 'Get Your Free Growth Analysis',
      ctaSecondary: 'See How It Works',
      trust: ['Tailored automation', 'Connect existing systems', 'Personal consultation'],
    },
    offer: {
      badge: 'Your automation opportunity',
      title: 'Less manual work —',
      titleGradient: 'more time for your business.',
      sub: 'We analyze your processes and build AI-supported workflows that fit your business.',
      items: [
        { stat: 'AI', label: 'Automated customer responses' },
        { stat: 'CRM', label: 'Organized customer data' },
        { stat: '24/7', label: 'Automated workflows' },
        { stat: 'API', label: 'Connect your tools' },
      ],
    },
    problems: {
      badge: 'Sound familiar?',
      title: 'Why revenue keeps',
      titleGradient: 'slipping through your hands',
      subtitle: 'These four problems cost restaurants and service businesses real money every day — and all four can be completely automated.',
      items: [
        {
          title: 'Inquiries that arrive too late',
          desc: 'A customer messages you on WhatsApp at 9pm. By morning, they already booked somewhere else. Every unanswered message is revenue walking out the door.',
        },
        {
          title: 'Manual bookings eat your time',
          desc: 'Logging reservations by hand, sending confirmations one by one, writing reminders — that costs 2–3 hours daily that you could spend growing your business.',
        },
        {
          title: 'Prospects falling through the cracks',
          desc: "If you don't follow up today, you lose the job. Without a system, contacts disappear before they become customers. This happens every day — silently.",
        },
        {
          title: 'Invisible outside business hours',
          desc: 'Customers search in the evenings and on weekends. If nobody answers, they book elsewhere. 24/7 availability without extra staff is now possible.',
        },
      ],
    },
    solutions: {
      badge: 'What we build for you',
      title: 'Your business.',
      titleGradient: 'Running on autopilot.',
      subtitle: "Not a features list — just results. Six systems that make your business more productive, more profitable, and less dependent on manual effort.",
      items: [
        {
          label: 'Customers get served instantly',
          desc: 'Your AI assistant responds to every inquiry — professional, on-brand, 24 hours a day. No wait times. No missed customers.',
          result: 'Goal: reduce repetitive manual work',
        },
        {
          label: 'WhatsApp works for you',
          desc: 'Booking confirmations, reminders, and offers run fully automatically over WhatsApp — the channel your customers already use every day.',
          result: 'Goal: reduce repetitive manual work',
        },
        {
          label: 'No prospect ever slips through',
          desc: "Every contact is automatically captured, qualified, and followed up — even when you're not there. No lead falls through the cracks again.",
          result: 'Goal: reduce repetitive manual work',
        },
        {
          label: 'Bookings run themselves',
          desc: 'Tables, appointments, events — everything is automatically booked, confirmed, and reminded. No phone tag. No email back-and-forth.',
          result: 'Goal: reduce repetitive manual work',
        },
        {
          label: 'First-timers become regulars',
          desc: 'Follow-up messages, review requests, loyalty offers — all automated after every visit. So customers come back and recommend you.',
          result: 'Goal: reduce repetitive manual work',
        },
        {
          label: 'All customer data in one place',
          desc: 'CRM, booking history, communication — centrally stored, always current. Know your customers and make better decisions.',
          result: 'Goal: reduce repetitive manual work',
        },
      ],
    },
    howItWorks: {
      badge: 'The Process',
      title: 'From first contact',
      titleGradient: 'to loyal paying customer',
      subtitle: 'Our system handles every step — from the first message to the follow-up after the visit.',
      steps: [
        { title: 'Contact comes in', desc: 'A prospect reaches out on WhatsApp or your website — whether it\'s 9am or 11pm.' },
        { title: 'AI responds instantly', desc: 'The assistant replies in seconds: answers questions, recommends services, takes the booking.' },
        { title: 'Everything is saved', desc: 'Contact details, booking, preferences — structured in your CRM. Your team sees everything at a glance.' },
        { title: 'Follow-up runs automatically', desc: 'Confirmations, reminders, follow-ups — all sent without a single manual step from you.' },
      ],
    },
    cta: {
      title: "Let us show you what's possible in your business.",
      sub: '30 minutes. Free. We analyze your setup and show you exactly what revenue you\'re currently leaving on the table.',
      btn: 'Book Free Consultation',
      btnSecondary: 'View packages',
      note: 'No obligation. Response within 24 hours.',
    },
    footer: {
      desc: 'AI automation for restaurants & service businesses. More bookings, more revenue, less effort — fully automated.',
      solutions: 'Solutions',
      industries: 'Industries',
      company: 'Company',
      copyright: 'All rights reserved.',
    },
  },
  ar: {
    meta: {
      title: 'ovivo.io – أتمتة الذكاء الاصطناعي للشركات',
      description: 'ovivo.io تقدم أتمتة للعمليات ومساعدين أذكياء وربط CRM للشركات، بالإضافة إلى تصميم المواقع والتسويق الرقمي.',
    },
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      pricing: 'الأسعار',
      about: 'من نحن',
      consultation: 'استشارة مجانية',
      servicesOverview: 'جميع الخدمات',
      cta: 'استشارة مجانية',
      ctaSecondary: 'عرض الباقات',
      langSwitch: 'DE',
      langSwitchHref: '/',
      langSwitch2: 'EN',
      langSwitch2Href: '/en',
    },
    hero: {
      badge: 'أتمتة ذكية للشركات',
      headline1: 'عمل متكرر أقل.',
      headline2: 'نمو أكبر مع الذكاء الاصطناعي.',
      sub: 'نساعد الشركات على أتمتة استفسارات العملاء وحجوزات المواعيد وسير العمل، مع خدمات تصميم المواقع والتسويق الرقمي المكمّلة.',
      cta: 'احصل على تحليل نمو مجاني',
      ctaSecondary: 'شاهد كيف يعمل',
      trust: ['حلول مخصصة', 'ربط أنظمتك الحالية', 'استشارة شخصية'],
    },
    offer: {
      badge: 'حلول أتمتة مخصصة',
      title: 'عمليات يدوية أقل',
      titleGradient: 'ووقت أكثر لنمو شركتك',
      sub: 'نحلل العمليات المتكررة في شركتك ونبني حلول أتمتة عملية تناسب احتياجاتك وأنظمتك الحالية، بدون وعود بأرقام غير مثبتة.',
      items: [
        { stat: 'AI', label: 'ردود ذكية على الاستفسارات' },
        { stat: 'CRM', label: 'تنظيم بيانات العملاء' },
        { stat: '24/7', label: 'أتمتة على مدار الساعة' },
        { stat: 'API', label: 'ربط أنظمتك الحالية' },
      ],
    },
    problems: {
      badge: 'هل هذا يحدث معك؟',
      title: 'لماذا يخسر عملك',
      titleGradient: 'عملاء كل يوم',
      subtitle: 'هذه المشاكل تكلف المطاعم وشركات الخدمات أموالاً حقيقية كل يوم. وكلها قابلة للأتمتة الكاملة.',
      items: [
        {
          title: 'استفسارات تصل بعد فوات الأوان',
          desc: 'عميل يرسل على واتساب الساعة التاسعة مساءً. بحلول الصباح حجز عند منافسك. كل رسالة بلا رد هي إيراد ضائع.',
        },
        {
          title: 'الحجوزات اليدوية تسرق وقتك',
          desc: 'تسجيل الحجوزات يدوياً، إرسال التأكيدات واحداً واحداً، كتابة التذكيرات — 2-3 ساعات يومياً كان يمكن استثمارها في تنمية عملك.',
        },
        {
          title: 'عملاء محتملون يتسربون بصمت',
          desc: 'إذا لم تتابع اليوم، خسرت الصفقة. بدون نظام، تختفي جهات الاتصال قبل أن تصبح عملاء. هذا يحدث كل يوم — دون أن تشعر.',
        },
        {
          title: 'غائب تماماً خارج أوقات الدوام',
          desc: 'عملاؤك يبحثون مساءً وفي عطل الأسبوع. إذا لم يجدوا رداً، حجزوا في مكان آخر. التواجد 24/7 بدون موظفين إضافيين أصبح ممكناً.',
        },
      ],
    },
    solutions: {
      badge: 'ما نبنيه لك',
      title: 'عملك.',
      titleGradient: 'يعمل بشكل تلقائي كامل.',
      subtitle: 'لا قائمة مميزات — فقط نتائج. ستة أنظمة تجعل عملك أكثر إنتاجية وربحية وأقل اعتماداً على الجهد اليدوي.',
      items: [
        {
          label: 'كل عميل يُخدَّم فوراً',
          desc: 'مساعدك الذكي يرد على كل استفسار — باحترافية عالية، بلغة عملائك، 24 ساعة يومياً. لا انتظار. لا عميل يُفوَّت.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
        {
          label: 'واتساب يشتغل عنك',
          desc: 'تأكيدات الحجز والتذكيرات والعروض ترسل تلقائياً عبر واتساب — القناة التي يستخدمها عملاؤك يومياً أصلاً.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
        {
          label: 'لا عميل محتمل يضيع',
          desc: 'كل جهة اتصال تُلتقط تلقائياً وتُؤهَّل وتُتابَع — حتى لو كنت غائباً. لا فرصة تسقط من بين يديك.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
        {
          label: 'الحجوزات تسير من تلقاء نفسها',
          desc: 'طاولات، مواعيد، فعاليات — كل شيء يُحجز ويُؤكَّد ويُذكَّر تلقائياً. بدون هاتف. بدون رسائل ذهاباً وإياباً.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
        {
          label: 'الزيارة الأولى تصبح علاقة دائمة',
          desc: 'رسائل متابعة وطلبات تقييم وعروض ولاء — كلها تعمل تلقائياً بعد كل زيارة. عملاؤك يعودون ويوصون بك.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
        {
          label: 'كل بيانات عملائك في مكان واحد',
          desc: 'إدارة العملاء وسجل الحجوزات والتواصل — محفوظة مركزياً، محدّثة دائماً. اعرف عملاءك واتخذ قرارات أذكى.',
          result: 'الهدف: تبسيط العمليات المتكررة',
        },
      ],
    },
    howItWorks: {
      badge: 'كيف يعمل النظام',
      title: 'من أول رسالة',
      titleGradient: 'إلى عميل راضٍ يعود دائماً',
      subtitle: 'نظامنا يرافق كل عميل من اللحظة الأولى حتى المتابعة بعد الزيارة.',
      steps: [
        { title: 'يتواصل العميل معك', desc: 'يكتب على واتساب أو موقعك — سواء الساعة 9 صباحاً أو 11 مساءً.' },
        { title: 'الذكاء الاصطناعي يرد فوراً', desc: 'المساعد يجيب في ثوانٍ: يرد على الأسئلة، يوصي بالخدمات، يقبل الحجز.' },
        { title: 'كل شيء يُحفظ تلقائياً', desc: 'بيانات التواصل والحجز والتفضيلات — منظمة في نظام إدارة العملاء. فريقك يرى كل شيء دفعة واحدة.' },
        { title: 'المتابعة تعمل وحدها', desc: 'تأكيدات، تذكيرات، متابعة ما بعد الزيارة — كلها ترسل دون أي خطوة يدوية منك.' },
      ],
    },
    cta: {
      title: 'دعنا نريك ما يمكن تحقيقه في عملك.',
      sub: '30 دقيقة. مجاناً. نحلل وضعك الحالي ونريك بالضبط أين تضيع إيراداتك وكيف نوقف ذلك.',
      btn: 'احجز استشارة مجانية',
      btnSecondary: 'عرض الباقات',
      note: 'مجاناً. بدون التزام. رد خلال 24 ساعة.',
    },
    footer: {
      desc: 'ذكاء اصطناعي للمطاعم وشركات الخدمات. مزيد من الحجوزات، إيرادات أعلى، جهد أقل — بشكل تلقائي كامل.',
      solutions: 'الحلول',
      industries: 'القطاعات',
      company: 'الشركة',
      copyright: 'جميع الحقوق محفوظة.',
    },
  },
} as const;

export function getLang(locale?: string): Lang {
  if (locale === 'en') return 'en';
  if (locale === 'ar') return 'ar';
  return 'de';
}

export function isRTL(lang: Lang): boolean {
  return lang === 'ar';
}
