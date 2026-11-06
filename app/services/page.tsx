import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KI-Automation, n8n & Softwareentwicklung | OVIVO.IO",
  description: "KI-Automatisierung, n8n-Workflows, CRM-Integration, KI-Assistenten und individuelle Unternehmenssoftware bei OVIVO.IO.",
  alternates: { canonical: '/services/', languages: { 'de-DE':'/services/', 'en':'/en/services/', 'ar':'/ar/services/', 'x-default':'/services/' } },
  openGraph: { title:"KI-Automation, n8n & Softwareentwicklung | OVIVO.IO", description:"KI-Automatisierung, n8n-Workflows, CRM-Integration, KI-Assistenten und individuelle Unternehmenssoftware bei OVIVO.IO.", url:'https://ovivo.io/services/' },
};

import { ServicesPage } from '@/components/services-page';

export default function Page() {
  return <ServicesPage lang="de" />;
}
