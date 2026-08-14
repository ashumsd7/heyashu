/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";
import withPWA from "next-pwa";

const isNetlify = process.env.NETLIFY === "true";
const isPwaEnabled =
  process.env.NODE_ENV === "production" && !isNetlify;

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
        "node_modules/typescript/**",
        "node_modules/@babel/**",
        "node_modules/sharp/**",
        "node_modules/next/dist/compiled/webpack/**",
        "node_modules/highlight.js/**",
        "node_modules/lowlight/**",
        "node_modules/framer-motion/**",
        "node_modules/react-icons/**",
        "public/**",
        "src/content/**",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
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
        hostname: "bsmedia.business-standard",
      },
    ],
  },
};

const withMDX = createMDX({});

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isPwaEnabled,
  publicExcludes: [
    "!images/**/*",
    "!pdfs/**/*",
    "!**/*.mp4",
    "!**/*.webm",
  ],
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
});

export default isPwaEnabled
  ? pwaConfig(withMDX(nextConfig))
  : withMDX(nextConfig);
