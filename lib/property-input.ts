import type { Property } from "./demo-data";

const text = (value: unknown) => String(value || "").trim();
const number = (value: unknown) => Number(value || 0);

export const slugify = (value: string) => value
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function parsePropertyInput(body: Record<string, unknown>, partial = false): Partial<Property> {
  const output: Record<string, unknown> = {};
  const add = (key: string, value: unknown) => { if (!partial || key in body) output[key] = value; };
  add("title", text(body.title)); add("code", text(body.code)); add("slug", text(body.slug));
  add("type", text(body.type) || "House"); add("purpose", text(body.purpose) || "Buy");
  add("status", text(body.status) || "Available"); add("price", number(body.price));
  add("city", text(body.city) || "Toronto"); add("neighborhood", text(body.neighborhood));
  add("address", text(body.address)); add("bedrooms", number(body.bedrooms));
  add("bathrooms", number(body.bathrooms)); add("suites", number(body.suites));
  add("parking", number(body.parking)); add("area", number(body.area));
  add("description", text(body.description)); add("amenities", Array.isArray(body.amenities) ? body.amenities.map(String) : []);
  add("image", text(body.image)); add("images", Array.isArray(body.images) ? body.images.map(String) : []);
  add("featured", Boolean(body.featured)); add("furnished", Boolean(body.furnished));
  add("pets", Boolean(body.pets)); add("published", Boolean(body.published));
  add("seoTitle", text(body.seoTitle)); add("seoDescription", text(body.seoDescription));
  add("videoUrl", text(body.videoUrl)); add("virtualTourUrl", text(body.virtualTourUrl));
  return output as Partial<Property>;
}
