import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CRM Integration & Email Automation Services | OVIVO.IO",
  description: "Connect CRM systems, organize customer inquiries and automate email workflows with tailored solutions from OVIVO.IO.",
  alternates: { canonical: "/en/services/crm-email/", languages: {"de-DE":"/services/crm-email/","en":"/en/services/crm-email/","ar":"/ar/services/crm-email/","x-default":"/services/crm-email/"} },
  openGraph: {
    type: 'website',
    title: "CRM Integration & Email Automation Services | OVIVO.IO",
    description: "Connect CRM systems, organize customer inquiries and automate email workflows with tailored solutions from OVIVO.IO.",
    url: "https://ovivo.io/en/services/crm-email/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
