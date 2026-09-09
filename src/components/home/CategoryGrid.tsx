import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Browse" title="Shop by Category" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <Image
              src={cat.image}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="relative z-10 p-3 font-display text-sm font-bold text-white sm:text-base">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand-500">{eyebrow}</p>}
        <h2 className="mt-1 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">{title}</h2>
      </div>
      {action && (
        <Link href={action.href} className="hidden shrink-0 text-sm font-bold text-brand-600 hover:underline sm:block">
          {action.label} &rarr;
        </Link>
      )}
    </div>
  );
}
