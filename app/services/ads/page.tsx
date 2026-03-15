'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { ChartBar as BarChart3, Target, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-rose-500/20 shadow-[0_0_60px_rgba(244,63,94,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-5">Kampagnen-Performance</p>
    <div className="grid grid-cols-2 gap-4 mb-5">
      {[
        { label: 'Impressionen', value: '48.200', change: '+12 %', up: true },
        { label: 'Klicks', value: '1.840', change: '+28 %', up: true },
        { label: 'Kosten/Lead', value: '€6,40', change: '-18 %', up: false },
        { label: 'ROAS', value: '4,2x', change: '+0,8x', up: true },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-3 border-white/10">
          <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] font-semibold mt-0.5 text-emerald-400">{stat.change} diesen Monat</div>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Top-performende Anzeigen</div>
      {[
        { name: 'Video-Anzeige — Vorher/Nachher', spend: '€320', leads: '48', cpl: '€6,67' },
        { name: 'Carousel — Leistungen', spend: '€280', leads: '42', cpl: '€6,67' },
        { name: 'Statisch — Angebot CTA', spend: '€200', leads: '34', cpl: '€5,88' },
      ].map((ad) => (
        <div key={ad.name} className="flex items-center justify-between text-xs">
          <span className="text-gray-400 truncate flex-1">{ad.name}</span>
          <div className="flex gap-4 text-gray-500">
            <span>{ad.spend}</span>
            <span className="text-emerald-400">{ad.leads} Leads</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function AdsPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Ads & Performance Marketing"
      heroTitle="Jeder ausgegebene Euro"
      heroGradient="verfolgt & optimiert."
      heroSubtitle="Wir planen und betreiben datengetriebene Paid-Kampagnen auf Meta und Google, die konstant qualifizierte Leads mit messbarem Return auf jeden ausgegebenen Euro generieren."
      heroImage={heroImage}
      whyTitle="Warum Performance Marketing alles verändert"
      whyItems={[
        { icon: Target, title: 'Planbarer Lead-Flow', desc: 'Schluss mit dem Verlassen auf Empfehlungen. Paid Ads geben Ihnen ein zuverlässiges, skalierbares Lead-Generierungssystem.' },
        { icon: BarChart3, title: 'Vollständige Attribution', desc: 'Wissen Sie genau, welche Anzeige, welche Zielgruppe und welche Kreation Umsatz bringt — nicht nur Klicks.' },
        { icon: TrendingUp, title: 'Kumulative Ergebnisse', desc: 'Je länger wir Ihre Kampagnen optimieren, desto niedriger werden Ihre Kosten pro Lead und desto höher Ihr Return.' },
        { icon: Zap, title: 'Schnelle Ergebnisse', desc: 'Anders als bei SEO können Paid Ads innerhalb von 48 Stunden nach dem Live-Gang Leads generieren.' },
      ]}
      beforeAfter={[
        { before: 'Keine konstante Quelle für neue Leads', after: 'Planbarer, täglicher Lead-Flow aus Paid-Kampagnen' },
        { before: 'Werbebudget für die falschen Zielgruppen verschwendet', after: 'Lasergenaue Anzeigen für Ihre idealen Kunden' },
        { before: 'Keine Ahnung, welche Anzeigen Umsatz generieren', after: 'Vollständiges Attribution-Tracking von Anzeige bis Verkauf' },
        { before: 'Kampagnen aufgesetzt und dann vergessen', after: 'Wöchentliche Optimierung für jede Kennzahl' },
      ]}
      deliverables={[
        {
          category: 'Kampagnenstrategie',
          items: ['Zielgruppenrecherche & Wettbewerbsanalyse', 'Full-Funnel-Kampagnenarchitektur', 'Budgetallokationsstrategie', 'Plattformauswahl (Meta, Google, TikTok)'],
        },
        {
          category: 'Anzeigenkreationen',
          items: ['Anzeigentext für 5+ Kreationen pro Kampagne', 'Bildanzeigen-Spezifikationen & Richtlinien', 'Video-Anzeigen-Skripterstellung', 'A/B-Test-Variantenplanung'],
        },
        {
          category: 'Meta-Anzeigen',
          items: ['Facebook & Instagram Kampagneneinrichtung', 'Custom-Audience & Lookalike-Erstellung', 'Retargeting-Kampagneneinrichtung', 'Lead-Formular oder Landingpage-Kampagnen'],
        },
        {
          category: 'Google Ads',
          items: ['Search-Kampagneneinrichtung', 'Keyword-Recherche & Negativliste', 'Display & Remarketing-Kampagnen', 'Google-Business-Profile-Optimierung'],
        },
        {
          category: 'Tracking & Analytics',
          items: ['Meta Pixel & Conversion API Einrichtung', 'Google Tag Manager Konfiguration', 'GA4-Ziele & Event-Tracking', 'Monatliches Performance-Reporting'],
        },
        {
          category: 'Laufendes Management',
          items: ['Wöchentliche Gebot- & Budgetoptimierung', 'Kreations-Refresh alle 3–4 Wochen', 'Zielgruppenerweiterungstests', 'Monatliches Strategie-Review-Gespräch'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Lokale Awareness + Event-Promotion-Kampagnen für Tischreservierungen und Private-Dining-Buchungen.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Lead-Generierungskampagnen für Hauseigentümer und Vermieter mit direkten Angebotsanfragen.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Vorher/Nachher-Carousel-Anzeigen und Neukundenangebots-Kampagnen für lokale Zielgruppen auf Instagram.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Erkrankungsspezifische Search-Kampagnen für Patienten mit hoher Kaufabsicht.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Full-Funnel-Kampagnen: Awareness auf Meta, Retargeting für Warenkorbabbrecher, Loyalitätskampagnen für Wiederholungskäufer.' },
      ]}
      process={[
        { step: '01', title: 'Audit & Strategie', desc: 'Wir analysieren Ihre bestehenden Assets, recherchieren Ihren Markt und erstellen eine vollständige Paid-Media-Strategie.' },
        { step: '02', title: 'Einrichtung', desc: 'Wir bauen jede Kampagne, Zielgruppe und Tracking-Konfiguration von Grund auf — auf die richtige Art.' },
        { step: '03', title: 'Launch', desc: 'Kampagnen gehen mit einem Testbudget live, um innerhalb der ersten 7 Tage erste Daten zu sammeln.' },
        { step: '04', title: 'Optimieren', desc: 'Wöchentliche Optimierungen: Verlierer-Anzeigen stoppen, Gewinner skalieren, kontinuierlich neue Kreationen testen.' },
        { step: '05', title: 'Skalieren', desc: 'Sobald wir Erfolgsformeln gefunden haben, skalieren wir das Budget systematisch und halten dabei die Kosten pro Lead.' },
      ]}
      packages={[
        {
          name: 'Ads Starter',
          price: 'ab €1.500/Monat',
          timeline: 'Launch in 5 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Meta ODER Google Kampagneneinrichtung',
            'Bis zu 3 Anzeigensets',
            'Anzeigentext für 5 Kreationen',
            'Pixel + Basis-Tracking-Einrichtung',
            'Monatliches Performance-Reporting',
          ],
        },
        {
          name: 'Ads Growth',
          price: 'ab €2.500/Monat',
          timeline: 'Launch in 5 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-rose-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Meta + Google Kampagnen',
            'Retargeting-Kampagnen',
            'Vollständiges Conversion-Tracking (Pixel + GA4)',
            'Wöchentliche Optimierung',
            'Anzeigenkreation A/B-Testing',
            'Monatliches Strategiegespräch',
          ],
        },
        {
          name: 'Ads Scale',
          price: 'ab €4.500/Monat',
          timeline: 'Launch in 7 Tagen',
          badge: 'Vollständiges Management',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Alles aus Growth',
            'Meta + Google + TikTok',
            'Vollständige Kreationsproduktionsberatung',
            'Lookalike-Audience-Skalierung',
            'Vollständige Attribution-Modellierung',
            'Dedizierter Account Manager',
            'Zweiwöchentliche Strategiegespräche',
          ],
        },
      ]}
      faqs={[
        { q: 'Welches Werbebudget benötige ich zusätzlich?', a: 'Das Werbebudget (das Budget, das Sie Meta/Google geben) ist getrennt von unserer Management-Gebühr. Wir empfehlen mindestens €500/Monat für Starter, €1.500+ für Growth und €3.000+ für Scale.' },
        { q: 'Wie schnell sehe ich Ergebnisse?', a: 'Die meisten Kunden sehen ihre ersten Leads innerhalb von 48–72 Stunden nach dem Live-Gang. Optimale Ergebnisse kommen typischerweise nach 30–60 Tagen, wenn der Algorithmus lernt und wir auf Basis von Daten optimieren.' },
        { q: 'Erstellen Sie auch die Anzeigenbilder und -videos?', a: 'Wir schreiben alle Anzeigentexte und Creative-Briefings. Für Bilder und Videos arbeiten wir mit Ihren bestehenden Assets oder zeigen Ihnen, was Sie aufnehmen sollen. Vollständige Kreationsproduktion ist als Add-on verfügbar.' },
        { q: 'Können Sie bestehende Kampagnen übernehmen?', a: 'Ja. Wir analysieren Ihre bestehenden Kampagnen, beheben strukturelle Probleme und verbessern die Performance — typischerweise innerhalb der ersten 30 Tage.' },
        { q: 'Gibt es eine Mindestvertragslaufzeit?', a: 'Wir empfehlen eine Mindestbindung von 3 Monaten für ordentliche Optimierungszyklen. Monatsweise Optionen sind beim Starter-Paket verfügbar.' },
      ]}
      relatedServices={[
        { href: '/services/funnels', label: 'Website + Funnel-Aufbau' },
        { href: '/services/automation', label: 'Automation Systeme' },
        { href: '/services/crm-email', label: 'CRM + E-Mail-Sequenzen' },
        { href: '/services/branding', label: 'Markenidentität' },
      ]}
    />
  );
}
