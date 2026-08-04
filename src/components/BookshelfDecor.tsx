'use client';

import { useEffect, useRef } from 'react';

export default function BookshelfDecor() {
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clock = clockRef.current;
    if (!clock) return;

    const hourHand = clock.querySelector<HTMLElement>('.clock-hand--hour');
    const minuteHand = clock.querySelector<HTMLElement>('.clock-hand--minute');
    const secondHand = clock.querySelector<HTMLElement>('.clock-hand--second');

    let raf: number;

    function updateClock() {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      if (hourHand)
        hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
      if (minuteHand)
        minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
      if (secondHand)
        secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;

      raf = requestAnimationFrame(updateClock);
    }

    updateClock();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="decorShelves" aria-hidden="true">
      {/* Top shelf: stacked volumes · Bambi · mantel clock */}
      <div className="shelf shelf--decor">
        <div className="decor decor-stack">
          <svg viewBox="0 0 150 70" width="152">
            <rect x="12" y="48" width="126" height="17" rx="3" fill="#233045" />
            <rect x="130" y="50" width="8" height="13" rx="2" fill="#e8dfc8" />
            <rect x="12" y="54" width="126" height="2" fill="rgba(201,164,92,0.55)" />
            <rect x="20" y="31" width="114" height="17" rx="3" fill="#4a1f1a" />
            <rect x="126" y="33" width="8" height="13" rx="2" fill="#e8dfc8" />
            <rect x="20" y="37" width="114" height="2" fill="rgba(201,164,92,0.55)" />
            <rect x="16" y="14" width="106" height="17" rx="3" fill="#1f3a2a" />
            <rect x="114" y="16" width="8" height="13" rx="2" fill="#e8dfc8" />
            <rect x="16" y="20" width="106" height="2" fill="rgba(201,164,92,0.55)" />
          </svg>
        </div>

        <div
          className="decor decor-cloche"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <img
            src="/images/Gem_Profile_Pictures/Bambi.png"
            alt="Bambi"
            style={{ width: 140, height: 'auto', borderRadius: 8, objectFit: 'contain' }}
          />
        </div>

        {/* Mantel clock with live hands */}
        <div className="decor decor-clock" ref={clockRef}>
          <div className="mantel-clock" aria-label="Current local time">
            <img
              src="/images/Gem_Profile_Pictures/Clock.png"
              alt="Mantel clock"
              className="mantel-clock__image"
            />
            <div className="clock-face">
              <div className="clock-hand clock-hand--hour" />
              <div className="clock-hand clock-hand--minute" />
              <div className="clock-hand clock-hand--second" />
              <div className="clock-center" />
            </div>
          </div>
        </div>
      </div>
      <div className="shelf-board" />

      {/* Bottom shelf: vase · est. plaque */}
      <div className="shelf shelf--decor">
        <div className="decor decor-vase" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img
            src="/images/Gem_Profile_Pictures/Vase-3.png"
            alt="Decorative vase"
            style={{ width: 100, height: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div className="decor decor-plaque">
          <svg viewBox="0 0 160 48" width="150">
            <ellipse cx="80" cy="45" rx="66" ry="3.5" fill="rgba(0,0,0,0.4)" />
            <rect x="6" y="4" width="148" height="36" rx="7" fill="#a9884e" />
            <rect x="6" y="4" width="148" height="16" rx="7" fill="#caa55d" />
            <rect x="12" y="9" width="136" height="26" rx="4" fill="none" stroke="rgba(58,44,18,0.55)" strokeWidth="1.5" />
            <text x="80" y="27" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fontWeight="600" letterSpacing="1.5" fill="#3a2c12">
              EST. JULY 8, 1995
            </text>
          </svg>
        </div>
      </div>
      <div className="shelf-board" />
    </div>
  );
}
