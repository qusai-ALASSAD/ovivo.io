export type Lang = 'de' | 'en' | 'ar';

export const content = {
  de: {
    meta: {
      title: 'Ovivo – KI-Automatisierung, die Ihren Betrieb transformiert',
      description: 'Ovivo automatisiert Ihre Kundenkommunikation, Reservierungen und Marketing mit modernster KI — damit Sie mehr verdienen und weniger arbeiten.',
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
      badge: 'KI-Automation für Gastronomie & Servicebetriebe',
      headline1: 'Ihr Betrieb füllt sich —',
      headline2: 'ohne dass Sie einen Finger rühren.',
      sub: 'Ovivo antwortet auf Kundenanfragen, bestätigt Reservierungen und holt Stammkunden zurück — vollautomatisch, 24/7. Sie konzentrieren sich aufs Wesentliche. Den Rest erledigt KI.',
      cta: 'Kostenlose Analyse anfragen',
      ctaSecondary: 'Wie es funktioniert',
      trust: ['Einrichtung in 5–14 Tagen', 'Ergebnisse in 30 Tagen garantiert', 'Kein IT-Wissen nötig'],
    },
    offer: {
      badge: 'Das Ovivo-Versprechen',
      title: '+35% mehr Buchungen in 30 Tagen —',
      titleGradient: 'garantiert. Oder wir arbeiten kostenlos weiter.',
      sub: 'Wir bauen kein Standardprodukt. Wir analysieren Ihren Betrieb, finden genau die Stellen, an denen Sie täglich Umsatz verlieren — und schließen diese Lücken vollautomatisch.',
      items: [
        { stat: '94%', label: 'Anfragen automatisch beantwortet — sofort, 24/7' },
        { stat: '-3h', label: 'Weniger manuelle Arbeit pro Tag' },
        { stat: '+35%', label: 'Mehr Buchungen — im Schnitt nach 30 Tagen' },
        { stat: '48h', label: 'Bis Ihr System live ist und arbeitet' },
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
          result: 'Ergebnis: 94% Anfragen automatisch beantwortet',
        },
        {
          label: 'WhatsApp arbeitet für Sie',
          desc: 'Buchungsbestätigungen, Erinnerungen und Angebote laufen vollautomatisch über WhatsApp — dem Kanal, den Ihre Kunden ohnehin täglich nutzen.',
          result: 'Ergebnis: 0 manuelle Nachrichten nötig',
        },
        {
          label: 'Kein Interessent geht verloren',
          desc: 'Jeder Kontakt wird automatisch erfasst, qualifiziert und weiterbearbeitet — auch wenn Sie gerade nicht da sind. Kein Lead fällt mehr durchs Raster.',
          result: 'Ergebnis: bis zu 3x mehr qualifizierte Anfragen',
        },
        {
          label: 'Reservierungen laufen von selbst',
          desc: 'Tische, Termine, Events — alles wird automatisch gebucht, bestätigt und erinnert. Ohne Telefon. Ohne E-Mail-Pingpong. Einfach automatisch.',
          result: 'Ergebnis: +40% mehr Buchungen möglich',
        },
        {
          label: 'Einmalkunde wird Stammkunde',
          desc: 'Follow-up-Nachrichten, Bewertungsanfragen, Treueangebote — alles läuft automatisch nach dem Besuch. So bleiben Kunden und empfehlen Sie weiter.',
          result: 'Ergebnis: +25% mehr Wiederkäufer',
        },
        {
          label: 'Alle Kundendaten an einem Ort',
          desc: 'CRM, Buchungshistorie, Kommunikation — zentral gespeichert, immer aktuell. So kennen Sie Ihre Kunden und können besser entscheiden.',
          result: 'Ergebnis: fundierte Entscheidungen in Echtzeit',
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
      title: 'Ovivo – AI Automation That Transforms Your Business',
      description: 'Ovivo automates your customer communication, reservations, and marketing with cutting-edge AI — so you earn more and work less.',
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
      badge: 'AI Automation for Restaurants & Service Businesses',
      headline1: 'Your business stays full —',
      headline2: 'without lifting a finger.',
      sub: 'Ovivo answers inquiries, confirms bookings, and brings customers back — fully automated, 24/7. You focus on what matters. AI handles the rest.',
      cta: 'Get Your Free Growth Analysis',
      ctaSecondary: 'See How It Works',
      trust: ['Live in 5–14 days', 'Results in 30 days — guaranteed', 'No IT knowledge required'],
    },
    offer: {
      badge: 'The Ovivo Guarantee',
      title: '+35% more bookings in 30 days —',
      titleGradient: 'guaranteed. Or we keep working for free.',
      sub: "We don't sell software. We build a revenue system custom to your business — and guarantee measurable results within 30 days or we keep optimizing at no charge.",
      items: [
        { stat: '94%', label: 'Inquiries answered automatically — instantly, 24/7' },
        { stat: '-3h', label: 'Less manual work every single day' },
        { stat: '+35%', label: 'More bookings — on average within 30 days' },
        { stat: '48h', label: 'Until your system is live and working' },
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
          result: 'Result: 94% of inquiries answered automatically',
        },
        {
          label: 'WhatsApp works for you',
          desc: 'Booking confirmations, reminders, and offers run fully automatically over WhatsApp — the channel your customers already use every day.',
          result: 'Result: 0 manual messages needed',
        },
        {
          label: 'No prospect ever slips through',
          desc: "Every contact is automatically captured, qualified, and followed up — even when you're not there. No lead falls through the cracks again.",
          result: 'Result: up to 3x more qualified inquiries',
        },
        {
          label: 'Bookings run themselves',
          desc: 'Tables, appointments, events — everything is automatically booked, confirmed, and reminded. No phone tag. No email back-and-forth.',
          result: 'Result: up to +40% more bookings',
        },
        {
          label: 'First-timers become regulars',
          desc: 'Follow-up messages, review requests, loyalty offers — all automated after every visit. So customers come back and recommend you.',
          result: 'Result: +25% more repeat customers',
        },
        {
          label: 'All customer data in one place',
          desc: 'CRM, booking history, communication — centrally stored, always current. Know your customers and make better decisions.',
          result: 'Result: real-time insights at a glance',
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
      title: 'أوفيفو – ذكاء اصطناعي يحوّل أعمالك ويرفع إيراداتك',
      description: 'أوفيفو يؤتمت تواصلك مع العملاء والحجوزات والتسويق بأحدث تقنيات الذكاء الاصطناعي — لتربح أكثر وتجهد أقل.',
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
      badge: 'أتمتة ذكية للمطاعم وشركات الخدمات',
      headline1: 'عملك يزدهر كل يوم —',
      headline2: 'بدون ما تحرك إصبعاً.',
      sub: 'أوفيفو يرد على الاستفسارات، يؤكد الحجوزات، ويعيد العملاء تلقائياً على مدار الساعة. أنت تركز على ما يهم، والذكاء الاصطناعي يتولى الباقي.',
      cta: 'احصل على تحليل نمو مجاني',
      ctaSecondary: 'شاهد كيف يعمل',
      trust: ['تشغيل خلال 5–14 يوماً', 'نتائج في 30 يوماً — مضمونة', 'لا حاجة لأي خبرة تقنية'],
    },
    offer: {
      badge: 'ضمان أوفيفو',
      title: '+35% حجوزات في 30 يوماً —',
      titleGradient: 'مضمون. أو نستمر بالعمل مجاناً.',
      sub: 'نحن لا نبيع برمجيات. نبني لك نظام إيرادات مخصص لعملك — ونضمن نتائج قابلة للقياس خلال 30 يوماً أو نواصل التحسين مجاناً.',
      items: [
        { stat: '94%', label: 'من الاستفسارات تُجاب تلقائياً، فوراً، 24/7' },
        { stat: '-3س', label: 'توفير يومي في العمل اليدوي' },
        { stat: '+35%', label: 'زيادة في الحجوزات — بالمتوسط خلال 30 يوماً' },
        { stat: '48س', label: 'حتى يعمل نظامك بشكل كامل' },
      ],
    },
    problems: {
      badge: 'هل هذا يحدث معك؟',
      title: 'لماذا يخسر عملك',
      titleGradient: 'عملاء كل يوم',
      subtitle: 'هذه المشاكل الأربع تكلّف المطاعم وشركات الخدمات أموالاً حقيقية يومياً — وكلها قابلة للأتمتة الكاملة.',
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
          result: 'النتيجة: 94% من الاستفسارات تُجاب تلقائياً',
        },
        {
          label: 'واتساب يشتغل عنك',
          desc: 'تأكيدات الحجز والتذكيرات والعروض ترسل تلقائياً عبر واتساب — القناة التي يستخدمها عملاؤك يومياً أصلاً.',
          result: 'النتيجة: صفر رسائل يدوية مطلوبة',
        },
        {
          label: 'لا عميل محتمل يضيع',
          desc: 'كل جهة اتصال تُلتقط تلقائياً وتُؤهَّل وتُتابَع — حتى لو كنت غائباً. لا فرصة تسقط من بين يديك.',
          result: 'النتيجة: حتى 3 أضعاف الاستفسارات المؤهلة',
        },
        {
          label: 'الحجوزات تسير من تلقاء نفسها',
          desc: 'طاولات، مواعيد، فعاليات — كل شيء يُحجز ويُؤكَّد ويُذكَّر تلقائياً. بدون هاتف. بدون رسائل ذهاباً وإياباً.',
          result: 'النتيجة: حتى +40% حجوزات إضافية',
        },
        {
          label: 'الزيارة الأولى تصبح علاقة دائمة',
          desc: 'رسائل متابعة وطلبات تقييم وعروض ولاء — كلها تعمل تلقائياً بعد كل زيارة. عملاؤك يعودون ويوصون بك.',
          result: 'النتيجة: +25% عملاء متكررون',
        },
        {
          label: 'كل بيانات عملائك في مكان واحد',
          desc: 'إدارة العملاء وسجل الحجوزات والتواصل — محفوظة مركزياً، محدّثة دائماً. اعرف عملاءك واتخذ قرارات أذكى.',
          result: 'النتيجة: رؤى فورية في أي وقت',
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
