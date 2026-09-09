import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProduct } from "@/lib/serialize";
import { generateId, slugify } from "@/lib/utils";
import { Product, SortOption } from "@/types";

function filterByQuery(list: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) =>
    [p.name, p.brand, p.category, p.description, p.barcode ?? "", p.sku].join(" ").toLowerCase().includes(q)
  );
}

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const arr = [...list];
  switch (sort) {
    case "best-selling":
      return arr.sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0));
    case "newest":
      return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price-low-high":
      return arr.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    case "relevance":
    default:
      return arr;
  }
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const rows = await prisma.product.findMany();
  const all = rows.map(toProduct);

  const ids = sp.get("ids");
  if (ids !== null) {
    const idList = ids.split(",").filter(Boolean);
    return NextResponse.json(all.filter((p) => idList.includes(p.id)));
  }

  const barcode = sp.get("barcode");
  if (barcode !== null) {
    return NextResponse.json(all.find((p) => p.barcode === barcode.trim()) ?? null);
  }

  if (sp.get("brands") === "1") {
    return NextResponse.json(Array.from(new Set(all.map((p) => p.brand))).sort());
  }

  if (sp.get("mode") === "featured") {
    const limit = Number(sp.get("limit") ?? 8);
    return NextResponse.json([...all].sort((a, b) => b.rating - a.rating).slice(0, limit));
  }
  if (sp.get("mode") === "bestSellers") {
    const limit = Number(sp.get("limit") ?? 10);
    return NextResponse.json([...all].sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0)).slice(0, limit));
  }
  if (sp.get("mode") === "deals") {
    const limit = Number(sp.get("limit") ?? 8);
    return NextResponse.json(
      all.filter((p) => (p.discount ?? 0) > 0).sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)).slice(0, limit)
    );
  }
  const relatedTo = sp.get("relatedTo");
  if (relatedTo !== null) {
    const limit = Number(sp.get("limit") ?? 4);
    const base = all.find((p) => p.id === relatedTo);
    if (!base) return NextResponse.json([]);
    return NextResponse.json(all.filter((p) => p.category === base.category && p.id !== base.id).slice(0, limit));
  }

  const category = sp.get("category");
  if (category !== null && sp.get("mode") === "byCategory") {
    return NextResponse.json(all.filter((p) => p.category === category));
  }

  const query = sp.get("query");
  const suggest = sp.get("suggest") === "1";
  if (query !== null) {
    if (!query.trim()) return NextResponse.json([]);
    const matched = filterByQuery(all, query);
    return NextResponse.json(suggest ? matched.slice(0, Number(sp.get("limit") ?? 6)) : matched);
  }

  let results = all;
  const categories = sp.getAll("categories");
  if (categories.length) results = results.filter((p) => categories.includes(p.category));
  const brands = sp.getAll("brandsFilter");
  if (brands.length) results = results.filter((p) => brands.includes(p.brand));
  const ageRanges = sp.getAll("ageRanges");
  if (ageRanges.length) results = results.filter((p) => ageRanges.includes(p.ageRange));
  if (sp.get("minPrice")) results = results.filter((p) => p.price >= Number(sp.get("minPrice")));
  if (sp.get("maxPrice")) results = results.filter((p) => p.price <= Number(sp.get("maxPrice")));
  if (sp.get("minRating")) results = results.filter((p) => p.rating >= Number(sp.get("minRating")));
  if (sp.get("inStockOnly") === "1") results = results.filter((p) => p.stock > 0);
  const hasFilters = sp.get("hasFilters") === "1";
  if (hasFilters) {
    results = sortProducts(results, (sp.get("sort") as SortOption) ?? "relevance");
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const id = generateId("p");
  const row = await prisma.product.create({
    data: {
      id,
      name: input.name,
      brand: input.brand,
      categorySlug: input.category,
      slug: slugify(input.name),
      description: input.description,
      price: input.price,
      originalPrice: input.originalPrice,
      discount: input.discount,
      images: JSON.stringify(input.images ?? []),
      rating: input.rating ?? 0,
      reviewCount: input.reviewCount ?? 0,
      ageRange: input.ageRange,
      stock: input.stock ?? 0,
      sku: `ADM-${id.toUpperCase()}`,
      barcode: input.barcode || null,
      features: JSON.stringify(input.features ?? []),
      specifications: JSON.stringify(input.specifications ?? {}),
      safetyInformation: input.safetyInformation || null,
      whatsIncluded: input.whatsIncluded ? JSON.stringify(input.whatsIncluded) : null,
      isBestSeller: !!input.isBestSeller,
      isNew: !!input.isNew,
      isGiftable: input.isGiftable ?? true,
      soldCount: input.soldCount,
    },
  });
  return NextResponse.json(toProduct(row));
}
