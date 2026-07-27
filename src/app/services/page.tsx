import type { Metadata } from 'next';
import VisitUsCta from '@/components/VisitUsCta';

export const metadata: Metadata = {
  title: 'Our Services — Greensboro, NC',
  description:
    'Davidas Design Concepts — Expert jewelry repair, custom design, CAD/CAM, engraving, appraisals, watch repair, and more. Greensboro, NC.',
  alternates: { canonical: '/services' },
};

// Ported from services.html. Prose kept verbatim (with <br><br>) via HTML strings.
const SERVICES: { icon: string; title: string; html: string }[] = [
  {
    icon: '◆',
    title: 'Jewelry Repair',
    html: `If you're looking for a shop that offers expert jewelry repair in Greensboro, NC, Davidas Design Concepts is the one you can trust. We operate one of the most complete and technologically advanced jewelry repair and manufacturing facilities in the entire state of North Carolina.<br><br>Our team specializes in custom jewelry design, using the latest innovations in CAD modeling, 3D printing, precision milling, and laser technology to bring your ideas to life with unmatched accuracy and artistry.<br><br>From everyday pieces to the most delicate heirlooms, we can repair silver, gold, platinum, and even gold-filled jewelry with exceptional craftsmanship. We are also one of the few shops in the region with the skill and equipment to restore antique filigree and intricate heirloom pieces — the kind of work most jewelers simply cannot do.<br><br>At Davidas Design Concepts, quality is not just a promise; it's the standard. Every repair, restoration, and custom project is handled with the highest level of care, precision, and integrity.<br><br>Contact us today to learn more about our jewelry repair and custom design services and discover why so many customers trust us with their most meaningful pieces.`,
  },
  {
    icon: '◎',
    title: 'Jewelry Appraisals',
    html: `We provide comprehensive appraisals for jewelry, loose gemstones, and watches.  Our services include insurance, replacement, liquidation, and audit appraisals, each prepared with detailed documentation and industry-standard evaluation methods.<br><br>For gemstones, we also offer advanced services such as stone mapping, Sarin measurement reports, and recutting analysis to determine value, proportions, and potential improvements.  Every appraisal is performed with precision and the expertise needed to give you accurate valuations you can rely on.`,
  },
  {
    icon: '✎',
    title: 'Engraving',
    html: `We offer a full range of engraving services — from traditional hand engraving to machine, laser, and advanced computer-aided engraving, including 3D laser engraving of photographs and artwork.  These technologies allow us to engrave on most metals as well as glass with exceptional clarity and precision.<br><br>Whether you have a favorite picture, a meaningful piece of artwork, or a custom design in mind, we can engrave it onto mugs, wine glasses, charms, rings, and many other personal items.  In addition to jewelry and gifts, we also engrave signs, name tags, corporate logos, awards, and specialty items.  Whatever the project, we bring your design to life with accuracy, artistry, and attention to detail.`,
  },
  {
    icon: '◇',
    title: 'Hand Engraving',
    html: `Hand engraving is the timeless art of decorating precious metals through the skillful use of traditional tools and the engraver's own creative vision.  Every cut is guided by the steady hand, trained eye, and artistic imagination of the engraver — no two pieces are ever alike.<br><br>Unlike machine-generated patterns, true hand engraving carries the subtle character, depth, and expression of the artist who creates it.  Each line, curve, and flourish becomes a permanent part of the metal, forming a miniature work of art that reflects both craftsmanship and emotion.<br><br>Because it is carved directly into the metal, hand engraving will not wear away like surface treatments or printed designs.  It becomes a lasting treasure — a piece of fine art that can be cherished and passed down through many generations.`,
  },
  {
    icon: '●',
    title: 'Pearl & Bead Stringing',
    html: `We offer complete pearl and bead restringing services, from simple single-strand repairs to complex multi-strand and knotted designs.  Whether your piece needs routine maintenance, a full restoration, or a complete redesign, we use high-quality materials and time-tested techniques to ensure strength, beauty, and longevity.  From pearls and gemstones to specialty beads, we carefully restring each piece to lay properly, feel comfortable, and look elegant for years to come.`,
  },
  {
    icon: '◆',
    title: 'Custom Jewelry Designs',
    html: `We specialize in creating truly one-of-a-kind jewelry pieces, hand-fabricated in platinum, gold, or silver.  Whether you bring us a rough pencil sketch, an idea you've been imagining for years, or an existing piece you want redesigned, we can bring your vision to life with exceptional craftsmanship.<br><br>Using advanced CAD (computer-aided design) technology, we transform your concept into a detailed 3D model that you can view from every angle.  This allows you to participate in the creative process, request adjustments, and approve the final design before fabrication begins.<br><br>From the first sketch to the finished piece, we combine artistry, precision, and modern technology to create jewelry that is personal, meaningful, and completely distinctive to you.  If you're searching for a unique, personal, and truly custom piece of jewelry, our design and fabrication capabilities will exceed your expectations.`,
  },
  {
    icon: '▣',
    title: 'CAD/CAM Design',
    html: `CAD/CAM is short for Computer-Aided Design and Computer-Aided Manufacturing — advanced technology that allows us to design and produce jewelry with exceptional accuracy and detail.  With CAD, we can easily modify or refine a design to match your exact preferences and show you realistic renderings of your new piece from every angle before it's made.<br><br>Once the design is approved, CAM technology transforms that digital model into a precise physical form, ensuring perfect proportions, clean lines, and a flawless foundation for the final hand-crafted work.  This combination of artistry and technology gives you complete confidence in the design process and results in beautifully crafted, highly accurate jewelry every time.`,
  },
  {
    icon: '◎',
    title: 'Jewelry Consultations',
    html: `Our jewelry consultations provide expert, unbiased guidance for anyone seeking clarity, confidence, or professional insight.  Consultations may include reviewing existing appraisals, critically examining the craftsmanship, quality, and artistry of a piece, and evaluating materials, condition, and long-term durability.<br><br>We offer consultation services for personal purchases, investment decisions, resale value, and auction potential.  Whether you're considering buying a new piece, verifying the accuracy of an appraisal, or determining the true worth of an item you already own, we provide knowledgeable, transparent advice to help you make informed decisions with confidence.`,
  },
  {
    icon: '⌚',
    title: 'Watch & Clock Repair',
    html: `We service all types of watches — from luxury timepieces like Rolex, Vacheron Constantin, and Baume &amp; Mercier to everyday department-store fashion watches.  Our watchmaker is Rolex-certified, ensuring every repair meets the highest standards of precision and craftsmanship.<br><br>We also specialize in the restoration of vintage and antique pocket watches, bringing heirloom pieces back to life with careful, historically accurate workmanship.<br><br>In addition to watches, we repair a wide range of clocks, including table clocks, wall clocks, grandfather clocks, specialty clocks, and traditional cuckoo clocks.  Whether your timepiece needs routine maintenance, a full overhaul, or delicate restoration, we provide expert service you can rely on.`,
  },
];

export default function ServicesPage() {
  return (
    <>
      <header className="category-header reveal">
        <div className="container">
          <h1 className="section__title">Our Services</h1>
        </div>
      </header>

      <section className="section reveal">
        <div className="container">
          <div className="services-grid" data-stagger>
            {SERVICES.map((s, i) => (
              <article className="service-card" key={i}>
                <span className="service-card__icon">{s.icon}</span>
                <h2 className="service-card__title">{s.title}</h2>
                <p
                  className="service-card__text"
                  dangerouslySetInnerHTML={{ __html: s.html }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <VisitUsCta />
    </>
  );
}
