import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

const postData: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  intro: string;
  sections: { heading: string; body: string; list?: string[] }[];
}> = {
  'restaurant-automation-guide': {
    title: 'Wie Restaurants KI-Automation nutzen, um Tische zu füllen — 2025',
    category: 'Automation',
    date: '20.01.2025',
    readTime: '8 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Vorausschauende Restaurantbesitzer setzen KI-Chatbots und Automation ein, um Reservierungen um bis zu 40 % zu steigern — ohne zusätzliches Personal. Dieser Leitfaden zeigt, wie das funktioniert.',
    sections: [
      {
        heading: 'Das Problem: Verpasste Reservierungen',
        body: 'Viele Restaurants verlieren potenzielle Gäste, weil Anfragen außerhalb der Öffnungszeiten oder in stoßzeiten nicht sofort beantwortet werden. Jede unbeantwortete Nachricht ist ein verlorener Tisch.',
      },
      {
        heading: 'Lösung: KI-gestützte Reservierungsflows',
        body: 'Ein KI-Chatbot kann Reservierungsanfragen rund um die Uhr entgegennehmen, verfügbare Zeiten anzeigen und Buchungen sofort bestätigen — über Website, WhatsApp und Instagram.',
        list: [
          'Sofortige Antwort auf jede Anfrage — auch nachts',
          'Automatische Bestätigungs- und Erinnerungs-SMS',
          'Direkte Integration in Ihren bestehenden Kalender',
          'Upselling von Sondermenüs und Events',
        ],
      },
      {
        heading: 'Praxisbeispiel: Bistro am Markt',
        body: 'Ein Bistro mit 60 Plätzen implementierte einen KI-Reservierungsbot auf ihrer Website und in WhatsApp. Innerhalb von 6 Wochen stieg die Auslastung am Wochenende von 72 % auf 94 %. Keine Einstellung neuer Mitarbeiter, keine Änderung des Menüs.',
      },
      {
        heading: 'So starten Sie',
        body: 'Der Einstieg ist einfacher als gedacht. Ein grundlegendes System ist innerhalb von 7 Tagen einsatzbereit. Wichtig ist, den richtigen Partner zu wählen, der Ihren Chatbot auf Ihre spezifische Karte, Öffnungszeiten und Prozesse trainiert.',
      },
    ],
  },
  'whatsapp-business-automation': {
    title: 'WhatsApp Business Automation: Der vollständige Leitfaden für Dienstleister',
    category: 'WhatsApp',
    date: '15.01.2025',
    readTime: '10 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'WhatsApp ist der meistgenutzte Messenger in Deutschland. Dienstleister, die automatisierte Sequenzen einsetzen, haben eine deutlich höhere Abschlussrate als die Konkurrenz.',
    sections: [
      {
        heading: 'Warum WhatsApp Automation funktioniert',
        body: 'WhatsApp-Nachrichten werden durchschnittlich innerhalb von 3 Minuten geöffnet — E-Mails brauchen Stunden. Wenn Sie innerhalb dieser Zeit reagieren (automatisch), gewinnen Sie den Auftrag.',
      },
      {
        heading: 'Die 3 wichtigsten Automation-Flows',
        body: 'Drei Flows decken 80 % der Kommunikation für Dienstleister ab:',
        list: [
          'Willkommens-Flow: Sofortige Antwort auf erste Kontaktaufnahme mit Infos und CTA',
          'Nachfass-Flow: Automatisches Follow-up nach 24h, 48h und 7 Tagen ohne Antwort',
          'Bewertungs-Flow: Automatische Anfrage nach erfolgreich abgeschlossenem Auftrag',
        ],
      },
      {
        heading: 'Technische Einrichtung',
        body: 'Sie benötigen ein WhatsApp Business API-Konto sowie ein CRM oder Automationstool wie GoHighLevel oder Make.com. Die Einrichtung dauert je nach Komplexität 3–7 Tage.',
      },
      {
        heading: 'Compliance & DSGVO',
        body: 'Wichtig: Nur Kunden, die aktiv Kontakt aufgenommen haben, dürfen über WhatsApp kontaktiert werden. Stellen Sie sicher, dass Opt-In und Opt-Out klar kommuniziert werden.',
      },
    ],
  },
  'ai-chatbot-for-local-business': {
    title: '5 Wege, wie ein KI-Chatbot Ihr lokales Unternehmen transformiert',
    category: 'KI-Chatbot',
    date: '10.01.2025',
    readTime: '7 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Lokale Unternehmen konkurrieren heute mit großen Marken um dieselben Kunden. Ein gut trainierter KI-Chatbot gleicht diesen Nachteil vollständig aus.',
    sections: [
      {
        heading: '1. FAQ-Beantwortung — 24/7',
        body: 'Öffnungszeiten, Preise, Parkplätze, Anfahrt — diese Fragen stellen Kunden täglich. Ein Chatbot beantwortet sie sofort, ohne Personalaufwand.',
      },
      {
        heading: '2. Terminbuchung im Gespräch',
        body: 'Kunden können direkt im Chat einen Termin buchen. Der Chatbot prüft Verfügbarkeiten, bestätigt die Buchung und sendet Erinnerungen — vollautomatisch.',
      },
      {
        heading: '3. Lead-Qualifizierung',
        body: 'Bevor ein Interessent zu Ihnen durchdringt, qualifiziert der Chatbot ihn: Budget, Zeitrahmen, genaue Anforderungen. Sie sprechen nur noch mit ernsthaften Interessenten.',
        list: [
          'Was ist Ihr Hauptanliegen?',
          'Wann möchten Sie starten?',
          'Haben Sie bereits ein Budget?',
        ],
      },
      {
        heading: '4. After-Sales Kommunikation',
        body: 'Nach einem Kauf oder Besuch kann der Chatbot automatisch nach Feedback fragen, eine Bewertung anfragen und passende Folgeprodukte empfehlen.',
      },
      {
        heading: '5. Mehrsprachige Unterstützung',
        body: 'Für Unternehmen in Ballungsräumen: Ein KI-Chatbot kann in mehreren Sprachen kommunizieren und so eine breitere Zielgruppe ansprechen.',
      },
    ],
  },
  'crm-for-small-business': {
    title: 'CRM für kleine Unternehmen: Welches System passt zu Ihnen 2025?',
    category: 'CRM',
    date: '05.01.2025',
    readTime: '12 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Ein CRM-System ist die Grundlage für skaliertes Wachstum. Aber welches System ist das Richtige für Ihr Unternehmen? Hier ist ein ehrlicher Vergleich der beliebtesten Optionen.',
    sections: [
      {
        heading: 'Was ein CRM wirklich leisten muss',
        body: 'Für kleine Unternehmen sind drei Dinge entscheidend: Einfachheit in der Bedienung, gute Automation-Funktionen und eine Integration mit bestehenden Tools wie E-Mail und WhatsApp.',
      },
      {
        heading: 'GoHighLevel — Bestes All-in-One für Dienstleister',
        body: 'GoHighLevel vereint CRM, E-Mail-Marketing, SMS, Funnels, Kalender und Automatisierungen in einem System. Ideal für Agenturen, Coaches und lokale Dienstleister.',
        list: [
          'Vollständiges Marketing-Automation-Stack',
          'Pipeline-Management mit Drag & Drop',
          'Native WhatsApp & SMS Integration',
          'Ab ca. $97/Monat',
        ],
      },
      {
        heading: 'HubSpot — Bestes für wachsende Teams',
        body: 'HubSpot hat eine kostenlose Einstiegsvariante und skaliert bis zu Enterprise. Besonders stark bei E-Mail-Marketing und Sales-Pipeline-Tracking.',
      },
      {
        heading: 'Pipedrive — Bestes für Sales-fokussierte Teams',
        body: 'Pipedrive ist besonders intuitiv und auf den Verkaufsprozess ausgerichtet. Ideal für Unternehmen mit aktivem Outbound-Sales.',
      },
      {
        heading: 'Unsere Empfehlung',
        body: 'Für die meisten Dienstleister unter €5M Umsatz empfehlen wir GoHighLevel. Es bietet die meisten Funktionen für den Preis und lässt sich vollständig auf Ihre Prozesse anpassen.',
      },
    ],
  },
  'google-ads-for-restaurants': {
    title: 'Google Ads für Restaurants: Mehr Buchungen ohne Budgetverschwendung',
    category: 'Ads',
    date: '20.12.2024',
    readTime: '9 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Viele Restaurants verbrennen Budget mit ineffizienten Google Ads-Kampagnen. Dieser Leitfaden zeigt, wie man es richtig macht — auch mit kleinem Budget.',
    sections: [
      {
        heading: 'Das häufigste Fehler: Zu breite Zielgruppen',
        body: 'Restaurants schalten Ads für zu allgemeine Keywords und zahlen für Klicks aus Städten, die nie bei ihnen essen würden. Lokales Targeting ist entscheidend.',
      },
      {
        heading: 'Die richtigen Keywords für Restaurants',
        body: 'Konzentrieren Sie sich auf standortbezogene Keywords und spezifische Suchanfragen:',
        list: [
          '"Restaurant [Stadtname]" und "[Küche] Restaurant in [Stadtname]"',
          '"Tisch reservieren [Stadtname]"',
          '"Restaurant für Geburtstag [Stadtname]"',
          '"Mittagessen [Bezirk]"',
        ],
      },
      {
        heading: 'Budget richtig einsetzen',
        body: 'Selbst mit €10–15 pro Tag können Sie messbare Ergebnisse erzielen, wenn Sie auf die richtigen Keywords und Zeiten setzen. Wochenenden und Feiertage verdienen mehr Budget.',
      },
      {
        heading: 'Konversionstracking ist Pflicht',
        body: 'Ohne Tracking wissen Sie nicht, welche Anzeigen Reservierungen bringen. Richten Sie Konversionsziele ein: Telefonanrufe, Formularabsendungen, Buchungsbestätigungen.',
      },
      {
        heading: 'Landing Page statt Homepage',
        body: 'Schicken Sie Ihre Anzeigen-Klicks nie auf die Startseite. Erstellen Sie eine dedizierte Buchungsseite mit einem klaren CTA und allem, was Gäste brauchen, um zu buchen.',
      },
    ],
  },
  'branding-for-service-businesses': {
    title: 'Warum Ihre Marke Kunden verliert — und wie Sie das beheben',
    category: 'Branding',
    date: '15.12.2024',
    readTime: '11 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Potenzielle Kunden urteilen in 0,05 Sekunden über Ihre Marke. Ein unprofessioneller Auftritt kostet Sie jeden Tag Aufträge — oft ohne, dass Sie es merken.',
    sections: [
      {
        heading: 'Was Branding wirklich bedeutet',
        body: 'Branding ist nicht nur ein Logo. Es ist die Gesamtheit aller visuellen und kommunikativen Signale, die Ihr Unternehmen aussendet — vom Logo über die Website bis zur Art, wie Sie auf Anfragen antworten.',
      },
      {
        heading: 'Die 4 häufigsten Branding-Fehler',
        body: 'Diese Fehler sind in fast jedem kleinen Unternehmen zu finden:',
        list: [
          'Inkonsistente Farben und Schriften auf verschiedenen Kanälen',
          'Ein DIY-Logo, das nicht professionell wirkt',
          'Kein einheitlicher Ton in Texten und Social-Media-Posts',
          'Fehlende oder veraltete Profilbilder auf Social Media',
        ],
      },
      {
        heading: 'Wie Premium-Branding den Preis rechtfertigt',
        body: 'Unternehmen mit professionellem Branding können höhere Preise verlangen — nicht weil sie besser sind, sondern weil sie so wahrgenommen werden. Studien zeigen, dass konsistentes Branding den Umsatz um bis zu 23 % steigern kann.',
      },
      {
        heading: 'Der erste Schritt: Marken-Audit',
        body: 'Schauen Sie sich alle Berührungspunkte Ihrer Marke an: Website, Social Media, Visitenkarte, E-Mail-Signatur, Fahrzeugbeschriftung. Sind sie konsistent? Repräsentieren sie, wofür Sie stehen?',
      },
      {
        heading: 'Professionelle Marke in 14 Tagen',
        body: 'Eine vollständige Markenidentität — Logo, Farbpalette, Typografie, Social-Media-Assets und Content-Kalender — ist in 14 Tagen realisierbar. Die Investition amortisiert sich durch höhere Abschlussraten oft innerhalb von Wochen.',
      },
    ],
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postData[params.slug];

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Artikel nicht gefunden</h1>
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Zurück zum Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/6 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Blog
          </Link>

          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight sm:text-4xl mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
            <span>{post.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              {post.intro}
            </p>

            {post.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-white mt-10 mb-4">{section.heading}</h2>
                <p className="text-gray-400 leading-relaxed">{section.body}</p>
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 glass rounded-2xl p-8 text-center border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-3">
              Bereit, das umzusetzen?
            </h3>
            <p className="text-gray-400 mb-6">
              Ovivo hilft Ihnen, KI und Automation in Ihrem Unternehmen einzusetzen — mit klarem ROI und in wenigen Wochen.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Kostenlos beraten lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl glass border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-all"
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
