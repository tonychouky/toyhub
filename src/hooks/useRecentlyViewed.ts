"use client";

import { useEffect, useState } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getProductsByIds } from "@/services/products";
import { Product } from "@/types";

const RECENT_KEY = "toyhub_recently_viewed";
const MAX_RECENT = 8;

export function useRecentlyViewed(currentProductId?: string) {
  const { value: ids, setValue: setIds } = useLocalStorageState<string[]>(RECENT_KEY, []);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (currentProductId) {
      setIds((prev) => [currentProductId, ...prev.filter((id) => id !== currentProductId)].slice(0, MAX_RECENT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductId]);

  useEffect(() => {
    const others = ids.filter((id) => id !== currentProductId);
    getProductsByIds(others).then(setProducts);
  }, [ids, currentProductId]);

  return { products };
}
