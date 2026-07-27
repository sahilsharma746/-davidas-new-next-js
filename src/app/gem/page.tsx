import type { Metadata } from 'next';
import GemReadMore from '@/components/GemReadMore';
import Img from '@/components/Img';

export const metadata: Metadata = {
  title: 'Gem of the Month — Paraiba Tourmaline',
  description:
    "Gem of the Month — Paraiba Tourmaline by David Federman. Discover the rare neon-glowing tourmalines from Brazil's Paraiba mining district.",
  alternates: { canonical: '/gem' },
};

// Legacy "Gem of the Month" page — kept at /gem (not linked in nav), ported from gem.html.
export default function GemPage() {
  return (
    <section className="section reveal">
      <div className="container">
        <div className="gem-feature">
          <div className="gem-feature__image">
            <Img
              src="/images/Gem_Profile_Pictures/Paraiba%20Tourmaline.jpg"
              alt="Paraiba Tourmaline gemstone"
              sizes="280px"
              priority
            />
          </div>
          <div className="gem-feature__content">
            <span className="section__tag">Gem of the Month</span>
            <h1>Paraiba Tourmaline</h1>
            <p className="author">by David Federman</p>
            <p>
              The world has lived so long with a six-digit Dow Jones average that it comes as a
              shock to be reminded this bellwether index for the U.S. stock market didn&apos;t top
              1,500 until 1983 and 2,000 until 1986. And when you are told that the average sank to
              577 in 1973 during a recession far milder than that of 1990-92, your brain feels like
              a gong in a Buddhist monastery. Numbers that low are just too bad to be true.
            </p>
            <p>
              Now imagine the reaction of sound minds when quoted prices of more than $20,000 per
              carat for tourmaline. Of course, these prices are commanded not by an ordinary garden
              variety fine tourmaline. No this altitude is reserved exclusively for Paraiba
              tourmaline: a strain of neon-glowing tourmalines from Brazil&apos;s Paraiba mining
              district discovered in 1989. Numbers that high were unheard of for so-called
              semi-precious gemstones in the past.
            </p>
            <p>
              Paraiba prices are as close to paranormal as gem prices get. They have defied gravity,
              conventional wisdom and a blistering recession in the most important market for
              premium gemstones, Japan — any one of which should have kept prices pinned down to
              four digits, like other tourmalines.
            </p>
            <p>
              Granted, Paraiba tourmalines are magnificent by any measure, sporting at their best
              electric teal and sapphire-blue colors that make them ravishingly distinctive.
            </p>
            <p>
              <strong>Natural Selection:</strong> When dealers first saw samples of the new-find
              tourmalines in early 1989, the vibrant colors left them as much in awe as in doubt.
              Dealers thought that colors that vivid couldn&apos;t possibly be natural. Given the
              possibility that a significant percentage of pink and red tourmalines are irradiated,
              stones from Paraiba were bound to trigger trade skepticism. Endowed with colors that
              evoked comparisons to peacock feathers and tropical fish, the colors just seemed too
              good to be true.
            </p>

            <GemReadMore />
          </div>
        </div>
      </div>
    </section>
  );
}
