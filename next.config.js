/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true, // Required for Cloudflare Pages static export
  },
  // Enable static export for Cloudflare Pages
  output: 'export',
  // Disable image optimization for static export
  trailingSlash: true,
  // Ensure all routes work correctly
};

module.exports = nextConfig;
