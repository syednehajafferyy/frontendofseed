export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string | null;
  published: boolean;
  categoryId?: string | null;
  category?: Category | null;
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "PENDING" | "READ" | "RESOLVED";
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  totalInquiries: number;
  pendingInquiries: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL || "";

// In-memory mock store for initial presentation & fallback when backend is offline
let mockCategories: Category[] = [
  { id: "cat-1", name: "Cereals", slug: "cereals", description: "Cereal grain seeds for high yield farming" },
  { id: "cat-2", name: "Fibre Crops", slug: "fibre-crops", description: "High-grade fibre crop seeds" },
];

let mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Wheat Seed",
    slug: "wheat-seed",
    description: "Seed for wheat growers, bred, processed and handled with care before it reaches the field.",
    image: null,
    published: true,
    categoryId: "cat-1",
    category: mockCategories[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Rice Seed",
    slug: "rice-seed",
    description: "Rice seed prepared for dependable germination, supplied to dealers and farmers across the region.",
    image: null,
    published: true,
    categoryId: "cat-1",
    category: mockCategories[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Maize Seed",
    slug: "maize-seed",
    description: "Maize seed cleaned and sorted so every lot is uniform and ready to sow.",
    image: null,
    published: true,
    categoryId: "cat-1",
    category: mockCategories[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Cotton Seed",
    slug: "cotton-seed",
    description: "Cotton seed for growers, handled carefully from processing through distribution.",
    image: null,
    published: true,
    categoryId: "cat-2",
    category: mockCategories[1],
    createdAt: new Date().toISOString(),
  },
];

let mockInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Muhammad Usman",
    email: "usman@example.com",
    phone: "+92 300 1234567",
    subject: "Wheat Seed bulk order",
    message: "Looking to procure wheat seeds for the upcoming sowing season. Please provide pricing per 50kg bag.",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
];

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  if (!API_BASE_URL) return null;
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const api = {
  auth: {
    async login(email: string, password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
      const remote = await apiFetch<{ ok: boolean; token?: string; error?: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (remote) return remote;

      // Local fallback for development testing
      if (email.toLowerCase().includes("admin") || password.length >= 6) {
        return { ok: true, token: "mock-jwt-token-zsc-" + Date.now() };
      }
      return { ok: false, error: "Invalid email or password." };
    },
    async logout(): Promise<void> {
      await apiFetch("/api/auth/logout", { method: "POST" });
    },
  },

  products: {
    async getAll(categorySlug?: string): Promise<Product[]> {
      const query = categorySlug ? `?category=${encodeURIComponent(categorySlug)}` : "";
      const remote = await apiFetch<Product[]>(`/api/products${query}`);
      if (remote) return remote;

      if (!categorySlug) return mockProducts;
      return mockProducts.filter((p) => p.category?.slug === categorySlug || p.categoryId === categorySlug);
    },

    async getBySlug(slug: string): Promise<Product | null> {
      const remote = await apiFetch<Product>(`/api/products/${slug}`);
      if (remote) return remote;
      return mockProducts.find((p) => p.slug === slug) ?? null;
    },

    async getById(id: string): Promise<Product | null> {
      const remote = await apiFetch<Product>(`/api/admin/products/${id}`);
      if (remote) return remote;
      return mockProducts.find((p) => p.id === id) ?? null;
    },

    async create(data: { name: string; description: string; image?: string | null; published: boolean; categoryId?: string | null }): Promise<Product> {
      const remote = await apiFetch<Product>("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (remote) return remote;

      const category = mockCategories.find((c) => c.id === data.categoryId) ?? null;
      const slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      const newProduct: Product = {
        id: "prod-" + Date.now(),
        ...data,
        slug: `${slug}-${Date.now().toString(36)}`,
        category,
        createdAt: new Date().toISOString(),
      };
      mockProducts.unshift(newProduct);
      return newProduct;
    },

    async update(id: string, data: Partial<Product>): Promise<Product | null> {
      const remote = await apiFetch<Product>(`/api/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (remote) return remote;

      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      const category = data.categoryId ? mockCategories.find((c) => c.id === data.categoryId) ?? null : mockProducts[idx].category;
      mockProducts[idx] = { ...mockProducts[idx], ...data, category };
      return mockProducts[idx];
    },

    async delete(id: string): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>(`/api/admin/products/${id}`, { method: "DELETE" });
      if (remote) return remote.ok;
      mockProducts = mockProducts.filter((p) => p.id !== id);
      return true;
    },

    async togglePublished(id: string, published: boolean): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>(`/api/admin/products/${id}/publish`, {
        method: "PATCH",
        body: JSON.stringify({ published }),
      });
      if (remote) return remote.ok;
      const p = mockProducts.find((p) => p.id === id);
      if (p) p.published = published;
      return true;
    },
  },

  categories: {
    async getAll(): Promise<Category[]> {
      const remote = await apiFetch<Category[]>("/api/categories");
      if (remote) return remote;
      return mockCategories;
    },

    async create(data: { name: string; description?: string | null }): Promise<Category> {
      const remote = await apiFetch<Category>("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (remote) return remote;

      const slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      const newCat: Category = {
        id: "cat-" + Date.now(),
        name: data.name,
        slug,
        description: data.description,
      };
      mockCategories.push(newCat);
      return newCat;
    },

    async update(id: string, data: { name: string; description?: string | null }): Promise<Category | null> {
      const remote = await apiFetch<Category>(`/api/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (remote) return remote;

      const idx = mockCategories.findIndex((c) => c.id === id);
      if (idx === -1) return null;
      mockCategories[idx] = { ...mockCategories[idx], ...data, slug: data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") };
      return mockCategories[idx];
    },

    async delete(id: string): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (remote) return remote.ok;
      mockCategories = mockCategories.filter((c) => c.id !== id);
      return true;
    },
  },

  inquiries: {
    async submit(data: { name: string; email: string; phone: string; subject: string; message: string }): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (remote) return remote.ok;

      mockInquiries.unshift({
        id: "inq-" + Date.now(),
        ...data,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      });
      return true;
    },

    async getAll(): Promise<Inquiry[]> {
      const remote = await apiFetch<Inquiry[]>("/api/admin/inquiries");
      if (remote) return remote;
      return mockInquiries;
    },

    async setStatus(id: string, status: "PENDING" | "READ" | "RESOLVED"): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (remote) return remote.ok;

      const inq = mockInquiries.find((q) => q.id === id);
      if (inq) inq.status = status;
      return true;
    },

    async delete(id: string): Promise<boolean> {
      const remote = await apiFetch<{ ok: boolean }>(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (remote) return remote.ok;
      mockInquiries = mockInquiries.filter((q) => q.id !== id);
      return true;
    },
  },

  dashboard: {
    async getStats(): Promise<DashboardStats> {
      const remote = await apiFetch<DashboardStats>("/api/admin/dashboard");
      if (remote) return remote;

      return {
        totalProducts: mockProducts.length,
        publishedProducts: mockProducts.filter((p) => p.published).length,
        totalInquiries: mockInquiries.length,
        pendingInquiries: mockInquiries.filter((q) => q.status === "PENDING").length,
      };
    },
  },
};

