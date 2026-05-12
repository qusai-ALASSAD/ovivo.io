'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle, Clock, TrendingUp, MessageCircle, Calendar, Users } from 'lucide-react';

const ServicesPage = () => {
  const pathname = usePathname();
  const lang = pathname?.startsWith('/ar') ? 'ar' : pathname?.startsWith('/en') ? 'en' : 'de';
  const isRTL = lang === 'ar';

  const content = {
    de: {
      hero: {
        badge: "KI-Automation für Ihren Betrieb",
        title: "Automation für jede Branche",
        subtitle: "Maßgeschneiderte KI-Automation für Restaurants, Cafés und Serviceunternehmen — genau auf Ihre Branche zugeschnitten."
      },
      restaurants: {
        title: "KI-Automation für Restaurants",
        subtitle: "Mehr Reservierungen. Weniger Aufwand. Glücklichere Gäste.",
        description: "Restaurants kämpfen täglich mit vollen Telefonleitungen, verpassten Reservierungsanfragen und zeitaufwendiger Kundenkommunikation. Unsere KI-Systeme übernehmen diese Aufgaben — automatisch, zuverlässig, rund um die Uhr.",
        stats: [
          "90% der Reservierungen automatisch bestätigt",
          "2 Stunden täglich gespart",
          "+35% mehr Online-Bewertungen"
        ],
        cta: "Kostenlose Beratung für Restaurants",
        features: [
          {
            title: "Tischreservierungen",
            description: "Automatische Reservierungsbestätigung rund um die Uhr — auch wenn das Restaurant geschlossen ist."
          },
          {
            title: "WhatsApp-Automatisierung",
            description: "Gäste erhalten sofortige Antworten auf WhatsApp: Öffnungszeiten, Menü, Verfügbarkeit."
          },
          {
            title: "Event-Promotion",
            description: "Automatische Promotion von Specials, Events und saisonalen Angeboten an Stammgäste."
          },
          {
            title: "Kundenkommunikation",
            description: "KI-Assistent beantwortet alle Anfragen professionell auf Deutsch — 24/7."
          },
          {
            title: "Follow-up & Bewertungen",
            description: "Automatische Nachfass-E-Mails und Bewertungsanfragen nach jedem Besuch."
          },
          {
            title: "Stammkundenpflege",
            description: "CRM mit automatischer Kundenpflege, Geburtstagsgrüßen und personalisierten Angeboten."
          }
        ]
      },
      cafes: {
        title: "KI-Automation für Cafés",
        subtitle: "Mehr Stammgäste. Mehr Bestellungen. Weniger Stress.",
        description: "Cafés leben von Stammgästen und reibungslosen Abläufen. Unsere KI-Systeme helfen Ihnen, Kundenfragen sofort zu beantworten, Bestellungen zu automatisieren und Ihre Gäste noch besser zu betreuen.",
        stats: [
          "85% Fragen ohne manuellen Aufwand beantwortet",
          "Kundenbindung um 40% verbessert",
          "Vorbestellungen automatisch bestätigt"
        ],
        cta: "Kostenlose Beratung für Cafés",
        features: [
          {
            title: "Menü-Fragen beantworten",
            description: "KI-Assistent beantwortet alle Fragen zu Speisen, Allergenen und Paketen sofort."
          },
          {
            title: "Bestellungen automatisieren",
            description: "Vorbestellungen und Click & Collect automatisch verwalten und bestätigen."
          },
          {
            title: "Kundenbindung",
            description: "Automatische Treueprogramme, personalisierte Angebote und Erinnerungen für Stammgäste."
          },
          {
            title: "Tages-Specials promoten",
            description: "Automatische WhatsApp-Nachrichten für Tagesangebote und saisonale Spezialitäten."
          },
          {
            title: "Newsletter & Follow-ups",
            description: "Automatisierte E-Mail-Kampagnen für Events, neue Produkte und Angebote."
          },
          {
            title: "Veranstaltungen",
            description: "Buchungen für Workshops, Kaffeekurse und private Events automatisch verwalten."
          }
        ]
      },
      service: {
        title: "KI-Automation für Serviceunternehmen",
        subtitle: "Mehr Anfragen. Mehr Kunden. Mehr Umsatz.",
        description: "Ob Friseur, Fitnessstudio, Arztpraxis oder Handwerksbetrieb — jedes Serviceunternehmen verliert täglich wertvolle Anfragen. Unsere KI-Systeme erfassen jede Anfrage, antworten sofort und buchen Termine automatisch.",
        stats: [
          "Keine verpassten Anfragen mehr",
          "60% schnellere Reaktionszeiten",
          "+45% mehr Buchungen"
        ],
        cta: "Kostenlose Beratung für Servicebetriebe",
        features: [
          {
            title: "Lead-Generierung",
            description: "KI erfasst und qualifiziert automatisch alle Interessenten — rund um die Uhr."
          },
          {
            title: "Terminbuchung",
            description: "Automatische Online-Terminbuchung mit Bestätigung, Erinnerung und Follow-up."
          },
          {
            title: "WhatsApp-Support",
            description: "Sofortige Antworten auf alle Anfragen via WhatsApp — ohne Personal."
          },
          {
            title: "CRM-Integration",
            description: "Alle Kundendaten automatisch in Ihrem CRM gespeichert und gepflegt."
          },
          {
            title: "Automatische Follow-ups",
            description: "Regelmäßige Nachfass-Nachrichten und Angebote an bestehende Kunden."
          },
          {
            title: "Kundenpflege",
            description: "Automatische Geburtstagsnachrichten, Erinnerungen und personalisierte Kommunikation."
          }
        ]
      },
      cta: {
        title: "Welche Lösung passt zu Ihnen?",
        description: "Buchen Sie eine kostenlose Beratung — wir analysieren Ihren Betrieb und empfehlen die optimale Automation.",
        button: "Kostenlose Beratung buchen"
      }
    },
    ar: {
      hero: {
        badge: "أتمتة ذكية لعملك",
        title: "أتمتة لكل قطاع",
        subtitle: "أتمتة ذكية مخصصة للمطاعم والمقاهي والخدمات — مصممة خصيصاً لمجالك."
      },
      restaurants: {
        title: "أتمتة ذكية للمطاعم",
        subtitle: "المزيد من الحجوزات. أقل جهد. عملاء أسعد.",
        description: "المطاعم تواجه يومياً خطوط هاتف ممتلئة، طلبات حجز ضائعة، وتواصل مع العملاء يستغرق وقتاً طويلاً. أنظمتنا الذكية تتولى هذه المهام — تلقائياً، بموثوقية، على مدار الساعة.",
        stats: [
          "90% من الحجوزات تُؤكد تلقائياً",
          "توفير ساعتين يومياً",
          "+35% المزيد من التقييمات"
        ],
        cta: "استشارة مجانية للمطاعم",
        features: [
          { title: "حجز الطاولات", description: "تأكيد الحجوزات تلقائياً على مدار الساعة." },
          { title: "أتمتة واتساب", description: "إجابات فورية على واتساب: ساعات العمل، القائمة، التوفر." },
          { title: "الترويج للفعاليات", description: "ترويج تلقائي للعروض والفعاليات." },
          { title: "التواصل مع العملاء", description: "مساعد ذكي يجيب على الاستفسارات — 7/24." },
          { title: "المتابعة والتقييمات", description: "إيميلات متابعة وطلبات تقييم تلقائية." },
          { title: "رعاية العملاء", description: "CRM مع رعاية تلقائية وعروض مخصصة." }
        ]
      },
      cafes: {
        title: "أتمتة ذكية للمقاهي",
        subtitle: "المزيد من العملاء. المزيد من الطلبات. أقل ضغط.",
        description: "المقاهي تعتمد على العملاء الدائمين. أنظمتنا تساعدك على الإجابة فوراً وأتمتة الطلبات.",
        stats: ["85% من الأسئلة تُجاب تلقائياً", "تحسين الولاء 40%", "تأكيد طلبات مسبقة"],
        cta: "استشارة مجانية للمقاهي",
        features: [
          { title: "الإجابة على أسئلة القائمة", description: "مساعد ذكي يجيب عن الأطباق والحساسية." },
          { title: "أتمتة الطلبات", description: "إدارة الطلبات المسبقة تلقائياً." },
          { title: "ولاء العملاء", description: "برامج ولاء وعروض مخصصة." },
          { title: "ترويج العروض اليومية", description: "رسائل واتساب للعروض الموسمية." },
          { title: "نشرات إخبارية", description: "حملات إيميل للفعاليات والمنتجات." },
          { title: "الفعاليات", description: "حجز ورش العمل والفعاليات تلقائياً." }
        ]
      },
      service: {
        title: "أتمتة ذكية لشركات الخدمات",
        subtitle: "المزيد من الاستفسارات. المزيد من العملاء.",
        description: "كل شركة خدمات تفقد يومياً استفسارات قيّمة. أنظمتنا تلتقط كل استفسار وتجيب فوراً.",
        stats: ["لا استفسارات ضائعة", "استجابة أسرع 60%", "+45% حجوزات"],
        cta: "استشارة مجانية",
        features: [
          { title: "جذب العملاء", description: "التقاط وتأهيل المهتمين تلقائياً." },
          { title: "حجز المواعيد", description: "حجز تلقائي مع تأكيد وتذكير." },
          { title: "دعم واتساب", description: "إجابات فورية بدون موظفين." },
          { title: "تكامل CRM", description: "حفظ بيانات العملاء تلقائياً." },
          { title: "متابعات تلقائية", description: "رسائل وعروض منتظمة." },
          { title: "رعاية العملاء", description: "تهاني أعياد ميلاد وتواصل مخصص." }
        ]
      },
      cta: {
        title: "أي حل يناسبك؟",
        description: "احجز استشارة مجانية — سنحلل عملك ونوصي بالحل الأمثل.",
        button: "احجز استشارة مجانية"
      }
    },
    en: {
      hero: {
        badge: "AI Automation for Your Business",
        title: "Automation for Every Industry",
        subtitle: "Tailored AI automation for restaurants, cafes, and service businesses."
      },
      restaurants: {
        title: "AI Automation for Restaurants",
        subtitle: "More reservations. Less effort. Happier guests.",
        description: "Restaurants face full phone lines, missed reservations, and time-consuming communication. Our AI systems handle these automatically, 24/7.",
        stats: ["90% reservations confirmed automatically", "2 hours saved daily", "+35% more reviews"],
        cta: "Free Consultation for Restaurants",
        features: [
          { title: "Table Reservations", description: "Automatic confirmation 24/7." },
          { title: "WhatsApp Automation", description: "Instant answers on WhatsApp." },
          { title: "Event Promotion", description: "Automatic promotion of specials." },
          { title: "Customer Communication", description: "AI assistant answers professionally." },
          { title: "Follow-up & Reviews", description: "Automatic review requests." },
          { title: "Loyalty Management", description: "CRM with automatic customer care." }
        ]
      },
      cafes: {
        title: "AI Automation for Cafés",
        subtitle: "More regulars. More orders. Less stress.",
        description: "Cafés thrive on regulars. Our AI helps answer questions and automate orders.",
        stats: ["85% questions answered automatically", "40% loyalty improvement", "Pre-orders confirmed"],
        cta: "Free Consultation for Cafés",
        features: [
          { title: "Menu Questions", description: "AI answers about dishes and allergens." },
          { title: "Order Automation", description: "Manage pre-orders automatically." },
          { title: "Customer Loyalty", description: "Loyalty programs and offers." },
          { title: "Daily Specials", description: "WhatsApp messages for offers." },
          { title: "Newsletters", description: "Email campaigns for events." },
          { title: "Events", description: "Automatic workshop bookings." }
        ]
      },
      service: {
        title: "AI Automation for Service Businesses",
        subtitle: "More inquiries. More customers.",
        description: "Service companies lose valuable inquiries daily. Our AI captures and responds instantly.",
        stats: ["No missed inquiries", "60% faster responses", "+45% more bookings"],
        cta: "Free Consultation",
        features: [
          { title: "Lead Generation", description: "Capture leads automatically." },
          { title: "Appointment Booking", description: "Auto-booking with reminders." },
          { title: "WhatsApp Support", description: "Instant answers without staff." },
          { title: "CRM Integration", description: "Save customer data automatically." },
          { title: "Auto Follow-ups", description: "Regular messages and offers." },
          { title: "Customer Care", description: "Birthday wishes and personalized communication." }
        ]
      },
      cta: {
        title: "Which Solution Fits You?",
        description: "Book a free consultation — we'll analyze your business and recommend the optimal automation.",
        button: "Book Free Consultation"
      }
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-blue-400 text-sm">{t.hero.badge}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">{t.hero.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t.restaurants.title}</h2>
            <p className="text-2xl text-blue-400 mb-4">{t.restaurants.subtitle}</p>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.restaurants.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.restaurants.stats.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-lg">{stat}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <Link href="/consultation">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700">
                {t.restaurants.cta}
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.restaurants.features.map((f, i) => (
              <div key={i} className="glass p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-300">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafes */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t.cafes.title}</h2>
            <p className="text-2xl text-blue-400 mb-4">{t.cafes.subtitle}</p>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.cafes.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.cafes.stats.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-lg">{stat}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <Link href="/consultation">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold">
                {t.cafes.cta}
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.cafes.features.map((f, i) => (
              <div key={i} className="glass p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-300">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t.service.title}</h2>
            <p className="text-2xl text-blue-400 mb-4">{t.service.subtitle}</p>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.service.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.service.stats.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-lg">{stat}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <Link href="/consultation">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold">
                {t.service.cta}
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.service.features.map((f, i) => (
              <div key={i} className="glass p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-300">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-gray-300 mb-8">{t.cta.description}</p>
          <Link href="/consultation">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-lg font-semibold text-lg">
              {t.cta.button}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
