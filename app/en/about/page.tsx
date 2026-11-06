import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About OVIVO.IO | AI Automation for Businesses",
  description: "Learn how OVIVO.IO builds AI assistants, n8n workflows and tailored software for business teams.",
  alternates: { canonical: '/en/about/', languages: { 'de-DE':'/about/', 'en':'/en/about/', 'ar':'/ar/about/', 'x-default':'/about/' } },
  openGraph: { title:"About OVIVO.IO | AI Automation for Businesses", description:"Learn how OVIVO.IO builds AI assistants, n8n workflows and tailored software for business teams.", url:'https://ovivo.io/en/about/' },
};

import { AboutPage } from '@/components/about-page';

export default function Page() {
  return <AboutPage lang="en" />;
}
