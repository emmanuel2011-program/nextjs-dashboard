// prisma/prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // We use DIRECT_URL here so Prisma CLI can always connect during builds
    url: env("DIRECT_URL"), 
  },
});