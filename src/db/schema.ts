import { type StoredFile } from "@/types";
import {
  mysqlTable,
  serial,
  text,
  varchar,
  decimal,
  json,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  rating: int("rating").default(0).notNull(),
  stock: int("inventory").default(0).notNull(),
  thumbnail: varchar("thumbnail", { length: 191 }),
  images: json("images").$type<StoredFile[] | null>().default(null),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});

export type Product = typeof products.$inferSelect;