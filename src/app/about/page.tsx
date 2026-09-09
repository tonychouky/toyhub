import type { Metadata } from "next";
import { Sparkles, Gift, PartyPopper, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  title: "About",
  description: "ToyHub is a destination for toys, gifts, celebrations, seasonal products, and event services.",
};

const VALUES = [
  { icon: Sparkles, title: "Toys that inspire", description: "A curated catalog spanning building sets, STEM kits, dolls, and outdoor play." },
  { icon: Gift, title: "Thoughtful gifting", description: "Gift wrapping, personalized cards, and gift ideas for every age and budget." },
  { icon: PartyPopper, title: "Every celebration", description: "From Christmas to graduation, our occasion shop makes seasonal gifting easy." },
  { icon: ShieldCheck, title: "Trusted service", description: "Safety-tested products and an events team ready to help plan your next celebration." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="About Us" title="Toys, gifts, and celebrations — all in one place" />
      <p className="mt-4 text-base text-gray-600">
        ToyHub started as a toy store, but our customers kept asking for more — help wrapping
        gifts, ideas for occasions, and support planning celebrations. Today we&apos;re a destination
        for toys, gifts, seasonal shopping, and event services, all built around the same promise:
        make it easy to find something wonderful for the people you care about.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <v.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-gray-900">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
