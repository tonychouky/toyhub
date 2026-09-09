"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AlertTriangle, PackageX, PackageCheck } from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { getProducts, adminUpdateStock } from "@/services/products";
import { Product } from "@/types";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setProducts(await getProducts());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStockUpdate(id: string, value: string) {
    const stock = Math.max(0, parseInt(value, 10) || 0);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock } : p)));
    await adminUpdateStock(id, stock);
  }

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10);
  const outOfStock = products.filter((p) => p.stock === 0);

  const visible =
    filter === "low" ? lowStock : filter === "out" ? outOfStock : products;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Inventory</h1>
        <p className="mt-1 text-sm text-gray-500">Track and update stock levels across your catalog.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button onClick={() => setFilter("all")} className="text-left">
          <AdminStatCard label="Total Products" value={String(products.length)} icon={PackageCheck} accent="brand" />
        </button>
        <button onClick={() => setFilter("low")} className="text-left">
          <AdminStatCard label="Low Stock" value={String(lowStock.length)} icon={AlertTriangle} accent="sunny" hint="10 units or fewer" />
        </button>
        <button onClick={() => setFilter("out")} className="text-left">
          <AdminStatCard label="Out of Stock" value={String(outOfStock.length)} icon={PackageX} accent="berry" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Status</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Loading inventory...
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No products in this view.
                </td>
              </tr>
            ) : (
              visible.map((product) => (
                <tr key={product.id}>
                  <td className="flex items-center gap-3 p-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                  </td>
                  <td className="p-4 text-gray-500">{product.sku}</td>
                  <td className="p-4">
                    {product.stock === 0 ? (
                      <Badge variant="outOfStock">Out of stock</Badge>
                    ) : product.stock <= 10 ? (
                      <Badge variant="sale">Low stock</Badge>
                    ) : (
                      <Badge variant="success">In stock</Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) => handleStockUpdate(product.id, e.target.value)}
                      className="!py-2 w-24"
                      aria-label={`Update stock for ${product.name}`}
                    />
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
