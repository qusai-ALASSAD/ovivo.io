import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Branding, Corporate Identity & Content Creation | OVIVO.IO",
  description: "Custom brand identity, design and digital content for businesses. Request a tailored branding proposal from OVIVO.IO.",
  alternates: { canonical: "/en/services/branding/", languages: {"de-DE":"/services/branding/","en":"/en/services/branding/","ar":"/ar/services/branding/","x-default":"/services/branding/"} },
  openGraph: {
    type: 'website',
    title: "Branding, Corporate Identity & Content Creation | OVIVO.IO",
    description: "Custom brand identity, design and digital content for businesses. Request a tailored branding proposal from OVIVO.IO.",
    url: "https://ovivo.io/en/services/branding/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
