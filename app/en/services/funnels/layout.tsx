import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Web Design & Conversion Funnels for Businesses | OVIVO.IO",
  description: "Professional websites, landing pages and conversion funnels tailored to your business goals. Get a custom quote from OVIVO.IO.",
  alternates: { canonical: "/en/services/funnels/", languages: {"de-DE":"/services/funnels/","en":"/en/services/funnels/","ar":"/ar/services/funnels/","x-default":"/services/funnels/"} },
  openGraph: {
    type: 'website',
    title: "Web Design & Conversion Funnels for Businesses | OVIVO.IO",
    description: "Professional websites, landing pages and conversion funnels tailored to your business goals. Get a custom quote from OVIVO.IO.",
    url: "https://ovivo.io/en/services/funnels/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
