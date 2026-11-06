import { AutomationLanding } from '@/components/automation-landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KI-Automation & n8n Workflows für Unternehmen | OVIVO.IO",
  description: "KI-Automation für Unternehmen: n8n-Workflows, KI-Chatbots, CRM-Automation, WhatsApp- und E-Mail-Integrationen. Unverbindliche Beratung bei OVIVO.IO.",
  alternates: { canonical: '/services/automation/', languages: { 'de-DE': '/services/automation/', 'en': '/en/services/automation/', 'ar': '/ar/services/automation/', 'x-default': '/services/automation/' } },
  openGraph: { type: 'website', url: 'https://ovivo.io/services/automation/', title: "KI-Automation & n8n | OVIVO.IO" },
};

const automationServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'KI-Automatisierung & n8n Workflows für Unternehmen',
  serviceType: ['KI-Automatisierung', 'n8n Workflow-Automation', 'CRM-Automation', 'KI-Chatbots'],
  description: 'Individuelle Automatisierung von Geschäftsprozessen, KI-Assistenten und Integration vorhandener Systeme für Unternehmen.',
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  provider: { '@type': 'Organization', name: 'OVIVO.IO', url: 'https://ovivo.io/' },
  url: 'https://ovivo.io/services/automation/',
};

export default function Page(){
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(automationServiceSchema).replace(/</g, '\\u003c') }} />
  <AutomationLanding lang="de"/>
 </>;
}
