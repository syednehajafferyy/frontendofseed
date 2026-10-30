import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Our Seeds" };
export const dynamic = "force-dynamic";

export default async function Seeds({ searchParams }: { searchParams: { category?: string } }) {
  const cats = await api.categories.getAll();
  const products = await api.products.getAll(searchParams.category);
  const tab = (active: boolean) =>
    `px-4 py-2 border ${active ? "bg-forest text-paper border-forest" : "border-sand hover:border-forest"} transition-colors`;

  return (
    <main className="px-6 md:px-16 py-16">
      <h1 className="font-display text-4xl text-forest">Our Seeds</h1>
      <nav aria-label="Categories" className="mt-8 flex gap-2 flex-wrap">
        <Link href="/seeds" className={tab(!searchParams.category)}>
          All
        </Link>
        {cats.map((c) => (
          <Link
            key={c.id}
            href={`/seeds?category=${c.slug}`}
            className={tab(searchParams.category === c.slug)}
          >
            {c.name}
          </Link>
        ))}
      </nav>
      {products.length === 0 ? (
        <p className="mt-12 text-soil">
          No seeds are listed here yet. Please check back soon or contact us directly.
        </p>
      ) : (
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <li key={p.id} className="group border border-sand bg-white">
              <div className="aspect-[4/3] overflow-hidden bg-sand flex items-center justify-center">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-display text-forest text-2xl opacity-40 font-semibold">
                    {p.name}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-sm text-olive">{p.category?.name ?? "Uncategorised"}</p>
                <h2 className="font-display text-xl mt-1">{p.name}</h2>
                <p className="mt-2 text-soil line-clamp-3">{p.description}</p>
                <Link href={`/seeds/${p.slug}`} className="navlink inline-block mt-4 text-forest">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
