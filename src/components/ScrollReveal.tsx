'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Ported from main.js: scroll-reveal for `.reveal` elements and staggered
// child animation for `[data-stagger]` parents, via IntersectionObserver.
// Re-runs on every route change (App Router client navigation).
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // .reveal → add .visible when in view
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealObserver.observe(el));
    observers.push(revealObserver);

    // [data-stagger] → animate children sequentially
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
      const children = parent.children;
      const staggerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              Array.from(children).forEach((child, i) => {
                const el = child as HTMLElement;
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
                requestAnimationFrame(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                });
              });
              staggerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      staggerObserver.observe(parent);
      observers.push(staggerObserver);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  return null;
}
