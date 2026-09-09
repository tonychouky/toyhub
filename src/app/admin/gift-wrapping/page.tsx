"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GiftCard, GiftWrapping } from "@/types";
import {
  getGiftWrappingOptions,
  getGiftCardOptions,
  adminDeleteGiftWrapping,
  adminDeleteGiftCard,
  adminUpdateGiftWrapping,
  adminUpdateGiftCard,
} from "@/services/gift-options";
import { formatPrice } from "@/lib/utils";

export default function AdminGiftWrappingPage() {
  const [wrappings, setWrappings] = useState<GiftWrapping[]>([]);
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [w, c] = await Promise.all([getGiftWrappingOptions(false), getGiftCardOptions(false)]);
    setWrappings(w);
    setCards(c);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Gift Wrapping</h1>
        <p className="mt-1 text-sm text-gray-500">Manage gift-paper options and gift cards.</p>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Gift Papers</h2>
          <Link href="/admin/gift-wrapping/wrapping/new">
            <Button size="sm">
              <Plus className="h-4 w-4" /> Add Gift Paper
            </Button>
          </Link>
        </div>
        <GiftOptionTable
          loading={loading}
          items={wrappings}
          editHref={(id) => `/admin/gift-wrapping/wrapping/${id}`}
          onToggleActive={async (item) => {
            await adminUpdateGiftWrapping(item.id, { active: !item.active });
            load();
          }}
          onDelete={async (item) => {
            if (!window.confirm(`Delete "${item.name}"?`)) return;
            await adminDeleteGiftWrapping(item.id);
            load();
          }}
        />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Gift Cards</h2>
          <Link href="/admin/gift-wrapping/cards/new">
            <Button size="sm">
              <Plus className="h-4 w-4" /> Add Gift Card
            </Button>
          </Link>
        </div>
        <GiftOptionTable
          loading={loading}
          items={cards}
          editHref={(id) => `/admin/gift-wrapping/cards/${id}`}
          onToggleActive={async (item) => {
            await adminUpdateGiftCard(item.id, { active: !item.active });
            load();
          }}
          onDelete={async (item) => {
            if (!window.confirm(`Delete "${item.name}"?`)) return;
            await adminDeleteGiftCard(item.id);
            load();
          }}
        />
      </section>
    </div>
  );
}

function GiftOptionTable<T extends { id: string; name: string; image: string; price: number; active: boolean }>({
  loading,
  items,
  editHref,
  onToggleActive,
  onDelete,
}: {
  loading: boolean;
  items: T[];
  editHref: (id: string) => string;
  onToggleActive: (item: T) => void;
  onDelete: (item: T) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">Loading...</td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">None yet.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td className="flex items-center gap-3 p-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
                  </div>
                  <span className="font-semibold text-gray-900">{item.name}</span>
                </td>
                <td className="p-4 font-semibold text-gray-900">{formatPrice(item.price)}</td>
                <td className="p-4">
                  <button onClick={() => onToggleActive(item)}>
                    <Badge variant={item.active ? "success" : "outOfStock"}>{item.active ? "Active" : "Inactive"}</Badge>
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={editHref(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(item)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Delete ${item.name}`}
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
  );
}
