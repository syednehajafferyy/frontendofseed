import { api } from "@/lib/api";
import { saveCategory, deleteCategory } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const list = await api.categories.getAll();
  const inputClass = "border border-sand bg-white px-3 py-2";

  return (
    <>
      <div className="pb-4 border-b border-sand">
        <h1 className="font-display text-3xl text-forest">Categories</h1>
        <p className="text-sm text-soil mt-1">Organize crop varieties into categories (e.g. Cereals, Fibre Crops).</p>
      </div>

      <form action={saveCategory} className="mt-6 flex flex-wrap gap-2">
        <input name="name" required placeholder="Category name" className={inputClass} />
        <input name="description" placeholder="Description (optional)" className={`${inputClass} flex-1 min-w-[200px]`} />
        <button className="bg-forest text-paper px-4 py-2 hover:bg-olive transition-colors">
          Add category
        </button>
      </form>

      {list.length === 0 && <p className="mt-8 text-soil">No categories yet.</p>}

      <ul className="mt-6 grid gap-3">
        {list.map((c) => (
          <li key={c.id} className="bg-white border border-sand p-3 flex flex-wrap gap-2 items-center">
            <form action={saveCategory} className="flex flex-wrap gap-2 flex-1">
              <input type="hidden" name="id" value={c.id} />
              <input name="name" defaultValue={c.name} required className={inputClass} />
              <input name="description" defaultValue={c.description ?? ""} className={`${inputClass} flex-1 min-w-[200px]`} />
              <button className="underline text-sm text-soil hover:text-forest">Save</button>
            </form>
            <form action={deleteCategory.bind(null, c.id)}>
              <button className="underline text-sm text-red-800">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}

