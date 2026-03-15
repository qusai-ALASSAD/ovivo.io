'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';
import {
  Zap, Clock, Users, TrendingUp, Mail, Calendar,
  ShoppingCart, Star, ArrowRight,
} from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-8 border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.1)]">
    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">Live Automation Flow</p>
    <div className="space-y-3">
      {[
        { icon: Users, label: 'Lead sendet Formular', status: 'complete', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
        { icon: Zap, label: 'Sofort ins CRM eingetragen', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Mail, label: 'Willkommens-E-Mail versendet', status: 'complete', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
        { icon: Calendar, label: 'Buchungserinnerung gesendet', status: 'active', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
        { icon: Star, label: 'Bewertungsanfrage (Tag 7)', status: 'pending', color: 'text-gray-500', bg: 'bg-white/5 border-white/10' },
      ].map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-center gap-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border flex-shrink-0 ${step.bg}`}>
              <Icon className={`h-4 w-4 ${step.color}`} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className={`text-sm font-medium ${step.status === 'pending' ? 'text-gray-600' : 'text-gray-200'}`}>{step.label}</span>
              {step.status === 'complete' && <span className="text-[10px] text-emerald-400 font-bold">FERTIG</span>}
              {step.status === 'active' && <span className="text-[10px] text-orange-400 font-bold animate-pulse">AKTIV</span>}
              {step.status === 'pending' && <span className="text-[10px] text-gray-600 font-bold">BALD</span>}
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-white">47</div>
        <div className="text-xs text-gray-500">Leads heute</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-emerald-400">100%</div>
        <div className="text-xs text-gray-500">nachgefasst</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-blue-400">0</div>
        <div className="text-xs text-gray-500">manuelle Aufgaben</div>
      </div>
    </div>
  </div>
);

const diagramSection = (
  <div>
    <RevealSection className="text-center mb-14">
      <SectionHeader
        badge="So funktioniert es"
        title="Ihr Automation-"
        titleGradient="Ablauf visualisiert"
        subtitle="Jeder Schritt ist automatisiert. Jeder Lead wird erfasst. Jede Nachfass-Aktion wird ausgelöst — ohne manuellen Aufwand."
      />
    </RevealSection>
    <RevealSection>
      <div className="relative overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max mx-auto max-w-5xl px-4">
          {[
            { icon: Users, label: 'Lead kommt rein', sublabel: 'Formular, Anzeige oder Empfehlung', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
            { icon: Zap, label: 'CRM-Eintrag', sublabel: 'Automatisch getaggt & bewertet', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
            { icon: Mail, label: 'E-Mail gesendet', sublabel: 'Personalisierte Begrüßung', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20' },
            { icon: Calendar, label: 'Buchungsflow', sublabel: 'Kalender-Link gesendet', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20' },
            { icon: TrendingUp, label: 'Nachfassen', sublabel: 'Tag 2, 5, 10 Sequenzen', color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/20' },
            { icon: Star, label: 'Bewertungsanfrage', sublabel: 'Automatisch nach Service', color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/20' },
          ].map((node, i, arr) => {
            const Icon = node.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center w-28">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border mb-3 ${node.bg}`}>
                    <Icon className={`h-6 w-6 ${node.color}`} />
                  </div>
                  <p className="text-xs font-bold text-white">{node.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{node.sublabel}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-700 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>

    <RevealSection>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        {[
          { icon: ShoppingCart, title: 'Verlassener Warenkorb', desc: 'Automatisch Kunden nachfassen, die ohne Kauf abgebrochen haben.' },
          { icon: Calendar, title: 'Terminbuchung', desc: 'Erinnerungen, Bestätigungen und Nachfass-Aktionen bei Nichterscheinen automatisieren.' },
          { icon: Mail, title: 'WhatsApp / E-Mail', desc: 'Mehrkanalige Sequenzen, die Kunden dort erreichen, wo sie sind.' },
          { icon: Star, title: 'Google-Bewertungsanfragen', desc: 'Bewertungsanfragen nach jedem abgeschlossenen Service automatisch auslösen.' },
        ].map((ex) => {
          const Icon = ex.icon;
          return (
            <div key={ex.title} className="glass rounded-xl p-5 border-white/10">
              <Icon className="h-5 w-5 text-blue-400 mb-3" />
              <p className="text-sm font-bold text-white mb-1">{ex.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{ex.desc}</p>
            </div>
          );
        })}
      </div>
    </RevealSection>
  </div>
);

export default function AutomationPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Automation Systeme"
      heroTitle="Schluss mit manuellen Aufgaben."
      heroGradient="Jetzt skalieren."
      heroSubtitle="Wir bauen individuelle Automation-Systeme, die jeden Lead erfassen, sofort nachfassen und Interessenten in Kunden verwandeln — vollautomatisch."
      heroImage={heroImage}
      whyTitle="Warum Ihr Unternehmen Automation braucht"
      whyItems={[
        { icon: Clock, title: '20+ Stunden/Woche sparen', desc: 'Wiederkehrende manuelle Aufgaben eliminieren und Zeit für wertschöpfende Arbeit gewinnen.' },
        { icon: Users, title: 'Kein Lead geht verloren', desc: 'Jeder Lead wird erfasst, getaggt und nachgefasst — auch um 2 Uhr nachts am Sonntag.' },
        { icon: TrendingUp, title: 'Besseres Kundenerlebnis', desc: 'Sofortige Antworten und personalisierte Kontaktpunkte lassen Kunden sich wertgeschätzt fühlen.' },
        { icon: Mail, title: 'Konsequentes Nachfassen', desc: 'Mehrstufige Sequenzen, die jeden Lead pflegen, bis er kauft oder sich abmeldet.' },
      ]}
      beforeAfter={[
        { before: 'Leads gehen durch die Lappen', after: 'Jeder Lead wird automatisch erfasst und getaggt' },
        { before: 'Stunden für manuelle Nachfass-Aktionen', after: 'Sequenzen laufen 24/7 ohne menschlichen Eingriff' },
        { before: 'Inkonsistente Kundenkommunikation', after: 'Jeder Kunde erhält dasselbe professionelle Erlebnis' },
        { before: 'Nichterscheinen und vergessene Buchungen', after: 'Automatische Erinnerungen reduzieren Nichterscheinen um 60 %' },
      ]}
      deliverables={[
        {
          category: 'Lead-Erfassung',
          items: ['Formular-zu-CRM-Integration', 'Lead-Bewertung & Tagging', 'Sofortbenachrichtigung einrichten', 'Quellenverfolgung & Attribution'],
        },
        {
          category: 'E-Mail & Messaging',
          items: ['Willkommens-E-Mail-Sequenz', 'Mehrstufige Nurture-Flows (5–7 E-Mails)', 'WhatsApp-Nachfass-Integration', 'Reaktivierungskampagnen'],
        },
        {
          category: 'Buchung & Terminplanung',
          items: ['Kalender-Integration & Automation', 'Terminbestätigungs-Flows', 'Erinnerungssequenzen (24h, 1h)', 'Nachfass-Automation bei Nichterscheinen'],
        },
        {
          category: 'Nach dem Kauf',
          items: ['Bewertungsanfragen automatisieren', 'Upsell-/Cross-Sell-Trigger', 'Empfehlungsanfrage-Flows', 'Treue- & Wiederbucher-Kampagnen'],
        },
        {
          category: 'E-Commerce',
          items: ['Warenkorbabbruch-Rückgewinnung', 'Bestellbestätigungssequenzen', 'Versandstatus-Automation', 'Kaufnachfolge-Bewertungsanfragen'],
        },
        {
          category: 'Reporting & Monitoring',
          items: ['Automation-Performance-Dashboard', 'Öffnungs-/Klickrate-Tracking', 'Konversionstrichter-Reporting', '30 Tage Support & Optimierung'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Reservierungen automatisch bestätigen, Menülinks senden und nach jedem Besuch Google-Bewertungen anfragen.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Automatische Angebote, Buchungsbestätigungen und Erinnerungen für wiederkehrende Termine.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Terminerinnerungen, Wiederbuchungs-Flows und Treueprogramm-Trigger nach jedem 5. Besuch.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Patientenaufnahmeformulare, Terminerinnerungen und Nachsorge-Sequenzen nach dem Besuch.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Warenkorbabbruch-Flows, Bestellupdates, Bewertungsanfragen und Upsell-Sequenzen.' },
      ]}
      process={[
        { step: '01', title: 'Erstgespräch', desc: 'Wir analysieren Ihren aktuellen Workflow und identifizieren jeden manuellen Schritt, den wir automatisieren können.' },
        { step: '02', title: 'Flow-Design', desc: 'Wir entwerfen die gesamte Automation-Architektur und holen Ihre Freigabe ein, bevor wir bauen.' },
        { step: '03', title: 'Aufbau & Verbindung', desc: 'Wir bauen alle Flows, verbinden Ihre Tools und schreiben jede E-Mail und Nachricht.' },
        { step: '04', title: 'Test & Launch', desc: 'Wir testen jeden Trigger, jeden Flow und jeden Grenzfall, bevor wir live gehen.' },
        { step: '05', title: 'Optimierung', desc: 'Monatliche Check-ins zur Überprüfung von Öffnungsraten, Konversionsdaten und Leistungsverbesserung.' },
      ]}
      packages={[
        {
          name: 'Automation Starter',
          price: 'ab €1.500',
          timeline: 'Lieferung in 7 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Lead-Erfassung zu CRM-Integration',
            '3-stufige Willkommens-E-Mail-Sequenz',
            'Terminbestätigungs-Flow',
            'Basis-Erinnerungsautomation',
            '30 Tage Support',
          ],
        },
        {
          name: 'Automation Growth',
          price: 'ab €3.000',
          timeline: 'Lieferung in 10 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-blue-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Mehrkanalige Sequenzen (E-Mail + WhatsApp)',
            '7-stufiger Nurture-Flow',
            'Warenkorb-/Wiederbuchungs-Automation',
            'Bewertungsanfragen-Automation',
            'Google Analytics Integration',
            '60 Tage Support & Optimierung',
          ],
        },
        {
          name: 'Automation Scale',
          price: 'ab €5.000',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Komplettsystem',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          deliverables: [
            'Alles aus Growth',
            'Vollständige Funnel-Automation (10+ Flows)',
            'Fortgeschrittene Segmentierung & Personalisierung',
            'CRM-Pipeline-Automation',
            'Upsell- & Empfehlungssequenzen',
            'Monatliches Performance-Reporting',
            '90 Tage dedizierter Support',
          ],
        },
      ]}
      faqs={[
        { q: 'Welche Tools verwenden Sie für die Automation?', a: 'Wir arbeiten mit Make.com, Zapier, GoHighLevel, Klaviyo, ActiveCampaign und mehr — was am besten zu Ihrem bestehenden System und Budget passt.' },
        { q: 'Brauche ich bereits ein CRM?', a: 'Nein. Falls Sie noch kein CRM haben, empfehlen wir eines und richten es als Teil des Projekts ein. Dies ist in allen Paketen enthalten.' },
        { q: 'Können Sie WhatsApp-Nachrichten automatisieren?', a: 'Ja, wir integrieren die WhatsApp Business API über Plattformen wie Twilio oder 360dialog für automatisierte, personalisierte Nachrichten.' },
        { q: 'Wann gehen die Automationen live?', a: 'Starter-Systeme sind innerhalb von 7 Tagen live. Vollständige Systeme gehen innerhalb von 14 Tagen live, inklusive Tests und Optimierung.' },
        { q: 'Was passiert, wenn nach dem Launch etwas nicht funktioniert?', a: 'Alle Pakete beinhalten Support nach dem Launch von 30 bis 90 Tagen. Wir überwachen, beheben und optimieren jeden Automation-Flow.' },
      ]}
      relatedServices={[
        { href: '/services/crm-email', label: 'CRM + E-Mail-Sequenzen' },
        { href: '/services/ai-chatbot', label: 'KI-Chatbot' },
        { href: '/services/funnels', label: 'Website + Funnel-Aufbau' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
      ]}
      extraSection={diagramSection}
    />
  );
}
