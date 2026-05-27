import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const billboards = sqliteTable("billboards", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  desc: text("desc"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  imageUrl: text("image_url").notNull(),
  link: text("link").notNull(),
  categoryId: text("category_id").references(() => categories.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const listings = sqliteTable("listings", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price"),
  type: text("type").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  published: integer("published").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export type User = typeof users.$inferSelect;
export type Billboard = typeof billboards.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Listing = typeof listings.$inferSelect;
