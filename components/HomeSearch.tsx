"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function HomeSearch() {
  const router = useRouter();
  function search(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const fd = new FormData(e.currentTarget); const q = new URLSearchParams(); fd.forEach((v, k) => { if (v) q.set(k, String(v)); }); router.push(`/imoveis?${q}`); }
  return <form className="hero-search" onSubmit={search}><label>I want to<select name="purpose"><option value="">Buy or rent</option><option>Buy</option><option>Rent</option><option>Seasonal</option></select></label><label>City<select name="city"><option>Toronto</option></select></label><label>Neighbourhood<select name="neighborhood"><option value="">All neighbourhoods</option><option>High Park</option><option>Harbourfront</option><option>Yorkville</option><option>Leslieville</option><option>The Beaches</option></select></label><label>Property type<select name="type"><option value="">All types</option><option>House</option><option>Condo</option><option>Loft</option><option>Townhouse</option><option>Apartment</option></select></label><label>Bedrooms<select name="bedrooms"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label><label>Price range<select name="max"><option value="">Any price</option><option value="4000">Up to C$4,000/month</option><option value="1000000">Up to C$1 million</option><option value="1500000">Up to C$1.5 million</option><option value="2000000">Up to C$2 million</option></select></label><button className="btn btn-accent">Search properties</button></form>;
}
