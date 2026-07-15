import Link from "next/link";
import { currency, type Property } from "../lib/demo-data";

export function PropertyCard({ property, list = false }: { property: Property; list?: boolean }) {
  const badge = property.featured ? "Featured property" : property.status;
  return <article className={`property-card ${list ? "list-card" : ""}`}><div className="property-photo"><img src={property.image} alt={`Exterior or interior of ${property.title}`} loading="lazy"/><span className={`badge badge-${badge.toLowerCase().replaceAll(" ", "-")}`}>{badge}</span><button className="favorite" aria-label={`Save ${property.title}`}>♡</button></div><div className="property-content"><div className="eyebrow">{property.type} • {property.purpose}</div><h3><Link href={`/imoveis/${property.slug}`}>{property.title}</Link></h3><p className="location">⌖ {property.neighborhood}, {property.city}</p><div className="property-price">{currency(property.price, property.purpose)}</div><div className="features"><span><b>{property.bedrooms}</b> bedrooms</span><span><b>{property.bathrooms}</b> baths</span><span><b>{property.parking}</b> parking</span><span><b>{property.area}</b> m²</span></div><div className="card-footer"><span>Ref. {property.code}</span><Link className="text-link" href={`/imoveis/${property.slug}`}>View details →</Link></div></div></article>;
}
