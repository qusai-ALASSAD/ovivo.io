import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Kontakt & KI-Automation Beratung | OVIVO.IO",
  description: "Kontaktieren Sie OVIVO.IO für KI-Automation, n8n-Workflows, intelligente Assistenten und individuelle Softwarelösungen.",
  alternates: { canonical: '/contact/', languages: { 'de-DE': '/contact/', 'en': '/en/contact/', 'ar': '/ar/contact/', 'x-default': '/contact/' } },
  openGraph: { title: "Kontakt & KI-Automation Beratung | OVIVO.IO", description: "Kontaktieren Sie OVIVO.IO für KI-Automation, n8n-Workflows, intelligente Assistenten und individuelle Softwarelösungen.", url: 'https://ovivo.io/contact/' },
};

import { ContactPage } from '@/components/contact-page';

export default function Page() {
  return <ContactPage lang="de" />;
}
