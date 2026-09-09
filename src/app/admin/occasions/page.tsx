"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getOccasions, adminDeleteOccasion } from "@/services/occasions";
import { Occasion } from "@/types";

export default function AdminOccasionsPage() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setOccasions(await getOccasions(false));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await adminDeleteOccasion(id);
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Occasions</h1>
          <p className="mt-1 text-sm text-gray-500">{occasions.length} occasions configured.</p>
        </div>
        <Link href="/admin/occasions/new">
          <Button>
            <Plus className="h-4 w-4" /> Add Occasion
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
              <th className="p-4">Occasion</th>
              <th className="p-4">Products</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">Loading occasions...</td>
              </tr>
            ) : occasions.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">No occasions yet.</td>
              </tr>
            ) : (
              occasions.map((occasion) => (
                <tr key={occasion.id}>
                  <td className="flex items-center gap-3 p-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={occasion.bannerImage} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{occasion.name}</p>
                      <p className="text-xs text-gray-400">/occasions/{occasion.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{occasion.productIds.length}</td>
                  <td className="p-4">
                    <Badge variant={occasion.active ? "success" : "outOfStock"}>
                      {occasion.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/occasions/${occasion.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                        aria-label={`Edit ${occasion.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(occasion.id, occasion.name)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Delete ${occasion.name}`}
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
