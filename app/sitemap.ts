import type { MetadataRoute } from "next";
import { listProperties } from "../lib/properties-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://imobiliariadalucia.ca").replace(/\/$/, "");
  const properties = await listProperties(false);
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/imoveis`, changeFrequency: "daily", priority: .9 },
    ...properties.map((property) => ({ url: `${base}/imoveis/${property.slug}`, lastModified: property.createdAt, changeFrequency: "weekly" as const, priority: .8 })),
  ];
}
