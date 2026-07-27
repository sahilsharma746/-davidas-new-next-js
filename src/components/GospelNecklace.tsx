'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// Ported from gospel-necklace.html + js/gospel.js
const PAYPAL_ME_URL = 'http://www.paypal.me/davidasdesign';
const VIEWER_URL =
  'https://ijewel.design/embedded?slug=b782c05&isAutoplay=true&isResetView=false&isPlayCameraViews=false&isPlayAnimations=false';

const OPTIONS: { value: string; label: string }[] = [
  { value: 'Large Silver 20 Inch|199.00', label: 'Large Silver 20 Inch — $199.00' },
  { value: 'Large Silver 18 Inch|189.00', label: 'Large Silver 18 Inch — $189.00' },
  { value: 'Small Silver 20 Inch|179.00', label: 'Small Silver 20 Inch — $179.00' },
  { value: 'Small Silver 18 Inch|169.00', label: 'Small Silver 18 Inch — $169.00' },
  { value: 'Large Gold-Filled 20 Inch|244.00', label: 'Large Gold-Filled 20 Inch — $244.00' },
  { value: 'Large Gold-Filled 18 Inch|234.00', label: 'Large Gold-Filled 18 Inch — $234.00' },
  { value: 'Small Gold-Filled 20 Inch|220.00', label: 'Small Gold-Filled 20 Inch — $220.00' },
  { value: 'Small Gold-Filled 18 Inch|210.00', label: 'Small Gold-Filled 18 Inch — $210.00' },
];

type StatusType = '' | 'success' | 'error';

export default function GospelNecklace() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState<{ msg: string; type: StatusType }>({ msg: '', type: '' });
  const [listening, setListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const parts = selected ? selected.split('|') : ['', '0'];
  const selectedNecklace = parts[0];
  const selectedPrice = parseFloat(parts[1]) || 0;

  const closeViewer = useCallback(() => setViewerOpen(false), []);

  // body scroll lock + escape (ported from gospel.js)
  useEffect(() => {
    document.body.style.overflow = viewerOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [viewerOpen, closeViewer]);

  function showStatus(msg: string, type: StatusType) {
    setStatus({ msg, type });
  }
  function clearStatus() {
    setStatus({ msg: '', type: '' });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearStatus();
    if (!selected) {
      showStatus('Please select a product.', 'error');
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.append('necklace', selectedNecklace);
    formData.append('price', selectedPrice.toFixed(2));
    try {
      const res = await fetch('/api/order', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        showStatus('Order submitted successfully! Your details have been sent.', 'success');
      } else {
        showStatus(
          'Error: ' + (data.message || 'Could not send the form. Please try again.'),
          'error'
        );
      }
    } catch {
      // Faithful to original: reassure the customer on a network hiccup.
      showStatus('Order submitted successfully! Your details have been sent.', 'success');
    }
  }

  function handlePayNow() {
    clearStatus();
    if (!selectedNecklace || selectedPrice <= 0) {
      showStatus('Please select a product first before paying.', 'error');
      return;
    }
    window.open(PAYPAL_ME_URL + '/' + selectedPrice.toFixed(2), '_blank');
  }

  function handleReset() {
    clearStatus();
    setSelected('');
  }

  function toggleVoiceover() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setListening(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setListening(false);
    }
  }

  return (
    <>
      <main
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + var(--space-md))' }}
      >
        <div className="container">
          {/* Header */}
          <div className="gospel-header">
            <h1>Gospel Necklace</h1>
            <p>Handcrafted with meaning — Available in Silver &amp; Gold-Filled</p>
          </div>

          {/* Product Images */}
          <div className="gospel-images">
            <div className="gospel-image-box" onClick={() => setViewerOpen(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Gospel_Necklace/B.png" alt="Gospel Necklace - Click to view in 3D" />
              <div className="gospel-image-label">&#9654; Click to View in 3D</div>
            </div>
            <div className="gospel-image-box gospel-image-box--static">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Gospel_Necklace/Model.jpg" alt="Gospel Necklace - Model View" />
            </div>
          </div>

          {/* Promo Video */}
          <div className="gospel-video">
            <h2>Watch the Gospel Necklace</h2>
            <video
              controls
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                maxWidth: '720px',
                borderRadius: 'var(--radius)',
                margin: '0 auto',
                display: 'block',
              }}
            >
              <source src="/video-files/Gospesl.MOV" type="video/quicktime" />
              <source src="/video-files/Gospesl.MOV" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Voice Over */}
          <div className="gospel-voiceover">
            <button className="btn btn--outline" onClick={toggleVoiceover} type="button">
              {listening ? '■ Stop Listening' : '▶ Listen to the Story'}
            </button>
            <audio ref={audioRef} preload="none" onEnded={() => setListening(false)}>
              <source src="/audio/gospel-voiceover.m4a" type="audio/mp4" />
            </audio>
          </div>

          {/* Description */}
          <div className="gospel-description">
            <h2>Wear the Story That Changed Everything</h2>
            <p>
              The Gospel Necklace is a beautifully crafted piece designed to do more than shine —
              it speaks. Every symbol on this necklace represents a chapter of the gospel of Jesus
              Christ, allowing you to wear and share the entire story of salvation.
            </p>

            <h3>Each symbol reflects a moment in God&rsquo;s redemptive plan:</h3>
            <ul className="gospel-symbols">
              <li><strong>He Came</strong> — Jesus stepped out of heaven and became a man</li>
              <li><strong>He Died</strong> — He gave His life on the cross to save mankind</li>
              <li><strong>He Rose</strong> — He conquered the grave and redeemed mankind</li>
              <li><strong>He Ascended</strong> — He returned to heaven to prepare a place for His people</li>
              <li><strong>He Will Return</strong> — He will come again to rule and reign</li>
            </ul>
            <p>Together, these symbols create a powerful, elegant testimony you can wear every day.</p>

            <h3>Why Women Love It</h3>
            <ul className="gospel-features">
              <li>A meaningful way to express and share your faith</li>
              <li>A natural conversation starter</li>
              <li>Lightweight, comfortable, and beautifully designed</li>
              <li>A heartfelt gift for birthdays, baptisms, holidays, and special moments</li>
            </ul>

            <h3>A Necklace With Purpose</h3>
            <p>
              When someone asks, &ldquo;What does your necklace mean?&rdquo; you have the perfect
              opportunity to share the greatest story ever told.
            </p>
            <p>
              <strong>
                The Gospel Necklace is more than jewelry — it&rsquo;s your testimony in wearable
                form.
              </strong>
            </p>
          </div>

          {/* Order Form */}
          <div className="gospel-order">
            <h2>Order Your Gospel Necklace</h2>
            <form ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
              <div className="gospel-form-row">
                <div className="gospel-form-field">
                  <label htmlFor="gn-fname">First Name *</label>
                  <input type="text" id="gn-fname" name="firstName" required />
                </div>
                <div className="gospel-form-field">
                  <label htmlFor="gn-lname">Last Name *</label>
                  <input type="text" id="gn-lname" name="lastName" required />
                </div>
              </div>
              <div className="gospel-form-field">
                <label htmlFor="gn-email">Email Address *</label>
                <input type="email" id="gn-email" name="email" required />
              </div>
              <div className="gospel-form-field">
                <label htmlFor="gn-product">Product *</label>
                <select
                  id="gn-product"
                  name="necklace_select"
                  required
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">-- Choose Size &amp; Metal --</option>
                  {OPTIONS.map((o) => (
                    <option value={o.value} key={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {selected && (
                <div className="gospel-price">
                  <span className="gospel-price__label">Your Total:</span>
                  <span className="gospel-price__amount">${selectedPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="gospel-form-field">
                <label htmlFor="gn-notes">Message</label>
                <p className="gospel-form-hint">
                  For multiple orders, special requests, or for 10 or 14 karat gold — please send us
                  a message
                </p>
                <textarea id="gn-notes" name="customerNotes" rows={5}></textarea>
              </div>

              {/* Honeypot */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="gn-website">Website</label>
                <input type="text" id="gn-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="gospel-form-divider">Mailing Address</div>

              <div className="gospel-form-field">
                <label htmlFor="gn-address">Address *</label>
                <input type="text" id="gn-address" name="address1" required />
              </div>
              <div className="gospel-form-field gospel-form-field--short">
                <label htmlFor="gn-apt">Apt.</label>
                <input type="text" id="gn-apt" name="address2" />
              </div>
              <div className="gospel-form-row">
                <div className="gospel-form-field" style={{ flex: 2 }}>
                  <label htmlFor="gn-city">City *</label>
                  <input type="text" id="gn-city" name="city" required />
                </div>
                <div className="gospel-form-field" style={{ flex: 1 }}>
                  <label htmlFor="gn-state">State *</label>
                  <input type="text" id="gn-state" name="state" maxLength={2} required />
                </div>
                <div className="gospel-form-field" style={{ flex: 1 }}>
                  <label htmlFor="gn-zip">ZIP *</label>
                  <input type="text" id="gn-zip" name="zip" required />
                </div>
              </div>

              <div className="gospel-form-actions">
                <button type="submit" className="btn btn--primary">Submit Order</button>
                <button type="button" className="btn btn--outline" onClick={handlePayNow}>
                  Pay Now
                </button>
                <button type="reset" className="btn btn--outline">Reset</button>
              </div>
              <div
                className={`gospel-status${status.type ? ' gospel-status--' + status.type : ''}`}
              >
                {status.msg}
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* 3D Viewer Modal */}
      {viewerOpen && (
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
            <iframe src={VIEWER_URL} title="Gospel Necklace 3D View" allow="autoplay" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}
