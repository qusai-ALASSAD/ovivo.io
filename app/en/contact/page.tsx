import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Contact & AI Automation Consultation | OVIVO.IO",
  description: "Contact OVIVO.IO for AI automation, n8n workflows, assistants and custom business software.",
  alternates: { canonical: '/en/contact/', languages: { 'de-DE': '/contact/', 'en': '/en/contact/', 'ar': '/ar/contact/', 'x-default': '/contact/' } },
  openGraph: { title: "Contact & AI Automation Consultation | OVIVO.IO", description: "Contact OVIVO.IO for AI automation, n8n workflows, assistants and custom business software.", url: 'https://ovivo.io/en/contact/' },
};

import { ContactPage } from '@/components/contact-page';

export default function Page() {
  return <ContactPage lang="en" />;
}
