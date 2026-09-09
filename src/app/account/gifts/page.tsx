"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Circle, Gift } from "lucide-react";
import { AuthGuard } from "@/components/account/AuthGuard";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getOrders } from "@/services/orders";
import { Order, OrderItem, ShipmentGroup } from "@/types";
import { ORDER_STATUS_LABELS, ORDER_STATUS_SEQUENCE } from "@/lib/utils";

interface GiftEntry {
  order: Order;
  item: OrderItem;
  itemIndex: number;
  shipment: ShipmentGroup;
}

export default function MyGiftsPage() {
  return <AuthGuard>{(user) => <GiftsList customerId={user.id} />}</AuthGuard>;
}

function GiftsList({ customerId }: { customerId: string }) {
  const [gifts, setGifts] = useState<GiftEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders(customerId).then((orders) => {
      const entries: GiftEntry[] = [];
      for (const order of orders) {
        order.items.forEach((item, itemIndex) => {
          if (!item.giftOptions?.sendAsGift || !item.giftOptions.recipient) return;
          const shipment = order.shipmentGroups.find((g) => g.itemIndexes.includes(itemIndex));
          if (shipment) entries.push({ order, item, itemIndex, shipment });
        });
      }
      setGifts(entries);
      setLoading(false);
    });
  }, [customerId]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">My Gifts</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <AccountSidebar />

        <div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading gifts...</p>
          ) : gifts.length === 0 ? (
            <EmptyState
              icon={Gift}
              title="No gifts sent yet"
              description="Choose 'Send as a Gift' on a product page to ship something directly to someone."
              action={
                <Link href="/shop">
                  <Button>Browse Products</Button>
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {gifts.map(({ order, item, shipment }) => {
                const cancelled = shipment.status === "cancelled";
                const currentIdx = ORDER_STATUS_SEQUENCE.indexOf(shipment.status as (typeof ORDER_STATUS_SEQUENCE)[number]);
                return (
                  <li key={`${order.id}_${shipment.id}`} className="rounded-3xl border border-gray-100 bg-white p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                          <Gift className="h-4 w-4 text-brand-500" /> Gift for {item.giftOptions!.recipient!.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{item.name}</p>
                      </div>
                      <Link href={`/account/orders/${order.id}`} className="text-xs font-semibold text-brand-600 hover:underline">
                        View Order
                      </Link>
                    </div>

                    {cancelled ? (
                      <p className="mt-4 text-sm font-semibold text-red-500">This shipment was cancelled.</p>
                    ) : (
                      <ol className="mt-4 flex items-center gap-1 overflow-x-auto">
                        {ORDER_STATUS_SEQUENCE.map((status, idx) => {
                          const reached = idx <= currentIdx;
                          const isLast = idx === ORDER_STATUS_SEQUENCE.length - 1;
                          return (
                            <li key={status} className="flex flex-1 items-center gap-1">
                              {reached ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-leaf-500" />
                              ) : (
                                <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                              )}
                              <span className={`whitespace-nowrap text-[10px] font-bold ${reached ? "text-gray-900" : "text-gray-400"}`}>
                                {ORDER_STATUS_LABELS[status]}
                              </span>
                              {!isLast && <span className={`mx-1 h-0.5 flex-1 ${idx < currentIdx ? "bg-leaf-500" : "bg-gray-200"}`} />}
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
