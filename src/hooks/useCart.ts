"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as cartService from "@/services/cart";
import { getProductsByIds } from "@/services/products";
import { CART_UPDATED_EVENT, notifyCartUpdated } from "@/lib/events";
import { CartItem, GiftOptions, Product } from "@/types";

/**
 * Full cart state + actions, backed by app/api/cart/* (SQL Server via
 * Prisma). Multiple components (Header, the Cart page, checkout) each call
 * this independently; a same-page CustomEvent keeps them in sync after any
 * mutation without needing a shared context.
 *
 * If a component only needs to *trigger* an add-to-cart (e.g. a product grid
 * card) without reading cart contents, use useQuickAddToCart instead — this
 * hook eagerly fetches the whole cart plus every line's full product detail,
 * which is wasteful to mount once per grid item.
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    const result = await cartService.getCart();
    setItems(result);
    setHydrated(true);
  }, []);

  useEffect(() => {
    refetch();
    window.addEventListener(CART_UPDATED_EVENT, refetch);
    return () => window.removeEventListener(CART_UPDATED_EVENT, refetch);
  }, [refetch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsByIds(items.map((i) => i.productId)).then((result) => {
      if (!cancelled) {
        setProducts(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const totals = useMemo(() => cartService.calculateTotals(items, products), [items, products]);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter((l): l is { item: CartItem; product: Product } => l !== null),
    [items, products]
  );

  function notify(nextItems: CartItem[]) {
    setItems(nextItems);
    notifyCartUpdated();
  }

  async function addToCart(productId: string, quantity = 1) {
    notify(await cartService.addToCart(productId, quantity));
  }

  async function addGiftItem(productId: string, quantity: number, giftOptions: GiftOptions) {
    notify(await cartService.addGiftCartItem(productId, quantity, giftOptions));
  }

  async function increment(lineId: string) {
    const current = items.find((i) => i.id === lineId);
    notify(await cartService.updateCartLine(lineId, { quantity: (current?.quantity ?? 0) + 1 }));
  }

  async function decrement(lineId: string) {
    const current = items.find((i) => i.id === lineId);
    notify(await cartService.updateCartLine(lineId, { quantity: (current?.quantity ?? 1) - 1 }));
  }

  async function setQuantity(lineId: string, quantity: number) {
    notify(await cartService.updateCartLine(lineId, { quantity }));
  }

  async function removeFromCart(lineId: string) {
    notify(await cartService.removeCartLine(lineId));
  }

  async function setGiftOptions(lineId: string, giftOptions: GiftOptions | undefined) {
    notify(await cartService.updateCartLine(lineId, { giftOptions }));
  }

  async function clear() {
    notify(await cartService.clearCart());
  }

  return {
    items,
    lines,
    totals,
    hydrated,
    loading,
    addToCart,
    addGiftItem,
    increment,
    decrement,
    setQuantity,
    removeFromCart,
    setGiftOptions,
    clear,
  };
}

/** Fire-and-forget add-to-cart for components (e.g. product grid cards) that don't need to read cart state. */
export function useQuickAddToCart() {
  return useCallback(async (productId: string, quantity = 1) => {
    await cartService.addToCart(productId, quantity);
    notifyCartUpdated();
  }, []);
}
