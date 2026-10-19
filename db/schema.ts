// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
export {};
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const advisorSessions = sqliteTable("advisor_sessions", {
  id: text("id").primaryKey(),
  data: text("data").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
  expiresAt: integer("expires_at").notNull(),
  emailSentAt: integer("email_sent_at"),
});

export const apiLimits = sqliteTable("api_limits", {
  key: text("key").primaryKey(),
  window: integer("window").notNull(),
  count: integer("count").notNull(),
});

export const directoryRecords = sqliteTable("directory_records", {
  id: text("id").primaryKey(),
  dedupeKey: text("dedupe_key").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  city: text("city").notNull(),
  cityKey: text("city_key").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  url: text("url").notNull(),
  source: text("source").notNull(),
  status: text("status").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  searchText: text("search_text").notNull(),
  payload: text("payload").notNull(),
  siteCheckedAt: text("site_checked_at"),
  updatedAt: text("updated_at").notNull(),
});
export const directoryCities = sqliteTable("directory_cities", {
  key: text("key").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
});
