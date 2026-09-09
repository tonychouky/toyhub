import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Promotion } from "@/types";

export function PromotionBanner({ promotion }: { promotion: Promotion }) {
  return (
    <Link
      href="/promotions"
      className="relative flex h-40 items-center overflow-hidden rounded-3xl bg-gray-900 sm:h-48"
    >
      {promotion.bannerImage && (
        <Image src={promotion.bannerImage} alt="" fill sizes="100vw" className="object-cover opacity-40" />
      )}
      <div className="relative px-6 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-wide text-sunny-400">Limited-time offer</p>
        <h3 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">{promotion.name}</h3>
        {promotion.description && <p className="mt-1 max-w-md text-sm text-white/80">{promotion.description}</p>}
        <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-white">
          See all promotions <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
