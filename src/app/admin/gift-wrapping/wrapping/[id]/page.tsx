"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GiftWrappingManager } from "@/components/admin/GiftWrappingManager";
import { getGiftWrappingById } from "@/services/gift-options";
import { GiftWrapping } from "@/types";

export default function EditGiftWrappingPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<GiftWrapping | null | undefined>(undefined);

  useEffect(() => {
    getGiftWrappingById(params.id).then(setItem);
  }, [params.id]);

  if (item === undefined) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!item) return <p className="text-sm text-gray-500">Gift paper not found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Edit Gift Paper</h1>
        <p className="mt-1 text-sm text-gray-500">{item.name}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <GiftWrappingManager kind="wrapping" item={item} />
      </div>
    </div>
  );
}
