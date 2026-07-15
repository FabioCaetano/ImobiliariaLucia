import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { PropertyListing } from "../../components/PropertyListing";
export const metadata = { title: "Imóveis em Toronto | Imobiliária da Lucia", description: "Casas, condos e apartamentos para comprar ou alugar em Toronto." };
export default function PropertiesPage(){return <><SiteHeader active="Imóveis"/><main><section className="listing-hero"><div className="container"><div className="section-kicker">ENCONTRE SEU PRÓXIMO ENDEREÇO</div><h1>Imóveis em Toronto</h1><p>Uma seleção cuidadosa para comprar, alugar ou investir com confiança.</p></div></section><Suspense fallback={<div className="container section">Carregando imóveis...</div>}><PropertyListing/></Suspense></main><SiteFooter/></>}
