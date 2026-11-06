import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KI-Chatbot für Unternehmen & Kundenservice | OVIVO.IO",
  description: "Individuelle KI-Chatbots für Kundenanfragen, Support und Terminprozesse. Integration nach Bedarf – Angebot bei OVIVO.IO anfragen.",
  alternates: { canonical: "/services/ai-chatbot/", languages: {"de-DE":"/services/ai-chatbot/","en":"/en/services/ai-chatbot/","ar":"/ar/services/ai-chatbot/","x-default":"/services/ai-chatbot/"} },
  openGraph: {
    type: 'website',
    title: "KI-Chatbot für Unternehmen & Kundenservice | OVIVO.IO",
    description: "Individuelle KI-Chatbots für Kundenanfragen, Support und Terminprozesse. Integration nach Bedarf – Angebot bei OVIVO.IO anfragen.",
    url: "https://ovivo.io/services/ai-chatbot/",
    locale: "de_DE",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
