import { GiftCard, GiftWrapping } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Gift options service — the only place the app reads/writes gift-wrapping
// paper and gift-card configuration. Backed by app/api/gift-wrappings and
// app/api/gift-cards (SQL Server via Prisma).
// -----------------------------------------------------------------------

export async function getGiftWrappingOptions(activeOnly = true): Promise<GiftWrapping[]> {
  const res = await fetch(apiUrl(`/api/gift-wrappings?activeOnly=${activeOnly ? "1" : "0"}`), { cache: "no-store" });
  return res.json();
}

export async function getGiftWrappingById(id: string): Promise<GiftWrapping | null> {
  const res = await fetch(apiUrl(`/api/gift-wrappings/${id}`), { cache: "no-store" });
  return res.json();
}

export type AdminGiftWrappingInput = Omit<GiftWrapping, "id">;

export async function adminCreateGiftWrapping(input: AdminGiftWrappingInput): Promise<GiftWrapping> {
  const res = await fetch(apiUrl("/api/gift-wrappings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function adminUpdateGiftWrapping(id: string, patch: Partial<GiftWrapping>): Promise<GiftWrapping | null> {
  const res = await fetch(apiUrl(`/api/gift-wrappings/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function adminDeleteGiftWrapping(id: string): Promise<void> {
  await fetch(apiUrl(`/api/gift-wrappings/${id}`), { method: "DELETE" });
}

// -------------------------------- Gift Cards --------------------------------

export async function getGiftCardOptions(activeOnly = true): Promise<GiftCard[]> {
  const res = await fetch(apiUrl(`/api/gift-cards?activeOnly=${activeOnly ? "1" : "0"}`), { cache: "no-store" });
  return res.json();
}

export async function getGiftCardById(id: string): Promise<GiftCard | null> {
  const res = await fetch(apiUrl(`/api/gift-cards/${id}`), { cache: "no-store" });
  return res.json();
}

export type AdminGiftCardInput = Omit<GiftCard, "id">;

export async function adminCreateGiftCard(input: AdminGiftCardInput): Promise<GiftCard> {
  const res = await fetch(apiUrl("/api/gift-cards"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function adminUpdateGiftCard(id: string, patch: Partial<GiftCard>): Promise<GiftCard | null> {
  const res = await fetch(apiUrl(`/api/gift-cards/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function adminDeleteGiftCard(id: string): Promise<void> {
  await fetch(apiUrl(`/api/gift-cards/${id}`), { method: "DELETE" });
}
