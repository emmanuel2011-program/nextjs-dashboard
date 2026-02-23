import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    turbo: {
      root: '..',
    },
    // Add this to ensure Prisma stays on the server-side only
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/adapter-neon'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;