# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY to send email locally
npm run dev                  # http://localhost:3000
npm run build && npm run start   # production build / preview
npm run lint                 # next lint (no eslint config committed)
```

There is no test suite in this repo — `npm run build` is the verification gate. ESLint is
disabled during builds (`eslint.ignoreDuringBuilds` in `next.config.mjs`, because ported prose
trips `react/no-unescaped-entities`), but **TypeScript type-checking still runs on build** and
`strict` is on, so a build failure is a real type error.

## What this is

Next.js 15 (App Router) + React 19 + TypeScript rebuild of the Davidas Design Concepts jewelry
site, ported from a static HTML/CSS/JS + PHP site (`../david-as-main`). Deployed on Vercel:
product/article pages are statically generated at build; the three form handlers run as
serverless functions.

The port's whole point was SEO. The original catalog was a hash-routed SPA
(`/jewelry#product/210-104`) invisible to crawlers; it is now real static routes. Preserve that
property in any change — anything that makes product content client-only or hash-addressed
undoes the migration.

## Architecture

**Data is the single source of truth.** `src/data/products.ts` holds `CATEGORIES` (menu shape)
and `PRODUCTS` (78 typed products) plus all lookup helpers (`getCategory`, `getSubcategory`,
`getProductsIn`, `getProductBySlug`, `getProductByStyle`, `productPath`). Never hard-code
product info into a page — pages derive routes, metadata, JSON-LD, and the sitemap from this
module. `PRODUCTS[].category`/`subcategory` must match ids in `CATEGORIES`. Adding a product or
category automatically produces a static page and a sitemap entry. Same pattern for articles:
`src/data/articles.json` → `src/lib/articles.ts` (`ARTICLES`, `getArticle`) → a book spine on
`/gems-gemology` and a page at `/articles/<id>`.

**Route hierarchy mirrors the taxonomy.** `/jewelry` (category menu) →
`/jewelry/[category]` (subcategory chooser) → `/jewelry/[category]/[subcategory]` (product grid)
→ `/jewelry/[category]/[subcategory]/[slug]` (detail). Every level exports
`generateStaticParams` + `generateMetadata` and calls `notFound()` on unknown ids. A category
with exactly one subcategory `redirect()`s straight to its grid, matching the original SPA.

**SEO layer.** `src/lib/site.ts` (`SITE` — business facts, `NAV_LINKS`, `absoluteUrl`) feeds
`src/lib/jsonld.ts` (builders for `WebSite`, `JewelryStore`, `Product`, `BreadcrumbList`,
`Article`, `VideoObject`, `ItemList`), rendered by `<JsonLd>`. `src/app/sitemap.ts` and
`robots.ts` generate `/sitemap.xml` and `/robots.txt`. Root `layout.tsx` sets `metadataBase`,
the title template, OG/Twitter defaults, icons, and the site-wide `JewelryStore` JSON-LD; pages
add `alternates.canonical` and their own OG/Twitter. New pages or data need matching sitemap
and JSON-LD coverage — they don't come for free.

**Gospel Necklace is deliberately special-cased.** `religious/gospel-necklace` exists in
`CATEGORIES` for menu purposes but has its own bespoke page at `/gospel-necklace`; it is skipped
in `sitemap.ts` and rewritten by `subHref()`/`subImage()` in `jewelry/[category]/page.tsx`. Its
orders go to `ORDER_NOTIFY_EMAIL`, a separate inbox — do not consolidate with `NOTIFY_EMAIL`.

**Legacy URLs.** `LegacyHashRedirect` (client) maps old hashes to the new routes:
`#product/<style>` and `#inquiry/<style>` → the detail page (the latter with `?inquiry=1`, which
`ProductDetail` reads to auto-open the inquiry modal), `#category/subcategory`, `#category`, and
`#religious/gospel-necklace` → `/gospel-necklace`. Hashes never reach the server, so this must
stay client-side. Server-side redirects go in `next.config.mjs`.

**Forms.** Three API routes (`/api/contact`, `/api/inquiry`, `/api/order`) are line-by-line
ports of the PHP handlers: `formData()` in, honeypot field (`website`) silently succeeds,
required-field and email validation, HTML email body built inline, `NextResponse.json({success,
message})` out. Shared helpers in `src/lib/mailer.ts` — `sendEmail` (Resend), `clean` (HTML
escape, port of PHP `clean()`), `isValidEmail`, `submittedOn` (matches the PHP date format).
Without `RESEND_API_KEY` they return "Mail is not configured", mirroring a missing `config.php`.

**Styles are ported verbatim** — `src/styles/style.css` (global, imported in `layout.tsx`),
plus `gospel.css`, `bookshelf.css`, `article.css` imported by the single page that needs each.
The design is intended to be pixel-identical to the original; prefer reusing existing class
names over inventing new CSS. Fonts are self-hosted via `next/font/google`
(`--font-cormorant`, `--font-outfit`).

**Images.** Use the `<Img>` wrapper (`src/components/Img.tsx`), not `<img>` or `next/image`
directly. It looks up intrinsic dimensions in `src/data/imageDimensions.json` (keys are decoded
`/public` paths with real spaces) to avoid CLS, and falls back to a plain `<img>` when a path is
missing from the map. New images under `public/images/` need an entry there to get the
`next/image` path. `public/images/` folder names are legacy style numbers — leave them alone.

Path alias: `@/*` → `./src/*`.

## Environment variables

See `.env.example`. `RESEND_API_KEY`, `MAIL_FROM` (verified Resend sender), `NOTIFY_EMAIL`
(contact + jewelry inquiries), `ORDER_NOTIFY_EMAIL` (Gospel Necklace orders only),
`NEXT_PUBLIC_SITE_URL` (canonical origin for canonical tags / sitemap / OG — set to the
production domain in Vercel). `.env.local` is gitignored.

`NEXT_PUBLIC_NOINDEX=1` marks a deployment as staging: `robots.txt` disallows everything,
every page gets `noindex, nofollow`, and an `X-Robots-Tag` header is added. Set it on the
**Vercel** project only (`NOINDEX` in `src/lib/site.ts` also auto-detects non-production
Vercel envs). Never set it on the VPS — that would deindex the live site.

## Deployment

Two environments:

| Env | URL | Host | Indexable |
|---|---|---|---|
| Live | https://www.davidas.com | Hostinger VPS (self-managed) | yes — registered in Google Search Console |
| Sandbox | https://davidas-com.vercel.app | Vercel | no — must stay `noindex` (see above) |

### SSH — read `.claude/server-access.md` first

**When asked to SSH into the server, log into the VPS, or check anything on the live host, read
`.claude/server-access.md` for the credentials.** That file holds the root password, the SSH
command, and the ops runbook. It is gitignored (`.claude/` is in `.gitignore`) so credentials
stay local — this file is committed, so no secrets go in it. Don't ask for the password and
don't copy it into any tracked file, commit message, or log.

VPS: Ubuntu 24.04, host `srv1867536`, `root@217.15.171.112`, **password auth only** — key auth
is not set up yet (`~/.ssh/davidas` exists locally but is not in the server's
`authorized_keys`). `sshpass` is not installed on this Mac; `/usr/bin/expect` is, so
non-interactive SSH needs an expect wrapper that reads the password from `$VPS_PW` rather than
passing it in argv.

Serving stack: app checked out at `/var/www/davidas`, built with `npm run build`, run by
**pm2** as process `davidas` (`npm start` → `next-server` on `127.0.0.1:3000`). nginx
terminates TLS on 80/443 and reverse-proxies to it. Both survive reboot: `pm2-root.service`
is enabled (via `pm2 startup` + `pm2 save`) and so is `nginx`. Certbot holds the
`davidas.com` cert (covers `davidas.com` + `www.davidas.com`).

Redeploy: `cd /var/www/davidas && git pull && npm ci && npm run build && pm2 restart davidas`.
Because product/article pages are statically generated, **a data-only change still needs a
rebuild** — editing `products.ts` on the server without `npm run build` changes nothing.

Useful checks: `pm2 list`, `pm2 logs davidas`, `systemctl status nginx`,
`tail -f /var/log/nginx/error.log`, `curl -I http://127.0.0.1:3000/` (isolates app vs nginx).

Known cruft: `/etc/nginx/sites-enabled/davidas.bak` is still loaded (nginx includes
`sites-enabled/*`, not just symlinks) and holds the pre-launch
`testdavid.duckdns.org` vhost, so `nginx -t` warns about a conflicting `server_name` for the
bare IP. Move it out of `sites-enabled/` rather than leaving it there.
