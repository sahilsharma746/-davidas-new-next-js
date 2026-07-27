import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import LegacyHashRedirect from '@/components/LegacyHashRedirect';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { CATEGORIES, PROCUREMENT_TEXT } from '@/data/products';

export const metadata: Metadata = {
  title: 'Jewelry Collection',
  description:
    'Browse our handcrafted jewelry collection — Ladies, Cross Pendants, Wedding, Gents, and Specialty pieces from Davidas Design Concepts.',
  alternates: { canonical: '/jewelry' },
};

// Link target for a subcategory (Gospel Necklace is a standalone page).
function subHref(catId: string, subId: string) {
  if (catId === 'religious' && subId === 'gospel-necklace') return '/gospel-necklace';
  return `/jewelry/${catId}/${subId}`;
}

// VIEW 1 — Category menu (ported from jewelry.js buildCategoryMenu/showCategories).
export default function JewelryPage() {
  return (
    <main className="section">
      <LegacyHashRedirect />
      <div className="container">
        <Breadcrumb items={[{ label: 'Jewelry' }]} />

        <div className="jewelry-view">
          <div className="section__header">
            <span className="section__tag">Browse Collection</span>
            <h1 className="section__title">Our Jewelry</h1>
          </div>
          <div className="cat-layout">
            <div className="cat-menu" id="cat-menu">
              {CATEGORIES.map((cat) => (
                <div className="cat-group" key={cat.id}>
                  <span className="cat-group__label">{cat.label}:</span>
                  <div className="cat-group__subs">
                    {cat.subcategories.map((sub) => (
                      <Link href={subHref(cat.id, sub.id)} key={sub.id}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="cat-procurement">
              <h3 className="cat-procurement__title">Jewelry Procurement</h3>
              <p className="cat-procurement__text">{PROCUREMENT_TEXT}</p>
            </div>
          </div>
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Jewelry', path: '/jewelry' }])} />
    </main>
  );
}
