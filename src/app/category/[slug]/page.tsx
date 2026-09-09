import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/services/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/home/CategoryGrid";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
    openGraph: { title: `${category.name} | ToyHub`, description: category.description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Category" title={category.name} />
      <p className="mt-2 max-w-2xl text-sm text-gray-500">{category.description}</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
