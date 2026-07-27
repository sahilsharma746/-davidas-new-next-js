import type { Metadata } from 'next';
import GospelNecklace from '@/components/GospelNecklace';
import JsonLd from '@/components/JsonLd';
import { SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gospel Necklace',
  description:
    'The Gospel Necklace by Davidas Design Concepts — Wear the story that changed everything. Handcrafted in silver and gold-filled.',
  alternates: { canonical: '/gospel-necklace' },
  openGraph: {
    type: 'website',
    title: 'Gospel Necklace | Davidas Design Concepts',
    description:
      'Wear the story that changed everything. Handcrafted in silver and gold-filled.',
    url: '/gospel-necklace',
    images: [{ url: '/images/Gospel_Necklace/B.png', alt: 'Gospel Necklace' }],
  },
};

// Product structured data (priced variants).
const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Gospel Necklace',
  description:
    'Handcrafted Gospel Necklace — each symbol represents a chapter of the gospel. Available in silver and gold-filled.',
  image: absoluteUrl('/images/Gospel_Necklace/B.png'),
  url: absoluteUrl('/gospel-necklace'),
  brand: { '@type': 'Brand', name: SITE.name },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '169.00',
    highPrice: '244.00',
    offerCount: 8,
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: SITE.name },
  },
};

export default function GospelNecklacePage() {
  return (
    <>
      <GospelNecklace />
      <JsonLd data={productLd} />
    </>
  );
}
