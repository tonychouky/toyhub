"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GiftWrappingManager } from "@/components/admin/GiftWrappingManager";
import { getGiftCardById } from "@/services/gift-options";
import { GiftCard } from "@/types";

export default function EditGiftCardPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<GiftCard | null | undefined>(undefined);

  useEffect(() => {
    getGiftCardById(params.id).then(setItem);
  }, [params.id]);

  if (item === undefined) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!item) return <p className="text-sm text-gray-500">Gift card not found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Edit Gift Card</h1>
        <p className="mt-1 text-sm text-gray-500">{item.name}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <GiftWrappingManager kind="card" item={item} />
      </div>
    </div>
  );
}
