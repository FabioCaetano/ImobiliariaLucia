export type Property = {
  id: number; title: string; slug: string; code: string; type: string;
  purpose: string; status: string; price: number; city: string;
  neighborhood: string; address: string; bedrooms: number; bathrooms: number;
  suites: number; parking: number; area: number; description: string;
  amenities: string[]; image: string; images: string[]; featured: boolean;
  furnished: boolean; pets: boolean; published: boolean; views: number;
  createdAt: string;
};

const imgs = {
  house: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85",
  condo: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  loft: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
  kitchen: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
  interior: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
  modern: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
};

export const demoProperties: Property[] = [
  { id: 1, title: "Casa contemporânea em High Park", slug: "casa-contemporanea-high-park", code: "LU-1048", type: "Casa", purpose: "Compra", status: "Disponível", price: 1849000, city: "Toronto", neighborhood: "High Park", address: "18 Indian Road Crescent", bedrooms: 4, bathrooms: 3, suites: 1, parking: 2, area: 238, description: "Uma casa luminosa e acolhedora, renovada para a vida contemporânea sem perder o charme do bairro. Ambientes integrados, jardim privativo e acesso rápido ao High Park.", amenities: ["Ar-condicionado", "Lareira", "Jardim", "Lavanderia", "Varanda"], image: imgs.house, images: [imgs.house, imgs.kitchen, imgs.interior], featured: true, furnished: false, pets: true, published: true, views: 864, createdAt: "2026-07-10" },
  { id: 2, title: "Condo com vista para o lago", slug: "condo-vista-lago-harbourfront", code: "LU-1052", type: "Condo", purpose: "Aluguel", status: "Disponível", price: 3650, city: "Toronto", neighborhood: "Harbourfront", address: "15 Queens Quay East", bedrooms: 2, bathrooms: 2, suites: 1, parking: 1, area: 92, description: "Condo sofisticado com janelas do piso ao teto, varanda ampla e vista aberta para o lago. Condomínio completo a poucos passos da waterfront.", amenities: ["Piscina", "Academia", "Elevador", "Portaria", "Varanda"], image: imgs.condo, images: [imgs.condo, imgs.interior, imgs.kitchen], featured: true, furnished: true, pets: true, published: true, views: 721, createdAt: "2026-07-12" },
  { id: 3, title: "Loft autêntico no Distillery District", slug: "loft-distillery-district", code: "LU-1043", type: "Loft", purpose: "Compra", status: "Novo", price: 989000, city: "Toronto", neighborhood: "Distillery District", address: "33 Mill Street", bedrooms: 1, bathrooms: 2, suites: 1, parking: 1, area: 108, description: "Tijolos aparentes, pé-direito alto e personalidade em um dos endereços mais desejados de Toronto. Planta generosa e acabamento impecável.", amenities: ["Elevador", "Academia", "Portaria", "Ar-condicionado"], image: imgs.loft, images: [imgs.loft, imgs.interior, imgs.kitchen], featured: true, furnished: false, pets: true, published: true, views: 635, createdAt: "2026-07-08" },
  { id: 4, title: "Townhouse familiar em Leslieville", slug: "townhouse-familiar-leslieville", code: "LU-1055", type: "Townhouse", purpose: "Aluguel", status: "Disponível", price: 4750, city: "Toronto", neighborhood: "Leslieville", address: "84 Carlaw Avenue", bedrooms: 3, bathrooms: 3, suites: 1, parking: 1, area: 176, description: "Townhouse espaçosa em rua tranquila, com terraço, cozinha renovada e localização perfeita para famílias.", amenities: ["Terraço", "Lavanderia", "Ar-condicionado", "Aceita animais"], image: imgs.modern, images: [imgs.modern, imgs.kitchen, imgs.interior], featured: false, furnished: false, pets: true, published: true, views: 402, createdAt: "2026-07-14" },
  { id: 5, title: "Apartamento elegante em Yorkville", slug: "apartamento-elegante-yorkville", code: "LU-1039", type: "Apartamento", purpose: "Compra", status: "Disponível", price: 1295000, city: "Toronto", neighborhood: "Yorkville", address: "110 Bloor Street West", bedrooms: 2, bathrooms: 2, suites: 1, parking: 1, area: 116, description: "Elegância discreta no coração de Yorkville, com serviço de concierge, acabamentos premium e uma planta muito bem resolvida.", amenities: ["Concierge", "Academia", "Elevador", "Ar-condicionado"], image: imgs.interior, images: [imgs.interior, imgs.kitchen, imgs.condo], featured: false, furnished: true, pets: false, published: true, views: 518, createdAt: "2026-07-03" },
  { id: 6, title: "Casa ensolarada em The Beaches", slug: "casa-ensolarada-the-beaches", code: "LU-1050", type: "Casa", purpose: "Compra", status: "Disponível", price: 1675000, city: "Toronto", neighborhood: "The Beaches", address: "42 Woodbine Avenue", bedrooms: 3, bathrooms: 2, suites: 1, parking: 2, area: 205, description: "Casa cheia de luz natural a poucos minutos da praia, com quintal, varanda e espaços ideais para receber.", amenities: ["Jardim", "Varanda", "Lareira", "Lavanderia"], image: imgs.modern, images: [imgs.modern, imgs.house, imgs.kitchen], featured: false, furnished: false, pets: true, published: true, views: 489, createdAt: "2026-07-11" },
];

export const currency = (value: number, purpose = "Compra") => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value) + (purpose === "Aluguel" ? "/mês" : "");
