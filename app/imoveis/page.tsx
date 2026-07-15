import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { PropertyListing } from "../../components/PropertyListing";
import { listProperties } from "../../lib/properties-db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Toronto Properties | Imobiliária da Lucia", description: "Houses, condos and apartments for sale or rent in Toronto." };

export default async function PropertiesPage() {
  const properties = await listProperties(false);
  return <><SiteHeader active="Properties"/><main><section className="listing-hero"><div className="container"><div className="section-kicker">FIND YOUR NEXT ADDRESS</div><h1>Toronto Properties</h1><p>A carefully selected collection for buying, renting or investing with confidence.</p></div></section><Suspense fallback={<div className="container section">Loading properties...</div>}><PropertyListing properties={properties}/></Suspense></main><SiteFooter/></>;
}
