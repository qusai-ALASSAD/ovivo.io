import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Chatbots for Customer Service & Business | OVIVO.IO",
  description: "Custom AI chatbots for customer support, inquiries and appointments, tailored to your tools. Request a quote from OVIVO.IO.",
  alternates: { canonical: "/en/services/ai-chatbot/", languages: {"de-DE":"/services/ai-chatbot/","en":"/en/services/ai-chatbot/","ar":"/ar/services/ai-chatbot/","x-default":"/services/ai-chatbot/"} },
  openGraph: {
    type: 'website',
    title: "AI Chatbots for Customer Service & Business | OVIVO.IO",
    description: "Custom AI chatbots for customer support, inquiries and appointments, tailored to your tools. Request a quote from OVIVO.IO.",
    url: "https://ovivo.io/en/services/ai-chatbot/",
    locale: "en_US",
  },
};

export default function ServiceMetadataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
