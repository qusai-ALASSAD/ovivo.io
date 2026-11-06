import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KI-Automation & n8n Workflows für Unternehmen | OVIVO.IO",
  description: "Geschäftsprozesse mit n8n, KI-Assistenten und individuellen Automationen optimieren. Jetzt unverbindliche Beratung bei OVIVO.IO anfragen.",
  alternates: { canonical: "/services/automation/", languages: {"de-DE":"/services/automation/","en":"/en/services/automation/","ar":"/ar/services/automation/","x-default":"/services/automation/"} },
  openGraph: {
    type: 'website',
    title: "KI-Automation & n8n Workflows für Unternehmen | OVIVO.IO",
    description: "Geschäftsprozesse mit n8n, KI-Assistenten und individuellen Automationen optimieren. Jetzt unverbindliche Beratung bei OVIVO.IO anfragen.",
    url: "https://ovivo.io/services/automation/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
