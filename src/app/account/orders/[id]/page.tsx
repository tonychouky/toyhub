"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, PartyPopper, MapPin, CreditCard, Truck } from "lucide-react";
import { AuthGuard } from "@/components/account/AuthGuard";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { getOrderById } from "@/services/orders";
import { Order } from "@/types";
import { formatDate, formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_SEQUENCE } from "@/lib/utils";

export default function OrderDetailPage() {
  return (
    <AuthGuard>
      {(user) => <OrderDetail customerId={user.id} />}
    </AuthGuard>
  );
}

function OrderDetail({ customerId }: { customerId: string }) {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get("justPlaced") === "1";
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    getOrderById(params.id).then(setOrder);
  }, [params.id]);

  if (order === undefined) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-gray-500">Loading order...</div>;
  }

  if (!order || order.customerId !== customerId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="font-display text-xl font-bold text-gray-900">Order not found</h1>
        <p className="mt-2 text-sm text-gray-500">We couldn&apos;t find that order on your account.</p>
        <Link href="/account/orders" className="mt-4 inline-block text-sm font-bold text-brand-600 hover:underline">
          Back to orders
        </Link>
      </div>
    );
  }

  const cancelled = order.status === "cancelled";
  const currentIdx = ORDER_STATUS_SEQUENCE.indexOf(order.status as (typeof ORDER_STATUS_SEQUENCE)[number]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {justPlaced && (
        <div className="mb-6 flex items-center gap-3 rounded-3xl bg-leaf-50 p-5 text-leaf-700">
          <PartyPopper className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-display font-bold">Your order is confirmed!</p>
            <p className="text-sm">Thanks for shopping with ToyHub — a confirmation has been placed on your account.</p>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Order {order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <AccountSidebar />

        <div className="flex flex-col gap-6">
          {/* Status timeline */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6">
            <h2 className="mb-5 font-display text-lg font-bold text-gray-900">Order Status</h2>
            {cancelled ? (
              <p className="text-sm font-semibold text-red-500">This order was cancelled.</p>
            ) : (
              <ol className="flex flex-col gap-0 sm:flex-row sm:items-center">
                {ORDER_STATUS_SEQUENCE.map((status, idx) => {
                  const reached = idx <= currentIdx;
                  const isLast = idx === ORDER_STATUS_SEQUENCE.length - 1;
                  return (
                    <li key={status} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                      <div className="flex items-center sm:flex-col">
                        {reached ? (
                          <CheckCircle2 className="h-6 w-6 shrink-0 text-leaf-500" />
                        ) : (
                          <Circle className="h-6 w-6 shrink-0 text-gray-300" />
                        )}
                        {!isLast && (
                          <div
                            className={`ml-3 h-8 w-0.5 sm:ml-0 sm:mt-1 sm:h-0.5 sm:w-full ${
                              idx < currentIdx ? "bg-leaf-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <p className={`text-xs font-bold sm:mt-2 ${reached ? "text-gray-900" : "text-gray-400"}`}>
                        {ORDER_STATUS_LABELS[status]}
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/* Items */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-gray-900">Items</h2>
            <ul className="flex flex-col divide-y divide-gray-100">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                    {item.giftOptions?.wrapped && (
                      <p className="mt-0.5 text-xs font-semibold text-brand-600">🎁 Gift wrapped{item.giftOptions.message ? " with a message" : ""}</p>
                    )}
                  </div>
                  <p className="font-display text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>

          {order.shipmentGroups.some((g) => g.recipient) && (
            <div className="rounded-3xl border border-gray-100 bg-white p-6">
              <h2 className="mb-4 font-display text-lg font-bold text-gray-900">Gifts in This Order</h2>
              <ul className="flex flex-col gap-3">
                {order.shipmentGroups
                  .filter((g) => g.recipient)
                  .map((g) => (
                    <li key={g.id} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Gift for {g.recipient!.fullName}</p>
                        <p className="text-xs text-gray-500">
                          {g.recipient!.address.city}, {g.recipient!.address.country}
                        </p>
                      </div>
                      <Link href={`/gift-receipt/${order.id}/${g.id}`} className="text-xs font-bold text-brand-600 hover:underline">
                        Preview Gift Receipt
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Shipping address */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6">
              <div className="mb-3 flex items-center gap-2 text-gray-900">
                <MapPin className="h-4 w-4" />
                <h2 className="font-display text-sm font-bold">Shipping Address</h2>
              </div>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
                <Truck className="h-3.5 w-3.5" /> {order.deliveryMethod}
              </div>
            </div>

            {/* Payment + totals */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6">
              <div className="mb-3 flex items-center gap-2 text-gray-900">
                <CreditCard className="h-4 w-4" />
                <h2 className="font-display text-sm font-bold">Payment</h2>
              </div>
              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {order.paymentStatus}
              </p>
              <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-leaf-600">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-gray-100 pt-2 font-display font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400">Placed on {formatDate(order.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
