"use client";
import { FormEvent, useState } from "react";

export function LeadForm({ propertyCode = "", compact = false }: { propertyCode?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("loading"); setMessage("");
    const form = new FormData(event.currentTarget); const payload = Object.fromEntries(form.entries()) as Record<string, unknown>;
    payload.consent = form.get("consent") === "on"; payload.propertyCode = propertyCode;
    try { const res = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); const data = await res.json() as { error?: string }; if (!res.ok) throw new Error(data.error); setState("success"); setMessage("We received your message. Our team will be in touch shortly."); event.currentTarget.reset(); }
    catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "We could not send your message. Please try again."); }
  }
  return <form className={`lead-form ${compact ? "compact" : ""}`} onSubmit={submit}><div className="form-grid"><label>Full name<input name="name" required autoComplete="name" placeholder="Your name"/></label><label>E-mail<input name="email" type="email" required autoComplete="email" placeholder="you@email.com"/></label><label>Phone<input name="phone" required autoComplete="tel" placeholder="+1 (___) ___-____"/></label><label>Best time to contact you<select name="preferredTime"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>{!compact && <label>Preferred showing date<input name="visitDate" type="date"/></label>}<label className={compact ? "full" : ""}>Message<textarea name="message" required rows={compact ? 3 : 5} defaultValue={propertyCode ? `Hello, I am interested in property ${propertyCode}. I would like more information.` : ""}/></label></div><label className="consent"><input name="consent" type="checkbox" required/> I consent to the use of my information for this inquiry.</label><button className="btn btn-action" disabled={state === "loading"}>{state === "loading" ? "Sending..." : "I'm interested"}</button>{message && <p className={`form-message ${state}`} role="status">{message}</p>}</form>;
}
