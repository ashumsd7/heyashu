/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu/**",
        "node_modules/@swc/core-linux-x64-musl/**",
        "node_modules/@esbuild/**",
        "node_modules/webpack/**",
        "node_modules/terser/**",
        "node_modules/canvas/**",
        "node_modules/jspdf/**",
        "node_modules/react-pdf/**",
        "node_modules/pdfjs-dist/**",
        "node_modules/react-syntax-highlighter/**",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any HTTPS hostname
      },
      {
        protocol: "http",
        hostname: "**", // Allows images from any HTTP hostname (if needed)
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "bsmedia.business-standard",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Keep precache manifest small — large public assets are served normally via CDN
  publicExcludes: ["!images/**/*", "!pdfs/**/*"],
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
});

// Combine PWA and MDX configuration
export default pwaConfig(withMDX(nextConfig));
