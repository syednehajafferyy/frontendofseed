"use client";
import { useFormState } from "react-dom";
import { saveProduct } from "@/app/actions/admin";
type P = { id: string; name: string; description: string; published: boolean; categoryId?: string | null; image?: string | null };
export default function ProductForm({ product, categories }: { product?: P; categories: { id: string; name: string }[] }) {
  const [s, action] = useFormState(saveProduct.bind(null, product?.id ?? "new"), {} as { error?: string });
  const i = "mt-1 w-full border border-sand bg-white px-3 py-2";
  return (<form action={action} className="grid gap-4 max-w-xl">
    <label>Product name<input name="name" required defaultValue={product?.name} className={i} /></label>
    <label>Category<select name="categoryId" defaultValue={product?.categoryId ?? ""} className={i}><option value="">Uncategorised</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label>Description<textarea name="description" required rows={6} defaultValue={product?.description} className={i} /></label>
    <label>Image{product?.image && <img src={product.image} alt="" className="h-24 my-2" />}<input name="file" type="file" accept="image/*" className={i} /></label>
    <label className="flex gap-2 items-center"><input name="published" type="checkbox" defaultChecked={product?.published} />Published</label>
    {s.error && <p role="alert" className="text-red-800">{s.error}</p>}<button className="bg-forest text-paper py-3">Save product</button></form>);
}
