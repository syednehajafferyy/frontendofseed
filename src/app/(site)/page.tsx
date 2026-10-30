import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
const steps = [["Seed Breeding", "Developing and selecting crop seed for the conditions our growers farm in."], ["Seed Processing", "Cleaning and preparing seed lots for packing."], ["Quality Handling", "Careful storage and handling so seed reaches the field in good condition."], ["Distribution", "Getting seed to dealers and farmers across the region."]];
export default function Home() {
  return (<main>
    <section className="relative min-h-[85vh] flex items-end bg-forest bg-cover bg-center text-paper" style={{ backgroundImage: "linear-gradient(rgba(31,61,43,.55),rgba(31,61,43,.8)),url(/images/hero.jpg)" }}>
      <div className="hero-in px-6 md:px-16 py-16 max-w-3xl"><h1 className="font-display text-4xl md:text-6xl leading-tight">Quality seed is where every harvest begins.</h1>
        <p className="mt-6 text-lg text-sand max-w-xl">Zaheer Seed Corporation breeds, processes and distributes crop seed from Kasur.</p>
        <div className="mt-8 flex gap-4 flex-wrap"><Link href="/seeds" className="bg-paper text-forest px-6 py-3">Explore Our Seeds</Link><Link href="/#contact" className="border border-paper px-6 py-3">Contact Us</Link></div></div></section>
    <section id="about" className="px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center scroll-mt-16">
      <Reveal><div className="aspect-[4/3] bg-sand bg-cover bg-center" style={{ backgroundImage: "url(/images/about.jpg)" }} role="img" aria-label="Crop field" /></Reveal>
      <Reveal><h2 className="font-display text-3xl text-forest">About Zaheer Seed Corporation</h2>
        <p className="mt-4 leading-relaxed">Zaheer Seed Corporation is an agricultural company based in Kasur, Pakistan. Our work covers crop seed breeding, processing and distribution.</p></Reveal></section>
    <section id="process" className="bg-sand/50 px-6 md:px-16 py-20 scroll-mt-16"><h2 className="font-display text-3xl text-forest">Our Process</h2>
      <ol className="mt-10 grid md:grid-cols-4 gap-8 border-l md:border-l-0 md:border-t border-olive">{steps.map(([t, d], i) => (
        <li key={t} className="pl-6 md:pl-0 md:pt-6"><Reveal><span className="text-olive text-sm">Step {i + 1}</span><h3 className="font-display text-xl mt-1">{t}</h3><p className="mt-2 text-soil">{d}</p></Reveal></li>))}</ol></section>
    <section id="contact" className="px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 scroll-mt-16">
      <div><h2 className="font-display text-3xl text-forest">Contact</h2><p className="mt-4">Office No. 12, Shareef Plaza, Steel Bagh Chowk, Kasur.</p>
        <p className="mt-2"><a href="tel:+923006579784" className="navlink">+92 300 6579784</a></p><p className="mt-2"><a href="https://wa.me/923006579784" className="navlink">Message us on WhatsApp</a></p></div>
      <ContactForm /></section></main>);
}
