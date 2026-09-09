import { CartItem, CartTotals, GiftOptions, Product } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Cart service. calculateTotals is pure (no I/O) and reused by the cart
// page, checkout, and services/gifts.ts#calculateGiftOrder. Everything else
// here is a thin fetch wrapper over app/api/cart/* — ownership (logged-in
// user vs anonymous visitor) is resolved server-side from cookies, see
// src/lib/owner.ts.
// -----------------------------------------------------------------------

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), { cache: "no-store", ...init });
  return res.json();
}

export async function getCart(): Promise<CartItem[]> {
  return getJson("/api/cart");
}

export async function addToCart(productId: string, quantity: number): Promise<CartItem[]> {
  return getJson("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function addGiftCartItem(productId: string, quantity: number, giftOptions: GiftOptions): Promise<CartItem[]> {
  return getJson("/api/cart/gift", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity, giftOptions }),
  });
}

export async function updateCartLine(
  lineId: string,
  patch: { quantity?: number; giftOptions?: GiftOptions | undefined }
): Promise<CartItem[]> {
  return getJson(`/api/cart/${lineId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
}

export async function removeCartLine(lineId: string): Promise<CartItem[]> {
  return getJson(`/api/cart/${lineId}`, { method: "DELETE" });
}

export async function clearCart(): Promise<CartItem[]> {
  return getJson("/api/cart", { method: "DELETE" });
}

export const FREE_SHIPPING_THRESHOLD = 50;
export const STANDARD_SHIPPING_COST = 5.99;
export const TAX_RATE = 0.0; // Set at checkout by locale in a real integration.

export function calculateTotals(items: CartItem[], products: Product[]): CartTotals {
  let subtotal = 0;
  let discount = 0;
  let itemCount = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const lineOriginal = (product.originalPrice ?? product.price) * item.quantity;
    const lineActual = product.price * item.quantity;
    subtotal += lineOriginal;
    discount += lineOriginal - lineActual;
    itemCount += item.quantity;
  }

  const afterDiscount = subtotal - discount;
  const shipping = itemCount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const tax = +(afterDiscount * TAX_RATE).toFixed(2);
  const total = +(afterDiscount + shipping + tax).toFixed(2);

  return {
    subtotal: +subtotal.toFixed(2),
    discount: +discount.toFixed(2),
    shipping,
    tax,
    total,
    itemCount,
  };
}
