import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "من نحن | OVIVO.IO لأتمتة أعمال الشركات",
  description: "تعرف على خدمات OVIVO.IO في أتمتة الأعمال والمساعدين الأذكياء وربط الأنظمة وتطوير البرامج.",
  alternates: { canonical: '/ar/about/', languages: { 'de-DE':'/about/', 'en':'/en/about/', 'ar':'/ar/about/', 'x-default':'/about/' } },
  openGraph: { title:"من نحن | OVIVO.IO لأتمتة أعمال الشركات", description:"تعرف على خدمات OVIVO.IO في أتمتة الأعمال والمساعدين الأذكياء وربط الأنظمة وتطوير البرامج.", url:'https://ovivo.io/ar/about/' },
};

import { AboutPage } from '@/components/about-page';

export default function Page() {
  return <AboutPage lang="ar" />;
}
