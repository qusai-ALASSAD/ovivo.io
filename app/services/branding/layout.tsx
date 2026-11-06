import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Branding, Corporate Design & Content-Erstellung | OVIVO.IO",
  description: "Markenidentität, Grafikdesign und digitale Inhalte für Unternehmen. Individuelle Kreativleistungen bei OVIVO.IO anfragen.",
  alternates: { canonical: "/services/branding/", languages: {"de-DE":"/services/branding/","en":"/en/services/branding/","ar":"/ar/services/branding/","x-default":"/services/branding/"} },
  openGraph: {
    type: 'website',
    title: "Branding, Corporate Design & Content-Erstellung | OVIVO.IO",
    description: "Markenidentität, Grafikdesign und digitale Inhalte für Unternehmen. Individuelle Kreativleistungen bei OVIVO.IO anfragen.",
    url: "https://ovivo.io/services/branding/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
