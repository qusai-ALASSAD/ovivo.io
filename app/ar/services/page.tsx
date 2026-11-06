import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "خدمات أتمتة الذكاء الاصطناعي وبرامج الأعمال | OVIVO.IO",
  description: "حلول أتمتة الأعمال والمساعد الذكي وn8n وربط CRM وتطوير البرامج للشركات.",
  alternates: { canonical: '/ar/services/', languages: { 'de-DE':'/services/', 'en':'/en/services/', 'ar':'/ar/services/', 'x-default':'/services/' } },
  openGraph: { title:"خدمات أتمتة الذكاء الاصطناعي وبرامج الأعمال | OVIVO.IO", description:"حلول أتمتة الأعمال والمساعد الذكي وn8n وربط CRM وتطوير البرامج للشركات.", url:'https://ovivo.io/ar/services/' },
};

import { ServicesPage } from '@/components/services-page';

export default function Page() {
  return <ServicesPage lang="ar" />;
}
