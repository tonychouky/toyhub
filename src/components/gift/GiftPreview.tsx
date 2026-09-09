"use client";

import Image from "next/image";
import { GiftCard, GiftWrapping } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

// A polished visual mockup, not a photographic rendering: the product image
// sits inside a wrap-colored frame, with the chosen gift card overlapping the
// bottom edge and the message peeking below — matching the ASCII layout in
// the spec (image, overlapping card, message).
function accentBorderClass(wrapping?: GiftWrapping): string {
  const key = `${wrapping?.occasion ?? ""} ${wrapping?.name ?? ""}`.toLowerCase();
  if (key.includes("christmas")) return "border-leaf-500";
  if (key.includes("birthday") || key.includes("party")) return "border-berry-500";
  if (key.includes("gold")) return "border-sunny-500";
  if (key.includes("white") || key.includes("elegant")) return "border-gray-300";
  return "border-brand-500";
}

export function GiftPreview({
  productImage,
  productName,
  wrapping,
  card,
  message,
}: {
  productImage: string;
  productName: string;
  wrapping?: GiftWrapping;
  card?: GiftCard;
  message?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{t("gift.preview")}</p>
      <div
        className={cn(
          "relative aspect-square w-40 overflow-hidden rounded-3xl border-8 bg-gray-50 shadow-card",
          accentBorderClass(wrapping)
        )}
      >
        <Image src={productImage} alt={productName} fill sizes="160px" className="object-cover" />
        {card && (
          <div className="absolute bottom-2 left-1/2 w-28 -translate-x-1/2 overflow-hidden rounded-lg border-2 border-white bg-white shadow-card-hover">
            <div className="relative h-14 w-full">
              <Image src={card.image} alt={card.name} fill sizes="112px" className="object-cover" />
            </div>
          </div>
        )}
      </div>
      {message && <p className="mt-3 max-w-[12rem] text-center text-xs italic text-gray-600">&ldquo;{message}&rdquo;</p>}
    </div>
  );
}
