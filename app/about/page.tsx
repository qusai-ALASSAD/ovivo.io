import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Über OVIVO.IO | KI-Automatisierung für Unternehmen",
  description: "Erfahren Sie, wie OVIVO.IO KI-Chatbots, n8n-Workflows und individuelle Software für Unternehmen entwickelt.",
  alternates: { canonical: '/about/', languages: { 'de-DE':'/about/', 'en':'/en/about/', 'ar':'/ar/about/', 'x-default':'/about/' } },
  openGraph: { title:"Über OVIVO.IO | KI-Automatisierung für Unternehmen", description:"Erfahren Sie, wie OVIVO.IO KI-Chatbots, n8n-Workflows und individuelle Software für Unternehmen entwickelt.", url:'https://ovivo.io/about/' },
};

import { AboutPage } from '@/components/about-page';

export default function Page() {
  return <AboutPage lang="de" />;
}
