// Central site configuration — business facts, nav, and SEO defaults.
// Used by metadata, structured data (JSON-LD), sitemap, footer, and nav.

export const SITE = {
  name: 'Davidas Design Concepts',
  shortName: 'Davidas',
  tagline: 'The fusion of art, craftsmanship and technology.',
  description:
    'Custom jewelry design in Greensboro, NC. The fusion of art, craftsmanship and technology since 1995.',
  // Canonical origin — override per-environment with NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davidas.com').replace(/\/$/, ''),
  established: '1995-07-08',
  establishedLabel: 'Est. July 8, 1995',
  phone: '(336) 790-8214',
  phoneE164: '+13367908214',
  tollFree: '(888) 498-7540',
  email: 'davidas.design@yahoo.com',
  address: {
    street: '220 S. Swing Rd, Unit #1',
    city: 'Greensboro',
    region: 'NC',
    postalCode: '27409',
    country: 'US',
  },
  // Meta (Facebook) Pixel id — ported from the original includes.js.
  metaPixelId: '2684268808623111',
  // Default social share image (an existing product/hero image).
  ogImage: '/images/Cross Pendants/113-334/A.png',
} as const;

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/jewelry', label: 'Jewelry' },
  { href: '/services', label: 'Services' },
  { href: '/gems-gemology', label: 'Gems & Gemology' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Build an absolute URL from a site-relative path (for canonical/OG/sitemap).
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}
