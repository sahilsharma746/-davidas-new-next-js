/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ported static prose contains apostrophes/ampersands that trip
  // react/no-unescaped-entities. TypeScript type-checking still runs on build.
  eslint: { ignoreDuringBuilds: true },
  // Imagery is served from /public via the <Img> wrapper (next/image). Serve
  // modern formats (AVIF first, then WebP) for large byte savings on the big PNGs.
  images: {
    formats: ['image/avif', 'image/webp'],
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
