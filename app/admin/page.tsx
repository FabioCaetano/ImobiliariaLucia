import { AdminDashboard } from "../../components/AdminDashboard";
import { requireAdmin } from "../../lib/admin-auth";
export const dynamic="force-dynamic";
export const metadata={title:"Admin dashboard | Imobiliária da Lucia",robots:{index:false,follow:false}};
export default async function AdminPage(){const user=await requireAdmin();return <AdminDashboard user={{displayName:user.displayName,email:user.email}}/>}
