import { Review } from "@/types";
import { apiUrl } from "@/lib/api-url";

export async function getReviewsForProduct(productId: string, limit = 8): Promise<Review[]> {
  const res = await fetch(apiUrl(`/api/products/${productId}/reviews?limit=${limit}`), { cache: "no-store" });
  return res.json();
}
