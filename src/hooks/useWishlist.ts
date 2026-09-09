"use client";

import { useCallback, useEffect, useState } from "react";
import * as wishlistService from "@/services/wishlist";
import { getProductsByIds } from "@/services/products";
import { WISHLIST_UPDATED_EVENT, notifyWishlistUpdated } from "@/lib/events";
import { Product } from "@/types";

/**
 * Full wishlist state, backed by app/api/wishlist/* (SQL Server via Prisma).
 * Fetches ids AND every item's full product detail — for components that
 * only need to check/toggle membership (e.g. a product grid card's heart
 * icon), use useWishlistToggle instead.
 */
export function useWishlist() {
  const { ids, hydrated, isWishlisted, toggleWishlist, addToWishlist, removeFromWishlist } = useWishlistToggle();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsByIds(ids).then((result) => {
      if (!cancelled) {
        setProducts(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return { ids, products, loading, hydrated, isWishlisted, toggleWishlist, addToWishlist, removeFromWishlist };
}

/** Lightweight: just the id list + toggle, no per-item product detail fetch. */
export function useWishlistToggle() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refetch = useCallback(async () => {
    const result = await wishlistService.getWishlistIds();
    setIds(result);
    setHydrated(true);
  }, []);

  useEffect(() => {
    refetch();
    window.addEventListener(WISHLIST_UPDATED_EVENT, refetch);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, refetch);
  }, [refetch]);

  function isWishlisted(productId: string) {
    return ids.includes(productId);
  }

  function notify(nextIds: string[]) {
    setIds(nextIds);
    notifyWishlistUpdated();
  }

  async function toggleWishlist(productId: string) {
    if (ids.includes(productId)) {
      notify(await wishlistService.removeFromWishlist(productId));
    } else {
      notify(await wishlistService.addToWishlist(productId));
    }
  }

  async function addToWishlist(productId: string) {
    if (!ids.includes(productId)) notify(await wishlistService.addToWishlist(productId));
  }

  async function removeFromWishlist(productId: string) {
    notify(await wishlistService.removeFromWishlist(productId));
  }

  return { ids, hydrated, isWishlisted, toggleWishlist, addToWishlist, removeFromWishlist };
}
