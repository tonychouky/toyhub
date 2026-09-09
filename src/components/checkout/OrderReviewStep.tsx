import Link from "next/link";
import Image from "next/image";
import { CartLine } from "@/app/checkout/checkoutTypes";
import { CustomerInfo } from "@/components/checkout/CustomerInfoStep";
import { Address, GiftCard, GiftWrapping, Promotion, ShipmentGroup } from "@/types";
import { DeliveryOption } from "@/components/checkout/DeliveryMethodStep";
import { PaymentFormData } from "@/components/checkout/PaymentStep";
import { formatPrice, formatDate } from "@/lib/utils";
import { guessCardBrand } from "@/services/payment";
import { GiftOrderSummary } from "@/components/gift/GiftOrderSummary";

export function OrderReviewStep({
  lines,
  customer,
  address,
  delivery,
  payment,
  totals,
  wrappings,
  cards,
  giftFeesTotal,
  promoDiscount,
  appliedPromotions,
  shipmentGroups,
}: {
  lines: CartLine[];
  customer: CustomerInfo;
  address: Address;
  delivery: DeliveryOption;
  payment: PaymentFormData;
  totals: { subtotal: number; discount: number; shipping: number; tax: number; total: number };
  wrappings: GiftWrapping[];
  cards: GiftCard[];
  giftFeesTotal: number;
  promoDiscount: number;
  appliedPromotions: Promotion[];
  shipmentGroups: Omit<ShipmentGroup, "status">[];
}) {
  const last4 = payment.cardNumber.replace(/\s/g, "").slice(-4);

  return (
    <div className="flex flex-col gap-6">
      <ReviewBlock title="Items">
        <ul className="flex flex-col gap-3">
          {lines.map(({ item, product }) => {
            const wrapping = wrappings.find((w) => w.id === item.giftOptions?.wrappingId);
            const card = cards.find((c) => c.id === item.giftOptions?.cardId);
            return (
              <li key={item.id} className="flex flex-col gap-2 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                    <Image src={product.images[0]} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{formatPrice(product.price * item.quantity)}</span>
                </div>
                {item.giftOptions?.wrapped && (
                  <div className="ml-[60px] flex items-start justify-between gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-600">
                    <div>
                      {item.giftOptions.sendAsGift && item.giftOptions.recipient && (
                        <p className="font-semibold text-gray-800">🎁 Gift for {item.giftOptions.recipient.fullName}</p>
                      )}
                      <p>{wrapping?.name ?? "Gift wrapped"}{card ? ` · ${card.name}` : ""}</p>
                      {item.giftOptions.message && <p className="mt-0.5 italic text-gray-500">&ldquo;{item.giftOptions.message}&rdquo;</p>}
                      {item.giftOptions.isSurprise && <p className="mt-0.5 text-gray-500">🤫 Surprise gift — prices hidden from recipient</p>}
                      {item.giftOptions.preferredDeliveryDate && (
                        <p className="mt-0.5 text-gray-500">
                          Requested delivery: {formatDate(item.giftOptions.preferredDeliveryDate)} (not guaranteed)
                        </p>
                      )}
                    </div>
                    <Link href="/cart" className="shrink-0 font-semibold text-brand-600 hover:underline">
                      Change
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </ReviewBlock>

      <ReviewBlock title="Contact">
        <p className="text-sm text-gray-600">{customer.fullName}</p>
        <p className="text-sm text-gray-600">{customer.email}</p>
        <p className="text-sm text-gray-600">{customer.phone}</p>
      </ReviewBlock>

      <ReviewBlock title="Shipping Address">
        <p className="text-sm text-gray-600">
          {address.line1}
          {address.line2 ? `, ${address.line2}` : ""}
        </p>
        <p className="text-sm text-gray-600">
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="text-sm text-gray-600">{address.country}</p>
      </ReviewBlock>

      {shipmentGroups.length > 1 && (
        <ReviewBlock title="Shipments">
          <GiftOrderSummary shipmentGroups={shipmentGroups} lines={lines} buyerAddress={address} />
        </ReviewBlock>
      )}

      <ReviewBlock title="Delivery Method">
        <p className="text-sm text-gray-600">
          {delivery.label} &middot; {delivery.price === 0 ? "Free" : formatPrice(delivery.price)}
        </p>
      </ReviewBlock>

      <ReviewBlock title="Payment">
        <p className="text-sm text-gray-600">
          {guessCardBrand(payment.cardNumber)} ending in {last4 || "----"}
        </p>
      </ReviewBlock>

      {appliedPromotions.length > 0 && (
        <ReviewBlock title="Promotions Applied">
          <ul className="flex flex-col gap-1">
            {appliedPromotions.map((p) => (
              <li key={p.id} className="text-sm text-leaf-600">
                {p.name}
              </li>
            ))}
          </ul>
        </ReviewBlock>
      )}

      <div className="rounded-2xl bg-gray-50 p-4">
        <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && <SummaryRow label="Discount" value={`-${formatPrice(totals.discount)}`} />}
        {giftFeesTotal > 0 && <SummaryRow label="Gift wrapping & cards" value={formatPrice(giftFeesTotal)} />}
        {promoDiscount > 0 && <SummaryRow label="Promotion" value={`-${formatPrice(promoDiscount)}`} />}
        <SummaryRow label="Shipping" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
        {totals.tax > 0 && <SummaryRow label="Tax" value={formatPrice(totals.tax)} />}
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-display text-base font-extrabold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">{title}</h3>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm text-gray-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
