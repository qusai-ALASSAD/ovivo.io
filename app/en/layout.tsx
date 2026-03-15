import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ovivo – AI Automation for Restaurants & Service Businesses',
  description: 'We help businesses optimize their customer communication, reservations, and marketing with AI and automation. AI chatbot, WhatsApp automation, booking system & CRM — all in one.',
  keywords: ['AI Automation', 'Restaurant Automation', 'WhatsApp Chatbot', 'Booking System', 'CRM', 'AI Chatbot UK', 'Service Business Automation'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ovivo.io/en',
    siteName: 'Ovivo',
    title: 'Ovivo – AI Automation for Restaurants & Service Businesses',
    description: 'More customers. Less effort. Fully automated. AI automation for restaurants, cafés, and service businesses.',
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
