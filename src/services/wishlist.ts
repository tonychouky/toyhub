import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Wishlist service — thin fetch wrapper over app/api/wishlist/*. Ownership
// (logged-in user vs anonymous visitor) resolved server-side from cookies.
// -----------------------------------------------------------------------

export async function getWishlistIds(): Promise<string[]> {
  const res = await fetch(apiUrl("/api/wishlist"), { cache: "no-store" });
  return res.json();
}

export async function addToWishlist(productId: string): Promise<string[]> {
  const res = await fetch(apiUrl("/api/wishlist"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishlist(productId: string): Promise<string[]> {
  const res = await fetch(apiUrl(`/api/wishlist/${productId}`), { method: "DELETE" });
  return res.json();
}
