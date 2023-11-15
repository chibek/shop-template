import { env } from "@/env.mjs"
import type { Config } from "drizzle-kit"

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
  }

export default {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config