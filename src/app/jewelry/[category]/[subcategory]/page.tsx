import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Img from '@/components/Img';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld';
import {
  CATEGORIES,
  getCategory,
  getSubcategory,
  getProductsIn,
  productPath,
} from '@/data/products';

type Params = { category: string; subcategory: string };

export function generateStaticParams() {
  const params: Params[] = [];
  for (const cat of CATEGORIES) {
    for (const sub of cat.subcategories) {
      params.push({ category: cat.id, subcategory: sub.id });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category, subcategory } = await params;
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  if (!cat || !sub) return {};
  return {
    title: `${sub.label} — ${cat.label} Jewelry`,
    description: `Browse ${cat.label} ${sub.label} — handcrafted custom jewelry by Davidas Design Concepts, Greensboro, NC.`,
    alternates: { canonical: `/jewelry/${cat.id}/${sub.id}` },
  };
}

// VIEW 2 — Product grid (ported from jewelry.js showGrid).
export default async function GridPage({ params }: { params: Promise<Params> }) {
  const { category, subcategory } = await params;
  // Gospel Necklace lives on its own standalone page, not a product grid.
  if (category === 'religious' && subcategory === 'gospel-necklace') {
    redirect('/gospel-necklace');
  }
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  if (!cat || !sub) notFound();

  const products = getProductsIn(category, subcategory);

  return (
    <main className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Jewelry', href: '/jewelry' },
            { label: cat.label, href: `/jewelry/${cat.id}` },
            { label: sub.label },
          ]}
        />

        <div className="jewelry-view">
          <div className="section__header">
            <h1 className="section__title">
              {cat.label} — {sub.label}
            </h1>
            <p className="section__desc">Click image for more information</p>
          </div>
          <div className="jewelry-grid">
            {products.map((p) => (
              <Link href={productPath(p)} className="jewelry-card" key={p.style}>
                <div className="jewelry-card__image">
                  <Img
                    src={p.image}
                    alt={p.name}
                    sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px"
                  />
                </div>
                <div className="jewelry-card__body">
                  <span className="jewelry-card__category">Style #{p.style}</span>
                  <h3 className="jewelry-card__title">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Jewelry', path: '/jewelry' },
            { name: cat.label, path: `/jewelry/${cat.id}` },
            { name: sub.label, path: `/jewelry/${cat.id}/${sub.id}` },
          ]),
          itemListJsonLd(products, productPath),
        ]}
      />
    </main>
  );
}
