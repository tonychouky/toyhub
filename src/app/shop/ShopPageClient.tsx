"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Product, ProductFilters, SortOption, AgeRange, CategorySlug } from "@/types";
import { getProducts, getAllBrands, getDeals } from "@/services/products";
import { Filters, SortSelect } from "@/components/products/Filters";
import { ProductGrid, ProductGridSkeleton } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isDeals = searchParams.get("deals") === "1";
  const initialAge = searchParams.get("age") as AgeRange | null;
  const initialCategory = searchParams.get("category") as CategorySlug | null;
  const initialMaxPrice = searchParams.get("maxPrice");
  const initialSort = (searchParams.get("sort") as SortOption) || "relevance";

  const [filters, setFilters] = useState<ProductFilters>({
    categories: initialCategory ? [initialCategory] : [],
    brands: [],
    ageRanges: initialAge ? [initialAge] : [],
    maxPrice: initialMaxPrice ? parseFloat(initialMaxPrice) : undefined,
    sort: initialSort,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    getAllBrands().then(setBrands);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const fetcher = isDeals ? getDeals(100) : getProducts(filters);
    fetcher.then((result) => {
      if (!cancelled) {
        setProducts(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [filters, isDeals]);

  function updateSort(sort: SortOption) {
    setFilters((prev) => ({ ...prev, sort }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {isDeals ? "Today's Deals" : "Shop All Toys"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isDeals ? "Hand-picked discounts, updated daily." : "Explore our full toy catalog."}
          </p>
        </div>
        {isDeals && (
          <Button variant="ghost" size="sm" onClick={() => router.push("/shop")}>
            <X className="mr-1 h-4 w-4" /> Clear deals filter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {!isDeals && (
          <aside className="hidden lg:block">
            <Filters filters={filters} onChange={setFilters} brands={brands} resultCount={products.length} />
          </aside>
        )}

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            {!isDeals ? (
              <Button variant="subtle" size="sm" onClick={() => setMobileFiltersOpen(true)} className="lg:hidden">
                <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filters
              </Button>
            ) : (
              <span />
            )}
            <div className="ml-auto w-48">
              <SortSelect value={filters.sort ?? "relevance"} onChange={updateSort} />
            </div>
          </div>

          {loading ? <ProductGridSkeleton /> : <ProductGrid products={products} />}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <Filters filters={filters} onChange={setFilters} brands={brands} resultCount={products.length} />
            <Button className="mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
              Show {products.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
