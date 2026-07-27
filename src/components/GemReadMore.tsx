'use client';

import { useState } from 'react';

// Ported from main.js gem read-more toggle. Toggles `.expanded` on #gem-read-more
// and flips the button label (styling comes from style.css).
export default function GemReadMore() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div id="gem-read-more" className={expanded ? 'expanded' : undefined}>
        <p>
          Finally, gemologists who studied the material concluded its colors were, for the most
          part, natural — the product of the trace element copper. We say &quot;for the most
          part&quot; because Brazilian dealers admit heating some sapphire-blue, as well as gray and
          dark-green stones, to render them spectacular turquoise and tsavorite hues.
        </p>
        <p>
          Once Paraiba tourmaline was given a clean bill of health, holdouts began buying it. At
          first, its mile-high prices reflected newness and overnight celebrity status. In time,
          they reflected profound regard for this material. And not just fine large gems, but small
          stones were highly sought. Designers discovered that adding just one or two tiny Paraiba
          tourmalines to accent a piece gave it enough extra appeal to more than justify paying the
          very high prices asked for it.
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '1.5rem 0 0.75rem' }}>
          Paraiba&apos;s Palette
        </h3>
        <p>
          When dealers first saw samples of the new-find tourmalines in early 1989, the vibrant
          colors left them as much in awe as in doubt. Dealers thought that colors that vivid
          couldn&apos;t possibly be natural.
        </p>
        <p>
          Given the possibility that a significant percentage of pink and red tourmalines are
          irradiated, stones from Paraiba were bound to trigger trade skepticism. Endowed with
          colors that evoked comparisons to peacock feathers and tropical fish, the colors just
          seemed too good to be true.
        </p>
      </div>

      <button
        type="button"
        className="btn btn--outline"
        style={{ marginTop: '1.5rem' }}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </>
  );
}
