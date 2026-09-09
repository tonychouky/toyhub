"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { getSearchSuggestions } from "@/services/products";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function SearchBar({ onNavigate, autoFocus }: { onNavigate?: () => void; autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      getSearchSuggestions(query).then((results) => {
        setSuggestions(results);
        setLoading(false);
      });
    }, 150);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="site-search"
            type="search"
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search toys, brands, categories..."
            className="w-full rounded-full border-2 border-gray-200 bg-gray-50 py-2.5 pl-11 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card-hover">
          {loading ? (
            <div className="flex items-center gap-2 px-4 py-4 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-100">
                <button
                  onClick={handleSubmit}
                  className="block w-full px-4 py-3 text-center text-sm font-semibold text-brand-600 hover:bg-brand-50"
                >
                  See all results for &ldquo;{query}&rdquo;
                </button>
              </li>
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-gray-500">No matches yet — try a different search.</p>
          )}
        </div>
      )}
    </div>
  );
}
