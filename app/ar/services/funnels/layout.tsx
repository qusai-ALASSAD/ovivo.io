import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "تصميم المواقع وصفحات الهبوط ومسارات التحويل | OVIVO.IO",
  description: "تصميم مواقع احترافية وصفحات هبوط ومسارات تسويقية تناسب أهداف نشاطك التجاري. اطلب عرضاً مخصصاً من OVIVO.IO.",
  alternates: { canonical: "/ar/services/funnels/", languages: {"de-DE":"/services/funnels/","en":"/en/services/funnels/","ar":"/ar/services/funnels/","x-default":"/services/funnels/"} },
  openGraph: {
    type: 'website',
    title: "تصميم المواقع وصفحات الهبوط ومسارات التحويل | OVIVO.IO",
    description: "تصميم مواقع احترافية وصفحات هبوط ومسارات تسويقية تناسب أهداف نشاطك التجاري. اطلب عرضاً مخصصاً من OVIVO.IO.",
    url: "https://ovivo.io/ar/services/funnels/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
