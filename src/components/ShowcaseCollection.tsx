'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  SHOWCASE_ITEMS,
  SHOWCASE_CASES,
  SHOWCASE_CATEGORIES,
} from '@/data/showcase';
import type { ShowcaseItem } from '@/data/showcase';
import Img from '@/components/Img';

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US');
}

const VELVET_DARK = '/images/showcase/velvet.jpg';
const VELVET_GREEN = '/images/showcase/green-velvet.png';

/* ───── Hero ───── */
function ShowcaseHero({ velvet }: { velvet: string }) {
  return (
    <section className="sc-hero">
      <img
        src={velvet}
        alt=""
        aria-hidden="true"
        className="sc-hero__velvet"
      />
      <div className="sc-hero__vignette" />

      <div className="sc-hero__grid">
        <div>
          <p className="sc-hero__eyebrow">The Virtual Showcase</p>
          <h1 className="sc-hero__title">
            Our
            <br />
            Collection
          </h1>
          <div className="sc-hero__rule" />
          <p className="sc-hero__subtitle">
            Timeless designs. Exceptional craftsmanship.
            <br />
            Discover the perfect piece for your story.
          </p>
          <a href="#showcase" className="sc-hero__cta">
            Enter the case
          </a>
        </div>

        <div className="sc-hero__case">
          <div className="sc-hero__case-inner">
            <img
              src="/images/showcase/hero.jpg"
              alt="Diamond ring resting on black velvet inside a gold display case"
              className="sc-hero__img"
            />
            <div className="sc-hero__glass" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Collection Navigation ───── */
function CollectionNav({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <nav className="sc-nav">
      {SHOWCASE_CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`sc-nav__tab${active === cat.key ? ' active' : ''}`}
          onClick={() => onChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}

/* ───── Product Compartment ───── */
function ShowcaseProduct({
  item,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: {
  item: ShowcaseItem;
  onSelect: (item: ShowcaseItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
}) {
  return (
    <div className="sc-comp">
      <button
        className={`sc-comp__fav${isFavorite ? ' active' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.slug); }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <button
        className="sc-comp__btn"
        onClick={() => onSelect(item)}
        aria-label={`View ${item.name}`}
      >
        <div className="sc-comp__image">
          <Img
            src={item.image}
            alt={item.name}
            className="sc-comp__img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <span className="sc-comp__shadow" />
        </div>
        <span className="sc-comp__info">
          <span className="sc-comp__name">{item.name}</span>
          <span className="sc-comp__price">{formatPrice(item.price)}</span>
        </span>
      </button>
    </div>
  );
}

/* ───── Display Case ───── */
function DisplayCase({
  activeCase,
  items,
  onSelectItem,
  velvet,
  slideDirection,
  favorites,
  onToggleFavorite,
}: {
  activeCase: number;
  items: ShowcaseItem[];
  onSelectItem: (item: ShowcaseItem) => void;
  velvet: string;
  slideDirection: 'left' | 'right' | null;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}) {
  const caseItems = items.filter((i) => i.caseNumber === activeCase);
  const cols = 4;
  const rows = Math.ceil(caseItems.length / cols);

  const slideClass = slideDirection === 'right'
    ? ' sc-case--slide-right'
    : slideDirection === 'left'
      ? ' sc-case--slide-left'
      : '';

  return (
    <div id="showcase" className="sc-display">
      <div className="sc-case-3d">
        <div className="sc-case-3d__top" />
        <div className="sc-case-3d__body">
          <div className="sc-case-3d__left" />
          <div className={`sc-case${slideClass}`} key={activeCase}>
            <div className="sc-case__interior">
              <img
                src={velvet}
                alt=""
                aria-hidden="true"
                className="sc-case__velvet-img"
              />
              <div className="sc-case__vignette" />

              <div className="sc-case__grid">
                {caseItems.map((item) => (
                  <ShowcaseProduct
                    key={item.slug}
                    item={item}
                    onSelect={onSelectItem}
                    isFavorite={favorites.includes(item.slug)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>

              {/* Gold dividers */}
              <div className="sc-case__dividers">
                {Array.from({ length: Math.min(cols, caseItems.length) - 1 }, (_, i) => (
                  <span
                    key={`v${i}`}
                    className="sc-case__divider-v"
                    style={{ left: `${((i + 1) / Math.min(cols, caseItems.length)) * 100}%` }}
                  />
                ))}
                {Array.from({ length: rows - 1 }, (_, i) => (
                  <span
                    key={`h${i}`}
                    className="sc-case__divider-h"
                    style={{ top: `${((i + 1) / rows) * 100}%` }}
                  />
                ))}
              </div>

              <div className="sc-case__glass" />
            </div>
          </div>
          <div className="sc-case-3d__right" />
        </div>
        <div className="sc-case-3d__base" />
      </div>
    </div>
  );
}

/* ───── Case Navigation ───── */
function CaseNav({
  activeCase,
  onCaseChange,
  onDotClick,
}: {
  activeCase: number;
  onCaseChange: (direction: 'prev' | 'next') => void;
  onDotClick: (caseId: number) => void;
}) {
  const currentCase = SHOWCASE_CASES.find((c) => c.id === activeCase);
  const total = SHOWCASE_CASES.length;

  return (
    <div className="sc-case-nav">
      <button
        className="sc-case-nav__btn"
        onClick={() => onCaseChange('prev')}
        disabled={activeCase <= 1}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M12 4 L6 10 L12 16" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        Previous case
      </button>

      <div className="sc-case-nav__info">
        <p className="sc-case-nav__title">{currentCase?.name}</p>
        <div className="sc-case-nav__dots">
          {SHOWCASE_CASES.map((c) => (
            <button
              key={c.id}
              className={`sc-case-nav__dot${c.id === activeCase ? ' active' : ''}`}
              onClick={() => onDotClick(c.id)}
              aria-label={`Go to case ${c.id}`}
            />
          ))}
        </div>
      </div>

      <button
        className="sc-case-nav__btn"
        onClick={() => onCaseChange('next')}
        disabled={activeCase >= total}
      >
        Next case
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M8 4 L14 10 L8 16" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </button>
    </div>
  );
}

/* ───── Product Gallery (inside modal) ───── */
const GALLERY_PLACEHOLDERS = [
  '/images/showcase/ring-6.png',
  '/images/showcase/ring-7.png',
  '/images/showcase/ring-8.png',
  '/images/showcase/model.jpg',
  '/images/showcase/bench.jpg',
];

function ProductGallery({ item, velvet }: { item: ShowcaseItem; velvet: string }) {
  const [index, setIndex] = useState(0);

  const thumbImages = [
    item.image,
    ...GALLERY_PLACEHOLDERS,
  ];

  useEffect(() => {
    setIndex(0);
  }, [item.slug]);

  return (
    <div className="sc-gallery">
      <div className="sc-gallery__thumbs">
        {thumbImages.map((src, i) => (
          <button
            key={i}
            className={`sc-gallery__thumb${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`View ${i + 1}`}
          >
            <Img
              src={src}
              alt=""
              className="sc-gallery__thumb-img"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      <div className="sc-gallery__frame">
        <div className="sc-gallery__main">
          <img
            src={velvet}
            alt=""
            aria-hidden="true"
            className="sc-gallery__velvet"
          />
          <Img
            src={thumbImages[index]}
            alt={item.name}
            className="sc-gallery__img"
            sizes="(max-width: 640px) 100vw, 500px"
          />
          <div className="sc-gallery__glass" />

        </div>
      </div>
    </div>
  );
}

/* ───── Video Modal ───── */
function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="sc-video-modal" onClick={onClose}>
      <div className="sc-video-modal__frame" onClick={(e) => e.stopPropagation()}>
        <button className="sc-video-modal__close" onClick={onClose} aria-label="Close video">
          &times;
        </button>
        <div className="sc-video-modal__inner">
          <video
            src="/video-files/Jewelry-Repair-Ad.mp4"
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

/* ───── Product Modal ───── */
function ProductModal({
  item,
  items,
  onClose,
  onPlayVideo,
  onNavigate,
  velvet,
  isFavorite,
  onToggleFavorite,
}: {
  item: ShowcaseItem;
  items: ShowcaseItem[];
  onClose: () => void;
  onPlayVideo: () => void;
  onNavigate: (item: ShowcaseItem) => void;
  velvet: string;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
}) {
  const currentIndex = items.findIndex((i) => i.slug === item.slug);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(items[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(items[currentIndex + 1]);
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, hasPrev, hasNext, currentIndex, items, onNavigate]);

  const details = [
    { label: 'Metal', value: item.metals },
    { label: 'Karats', value: item.karats },
    { label: 'Style #', value: item.style },
    { label: 'Gemstone', value: item.gemstone },
    { label: 'Collection', value: item.collection },
  ].filter((d) => d.value);

  return (
    <div className="sc-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.name}>
      {/* Product navigation arrows */}
      <button
        className="sc-modal__nav sc-modal__nav--prev"
        onClick={(e) => { e.stopPropagation(); if (hasPrev) onNavigate(items[currentIndex - 1]); }}
        disabled={!hasPrev}
        aria-label="Previous product"
      >
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
          <path d="M12 4 L6 10 L12 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        className="sc-modal__nav sc-modal__nav--next"
        onClick={(e) => { e.stopPropagation(); if (hasNext) onNavigate(items[currentIndex + 1]); }}
        disabled={!hasNext}
        aria-label="Next product"
      >
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
          <path d="M8 4 L14 10 L8 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div className="sc-modal__panel" onClick={(e) => e.stopPropagation()}>
        <img
          src={velvet}
          alt=""
          aria-hidden="true"
          className="sc-modal__velvet"
        />
        <button className="sc-modal__close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="sc-modal__grid">
          <div className="sc-modal__left">
            <ProductGallery item={item} velvet={velvet} />

            <div className="sc-video-cta">
              <p className="sc-video-cta__eyebrow">See how this piece was created</p>
              <p className="sc-video-cta__text">
                Watch the 30-second journey from sketch to finished jewelry — design,
                CAD, the bench, the polish, the reveal.
              </p>
              <button className="sc-video-cta__btn" onClick={onPlayVideo}>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M5 2 L13 8 L5 14 Z" />
                </svg>
                Play Video
              </button>
            </div>
          </div>

          <div className="sc-details">
            <p className="sc-details__eyebrow">{item.category}</p>
            <h2 className="sc-details__name">{item.name}</h2>
            <p className="sc-details__price">{formatPrice(item.price)}</p>
            <div className="sc-details__rule" />
            <p className="sc-details__desc">
              {item.description.split('\n')[0]}
            </p>

            {details.length > 0 && (
              <div className="sc-details__specs">
                {details.map((d) => (
                  <div key={d.label} className="sc-details__spec">
                    <span className="sc-details__spec-label">{d.label}</span>
                    <span className="sc-details__spec-value">{d.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="sc-details__actions">
              <a href={`/jewelry/${item.category}/${item.subcategory}/${item.slug}?inquiry=1`} className="sc-btn-gold">Inquire Now</a>
              <button
                className="sc-btn-outline"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                View Entire Case
              </button>
              <button
                className={`sc-btn-heart${isFavorite ? ' active' : ''}`}
                onClick={() => onToggleFavorite(item.slug)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '♥' : '♡'}
              </button>
            </div>

            {/* Product dots indicator */}
            <div className="sc-modal__product-dots">
              {items.map((p, i) => (
                <button
                  key={p.slug}
                  className={`sc-modal__product-dot${p.slug === item.slug ? ' active' : ''}`}
                  onClick={() => onNavigate(p)}
                  aria-label={p.name}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Velvet Theme Toggle ───── */
type VelvetTheme = 'green' | 'boutique';

function VelvetToggle({
  theme,
  onToggle,
}: {
  theme: VelvetTheme;
  onToggle: () => void;
}) {
  return (
    <button
      className="sc-velvet-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'green' ? 'boutique' : 'emerald'} theme`}
    >
      <span className={`sc-velvet-toggle__track${theme === 'green' ? ' green' : ''}`}>
        <span className="sc-velvet-toggle__thumb" />
      </span>
      <span className="sc-velvet-toggle__label">
        {theme === 'green' ? 'Emerald' : 'Boutique'}
      </span>
    </button>
  );
}

/* ───── Main Collection Component ───── */
export default function ShowcaseCollection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCase, setActiveCase] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [velvetTheme, setVelvetTheme] = useState<VelvetTheme>('green');
  const [favorites, setFavorites] = useState<string[]>([]);

  const heroVelvet = velvetTheme === 'green' ? VELVET_GREEN : '';
  const caseVelvet = velvetTheme === 'green' ? VELVET_GREEN : VELVET_DARK;

  useEffect(() => {
    const el = document.querySelector('.showcase-page');
    if (el) el.setAttribute('data-velvet', velvetTheme);
    return () => { el?.removeAttribute('data-velvet'); };
  }, [velvetTheme]);

  const filteredItems = useMemo(() =>
    activeCategory === 'all'
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setActiveCase(1);
    setSlideDirection(null);
  }, []);

  const handleCaseChange = useCallback(
    (direction: 'prev' | 'next') => {
      setSlideDirection(direction === 'next' ? 'right' : 'left');
      setActiveCase((prev) => {
        if (direction === 'next') return Math.min(prev + 1, SHOWCASE_CASES.length);
        return Math.max(prev - 1, 1);
      });
    },
    []
  );

  const handleDotClick = useCallback((caseId: number) => {
    setSlideDirection(caseId > activeCase ? 'right' : 'left');
    setActiveCase(caseId);
  }, [activeCase]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const handleModalNavigate = useCallback((item: ShowcaseItem) => {
    setSelectedItem(item);
  }, []);

  return (
    <>
      <ShowcaseHero velvet={heroVelvet} />
      <section className="sc-browse-section">
        <img
          src={velvetTheme === 'green' ? VELVET_GREEN : ''}
          alt=""
          aria-hidden="true"
          className="sc-browse-section__velvet"
        />
        <CollectionNav active={activeCategory} onChange={handleCategoryChange} />
        <DisplayCase
          activeCase={activeCase}
          items={filteredItems}
          onSelectItem={setSelectedItem}
          velvet={caseVelvet}
          slideDirection={slideDirection}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <CaseNav
          activeCase={activeCase}
          onCaseChange={handleCaseChange}
          onDotClick={handleDotClick}
        />
      </section>
      <div className="sc-velvet-toggle-wrap">
        <VelvetToggle
          theme={velvetTheme}
          onToggle={() => setVelvetTheme((t) => (t === 'green' ? 'boutique' : 'green'))}
        />
      </div>
      {selectedItem && (
        <ProductModal
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onPlayVideo={() => setVideoOpen(true)}
          onNavigate={handleModalNavigate}
          velvet={caseVelvet}
          isFavorite={favorites.includes(selectedItem.slug)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </>
  );
}
