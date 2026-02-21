// lib/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple instances of PrismaClient in development (Next.js hot reload)
  var prisma: PrismaClient | undefined;
}

// Use the existing global Prisma instance if it exists (dev hot reload)
const prisma = global.prisma || new PrismaClient({
  // Optional: override datasource URL if using Prisma 7+ config
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Neon connection string from .env
    },
  },
});

// Only attach to global in dev to avoid multiple instances in prod
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;