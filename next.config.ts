import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  experimental: {
    // This is the most important part for your database connection
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/adapter-neon'],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;