import { PrismaClient } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// Required for Neon serverless to work in a Node.js environment (like during build)
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const connectionString = process.env.DATABASE_URL!

const pool = new Pool({ connectionString })

// We use 'as any' here to bypass the version mismatch in the Pool types
const adapter = new PrismaNeon(pool as any)

const globalForPrisma = global as unknown as { db: PrismaClient }

export const db =
  globalForPrisma.db ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db