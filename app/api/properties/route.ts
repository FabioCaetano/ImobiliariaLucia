import { getDb } from "../../../db";
import { auditLogs, properties } from "../../../db/schema";
import { requireAdminApi } from "../../../lib/admin-auth";
import { listProperties } from "../../../lib/properties-db";
import { ensureDatabase } from "../../../lib/database";

const clean = (value: unknown) => String(value || "").trim();
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const wantsAdmin = url.searchParams.get("admin") === "1";
    if (wantsAdmin && !(await requireAdminApi())) return Response.json({ error: "Não autorizado" }, { status: 401 });
    let rows = await listProperties(wantsAdmin);
    const q = clean(url.searchParams.get("q")).toLowerCase();
    const purpose = clean(url.searchParams.get("purpose"));
    const neighborhood = clean(url.searchParams.get("neighborhood"));
    const type = clean(url.searchParams.get("type"));
    const min = Number(url.searchParams.get("min") || 0);
    const max = Number(url.searchParams.get("max") || 0);
    const bedrooms = Number(url.searchParams.get("bedrooms") || 0);
    if (q) rows = rows.filter((p) => `${p.title} ${p.code} ${p.neighborhood}`.toLowerCase().includes(q));
    if (purpose) rows = rows.filter((p) => p.purpose === purpose);
    if (neighborhood) rows = rows.filter((p) => p.neighborhood === neighborhood);
    if (type) rows = rows.filter((p) => p.type === type);
    if (min) rows = rows.filter((p) => p.price >= min);
    if (max) rows = rows.filter((p) => p.price <= max);
    if (bedrooms) rows = rows.filter((p) => p.bedrooms >= bedrooms);
    return Response.json({ properties: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao carregar imóveis" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Não autorizado" }, { status: 401 });
  try {
    await ensureDatabase();
    const body = await request.json() as Record<string, unknown>;
    const title = clean(body.title);
    const code = clean(body.code);
    if (!title || !code || !body.price) return Response.json({ error: "Título, código e preço são obrigatórios" }, { status: 400 });
    const slug = clean(body.slug) || `${slugify(title)}-${Date.now().toString().slice(-5)}`;
    const values = {
      title, code, slug, type: clean(body.type) || "Casa", purpose: clean(body.purpose) || "Compra",
      status: clean(body.status) || "Disponível", price: Number(body.price), city: clean(body.city) || "Toronto",
      neighborhood: clean(body.neighborhood), address: clean(body.address), bedrooms: Number(body.bedrooms || 0),
      bathrooms: Number(body.bathrooms || 0), suites: Number(body.suites || 0), parking: Number(body.parking || 0),
      area: Number(body.area || 0), description: clean(body.description), amenities: JSON.stringify(body.amenities || []),
      image: clean(body.image), images: JSON.stringify(body.images || []), featured: Boolean(body.featured),
      furnished: Boolean(body.furnished), pets: Boolean(body.pets), published: Boolean(body.published),
      seoTitle: clean(body.seoTitle), seoDescription: clean(body.seoDescription), videoUrl: clean(body.videoUrl),
      virtualTourUrl: clean(body.virtualTourUrl), updatedAt: new Date().toISOString(),
    };
    const db = getDb();
    const [created] = await db.insert(properties).values(values).returning();
    await db.insert(auditLogs).values({ actor: admin.email, action: "CRIAR", entityType: "property", entityId: String(created.id), details: title });
    return Response.json({ property: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao criar imóvel";
    return Response.json({ error: message.includes("UNIQUE") ? "Código ou URL já existe" : message }, { status: 400 });
  }
}
