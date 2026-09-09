import { Occasion } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Occasions service — backed by app/api/occasions (SQL Server via Prisma).
// -----------------------------------------------------------------------

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path), { cache: "no-store" });
  return res.json();
}

export async function getOccasions(activeOnly = true): Promise<Occasion[]> {
  return getJson(`/api/occasions?activeOnly=${activeOnly ? "1" : "0"}`);
}

export async function getOccasionBySlug(slug: string): Promise<Occasion | null> {
  return getJson(`/api/occasions?slug=${encodeURIComponent(slug)}`);
}

export async function getOccasionById(id: string): Promise<Occasion | null> {
  return getJson(`/api/occasions/${id}`);
}

export async function getFeaturedOccasions(limit = 6): Promise<Occasion[]> {
  return getJson(`/api/occasions?activeOnly=1&limit=${limit}`);
}

export type AdminOccasionInput = Omit<Occasion, "id" | "slug" | "createdAt"> & { slug?: string };

export async function adminCreateOccasion(input: AdminOccasionInput): Promise<Occasion> {
  const res = await fetch(apiUrl("/api/occasions"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function adminUpdateOccasion(id: string, patch: Partial<Occasion>): Promise<Occasion | null> {
  const res = await fetch(apiUrl(`/api/occasions/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function adminDeleteOccasion(id: string): Promise<void> {
  await fetch(apiUrl(`/api/occasions/${id}`), { method: "DELETE" });
}
