import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { Gallery } from "../../../components/Gallery";
import { LeadForm } from "../../../components/LeadForm";
import { PropertyCard } from "../../../components/PropertyCard";
import { currency } from "../../../lib/demo-data";
import { getPropertyBySlug, getSimilarProperties } from "../../../lib/properties-db";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const property = await getPropertyBySlug(slug);
  return property ? { title: `${property.title} | Imobiliária da Lucia`, description: property.description, openGraph: { title: property.title, description: property.description, images: property.image ? [property.image] : undefined } } : { title: "Property not found" };
}

export default async function PropertyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const property = await getPropertyBySlug(slug); if (!property) notFound();
  const similar = await getSimilarProperties(property);
  const whatsapp = `Hello, I am interested in property ${property.code} – ${property.title}. I would like more information.`;
  return <><SiteHeader active="Properties"/><main className="detail-page"><div className="container breadcrumbs"><Link href="/">Home</Link> / <Link href="/imoveis">Properties</Link> / {property.title}</div><div className="container"><Gallery images={property.images} title={property.title}/><div className="detail-main"><div className="detail-copy"><div className="detail-title"><div className="eyebrow">{property.type} • {property.purpose} • Ref. {property.code}</div><h1>{property.title}</h1><p className="location">⌖ {property.address}, {property.neighborhood}, {property.city}</p><div className="detail-price">{currency(property.price, property.purpose)}</div></div><div className="detail-specs"><span><b>{property.bedrooms}</b> Bedrooms</span><span><b>{property.bathrooms}</b> Bathrooms</span><span><b>{property.suites}</b> Suites</span><span><b>{property.parking}</b> Parking</span><span><b>{property.area}</b> m²</span></div><h2>About this property</h2><p>{property.description}</p><p>Thoughtful finishes, excellent natural light and a location that makes everyday life easier. Contact us for property taxes, maintenance fees and other listing details.</p><h3>Features and amenities</h3><div className="amenities">{property.amenities.map((amenity) => <span key={amenity}>✓ {amenity}</span>)}</div><div className="map-placeholder"><div><b>⌖ {property.neighborhood}, Toronto</b><br/><small>Approximate location shown to protect privacy</small></div></div></div><aside className="detail-sidebar"><div className="interest-card"><h3>Interested in this property?</h3><p>Share your details and speak with a local specialist.</p><LeadForm propertyCode={property.code} compact/><div className="sidebar-actions"><a className="btn btn-action" href={`https://wa.me/14165550148?text=${encodeURIComponent(whatsapp)}`} target="_blank" rel="noreferrer">◉ Chat on WhatsApp</a><a className="btn btn-primary" href="#schedule">Book a showing</a></div></div></aside></div>{similar.length > 0 && <section className="similar"><div className="section-heading"><div><div className="section-kicker">YOU MAY ALSO LIKE</div><h2>Similar properties</h2></div></div><div className="property-grid">{similar.map((item) => <PropertyCard key={item.id} property={item}/>)}</div></section>}</div></main><SiteFooter/></>;
}
