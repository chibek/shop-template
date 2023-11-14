import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { env } from "@/env.mjs"

import * as schema from "./schema"

const connection = postgres(env.DATABASE_URL, { prepare: false })
export const db = drizzle(connection, { schema })
await migrate(db, { migrationsFolder: "drizzle" })