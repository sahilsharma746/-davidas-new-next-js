import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CATEGORIES } from '@/data/products';

// Ported verbatim from the original includes.js footer.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">
              <span>{SITE.name}</span>
            </div>
            <p className="footer__tagline">
              The fusion of art, craftsmanship and technology. Custom jewelry design in
              Greensboro, NC since 1995.
            </p>
          </div>
          <div>
            <div className="footer__heading">Explore</div>
            <ul className="footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jewelry">Jewelry</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/gems-gemology">Gems &amp; Gemology</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__heading">Jewelry</div>
            <ul className="footer__links">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/jewelry/${cat.id}`}>{cat.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer__heading">Connect</div>
            <ul className="footer__links">
              <li><Link href="/videos">Videos</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__heading">Contact</div>
            <ul className="footer__links">
              <li><a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>
                <span style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; {year} {SITE.name}. All rights reserved.</span>
          <span>{SITE.establishedLabel}</span>
        </div>
      </div>
    </footer>
  );
}
