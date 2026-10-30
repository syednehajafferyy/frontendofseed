import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminId } from "@/lib/auth";
import { signOut } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

export default async function Panel({ children }: { children: React.ReactNode }) {
  if (!(await getAdminId())) {
    redirect("/admin/login");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Products", href: "/admin/products" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Inquiries", href: "/admin/inquiries" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <header className="border-b border-sand bg-white px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-forest font-semibold text-lg">
            Zaheer Seed Admin
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm" aria-label="Admin">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="navlink text-soil hover:text-forest">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-xs text-soil hover:underline">
            View Live Site ↗
          </Link>
          <form action={signOut}>
            <button className="text-sm text-red-800 underline">Sign out</button>
          </form>
        </div>
      </header>
      <div className="p-4 md:p-8 max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

