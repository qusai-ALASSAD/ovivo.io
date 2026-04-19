'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { SectionHeader } from '@/components/section-header';

const posts = [
  {
    slug: 'wordpress-business-automation',
    title: 'How to Automate Your WordPress Business in 2024',
    excerpt: 'Learn how to set up powerful automation workflows for your WordPress site to save time and increase conversions.',
    category: 'WordPress',
    date: '2024-02-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'shopify-marketing-strategies',
    title: '10 Proven Shopify Marketing Strategies That Drive Sales',
    excerpt: 'Discover the marketing tactics that top Shopify stores use to generate consistent revenue and build loyal customers.',
    category: 'Shopify',
    date: '2024-02-12',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'facebook-ads-guide-2024',
    title: 'The Complete Facebook Ads Guide for Small Businesses',
    excerpt: 'Master Facebook advertising with this comprehensive guide covering targeting, creatives, budgets, and optimization.',
    category: 'Ads',
    date: '2024-02-08',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'email-marketing-automation',
    title: 'Email Marketing Automation: From Setup to Conversion',
    excerpt: 'Build email sequences that nurture leads automatically and convert them into paying customers on autopilot.',
    category: 'Automation',
    date: '2024-02-05',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'ai-tools-business-growth',
    title: '5 AI Tools Every Business Should Use in 2024',
    excerpt: 'Discover the essential AI tools that can transform your business operations, marketing, and customer service.',
    category: 'AI Tools',
    date: '2024-02-01',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'local-seo-small-business',
    title: 'Local SEO: The Ultimate Guide for Small Businesses',
    excerpt: 'Rank higher in local search results and attract more customers from your area with these proven SEO strategies.',
    category: 'SEO',
    date: '2024-01-28',
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = ['All', 'WordPress', 'Shopify', 'Ads', 'Automation', 'AI Tools', 'SEO'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <SectionHeader
              badge="Blog"
              title="Business Growth"
              titleGradient="Insights"
              subtitle="Tips, guides, and strategies to help you grow your business faster."
            />
          </RevealSection>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Posts */}
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
