import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "أتمتة الأعمال والذكاء الاصطناعي باستخدام n8n | OVIVO.IO",
  description: "حلول أتمتة مخصصة للشركات باستخدام n8n والمساعدين الأذكياء وربط الأنظمة. اطلب استشارة من OVIVO.IO.",
  alternates: { canonical: "/ar/services/automation/", languages: {"de-DE":"/services/automation/","en":"/en/services/automation/","ar":"/ar/services/automation/","x-default":"/services/automation/"} },
  openGraph: {
    type: 'website',
    title: "أتمتة الأعمال والذكاء الاصطناعي باستخدام n8n | OVIVO.IO",
    description: "حلول أتمتة مخصصة للشركات باستخدام n8n والمساعدين الأذكياء وربط الأنظمة. اطلب استشارة من OVIVO.IO.",
    url: "https://ovivo.io/ar/services/automation/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
