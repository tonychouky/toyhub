"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { GiftCard } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function GiftCardSelector({
  options,
  selectedId,
  onChange,
}: {
  options: GiftCard[];
  selectedId?: string;
  onChange: (id: string | undefined) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <button
        type="button"
        onClick={() => onChange(undefined)}
        className={cn(
          "flex flex-col items-center gap-1.5 rounded-2xl border-2 p-2 text-center",
          !selectedId ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="flex h-16 w-full items-center justify-center rounded-xl bg-gray-100 text-[10px] font-semibold text-gray-400">
          {t("gift.none")}
        </div>
        <span className="text-[11px] font-semibold text-gray-600">{t("gift.none")}</span>
      </button>
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-2xl border-2 p-2 text-center",
              selected ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="relative h-16 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image src={option.image} alt="" fill sizes="120px" className="object-cover" />
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Check className="h-5 w-5 text-white" />
                </span>
              )}
            </div>
            <span className="line-clamp-2 text-[11px] font-semibold text-gray-700">{option.name}</span>
            <span className="text-[10px] font-bold text-brand-600">{formatPrice(option.price)}</span>
          </button>
        );
      })}
    </div>
  );
}
