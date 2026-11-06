import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "KI-Automation & n8n für Unternehmen in Deutschland | OVIVO.IO",
  description: "KI-Chatbots, n8n Workflows, CRM-Automation und individuelle Software für Unternehmen. Prozesse automatisieren mit OVIVO.IO.",
  alternates: { canonical: '/', languages: { 'de-DE': '/', 'en': '/en/', 'ar': '/ar/', 'x-default': '/' } },
  openGraph: { title: "KI-Automation & n8n für Unternehmen in Deutschland | OVIVO.IO", description: "KI-Chatbots, n8n Workflows, CRM-Automation und individuelle Software für Unternehmen. Prozesse automatisieren mit OVIVO.IO.", url: 'https://ovivo.io/' },
};

import { HomePage } from '@/components/home-page';

export default function Page() {
  return <HomePage lang="de" />;
}
