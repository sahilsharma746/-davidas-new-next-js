import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import '@/styles/style.css';
import '@/styles/gospel.css';
import '@/styles/bookshelf.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MetaPixel from '@/components/MetaPixel';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { localBusinessJsonLd } from '@/lib/jsonld';

// Self-hosted fonts (no render-blocking external request; font-display: swap).
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Davidas Design Concepts | Custom Jewelry — Greensboro, NC',
    template: '%s | Davidas Design Concepts',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Davidas Design Concepts | Custom Jewelry — Greensboro, NC',
    description: SITE.description,
    url: SITE.url,
    locale: 'en_US',
    images: [{ url: SITE.ogImage, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Davidas Design Concepts | Custom Jewelry — Greensboro, NC',
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'jewelry',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: some browser extensions (e.g. ColorZilla adds
    // `cz-shortcut-listen`, Grammarly, etc.) inject attributes on <html>/<body>
    // before React hydrates, causing a harmless attribute mismatch. This scopes
    // the suppression to these two elements only.
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <MetaPixel />
        <JsonLd data={localBusinessJsonLd()} />
        <Nav />
        {children}
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
