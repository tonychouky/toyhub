import { CartItem, Product, Promotion, PromotionStatus } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Promotions service — thin fetch wrapper over app/api/promotions/*. The
// actual status/matching/discount-calculation logic lives server-side in
// src/lib/server/promotions.ts (reused by every route that needs it) so it
// only runs where it can trust the data (never re-derived from
// client-supplied prices).
// -----------------------------------------------------------------------

export function getPromotionStatus(promo: Promotion, now: Date = new Date()): PromotionStatus {
  if (!promo.active) return "expired";
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);
  if (now < start) return "scheduled";
  if (now > end) return "expired";
  return "active";
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path), { cache: "no-store" });
  return res.json();
}

export async function getActivePromotions(): Promise<Promotion[]> {
  return getJson(`/api/promotions?mode=active`);
}

export async function getUpcomingPromotions(): Promise<Promotion[]> {
  return getJson(`/api/promotions?mode=upcoming`);
}

export async function getExpiringSoonPromotions(days = 3): Promise<Promotion[]> {
  return getJson(`/api/promotions?mode=expiringSoon&days=${days}`);
}

export async function getPromotionById(id: string): Promise<Promotion | null> {
  return getJson(`/api/promotions/${id}`);
}

export async function getAllPromotionsForAdmin(): Promise<(Promotion & { status: PromotionStatus })[]> {
  return getJson(`/api/promotions?mode=admin`);
}

export interface CouponResult {
  valid: boolean;
  promotion?: Promotion;
  reason?: string;
}

export async function validateCoupon(code: string): Promise<CouponResult> {
  const res = await fetch(apiUrl("/api/promotions/validate-coupon"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return res.json();
}

export interface CartLineLike {
  item: CartItem;
  product: Product;
}

export interface DiscountResult {
  amount: number;
  freeShipping: boolean;
  freeGiftWrapping: boolean;
  appliedPromotions: Promotion[];
}

export async function calculateDiscount(lines: CartLineLike[], couponCode?: string): Promise<DiscountResult> {
  const res = await fetch(apiUrl("/api/promotions/calculate-discount"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lines, couponCode }),
  });
  return res.json();
}

export async function recordPromotionUsage(ids: string[]): Promise<void> {
  await fetch(apiUrl("/api/promotions/record-usage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

// ------------------------------- Admin CRUD -------------------------------

export type AdminPromotionInput = Omit<Promotion, "id">;

export async function adminCreatePromotion(input: AdminPromotionInput): Promise<Promotion> {
  const res = await fetch(apiUrl("/api/promotions"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function adminUpdatePromotion(id: string, patch: Partial<Promotion>): Promise<Promotion | null> {
  const res = await fetch(apiUrl(`/api/promotions/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function adminDeletePromotion(id: string): Promise<void> {
  await fetch(apiUrl(`/api/promotions/${id}`), { method: "DELETE" });
}
