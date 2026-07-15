import { requireAdminApi } from "../../../../lib/admin-auth";
import { parsePropertyInput } from "../../../../lib/property-input";
import { normalizeProperty, propertyToRow, writeAuditLog } from "../../../../lib/properties-db";
import { getSupabaseAdmin } from "../../../../lib/supabase";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminApi(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const values = propertyToRow(parsePropertyInput(body, true));
  const update = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined));
  const { data, error } = await getSupabaseAdmin().from("properties").update({ ...update, updated_at: new Date().toISOString() }).eq("id", Number(id)).select("*").maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 400 });
  if (!data) return Response.json({ error: "Property not found" }, { status: 404 });
  const property = normalizeProperty(data);
  await writeAuditLog(admin.email, "EDIT", id, property.title);
  return Response.json({ property });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminApi(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { data, error } = await getSupabaseAdmin().from("properties").delete().eq("id", Number(id)).select("*").maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 400 });
  if (!data) return Response.json({ error: "Property not found" }, { status: 404 });
  await writeAuditLog(admin.email, "DELETE", id, String(data.title || ""));
  return Response.json({ ok: true });
}
