"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PromotionManager } from "@/components/admin/PromotionManager";
import { getPromotionById } from "@/services/promotions";
import { Promotion } from "@/types";

export default function EditPromotionPage() {
  const params = useParams<{ id: string }>();
  const [promotion, setPromotion] = useState<Promotion | null | undefined>(undefined);

  useEffect(() => {
    getPromotionById(params.id).then(setPromotion);
  }, [params.id]);

  if (promotion === undefined) {
    return <p className="text-sm text-gray-500">Loading promotion...</p>;
  }
  if (!promotion) {
    return <p className="text-sm text-gray-500">Promotion not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Edit Promotion</h1>
        <p className="mt-1 text-sm text-gray-500">{promotion.name}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <PromotionManager promotion={promotion} />
      </div>
    </div>
  );
}
