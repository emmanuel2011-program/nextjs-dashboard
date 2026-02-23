// prisma/prisma.config.ts
import { defineConfig, env } from "prisma/config";
// Load .env before defining the config
import "dotenv/config"; 
// or you can use the dotenv config function:
// import { config } from "dotenv";
// config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  // ... other configurations
  datasource: {
    url: env("DATABASE_URL"), // Use env() helper for type safety or process.env.DATABASE_URL
  },
});
