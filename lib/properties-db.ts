import { demoProperties, type Property } from "./demo-data";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

type PropertyRow = Record<string, unknown>;

export function normalizeProperty(row: PropertyRow): Property {
  return {
    id: Number(row.id),
    title: String(row.title || ""),
    slug: String(row.slug || ""),
    code: String(row.code || ""),
    type: String(row.type || ""),
    purpose: String(row.purpose || ""),
    status: String(row.status || "Available"),
    price: Number(row.price || 0),
    city: String(row.city || "Toronto"),
    neighborhood: String(row.neighborhood || ""),
    address: String(row.address || ""),
    bedrooms: Number(row.bedrooms || 0),
    bathrooms: Number(row.bathrooms || 0),
    suites: Number(row.suites || 0),
    parking: Number(row.parking || 0),
    area: Number(row.area || 0),
    description: String(row.description || ""),
    amenities: Array.isArray(row.amenities) ? row.amenities.map(String) : [],
    image: String(row.image || ""),
    images: Array.isArray(row.images) ? row.images.map(String) : [],
    featured: Boolean(row.featured),
    furnished: Boolean(row.furnished),
    pets: Boolean(row.pets),
    published: Boolean(row.published),
    views: Number(row.views || 0),
    seoTitle: String(row.seo_title || ""),
    seoDescription: String(row.seo_description || ""),
    videoUrl: String(row.video_url || ""),
    virtualTourUrl: String(row.virtual_tour_url || ""),
    createdAt: String(row.created_at || new Date().toISOString()),
  };
}

export function propertyToRow(property: Partial<Property>) {
  return {
    title: property.title,
    slug: property.slug,
    code: property.code,
    type: property.type,
    purpose: property.purpose,
    status: property.status,
    price: property.price,
    city: property.city,
    neighborhood: property.neighborhood,
    address: property.address,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    suites: property.suites,
    parking: property.parking,
    area: property.area,
    description: property.description,
    amenities: property.amenities,
    image: property.image,
    images: property.images,
    featured: property.featured,
    furnished: property.furnished,
    pets: property.pets,
    published: property.published,
    views: property.views,
    seo_title: property.seoTitle,
    seo_description: property.seoDescription,
    video_url: property.videoUrl,
    virtual_tour_url: property.virtualTourUrl,
  };
}

async function seedIfEmpty() {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase.from("properties").select("id", { count: "exact", head: true });
  if (error) throw error;
  if (count === 0) {
    const rows = demoProperties.map((property) => propertyToRow(property));
    const { error: seedError } = await supabase.from("properties").upsert(rows, { onConflict: "code", ignoreDuplicates: true });
    if (seedError) throw seedError;
  }
}

export async function listProperties(includeDrafts = false) {
  if (!isSupabaseConfigured()) return demoProperties;
  await seedIfEmpty();
  let query = getSupabaseAdmin().from("properties").select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (!includeDrafts) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((row) => normalizeProperty(row));
}

export async function getPropertyBySlug(slug: string) {
  if (!isSupabaseConfigured()) return demoProperties.find((property) => property.slug === slug) || null;
  await seedIfEmpty();
  const { data, error } = await getSupabaseAdmin().from("properties").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw error;
  return data ? normalizeProperty(data) : null;
}

export async function getSimilarProperties(current: Property) {
  const all = await listProperties(false);
  return all
    .filter((property) => property.id !== current.id && (property.purpose === current.purpose || property.neighborhood === current.neighborhood))
    .sort((a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price))
    .slice(0, 3);
}

export async function writeAuditLog(actor: string, action: string, entityId: string, details: string) {
  const { error } = await getSupabaseAdmin().from("audit_logs").insert({
    actor, action, entity_type: "property", entity_id: entityId, details,
  });
  if (error) console.error("Could not write audit log", error.message);
}
