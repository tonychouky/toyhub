"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, X, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/providers/ToastProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";

export default function WishlistPage() {
  const { products, loading, hydrated, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!hydrated || loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductGridSkeleton count={3} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save toys you love here so you can find them again later."
          action={
            <Link href="/shop">
              <Button>Browse Toys</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">
        Your Wishlist <span className="text-gray-400">({products.length})</span>
      </h1>

      <ul className="flex flex-col divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white">
        {products.map((product) => (
          <li key={product.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
            <Link href={`/product/${product.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50 sm:h-24 sm:w-24">
              <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
            </Link>
            <div className="min-w-[140px] flex-1">
              <p className="text-[11px] font-bold uppercase text-brand-500">{product.brand}</p>
              <Link href={`/product/${product.id}`} className="font-display text-sm font-bold text-gray-900 hover:underline sm:text-base">
                {product.name}
              </Link>
              <p className="mt-1 font-display text-sm font-extrabold text-gray-900">{formatPrice(product.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  addToCart(product.id, 1);
                  removeFromWishlist(product.id);
                  showToast(`${product.name} moved to cart`);
                }}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-4 w-4" /> Move to Cart
              </Button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500"
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
