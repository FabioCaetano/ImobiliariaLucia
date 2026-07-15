import { AdminGate } from "../../components/AdminGate";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin dashboard | Imobiliária da Lucia", robots: { index: false, follow: false } };

export default function AdminPage() { return <AdminGate />; }
