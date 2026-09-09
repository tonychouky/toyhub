"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Generic hook for state persisted to LocalStorage, synced across tabs.
 * Used as the storage primitive for cart/wishlist. Swapping to a
 * server-persisted cart later means replacing this hook's internals in
 * useCart/useWishlist only — component call sites stay the same.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw) as T);
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage may be full or unavailable; fail silently
    }
  }, [key, state, hydrated]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === key && e.newValue) {
        try {
          setState(JSON.parse(e.newValue) as T);
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const update = useCallback((updater: T | ((prev: T) => T)) => {
    setState((prev) => (typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater));
  }, []);

  return { value: state, setValue: update, hydrated };
}
