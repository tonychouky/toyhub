import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { occasions as mockOccasions } from "@/data/occasions";
import { getCategoryBySlug } from "@/data/categories";
import { getOccasionBySlug } from "@/services/occasions";
import { getProductsByIds } from "@/services/products";
import { getActivePromotions } from "@/services/promotions";
import { ProductGrid } from "@/components/products/ProductGrid";
import { OccasionHero } from "@/components/occasions/OccasionHero";
import { PromotionCard } from "@/components/promotions/PromotionCard";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { Gift } from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return mockOccasions.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const occasion = await getOccasionBySlug(params.slug);
  if (!occasion) return { title: "Occasion Not Found" };
  return {
    title: occasion.name,
    description: occasion.description,
    openGraph: { title: `${occasion.name} | ToyHub`, description: occasion.description },
  };
}

export default async function OccasionPage({ params }: Props) {
  const occasion = await getOccasionBySlug(params.slug);
  if (!occasion) notFound();

  const [products, allPromotions] = await Promise.all([getProductsByIds(occasion.productIds), getActivePromotions()]);
  const promotions = allPromotions.filter((p) => p.occasionIds?.includes(occasion.id));
  const relatedCategorySlugs = Array.from(new Set(products.map((p) => p.category)));
  const relatedCategories = relatedCategorySlugs.map((slug) => getCategoryBySlug(slug)).filter(Boolean);
  const giftIdeas = products.slice(0, 4);

  return (
    <div>
      <OccasionHero occasion={occasion} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {promotions.length > 0 && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promotion={promo} badge="Occasion offer" />
            ))}
          </div>
        )}

        <section id="occasion-products">
          <SectionHeading eyebrow="Featured" title={`Shop ${occasion.name}`} />
          <div className="mt-6">
            <ProductGrid products={products} />
          </div>
        </section>

        {giftIdeas.length > 0 && (
          <section className="mt-14">
            <SectionHeading eyebrow="Gift Ideas" title={`Great gifts for ${occasion.name}`} />
            <div className="mt-6">
              <ProductGrid products={giftIdeas} />
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-col items-start gap-3 rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600">
              <Gift className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-gray-900">Make it a gift</p>
              <p className="text-xs text-gray-500">
                {occasion.giftIdeasNote ?? "Add gift wrapping, a card, and a personal message from your cart."}
              </p>
            </div>
          </div>
          <Link href="/gift-services" className="text-sm font-semibold text-brand-600 hover:underline">
            Explore Gift Services →
          </Link>
        </div>

        {relatedCategories.length > 0 && (
          <section className="mt-14">
            <SectionHeading eyebrow="Explore" title="Related Categories" />
            <div className="mt-6 flex flex-wrap gap-2">
              {relatedCategories.map((c) => (
                <Link
                  key={c!.slug}
                  href={`/category/${c!.slug}`}
                  className="rounded-full border-2 border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-brand-500 hover:text-brand-600"
                >
                  {c!.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
