import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LeadMagnet } from '@/components/lead-magnet';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Toaster } from 'sonner';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { BrandPolish } from '@/components/brand-polish';

export const metadata: Metadata = {
  title: 'Ovivo - KI-Automation für Gastronomie & Servicebetriebe',
  description: 'Wir automatisieren Reservierungen, Kundenanfragen und Kundenbindung für Restaurants, Cafés und Servicebetriebe in Deutschland. KI-Chatbot, WhatsApp Automation, Buchungssystem & CRM — alles aus einer Hand.',
  keywords: ['KI Automation', 'Restaurant Automation', 'WhatsApp Chatbot', 'Gastronomie Software', 'Buchungssystem', 'CRM Gastronomie', 'KI Chatbot Deutschland', 'Automation Servicebetrieb'],
  authors: [{ name: 'Ovivo' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ovivo.io',
    siteName: 'Ovivo',
    title: 'Ovivo - KI-Automation für Gastronomie & Servicebetriebe',
    description: 'Mehr Gäste. Weniger Aufwand. Vollautomatisch. KI-Automation für Restaurants, Cafés und Servicebetriebe in Deutschland.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovivo - KI-Automation für Gastronomie & Servicebetriebe',
    description: 'Mehr Gäste. Weniger Aufwand. Vollautomatisch.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif' }}>
        <BrandPolish />
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <LeadMagnet />
        <ScrollToTop />
        <FloatingChatWidget />
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
