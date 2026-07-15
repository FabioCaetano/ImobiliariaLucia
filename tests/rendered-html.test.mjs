import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const read=(path)=>readFile(new URL(`../${path}`,import.meta.url),"utf8");

test("identidade visual usa tokens semânticos",async()=>{const css=await read("app/globals.css");for(const color of ["#163A4A","#C7A45D","#28745A","#F7F7F4","#E9EFEE","#20272B","#667277","#8A3D3D"])assert.match(css,new RegExp(color,"i"));assert.match(css,/@media\(max-width:700px\)/)});
test("páginas públicas e administrativas existem",async()=>{for(const path of ["app/page.tsx","app/imoveis/page.tsx","app/imoveis/[slug]/page.tsx","app/admin/page.tsx","app/api/properties/route.ts","app/api/leads/route.ts","app/api/uploads/route.ts"])await access(new URL(`../${path}`,import.meta.url))});
test("painel cobre o ciclo completo de imóveis",async()=>{const admin=await read("components/AdminDashboard.tsx");for(const action of ["Novo imóvel","duplicado","publicado","desativado","Vendido","Alugado","excluído"])assert.match(admin,new RegExp(action,"i"))});
test("formulários, filtros e WhatsApp estão integrados",async()=>{const lead=await read("components/LeadForm.tsx");const listing=await read("components/PropertyListing.tsx");const detail=await read("app/imoveis/[slug]/page.tsx");assert.match(lead,/\/api\/leads/);assert.match(listing,/Mobiliado/);assert.match(listing,/Aceita animais/);assert.match(detail,/wa\.me/);assert.match(detail,/Gostaria de receber mais informações/)});
test("persistência e segurança de rotas administrativas",async()=>{const hosting=JSON.parse(await read(".openai/hosting.json"));assert.equal(hosting.d1,"DB");assert.equal(hosting.r2,"IMAGES");const admin=await read("app/admin/page.tsx");const api=await read("app/api/properties/[id]/route.ts");assert.match(admin,/requireAdmin/);assert.match(api,/requireAdminApi/);await access(new URL("../drizzle/0000_black_wild_pack.sql",import.meta.url))});
test("metadados não contêm o preview inicial",async()=>{const layout=await read("app/layout.tsx");const page=await read("app/page.tsx");assert.doesNotMatch(layout+page,/codex-preview|SkeletonPreview|Starter Project/);assert.match(layout,/openGraph/);assert.match(layout,/og\.png/)});
