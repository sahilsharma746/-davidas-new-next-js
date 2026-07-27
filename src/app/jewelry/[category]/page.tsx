import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Img from '@/components/Img';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { CATEGORIES, getCategory, getProductsIn } from '@/data/products';

type Params = { category: string };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.label} Jewelry`,
    description: `Explore our ${cat.label} jewelry collection — handcrafted custom designs by Davidas Design Concepts in Greensboro, NC.`,
    alternates: { canonical: `/jewelry/${cat.id}` },
  };
}

function subHref(catId: string, subId: string) {
  if (catId === 'religious' && subId === 'gospel-necklace') return '/gospel-necklace';
  return `/jewelry/${catId}/${subId}`;
}

// Representative image for a subcategory card (first product's image).
function subImage(catId: string, subId: string): string | null {
  if (catId === 'religious' && subId === 'gospel-necklace') {
    return '/images/Gospel_Necklace/A.png';
  }
  const products = getProductsIn(catId, subId);
  return products[0]?.image ?? null;
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  // Single-subcategory category → go straight to its grid (matches original SPA).
  if (cat.subcategories.length === 1) {
    redirect(subHref(cat.id, cat.subcategories[0].id));
  }

  return (
    <main className="section">
      <div className="container">
        <Breadcrumb
          items={[{ label: 'Jewelry', href: '/jewelry' }, { label: cat.label }]}
        />

        <div className="jewelry-view">
          <div className="section__header">
            <span className="section__tag">Browse Collection</span>
            <h1 className="section__title">{cat.label}</h1>
          </div>
          <div className="jewelry-grid">
            {cat.subcategories.map((sub) => {
              const img = subImage(cat.id, sub.id);
              return (
                <Link href={subHref(cat.id, sub.id)} className="jewelry-card" key={sub.id}>
                  <div className="jewelry-card__image">
                    {img && (
                      <Img
                        src={img}
                        alt={`${cat.label} ${sub.label}`}
                        sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px"
                      />
                    )}
                  </div>
                  <div className="jewelry-card__body">
                    <span className="jewelry-card__category">{cat.label}</span>
                    <h3 className="jewelry-card__title">{sub.label}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Jewelry', path: '/jewelry' },
          { name: cat.label, path: `/jewelry/${cat.id}` },
        ])}
      />
    </main>
  );
}
