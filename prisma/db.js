// prisma/db.js
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // You may need to install this: pnpm add @prisma/adapter-pg pg
import pg from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter, // Pass the adapter here as requested by Prisma 7
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;