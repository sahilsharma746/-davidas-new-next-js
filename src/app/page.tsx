import Link from 'next/link';
import Img from '@/components/Img';
import { SITE } from '@/lib/site';

const CARD_SIZES = '(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px';

// Homepage — ported from index.html. Uses the site-default metadata from layout.tsx.
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="hero__bg"></div>
        <div className="container">
          <div className="hero__content">
            <span className="hero__tag">Greensboro, NC — Since 1995</span>
            <h1 className="hero__title">
              Davidas <em>Design Concepts</em>
            </h1>
            <p className="hero__subtitle">The fusion of art, craftsmanship and technology.</p>
            <div className="hero__actions">
              <Link href="/jewelry" className="btn btn--primary">
                Explore Collection
              </Link>
              <Link href="/services" className="btn btn--outline">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Services */}
      <section className="section reveal">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">What We Offer</span>
            <h2 className="section__title">Our Services</h2>
            <p className="section__desc">
              From custom design to expert repair, we bring decades of craftsmanship to every
              piece.
            </p>
          </div>
          <div className="services-grid" data-stagger>
            <article className="service-card">
              <span className="service-card__icon">◆</span>
              <h3 className="service-card__title">Jewelry Repair</h3>
              <p className="service-card__text">
                Expert restoration and repair for all types of jewelry. We handle everything from
                simple resizing to complex restorations.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
            <article className="service-card">
              <span className="service-card__icon">◇</span>
              <h3 className="service-card__title">Custom Design</h3>
              <p className="service-card__text">
                Bring your jewelry vision to life. Our designers work with you to create
                one-of-a-kind pieces tailored to your style, crafted with exceptional detail and
                quality.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
            <article className="service-card">
              <span className="service-card__icon">▣</span>
              <h3 className="service-card__title">CAD/CAM Design</h3>
              <p className="service-card__text">
                Hand-fabricated craftsmanship and state-of-the-art computer-aided design and
                manufacturing for precision, accuracy, and intricate detail in every piece.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
            <article className="service-card">
              <span className="service-card__icon">✎</span>
              <h3 className="service-card__title">Engraving</h3>
              <p className="service-card__text">
                Hand engraving, machine engraving, laser engraving, and 3D relief engraving are all
                available to personalize your jewelry. Add meaning to any piece with custom
                inscriptions, symbols, dates, or designs that make your jewelry truly your own.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
            <article className="service-card">
              <span className="service-card__icon">◎</span>
              <h3 className="service-card__title">Appraisals</h3>
              <p className="service-card__text">
                Professional jewelry appraisals for insurance, estate planning, and resale. We
                provide accurate, detailed valuations you can trust, backed by expert examination
                and industry-standard documentation.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
            <article className="service-card">
              <span className="service-card__icon">⌚</span>
              <h3 className="service-card__title">Watch Repair</h3>
              <p className="service-card__text">
                Complete watch and clock repair services — from simple battery replacements to full
                mechanical overhauls. We keep your timepieces running accurately and reliably.
              </p>
              <Link href="/services" className="service-card__link">Learn more</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Why Davidas */}
      <section className="section section--alt reveal">
        <div className="container">
          <div className="about-split">
            <div className="about-split__image">
              <Img
                src="/images/Cross%20Pendants/113-334/A.png"
                alt="Custom designed cross pendant in yellow gold"
                sizes="(max-width: 900px) 90vw, 600px"
                priority
              />
            </div>
            <div className="about-split__content">
              <span className="section__tag">Our Difference</span>
              <h2 className="section__title why-davidas-text">Why Davidas</h2>
              <p>
                At Davidas Design Concepts, every piece of custom-designed jewelry from our
                Greensboro, NC studio is crafted with intention. We don&apos;t just assemble—we
                design, we print, and we manufacture every item ourselves.
              </p>
              <p>
                Using advanced CAD technology alongside traditional craftsmanship, we bring your
                ideas to life with precision and artistry. From initial concept to finished piece,
                our team controls every step of the process, ensuring quality and authenticity in
                every creation.
              </p>
              <Link href="/about" className="btn btn--outline">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jewelry Categories */}
      <section className="section reveal">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Browse Collection</span>
            <h2 className="section__title">Jewelry Categories</h2>
            <p className="section__desc">
              Explore our handcrafted collections across every style and occasion.
            </p>
          </div>
          <div className="jewelry-grid" data-stagger>
            <Link href="/jewelry/ladies" className="jewelry-card">
              <div className="jewelry-card__image">
                <Img src="/images/Ladies_Rings/405-713/D.png" alt="Ladies jewelry collection" sizes={CARD_SIZES} />
              </div>
              <div className="jewelry-card__body">
                <span className="jewelry-card__category">Ladies</span>
                <h3 className="jewelry-card__title">Bracelets, Earrings, Pendants &amp; Rings</h3>
                <p className="jewelry-card__desc">Elegant pieces for every occasion</p>
              </div>
            </Link>
            <Link href="/jewelry/religious" className="jewelry-card">
              <div className="jewelry-card__image">
                <Img src="/images/Cross%20Pendants/113-334/A.png" alt="Religious jewelry collection" sizes={CARD_SIZES} />
              </div>
              <div className="jewelry-card__body">
                <span className="jewelry-card__category">Religious Jewelry</span>
                <h3 className="jewelry-card__title">Faith-Inspired Designs</h3>
                <p className="jewelry-card__desc">Crosses, pendants &amp; the Gospel Necklace</p>
              </div>
            </Link>
            <Link href="/jewelry/wedding" className="jewelry-card">
              <div className="jewelry-card__image">
                <Img src="/images/Ladies_Rings/417-186/C.png" alt="Wedding and engagement rings" sizes={CARD_SIZES} />
              </div>
              <div className="jewelry-card__body">
                <span className="jewelry-card__category">Wedding &amp; Engagement</span>
                <h3 className="jewelry-card__title">Rings for Forever</h3>
                <p className="jewelry-card__desc">Custom designs for your special day</p>
              </div>
            </Link>
            <Link href="/jewelry/gents" className="jewelry-card">
              <div className="jewelry-card__image">
                <Img src="/images/Gents%20Rings/415-821/E-new.png" alt="Gents rings and pendants" sizes={CARD_SIZES} />
              </div>
              <div className="jewelry-card__body">
                <span className="jewelry-card__category">Gents</span>
                <h3 className="jewelry-card__title">Rings &amp; Pendants</h3>
                <p className="jewelry-card__desc">Bold, distinctive men&apos;s jewelry</p>
              </div>
            </Link>
            <Link href="/jewelry/specialty" className="jewelry-card">
              <div className="jewelry-card__image">
                <Img src="/images/Professional/647-333/F.png" alt="Specialty and professional jewelry" sizes={CARD_SIZES} />
              </div>
              <div className="jewelry-card__body">
                <span className="jewelry-card__category">Specialty</span>
                <h3 className="jewelry-card__title">Corporate, Professional &amp; Novelty</h3>
                <p className="jewelry-card__desc">Unique pieces for every passion</p>
              </div>
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
            <Link href="/jewelry" className="btn btn--primary">View All Jewelry</Link>
          </div>
        </div>
      </section>

      {/* Gem of the Month */}
      <section className="section section--alt reveal">
        <div className="container">
          <div className="gem-feature">
            <div className="gem-feature__image">
              <Img
                src="/images/Gem_Profile_Pictures/Paraiba%20Tourmaline.jpg"
                alt="Paraiba Tourmaline gemstone"
                sizes="280px"
              />
            </div>
            <div className="gem-feature__content">
              <span className="section__tag">Featured Stone</span>
              <h2>Gem of the Month</h2>
              <p className="author">Paraiba Tourmaline — by David Federman</p>
              <p>
                Paraiba tourmaline is a rare, neon-glowing gemstone from Brazil&apos;s Paraiba
                mining district. Discovered in 1989, these stones sport electric teal and
                sapphire-blue colors that make them ravishingly distinctive. At their best, Paraiba
                tourmalines are magnificent by any measure.
              </p>
              <Link href="/articles/paraiba-tourmaline" className="btn btn--primary">
                Read Full Article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section reveal">
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
              <Link href="/contact" className="btn btn--primary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
