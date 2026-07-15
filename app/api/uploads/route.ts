import { requireAdminApi } from "../../../lib/admin-auth";
import { getSupabaseAdmin } from "../../../lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdminApi(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const files = form.getAll("files").filter((value): value is File => value instanceof File);
  if (!files.length) return Response.json({ error: "Select at least one image" }, { status: 400 });
  if (files.length > 12) return Response.json({ error: "Maximum 12 images per upload" }, { status: 400 });
  const supabase = getSupabaseAdmin();
  const uploaded: { url: string; name: string }[] = [];
  for (const file of files) {
    if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size > 8 * 1024 * 1024) {
      return Response.json({ error: "Use JPG, PNG, WebP or AVIF files up to 8 MB" }, { status: 400 });
    }
    const ext = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
    const path = `properties/${crypto.randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage.from("property-images").upload(path, bytes, { contentType: file.type, upsert: false });
    if (error) return Response.json({ error: error.message }, { status: 400 });
    const { data } = supabase.storage.from("property-images").getPublicUrl(path);
    uploaded.push({ url: data.publicUrl, name: file.name });
  }
  return Response.json({ files: uploaded }, { status: 201 });
}
