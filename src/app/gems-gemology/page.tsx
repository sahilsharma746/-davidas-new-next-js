import type { Metadata } from 'next';
import Bookshelf from '@/components/Bookshelf';
import { ARTICLES } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Gems & Gemology',
  description:
    'Gems & Gemology Library — Explore expert articles on gemstones, gem profiles, and industry insights from Davidas Design Concepts.',
  alternates: { canonical: '/gems-gemology' },
};

// Ported from gems-gemology.html — articles come from data/articles.json.
export default function GemsGemologyPage() {
  return <Bookshelf articles={ARTICLES} />;
}
