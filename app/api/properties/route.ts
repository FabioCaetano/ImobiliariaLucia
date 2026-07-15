import { requireAdminApi } from "../../../lib/admin-auth";
import { parsePropertyInput, slugify } from "../../../lib/property-input";
import { listProperties, normalizeProperty, propertyToRow, writeAuditLog } from "../../../lib/properties-db";
import { getSupabaseAdmin, isSupabaseConfigured } from "../../../lib/supabase";

const clean = (value: unknown) => String(value || "").trim();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const wantsAdmin = url.searchParams.get("admin") === "1";
    if (wantsAdmin && !(await requireAdminApi(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (wantsAdmin && !isSupabaseConfigured()) return Response.json({ error: "Supabase is not configured" }, { status: 503 });
    let rows = await listProperties(wantsAdmin);
    const q = clean(url.searchParams.get("q")).toLowerCase();
    const purpose = clean(url.searchParams.get("purpose"));
    const neighborhood = clean(url.searchParams.get("neighborhood"));
    const type = clean(url.searchParams.get("type"));
    const min = Number(url.searchParams.get("min") || 0);
    const max = Number(url.searchParams.get("max") || 0);
    const bedrooms = Number(url.searchParams.get("bedrooms") || 0);
    if (q) rows = rows.filter((property) => `${property.title} ${property.code} ${property.neighborhood}`.toLowerCase().includes(q));
    if (purpose) rows = rows.filter((property) => property.purpose === purpose);
    if (neighborhood) rows = rows.filter((property) => property.neighborhood === neighborhood);
    if (type) rows = rows.filter((property) => property.type === type);
    if (min) rows = rows.filter((property) => property.price >= min);
    if (max) rows = rows.filter((property) => property.price <= max);
    if (bedrooms) rows = rows.filter((property) => property.bedrooms >= bedrooms);
    return Response.json({ properties: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to load properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdminApi(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const values = parsePropertyInput(body);
    if (!values.title || !values.code || !values.price) return Response.json({ error: "Title, code and price are required" }, { status: 400 });
    values.slug ||= `${slugify(values.title)}-${Date.now().toString().slice(-5)}`;
    const { data, error } = await getSupabaseAdmin().from("properties").insert(propertyToRow(values)).select("*").single();
    if (error) throw error;
    const property = normalizeProperty(data);
    await writeAuditLog(admin.email, "CREATE", String(property.id), property.title);
    return Response.json({ property }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create property";
    return Response.json({ error: message.includes("duplicate") ? "Code or URL already exists" : message }, { status: 400 });
  }
}
