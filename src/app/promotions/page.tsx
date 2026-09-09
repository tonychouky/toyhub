import type { Metadata } from "next";
import { getActivePromotions, getUpcomingPromotions, getExpiringSoonPromotions } from "@/services/promotions";
import { PromotionCard } from "@/components/promotions/PromotionCard";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "lucide-react";

export const metadata: Metadata = { title: "Promotions" };

export default async function PromotionsPage() {
  const [active, upcoming, expiringSoonIds] = await Promise.all([
    getActivePromotions(),
    getUpcomingPromotions(),
    getExpiringSoonPromotions(3),
  ]);
  const expiringIds = new Set(expiringSoonIds.map((p) => p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Save more" title="Promotions" />

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-gray-900">Active Promotions</h2>
        {active.length === 0 ? (
          <div className="mt-4">
            <EmptyState icon={Tag} title="No active promotions right now" description="Check back soon for new offers." />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((promo) => (
              <PromotionCard key={promo.id} promotion={promo} badge={expiringIds.has(promo.id) ? "Ending soon" : undefined} />
            ))}
          </div>
        )}
      </section>

      {upcoming.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-gray-900">Upcoming Promotions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((promo) => (
              <PromotionCard key={promo.id} promotion={promo} badge="Coming soon" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
