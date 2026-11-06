import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "إعلانات Google والتسويق عبر منصات التواصل | OVIVO.IO",
  description: "حملات إعلانية مخصصة على Google ومنصات التواصل مع قياس النتائج وتحسين الأداء. اطلب عرض سعر من OVIVO.IO.",
  alternates: { canonical: "/ar/services/ads/", languages: {"de-DE":"/services/ads/","en":"/en/services/ads/","ar":"/ar/services/ads/","x-default":"/services/ads/"} },
  openGraph: {
    type: 'website',
    title: "إعلانات Google والتسويق عبر منصات التواصل | OVIVO.IO",
    description: "حملات إعلانية مخصصة على Google ومنصات التواصل مع قياس النتائج وتحسين الأداء. اطلب عرض سعر من OVIVO.IO.",
    url: "https://ovivo.io/ar/services/ads/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
