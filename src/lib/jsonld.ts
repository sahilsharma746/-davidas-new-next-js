// JSON-LD structured data builders. Emitted via the <JsonLd> component.
import { SITE, absoluteUrl } from './site';
import type { Product, Category, Subcategory } from '@/data/products';

// LocalBusiness / Organization — used site-wide (in the root layout).
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneE164,
    email: SITE.email,
    image: absoluteUrl(SITE.ogImage),
    foundingDate: SITE.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: 'Greensboro, NC',
  };
}

// Product structured data — one per product detail page.
export function productJsonLd(p: Product, canonicalPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.style,
    mpn: p.style,
    description: p.description,
    image: absoluteUrl(p.image),
    url: absoluteUrl(canonicalPath),
    ...(p.metals ? { material: p.metals } : {}),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      // Custom/made-to-order — pricing on inquiry.
      price: '0',
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { '@type': 'Organization', name: SITE.name },
    },
  };
}

// BreadcrumbList — improves SERP breadcrumbs.
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

// Article structured data — for Gems & Gemology articles.
export function articleJsonLd(a: {
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    image: absoluteUrl(a.image),
    author: { '@type': 'Person', name: a.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.ogImage) },
    },
    datePublished: a.date,
    mainEntityOfPage: absoluteUrl(a.path),
  };
}

// ItemList for a product grid — helps category/subcategory pages.
export function itemListJsonLd(products: Product[], pathFor: (p: Product) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(pathFor(p)),
      name: p.name,
    })),
  };
}

export type { Product, Category, Subcategory };
