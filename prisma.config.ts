// prisma/prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

// This prevents the "Cannot resolve environment variable" error during Vercel's build
const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://unused:unused@localhost:5432/unused";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});