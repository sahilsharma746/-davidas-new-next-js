import type { Metadata } from 'next';
import Link from 'next/link';
import Img from '@/components/Img';

export const metadata: Metadata = {
  title: 'About Us — Greensboro, NC',
  description:
    'Our story — Davidas Design Concepts began July 8, 1995 as a jewelry repair service center. Quality craftsmanship, CAD technology, and custom design in Greensboro, NC.',
  alternates: { canonical: '/about' },
};

// Ported from about.html
export default function AboutPage() {
  return (
    <>
      <header className="category-header reveal">
        <div className="container">
          <h1 className="section__title">About Davidas Design Concepts</h1>
        </div>
      </header>

      {/* Our Beginnings */}
      <section className="section reveal">
        <div className="container">
          <div className="about-split">
            <div className="about-split__image">
              <Img
                src="/images/Flash%20Page/Neck%20-%201.jpg"
                alt="Custom necklace with pear shape sapphire pendant"
                sizes="(max-width: 900px) 90vw, 600px"
                priority
              />
            </div>
            <div className="about-split__content">
              <span className="section__tag">Our Story</span>
              <h2 className="section__title">Our Beginnings</h2>
              <p>
                Davidas Design Concepts began on July 8, 1995, originally serving as a dedicated
                repair center for retail jewelry stores. After many years working within the
                industry — alongside various jewelers and repair technicians — I became increasingly
                dissatisfied with the inconsistency and often poor quality of work I witnessed.
              </p>
              <p>
                Repair standards varied dramatically from store to store. The results depended not
                only on the skill level of the individual jeweler, but also on the tools, equipment,
                and time they were given. Too often, customers were turned away because a store
                lacked the expertise or capability to perform the repair properly.
              </p>
              <p>
                I founded Davidas Design Concepts to change that. My goal was simple: create a place
                where every customer could receive exceptional craftsmanship, honest evaluation, and
                repairs done to the highest professional standard — no compromises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Davidas */}
      <section className="section section--alt reveal">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Our Difference</span>
            <h2 className="section__title">Why Choose Davidas</h2>
            <p className="section__desc">
              With so many jewelers offering repairs, custom design, and manufacturing, it&apos;s
              natural to wonder what sets one apart. At Davidas Design Concepts, the difference is
              experience, integrity, and capability. We were founded on the belief that customers
              deserve craftsmanship without compromise — work done correctly, honestly, and with the
              highest professional standards. Our studio combines decades of hands-on expertise with
              one of the most advanced repair and manufacturing facilities in North Carolina,
              allowing us to perform work that most jewelers simply cannot do. From intricate
              heirloom restorations to precision CAD/CAM design and complex repairs, every piece
              receives meticulous attention and the skill of a master craftsman. When you choose
              Davidas Design Concepts, you&apos;re choosing accuracy, artistry, and a level of care
              that ensures your jewelry is treated as if it were our own.
            </p>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="section reveal">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">What We Stand For</span>
            <h2 className="section__title">Our Values &amp; Philosophy</h2>
          </div>
          <div className="services-grid" data-stagger>
            <article className="service-card">
              <span className="service-card__icon">◆</span>
              <h3 className="service-card__title">Quality Craftsmanship</h3>
              <p className="service-card__text">
                Every piece we create or repair is treated with the highest standards. We refuse to
                compromise on quality—each item receives the attention and skill it deserves.
              </p>
            </article>
            <article className="service-card">
              <span className="service-card__icon">▣</span>
              <h3 className="service-card__title">Latest Technology</h3>
              <p className="service-card__text">
                We use state-of-the-art CAD (computer-aided design) technology alongside traditional
                techniques. This allows for precision, intricate detail, and the ability to
                visualize your design before it&apos;s made.
              </p>
            </article>
            <article className="service-card">
              <span className="service-card__icon">◇</span>
              <h3 className="service-card__title">Custom Designs</h3>
              <p className="service-card__text">
                From concept to completion, we work with you to create one-of-a-kind pieces. Your
                vision becomes reality through our design expertise and manufacturing capabilities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <div style={{ textAlign: 'center' }}>
            <Link href="/contact" className="btn btn--primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
