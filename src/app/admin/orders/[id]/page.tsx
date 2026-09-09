"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Gift, MapPin, Phone } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { getOrderById, updateShipmentStatus } from "@/services/orders";
import { getGiftWrappingOptions, getGiftCardOptions } from "@/services/gift-options";
import { notifyShipmentUpdate } from "@/services/notifications";
import { Order, OrderStatus, GiftWrapping, GiftCard } from "@/types";
import { formatDate, formatPrice, maskPhone, ORDER_STATUS_LABELS } from "@/lib/utils";

const ORDER_STATUSES: OrderStatus[] = [
  "placed",
  "confirmed",
  "preparing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [wrappingsById, setWrappingsById] = useState<Record<string, GiftWrapping>>({});
  const [cardsById, setCardsById] = useState<Record<string, GiftCard>>({});

  useEffect(() => {
    getOrderById(params.id).then(setOrder);
  }, [params.id]);

  useEffect(() => {
    getGiftWrappingOptions(false).then((list) => setWrappingsById(Object.fromEntries(list.map((w) => [w.id, w]))));
    getGiftCardOptions(false).then((list) => setCardsById(Object.fromEntries(list.map((c) => [c.id, c]))));
  }, []);

  async function handleShipmentStatusChange(groupId: string, status: OrderStatus) {
    if (!order) return;
    const updated = await updateShipmentStatus(order.id, groupId, status);
    if (!updated) return;
    setOrder(updated);
    const group = updated.shipmentGroups.find((g) => g.id === groupId);
    if (group) await notifyShipmentUpdate(updated, group, status);
  }

  if (order === undefined) return <p className="text-sm text-gray-500">Loading order...</p>;
  if (!order) return <p className="text-sm text-gray-500">Order not found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/orders" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </Link>

      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Order {order.id}</h1>
        <p className="mt-1 text-sm text-gray-500">Placed {formatDate(order.createdAt)}</p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Buyer</p>
        <p className="mt-1 text-sm font-semibold text-gray-900">{order.customerName}</p>
        <p className="text-sm text-gray-500">{order.customerEmail}</p>
      </div>

      {order.shipmentGroups.map((group, idx) => (
        <div key={group.id} className="rounded-3xl border border-gray-100 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {group.recipient ? <Gift className="h-5 w-5 text-brand-500" /> : <MapPin className="h-5 w-5 text-gray-400" />}
              <h2 className="font-display text-base font-bold text-gray-900">
                Shipment {idx + 1} — {group.recipient ? `Gift for ${group.recipient.fullName}` : "Buyer's Address"}
              </h2>
            </div>
            <div className="w-44">
              <Select
                aria-label={`Update status for shipment ${idx + 1}`}
                value={group.status}
                onChange={(e) => handleShipmentStatusChange(group.id, e.target.value as OrderStatus)}
                className="!py-2 text-xs"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {ORDER_STATUS_LABELS[s]}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {group.recipient && (
            <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600">
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gray-400" /> {maskPhone(group.recipient.phone)}
              </p>
              <p>
                {group.recipient.address.line1}
                {group.recipient.address.line2 ? `, ${group.recipient.address.line2}` : ""}, {group.recipient.address.city}
                {group.recipient.address.area ? `, ${group.recipient.address.area}` : ""}, {group.recipient.address.country}
              </p>
            </div>
          )}

          <ul className="mt-4 flex flex-col divide-y divide-gray-50">
            {group.itemIndexes.map((i) => {
              const item = order.items[i];
              if (!item) return null;
              const wrapping = item.giftOptions?.wrappingId ? wrappingsById[item.giftOptions.wrappingId] : undefined;
              const card = item.giftOptions?.cardId ? cardsById[item.giftOptions.cardId] : undefined;
              return (
                <li key={i} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-900">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-500">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                  {wrapping && <p className="text-xs text-gray-500">Wrapping: {wrapping.name}</p>}
                  {card && <p className="text-xs text-gray-500">Card: {card.name}</p>}
                  {item.giftOptions?.message && <p className="text-xs italic text-gray-500">Message: &ldquo;{item.giftOptions.message}&rdquo;</p>}
                  {item.giftOptions?.isSurprise && <Badge variant="info">Surprise gift</Badge>}
                  {item.giftOptions?.preferredDeliveryDate && (
                    <p className="text-xs text-gray-500">
                      Requested delivery: {formatDate(item.giftOptions.preferredDeliveryDate)} (not guaranteed)
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
