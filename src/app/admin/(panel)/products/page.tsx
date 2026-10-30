import Link from "next/link";
import { api } from "@/lib/api";
import { deleteProduct, toggleProduct } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function Products() {
  const list = await api.products.getAll();

  return (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-sand">
        <div>
          <h1 className="font-display text-3xl text-forest">Products</h1>
          <p className="text-sm text-soil mt-1">Manage all crop seed varieties and publishing status.</p>
        </div>
        <Link href="/admin/products/new" className="bg-forest text-paper px-4 py-2 hover:bg-olive transition-colors">
          Add product
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-soil">No products yet. Add your first product.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {list.map((p) => (
            <li key={p.id} className="bg-white border border-sand p-4 flex flex-wrap items-center gap-3 justify-between">
              <div>
                <p className="font-medium text-forest">{p.name}</p>
                <p className="text-sm text-soil">
                  {p.category?.name ?? "Uncategorised"} • {p.published ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex gap-4 text-sm items-center">
                <Link href={`/admin/products/${p.id}`} className="underline text-soil hover:text-forest">
                  Edit
                </Link>
                <form action={toggleProduct.bind(null, p.id, !p.published)}>
                  <button className="underline text-soil hover:text-forest">
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteProduct.bind(null, p.id)}>
                  <button className="underline text-red-800">Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

