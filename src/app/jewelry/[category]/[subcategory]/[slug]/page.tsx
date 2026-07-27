import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import ProductDetail from '@/components/ProductDetail';
import { productJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import {
  PRODUCTS,
  getCategory,
  getSubcategory,
  getProductBySlug,
  productPath,
} from '@/data/products';

type Params = { category: string; subcategory: string; slug: string };

// Pre-render every product page at build time (SSG) → fully crawlable.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    subcategory: p.subcategory,
    slug: p.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category, subcategory, slug } = await params;
  const p = getProductBySlug(category, subcategory, slug);
  if (!p) return {};
  const canonical = productPath(p);
  // First sentence of the description makes a good meta description.
  const shortDesc = p.description.replace(/\s+/g, ' ').trim().slice(0, 155);
  return {
    title: `${p.name} — Style #${p.style}`,
    description: shortDesc,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: `${p.name} | Davidas Design Concepts`,
      description: shortDesc,
      url: canonical,
      images: [{ url: p.image, alt: p.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} | Davidas Design Concepts`,
      description: shortDesc,
      images: [p.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { category, subcategory, slug } = await params;
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  const p = getProductBySlug(category, subcategory, slug);
  if (!cat || !sub || !p) notFound();

  const canonical = productPath(p);

  return (
    <main className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Jewelry', href: '/jewelry' },
            { label: cat.label, href: `/jewelry/${cat.id}` },
            { label: sub.label, href: `/jewelry/${cat.id}/${sub.id}` },
            { label: p.name },
          ]}
        />
        <div className="jewelry-view">
          <ProductDetail product={p} backHref={`/jewelry/${cat.id}/${sub.id}`} />
        </div>
      </div>

      <JsonLd
        data={[
          productJsonLd(p, canonical),
          breadcrumbJsonLd([
            { name: 'Jewelry', path: '/jewelry' },
            { name: cat.label, path: `/jewelry/${cat.id}` },
            { name: sub.label, path: `/jewelry/${cat.id}/${sub.id}` },
            { name: p.name, path: canonical },
          ]),
        ]}
      />
    </main>
  );
}
