import type { MetadataRoute } from 'next';

const base = 'https://ovivo.io';
const paths = ['', '/about', '/contact', '/pricing', '/services', '/software',
  '/services/automation', '/services/ai-chatbot', '/services/crm-email',
  '/services/ads', '/services/branding', '/services/funnels', '/blog'];
const locales = ['', '/en', '/ar'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(path => locales.map(prefix => ({
    url: base + prefix + (path || '') + '/',
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/services/automation' ? 0.9 : path === '/services' ? 0.8 : 0.65,
  })));
}
