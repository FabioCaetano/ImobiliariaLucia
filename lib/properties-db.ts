import { desc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { properties } from "../db/schema";
import { demoProperties, type Property } from "./demo-data";
import { ensureDatabase } from "./database";

const encode = (p: Property) => ({
  ...p,
  id: undefined,
  amenities: JSON.stringify(p.amenities),
  images: JSON.stringify(p.images),
});

export function normalizeProperty(row: Record<string, unknown>): Property {
  const parse = (value: unknown) => {
    try { return JSON.parse(String(value || "[]")); } catch { return []; }
  };
  return { ...row, amenities: parse(row.amenities), images: parse(row.images) } as Property;
}

export async function seedIfEmpty() {
  await ensureDatabase();
  const db = getDb();
  const existing = await db.select({ id: properties.id }).from(properties).limit(1);
  if (!existing.length) {
    for (const property of demoProperties) await db.insert(properties).values(encode(property));
  }
}

export async function listProperties(includeDrafts = false) {
  await seedIfEmpty();
  const db = getDb();
  const rows = includeDrafts
    ? await db.select().from(properties).orderBy(desc(properties.featured), desc(properties.createdAt))
    : await db.select().from(properties).where(eq(properties.published, true)).orderBy(desc(properties.featured), desc(properties.createdAt));
  return rows.map((row) => normalizeProperty(row));
}

export async function getPropertyBySlug(slug: string) {
  await seedIfEmpty();
  const [row] = await getDb().select().from(properties).where(eq(properties.slug, slug)).limit(1);
  return row ? normalizeProperty(row) : null;
}

export async function getSimilarProperties(current: Property) {
  const all = await listProperties(false);
  return all.filter((p) => p.id !== current.id && (p.purpose === current.purpose || p.neighborhood === current.neighborhood)).sort((a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price)).slice(0, 3);
}
