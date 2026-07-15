import { env } from "cloudflare:workers";
import { requireAdminApi } from "../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!(await requireAdminApi())) return Response.json({ error: "Não autorizado" }, { status: 401 });
  const form = await request.formData();
  const files = form.getAll("files").filter((v): v is File => v instanceof File);
  if (!files.length) return Response.json({ error: "Selecione ao menos uma imagem" }, { status: 400 });
  if (files.length > 12) return Response.json({ error: "Limite de 12 imagens por envio" }, { status: 400 });
  const bucket = (env as unknown as { IMAGES: R2Bucket }).IMAGES;
  const uploaded: { url: string; name: string }[] = [];
  for (const file of files) {
    if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size > 8 * 1024 * 1024) return Response.json({ error: "Use JPG, PNG, WebP ou AVIF com até 8 MB" }, { status: 400 });
    const ext = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
    const key = `properties/${crypto.randomUUID()}.${ext}`;
    await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type }, customMetadata: { originalName: file.name } });
    uploaded.push({ url: `/api/uploads/${key}`, name: file.name });
  }
  return Response.json({ files: uploaded }, { status: 201 });
}
