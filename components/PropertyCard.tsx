import Link from "next/link";
import { currency, type Property } from "../lib/demo-data";

export function PropertyCard({ property, list = false }: { property: Property; list?: boolean }) {
  const badge = property.featured ? "Imóvel em destaque" : property.status;
  return <article className={`property-card ${list ? "list-card" : ""}`}><div className="property-photo"><img src={property.image} alt={`Fachada ou interior de ${property.title}`} loading="lazy"/><span className={`badge badge-${badge.toLowerCase().replaceAll(" ", "-")}`}>{badge}</span><button className="favorite" aria-label={`Favoritar ${property.title}`}>♡</button></div><div className="property-content"><div className="eyebrow">{property.type} • {property.purpose}</div><h3><Link href={`/imoveis/${property.slug}`}>{property.title}</Link></h3><p className="location">⌖ {property.neighborhood}, {property.city}</p><div className="property-price">{currency(property.price, property.purpose)}</div><div className="features"><span><b>{property.bedrooms}</b> quartos</span><span><b>{property.bathrooms}</b> banhos</span><span><b>{property.parking}</b> vagas</span><span><b>{property.area}</b> m²</span></div><div className="card-footer"><span>Cód. {property.code}</span><Link className="text-link" href={`/imoveis/${property.slug}`}>Ver detalhes →</Link></div></div></article>;
}
