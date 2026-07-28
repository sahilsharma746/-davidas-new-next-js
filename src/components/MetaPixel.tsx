'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';

// Meta (Facebook) Pixel — deferred until first user interaction (scroll/click/touch)
// to avoid blocking the main thread and hurting TBT/LCP scores.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function loadPixel() {
  if (window.fbq) return;
  (function (f: Window, b: Document, e: string, v: string) {
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!(f as any)._fbq) (f as any)._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq!('init', SITE.metaPixelId);
  window.fbq!('track', 'PageView');
}

export default function MetaPixel() {
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) {
      // Subsequent route changes — just track PageView.
      if (window.fbq) window.fbq('track', 'PageView');
      return;
    }

    // Defer pixel load until first user interaction to reduce TBT.
    const events = ['scroll', 'click', 'touchstart', 'keydown'];
    const init = () => {
      if (loaded.current) return;
      loaded.current = true;
      events.forEach((e) => window.removeEventListener(e, init));
      loadPixel();
    };
    // Also load after 4s idle as fallback.
    const timer = setTimeout(init, 4000);
    events.forEach((e) => window.addEventListener(e, init, { once: true, passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, init));
    };
  }, [pathname]);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height={1}
        width={1}
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${SITE.metaPixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
