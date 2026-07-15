import { redirect } from "next/navigation";
import { getChatGPTUser } from "../app/chatgpt-auth";

export async function getAdminUser() {
  const user = await getChatGPTUser();
  if (!user && process.env.NODE_ENV === "development") {
    return { email: "admin@imobiliariadalucia.ca", displayName: "Lucia Admin", fullName: "Lucia Admin" };
  }
  if (!user) return null;
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);
  if (allowed.length && !allowed.includes(user.email.toLowerCase())) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/signin-with-chatgpt?return_to=%2Fadmin");
  return user;
}

export async function requireAdminApi() {
  const user = await getAdminUser();
  if (!user) return null;
  return user;
}
