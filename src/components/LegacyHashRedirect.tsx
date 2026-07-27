'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getProductByStyle,
  getCategory,
  getSubcategory,
  productPath,
} from '@/data/products';

// Old site used hash routes (#product/210-104, #ladies/rings, etc). Those hashes
// never reach the server, so we map them to the new clean URLs on the client to
// preserve shared links and SEO backlinks.
export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;

    // #product/<style> or #inquiry/<style>
    const m = hash.match(/^(product|inquiry)\/(.+)$/);
    if (m) {
      const p = getProductByStyle(decodeURIComponent(m[2]));
      if (p) {
        router.replace(productPath(p) + (m[1] === 'inquiry' ? '?inquiry=1' : ''));
        return;
      }
    }

    // #religious/gospel-necklace
    if (hash === 'religious/gospel-necklace') {
      router.replace('/gospel-necklace');
      return;
    }

    // #category/subcategory
    const parts = hash.split('/');
    if (parts.length === 2 && getSubcategory(parts[0], parts[1])) {
      router.replace(`/jewelry/${parts[0]}/${parts[1]}`);
      return;
    }

    // #category
    if (parts.length === 1 && getCategory(parts[0])) {
      router.replace(`/jewelry/${parts[0]}`);
    }
  }, [router]);

  return null;
}
