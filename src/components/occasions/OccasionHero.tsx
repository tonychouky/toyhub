import Link from "next/link";
import Image from "next/image";
import { Occasion } from "@/types";
import { Button } from "@/components/ui/Button";

export function OccasionHero({ occasion }: { occasion: Occasion }) {
  return (
    <div className="relative flex h-72 items-end overflow-hidden sm:h-80">
      <Image src={occasion.bannerImage} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{occasion.name}</h1>
        <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">{occasion.description}</p>
        <Link href="#occasion-products">
          <Button className="mt-5">Shop {occasion.name}</Button>
        </Link>
      </div>
    </div>
  );
}
