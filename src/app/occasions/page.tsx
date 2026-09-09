import type { Metadata } from "next";
import { getOccasions } from "@/services/occasions";
import { OccasionCard } from "@/components/occasions/OccasionCard";
import { SectionHeading } from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  title: "Occasions",
  description: "Shop by occasion — Christmas, birthdays, graduations, and every celebration in between.",
};

export default async function OccasionsPage() {
  const occasions = await getOccasions(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Celebrate" title="Shop by Occasion" />
      <p className="mt-2 max-w-2xl text-sm text-gray-500">
        Every celebration deserves the right gift. Pick an occasion to see curated products, gift
        ideas, and current promotions.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.id} occasion={occasion} />
        ))}
      </div>
    </div>
  );
}
