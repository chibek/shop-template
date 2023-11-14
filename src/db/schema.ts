import {
  pgTable,
  serial,
  text,
  varchar,
  decimal,
  json,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  rating: integer("rating").default(0).notNull(),
  stock: integer("inventory").default(0).notNull(),
  thumbnail: varchar("thumbnail", { length: 191 }).default("null"),
  images: json("images").default("null"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});
