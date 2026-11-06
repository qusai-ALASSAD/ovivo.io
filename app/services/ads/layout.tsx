import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Google Ads & Social Media Marketing für Unternehmen | OVIVO.IO",
  description: "Individuelle Google Ads und Social Ads Kampagnen mit Tracking und laufender Optimierung. Beratung und Angebot bei OVIVO.IO.",
  alternates: { canonical: "/services/ads/", languages: {"de-DE":"/services/ads/","en":"/en/services/ads/","ar":"/ar/services/ads/","x-default":"/services/ads/"} },
  openGraph: {
    type: 'website',
    title: "Google Ads & Social Media Marketing für Unternehmen | OVIVO.IO",
    description: "Individuelle Google Ads und Social Ads Kampagnen mit Tracking und laufender Optimierung. Beratung und Angebot bei OVIVO.IO.",
    url: "https://ovivo.io/services/ads/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
