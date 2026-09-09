"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { getOrders } from "@/services/orders";
import { getProducts } from "@/services/products";
import { getCustomers } from "@/services/customers";
import { Order, Product, Customer } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getProducts(), getCustomers()]).then(([o, p, c]) => {
      setOrders(o);
      setProducts(p);
      setCustomers(c);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading dashboard...</p>;
  }

  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10);
  const outOfStock = products.filter((p) => p.stock === 0);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Here&apos;s what&apos;s happening across ToyHub.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Revenue" value={formatPrice(revenue)} icon={DollarSign} accent="leaf" />
        <AdminStatCard label="Orders" value={String(orders.length)} icon={ShoppingCart} accent="ocean" />
        <AdminStatCard label="Customers" value={String(customers.length)} icon={Users} accent="berry" />
        <AdminStatCard label="Products" value={String(products.length)} icon={Package} accent="brand" />
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="flex items-start gap-3 rounded-3xl border border-sunny-200 bg-sunny-50 p-5">
          <AlertTriangle className="h-5 w-5 shrink-0 text-sunny-600" />
          <div className="text-sm text-sunny-800">
            <p className="font-bold">Inventory needs attention</p>
            <p>
              {lowStock.length} product(s) are low on stock and {outOfStock.length} are out of stock.{" "}
              <Link href="/admin/inventory" className="font-bold underline">
                Review inventory
              </Link>
            </p>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-bold text-brand-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                <th className="pb-3">Order</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 font-semibold text-gray-900">
                    <Link href={`/admin/orders?highlight=${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3 text-gray-600">{order.customerName}</td>
                  <td className="py-3 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="py-3 text-right font-bold text-gray-900">{formatPrice(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
