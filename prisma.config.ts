// prisma/prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // 💡 Switching from env("DIRECT_URL") to process.env avoids the "Cannot resolve" crash
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});