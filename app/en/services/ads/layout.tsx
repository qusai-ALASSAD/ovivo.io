import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Google Ads & Social Advertising Services | OVIVO.IO",
  description: "Tailored Google Ads and social media advertising campaigns, performance tracking and optimization. Contact OVIVO.IO for a quote.",
  alternates: { canonical: "/en/services/ads/", languages: {"de-DE":"/services/ads/","en":"/en/services/ads/","ar":"/ar/services/ads/","x-default":"/services/ads/"} },
  openGraph: {
    type: 'website',
    title: "Google Ads & Social Advertising Services | OVIVO.IO",
    description: "Tailored Google Ads and social media advertising campaigns, performance tracking and optimization. Contact OVIVO.IO for a quote.",
    url: "https://ovivo.io/en/services/ads/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
