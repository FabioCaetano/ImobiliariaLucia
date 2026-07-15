import type { MetadataRoute } from "next";
import { demoProperties } from "../lib/demo-data";
export default function sitemap():MetadataRoute.Sitemap{const base="https://imobiliariadalucia.ca";return [{url:base,changeFrequency:"weekly",priority:1},{url:`${base}/imoveis`,changeFrequency:"daily",priority:.9},...demoProperties.map(p=>({url:`${base}/imoveis/${p.slug}`,lastModified:p.createdAt,changeFrequency:"weekly" as const,priority:.8}))]}
