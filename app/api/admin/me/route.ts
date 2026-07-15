import { requireAdminApi } from "../../../../lib/admin-auth";

export async function GET(request: Request) {
  const admin = await requireAdminApi(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ user: admin });
}
