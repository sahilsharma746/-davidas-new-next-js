import type { Metadata } from 'next';
import '@/styles/showcase.css';
import ShowcaseCollection from '@/components/ShowcaseCollection';

export const metadata: Metadata = {
  title: 'The Jewelry Showcase',
  description:
    'Explore our virtual jewelry showcase — browse fine rings, pendants, bracelets, and earrings from Davidas Design Concepts.',
  robots: { index: false, follow: false },
};

export default function ShowcasePage() {
  return (
    <main className="showcase-page">
      <ShowcaseCollection />
    </main>
  );
}
