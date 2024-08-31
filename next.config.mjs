/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx'], // Add this line
  images: {
    remotePatterns: [
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
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

// Combine PWA, MDX configuration, and nextConfig
export default pwaConfig(withMDX(nextConfig));