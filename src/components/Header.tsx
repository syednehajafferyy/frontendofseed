"use client";
import Link from "next/link";
import { useState } from "react";
const links = [["Home", "/"], ["About Us", "/#about"], ["Our Seeds", "/seeds"], ["Our Process", "/#process"], ["Contact", "/#contact"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (<header className="sticky top-0 z-30 bg-paper/95 border-b border-sand">
    <div className="flex items-center justify-between px-6 md:px-16 h-16">
      <Link href="/"><img src="/images/logo.png" alt="Zaheer Seed Corporation" className="h-11 w-auto" /></Link>
      <nav className="hidden md:flex items-center gap-8" aria-label="Main">
        {links.map(([l, h]) => <Link key={l} href={h} className="navlink text-sm">{l}</Link>)}
        <Link href="/#contact" className="border border-forest text-forest px-4 py-2 text-sm hover:bg-forest hover:text-paper transition-colors">Contact Us</Link></nav>
      <button className="md:hidden p-2" aria-expanded={open} aria-controls="m" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div>
    <nav id="m" aria-label="Mobile" className={`md:hidden grid overflow-hidden transition-all duration-300 ${open ? "max-h-96 border-t border-sand" : "max-h-0"}`}>
      {links.map(([l, h]) => <Link key={l} href={h} onClick={() => setOpen(false)} className="px-6 py-3 border-b border-sand/60">{l}</Link>)}</nav></header>);
}
