import { allowedAdminEmails, getSupabaseAdmin } from "./supabase";

export type AdminUser = { email: string; displayName: string };

export async function requireAdminApi(request: Request): Promise<AdminUser | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data, error } = await getSupabaseAdmin().auth.getUser(token);
  if (error || !data.user?.email) return null;
  const email = data.user.email.toLowerCase();
  const allowed = allowedAdminEmails();
  if (!allowed.length || !allowed.includes(email)) return null;
  const metadata = data.user.user_metadata as Record<string, unknown>;
  return {
    email,
    displayName: String(metadata.full_name || metadata.name || data.user.email),
  };
}
