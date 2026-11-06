import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "AI Automation, n8n & Business Software | OVIVO.IO",
  description: "AI chatbots, n8n automation, CRM workflows and custom software solutions for modern businesses.",
  alternates: { canonical: '/en/', languages: { 'de-DE': '/', 'en': '/en/', 'ar': '/ar/', 'x-default': '/' } },
  openGraph: { title: "AI Automation, n8n & Business Software | OVIVO.IO", description: "AI chatbots, n8n automation, CRM workflows and custom software solutions for modern businesses.", url: 'https://ovivo.io/en/' },
};

import { HomePage } from '@/components/home-page';

export default function Page() {
  return <HomePage lang="en" />;
}
