import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { auditLogs, properties } from "../../../../db/schema";
import { requireAdminApi } from "../../../../lib/admin-auth";
import { ensureDatabase } from "../../../../lib/database";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const allowed = ["title","code","slug","type","purpose","status","price","city","neighborhood","address","bedrooms","bathrooms","suites","parking","area","description","image","featured","furnished","pets","published","seoTitle","seoDescription","videoUrl","virtualTourUrl"];
  const update: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  for (const key of allowed) if (key in body) update[key] = body[key];
  if ("amenities" in body) update.amenities = JSON.stringify(body.amenities || []);
  if ("images" in body) update.images = JSON.stringify(body.images || []);
  const db = getDb();
  const [property] = await db.update(properties).set(update).where(eq(properties.id, Number(id))).returning();
  if (!property) return Response.json({ error: "Property not found" }, { status: 404 });
  await db.insert(auditLogs).values({ actor: admin.email, action: "EDIT", entityType: "property", entityId: id, details: property.title });
  return Response.json({ property });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const { id } = await params;
  const db = getDb();
  const [deleted] = await db.delete(properties).where(eq(properties.id, Number(id))).returning();
  if (!deleted) return Response.json({ error: "Property not found" }, { status: 404 });
  await db.insert(auditLogs).values({ actor: admin.email, action: "DELETE", entityType: "property", entityId: id, details: deleted.title });
  return Response.json({ ok: true });
}
