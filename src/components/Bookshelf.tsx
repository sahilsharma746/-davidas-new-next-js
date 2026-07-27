'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import BookshelfDecor from './BookshelfDecor';
import type { Article } from '@/lib/articles';

// Ported from js/bookshelf.js
const LEATHER = [
  'leather-forest', 'leather-oxblood', 'leather-navy', 'leather-tan',
  'leather-plum', 'leather-teal', 'leather-slate', 'leather-bronze',
];
const HEIGHTS = [175, 168, 160, 172, 165, 178, 162, 170, 174, 166];
const WIDTHS = [52, 46, 42, 50, 44, 48, 54, 40, 56, 45];
const BOOKS_PER_ROW = 13;

function toRoman(num: number): string {
  const lookup: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  for (const [val, sym] of lookup) {
    while (num >= val) {
      result += sym;
      num -= val;
    }
  }
  return result;
}

function bookWidth(title: string, baseWidth: number): number {
  const len = title.length;
  if (len > 20) return Math.max(baseWidth, 56);
  if (len > 14) return Math.max(baseWidth, 50);
  return baseWidth;
}

export default function Bookshelf({ articles }: { articles: Article[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const paneRef = useRef<HTMLElement>(null);
  const bookRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selected = articles.find((a) => a.id === selectedId) || null;

  function openArticle(id: string) {
    setSelectedId(id);
    // Scroll the pane into view (matches original).
    requestAnimationFrame(() => {
      paneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function closePane() {
    const prev = selectedId;
    setSelectedId(null);
    if (prev && bookRefs.current[prev]) {
      const b = bookRefs.current[prev]!;
      b.scrollIntoView({ behavior: 'smooth', block: 'center' });
      b.focus({ preventScroll: true });
    }
  }

  // Split into rows of 13.
  const rows: Article[][] = [];
  for (let i = 0; i < articles.length; i += BOOKS_PER_ROW) {
    rows.push(articles.slice(i, i + BOOKS_PER_ROW));
  }

  return (
    <main className="bookshelf-page">
      <header className="library-header">
        <span className="library-header__tag">
          Davidas Design Concepts &middot; The Library
        </span>
        <h1 className="library-header__title">
          Gems <em>&amp;</em> Gemology
        </h1>
        <p className="library-header__desc">
          A growing collection of articles on gemstones, their history, and the craft of jewelry.
          Pull a volume from the shelf to read.
        </p>
        <div className="library-header__divider"></div>
      </header>

      <div className="bookcase">
        <div className="case-frame">
          <div className="case-top"></div>

          {rows.map((row, rowIdx) => {
            const isLastRow = rowIdx === rows.length - 1;
            const needsBookend = isLastRow || row.length < BOOKS_PER_ROW;
            return (
              <div key={rowIdx}>
                <div className="shelf" role="list">
                  {row.map((article, j) => {
                    const index = rowIdx * BOOKS_PER_ROW + j;
                    const leather = LEATHER[index % LEATHER.length];
                    const height = HEIGHTS[index % HEIGHTS.length];
                    const width = bookWidth(article.title, WIDTHS[index % WIDTHS.length]);
                    return (
                      <button
                        key={article.id}
                        ref={(el) => {
                          bookRefs.current[article.id] = el;
                        }}
                        className={`book ${leather}${selectedId === article.id ? ' selected' : ''}`}
                        style={{ height: `${height}px`, width: `${width}px` }}
                        role="listitem"
                        aria-label={`Read article: ${article.title}`}
                        onClick={() => openArticle(article.id)}
                      >
                        <span className="spine-title">{article.title}</span>
                        <span className="spine-vol">Vol. {toRoman(index + 1)}</span>
                      </button>
                    );
                  })}
                  {needsBookend && <div className="bookend" aria-hidden="true" />}
                </div>
                <div className="shelf-board"></div>
              </div>
            );
          })}

          <BookshelfDecor />

          <div className="case-note">Pull a volume from the shelf to begin reading</div>
        </div>
      </div>

      <section
        ref={paneRef}
        className={`reading-pane${selected ? ' open' : ''}`}
        aria-live="polite"
      >
        <div className="pane-inner">
          <button className="close-btn" type="button" onClick={closePane}>
            Return to shelf
          </button>
          <div className="pane-eyebrow">{selected?.tag || ''}</div>
          <h2>{selected?.title || ''}</h2>
          <div className="pane-author">{selected?.author ? `by ${selected.author}` : ''}</div>
          <div>
            {selected && (
              <>
                {selected.excerpt && <p>{selected.excerpt}</p>}
                <Link className="pane-read-more" href={`/articles/${selected.id}`}>
                  Read the Full Article{' '}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
