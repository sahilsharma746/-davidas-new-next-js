/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ported static prose contains apostrophes/ampersands that trip
  // react/no-unescaped-entities. TypeScript type-checking still runs on build.
  eslint: { ignoreDuringBuilds: true },
  // Product/service imagery is served from /public/images and /public/video-files.
  // Using plain <img> (not next/image) to preserve the original CSS-driven layout
  // exactly, so no remote image config is needed.
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
