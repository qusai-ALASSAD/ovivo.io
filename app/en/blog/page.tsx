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
    title: 'How Restaurants Are Using AI Automation to Fill Tables in 2025',
    excerpt: 'Discover how forward-thinking restaurant owners are using AI chatbots and automation to increase reservations by 40% with zero extra staff.',
    category: 'Automation',
    date: '2025-01-20',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'whatsapp-business-automation',
    title: 'WhatsApp Business Automation: The Complete Guide for Service Companies',
    excerpt: 'Learn how to set up automated WhatsApp sequences that follow up with every lead, confirm bookings, and request reviews automatically.',
    category: 'WhatsApp',
    date: '2025-01-15',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'ai-chatbot-for-local-business',
    title: '5 Ways an AI Chatbot Can Transform Your Local Business This Year',
    excerpt: 'From answering FAQs to booking appointments 24/7, see how local businesses are using AI to compete with larger brands.',
    category: 'AI Chatbot',
    date: '2025-01-10',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'crm-for-small-business',
    title: 'CRM for Small Business: Which System Is Right for You in 2025?',
    excerpt: 'A clear breakdown of the best CRM systems for small businesses, with honest pros and cons for each.',
    category: 'CRM',
    date: '2025-01-05',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'google-ads-for-restaurants',
    title: 'Google Ads for Restaurants: How to Get More Bookings Without Wasting Budget',
    excerpt: 'A practical guide to running profitable Google Ads campaigns for restaurants, cafés, and food businesses with a limited budget.',
    category: 'Ads',
    date: '2024-12-20',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'branding-for-service-businesses',
    title: 'Why Your Brand Is Losing You Customers — And How to Fix It',
    excerpt: 'A professional brand builds trust before a word is spoken. Here is how to create a brand that converts visitors into loyal customers.',
    category: 'Branding',
    date: '2024-12-15',
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = ['All', 'Automation', 'WhatsApp', 'AI Chatbot', 'CRM', 'Ads', 'Branding'];

export default function BlogEnPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
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
              title="Growth & Automation"
              titleGradient="Insights"
              subtitle="Practical guides, strategies, and case studies to help you grow your business with AI and automation."
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
                <Link href={`/en/blog/${post.slug}`}>
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
                          Read More
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
