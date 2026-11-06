import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Custom Business Software Solutions | OVIVO.IO",
  description: "Custom software for invoices, employee scheduling, inventory and business operations. Request a tailored quote.",
  alternates: { canonical: '/en/software/', languages: { 'de-DE': '/software/', 'en': '/en/software/', 'ar': '/ar/software/', 'x-default': '/software/' } },
  openGraph: { title: "Custom Business Software Solutions | OVIVO.IO", description: "Custom software for invoices, employee scheduling, inventory and business operations. Request a tailored quote.", url: 'https://ovivo.io/en/software/' },
};

import { SoftwarePage } from '@/components/software-page';

export default function Page(){return <SoftwarePage lang="en"/>;}
