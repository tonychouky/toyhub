import { Product, ProductFilters, CategorySlug } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Product service: the ONLY place the rest of the app talks to for product
// data. Every function fetches app/api/products/* (backed by SQL Server via
// Prisma) — see that route for the actual query/filter/sort logic.
// -----------------------------------------------------------------------

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path), { cache: "no-store" });
  return res.json();
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const sp = new URLSearchParams();
  if (filters) {
    sp.set("hasFilters", "1");
    filters.categories?.forEach((c) => sp.append("categories", c));
    filters.brands?.forEach((b) => sp.append("brandsFilter", b));
    filters.ageRanges?.forEach((a) => sp.append("ageRanges", a));
    if (typeof filters.minPrice === "number") sp.set("minPrice", String(filters.minPrice));
    if (typeof filters.maxPrice === "number") sp.set("maxPrice", String(filters.maxPrice));
    if (typeof filters.minRating === "number") sp.set("minRating", String(filters.minRating));
    if (filters.inStockOnly) sp.set("inStockOnly", "1");
    if (filters.query) sp.set("query", filters.query);
    sp.set("sort", filters.sort ?? "relevance");
  }
  return getJson(`/api/products?${sp.toString()}`);
}

export async function getProductById(id: string): Promise<Product | null> {
  return getJson(`/api/products/${id}`);
}

export async function getProductByBarcode(barcode: string): Promise<Product | null> {
  return getJson(`/api/products?barcode=${encodeURIComponent(barcode.trim())}`);
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  return getJson(`/api/products?query=${encodeURIComponent(query)}`);
}

export async function getSearchSuggestions(query: string, limit = 6): Promise<Product[]> {
  if (!query.trim()) return [];
  return getJson(`/api/products?query=${encodeURIComponent(query)}&suggest=1&limit=${limit}`);
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  return getJson(`/api/products?mode=byCategory&category=${category}`);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getJson(`/api/products?mode=featured&limit=${limit}`);
}

export async function getBestSellers(limit = 10): Promise<Product[]> {
  return getJson(`/api/products?mode=bestSellers&limit=${limit}`);
}

export async function getDeals(limit = 8): Promise<Product[]> {
  return getJson(`/api/products?mode=deals&limit=${limit}`);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return getJson(`/api/products?relatedTo=${product.id}&limit=${limit}`);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  return getJson(`/api/products?ids=${ids.map(encodeURIComponent).join(",")}`);
}

export async function getAllBrands(): Promise<string[]> {
  return getJson(`/api/products?brands=1`);
}

// ------------------------- Admin CRUD -------------------------

export type AdminProductInput = Omit<
  Product,
  "id" | "sku" | "slug" | "createdAt" | "rating" | "reviewCount"
> & { rating?: number; reviewCount?: number };

export async function adminCreateProduct(input: AdminProductInput): Promise<Product> {
  const res = await fetch(apiUrl("/api/products"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function adminUpdateProduct(id: string, patch: Partial<Product>): Promise<Product | null> {
  const res = await fetch(apiUrl(`/api/products/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function adminDeleteProduct(id: string): Promise<void> {
  await fetch(apiUrl(`/api/products/${id}`), { method: "DELETE" });
}

export async function adminUpdateStock(id: string, stock: number): Promise<Product | null> {
  return adminUpdateProduct(id, { stock });
}
