import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/login/', '/request/', '/en/request/', '/ar/request/',
        '/chat/', '/business-plan/', '/marketing-plan/'],
    },
    sitemap: 'https://ovivo.io/sitemap.xml',
    host: 'https://ovivo.io',
  };
}
