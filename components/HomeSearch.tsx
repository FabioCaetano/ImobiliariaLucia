"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function HomeSearch() {
  const router = useRouter();
  function search(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const fd = new FormData(e.currentTarget); const q = new URLSearchParams(); fd.forEach((v, k) => { if (v) q.set(k, String(v)); }); router.push(`/imoveis?${q}`); }
  return <form className="hero-search" onSubmit={search}><label>Eu quero<select name="purpose"><option value="">Comprar ou alugar</option><option>Compra</option><option>Aluguel</option><option>Temporada</option></select></label><label>Cidade<select name="city"><option>Toronto</option></select></label><label>Bairro<select name="neighborhood"><option value="">Todos os bairros</option><option>High Park</option><option>Harbourfront</option><option>Yorkville</option><option>Leslieville</option><option>The Beaches</option></select></label><label>Tipo<select name="type"><option value="">Todos os tipos</option><option>Casa</option><option>Condo</option><option>Loft</option><option>Townhouse</option><option>Apartamento</option></select></label><label>Quartos<select name="bedrooms"><option value="">Qualquer</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label><label>Faixa de preço<select name="max"><option value="">Qualquer valor</option><option value="4000">Até C$ 4 mil/mês</option><option value="1000000">Até C$ 1 milhão</option><option value="1500000">Até C$ 1,5 milhão</option><option value="2000000">Até C$ 2 milhões</option></select></label><button className="btn btn-accent">Buscar imóveis</button></form>;
}
