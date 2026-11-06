import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Webdesign & Conversion-Funnels für Unternehmen | OVIVO.IO",
  description: "Professionelle Websites, Landingpages und Funnels mit Fokus auf Benutzerfreundlichkeit und Anfragen. Individuelles Angebot von OVIVO.IO.",
  alternates: { canonical: "/services/funnels/", languages: {"de-DE":"/services/funnels/","en":"/en/services/funnels/","ar":"/ar/services/funnels/","x-default":"/services/funnels/"} },
  openGraph: {
    type: 'website',
    title: "Webdesign & Conversion-Funnels für Unternehmen | OVIVO.IO",
    description: "Professionelle Websites, Landingpages und Funnels mit Fokus auf Benutzerfreundlichkeit und Anfragen. Individuelles Angebot von OVIVO.IO.",
    url: "https://ovivo.io/services/funnels/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
