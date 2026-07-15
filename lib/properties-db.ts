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
  const legacyValues: Record<string, string> = {
    Compra: "Buy", Aluguel: "Rent", Temporada: "Seasonal",
    Casa: "House", Apartamento: "Apartment", Comercial: "Commercial",
    "Disponível": "Available", Novo: "New", "Indisponível": "Unavailable", Vendido: "Sold", Alugado: "Rented",
    "Ar-condicionado": "Air conditioning", Lareira: "Fireplace", Jardim: "Garden", Lavanderia: "Laundry",
    Varanda: "Balcony", Piscina: "Pool", Academia: "Gym", Elevador: "Elevator", Portaria: "Concierge",
    "Terraço": "Terrace", "Aceita animais": "Pet-friendly",
  };
  const demo = demoProperties.find((property) => property.code === String(row.code));
  const legacyTitles = new Set([
    "Casa contemporânea em High Park", "Condo com vista para o lago em Harbourfront",
    "Loft autêntico no Distillery District", "Townhouse familiar em Leslieville",
    "Apartamento elegante em Yorkville", "Casa ensolarada em The Beaches",
  ]);
  const title = String(row.title || "");
  return {
    ...row,
    title: demo && legacyTitles.has(title) ? demo.title : title,
    description: demo && legacyTitles.has(title) ? demo.description : String(row.description || ""),
    purpose: legacyValues[String(row.purpose)] || String(row.purpose || ""),
    type: legacyValues[String(row.type)] || String(row.type || ""),
    status: legacyValues[String(row.status)] || String(row.status || ""),
    amenities: (parse(row.amenities) as unknown[]).map((item) => legacyValues[String(item)] || String(item)),
    images: parse(row.images),
  } as Property;
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
