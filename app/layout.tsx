import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LeadMagnet } from '@/components/lead-magnet';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Toaster } from 'sonner';
import FloatingChatWidget from '@/components/FloatingChatWidget';
import { BrandPolish } from '@/components/brand-polish';

export const metadata: Metadata = {
  metadataBase: new URL('https://ovivo.io'),
  robots: { index: true, follow: true },
  applicationName: 'OVIVO.IO',
  title: 'ovivo.io | KI-Automation für Unternehmen',
  description: 'OVIVO.IO entwickelt KI-Chatbots, Automations-Workflows und CRM-Integrationen für Unternehmen – ergänzt durch Webdesign und digitales Marketing.',
  keywords: ['KI Automation', 'WhatsApp Chatbot', 'Gastronomie Software', 'Buchungssystem', 'CRM Gastronomie', 'KI Chatbot Deutschland', 'Automation Servicebetrieb'],
  authors: [{ name: 'ovivo.io' }],
  icons: {
    icon: '/ovivo-favicon.svg',
    shortcut: '/ovivo-favicon.svg',
    apple: '/ovivo-favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ovivo.io',
    siteName: 'ovivo.io',
    title: 'ovivo.io – KI-Automation für Unternehmen',
    description: 'KI-Automation, intelligente Assistenten und digitale Lösungen für Unternehmen.',
  },
  twitter: {
    card: 'summary',
    title: 'OVIVO.IO – KI-Automation, n8n & intelligente Workflows',
    description: 'KI-Automation, Webdesign und digitales Marketing für Unternehmen.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="ovivo-light">
        <BrandPolish />
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <LeadMagnet />
        <ScrollToTop />
        <FloatingChatWidget />
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
