'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import type { Product } from '@/data/products';

const DEFAULT_HINT = 'Metal, Karat & Color, and if you have stones or stone choice';

// Ported from jewelry.js showDetail() + openInquiry() + open3DViewer() + inquiry-form submit.
// Rendered on the server for its initial HTML (SEO-crawlable), then hydrated.
export default function ProductDetail({
  product,
  backHref,
}: {
  product: Product;
  backHref: string;
}) {
  const p = product;
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const lockScroll = (lock: boolean) => {
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  const openInquiry = () => {
    setInquiryOpen(true);
    lockScroll(true);
  };
  const closeInquiry = useCallback(() => {
    setInquiryOpen(false);
    lockScroll(false);
  }, []);
  const openViewer = () => {
    setViewerOpen(true);
    lockScroll(true);
  };
  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    lockScroll(false);
  }, []);

  // Auto-open inquiry modal when arriving via a legacy #inquiry/ link (?inquiry=1).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('inquiry') === '1') {
      setInquiryOpen(true);
      lockScroll(true);
    }
  }, []);

  // Escape closes whichever modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewerOpen) closeViewer();
        if (inquiryOpen) closeInquiry();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [viewerOpen, inquiryOpen, closeViewer, closeInquiry]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setTimeout(() => {
          setStatus('idle');
          form.reset();
          closeInquiry();
        }, 2500);
      } else {
        alert(data.message);
        setStatus('idle');
      }
    } catch {
      alert('Something went wrong. Please call us at (336) 790-8214.');
      setStatus('idle');
    }
  }

  const btnLabel =
    status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Submit';

  return (
    <>
      <div className="product-detail">
        <div className="product-detail__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} />
          {p.video && (
            <button
              className="product-detail__3d-btn"
              type="button"
              onClick={openViewer}
            >
              &#9654; Click to View in 3D
            </button>
          )}
        </div>
        <div className="product-detail__info">
          <h1 className="product-detail__name">{p.name}</h1>
          <div className="product-detail__style-row">
            <span className="product-detail__style-label">Style #{p.style}</span>
          </div>
          <button
            className="btn btn--primary product-detail__pricing-btn"
            type="button"
            onClick={openInquiry}
          >
            Click For Pricing
          </button>
          <p className="product-detail__desc">{p.description}</p>
          {(p.metals || p.sizes || p.karats) && (
            <div className="product-detail__specs">
              {p.metals && (
                <div className="product-detail__spec">
                  <span className="product-detail__spec-label">Metals</span>
                  <span className="product-detail__spec-value">{p.metals}</span>
                </div>
              )}
              {p.sizes && (
                <div className="product-detail__spec">
                  <span className="product-detail__spec-label">Sizes</span>
                  <span className="product-detail__spec-value">{p.sizes}</span>
                </div>
              )}
              {p.karats && (
                <div className="product-detail__spec">
                  <span className="product-detail__spec-label">Karats</span>
                  <span className="product-detail__spec-value">{p.karats}</span>
                </div>
              )}
            </div>
          )}
          <Link href={backHref} className="product-detail__back">
            &larr; Return
          </Link>
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeInquiry();
          }}
        >
          <div className="modal">
            <button className="modal__close" aria-label="Close" onClick={closeInquiry}>
              &times;
            </button>
            <h2 className="modal__title">Pricing Inquiry</h2>
            <p className="modal__subtitle">Style #{p.style}</p>
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="inquiry-form__row">
                <div className="inquiry-form__field">
                  <label htmlFor="inq-fname">First Name *</label>
                  <input type="text" id="inq-fname" name="fname" required />
                </div>
                <div className="inquiry-form__field">
                  <label htmlFor="inq-lname">Last Name *</label>
                  <input type="text" id="inq-lname" name="lname" required />
                </div>
              </div>
              <div className="inquiry-form__field">
                <label htmlFor="inq-email">Email Address *</label>
                <input type="email" id="inq-email" name="email" required />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor="inq-style">Style #</label>
                <input type="text" id="inq-style" name="style" value={p.style} readOnly />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor="inq-message">Tell us any changes you want made:</label>
                <p className="inquiry-form__hint">{p.formHint || DEFAULT_HINT}</p>
                <textarea id="inq-message" name="message" rows={5}></textarea>
              </div>
              {/* Honeypot — must stay named "website"; bots that fill it get a fake success. */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="inq-website">Website</label>
                <input type="text" id="inq-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="inquiry-form__actions">
                <button type="submit" className="btn btn--primary" disabled={status !== 'idle'}>
                  {btnLabel}
                </button>
                <button type="reset" className="btn btn--outline">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3D Viewer Modal */}
      {viewerOpen && p.video && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
        >
          <div className="modal modal--viewer">
            <button className="modal__close" aria-label="Close" onClick={closeViewer}>
              &times;
            </button>
            <iframe src={p.video} title={`${p.name} — 3D View`} allow="autoplay" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}
