import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope=Manrope({variable:"--font-manrope",subsets:["latin"]});
const playfair=Playfair_Display({variable:"--font-playfair",subsets:["latin"],style:["normal","italic"]});

export async function generateMetadata():Promise<Metadata>{
 const h=await headers();const host=h.get("x-forwarded-host")||h.get("host")||"imobiliariadalucia.ca";const proto=h.get("x-forwarded-proto")||"https";const base=new URL(`${proto}://${host}`);
 return {metadataBase:base,title:{default:"Imobiliária da Lucia | Imóveis em Toronto",template:"%s | Imobiliária da Lucia"},description:"Imóveis para comprar e alugar em Toronto com atendimento humano em português, inglês e espanhol.",keywords:["imóveis Toronto","casa Toronto","aluguel Toronto","imobiliária brasileira Toronto"],openGraph:{type:"website",locale:"pt_BR",siteName:"Imobiliária da Lucia",title:"O seu lugar em Toronto",description:"Curadoria cuidadosa e orientação segura para comprar ou alugar em Toronto.",images:[{url:"/og.png",width:1536,height:1024,alt:"Imobiliária da Lucia — o seu lugar em Toronto"}]},twitter:{card:"summary_large_image",title:"Imobiliária da Lucia",description:"O seu lugar em Toronto.",images:["/og.png"]},robots:{index:true,follow:true}};
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${manrope.variable} ${playfair.variable}`}>{children}</body></html>}
