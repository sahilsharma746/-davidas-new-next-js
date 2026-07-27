'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS, SITE } from '@/lib/site';

// Ported from the original includes.js nav + main.js mobile-toggle behavior.
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  // Match original: toggling adds .open (links), .active (toggle), .nav--open (nav),
  // and locks body scroll.
  function toggle() {
    const next = !open;
    setOpen(next);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = next ? 'hidden' : '';
    }
  }

  function closeMenu() {
    setOpen(false);
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  return (
    <nav className={`nav${open ? ' nav--open' : ''}`}>
      <div className="nav__inner container">
        <Link href="/" className="nav__logo" onClick={closeMenu}>
          <span>{SITE.name}</span>
        </Link>
        <ul className={`nav__links${open ? ' open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={isActive(l.href) ? 'active' : undefined}
                onClick={closeMenu}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`nav__toggle${open ? ' active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={toggle}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
