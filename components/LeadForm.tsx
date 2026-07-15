"use client";
import { FormEvent, useState } from "react";

export function LeadForm({ propertyCode = "", compact = false }: { propertyCode?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("loading"); setMessage("");
    const form = new FormData(event.currentTarget); const payload = Object.fromEntries(form.entries()) as Record<string, unknown>;
    payload.consent = form.get("consent") === "on"; payload.propertyCode = propertyCode;
    try { const res = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); const data = await res.json() as { error?: string }; if (!res.ok) throw new Error(data.error); setState("success"); setMessage("Recebemos sua mensagem. Nossa equipe entrará em contato em breve."); event.currentTarget.reset(); }
    catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente."); }
  }
  return <form className={`lead-form ${compact ? "compact" : ""}`} onSubmit={submit}><div className="form-grid"><label>Nome completo<input name="name" required autoComplete="name" placeholder="Seu nome"/></label><label>E-mail<input name="email" type="email" required autoComplete="email" placeholder="voce@email.com"/></label><label>Telefone<input name="phone" required autoComplete="tel" placeholder="+1 (___) ___-____"/></label><label>Melhor horário<select name="preferredTime"><option>Manhã</option><option>Tarde</option><option>Noite</option></select></label>{!compact && <label>Data desejada para visita<input name="visitDate" type="date"/></label>}<label className={compact ? "full" : ""}>Mensagem<textarea name="message" required rows={compact ? 3 : 5} defaultValue={propertyCode ? `Olá, tenho interesse no imóvel ${propertyCode}. Gostaria de receber mais informações.` : ""}/></label></div><label className="consent"><input name="consent" type="checkbox" required/> Concordo com o uso dos meus dados para este atendimento.</label><button className="btn btn-action" disabled={state === "loading"}>{state === "loading" ? "Enviando..." : "Tenho interesse"}</button>{message && <p className={`form-message ${state}`} role="status">{message}</p>}</form>;
}
