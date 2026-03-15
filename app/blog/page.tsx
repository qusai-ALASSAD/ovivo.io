'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';

const posts = [
  {
    slug: 'restaurant-automation-guide',
    title: 'Wie Restaurants KI-Automation nutzen, um Tische zu füllen — 2025',
    excerpt: 'Entdecken Sie, wie vorausschauende Restaurantbesitzer KI-Chatbots und Automation einsetzen, um Reservierungen um 40 % zu steigern — ohne zusätzliches Personal.',
    category: 'Automation',
    date: '20.01.2025',
    readTime: '8 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'whatsapp-business-automation',
    title: 'WhatsApp Business Automation: Der vollständige Leitfaden für Dienstleister',
    excerpt: 'Erfahren Sie, wie Sie automatisierte WhatsApp-Sequenzen einrichten, die jeden Lead nachfassen, Buchungen bestätigen und Bewertungen automatisch anfragen.',
    category: 'WhatsApp',
    date: '15.01.2025',
    readTime: '10 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'ai-chatbot-for-local-business',
    title: '5 Wege, wie ein KI-Chatbot Ihr lokales Unternehmen transformiert',
    excerpt: 'Von FAQ-Beantwortung bis zur 24/7-Terminbuchung — so nutzen lokale Unternehmen KI, um mit größeren Marken zu konkurrieren.',
    category: 'KI-Chatbot',
    date: '10.01.2025',
    readTime: '7 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'crm-for-small-business',
    title: 'CRM für kleine Unternehmen: Welches System passt zu Ihnen 2025?',
    excerpt: 'Eine klare Übersicht der besten CRM-Systeme für kleine Unternehmen — mit ehrlichen Vor- und Nachteilen für jede Option.',
    category: 'CRM',
    date: '05.01.2025',
    readTime: '12 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'google-ads-for-restaurants',
    title: 'Google Ads für Restaurants: Mehr Buchungen ohne Budgetverschwendung',
    excerpt: 'Ein praxisnaher Leitfaden für profitable Google Ads-Kampagnen für Restaurants, Cafés und Lebensmittelbetriebe mit kleinem Budget.',
    category: 'Ads',
    date: '20.12.2024',
    readTime: '9 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'branding-for-service-businesses',
    title: 'Warum Ihre Marke Kunden verliert — und wie Sie das beheben',
    excerpt: 'Eine professionelle Marke schafft Vertrauen, bevor ein Wort gesprochen wird. So bauen Sie eine Marke auf, die Besucher in treue Kunden verwandelt.',
    category: 'Branding',
    date: '15.12.2024',
    readTime: '11 Min. Lesezeit',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = ['Alle', 'Automation', 'WhatsApp', 'KI-Chatbot', 'CRM', 'Ads', 'Branding'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered = activeCategory === 'Alle'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <SectionHeader
              badge="Blog"
              title="Wachstum & Automation"
              titleGradient="Insights"
              subtitle="Praxisnahe Leitfäden, Strategien und Fallstudien, die Ihnen helfen, Ihr Unternehmen mit KI und Automation zu skalieren."
            />
          </RevealSection>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'glass text-gray-400 hover:text-gray-200 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group h-full flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                          {post.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="font-bold text-white text-lg mb-2 line-clamp-2 leading-snug">{post.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm mt-auto">
                        <span className="text-gray-600">{post.date}</span>
                        <span className="flex items-center gap-1 text-blue-400 font-medium group-hover:gap-2 transition-all">
                          Weiterlesen
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
