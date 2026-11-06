import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Business Software & Automationslösungen | OVIVO.IO",
  description: "Individuelle Softwareentwicklung für Rechnungen, Dienstplanung, Inventur, Housekeeping und Betriebsmanagement. Angebot bei OVIVO.IO anfragen.",
  alternates: { canonical: '/software/', languages: { 'de-DE': '/software/', 'en': '/en/software/', 'ar': '/ar/software/', 'x-default': '/software/' } },
  openGraph: { title: "Business Software & Automationslösungen | OVIVO.IO", description: "Individuelle Softwareentwicklung für Rechnungen, Dienstplanung, Inventur, Housekeeping und Betriebsmanagement. Angebot bei OVIVO.IO anfragen.", url: 'https://ovivo.io/software/' },
};

import { SoftwarePage } from '@/components/software-page';

export default function Page(){return <SoftwarePage lang="de"/>;}
