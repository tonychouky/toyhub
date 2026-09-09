"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Product } from "@/types";
import { searchProducts } from "@/services/products";
import { ProductGrid, ProductGridSkeleton } from "@/components/products/ProductGrid";
import { BarcodeSearch } from "@/components/products/BarcodeSearch";
import { EmptyState } from "@/components/ui/EmptyState";

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchProducts(query).then((res) => {
      if (!cancelled) {
        setResults(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">
        {query ? (
          <>
            Results for &ldquo;{query}&rdquo;
          </>
        ) : (
          "Search ToyHub"
        )}
      </h1>
      {!loading && query && (
        <p className="mt-1 text-sm text-gray-500">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="order-2 lg:order-1">
          <BarcodeSearch />
        </aside>

        <div className="order-1 lg:order-2">
          {loading ? (
            <ProductGridSkeleton />
          ) : !query ? (
            <EmptyState
              icon={SearchX}
              title="Start typing to search"
              description="Search by product name, brand, category, or use the barcode lookup to jump straight to a product."
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={`No results for "${query}"`}
              description="Try a different keyword, check your spelling, or browse categories instead."
            />
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>
    </div>
  );
}
