"use client";

import { createClient, type Session } from "@supabase/supabase-js";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminDashboard } from "./AdminDashboard";

type AdminUser = { email: string; displayName: string };

export function AdminGate() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = useMemo(() => url && anonKey ? createClient(url, anonKey) : null, [url, anonKey]);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const checkSession = async (nextSession: Session | null) => {
      if (!active) return;
      setSession(nextSession);
      if (!nextSession) { setUser(null); setLoading(false); return; }
      setLoading(true);
      const response = await fetch("/api/admin/me", { headers: { authorization: `Bearer ${nextSession.access_token}` } });
      if (response.ok) setUser(((await response.json()) as { user: AdminUser }).user);
      else { setUser(null); setMessage("This account is not authorized for the admin portal."); }
      setLoading(false);
    };
    void supabase.auth.getSession().then(({ data }) => checkSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => { void checkSession(nextSession); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [supabase]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(form.get("email") || ""), password: String(form.get("password") || "") });
    if (error) { setMessage(error.message); setLoading(false); }
  }

  async function resetPassword(email: string) {
    if (!supabase || !email) { setMessage("Enter your email first."); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` });
    setMessage(error ? error.message : "Password reset instructions were sent to your email.");
  }

  if (!supabase) return <AdminMessage title="Supabase setup required" message="Add the Supabase environment variables in Vercel before using the admin portal." />;
  if (loading) return <AdminMessage title="Loading admin portal" message="Please wait…" />;
  if (session && user) return <AdminDashboard user={user} accessToken={session.access_token} onSignOut={() => { void supabase.auth.signOut(); }} />;

  return <main className="admin-login"><form className="admin-login-card" onSubmit={login}>
    <Link className="logo" href="/"><span className="logo-mark">L</span><span><b>REAL ESTATE</b><small>ADMIN PORTAL</small></span></Link>
    <h1>Welcome back</h1><p>Sign in with your authorized team account.</p>
    <label>Email<input name="email" type="email" required autoComplete="email" /></label>
    <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
    <button className="btn btn-primary" disabled={loading}>Sign in</button>
    <button type="button" className="text-link" onClick={() => resetPassword((document.querySelector('[name="email"]') as HTMLInputElement)?.value)}>Forgot password?</button>
    {message && <p className="form-message error" role="alert">{message}</p>}
  </form></main>;
}

function AdminMessage({ title, message }: { title: string; message: string }) {
  return <main className="admin-login"><div className="admin-login-card"><h1>{title}</h1><p>{message}</p><Link className="btn btn-primary" href="/">Return to site</Link></div></main>;
}
