import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function Edit({ params }: { params: { id: string } }) {
  const categories = await api.categories.getAll();
  const product = params.id === "new" ? undefined : await api.products.getById(params.id);
  if (params.id !== "new" && !product) notFound();

  return (
    <>
      <h1 className="font-display text-3xl text-forest mb-6">
        {product ? "Edit Product" : "Add Product"}
      </h1>
      <ProductForm product={product ?? undefined} categories={categories} />
    </>
  );
}

