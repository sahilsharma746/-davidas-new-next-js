import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us — Greensboro, NC',
  description:
    'Contact Davidas Design Concepts — 220 S. Swing Rd, Unit #1, Greensboro, NC 27409. Call (336) 790-8214 or send a message.',
  alternates: { canonical: '/contact' },
};

// Ported from contact.html
export default function ContactPage() {
  return (
    <>
      <header className="category-header reveal">
        <div className="container">
          <h1 className="section__title">Contact Us</h1>
        </div>
      </header>

      <section className="section reveal">
        <div className="container">
          <div className="contact-grid contact-page__layout">
            <div>
              <div
                className="section__header"
                style={{ textAlign: 'left', marginBottom: 'var(--space-lg)' }}
              >
                <span className="section__tag">Visit Us</span>
                <h2 className="section__title">Get in Touch</h2>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__label">Address</div>
                <div className="contact-info__value">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=220+S+Swing+Rd,+Unit+1,+Greensboro,+NC+27409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ marginTop: 'var(--space-sm)' }}
                >
                  Get Directions
                </a>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__label">Phone</div>
                <div className="contact-info__value">
                  <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__label">Fax</div>
                <div className="contact-info__value">
                  <a href="tel:+18884987540">{SITE.tollFree}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__label">Email</div>
                <div className="contact-info__value">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </div>
            </div>
            <div>
              <div
                className="section__header"
                style={{ textAlign: 'left', marginBottom: 'var(--space-lg)' }}
              >
                <span className="section__tag">Send a Message</span>
                <h2 className="section__title">Contact Form</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Studio Photos */}
      <section className="section reveal">
        <div className="container">
          <div className="about-split">
            <div className="about-split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Contact_page/1.JPG"
                alt="Davidas Design Concepts building at 220 S. Swing Rd, Greensboro, NC"
              />
            </div>
            <div className="about-split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Contact_page/2.JPG"
                alt="Davidas Design Concepts storefront entrance"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
