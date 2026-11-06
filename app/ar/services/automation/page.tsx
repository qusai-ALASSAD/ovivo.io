import { AutomationLanding } from '@/components/automation-landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "أتمتة الذكاء الاصطناعي وn8n للشركات | OVIVO.IO",
  description: "أنظمة ذكاء اصطناعي وأتمتة n8n وربط CRM والمساعد الذكي لتنظيم عمليات شركتك مع OVIVO.IO.",
  alternates: { canonical: '/ar/services/automation/', languages: { 'de-DE': '/services/automation/', 'en': '/en/services/automation/', 'ar': '/ar/services/automation/', 'x-default': '/services/automation/' } },
  openGraph: { type: 'website', url: 'https://ovivo.io/ar/services/automation/', title: "أتمتة الذكاء الاصطناعي | OVIVO.IO" },
};

export default function Page(){return <AutomationLanding lang="ar"/>;}
