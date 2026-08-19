import { PRODUCTS } from './products';
import type { Product } from './products';

export interface ShowcaseItem {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  metals: string;
  karats: string;
  style: string;
  video: string;
  gemstone: string;
  featured: boolean;
  caseNumber: number;
  displayOrder: number;
  sketchImage: string;
  benchImage: string;
  creationVideo: string;
}

export interface ShowcaseCase {
  id: number;
  name: string;
  subtitle: string;
}

export const SHOWCASE_CASES: ShowcaseCase[] = [
  { id: 1, name: 'Featured Collection', subtitle: 'Our finest handcrafted pieces' },
  { id: 2, name: 'Specialty Pieces', subtitle: 'Unique custom designs' },
];

interface ProductConfig {
  slug: string;
  price: number;
  collection: string;
  gemstone: string;
  featured: boolean;
  caseNumber: number;
  displayOrder: number;
  showcaseImage?: string;
}

const SHOWCASE_PRODUCTS: ProductConfig[] = [
  { slug: 'mermaid-bracelet', price: 4895, collection: 'Featured', gemstone: 'Sapphire', featured: true, caseNumber: 1, displayOrder: 1, showcaseImage: '/images/showcase/bracelet-1.png' },
  { slug: 'dangle-earrings', price: 1250, collection: 'Featured', gemstone: 'Emerald', featured: true, caseNumber: 1, displayOrder: 2, showcaseImage: '/images/showcase/earring-1.png' },
  { slug: 'halo-pendant', price: 2350, collection: 'Featured', gemstone: 'Diamond', featured: false, caseNumber: 1, displayOrder: 3, showcaseImage: '/images/showcase/pendant-1.png' },
  { slug: 'cluster-ring', price: 5750, collection: 'Featured', gemstone: 'Diamond', featured: true, caseNumber: 1, displayOrder: 4, showcaseImage: '/images/showcase/ring-1.png' },
  { slug: 'dogwood-flower-cross-pendant', price: 1850, collection: 'Specialty', gemstone: '', featured: false, caseNumber: 1, displayOrder: 5, showcaseImage: '/images/showcase/ring-2.png' },
  { slug: 'antique-style-engagement-ring', price: 4250, collection: 'Specialty', gemstone: 'Diamond', featured: true, caseNumber: 1, displayOrder: 6, showcaseImage: '/images/showcase/ring-3.png' },
  { slug: 'golf-shoe-pendant', price: 950, collection: 'Specialty', gemstone: '', featured: false, caseNumber: 1, displayOrder: 7, showcaseImage: '/images/showcase/ring-4.png' },
  { slug: 'confederate-states-seal-pendant', price: 1450, collection: 'Specialty', gemstone: '', featured: false, caseNumber: 1, displayOrder: 8, showcaseImage: '/images/showcase/ring-5.png' },
];

function toShowcaseItem(product: Product, config: ProductConfig): ShowcaseItem {
  const img = config.showcaseImage || product.image;
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    collection: config.collection,
    price: config.price,
    description: product.description,
    image: img,
    images: [img],
    metals: product.metals,
    karats: product.karats,
    style: product.style,
    video: product.video,
    gemstone: config.gemstone,
    featured: config.featured,
    caseNumber: config.caseNumber,
    displayOrder: config.displayOrder,
    sketchImage: '',
    benchImage: '',
    creationVideo: '',
  };
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = SHOWCASE_PRODUCTS
  .map((config) => {
    const product = PRODUCTS.find((p) => p.slug === config.slug);
    return product ? toShowcaseItem(product, config) : null;
  })
  .filter((item): item is ShowcaseItem => item !== null)
  .sort((a, b) => a.caseNumber - b.caseNumber || a.displayOrder - b.displayOrder);

export function getItemsForCase(caseNumber: number): ShowcaseItem[] {
  return SHOWCASE_ITEMS.filter((item) => item.caseNumber === caseNumber);
}

export const SHOWCASE_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'ladies', label: 'Ladies' },
  { key: 'religious', label: 'Religious' },
  { key: 'wedding', label: 'Wedding' },
  { key: 'specialty', label: 'Specialty' },
];
