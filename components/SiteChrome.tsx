import Link from "next/link";
/* eslint-disable @next/next/no-html-link-for-pages */

export function Logo() {
  return <Link className="logo" href="/" aria-label="Imobiliária da Lucia - home"><span className="logo-mark">L</span><span><b>REAL ESTATE</b><small>DA LUCIA • TORONTO</small></span></Link>;
}

export function SiteHeader({ active = "Home" }: { active?: string }) {
  const nav = [["Home", "/"], ["Properties", "/imoveis"], ["Buy", "/imoveis?purpose=Buy"], ["Rent", "/imoveis?purpose=Rent"], ["About us", "/#sobre"], ["Contact", "/#contato"]];
  return <header className="site-header"><div className="topbar"><div className="container"><span>Service in English, Portuguese and Spanish</span><a href="tel:+14165550148">+1 (416) 555-0148</a></div></div><div className="container nav-wrap"><Logo /><nav aria-label="Main navigation">{nav.map(([label, href]) => <Link key={label} className={active === label ? "active" : ""} href={href}>{label}</Link>)}</nav><a className="btn btn-whatsapp header-cta" href="https://wa.me/14165550148" target="_blank" rel="noreferrer">◉ Chat on WhatsApp</a><details className="mobile-menu"><summary aria-label="Open menu">☰</summary><div>{nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}<a href="https://wa.me/14165550148">WhatsApp</a></div></details></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer" id="contato"><div className="container footer-grid"><div><Logo /><p>Personal, trusted guidance to help you find your place in Toronto.</p><div className="socials"><span>in</span><span>f</span><span>◎</span></div></div><div><h3>Find a property</h3><Link href="/imoveis?purpose=Buy">Buy</Link><Link href="/imoveis?purpose=Rent">Rent</Link><Link href="/imoveis">New listings</Link><Link href="/imoveis">Featured properties</Link></div><div><h3>Imobiliária da Lucia</h3><a href="/#sobre">About us</a><a href="/#contato">Contact us</a><Link href="/admin">Admin portal</Link><a href="/politica-de-privacidade">Privacy</a></div><div><h3>Contact</h3><p>27 Front Street East<br/>Toronto, ON M5E 1B4</p><a href="tel:+14165550148">+1 (416) 555-0148</a><a href="mailto:contato@imobiliariadalucia.ca">contato@imobiliariadalucia.ca</a></div></div><div className="container footer-bottom"><span>© 2026 Imobiliária da Lucia. All rights reserved.</span><span>RECO #LU-2026</span></div></footer>;
}
