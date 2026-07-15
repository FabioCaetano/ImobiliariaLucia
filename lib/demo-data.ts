export type Property = {
  id: number; title: string; slug: string; code: string; type: string;
  purpose: string; status: string; price: number; city: string;
  neighborhood: string; address: string; bedrooms: number; bathrooms: number;
  suites: number; parking: number; area: number; description: string;
  amenities: string[]; image: string; images: string[]; featured: boolean;
  furnished: boolean; pets: boolean; published: boolean; views: number;
  createdAt: string; seoTitle?: string; seoDescription?: string;
  videoUrl?: string; virtualTourUrl?: string;
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
  { id: 1, title: "Contemporary home in High Park", slug: "casa-contemporanea-high-park", code: "LU-1048", type: "House", purpose: "Buy", status: "Available", price: 1849000, city: "Toronto", neighborhood: "High Park", address: "18 Indian Road Crescent", bedrooms: 4, bathrooms: 3, suites: 1, parking: 2, area: 238, description: "A bright, welcoming home renovated for contemporary living without losing its neighbourhood charm. Open-plan spaces, a private garden and quick access to High Park.", amenities: ["Air conditioning", "Fireplace", "Garden", "Laundry", "Balcony"], image: imgs.house, images: [imgs.house, imgs.kitchen, imgs.interior], featured: true, furnished: false, pets: true, published: true, views: 864, createdAt: "2026-07-10" },
  { id: 2, title: "Lake-view condo on the waterfront", slug: "condo-vista-lago-harbourfront", code: "LU-1052", type: "Condo", purpose: "Rent", status: "Available", price: 3650, city: "Toronto", neighborhood: "Harbourfront", address: "15 Queens Quay East", bedrooms: 2, bathrooms: 2, suites: 1, parking: 1, area: 92, description: "A sophisticated condo with floor-to-ceiling windows, a generous balcony and open lake views. Full-service amenities steps from the waterfront.", amenities: ["Pool", "Gym", "Elevator", "Concierge", "Balcony"], image: imgs.condo, images: [imgs.condo, imgs.interior, imgs.kitchen], featured: true, furnished: true, pets: true, published: true, views: 721, createdAt: "2026-07-12" },
  { id: 3, title: "Authentic loft in the Distillery District", slug: "loft-distillery-district", code: "LU-1043", type: "Loft", purpose: "Buy", status: "New", price: 989000, city: "Toronto", neighborhood: "Distillery District", address: "33 Mill Street", bedrooms: 1, bathrooms: 2, suites: 1, parking: 1, area: 108, description: "Exposed brick, soaring ceilings and unmistakable character in one of Toronto's most sought-after locations. A generous layout with impeccable finishes.", amenities: ["Elevator", "Gym", "Concierge", "Air conditioning"], image: imgs.loft, images: [imgs.loft, imgs.interior, imgs.kitchen], featured: true, furnished: false, pets: true, published: true, views: 635, createdAt: "2026-07-08" },
  { id: 4, title: "Family townhouse in Leslieville", slug: "townhouse-familiar-leslieville", code: "LU-1055", type: "Townhouse", purpose: "Rent", status: "Available", price: 4750, city: "Toronto", neighborhood: "Leslieville", address: "84 Carlaw Avenue", bedrooms: 3, bathrooms: 3, suites: 1, parking: 1, area: 176, description: "A spacious townhouse on a quiet street with a terrace, renovated kitchen and a family-friendly location.", amenities: ["Terrace", "Laundry", "Air conditioning", "Pet-friendly"], image: imgs.modern, images: [imgs.modern, imgs.kitchen, imgs.interior], featured: false, furnished: false, pets: true, published: true, views: 402, createdAt: "2026-07-14" },
  { id: 5, title: "Elegant apartment in Yorkville", slug: "apartamento-elegante-yorkville", code: "LU-1039", type: "Apartment", purpose: "Buy", status: "Available", price: 1295000, city: "Toronto", neighborhood: "Yorkville", address: "110 Bloor Street West", bedrooms: 2, bathrooms: 2, suites: 1, parking: 1, area: 116, description: "Understated elegance in the heart of Yorkville, with concierge service, premium finishes and a beautifully planned layout.", amenities: ["Concierge", "Gym", "Elevator", "Air conditioning"], image: imgs.interior, images: [imgs.interior, imgs.kitchen, imgs.condo], featured: false, furnished: true, pets: false, published: true, views: 518, createdAt: "2026-07-03" },
  { id: 6, title: "Sun-filled home in The Beaches", slug: "casa-ensolarada-the-beaches", code: "LU-1050", type: "House", purpose: "Buy", status: "Available", price: 1675000, city: "Toronto", neighborhood: "The Beaches", address: "42 Woodbine Avenue", bedrooms: 3, bathrooms: 2, suites: 1, parking: 2, area: 205, description: "A home filled with natural light just minutes from the beach, with a backyard, balcony and inviting spaces for entertaining.", amenities: ["Garden", "Balcony", "Fireplace", "Laundry"], image: imgs.modern, images: [imgs.modern, imgs.house, imgs.kitchen], featured: false, furnished: false, pets: true, published: true, views: 489, createdAt: "2026-07-11" },
];

export const currency = (value: number, purpose = "Buy") => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value) + (purpose === "Rent" ? "/month" : "");
