"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getAllPromotionsForAdmin, adminDeletePromotion, adminUpdatePromotion } from "@/services/promotions";
import { Promotion, PromotionStatus } from "@/types";
import { formatDate } from "@/lib/utils";

const STATUS_VARIANT: Record<PromotionStatus, "success" | "info" | "outOfStock"> = {
  active: "success",
  scheduled: "info",
  expired: "outOfStock",
};

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<(Promotion & { status: PromotionStatus })[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setPromotions(await getAllPromotionsForAdmin());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await adminDeletePromotion(id);
    load();
  }

  async function toggleActive(promo: Promotion) {
    await adminUpdatePromotion(promo.id, { active: !promo.active });
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Promotions</h1>
          <p className="mt-1 text-sm text-gray-500">{promotions.length} promotions configured.</p>
        </div>
        <Link href="/admin/promotions/new">
          <Button>
            <Plus className="h-4 w-4" /> Create Promotion
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
              <th className="p-4">Promotion</th>
              <th className="p-4">Type</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">Loading promotions...</td>
              </tr>
            ) : promotions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">No promotions yet.</td>
              </tr>
            ) : (
              promotions.map((promo) => (
                <tr key={promo.id}>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{promo.name}</p>
                    {promo.couponCode && <p className="text-xs text-gray-400">Code: {promo.couponCode}</p>}
                  </td>
                  <td className="p-4 text-gray-500">{promo.type.replace(/_/g, " ")}</td>
                  <td className="p-4 text-gray-500">
                    {formatDate(promo.startDate)} – {formatDate(promo.endDate)}
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleActive(promo)}>
                      <Badge variant={STATUS_VARIANT[promo.status]} className="capitalize">
                        {promo.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/promotions/${promo.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                        aria-label={`Edit ${promo.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(promo.id, promo.name)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Delete ${promo.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
