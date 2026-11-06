import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Automation, n8n & Business Software | OVIVO.IO",
  description: "AI assistants, n8n workflows, CRM integrations and custom business software solutions from OVIVO.IO.",
  alternates: { canonical: '/en/services/', languages: { 'de-DE':'/services/', 'en':'/en/services/', 'ar':'/ar/services/', 'x-default':'/services/' } },
  openGraph: { title:"AI Automation, n8n & Business Software | OVIVO.IO", description:"AI assistants, n8n workflows, CRM integrations and custom business software solutions from OVIVO.IO.", url:'https://ovivo.io/en/services/' },
};

import { ServicesPage } from '@/components/services-page';

export default function Page() {
  return <ServicesPage lang="en" />;
}
