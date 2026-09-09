import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopPageClient } from "@/app/shop/ShopPageClient";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Shop All Toys",
  description: "Browse ToyHub's full catalog of toys with filters for category, brand, age, price, and rating.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><ProductGridSkeleton /></div>}>
      <ShopPageClient />
    </Suspense>
  );
}
