import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "برامج إدارة الشركات والأتمتة | OVIVO.IO",
  description: "برامج مخصصة للفواتير والموظفين والمخزون وإدارة الأعمال مع عروض أسعار تناسب شركتك.",
  alternates: { canonical: '/ar/software/', languages: { 'de-DE': '/software/', 'en': '/en/software/', 'ar': '/ar/software/', 'x-default': '/software/' } },
  openGraph: { title: "برامج إدارة الشركات والأتمتة | OVIVO.IO", description: "برامج مخصصة للفواتير والموظفين والمخزون وإدارة الأعمال مع عروض أسعار تناسب شركتك.", url: 'https://ovivo.io/ar/software/' },
};

import { SoftwarePage } from '@/components/software-page';

export default function Page(){return <SoftwarePage lang="ar"/>;}
