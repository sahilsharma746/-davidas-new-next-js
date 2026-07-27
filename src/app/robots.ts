import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Generates /robots.txt and points crawlers to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
