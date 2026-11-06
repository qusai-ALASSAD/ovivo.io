import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CRM-Integration & E-Mail-Automation für Unternehmen | OVIVO.IO",
  description: "CRM-Systeme verbinden, Kundenanfragen strukturieren und E-Mail-Prozesse automatisieren. Individuelle Lösungen von OVIVO.IO.",
  alternates: { canonical: "/services/crm-email/", languages: {"de-DE":"/services/crm-email/","en":"/en/services/crm-email/","ar":"/ar/services/crm-email/","x-default":"/services/crm-email/"} },
  openGraph: {
    type: 'website',
    title: "CRM-Integration & E-Mail-Automation für Unternehmen | OVIVO.IO",
    description: "CRM-Systeme verbinden, Kundenanfragen strukturieren und E-Mail-Prozesse automatisieren. Individuelle Lösungen von OVIVO.IO.",
    url: "https://ovivo.io/services/crm-email/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
