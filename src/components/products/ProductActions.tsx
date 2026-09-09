"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Heart, Zap } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/providers/ToastProvider";
import { SendAsGiftButton } from "@/components/gift/SendAsGiftButton";
import { cn, clamp } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();

  const outOfStock = product.stock <= 0;
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    if (outOfStock) return;
    addToCart(product.id, quantity);
    showToast(`${quantity} × ${product.name} added to cart`);
  }

  function handleBuyNow() {
    if (outOfStock) return;
    addToCart(product.id, quantity);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Quantity</span>
        <div className="flex items-center rounded-full border-2 border-gray-200">
          <button
            onClick={() => setQuantity((q) => clamp(q - 1, 1, product.stock || 1))}
            className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-bold" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => clamp(q + 1, 1, product.stock || 1))}
            className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30"
            aria-label="Increase quantity"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={outOfStock}>
          <ShoppingCart className="h-5 w-5" /> {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button size="lg" variant="secondary" className="flex-1" onClick={handleBuyNow} disabled={outOfStock}>
          <Zap className="h-5 w-5" /> Buy Now
        </Button>
        {!outOfStock && <SendAsGiftButton product={product} quantity={quantity} />}
        <button
          onClick={() => {
            toggleWishlist(product.id);
            showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center self-center rounded-full border-2 transition-colors sm:self-auto",
            wishlisted ? "border-berry-500 bg-berry-50 text-berry-500" : "border-gray-200 text-gray-400 hover:border-berry-300 hover:text-berry-500"
          )}
        >
          <Heart className={cn("h-6 w-6", wishlisted && "fill-berry-500")} />
        </button>
      </div>
    </div>
  );
}
