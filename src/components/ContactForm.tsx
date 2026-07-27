'use client';

import { useState } from 'react';

// Ported from main.js contact-form handler → posts to /api/contact.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        alert(data.message);
        setSending(false);
      }
    } catch {
      alert('Something went wrong. Please call us at (336) 790-8214.');
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
        <h3 style={{ color: 'var(--color-accent)' }}>Message Sent!</h3>
        <p>Thank you for contacting us. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} method="post">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="your@email.com" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" placeholder="(336) 555-0000" />
      </div>
      <div className="form-group">
        <label htmlFor="service">Service Interest</label>
        <select id="service" name="service" defaultValue="">
          <option value="">Select a service</option>
          <option value="jewelry-repair">Jewelry Repair</option>
          <option value="jewelry-appraisals">Jewelry Appraisals</option>
          <option value="engraving">Engraving</option>
          <option value="hand-engraving">Hand Engraving</option>
          <option value="pearl-bead-stringing">Pearl &amp; Bead Stringing</option>
          <option value="custom-jewelry-designs">Custom Jewelry Designs</option>
          <option value="cad-cam-design">CAD/CAM Design</option>
          <option value="jewelry-consultations">Jewelry Consultations</option>
          <option value="watch-clock-repair">Watch &amp; Clock Repair</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project or question..."
        ></textarea>
      </div>
      {/* Honeypot */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="hp-website">Website</label>
        <input type="text" id="hp-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn--primary" disabled={sending}>
        {sending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
