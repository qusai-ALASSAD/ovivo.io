import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ربط أنظمة CRM وأتمتة البريد الإلكتروني | OVIVO.IO",
  description: "ربط أنظمة إدارة العملاء وتنظيم الطلبات وأتمتة رسائل البريد حسب احتياجات شركتك مع OVIVO.IO.",
  alternates: { canonical: "/ar/services/crm-email/", languages: {"de-DE":"/services/crm-email/","en":"/en/services/crm-email/","ar":"/ar/services/crm-email/","x-default":"/services/crm-email/"} },
  openGraph: {
    type: 'website',
    title: "ربط أنظمة CRM وأتمتة البريد الإلكتروني | OVIVO.IO",
    description: "ربط أنظمة إدارة العملاء وتنظيم الطلبات وأتمتة رسائل البريد حسب احتياجات شركتك مع OVIVO.IO.",
    url: "https://ovivo.io/ar/services/crm-email/",
    locale: "ar_AR",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
