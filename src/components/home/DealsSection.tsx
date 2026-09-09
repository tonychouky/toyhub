import Link from "next/link";
import { Product } from "@/types";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Zap } from "lucide-react";

export function DealsSection({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-4xl bg-gradient-to-br from-berry-500 to-brand-500 p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Zap className="h-3.5 w-3.5" /> Limited-time offers
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Today&apos;s Best Deals</h2>
          </div>
          <Link href="/shop?deals=1" className="text-sm font-bold text-white hover:underline">
            See all deals &rarr;
          </Link>
        </div>
        <div className="mt-8 rounded-3xl bg-white/95 p-4 sm:p-6">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
