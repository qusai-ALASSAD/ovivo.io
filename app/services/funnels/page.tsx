'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Globe, Target, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl overflow-hidden border-orange-500/20 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
    <div className="bg-white/[0.03] border-b border-white/10 px-5 py-3 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="flex-1 mx-3 h-5 rounded-full bg-white/5 border border-white/10 flex items-center px-3">
        <span className="text-[10px] text-gray-600">ihrewebsite.de</span>
      </div>
    </div>
    <div className="p-5 space-y-4">
      {[
        { label: 'Landingpage', visitors: '2.400', pct: 100, color: 'bg-orange-500' },
        { label: 'Lead-Erfassung', visitors: '960', pct: 40, color: 'bg-blue-500' },
        { label: 'Buchungsseite', visitors: '384', pct: 16, color: 'bg-emerald-500' },
        { label: 'Bestätigte Kunden', visitors: '115', pct: 5, color: 'bg-amber-500' },
      ].map((stage) => (
        <div key={stage.label}>
          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
            <span className="font-semibold">{stage.label}</span>
            <span>{stage.visitors} Besucher</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="pt-2 grid grid-cols-3 gap-3">
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-white">4,8 %</div>
          <div className="text-[10px] text-gray-500">Konversionsrate</div>
        </div>
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-orange-400">€38</div>
          <div className="text-[10px] text-gray-500">Kosten/Lead</div>
        </div>
        <div className="glass rounded-lg p-2.5 text-center">
          <div className="text-lg font-bold text-emerald-400">€12k</div>
          <div className="text-[10px] text-gray-500">Umsatz</div>
        </div>
      </div>
    </div>
  </div>
);

export default function FunnelsPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Website + Funnel-Aufbau"
      heroTitle="Eine Website, die"
      heroGradient="wirklich konvertiert."
      heroSubtitle="Wir bauen keine schönen Websites ohne Ergebnis. Wir bauen vollständige Konversionssysteme — Landingpages, Sales-Funnels und Buchungsflows, die Besucher in zahlende Kunden verwandeln."
      heroImage={heroImage}
      whyTitle="Warum die meisten Websites versagen — und wie wir das ändern"
      whyItems={[
        { icon: Globe, title: 'Für Konversion gebaut', desc: 'Jedes Seitenelement ist mit einem Ziel gestaltet: Besucher in Leads und Leads in Kunden verwandeln.' },
        { icon: Target, title: 'Funnel-zuerst-Denken', desc: 'Wir kartieren die gesamte Customer Journey, bevor wir auch nur eine Zeile Code schreiben.' },
        { icon: TrendingUp, title: 'Messbarer ROI', desc: 'Vollständige Analyse-Einrichtung, damit Sie genau wissen, welche Seiten und Trafficquellen Umsatz generieren.' },
        { icon: Zap, title: 'Lieferung in 14 Tagen', desc: 'Vom Briefing zur Live-Website in 14 Tagen — ohne Abstriche bei der Qualität.' },
      ]}
      beforeAfter={[
        { before: 'Generische Website ohne klaren Call-to-Action', after: 'Konversionsoptimierte Website mit klarer User Journey' },
        { before: 'Keine Möglichkeit zu verfolgen, welche Besucher Kunden werden', after: 'Vollständiges Analyse- & Attribution-Tracking installiert' },
        { before: 'Besucher verlassen die Seite ohne Kontaktdaten zu hinterlassen', after: 'Lead-Erfassung auf jeder Seite mit automatischem Follow-up' },
        { before: 'Langsame, nicht responsive Seite verliert mobilen Traffic', after: 'Blitzschnelles, Mobile-First-Design' },
      ]}
      deliverables={[
        {
          category: 'Website',
          items: ['Bis zu 8 individuelle Seiten', 'Mobile-First responsives Design', 'SEO-Grundlage (Meta, Schema, Sitemap)', 'Kontaktformulare + Lead-Erfassung', 'Google Analytics 4 Einrichtung', 'Seitenladezeit-Optimierung'],
        },
        {
          category: 'Sales-Funnels',
          items: ['3 hochkonvertierende Landingpages', 'Lead-Magnet-Seite + Danke-Flow', 'Verkaufsseite mit VSL-Platzhalter', 'Checkout-Seiten-Integration (Stripe)', 'Upsell-/Downsell-Flows'],
        },
        {
          category: 'Konversionselemente',
          items: ['Headline & Copywriting', 'Social-Proof-Bereiche', 'FAQ + Einwandbehandlung', 'CTA-Button-Optimierung', 'A/B-Test-Framework einrichten'],
        },
        {
          category: 'Lead-Erfassung',
          items: ['E-Mail-Opt-in-Formulare', 'Pop-up & Exit-Intent-Trigger', 'Lead-Magnet-Auslieferungsautomation', 'CRM-Integration (Kontakterfassung)'],
        },
        {
          category: 'Technisches',
          items: ['Domain + Hosting-Einrichtung', 'SSL-Zertifikat', 'CDN-Konfiguration', 'Core Web Vitals Optimierung', 'Cookie-Consent & DSGVO-Konformität'],
        },
        {
          category: 'Nach dem Launch',
          items: ['30 Tage Fehlerbehebungsgarantie', 'Vollständige Schulung zur Inhaltsbearbeitung', 'Video-Walkthrough-Dokumentation', 'Heatmap-Tool-Installation (Hotjar)'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Tischbuchungs-Funnel, Event-Anfrage-Seite und Treue-Programm-Anmelde-Landingpage.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Sofortangebots-Funnel mit Adresse, Größe und Serviceart — dann direkte Buchung.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Leistungsseiten, Vorher/Nachher-Galerie, Online-Buchungs-Funnel und Treueprogramm-Anmeldung.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Erkrankungsspezifische Landingpages, Beratungsbuchungs-Funnel und Patientenaufnahmeformulare.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Produktlaunch-Seiten, Bundle-Funnels und After-Purchase-Upsell-Flows.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'Wir analysieren Ihre Zielgruppe, Ziele und Wettbewerber, um die richtige Strategie vor dem Design zu entwickeln.' },
        { step: '02', title: 'Wireframe', desc: 'Wir präsentieren einen vollständigen Wireframe jeder Seite zur Freigabe — keine Überraschungen am Ende.' },
        { step: '03', title: 'Design & Aufbau', desc: 'Premium-Design mit voller Funktionalität — Formulare, Automationen, Zahlungen und CRM alle verbunden.' },
        { step: '04', title: 'Test & Launch', desc: 'Wir testen auf allen Geräten und Browsern, dann Launch mit aktiven Monitoring-Tools ab Tag eins.' },
        { step: '05', title: 'Optimierung', desc: 'Wir analysieren Heatmaps und Analytics in den ersten 30 Tagen und nehmen datengetriebene Verbesserungen vor.' },
      ]}
      packages={[
        {
          name: 'Funnel Starter',
          price: 'ab €2.000',
          timeline: 'Lieferung in 10 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            '5-seitige Konversionswebsite',
            '1 Sales-Funnel (3 Seiten)',
            'Lead-Erfassung + CRM-Integration',
            'Google Analytics Einrichtung',
            '30 Tage Support',
          ],
        },
        {
          name: 'Funnel Growth',
          price: 'ab €4.000',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-orange-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Bis zu 8 Seiten + 3 Funnels',
            'E-Mail-Automation-Integration',
            'Stripe-Zahlungseinrichtung',
            'Exit-Intent & Pop-up-Erfassung',
            'A/B-Testing-Framework',
            '60 Tage Support & CRO',
          ],
        },
        {
          name: 'Funnel Scale',
          price: 'ab €7.000',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Komplettsystem',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Alles aus Growth',
            'Multi-Funnel-Architektur (5+ Funnels)',
            'Mitgliederbereich / Gated-Content-Einrichtung',
            'Fortgeschrittenes CRM + Marketing-Automation',
            'Vollständige SEO-Grundlage',
            'Heatmap & User-Recording-Einrichtung',
            '90 Tage Optimierungssupport',
          ],
        },
      ]}
      faqs={[
        { q: 'Auf welcher Plattform bauen Sie?', a: 'Wir bauen auf der Plattform, die am besten zu Ihren Anforderungen passt — Next.js, Webflow, WordPress oder ClickFunnels je nach Bedarf und Budget.' },
        { q: 'Schreiben Sie auch die Texte für die Seiten?', a: 'Ja. Alle Pakete beinhalten professionelles Copywriting für jede Seite. Wir recherchieren Ihre Zielgruppe und schreiben überzeugenden, konversionsorientierten Text.' },
        { q: 'Kann ich den Inhalt nach dem Launch selbst bearbeiten?', a: 'Absolut. Wir bauen mit Content-Management im Blick und stellen Video-Tutorials bereit, damit Sie ohne unsere Hilfe Änderungen vornehmen können.' },
        { q: 'Ist SEO inklusive?', a: 'Alle Pakete beinhalten die SEO-Grundlage — Meta-Tags, Schema-Markup, Sitemap und Seitenladezeit-Optimierung. Laufende SEO-Kampagnen sind ein separater Service.' },
        { q: 'Wie schnell lädt die Website?', a: 'Wir optimieren jede Website für 90+ Punkte bei Google PageSpeed. Schnelle Ladezeiten sind unverzichtbar für Konversionen und SEO.' },
      ]}
      relatedServices={[
        { href: '/services/automation', label: 'Automation Systeme' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
        { href: '/services/crm-email', label: 'CRM + E-Mail-Sequenzen' },
        { href: '/services/branding', label: 'Markenidentität' },
      ]}
    />
  );
}
