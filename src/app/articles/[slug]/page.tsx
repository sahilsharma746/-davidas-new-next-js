import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/styles/article.css';
import JsonLd from '@/components/JsonLd';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { ARTICLES, getArticle, articleOgImage } from '@/lib/articles';

type Params = { slug: string };

// Pre-render every article (SSG) at clean URLs /articles/<id>.
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: 'Article not found' };
  const desc = `${a.title} — ${a.excerpt.substring(0, 150)}...`;
  const path = `/articles/${a.id}`;
  return {
    title: `${a.title} | Gems & Gemology`,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: `${a.title} | Gems & Gemology | Davidas Design Concepts`,
      description: desc,
      url: path,
      images: [{ url: articleOgImage(a), alt: a.title }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const path = `/articles/${a.id}`;

  return (
    <main className="article-page">
      <div className="container">
        <Link href="/gems-gemology" className="article-page__back">
          Back to the Library
        </Link>

        <div className="article-page__tag">{a.tag}</div>
        <h1 className="article-page__title">{a.title}</h1>
        <div className="article-page__meta">
          <strong>{a.author}</strong>
          {a.date ? ` — ${a.date}` : ''}
        </div>

        {a.image && (
          <div className="article-page__image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.image} alt={a.title} />
          </div>
        )}

        <div
          className="article-page__body"
          dangerouslySetInnerHTML={{ __html: a.content }}
        />

        <div className="article-page__footer">
          <Link href="/gems-gemology" className="btn btn--outline">
            Back to the Library
          </Link>
        </div>
      </div>

      <JsonLd
        data={[
          articleJsonLd({
            title: a.title,
            author: a.author,
            date: a.date,
            excerpt: a.excerpt,
            image: articleOgImage(a),
            path,
          }),
          breadcrumbJsonLd([
            { name: 'Gems & Gemology', path: '/gems-gemology' },
            { name: a.title, path },
          ]),
        ]}
      />
    </main>
  );
}
