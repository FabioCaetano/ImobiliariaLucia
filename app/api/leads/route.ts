import { requireAdminApi } from "../../../lib/admin-auth";
import { getSupabaseAdmin } from "../../../lib/supabase";

const leadFromRow = (row: Record<string, unknown>) => ({
  id: Number(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone),
  propertyCode: String(row.property_code || ""), message: String(row.message),
  preferredTime: String(row.preferred_time || ""), visitDate: String(row.visit_date || ""),
  status: String(row.status || "New"), assignee: String(row.assignee || "Lucia Team"),
  notes: String(row.notes || ""), createdAt: String(row.created_at),
});

export async function GET(request: Request) {
  if (!(await requireAdminApi(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await getSupabaseAdmin().from("leads").select("*").order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ leads: (data || []).map(leadFromRow) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    if (!name || !email.includes("@") || !phone || !message || body.consent !== true) {
      return Response.json({ error: "Complete the required fields and accept the consent statement" }, { status: 400 });
    }
    const { data, error } = await getSupabaseAdmin().from("leads").insert({
      name, email, phone, message, property_code: String(body.propertyCode || ""),
      preferred_time: String(body.preferredTime || ""), visit_date: body.visitDate ? String(body.visitDate) : null, status: "New",
    }).select("*").single();
    if (error) throw error;
    return Response.json({ lead: leadFromRow(data) }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not submit the form" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdminApi(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const { data, error } = await getSupabaseAdmin().from("leads").update({
    status: String(body.status || "New"), assignee: String(body.assignee || admin.displayName), notes: String(body.notes || ""),
  }).eq("id", Number(body.id)).select("*").maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 400 });
  if (!data) return Response.json({ error: "Lead not found" }, { status: 404 });
  return Response.json({ lead: leadFromRow(data) });
}
