import Link from 'next/link';
import { SITE } from '@/lib/site';

// Shared "Visit Us / Ready to Create Something Special?" CTA — appears on
// the homepage and services page in the original.
export default function VisitUsCta() {
  return (
    <section className="section section--alt reveal">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Visit Us</span>
          <h2 className="section__title">Ready to Create Something Special?</h2>
          <p className="section__desc">
            Schedule a consultation or stop by our Greensboro studio. We&apos;d love to bring your
            vision to life.
          </p>
        </div>
        <div className="contact-grid" data-stagger>
          <div className="contact-info__item">
            <div className="contact-info__label">Address</div>
            <div className="contact-info__value">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
            </div>
          </div>
          <div className="contact-info__item">
            <div className="contact-info__label">Phone</div>
            <div className="contact-info__value">
              <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>
            </div>
          </div>
          <div className="contact-info__item">
            <div className="contact-info__label">Email</div>
            <div className="contact-info__value">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>
          <div className="contact-info__item">
            <Link href="/contact" className="btn btn--primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
