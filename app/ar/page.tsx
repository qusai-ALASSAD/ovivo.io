import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "أتمتة الذكاء الاصطناعي وn8n للشركات | OVIVO.IO",
  description: "أنظمة ذكاء اصطناعي وأتمتة n8n وCRM وبرامج مخصصة لإدارة الأعمال والشركات.",
  alternates: { canonical: '/ar/', languages: { 'de-DE': '/', 'en': '/en/', 'ar': '/ar/', 'x-default': '/' } },
  openGraph: { title: "أتمتة الذكاء الاصطناعي وn8n للشركات | OVIVO.IO", description: "أنظمة ذكاء اصطناعي وأتمتة n8n وCRM وبرامج مخصصة لإدارة الأعمال والشركات.", url: 'https://ovivo.io/ar/' },
};

import { HomePage } from '@/components/home-page';

export default function Page() {
  return <HomePage lang="ar" />;
}
