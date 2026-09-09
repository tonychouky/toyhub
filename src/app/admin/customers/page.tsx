"use client";

import { Fragment, useEffect, useState } from "react";
import { getCustomers } from "@/services/customers";
import { getOrders } from "@/services/orders";
import { Customer, Order } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCustomers(), getOrders()]).then(([c, o]) => {
      setCustomers(c);
      setOrders(o);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">{customers.length} registered customers.</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
              <th className="p-4">Customer</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Loading customers...
                </td>
              </tr>
            ) : (
              customers.map((customer) => {
                const customerOrders = orders.filter((o) => o.customerId === customer.id);
                const isExpanded = expanded === customer.id;
                return (
                  <Fragment key={customer.id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpanded(isExpanded ? null : customer.id)}
                    >
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.email}</p>
                      </td>
                      <td className="p-4 text-gray-500">{formatDate(customer.createdAt)}</td>
                      <td className="p-4 text-gray-600">{customer.totalOrders}</td>
                      <td className="p-4 font-semibold text-gray-900">{formatPrice(customer.totalSpent)}</td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="p-4">
                          {customerOrders.length === 0 ? (
                            <p className="text-xs text-gray-400">No orders on record.</p>
                          ) : (
                            <ul className="flex flex-col gap-2">
                              {customerOrders.map((order) => (
                                <li key={order.id} className="flex justify-between text-xs text-gray-600">
                                  <span>
                                    {order.id} &middot; {formatDate(order.createdAt)}
                                  </span>
                                  <span className="font-semibold">{formatPrice(order.total)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
