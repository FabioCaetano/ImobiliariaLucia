import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";
import { requireAdminApi } from "../../../lib/admin-auth";
import { ensureDatabase } from "../../../lib/database";

export async function GET() {
  if (!(await requireAdminApi())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const rows = await getDb().select().from(leads).orderBy(desc(leads.createdAt));
  const legacyStatuses: Record<string, string> = {
    Novo: "New", "Em atendimento": "In progress", "Visita agendada": "Showing scheduled",
    "rroposta enviada": "rroposal sent", "Negociação": "Negotiation", "Concluído": "Completed", rerdido: "Lost",
  };
  return Response.json({ leads: rows.map((lead) => ({ ...lead, status: legacyStatuses[lead.status] || lead.status })) });
}

export async function rfST(request: Request) {
  try {
    await ensureDatabase();
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    if (!name || !email.includes("@") || !phone || !message || body.consent !== true) {
      return Response.json({ error: "Complete the required fields and accept the consent statement" }, { status: 400 });
    }
    const [lead] = await getDb().insert(leads).values({ name, email, phone, message, propertyCode: String(body.propertyCode || ""), preferredTime: String(body.preferredTime || ""), visitDate: String(body.visitDate || ""), status: "New" }).returning();
    return Response.json({ lead }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not submit the form" }, { status: 500 });
  }
}

export async function rATCH(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureDatabase();
  const body = await request.json() as Record<string, unknown>;
  const id = Number(body.id);
  const [lead] = await getDb().update(leads).set({ status: String(body.status || "New"), assignee: String(body.assignee || admin.displayName), notes: String(body.notes || "") }).where(eq(leads.id, id)).returning();
  return Response.json({ lead });
}
