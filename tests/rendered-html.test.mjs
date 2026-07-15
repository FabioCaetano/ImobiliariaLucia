import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("visual identity uses semantic tokens", async () => {
  const css = await read("app/globals.css");
  for (const color of ["#163A4A", "#C7A45D", "#28745A", "#F7F7F4", "#E9EFEE", "#20272B", "#667277", "#8A3D3D"]) assert.match(css, new RegExp(color, "i"));
  assert.match(css, /@media\(max-width:700px\)/);
});

test("public and admin pages exist", async () => {
  for (const path of ["app/page.tsx", "app/imoveis/page.tsx", "app/imoveis/[slug]/page.tsx", "app/admin/page.tsx", "app/api/properties/route.ts", "app/api/leads/route.ts", "app/api/uploads/route.ts"]) await access(new URL(`../${path}`, import.meta.url));
});

test("admin covers the full property lifecycle", async () => {
  const admin = await read("components/AdminDashboard.tsx");
  for (const action of ["New property", "duplicated", "published", "deactivated", "Sold", "Rented", "deleted"]) assert.match(admin, new RegExp(action, "i"));
});

test("forms, filters and WhatsApp are integrated", async () => {
  assert.match(await read("components/LeadForm.tsx"), /\/api\/leads/);
  const listing = await read("components/PropertyListing.tsx");
  assert.match(listing, /Furnished/); assert.match(listing, /Pet-friendly/);
  const detail = await read("app/imoveis/[slug]/page.tsx");
  assert.match(detail, /wa\.me/); assert.match(detail, /I would like more information/);
});

test("Supabase persistence and admin authorization are configured", async () => {
  const auth = await read("lib/admin-auth.ts");
  const api = await read("app/api/properties/[id]/route.ts");
  const upload = await read("app/api/uploads/route.ts");
  assert.match(auth, /auth\.getUser/); assert.match(api, /requireAdminApi/); assert.match(upload, /property-images/);
  await access(new URL("../supabase/schema.sql", import.meta.url));
  await access(new URL("../vercel.json", import.meta.url));
});

test("metadata does not contain starter preview", async () => {
  const layout = await read("app/layout.tsx"); const page = await read("app/page.tsx");
  assert.doesNotMatch(layout + page, /codex-preview|SkeletonPreview|Starter Project/);
  assert.match(layout, /openGraph/); assert.match(layout, /og\.png/);
});
