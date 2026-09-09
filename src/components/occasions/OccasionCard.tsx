import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Occasion } from "@/types";

export function OccasionCard({ occasion }: { occasion: Occasion }) {
  return (
    <Link
      href={`/occasions/${occasion.slug}`}
      className="group relative flex h-48 flex-col justify-end overflow-hidden rounded-3xl border border-gray-100 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Image
        src={occasion.bannerImage}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="relative p-4 text-white">
        <h3 className="font-display text-lg font-extrabold">{occasion.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-white/90">
          Shop now <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </Link>
  );
}
