import type { MetadataRoute } from 'next';

const base = 'https://ovivo.io';
const paths = ['', '/about', '/contact', '/pricing', '/services', '/software',
  '/services/automation', '/services/ai-chatbot', '/services/crm-email',
  '/services/ads', '/services/branding', '/services/funnels'];
const locales = ['', '/en', '/ar'];

function absoluteUrl(prefix: string, path: string) {
  return base + prefix + path + '/';
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(path => {
    const languages = {
      'de-DE': absoluteUrl('', path),
      en: absoluteUrl('/en', path),
      ar: absoluteUrl('/ar', path),
      'x-default': absoluteUrl('', path),
    };
    return locales.map(prefix => ({
      url: absoluteUrl(prefix, path),
      alternates: { languages },
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/services/automation' ? 0.9 : path === '/services' ? 0.8 : 0.65,
    }));
  });
}
