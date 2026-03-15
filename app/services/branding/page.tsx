'use client';

import { ServicePageLayout } from '@/components/service-page-layout';
import { Palette, Star, TrendingUp, Users } from 'lucide-react';

const heroImage = (
  <div className="glass rounded-2xl p-6 border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.08)]">
    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">Brand System</p>

    <div className="flex items-center gap-4 mb-6 p-4 bg-white/[0.03] rounded-xl border border-white/10">
      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
        A
      </div>
      <div>
        <div className="text-base font-bold text-white">Aria Salon</div>
        <div className="text-xs text-gray-500 mt-0.5">Premium Hair & Beauty Studio</div>
        <div className="flex gap-1 mt-2">
          {['#1E40AF', '#3B82F6', '#BFDBFE', '#0F172A', '#F8FAFC'].map((color) => (
            <div key={color} className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Typography</p>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Playfair Display</div>
        <div className="text-sm text-gray-400">Inter — for body text & UI</div>
      </div>
    </div>

    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Content Calendar — Week 1</p>
      <div className="space-y-2">
        {[
          { day: 'Mon', type: 'Before/After', platform: 'IG' },
          { day: 'Wed', type: 'Team Spotlight', platform: 'FB + IG' },
          { day: 'Fri', type: 'Weekend Offer', platform: 'Stories' },
        ].map((post) => (
          <div key={post.day} className="flex items-center gap-3 text-xs glass rounded-lg px-3 py-2 border-white/10">
            <span className="w-8 text-amber-400 font-bold">{post.day}</span>
            <span className="flex-1 text-gray-300">{post.type}</span>
            <span className="text-gray-600">{post.platform}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function BrandingPage() {
  return (
    <ServicePageLayout
      lang="de"
      badge="Markenidentität + Social-Media-Content"
      heroTitle="Premium wirken."
      heroGradient="Wahrgenommen werden."
      heroSubtitle="Wir entwickeln eine vollständige visuelle Identität und ein 30-Tage-Content-System, das Ihre Marke als führende Autorität in Ihrem Markt positioniert — und das dauerhaft."
      heroImage={heroImage}
      whyTitle="Warum Markenidentität Ihr wertvollstes Asset ist"
      whyItems={[
        { icon: Palette, title: 'Erster Eindruck entscheidet', desc: 'Kunden entscheiden in 0,05 Sekunden, ob sie Ihrer Marke vertrauen. Premium-Design macht diese Entscheidung leicht.' },
        { icon: TrendingUp, title: 'Premium-Positionierung = höhere Preise', desc: 'Eine professionelle Marke rechtfertigt höhere Preise und zieht bessere Kunden an, die nicht feilschen.' },
        { icon: Star, title: 'Konsistenz baut Vertrauen auf', desc: 'Konsistente Markenführung über alle Kanäle steigert den Umsatz laut Forbes um bis zu 23 %.' },
        { icon: Users, title: 'Content, der konvertiert', desc: '30 Tage vorgeplantem, markenkonforme Social-Media-Content, der Ihre Reichweite aufbaut und Anfragen generiert.' },
      ]}
      beforeAfter={[
        { before: 'Inkonsistente Optik, die unprofessionell wirkt', after: 'Kohärente Markenidentität, die Respekt einflößt' },
        { before: 'Keine Ahnung, was auf Social Media posten', after: 'Vollständiger 30-Tage-Content-Kalender zur Umsetzung bereit' },
        { before: 'Preiswettbewerb, weil die Marke generisch aussieht', after: 'Premium-Positionierung, die höhere Preise rechtfertigt' },
        { before: 'DIY-Logo, das das Unternehmen nicht repräsentiert', after: 'Professionelle Identität, die den idealen Kunden anzieht' },
      ]}
      deliverables={[
        {
          category: 'Logo & Identität',
          items: ['Primärlogo (3 Varianten)', 'Farbpalette (primär + sekundär)', 'Typografiesystem (2 Schriften)', 'Markenmuster oder -textur', 'Brand-Style-Guide PDF'],
        },
        {
          category: 'Business-Assets',
          items: ['Visitenkartendesign', 'E-Mail-Signatur-Template', 'Briefkopf & Rechnungsvorlage', 'Präsentationsvorlage', 'Digitales Banner-Set'],
        },
        {
          category: 'Social Media',
          items: ['Profilfoto & Cover-Design für 3 Plattformen', 'Story-Highlight-Cover (12 Icons)', 'Post-Template-Designs (5 Formate)', 'Bio & Caption-Tonalitätsleitfaden'],
        },
        {
          category: 'Content-Kalender',
          items: ['30-Tage-Content-Plan', 'Caption-Texterstellung für 30 Posts', 'Hashtag-Strategie pro Plattform', 'Beste-Posting-Zeit-Zeitplan', 'Content-Säulen-Framework'],
        },
        {
          category: 'Fotografie-Direktion',
          items: ['Moodboard für Markenfotografie', 'Shot-List für DIY oder professionelles Shooting', 'Bearbeitungsstil-Leitfaden & Presets', 'Bildquellen-Leitfaden (Stock)'],
        },
        {
          category: 'Brand-Guidelines',
          items: ["Dos & Don'ts Dokument", 'Logo-Nutzungsregeln', 'Markenstimme & Tonalitätsleitfaden', 'Social-Media-Posting-Richtlinien'],
        },
      ]}
      useCases={[
        { industry: 'Restaurants', icon: '🍽️', example: 'Premium-Menüdesign, Speisefotografie-Direktion und Content-Kalender mit Gerichten, Geschichten und Aktionen.' },
        { industry: 'Reinigungsunternehmen', icon: '🧹', example: 'Professionelle Identität, die sich von Wettbewerbern abhebt, mit Content der Vorher/Nachher-Ergebnisse und Teamprofile zeigt.' },
        { industry: 'Friseursalons', icon: '✂️', example: 'Luxuriöse visuelle Identität mit Vorher/Nachher-Content, Stylist-Spotlights und Werbekampagnen-Templates.' },
        { industry: 'Kliniken', icon: '🏥', example: 'Vertrauensaufbauende Markenidentität mit Patientenedukations-Content, Team-Vorstellungen und Behandlungsergebnis-Posts.' },
        { industry: 'E-Commerce', icon: '🛍️', example: 'Produktfotografie-Direktion, Unboxing-Content-Templates und ein 30-Tage-Launch-Content-Kalender.' },
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'Wir führen eine Marken-Discovery-Session durch, um Ihre Werte, Zielgruppe, Wettbewerber und Positionierungsziele zu verstehen.' },
        { step: '02', title: 'Konzept', desc: 'Wir präsentieren 2 Markenrichtungskonzepte — Moodboard, Farbrichtung und Logo-Konzepte — für Ihr Feedback.' },
        { step: '03', title: 'Design', desc: 'Vollständiges Identitätssystem entwickelt: Logo, Farben, Schriften, Templates und alle digitalen Assets.' },
        { step: '04', title: 'Content-Plan', desc: '30-Tage-Content-Kalender geschrieben, formatiert und mit Umsetzungsanweisungen geliefert.' },
        { step: '05', title: 'Übergabe', desc: 'Alle Dateien in jedem Format geliefert. Vollständiger Brand-Guide bereitgestellt. Schulung zur Konsistenzerhaltung.' },
      ]}
      packages={[
        {
          name: 'Marke Starter',
          price: 'ab €1.500',
          timeline: 'Lieferung in 10 Tagen',
          badge: 'Starter',
          badgeClass: 'bg-white/10 text-gray-300 border-white/20',
          deliverables: [
            'Logo-Design (2 Varianten)',
            'Marken-Farbpalette & Schriften',
            'Brand-Style-Guide',
            'Social-Media-Profil-Assets',
            '2-Wochen-Content-Kalender',
          ],
        },
        {
          name: 'Marke Growth',
          price: 'ab €3.000',
          timeline: 'Lieferung in 14 Tagen',
          badge: 'Beliebteste Wahl',
          badgeClass: 'bg-amber-500 text-white border-transparent',
          highlighted: true,
          deliverables: [
            'Alles aus Starter',
            'Vollständiges Identitätssystem (alle Assets)',
            'Visitenkarte + Geschäftspapier',
            'Social-Media-Post-Templates (5)',
            '30-Tage-Content-Kalender',
            'Caption-Texterstellung für 30 Posts',
            'Markenstimme-Leitfaden',
          ],
        },
        {
          name: 'Marke Scale',
          price: 'ab €5.500',
          timeline: 'Lieferung in 21 Tagen',
          badge: 'Premium',
          badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          deliverables: [
            'Alles aus Growth',
            'Fotografie-Direktion & Moodboard',
            'Vollständige Präsentationsvorlage',
            'Verpackungsdesign (falls zutreffend)',
            '90-Tage-Content-Kalender',
            'Monatlicher Content-Erstellungs-Support',
            'Markenbotschafter-Richtlinien',
          ],
        },
      ]}
      faqs={[
        { q: 'Wie viele Logo-Überarbeitungen sind inklusive?', a: 'Alle Pakete beinhalten unbegrenzte Überarbeitungen der gewählten Richtung. Wir präsentieren 2 Konzepte und verfeinern Ihr ausgewähltes, bis Sie vollständig zufrieden sind.' },
        { q: 'Schreiben Sie die Social-Media-Captions?', a: 'Ja. Die Growth- und Scale-Pakete beinhalten professionell geschriebene Captions für jeden Post in Ihrem Content-Kalender, abgestimmt auf Ihre Markenstimme.' },
        { q: 'Welche Dateiformate werden geliefert?', a: 'Sie erhalten alle Dateien in AI, EPS, SVG, PDF, PNG und JPEG. Alles ist druck- und webfertig.' },
        { q: 'Können Sie eine bestehende Marke auffrischen?', a: 'Absolut. Wir bieten Markenauffrischungs-Services an, bei denen wir Ihre bestehende Identität modernisieren, während wir den aufgebauten Wiedererkennungswert erhalten. Preise sind ähnlich wie bei neuen Marken.' },
        { q: 'Verwalten Sie auch das Social-Media-Posting?', a: 'Der Content-Kalender gibt Ihnen alles, was Sie brauchen, um selbst zu posten. Für laufendes Social-Media-Management (Posting + Engagement) bieten wir monatliche Retainer-Pakete als Add-on an.' },
      ]}
      relatedServices={[
        { href: '/services/funnels', label: 'Website + Funnel-Aufbau' },
        { href: '/services/ads', label: 'Ads & Performance Marketing' },
        { href: '/services/crm-email', label: 'CRM + E-Mail-Sequenzen' },
      ]}
    />
  );
}
