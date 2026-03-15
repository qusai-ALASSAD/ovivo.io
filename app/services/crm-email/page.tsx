'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Mail, Users, TrendingUp, Zap } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5">CRM-Pipeline</p>
    <div className="flex gap-3 overflow-x-auto pb-2">
      {[
        { stage: 'Neuer Lead', count: 24, color: 'border-blue-500/30 bg-blue-500/10', tag: 'text-blue-400' },
        { stage: 'Kontaktiert', count: 18, color: 'border-cyan-500/30 bg-cyan-500/10', tag: 'text-cyan-400' },
        { stage: 'Angebot', count: 9, color: 'border-orange-500/30 bg-orange-500/10', tag: 'text-orange-400' },
        { stage: 'Abgeschlossen', count: 6, color: 'border-emerald-500/30 bg-emerald-500/10', tag: 'text-emerald-400' },
      ].map((col) => (
        <div key={col.stage} className={`flex-shrink-0 w-24 rounded-xl border p-3 ${col.color}`}>
          <p className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${col.tag}`}>{col.stage}</p>
          <div className="text-2xl font-bold text-white mb-1">{col.count}</div>
          <div className="space-y-1.5">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-5 space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Aktive E-Mail-Sequenzen</div>
      {[
        { name: 'Willkommens-Sequenz', active: 47, step: 'Schritt 2/5' },
        { name: 'Reaktivierungs-Flow', active: 23, step: 'Schritt 1/3' },
        { name: 'After-Purchase Upsell', active: 12, step: 'Schritt 3/4' },
      ].map((seq) => (
        <div key={seq.name} className="flex items-center justify-between text-xs glass rounded-lg px-3 py-2 border-white/10">
          <span className="text-gray-300">{seq.name}</span>
          <div className="flex gap-3 text-gray-500">
            <span className="text-cyan-400">{seq.active} Kontakte</span>
            <span>{seq.step}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function CrmEmailPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="CRM-Einrichtung + E-Mail-Sequenzen"
      heroTitle="Jeder Lead gepflegt."
      heroGradient="Jeder Verkauf verfolgt."
      heroSubtitle="Wir richten Ihr CRM von Grund auf ein und bauen E-Mail-Automation-Sequenzen, die jeden Lead vom Erstkontakt bis zum zahlenden Kunden führen — vollautomatisch."
      heroImage={heroImage}
      whyTitle="Warum ein CRM + E-Mail-System unverzichtbar ist"
      whyItems={[
        { icon: Users, title: 'Kein Lead geht verloren', desc: 'Jeder Kontakt wird gespeichert, verfolgt und automatisch nachgefasst — nichts fällt durch die Maschen.' },
        { icon: Mail, title: 'Umsatz auf Autopilot', desc: 'E-Mail-Sequenzen generieren 24/7 Umsatz, indem sie Leads durch Ihre Pipeline führen — ohne manuellen Aufwand.' },
        { icon: TrendingUp, title: 'Datengetriebene Entscheidungen', desc: 'Sehen Sie genau, wo Deals ins Stocken geraten, welche E-Mails konvertieren und was Umsatz bringt.' },
        { icon: Zap, title: 'Skalieren ohne Einstellungen', desc: 'Ein richtig konfiguriertes CRM lässt eine Person die Arbeit von fünf erledigen — durch Automatisierung wiederkehrender Beziehungsaufgaben.' },
      ]}
      beforeAfter={[
        { before: 'Leads in Tabellen und auf Zetteln gespeichert', after: 'Jeder Kontakt übersichtlich in einem strukturierten, durchsuchbaren CRM' },
        { before: 'Manuelle Nachfass-Aktionen, die nie stattfinden', after: 'Automatisierte Sequenzen fassen bei jedem Lead konsequent nach' },
        { before: 'Keine Ahnung, wo Leads in der Pipeline stehen', after: 'Visuelle Pipeline zeigt jeden Deal und seinen Status' },
        { before: 'E-Mail-Newsletter ohne Automation', after: 'Smarte Sequenzen, ausgelöst durch Verhalten und Timing' },
      ]}
      deliverables={[
        {
          category: 'CRM-Einrichtung',
          items: ['Plattformauswahl & Account-Einrichtung', 'Individuelle Pipeline-Konfiguration', 'Kontakteigenschaften & Tag-Struktur', 'Lead-Quellen-Tracking einrichten', 'Team-Zugriff & Berechtigungen'],
        },
        {
          category: 'E-Mail-Sequenzen',
          items: ['Willkommens-Sequenz (5 E-Mails)', 'Lead-Nurture-Flow (7 E-Mails)', 'Reaktivierungskampagne (3 E-Mails)', 'After-Purchase-Upsell-Sequenz', 'Professionelles E-Mail-Copywriting für jeden Schritt'],
        },
        {
          category: 'Automationen',
          items: ['Lead-Erfassung zu CRM-Automation', 'Pipeline-Stage-Trigger', 'Aufgaben- & Erinnerungs-Automation', 'Deal-Gewonnen/Verloren-Workflows', 'Benachrichtigungseinrichtung für heiße Leads'],
        },
        {
          category: 'Integrationen',
          items: ['Website-Formular-Integration', 'Landingpage-/Funnel-Sync', 'Kalender-Buchungsintegration', 'Social-Media-Lead-Formular-Sync'],
        },
        {
          category: 'Templates & Design',
          items: ['Markenkonforme E-Mail-Template-Gestaltung', 'Signatur-Template', 'Newsletter-Template', 'Werbe-E-Mail-Template'],
        },
        {
          category: 'Schulung & Support',
          items: ['Team-Schulungssitzungen', 'Video-Walkthrough-Bibliothek', 'Nutzungsleitfaden-Dokumentation', '30–90 Tage Support nach dem Launch'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'CRM für Event-Anfragen mit Nachfass-Sequenzen, Treuekampagnen und Wiederbucher-E-Mails nach jedem Besuch.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Angebots-Pipeline von Anfrage bis Abschluss, mit automatischem Nachfassen bei nicht reagierenden Interessenten.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Kundendatenbank mit Wiederbuchungs-Sequenzen, Geburtstagspromotions und Treueprogramm-Automation.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Patientenpipeline von Beratungsanfrage bis Behandlung, mit automatischen Terminerinnerungen und Nachsorge-Sequenzen.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Kundenlebenszyklus-Sequenzen: Willkommen → Erstkauf → Wiederholungskäufer → VIP-Stufe, alles automatisiert.' },
      ]}
      process={[
        { step: '01', title: 'Audit', desc: 'Wir analysieren Ihre aktuelle Kontaktdatenbank, Tools und Workflows für die Migrations-Planung.' },
        { step: '02', title: 'Architektur', desc: 'Wir entwerfen Ihre Pipeline, Kontaktstruktur und Automation-Logik, bevor wir etwas bauen.' },
        { step: '03', title: 'Aufbau', desc: 'CRM-Einrichtung, Sequenz-Texterstellung und alle Automation-Verbindungen gebaut und getestet.' },
        { step: '04', title: 'Migration', desc: 'Wir importieren Ihre bestehenden Kontakte sauber und stellen sicher, dass alle Daten korrekt getaggt sind.' },
        { step: '05', title: 'Launch & Schulung', desc: 'Go-live mit vollständiger Team-Schulung und einem 30-Tage-Check-in zur Optimierung auf Basis echter Daten.' },
      ]}
      packages={[
        {
          name: 'CRM Starter',
          price: 'ab €1.000',
          timeline: 'Lieferung in 7 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'CRM-Plattform-Einrichtung & Konfiguration',
            '3-stufige Pipeline-Einrichtung',
            'Willkommens-E-Mail-Sequenz (3 E-Mails)',
            'Formular-zu-CRM-Integration',
            '30 Tage Support',
          ],
        },
        {
          name: 'CRM Growth',
          price: 'ab €2.200',
          timeline: 'Lieferung in 10 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-cyan-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Vollständige Pipeline mit 5+ Stufen',
            'Willkommens- + Nurture-Sequenzen (12 E-Mails)',
            'Reaktivierungskampagne',
            'After-Purchase-Upsell-Flow',
            'Markenkonforme E-Mail-Template-Gestaltung',
            '60 Tage Support & Optimierung',
          ],
        },
        {
          name: 'CRM Scale',
          price: 'ab €4.000',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Komplettsystem',
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          deliverables: [
            'Alles aus Growth',
            'Vollständiger Marketing-Automation-Stack',
            'Fortgeschrittene Segmentierung & Bewertung',
            'Multi-Pipeline-Einrichtung',
            'Team-Schulung & Dokumentation',
            'Kontaktmigration aus bestehendem CRM',
            '90 Tage dedizierter Support',
          ],
        },
      ]}
      faqs={[
        { q: 'Welche CRM-Plattform richten Sie ein?', a: 'Wir arbeiten mit GoHighLevel, HubSpot, ActiveCampaign, Klaviyo und Pipedrive. Wir empfehlen die beste Option basierend auf Ihrem Budget und Unternehmenstyp.' },
        { q: 'Migrieren Sie unsere bestehenden Kontakte?', a: 'Ja. Alle Pakete beinhalten die Kontaktmigration aus Tabellen, Mailchimp oder anderen CRMs. Wir bereinigen und taggen Ihre Daten als Teil des Prozesses.' },
        { q: 'Schreiben Sie die E-Mails?', a: 'Absolut. Wir schreiben alle E-Mail-Texte in Ihrer Markenstimme — Willkommens-Sequenzen, Nurture-Flows, Reaktivierungskampagnen und alles dazwischen.' },
        { q: 'Wann geht unsere erste E-Mail-Sequenz live?', a: 'Starter-Systeme sind innerhalb von 7 Tagen live. Vollständige Growth- und Scale-Systeme sind innerhalb von 10–14 Tagen live.' },
        { q: 'Welche E-Mail-Öffnungsraten können wir erwarten?', a: 'Mit einer ordentlich aufgewärmten Sender-Domain und relevantem Inhalt erreichen unsere Kunden typischerweise 35–55 % Öffnungsraten — deutlich über dem Branchendurchschnitt von 20 %.' },
      ]}
      relatedServices={[
        { href: '/services/automation', label: 'Automation Systeme' },
        { href: '/services/ai-chatbot', label: 'KI-Chatbot' },
        { href: '/services/funnels', label: 'Website + Funnel-Aufbau' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
      ]}
    />
  );
}
