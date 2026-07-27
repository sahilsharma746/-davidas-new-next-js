# Davidas Design Concepts — Next.js

A full **Next.js 15 (App Router) + TypeScript** rebuild of the Davidas Design Concepts
jewelry site. Same design and functionality as the original static HTML site, but with
crawlable product URLs and strong SEO.

Original source ported from: `../david-as-main` (pure HTML/CSS/JS + PHP).

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY to send email locally
npm run dev                  # http://localhost:3000
```

Production build / preview:

```bash
npm run build && npm run start
```

---

## What changed vs. the original (and why)

| Original | Now | Reason |
|---|---|---|
| Jewelry catalog was a **hash-routed SPA** (`/jewelry#product/210-104`) — invisible to search engines | **Real static pages** at `/jewelry/[category]/[subcategory]/[slug]` (e.g. `/jewelry/ladies/bracelets/mermaid-bracelet`) | The #1 SEO fix — every product is now a crawlable page |
| No canonical / OG / structured data | Per-page **canonical**, **Open Graph**, **Twitter cards**, and **JSON-LD** (`Product`, `JewelryStore`, `BreadcrumbList`, `Article`, `ItemList`) | Rich results + correct indexing |
| No sitemap / robots | Auto-generated **`/sitemap.xml`** (105+ URLs) and **`/robots.txt`** | Discoverability |
| 3 PHP mail handlers | 3 Next **API routes** (`/api/contact`, `/api/inquiry`, `/api/order`) using the Resend SDK | Same behavior on a Node host |
| Nav/footer injected by `includes.js` | `<Nav>` / `<Footer>` components | Server-rendered, crawlable |

Design is **identical**: the original `style.css` / `gospel.css` / `bookshelf.css` are reused
verbatim (`src/styles/`), fonts still load from Google Fonts via the CSS `@import`.

Legacy hash URLs (`/jewelry#product/…`, `#ladies/rings`, etc.) are redirected to the new
clean routes client-side by `LegacyHashRedirect`, so old shared links and backlinks keep working.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout: metadata, Nav, Footer, Meta Pixel, LocalBusiness JSON-LD
│   ├── page.tsx                   # Home
│   ├── jewelry/
│   │   ├── page.tsx               # Category menu (View 1)
│   │   └── [category]/
│   │       ├── page.tsx           # Subcategory chooser (redirects if single subcat)
│   │       └── [subcategory]/
│   │           ├── page.tsx       # Product grid (View 2)
│   │           └── [slug]/page.tsx# Product detail (View 3) — SSG, one per product
│   ├── services|about|contact|videos|gospel-necklace|gems-gemology|gem/page.tsx
│   ├── articles/[slug]/page.tsx   # Full article at /articles/<id> (SSG)
│   ├── api/{contact,inquiry,order}/route.ts   # Form handlers (Resend)
│   ├── sitemap.ts  robots.ts  not-found.tsx
│
├── components/                    # Nav, Footer, ProductDetail, GospelNecklace,
│                                  # Bookshelf, VideoLibrary, ContactForm, modals, etc.
├── data/
│   ├── products.ts                # 78 products + CATEGORIES (typed, single source of truth)
│   └── articles.json              # Gems & Gemology articles
├── lib/                           # site.ts (config), jsonld.ts, mailer.ts, articles.ts
└── styles/                        # style.css / gospel.css / bookshelf.css / article.css (ported verbatim)

public/
├── images/       # 118 files — copied verbatim (folder names are legacy style numbers)
├── video-files/  # service + gospel videos
└── audio/        # gospel voiceover
```

---

## Adding / editing products

Edit `src/data/products.ts` — never hard-code product info into pages.
- `CATEGORIES` defines the menu; `PRODUCTS[].category`/`subcategory` must match ids there.
- The URL `slug` is auto-friendly (derived from the name). Optional fields: `metals`, `sizes`,
  `karats`, `formHint`, `video` (ijewel.design 3D embed).
- New products/categories automatically appear in the sitemap and get their own static page.

Add articles in `src/data/articles.json` — a new entry gets a book spine on `/gems-gemology`
and a page at `/articles/<id>` automatically.

---

## Environment variables (see `.env.example`)

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for the 3 forms. Without it, forms return "Mail is not configured". |
| `MAIL_FROM` | Verified Resend sender, e.g. `Davidas Design Concepts <noreply@davidas.com>` |
| `NOTIFY_EMAIL` | Contact + jewelry-inquiry destination |
| `ORDER_NOTIFY_EMAIL` | Gospel Necklace orders (separate inbox — do not consolidate) |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical tags / sitemap / OG |

**Never commit `.env.local`** (gitignored).

---

## Deploy (Vercel)

1. Push to a Git repo and import into Vercel (framework auto-detected).
2. Add the environment variables above in Vercel → Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy. Product pages are statically generated at build; API routes run as serverless functions.

---

## SEO checklist (implemented)

- ✅ Unique `<title>` + meta description per page (products/articles included)
- ✅ Canonical URL per page
- ✅ Open Graph + Twitter cards (with product/article images)
- ✅ JSON-LD: `JewelryStore` (site-wide), `Product`, `BreadcrumbList`, `Article`, `ItemList`
- ✅ `sitemap.xml` + `robots.txt`
- ✅ Server-rendered, crawlable links to every category, subcategory, and product
- ✅ Semantic headings (single `<h1>` per page), descriptive `alt` text
- ✅ Legacy hash-URL redirects preserve existing backlinks
