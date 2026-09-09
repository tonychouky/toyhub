"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { AuthGuard } from "@/components/account/AuthGuard";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOrders } from "@/services/orders";
import { Order } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrdersPage() {
  return (
    <AuthGuard>
      {(user) => <OrdersList customerId={user.id} />}
    </AuthGuard>
  );
}

function OrdersList({ customerId }: { customerId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders(customerId).then((result) => {
      setOrders(result);
      setLoading(false);
    });
  }, [customerId]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">My Orders</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <AccountSidebar />

        <div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No orders yet"
              description="Orders you place will show up here so you can track them."
              action={
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-gray-900">Order {order.id}</p>
                      <p className="text-xs text-gray-500">
                        Placed {formatDate(order.createdAt)} &middot; {order.items.length} item(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />
                      <span className="font-display text-sm font-extrabold text-gray-900">{formatPrice(order.total)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
