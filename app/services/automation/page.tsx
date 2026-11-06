import { AutomationLanding } from '@/components/automation-landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KI-Automation & n8n Workflows für Unternehmen | OVIVO.IO",
  description: "KI-Automation für Unternehmen: n8n-Workflows, KI-Chatbots, CRM-Automation, WhatsApp- und E-Mail-Integrationen. Unverbindliche Beratung bei OVIVO.IO.",
  alternates: { canonical: '/services/automation/', languages: { 'de-DE': '/services/automation/', 'en': '/en/services/automation/', 'ar': '/ar/services/automation/', 'x-default': '/services/automation/' } },
  openGraph: { type: 'website', url: 'https://ovivo.io/services/automation/', title: "KI-Automation & n8n | OVIVO.IO" },
};

export default function Page(){return <AutomationLanding lang="de"/>;}
