"use client";

import { AgeRange, CategorySlug, ProductFilters, SortOption } from "@/types";
import { categories } from "@/data/categories";
import { AGE_RANGE_LABELS, cn } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Star, X } from "lucide-react";

const AGE_RANGES: AgeRange[] = ["0-2", "3-5", "6-8", "9-12", "13+"];
const PRICE_BUCKETS: { label: string; min?: number; max?: number }[] = [
  { label: "Under $20", max: 20 },
  { label: "$20 – $50", min: 20, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "Over $100", min: 100 },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "best-selling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

interface FiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  brands: string[];
  resultCount: number;
}

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value as SortOption)} aria-label="Sort products">
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          Sort: {opt.label}
        </option>
      ))}
    </Select>
  );
}

export function Filters({ filters, onChange, brands, resultCount }: FiltersProps) {
  function toggleCategory(slug: CategorySlug) {
    const current = filters.categories ?? [];
    const next = current.includes(slug) ? current.filter((c) => c !== slug) : [...current, slug];
    onChange({ ...filters, categories: next });
  }

  function toggleBrand(brand: string) {
    const current = filters.brands ?? [];
    const next = current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand];
    onChange({ ...filters, brands: next });
  }

  function toggleAge(age: AgeRange) {
    const current = filters.ageRanges ?? [];
    const next = current.includes(age) ? current.filter((a) => a !== age) : [...current, age];
    onChange({ ...filters, ageRanges: next });
  }

  function setPriceBucket(min?: number, max?: number) {
    const isActive = filters.minPrice === min && filters.maxPrice === max;
    onChange({ ...filters, minPrice: isActive ? undefined : min, maxPrice: isActive ? undefined : max });
  }

  const hasActiveFilters =
    (filters.categories?.length ?? 0) > 0 ||
    (filters.brands?.length ?? 0) > 0 ||
    (filters.ageRanges?.length ?? 0) > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    (filters.minRating ?? 0) > 0 ||
    !!filters.inStockOnly;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onChange({ ...filters, categories: [], brands: [], ageRanges: [], minPrice: undefined, maxPrice: undefined, minRating: undefined, inStockOnly: false })
            }
            className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      <p className="text-xs font-medium text-gray-400">{resultCount} results</p>

      <FilterGroup title="Category">
        {categories.map((cat) => (
          <Checkbox
            key={cat.slug}
            label={cat.name}
            checked={!!filters.categories?.includes(cat.slug)}
            onChange={() => toggleCategory(cat.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((brand) => (
          <Checkbox key={brand} label={brand} checked={!!filters.brands?.includes(brand)} onChange={() => toggleBrand(brand)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Age Range">
        {AGE_RANGES.map((age) => (
          <Checkbox
            key={age}
            label={AGE_RANGE_LABELS[age]}
            checked={!!filters.ageRanges?.includes(age)}
            onChange={() => toggleAge(age)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {PRICE_BUCKETS.map((bucket) => (
          <Checkbox
            key={bucket.label}
            label={bucket.label}
            checked={filters.minPrice === bucket.min && filters.maxPrice === bucket.max}
            onChange={() => setPriceBucket(bucket.min, bucket.max)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        {[4, 3, 2].map((r) => (
          <button
            key={r}
            onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? undefined : r })}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-medium hover:bg-gray-50",
              filters.minRating === r ? "bg-brand-50 text-brand-700" : "text-gray-600"
            )}
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-3.5 w-3.5", i < r ? "fill-sunny-400 text-sunny-400" : "fill-gray-200 text-gray-200")} />
              ))}
            </span>
            & up
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox
          label="In stock only"
          checked={!!filters.inStockOnly}
          onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{title}</h3>
      <div className="flex max-h-48 flex-col gap-1 overflow-y-auto pr-1">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
      />
      {label}
    </label>
  );
}

export function MobileFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="subtle" size="sm" onClick={onClick} className="lg:hidden">
      Filters
    </Button>
  );
}
