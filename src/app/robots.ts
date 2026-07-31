import type { MetadataRoute } from 'next';
import { SITE, NOINDEX } from '@/lib/site';

// Generates /robots.txt and points crawlers to the sitemap.
export default function robots(): MetadataRoute.Robots {
  // Staging (Vercel) — block everything and advertise no sitemap.
  if (NOINDEX) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
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
