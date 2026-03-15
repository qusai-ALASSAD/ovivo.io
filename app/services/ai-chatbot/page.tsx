'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Bot, Clock, MessageSquare, TrendingUp, Shield } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-5">KI-Chatbot — Live-Vorschau</p>
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          Hallo! Ich bin Ihr KI-Assistent. Ich helfe Ihnen bei Buchungen, Fragen und Preisen. Womit kann ich Ihnen helfen?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl rounded-tr-none p-3 text-xs text-gray-200 max-w-[80%]">
          Ich möchte einen Beratungstermin buchen
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="glass rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed flex-1">
          <span className="text-emerald-400 font-semibold">Sehr gerne!</span> Diese Woche habe ich folgende Termine frei:
          <div className="mt-2 space-y-1.5">
            {['Di 14. Jan — 10:00 Uhr', 'Mi 15. Jan — 14:00 Uhr', 'Do 16. Jan — 11:00 Uhr'].map((slot) => (
              <button key={slot} className="block w-full text-left text-[11px] bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-600">
      <span>Powered by Ovivo KI</span>
      <span className="flex items-center gap-1.5 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Online 24/7</span>
    </div>
  </div>
);

export default function AIChatbotPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="KI-Chatbot für Unternehmen"
      heroTitle="Ihr Unternehmen,"
      heroGradient="immer erreichbar."
      heroSubtitle="Ein individuell trainierter KI-Assistent, der Fragen beantwortet, Leads qualifiziert und Termine bucht — 24 Stunden am Tag, 7 Tage die Woche."
      heroImage={heroImage}
      whyTitle="Warum jedes Unternehmen einen KI-Chatbot braucht"
      whyItems={[
        { icon: Clock, title: '24/7 Erreichbarkeit', desc: 'Verpassen Sie keine Anfrage mehr. Ihr KI-Assistent betreut Kunden um 3 Uhr morgens genauso gut wie um 15 Uhr.' },
        { icon: MessageSquare, title: 'Sofortige Antworten', desc: '90 % der Kunden erwarten eine Antwort innerhalb von 10 Minuten. Ihre KI antwortet in Sekunden.' },
        { icon: TrendingUp, title: 'Nur qualifizierte Leads', desc: 'Die KI stellt clevere Fragen und filtert Zeitverschwender heraus, bevor sie in Ihren Kalender gelangen.' },
        { icon: Shield, title: 'Gleichbleibende Qualität', desc: 'Jedes Gespräch folgt exakt Ihrem Ton, Ihren Regeln und Prozessen — jedes einzelne Mal.' },
      ]}
      beforeAfter={[
        { before: 'Leads warten stundenlang auf eine Antwort und gehen zur Konkurrenz', after: 'Sofortige Antworten halten Leads engagiert und bringen sie voran' },
        { before: 'Mitarbeiter verbringen Stunden damit, dieselben Grundfragen zu beantworten', after: 'KI beantwortet FAQs automatisch und entlastet Ihr Team vollständig' },
        { before: 'Verpasste Anfragen außerhalb der Geschäftszeiten', after: 'Jede Anfrage wird rund um die Uhr erfasst und qualifiziert' },
        { before: 'Inkonsistente Antworten je nach Mitarbeiter', after: 'Perfekte, markenkonforme Antworten jedes einzelne Mal' },
      ]}
      deliverables={[
        {
          category: 'Chatbot-Einrichtung',
          items: ['Individuelle KI-Persönlichkeit & Tonalität', 'Training auf Ihre Produkte, Leistungen & FAQs', 'Multi-Plattform-Deployment (Website, Instagram, WhatsApp)', 'Gesprächsflow-Design'],
        },
        {
          category: 'Lead-Qualifizierung',
          items: ['Clevere Qualifizierungsfragen', 'Lead-Bewertung & Kategorisierung', 'Sofortbenachrichtigung auf Handy/E-Mail', 'CRM-Auto-Erfassung Integration'],
        },
        {
          category: 'Buchungs-Integration',
          items: ['Kalender-Sync (Google, Calendly etc.)', 'Automatischer Buchungsflow im Gespräch', 'Bestätigungs- & Erinnerungsnachrichten', 'Umbuchungs- & Stornierungsbearbeitung'],
        },
        {
          category: 'Wissensdatenbank',
          items: ['Training auf Ihre Preise & Pakete', 'Standort, Öffnungszeiten & Kontakt', 'Häufige Einwände behandeln', 'Individuelle Weiterleitung an menschlichen Agenten'],
        },
        {
          category: 'Analyse',
          items: ['Gesprächsvolumen-Dashboard', 'Lead-Qualifizierungsrate verfolgen', 'Buchungskonversions-Reporting', 'Monatliches KI-Performance-Review'],
        },
        {
          category: 'Laufender Support',
          items: ['KI-Nachtraining bei Unternehmensänderungen', 'Monatliche Gesprächsauswertung', 'A/B-Tests verschiedener Flows', '30–90 Tage Support inklusive'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Reservierungsanfragen beantworten, Buchungsdetails erfassen und Bestätigung senden — ganz ohne Personaleinsatz.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Leads mit Adresse, Häufigkeit und Budget qualifizieren, bevor sie für ein abschließendes Angebot weitergeleitet werden.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Leistungsanfragen bearbeiten, Verfügbarkeit zeigen und Termine direkt im Gespräch buchen.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Häufige Patientenfragen beantworten, Aufnahmedaten erfassen und Termine automatisch vereinbaren.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Bestellanfragen, Retouren, Produktfragen und Upsell-Empfehlungen in Echtzeit bearbeiten.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'Wir dokumentieren Ihre FAQs, Leistungen, Preise und wie die KI Ihre Marke repräsentieren soll.' },
        { step: '02', title: 'Training', desc: 'Wir trainieren die KI auf alle Ihre Inhalte, legen Regeln fest und gestalten jeden Gesprächsflow.' },
        { step: '03', title: 'Integration', desc: 'Wir deployen den Chatbot auf Ihrer Website, in sozialen Medien und Messaging-Plattformen.' },
        { step: '04', title: 'Testing', desc: 'Wir führen 50+ Testgespräche durch, um sicherzustellen, dass die KI jedes Szenario korrekt behandelt.' },
        { step: '05', title: 'Optimierung', desc: 'Monatliches Review der Gespräche zur Verbesserung von Antworten, Erweiterung des Wissens und Konversionssteigerung.' },
      ]}
      packages={[
        {
          name: 'KI-Chatbot Starter',
          price: 'ab €1.200',
          timeline: 'Lieferung in 7 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Website-Chatbot-Deployment',
            'FAQ-Training (bis zu 30 Fragen)',
            'Lead-Erfassung per E-Mail/CRM',
            'Basis-Buchungsflow',
            '30 Tage Support',
          ],
        },
        {
          name: 'KI-Chatbot Growth',
          price: 'ab €2.500',
          timeline: 'Lieferung in 10 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-emerald-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Multi-Plattform (Website + Instagram + WhatsApp)',
            'Fortgeschrittene Lead-Qualifizierungs-Flows',
            'Vollständige Kalender-Buchungsintegration',
            'Sofortbenachrichtigung bei heißen Leads',
            'Gesprächs-Analyse-Dashboard',
            '60 Tage Support & Nachtraining',
          ],
        },
        {
          name: 'KI-Chatbot Scale',
          price: 'ab €4.500',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Komplettsystem',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'Alles aus Growth',
            'Unbegrenztes FAQ-Training',
            'Individuelle KI-Persönlichkeit & Stimme',
            'Mehrsprachiger Support',
            'CRM + Automation-Integration',
            'Monatliches KI-Performance-Review',
            '90 Tage dedizierter Support',
          ],
        },
      ]}
      faqs={[
        { q: 'Auf welchen Plattformen kann der Chatbot eingesetzt werden?', a: 'Wir deployen auf Ihrer Website, in Instagram-DMs, WhatsApp Business, Facebook Messenger und mehr — je nach Paket.' },
        { q: 'Wie genau ist die KI?', a: 'Nach dem Training bewältigen unsere Chatbots 85–95 % der Anfragen korrekt. Für Ausnahmefälle bauen wir eine nahtlose Weiterleitung an einen menschlichen Agenten ein.' },
        { q: 'Kann der Chatbot Termine direkt buchen?', a: 'Ja. Wir integrieren Google Calendar, Calendly und die meisten Buchungsplattformen, damit die KI Termine ohne menschliches Zutun bestätigen und buchen kann.' },
        { q: 'In welcher Sprache spricht der Chatbot?', a: 'Die KI kann in jeder Sprache trainiert werden. Mehrsprachiger Support (z. B. Deutsch + Englisch) ist im Scale-Paket verfügbar.' },
        { q: 'Wie lange dauert die Einrichtung?', a: 'Starter-Systeme sind innerhalb von 7 Tagen live. Vollständige Multi-Plattform-Deployments dauern 10–14 Tage inklusive aller Tests.' },
      ]}
      relatedServices={[
        { href: '/services/automation', label: 'Automation Systeme' },
        { href: '/services/crm-email', label: 'CRM + E-Mail-Sequenzen' },
        { href: '/services/funnels', label: 'Website + Funnel-Aufbau' },
      ]}
    />
  );
}
