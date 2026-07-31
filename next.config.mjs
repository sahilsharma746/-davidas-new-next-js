/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Target modern browsers — eliminates legacy polyfills (~11 KiB savings).
  experimental: {
    browsersListForSwc: true,
  },
  // Ported static prose contains apostrophes/ampersands that trip
  // react/no-unescaped-entities. TypeScript type-checking still runs on build.
  eslint: { ignoreDuringBuilds: true },
  // Imagery is served from /public via the <Img> wrapper (next/image). Serve
  // modern formats (AVIF first, then WebP) for large byte savings on the big PNGs.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Staging guard (see NOINDEX in src/lib/site.ts). A header covers responses
  // that carry no HTML <head> — sitemap.xml, images, JSON — which a meta tag
  // cannot. Production (the VPS) sets neither var, so no header is emitted.
  async headers() {
    const noindex =
      process.env.NEXT_PUBLIC_NOINDEX === '1' ||
      (!!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
    if (!noindex) return [];
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy hash-based product routes can't be redirected server-side (the
      // fragment never reaches the server); handled client-side in /jewelry.
      // Keep the old clean page URLs working:
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
