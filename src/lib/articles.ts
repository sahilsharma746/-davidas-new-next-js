import raw from '@/data/articles.json';
import { SITE } from './site';

export interface Article {
  id: string;
  title: string;
  tag: string;
  author: string;
  date: string;
  excerpt: string;
  content: string; // HTML
  image: string; // may be empty
}

// Normalize image paths to absolute /public paths. Empty stays empty so the
// article page can hide the image (matches original behavior).
export const ARTICLES: Article[] = (raw as Article[]).map((a) => ({
  ...a,
  image: a.image ? (a.image.startsWith('/') ? a.image : '/' + a.image) : '',
}));

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

// Image to use for social/OG/JSON-LD — falls back to the site image.
export function articleOgImage(a: Article): string {
  return a.image || SITE.ogImage;
}
