"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { OccasionManager } from "@/components/admin/OccasionManager";
import { getOccasionById } from "@/services/occasions";
import { Occasion } from "@/types";

export default function EditOccasionPage() {
  const params = useParams<{ id: string }>();
  const [occasion, setOccasion] = useState<Occasion | null | undefined>(undefined);

  useEffect(() => {
    getOccasionById(params.id).then(setOccasion);
  }, [params.id]);

  if (occasion === undefined) {
    return <p className="text-sm text-gray-500">Loading occasion...</p>;
  }
  if (!occasion) {
    return <p className="text-sm text-gray-500">Occasion not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Edit Occasion</h1>
        <p className="mt-1 text-sm text-gray-500">{occasion.name}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <OccasionManager occasion={occasion} />
      </div>
    </div>
  );
}
