"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift, Pencil, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";
import { FREE_SHIPPING_THRESHOLD } from "@/services/cart";
import { GiftOptions } from "@/components/gift/GiftOptions";
import { GiftOrderSummary } from "@/components/gift/GiftOrderSummary";
import { CouponInput } from "@/components/promotions/CouponInput";
import { calculateGiftOrder, GiftOrderResult } from "@/services/gifts";

const PLACEHOLDER_BUYER_ADDRESS = { line1: "", city: "", country: "" };

export default function CartPage() {
  const { lines, totals, hydrated, loading, increment, decrement, removeFromCart, setGiftOptions, clear } = useCart();
  const { value: couponCode, setValue: setCouponCode } = useLocalStorageState<string | null>("toyhub_coupon", null);
  const [giftOrder, setGiftOrder] = useState<GiftOrderResult | null>(null);
  const [editingLineId, setEditingLineId] = useState<string | null>(null);

  useEffect(() => {
    calculateGiftOrder(lines, couponCode ?? undefined).then(setGiftOrder);
  }, [lines, couponCode]);

  const giftFeesTotal = giftOrder?.giftFeesTotal ?? 0;
  const promoDiscount = giftOrder?.discount.amount ?? 0;
  const shipmentGroups = giftOrder?.shipmentGroups ?? [];
  const multiShipment = shipmentGroups.length > 1;
  const shipping = !giftOrder
    ? totals.shipping
    : giftOrder.discount.freeShipping
      ? 0
      : shipmentGroups.reduce((sum, g) => sum + g.shippingCost, 0);
  const grandTotal = Math.max(0, +(totals.total - totals.shipping + shipping + giftFeesTotal - promoDiscount).toFixed(2));

  if (!hydrated || loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductGridSkeleton count={3} />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added any toys yet. Let's fix that."
          action={
            <Link href="/shop">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Your Cart <span className="text-gray-400">({totals.itemCount})</span>
        </h1>
        <button onClick={clear} className="text-sm font-semibold text-gray-500 hover:text-red-500">
          Clear cart
        </button>
      </div>

      {remainingForFreeShipping > 0 && !giftOrder?.discount.freeShipping && !multiShipment && (
        <div className="mb-6 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
          Add {formatPrice(remainingForFreeShipping)} more to unlock <strong>free shipping</strong>! 🎉
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white">
          {lines.map(({ item, product }) => {
            const hasGift = !!item.giftOptions?.wrapped;
            const isEditing = editingLineId === item.id;
            return (
              <li key={item.id} className="flex flex-col gap-4 p-4 sm:p-5">
                <div className="flex gap-4">
                  <Link href={`/product/${product.id}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 sm:h-28 sm:w-28">
                    <Image src={product.images[0]} alt={product.name} fill sizes="112px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase text-brand-500">{product.brand}</p>
                        <Link href={`/product/${product.id}`} className="font-display text-sm font-bold text-gray-900 hover:underline sm:text-base">
                          {product.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex items-center rounded-full border-2 border-gray-200">
                        <button
                          onClick={() => decrement(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-gray-900"
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30"
                          aria-label={`Increase quantity of ${product.name}`}
                          disabled={item.quantity >= product.stock}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-extrabold text-gray-900 sm:text-base">
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <GiftOptions
                    productImage={product.images[0]}
                    productName={product.name}
                    value={item.giftOptions}
                    onChange={(options) => setGiftOptions(item.id, options)}
                  />
                ) : hasGift ? (
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-3.5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-brand-800">
                      {item.giftOptions?.sendAsGift && item.giftOptions.recipient && (
                        <span className="flex items-center gap-1">🎁 Gift for {item.giftOptions.recipient.fullName}</span>
                      )}
                      {item.giftOptions?.wrappingId && <span className="flex items-center gap-1">🎁 Gift wrapping</span>}
                      {item.giftOptions?.cardId && <span className="flex items-center gap-1">💌 Gift card</span>}
                      {item.giftOptions?.message && <span className="flex items-center gap-1">✏️ Personalized message</span>}
                      {item.giftOptions?.isSurprise && <span className="flex items-center gap-1">🤫 Surprise</span>}
                    </div>
                    <div className="mt-2 flex gap-4">
                      <button
                        onClick={() => setEditingLineId(item.id)}
                        className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                      >
                        <Pencil className="h-3 w-3" /> Edit Gift
                      </button>
                      <button
                        onClick={() => setGiftOptions(item.id, undefined)}
                        className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" /> Remove Gift Options
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingLineId(item.id)}
                    className="flex w-fit items-center gap-1.5 rounded-full border-2 border-dashed border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:border-brand-300 hover:text-brand-600"
                  >
                    <Gift className="h-3.5 w-3.5" /> Add Gift Options
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-gray-900">Order Summary</h2>

          <div className="mt-4">
            <CouponInput
              appliedCode={couponCode}
              onApplied={(result) => setCouponCode(result.code)}
              onRemove={() => setCouponCode(null)}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            {totals.discount > 0 && <Row label="Discount" value={`-${formatPrice(totals.discount)}`} highlight="text-leaf-600" />}
            {giftFeesTotal > 0 && <Row label="Gift wrapping & cards" value={formatPrice(giftFeesTotal)} />}
            {promoDiscount > 0 && <Row label="Promotion" value={`-${formatPrice(promoDiscount)}`} highlight="text-leaf-600" />}
            {!multiShipment && (
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} highlight={shipping === 0 ? "text-leaf-600" : undefined} />
            )}
            {totals.tax > 0 && <Row label="Tax" value={formatPrice(totals.tax)} />}
            <hr className="my-2 border-gray-100" />
            <Row label="Total" value={formatPrice(grandTotal)} bold />
          </div>

          {multiShipment && (
            <div className="mt-4">
              <GiftOrderSummary shipmentGroups={shipmentGroups} lines={lines} buyerAddress={PLACEHOLDER_BUYER_ADDRESS} />
            </div>
          )}

          <Link href="/checkout">
            <Button className="mt-6 w-full" size="lg">
              Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-xs font-semibold text-gray-500 hover:text-gray-700">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: string }) {
  return (
    <div className={`flex justify-between ${bold ? "font-display text-base font-extrabold text-gray-900" : "text-gray-600"}`}>
      <span>{label}</span>
      <span className={highlight}>{value}</span>
    </div>
  );
}
