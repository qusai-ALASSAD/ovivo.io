import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "تواصل معنا بخصوص أتمتة الأعمال | OVIVO.IO",
  description: "تواصل مع OVIVO.IO لأتمتة الأعمال والشات الذكي وبرامج الإدارة الخاصة.",
  alternates: { canonical: '/ar/contact/', languages: { 'de-DE': '/contact/', 'en': '/en/contact/', 'ar': '/ar/contact/', 'x-default': '/contact/' } },
  openGraph: { title: "تواصل معنا بخصوص أتمتة الأعمال | OVIVO.IO", description: "تواصل مع OVIVO.IO لأتمتة الأعمال والشات الذكي وبرامج الإدارة الخاصة.", url: 'https://ovivo.io/ar/contact/' },
};

import { ContactPage } from '@/components/contact-page';

export default function Page() {
  return <ContactPage lang="ar" />;
}
