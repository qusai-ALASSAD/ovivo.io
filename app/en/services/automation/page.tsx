import { AutomationLanding } from '@/components/automation-landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Automation & n8n Workflows for Businesses | OVIVO.IO",
  description: "AI business automation, n8n workflow integrations, CRM, AI chatbots and customer communications. Get a tailored quote from OVIVO.IO.",
  alternates: { canonical: '/en/services/automation/', languages: { 'de-DE': '/services/automation/', 'en': '/en/services/automation/', 'ar': '/ar/services/automation/', 'x-default': '/services/automation/' } },
  openGraph: { type: 'website', url: 'https://ovivo.io/en/services/automation/', title: "AI Automation & n8n | OVIVO.IO" },
};

export default function Page(){return <AutomationLanding lang="en"/>;}
