"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { ProductCarousel } from "@/components/products/ProductCarousel";

export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const { products } = useRecentlyViewed(currentProductId);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Your history" title="Recently Viewed" />
      <div className="mt-8">
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
