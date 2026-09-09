// Same-page pub/sub for cart/wishlist mutations. Multiple components each
// call useCart()/useWishlist() independently (Header, product cards,
// checkout, ...); dispatching these after a mutation lets every mounted
// instance resync without a shared context/store.
export const CART_UPDATED_EVENT = "toyhub:cart-updated";
export const WISHLIST_UPDATED_EVENT = "toyhub:wishlist-updated";

export function notifyCartUpdated(): void {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function notifyWishlistUpdated(): void {
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}
