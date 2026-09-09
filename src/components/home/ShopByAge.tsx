import Link from "next/link";
import { SectionHeading } from "@/components/home/CategoryGrid";

const AGE_GROUPS = [
  { range: "0-2", label: "0–2 years", emoji: "🍼", color: "bg-berry-50 text-berry-600" },
  { range: "3-5", label: "3–5 years", emoji: "🧸", color: "bg-sunny-50 text-sunny-600" },
  { range: "6-8", label: "6–8 years", emoji: "🧩", color: "bg-ocean-50 text-ocean-600" },
  { range: "9-12", label: "9–12 years", emoji: "🚀", color: "bg-leaf-50 text-leaf-600" },
  { range: "13+", label: "13+ years", emoji: "🎮", color: "bg-brand-50 text-brand-600" },
];

export function ShopByAge() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Made for them" title="Shop by Age" />
      <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5">
        {AGE_GROUPS.map((group) => (
          <Link
            key={group.range}
            href={`/shop?age=${group.range}`}
            className={`flex flex-col items-center gap-2 rounded-3xl p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover ${group.color}`}
          >
            <span className="text-3xl">{group.emoji}</span>
            <span className="font-display text-sm font-bold">{group.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
