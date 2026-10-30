import Link from "next/link";
export default function Footer() {
  return (<footer className="bg-forest text-paper px-6 md:px-16 py-12 grid gap-8 md:grid-cols-3">
    <div><span className="inline-block bg-paper px-3 py-2"><img src="/images/logo.png" alt="Zaheer Seed Corporation" className="h-11 w-auto" /></span><p className="mt-2 text-sand text-sm">Crop seed breeding, processing and distribution.</p></div>
    <nav aria-label="Footer" className="grid gap-2 text-sm content-start"><Link href="/">Home</Link><Link href="/#about">About Us</Link><Link href="/seeds">Our Seeds</Link><Link href="/#process">Our Process</Link><Link href="/#contact">Contact</Link></nav>
    <div className="text-sm grid gap-2 content-start"><p>Office No. 12, Shareef Plaza, Steel Bagh Chowk, Kasur.</p><a href="tel:+923006579784">+92 300 6579784</a><a href="https://wa.me/923006579784">WhatsApp</a></div>
    <p className="md:col-span-3 text-xs text-sand border-t border-olive pt-4">&copy; {new Date().getFullYear()} Zaheer Seed Corporation. All rights reserved.</p></footer>);
}
