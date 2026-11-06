import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Automation & n8n Workflows for Businesses | OVIVO.IO",
  description: "Streamline business processes with n8n workflows, AI assistants and tailored automation. Request a consultation with OVIVO.IO.",
  alternates: { canonical: "/en/services/automation/", languages: {"de-DE":"/services/automation/","en":"/en/services/automation/","ar":"/ar/services/automation/","x-default":"/services/automation/"} },
  openGraph: {
    type: 'website',
    title: "AI Automation & n8n Workflows for Businesses | OVIVO.IO",
    description: "Streamline business processes with n8n workflows, AI assistants and tailored automation. Request a consultation with OVIVO.IO.",
    url: "https://ovivo.io/en/services/automation/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
