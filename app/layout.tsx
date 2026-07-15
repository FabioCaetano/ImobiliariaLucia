import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope=Manrope({variable:"--font-manrope",subsets:["latin"]});
const playfair=Playfair_Display({variable:"--font-playfair",subsets:["latin"],style:["normal","italic"]});

export async function generateMetadata():Promise<Metadata>{
 const h=await headers();const host=h.get("x-forwarded-host")||h.get("host")||"imobiliariadalucia.ca";const proto=h.get("x-forwarded-proto")||"https";const base=new URL(`${proto}://${host}`);
 return {metadataBase:base,title:{default:"Imobiliária da Lucia | Toronto Properties",template:"%s | Imobiliária da Lucia"},description:"Toronto homes for sale and rent with personal service in English, Portuguese and Spanish.",keywords:["Toronto real estate","Toronto homes","Toronto rentals","multilingual Toronto realtor"],openGraph:{type:"website",locale:"en_CA",siteName:"Imobiliária da Lucia",title:"Your place in Toronto",description:"Thoughtful curation and trusted guidance for buying or renting in Toronto.",images:[{url:"/og.png",width:1536,height:1024,alt:"Imobiliária da Lucia — your place in Toronto"}]},twitter:{card:"summary_large_image",title:"Imobiliária da Lucia",description:"Your place in Toronto.",images:["/og.png"]},robots:{index:true,follow:true}};
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-CA"><body className={`${manrope.variable} ${playfair.variable}`}>{children}</body></html>}
