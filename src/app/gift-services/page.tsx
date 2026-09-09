import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Gift, MessageSquareHeart } from "lucide-react";
import { getGiftWrappingOptions, getGiftCardOptions } from "@/services/gift-options";
import { getOccasions } from "@/services/occasions";
import { categories } from "@/data/categories";
import { formatPrice, AGE_RANGE_LABELS } from "@/lib/utils";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gift Services",
  description: "Gift wrapping, personalized cards, and curated gift ideas by age, occasion, budget, and interest.",
};

const BUDGETS = [
  { label: "Under $25", maxPrice: 25 },
  { label: "Under $50", maxPrice: 50 },
  { label: "Under $100", maxPrice: 100 },
];

export default async function GiftServicesPage() {
  const [wrappings, cards, occasions] = await Promise.all([
    getGiftWrappingOptions(),
    getGiftCardOptions(),
    getOccasions(true),
  ]);
  const ageRanges = Object.entries(AGE_RANGE_LABELS);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Gift Services" title="Everything you need to give the perfect gift" />

      <section className="mt-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Gift className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">Gift Wrapping</h2>
            <p className="text-sm text-gray-500">Make every gift feel extra special.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {wrappings.map((w) => (
            <div key={w.id} className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-card">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                <Image src={w.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <span className="line-clamp-2 text-xs font-semibold text-gray-700">{w.name}</span>
              <span className="text-xs font-bold text-brand-600">{formatPrice(w.price)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-berry-50 text-berry-600">
            <MessageSquareHeart className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">Personalized Cards</h2>
            <p className="text-sm text-gray-500">Add a personal message to make your gift memorable.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {cards.map((c) => (
            <div key={c.id} className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-card">
              <div className="relative h-16 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image src={c.image} alt="" fill sizes="120px" className="object-cover" />
              </div>
              <span className="line-clamp-2 text-xs font-semibold text-gray-700">{c.name}</span>
              <span className="text-xs font-bold text-brand-600">{formatPrice(c.price)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Choose your gift wrap and card, then add a personal message from your cart — up to 200 characters.
        </p>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="Browse" title="Gift Ideas" />
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <GiftIdeaGroup title="By Age">
            {ageRanges.map(([value, label]) => (
              <Link key={value} href={`/shop?age=${value}`}>
                <Button variant="subtle" size="sm" className="w-full justify-start">
                  {label}
                </Button>
              </Link>
            ))}
          </GiftIdeaGroup>

          <GiftIdeaGroup title="By Occasion">
            {occasions.slice(0, 5).map((o) => (
              <Link key={o.id} href={`/occasions/${o.slug}`}>
                <Button variant="subtle" size="sm" className="w-full justify-start">
                  {o.name}
                </Button>
              </Link>
            ))}
          </GiftIdeaGroup>

          <GiftIdeaGroup title="By Budget">
            {BUDGETS.map((b) => (
              <Link key={b.label} href={`/shop?maxPrice=${b.maxPrice}`}>
                <Button variant="subtle" size="sm" className="w-full justify-start">
                  {b.label}
                </Button>
              </Link>
            ))}
          </GiftIdeaGroup>

          <GiftIdeaGroup title="By Interest">
            {categories.slice(0, 5).map((c) => (
              <Link key={c.slug} href={`/shop?category=${c.slug}`}>
                <Button variant="subtle" size="sm" className="w-full justify-start">
                  {c.name}
                </Button>
              </Link>
            ))}
          </GiftIdeaGroup>
        </div>
      </section>
    </div>
  );
}

function GiftIdeaGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
