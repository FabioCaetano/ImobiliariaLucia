import { env } from "cloudflare:workers";
let ready: Promise<void> | null = null;
export function ensureDatabase(){
 if(ready)return ready;
 ready=(async()=>{const d1=(env as unknown as {DB:D1Database}).DB;await d1.batch([
  d1.prepare("CREATE TABLE IF NOT EXISTS properties (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, title text NOT NULL, slug text NOT NULL UNIQUE, code text NOT NULL UNIQUE, type text NOT NULL, purpose text NOT NULL, status text DEFAULT 'Disponível' NOT NULL, price real NOT NULL, city text DEFAULT 'Toronto' NOT NULL, neighborhood text NOT NULL, address text NOT NULL, bedrooms integer DEFAULT 0 NOT NULL, bathrooms integer DEFAULT 0 NOT NULL, suites integer DEFAULT 0 NOT NULL, parking integer DEFAULT 0 NOT NULL, area real DEFAULT 0 NOT NULL, description text DEFAULT '' NOT NULL, amenities text DEFAULT '[]' NOT NULL, image text DEFAULT '' NOT NULL, images text DEFAULT '[]' NOT NULL, featured integer DEFAULT false NOT NULL, furnished integer DEFAULT false NOT NULL, pets integer DEFAULT false NOT NULL, published integer DEFAULT false NOT NULL, views integer DEFAULT 0 NOT NULL, seo_title text DEFAULT '' NOT NULL, seo_description text DEFAULT '' NOT NULL, video_url text DEFAULT '' NOT NULL, virtual_tour_url text DEFAULT '' NOT NULL, created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at text DEFAULT CURRENT_TIMESTAMP NOT NULL)"),
  d1.prepare("CREATE TABLE IF NOT EXISTS leads (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, name text NOT NULL, email text NOT NULL, phone text NOT NULL, property_code text DEFAULT '' NOT NULL, message text NOT NULL, preferred_time text DEFAULT '' NOT NULL, visit_date text DEFAULT '' NOT NULL, status text DEFAULT 'Novo' NOT NULL, assignee text DEFAULT 'Equipe Lucia' NOT NULL, notes text DEFAULT '' NOT NULL, created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL)"),
  d1.prepare("CREATE TABLE IF NOT EXISTS audit_logs (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, actor text NOT NULL, action text NOT NULL, entity_type text NOT NULL, entity_id text NOT NULL, details text DEFAULT '' NOT NULL, created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL)"),
  d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS properties_slug_unique ON properties (slug)"),
  d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS properties_code_unique ON properties (code)")
 ]);})();return ready;
}
