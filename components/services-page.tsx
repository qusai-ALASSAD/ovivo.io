'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, CircleCheck as CheckCircle, Utensils, Coffee, Briefcase,
  MessageSquare, Calendar, Megaphone, Users, ShoppingBag, Clock, Target, Mail, Phone, Zap
} from 'lucide-react';
import { GlassCard, RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import type { Lang } from '@/lib/i18n';
import { isRTL } from '@/lib/i18n';

const servicesData = {
  de: {
    hero: {
      badge: 'KI-Automation für Ihren Betrieb',
      title: 'Automation für jede',
      titleGradient: 'Branche',
      sub: 'Maßgeschneiderte KI-Automation für Restaurants, Cafés und Serviceunternehmen — genau auf Ihre Branche zugeschnitten.',
    },
    services: [
      {
        id: 'restaurants',
        icon: Utensils,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        title: 'AI Automation für Restaurants',
        sub: 'Mehr Reservierungen. Weniger Aufwand. Glücklichere Gäste.',
        desc: 'Restaurants kämpfen täglich mit vollen Telefonleitungen, verpassten Reservierungsanfragen und zeitaufwändiger manueller Verwaltung. Unsere KI-Lösung automatisiert den gesamten Gästekontakt — von der ersten Anfrage bis zur Bewertung.',
        features: [
          { icon: Calendar, label: 'Tischreservierungen', desc: 'Automatische Reservierungsbestätigung rund um die Uhr — auch wenn das Restaurant geschlossen ist.' },
          { icon: Phone, label: 'WhatsApp Automation', desc: 'Gäste erhalten sofortige Antworten auf WhatsApp: Öffnungszeiten, Menü, Verfügbarkeit.' },
          { icon: Megaphone, label: 'Event Promotion', desc: 'Automatische Promotion von Specials, Events und saisonalen Angeboten an Stammgäste.' },
          { icon: MessageSquare, label: 'Kundenkommunikation', desc: 'KI-Assistent beantwortet alle Anfragen professionell auf Deutsch — 24/7.' },
          { icon: Mail, label: 'Follow-up & Bewertungen', desc: 'Automatische Nachfass-E-Mails und Bewertungsanfragen nach jedem Besuch.' },
          { icon: Users, label: 'Stammkundenpflege', desc: 'CRM mit automatischer Kundenpflege, Geburtstagsgrüßen und personalisierten Angeboten.' },
        ],
        results: ['90% der Reservierungen automatisch bestätigt', '2 Stunden täglich gespart', '+35% mehr Online-Bewertungen'],
        cta: 'Kostenlose Beratung für Restaurants',
      },
      {
        id: 'cafes',
        icon: Coffee,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        title: 'AI Automation für Cafés',
        sub: 'Mehr Stammgäste. Mehr Bestellungen. Weniger Stress.',
        desc: 'Cafés leben von Stammgästen und reibungslosen Abläufen. Unsere KI-Systeme helfen Ihnen, Kundenfragen sofort zu beantworten, Bestellungen zu automatisieren und Stammgäste langfristig zu binden.',
        features: [
          { icon: MessageSquare, label: 'Menü-Fragen beantworten', desc: 'KI-Assistent beantwortet alle Fragen zu Speisen, Allergenen und Preisen sofort.' },
          { icon: ShoppingBag, label: 'Bestellungen automatisieren', desc: 'Vorbestellungen und Click & Collect automatisch verwalten und bestätigen.' },
          { icon: Users, label: 'Kundenbindung', desc: 'Automatische Treueprogramme, personalisierte Angebote und Erinnerungen für Stammgäste.' },
          { icon: Megaphone, label: 'Tages-Specials promoten', desc: 'Automatische WhatsApp-Nachrichten für Tagesangebote und saisonale Spezialitäten.' },
          { icon: Mail, label: 'Newsletter & Follow-ups', desc: 'Automatisierte E-Mail-Kampagnen für Events, neue Produkte und Angebote.' },
          { icon: Calendar, label: 'Veranstaltungen', desc: 'Buchungen für Workshops, Kaffeekurse und private Events automatisch verwalten.' },
        ],
        results: ['85% Fragen ohne manuellen Aufwand beantwortet', 'Kundenbindung um 40% verbessert', 'Vorbestellungen automatisch bestätigt'],
        cta: 'Kostenlose Beratung für Cafés',
      },
      {
        id: 'services',
        icon: Briefcase,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        title: 'AI Automation für Serviceunternehmen',
        sub: 'Mehr Anfragen. Mehr Kunden. Mehr Umsatz.',
        desc: 'Ob Friseur, Fitnessstudio, Arztpraxis oder Handwerksbetrieb — jedes Serviceunternehmen verliert täglich potenzielle Kunden durch langsame Reaktionszeiten. Unsere KI-Systeme stellen sicher, dass kein Lead verloren geht.',
        features: [
          { icon: Target, label: 'Lead Generation', desc: 'KI erfasst und qualifiziert automatisch alle Interessenten — rund um die Uhr.' },
          { icon: Calendar, label: 'Terminbuchung', desc: 'Automatische Online-Terminbuchung mit Bestätigung, Erinnerung und Follow-up.' },
          { icon: Phone, label: 'WhatsApp Support', desc: 'Sofortige Antworten auf alle Anfragen via WhatsApp — ohne Personal.' },
          { icon: Zap, label: 'CRM Integration', desc: 'Alle Kundendaten automatisch in Ihrem CRM gespeichert und gepflegt.' },
          { icon: Mail, label: 'Automatische Follow-ups', desc: 'Regelmäßige Nachfass-Nachrichten und Angebote an bestehende Kunden.' },
          { icon: Users, label: 'Kundenpflege', desc: 'Automatische Geburtstagsnachrichten, Erinnerungen und personalisierte Kommunikation.' },
        ],
        results: ['Keine verpassten Anfragen mehr', '60% schnellere Reaktionszeiten', '+45% mehr Buchungen'],
        cta: 'Kostenlose Beratung für Servicebetriebe',
      },
    ],
    cta: {
      title: 'Welche Lösung passt zu Ihnen?',
      sub: 'Buchen Sie eine kostenlose Beratung — wir analysieren Ihren Betrieb und empfehlen die optimale Automation-Strategie.',
      btn: 'Kostenlose Beratung anfragen',
    },
  },
  en: {
    hero: {
      badge: 'AI Automation for Your Business',
      title: 'Automation for every',
      titleGradient: 'industry',
      sub: 'Tailored AI automation for restaurants, cafés, and service businesses — built specifically for your industry.',
    },
    services: [
      {
        id: 'restaurants',
        icon: Utensils,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        title: 'AI Automation for Restaurants',
        sub: 'More reservations. Less effort. Happier guests.',
        desc: 'Restaurants struggle daily with busy phone lines, missed reservation requests, and time-consuming manual management. Our AI solution automates all guest contact — from the first inquiry to the review.',
        features: [
          { icon: Calendar, label: 'Table Reservations', desc: 'Automatic reservation confirmation around the clock — even when the restaurant is closed.' },
          { icon: Phone, label: 'WhatsApp Automation', desc: 'Guests get instant WhatsApp answers: opening hours, menu, availability.' },
          { icon: Megaphone, label: 'Event Promotion', desc: 'Automatic promotion of specials, events, and seasonal offers to regular guests.' },
          { icon: MessageSquare, label: 'Customer Communication', desc: 'AI assistant professionally answers all inquiries — 24/7.' },
          { icon: Mail, label: 'Follow-up & Reviews', desc: 'Automatic follow-up emails and review requests after every visit.' },
          { icon: Users, label: 'Loyalty Management', desc: 'CRM with automated customer care, birthday greetings, and personalized offers.' },
        ],
        results: ['90% of reservations confirmed automatically', '2 hours saved daily', '+35% more online reviews'],
        cta: 'Free consultation for restaurants',
      },
      {
        id: 'cafes',
        icon: Coffee,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        title: 'AI Automation for Cafés',
        sub: 'More regulars. More orders. Less stress.',
        desc: 'Cafés thrive on regular customers and smooth operations. Our AI systems help you answer customer questions instantly, automate orders, and retain regular customers long-term.',
        features: [
          { icon: MessageSquare, label: 'Answer Menu Questions', desc: 'AI assistant instantly answers all questions about dishes, allergens, and prices.' },
          { icon: ShoppingBag, label: 'Automate Orders', desc: 'Pre-orders and Click & Collect automatically managed and confirmed.' },
          { icon: Users, label: 'Customer Loyalty', desc: 'Automatic loyalty programs, personalized offers, and reminders for regulars.' },
          { icon: Megaphone, label: 'Promote Daily Specials', desc: 'Automatic WhatsApp messages for daily specials and seasonal specialties.' },
          { icon: Mail, label: 'Newsletter & Follow-ups', desc: 'Automated email campaigns for events, new products, and offers.' },
          { icon: Calendar, label: 'Events & Workshops', desc: 'Bookings for workshops, coffee courses, and private events automatically managed.' },
        ],
        results: ['85% of questions answered without manual effort', 'Customer retention improved by 40%', 'Pre-orders automatically confirmed'],
        cta: 'Free consultation for cafés',
      },
      {
        id: 'services',
        icon: Briefcase,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        title: 'AI Automation for Service Companies',
        sub: 'More inquiries. More customers. More revenue.',
        desc: 'Whether hair salon, fitness studio, medical practice, or trade business — every service company loses potential customers daily through slow response times. Our AI systems ensure no lead is lost.',
        features: [
          { icon: Target, label: 'Lead Generation', desc: 'AI automatically captures and qualifies all prospects — around the clock.' },
          { icon: Calendar, label: 'Appointment Booking', desc: 'Automatic online appointment booking with confirmation, reminder, and follow-up.' },
          { icon: Phone, label: 'WhatsApp Support', desc: 'Instant responses to all inquiries via WhatsApp — without staff.' },
          { icon: Zap, label: 'CRM Integration', desc: 'All customer data automatically saved and maintained in your CRM.' },
          { icon: Mail, label: 'Automatic Follow-ups', desc: 'Regular follow-up messages and offers to existing customers.' },
          { icon: Users, label: 'Customer Care', desc: 'Automatic birthday messages, reminders, and personalized communication.' },
        ],
        results: ['No more missed inquiries', '60% faster response times', '+45% more bookings'],
        cta: 'Free consultation for service businesses',
      },
    ],
    cta: {
      title: 'Which solution fits you?',
      sub: 'Book a free consultation — we analyze your business and recommend the optimal automation strategy.',
      btn: 'Request free consultation',
    },
  },
  ar: {
    hero: {
      badge: 'أتمتة بالذكاء الاصطناعي لأعمالك',
      title: 'أتمتة لكل',
      titleGradient: 'قطاع',
      sub: 'أتمتة ذكاء اصطناعي مخصصة للمطاعم والمقاهي وشركات الخدمات — مبنية خصيصاً لقطاعك.',
    },
    services: [
      {
        id: 'restaurants',
        icon: Utensils,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        title: 'أتمتة ذكاء اصطناعي للمطاعم',
        sub: 'حجوزات أكثر. جهد أقل. ضيوف أسعد.',
        desc: 'تعاني المطاعم يومياً من خطوط الهاتف المشغولة وطلبات الحجز الفائتة والإدارة اليدوية المرهقة. يؤتمت نظامنا الذكي جميع تواصلك مع الضيوف — من الاستفسار الأول حتى التقييم.',
        features: [
          { icon: Calendar, label: 'حجوزات الطاولات', desc: 'تأكيد الحجز تلقائياً على مدار الساعة — حتى عندما يكون المطعم مغلقاً.' },
          { icon: Phone, label: 'أتمتة واتساب', desc: 'يتلقى الضيوف ردوداً فورية على واتساب: أوقات العمل، القائمة، التوفر.' },
          { icon: Megaphone, label: 'الترويج للفعاليات', desc: 'ترويج تلقائي للعروض والفعاليات والتخفيضات الموسمية للعملاء الدائمين.' },
          { icon: MessageSquare, label: 'تواصل مع العملاء', desc: 'مساعد الذكاء الاصطناعي يرد على جميع الاستفسارات باحترافية — 24/7.' },
          { icon: Mail, label: 'المتابعة والتقييمات', desc: 'رسائل متابعة تلقائية وطلبات تقييم بعد كل زيارة.' },
          { icon: Users, label: 'إدارة الولاء', desc: 'نظام CRM مع رعاية العملاء التلقائية وتهاني أعياد الميلاد والعروض المخصصة.' },
        ],
        results: ['90% من الحجوزات مؤكدة تلقائياً', 'توفير ساعتين يومياً', '+35% تقييمات أكثر عبر الإنترنت'],
        cta: 'استشارة مجانية للمطاعم',
      },
      {
        id: 'cafes',
        icon: Coffee,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        title: 'أتمتة ذكاء اصطناعي للمقاهي',
        sub: 'عملاء دائمون أكثر. طلبات أكثر. ضغط أقل.',
        desc: 'تعتمد المقاهي على العملاء الدائمين والعمليات السلسة. تساعدك أنظمتنا الذكية على الإجابة الفورية على استفسارات العملاء وأتمتة الطلبات والاحتفاظ بالعملاء على المدى البعيد.',
        features: [
          { icon: MessageSquare, label: 'الإجابة على أسئلة القائمة', desc: 'يجيب مساعد الذكاء الاصطناعي فوراً على جميع أسئلة الأطباق ومسببات الحساسية والأسعار.' },
          { icon: ShoppingBag, label: 'أتمتة الطلبات', desc: 'إدارة الطلبات المسبقة والاستلام تلقائياً وتأكيدها.' },
          { icon: Users, label: 'ولاء العملاء', desc: 'برامج ولاء تلقائية وعروض مخصصة وتذكيرات للعملاء الدائمين.' },
          { icon: Megaphone, label: 'الترويج لعروض اليوم', desc: 'رسائل واتساب تلقائية لعروض اليوم والتخصصات الموسمية.' },
          { icon: Mail, label: 'النشرة الإخبارية والمتابعة', desc: 'حملات بريد إلكتروني مؤتمتة للفعاليات والمنتجات الجديدة والعروض.' },
          { icon: Calendar, label: 'الفعاليات والورش', desc: 'إدارة تلقائية لحجوزات ورش العمل والدورات وحفلات خاصة.' },
        ],
        results: ['85% من الأسئلة تُجاب بدون جهد يدوي', 'الاحتفاظ بالعملاء تحسّن 40%', 'الطلبات المسبقة مؤكدة تلقائياً'],
        cta: 'استشارة مجانية للمقاهي',
      },
      {
        id: 'services',
        icon: Briefcase,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        title: 'أتمتة ذكاء اصطناعي لشركات الخدمات',
        sub: 'استفسارات أكثر. عملاء أكثر. إيرادات أعلى.',
        desc: 'سواء كنت صالون تجميل أو صالة لياقة أو عيادة طبية أو حرفياً — كل شركة خدمات تخسر عملاء محتملين يومياً بسبب بطء الاستجابة. تضمن أنظمتنا الذكية ألا يفوتك أي عميل.',
        features: [
          { icon: Target, label: 'توليد العملاء المحتملين', desc: 'يلتقط الذكاء الاصطناعي ويؤهل جميع المهتمين تلقائياً — على مدار الساعة.' },
          { icon: Calendar, label: 'حجز المواعيد', desc: 'حجز مواعيد أونلاين تلقائي مع التأكيد والتذكير والمتابعة.' },
          { icon: Phone, label: 'دعم واتساب', desc: 'ردود فورية على جميع الاستفسارات عبر واتساب — بدون موظفين.' },
          { icon: Zap, label: 'تكامل CRM', desc: 'جميع بيانات العملاء محفوظة تلقائياً ومحدّثة في نظام CRM الخاص بك.' },
          { icon: Mail, label: 'متابعة تلقائية', desc: 'رسائل متابعة منتظمة وعروض للعملاء الحاليين.' },
          { icon: Users, label: 'رعاية العملاء', desc: 'رسائل أعياد ميلاد تلقائية وتذكيرات وتواصل مخصص.' },
        ],
        results: ['لا مزيد من الاستفسارات الفائتة', 'أوقات استجابة أسرع بنسبة 60%', '+45% حجوزات أكثر'],
        cta: 'استشارة مجانية لشركات الخدمات',
      },
    ],
    cta: {
      title: 'أي حل يناسبك؟',
      sub: 'احجز استشارة مجانية — نحلل أعمالك ونوصي باستراتيجية الأتمتة المثلى.',
      btn: 'اطلب استشارة مجانية',
    },
  },
};

interface Props {
  lang: Lang;
}

export function ServicesPage({ lang }: Props) {
  const t = servicesData[lang] ?? servicesData['de'];
  const rtl = isRTL(lang);
  const prefix = lang === 'en' ? '/en' : lang === 'ar' ? '/ar' : '';

  return (
    <div className="flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl text-center">
          <RevealSection>
            <SectionHeader
              badge={t.hero.badge}
              title={t.hero.title}
              titleGradient={t.hero.titleGradient}
              subtitle={t.hero.sub}
            />
          </RevealSection>
        </div>
      </section>

      {/* Services */}
      {t.services.map((service, serviceIndex) => {
        const ServiceIcon = service.icon;
        return (
          <section
            key={service.id}
            className={`px-4 py-20 sm:px-6 lg:px-8 ${serviceIndex % 2 === 1 ? 'bg-white/[0.02] border-y border-white/5' : ''}`}
          >
            <div className="mx-auto max-w-7xl">
              <RevealSection>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start mb-14">
                  <div>
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${service.bg} mb-6`}>
                      <ServiceIcon className={`h-7 w-7 ${service.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">{service.title}</h2>
                    <p className={`text-lg font-semibold mb-4 ${service.color}`}>{service.sub}</p>
                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>

                    <div className="mt-8 space-y-2">
                      {service.results.map((r) => (
                        <div key={r} className="flex items-center gap-2.5 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          {r}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link href={`${prefix}/consultation`}>
                        <Button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]">
                          {service.cta}
                          <ArrowRight className={`ml-2 h-4 w-4 ${rtl ? 'rotate-180 mr-2 ml-0' : ''}`} />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.features.map((feature) => {
                      const FIcon = feature.icon;
                      return (
                        <motion.div
                          key={feature.label}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GlassCard className="p-5 h-full">
                            <FIcon className={`h-5 w-5 ${service.color} mb-3`} />
                            <h4 className="text-sm font-bold text-white mb-1.5">{feature.label}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </RevealSection>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl glass border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{t.cta.title}</h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{t.cta.sub}</p>
              <Link href={`${prefix}/consultation`}>
                <Button size="lg" className="group relative overflow-hidden bg-blue-500 hover:bg-blue-400 text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.cta.btn}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
