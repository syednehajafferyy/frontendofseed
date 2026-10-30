"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { getAdminId } from "@/lib/auth";

async function guard() {
  if (!(await getAdminId())) {
    redirect("/admin/login");
  }
}

const bust = () => {
  for (const p of ["/admin/dashboard", "/admin/products", "/admin/categories", "/admin/inquiries", "/seeds"]) {
    revalidatePath(p);
  }
};

const prodSchema = z.object({
  name: z.string().trim().min(2, "Product name is required").max(120),
  description: z.string().trim().min(5, "Description is required").max(5000),
  categoryId: z.string().optional(),
});

export async function saveProduct(id: string, _: { error?: string }, fd: FormData) {
  await guard();
  const raw = {
    name: fd.get("name"),
    description: fd.get("description"),
    categoryId: fd.get("categoryId") || undefined,
  };
  const p = prodSchema.safeParse(raw);
  if (!p.success) {
    return { error: "Name and description are required." };
  }

  const published = fd.get("published") === "on";
  try {
    if (id === "new") {
      await api.products.create({
        name: p.data.name,
        description: p.data.description,
        categoryId: p.data.categoryId || null,
        published,
      });
    } else {
      await api.products.update(id, {
        name: p.data.name,
        description: p.data.description,
        categoryId: p.data.categoryId || null,
        published,
      });
    }
  } catch {
    return { error: "Could not save the product." };
  }

  bust();
  redirect("/admin/products");
}

export async function toggleProduct(id: string, published: boolean) {
  await guard();
  await api.products.togglePublished(id, published);
  bust();
}

export async function deleteProduct(id: string) {
  await guard();
  await api.products.delete(id);
  bust();
}

export async function saveCategory(fd: FormData) {
  await guard();
  const name = String(fd.get("name") ?? "").trim();
  if (name.length < 2) return;
  const description = String(fd.get("description") ?? "").trim() || null;
  const id = String(fd.get("id") ?? "");

  if (id) {
    await api.categories.update(id, { name, description });
  } else {
    await api.categories.create({ name, description });
  }
  bust();
}

export async function deleteCategory(id: string) {
  await guard();
  await api.categories.delete(id);
  bust();
}

export async function setInquiryStatus(id: string, status: "PENDING" | "READ" | "RESOLVED") {
  await guard();
  await api.inquiries.setStatus(id, status);
  bust();
}

export async function deleteInquiry(id: string) {
  await guard();
  await api.inquiries.delete(id);
  bust();
}

