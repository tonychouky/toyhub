import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid, SectionHeading } from "@/components/home/CategoryGrid";
import { ShopByAge } from "@/components/home/ShopByAge";
import { TrustSection } from "@/components/home/TrustSection";
import { DealsSection } from "@/components/home/DealsSection";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { getFeaturedProducts, getBestSellers, getDeals } from "@/services/products";
import { getFeaturedOccasions } from "@/services/occasions";
import { getActivePromotions } from "@/services/promotions";
import { getEventServices } from "@/services/events";
import { OccasionCard } from "@/components/occasions/OccasionCard";
import { PromotionBanner } from "@/components/promotions/PromotionBanner";
import { EventCard } from "@/components/events/EventCard";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function HomePage() {
  const [featured, bestSellers, deals, occasions, promotions, events] = await Promise.all([
    getFeaturedProducts(8),
    getBestSellers(10),
    getDeals(6),
    getFeaturedOccasions(4),
    getActivePromotions(),
    getEventServices(),
  ]);

  return (
    <>
      <Hero />

      <CategoryGrid />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Handpicked" title="Featured Products" action={{ label: "Shop all", href: "/shop" }} />
        <div className="mt-8">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Customer favorites" title="Best Sellers" action={{ label: "Shop all", href: "/shop?sort=best-selling" }} />
        <div className="mt-8">
          <ProductCarousel products={bestSellers} />
        </div>
      </section>

      <DealsSection products={deals} />

      {occasions.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Celebrate" title="Shop by Occasion" action={{ label: "View all", href: "/occasions" }} />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <OccasionCard key={occasion.id} occasion={occasion} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600">
              <Gift className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Gift Services</h2>
              <p className="mt-1 text-sm text-gray-600">Gift wrapping, personalized cards, and gift ideas by age, occasion, or budget.</p>
            </div>
          </div>
          <Link href="/gift-services">
            <Button>Explore Gift Services</Button>
          </Link>
        </div>
      </section>

      {promotions.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Save more" title="Current Promotions" action={{ label: "View all", href: "/promotions" }} />
          <div className="mt-8">
            <PromotionBanner promotion={promotions[0]} />
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Beyond the gift" title="Events & Celebrations" action={{ label: "View all", href: "/events" }} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <ShopByAge />

      <TrustSection />

      <Newsletter />
    </>
  );
}
