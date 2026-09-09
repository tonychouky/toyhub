"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { getOrders, updateOrderStatus, updatePaymentStatus } from "@/services/orders";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from "@/lib/utils";

const ORDER_STATUSES: OrderStatus[] = [
  "placed",
  "confirmed",
  "preparing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["pending", "paid", "failed", "refunded"];

type OrderFilter = "all" | "gift" | "normal" | "multi-recipient" | "scheduled" | "wrapping" | "card";

const FILTERS: { value: OrderFilter; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "gift", label: "Gift Orders" },
  { value: "normal", label: "Normal Orders" },
  { value: "multi-recipient", label: "Multiple-Recipient" },
  { value: "scheduled", label: "Scheduled Delivery" },
  { value: "wrapping", label: "Gift Wrapping" },
  { value: "card", label: "Gift Card" },
];

function isGiftOrder(order: Order): boolean {
  return order.items.some((i) => i.giftOptions?.wrapped);
}

function matchesFilter(order: Order, filter: OrderFilter): boolean {
  switch (filter) {
    case "gift":
      return isGiftOrder(order);
    case "normal":
      return !isGiftOrder(order);
    case "multi-recipient":
      return order.shipmentGroups.filter((g) => g.recipient).length > 1 || order.shipmentGroups.length > 1;
    case "scheduled":
      return order.items.some((i) => !!i.giftOptions?.preferredDeliveryDate);
    case "wrapping":
      return order.items.some((i) => !!i.giftOptions?.wrappingId);
    case "card":
      return order.items.some((i) => !!i.giftOptions?.cardId);
    case "all":
    default:
      return true;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderFilter>("all");

  useEffect(() => {
    getOrders().then((result) => {
      setOrders(result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
  }, []);

  const filteredOrders = useMemo(() => orders.filter((o) => matchesFilter(o, filter)), [orders, filter]);

  async function handleStatusChange(id: string, status: OrderStatus) {
    const updated = await updateOrderStatus(id, status);
    if (updated) setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }

  async function handlePaymentChange(id: string, paymentStatus: PaymentStatus) {
    const updated = await updatePaymentStatus(id, paymentStatus);
    if (updated) setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">{filteredOrders.length} of {orders.length} orders.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold ${
              filter === f.value ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[960px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No orders match this filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 font-semibold text-gray-900">
                    {order.id}
                    {isGiftOrder(order) && <span className="ml-1.5">🎁</span>}
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </td>
                  <td className="p-4 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="p-4 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={order.status} />
                      <div className="w-40">
                        <Select
                          aria-label={`Update status for order ${order.id}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
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
                  </td>
                  <td className="p-4">
                    <div className="w-32">
                      <Select
                        aria-label={`Update payment status for order ${order.id}`}
                        value={order.paymentStatus}
                        onChange={(e) => handlePaymentChange(order.id, e.target.value as PaymentStatus)}
                        className="!py-2 text-xs capitalize"
                      >
                        {PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {s}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
