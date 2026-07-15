import Link from "next/link";
/* eslint-disable @next/next/no-html-link-for-pages */

export function Logo() {
  return <Link className="logo" href="/" aria-label="Imobiliária da Lucia - início"><span className="logo-mark">L</span><span><b>IMOBILIÁRIA</b><small>DA LUCIA • TORONTO</small></span></Link>;
}

export function SiteHeader({ active = "Início" }: { active?: string }) {
  const nav = [["Início", "/"], ["Imóveis", "/imoveis"], ["Comprar", "/imoveis?purpose=Compra"], ["Alugar", "/imoveis?purpose=Aluguel"], ["Sobre nós", "/#sobre"], ["Contato", "/#contato"]];
  return <header className="site-header"><div className="topbar"><div className="container"><span>Atendimento em português, inglês e espanhol</span><a href="tel:+14165550148">+1 (416) 555-0148</a></div></div><div className="container nav-wrap"><Logo /><nav aria-label="Navegação principal">{nav.map(([label, href]) => <Link key={label} className={active === label ? "active" : ""} href={href}>{label}</Link>)}</nav><a className="btn btn-whatsapp header-cta" href="https://wa.me/14165550148" target="_blank" rel="noreferrer">◉ Fale no WhatsApp</a><details className="mobile-menu"><summary aria-label="Abrir menu">☰</summary><div>{nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}<a href="https://wa.me/14165550148">WhatsApp</a></div></details></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer" id="contato"><div className="container footer-grid"><div><Logo /><p>Acompanhamento humano e seguro para encontrar seu lugar em Toronto.</p><div className="socials"><span>in</span><span>f</span><span>◎</span></div></div><div><h3>Encontre seu imóvel</h3><Link href="/imoveis?purpose=Compra">Comprar</Link><Link href="/imoveis?purpose=Aluguel">Alugar</Link><Link href="/imoveis">Lançamentos</Link><Link href="/imoveis">Imóveis em destaque</Link></div><div><h3>Imobiliária da Lucia</h3><a href="/#sobre">Sobre nós</a><a href="/#contato">Fale conosco</a><Link href="/admin">Área administrativa</Link><a href="/politica-de-privacidade">Privacidade</a></div><div><h3>Atendimento</h3><p>27 Front Street East<br/>Toronto, ON M5E 1B4</p><a href="tel:+14165550148">+1 (416) 555-0148</a><a href="mailto:contato@imobiliariadalucia.ca">contato@imobiliariadalucia.ca</a></div></div><div className="container footer-bottom"><span>© 2026 Imobiliária da Lucia. Todos os direitos reservados.</span><span>RECO #LU-2026</span></div></footer>;
}
