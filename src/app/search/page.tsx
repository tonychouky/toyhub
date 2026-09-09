import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPageClient } from "@/app/search/SearchPageClient";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ToyHub's toy catalog by name, brand, category, or barcode.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><ProductGridSkeleton /></div>}>
      <SearchPageClient />
    </Suspense>
  );
}
