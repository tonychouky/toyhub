"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { formatPrice, AGE_RANGE_LABELS } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { useQuickAddToCart } from "@/hooks/useCart";
import { useWishlistToggle } from "@/hooks/useWishlist";
import { useToast } from "@/components/providers/ToastProvider";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const addToCart = useQuickAddToCart();
  const { isWishlisted, toggleWishlist } = useWishlistToggle();
  const { showToast } = useToast();
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addToCart(product.id, 1);
    setJustAdded(true);
    showToast(`${product.name} added to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(wishlisted ? `Removed from wishlist` : `Added to wishlist`);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {!!product.discount && <Badge variant="sale">-{product.discount}%</Badge>}
          {product.isNew && <Badge variant="new">New</Badge>}
          {outOfStock && <Badge variant="outOfStock">Out of Stock</Badge>}
        </div>

        <button
          onClick={handleToggleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4 transition-colors", wishlisted ? "fill-berry-500 text-berry-500" : "text-gray-500")} />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={cn(
            "absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold opacity-0 shadow-soft transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed",
            justAdded ? "bg-leaf-500 text-white" : "bg-gray-900 text-white hover:bg-brand-500",
            outOfStock && "bg-gray-300"
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" /> {outOfStock ? "Unavailable" : "Add to Cart"}
            </>
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-500">{product.brand}</p>
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-gray-900">{product.name}</h3>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <p className="text-xs font-medium text-gray-400">Ages {AGE_RANGE_LABELS[product.ageRange]}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-display text-lg font-extrabold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm font-medium text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
