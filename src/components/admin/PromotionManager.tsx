"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CategorySlug, Occasion, Product, Promotion, PromotionType } from "@/types";
import { categories } from "@/data/categories";
import { getProducts } from "@/services/products";
import { getOccasions } from "@/services/occasions";
import { adminCreatePromotion, adminUpdatePromotion } from "@/services/promotions";

const TYPES: { value: PromotionType; label: string }[] = [
  { value: "percentage", label: "Percentage discount" },
  { value: "fixed", label: "Fixed amount discount" },
  { value: "buy_x_get_y", label: "Buy X, get Y free" },
  { value: "free_shipping", label: "Free shipping" },
  { value: "free_gift_wrapping", label: "Free gift wrapping" },
];

function toDateInput(iso?: string): string {
  return iso ? iso.slice(0, 10) : "";
}
function fromDateInput(value: string, endOfDay: boolean): string {
  if (!value) return "";
  return new Date(`${value}T${endOfDay ? "23:59:59" : "00:00:00"}.000Z`).toISOString();
}

export function PromotionManager({ promotion }: { promotion?: Promotion }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [form, setForm] = useState({
    name: promotion?.name ?? "",
    description: promotion?.description ?? "",
    type: promotion?.type ?? "percentage",
    value: promotion?.value?.toString() ?? "",
    couponCode: promotion?.couponCode ?? "",
    startDate: toDateInput(promotion?.startDate) || new Date().toISOString().slice(0, 10),
    endDate: toDateInput(promotion?.endDate),
    minimumOrderValue: promotion?.minimumOrderValue?.toString() ?? "",
    usageLimit: promotion?.usageLimit?.toString() ?? "",
    active: promotion?.active ?? true,
    bannerImage: promotion?.bannerImage ?? "",
    productIds: promotion?.productIds ?? [],
    categoryIds: promotion?.categoryIds ?? [],
    occasionIds: promotion?.occasionIds ?? [],
  });

  useEffect(() => {
    getProducts().then(setProducts);
    getOccasions(false).then(setOccasions);
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleId(key: "productIds" | "categoryIds" | "occasionIds", id: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((v) => v !== id) : [...prev[key], id],
    }));
  }

  const needsValue = form.type === "percentage" || form.type === "fixed" || form.type === "buy_x_get_y";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description || undefined,
      type: form.type,
      value: needsValue ? parseFloat(form.value) || 0 : undefined,
      couponCode: form.couponCode.trim() ? form.couponCode.trim().toUpperCase() : undefined,
      startDate: fromDateInput(form.startDate, false),
      endDate: fromDateInput(form.endDate, true),
      minimumOrderValue: form.minimumOrderValue ? parseFloat(form.minimumOrderValue) : undefined,
      usageLimit: form.usageLimit ? parseInt(form.usageLimit, 10) : undefined,
      active: form.active,
      bannerImage: form.bannerImage || undefined,
      productIds: form.productIds.length ? form.productIds : undefined,
      categoryIds: form.categoryIds.length ? form.categoryIds : undefined,
      occasionIds: form.occasionIds.length ? form.occasionIds : undefined,
    };
    if (promotion) {
      await adminUpdatePromotion(promotion.id, payload);
    } else {
      await adminCreatePromotion(payload);
    }
    setSaving(false);
    router.push("/admin/promotions");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Promotion Name">
          <Input required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Type">
          <Select value={form.type} onChange={(e) => update("type", e.target.value as PromotionType)}>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Description" className="sm:col-span-2">
          <Input value={form.description} onChange={(e) => update("description", e.target.value)} />
        </Field>
        {needsValue && (
          <Field label={form.type === "percentage" ? "Percentage (%)" : form.type === "fixed" ? "Amount ($)" : "Buy quantity (get 1 free)"}>
            <Input required type="number" step="0.01" min="0" value={form.value} onChange={(e) => update("value", e.target.value)} />
          </Field>
        )}
        <Field label="Coupon Code (optional)">
          <Input value={form.couponCode} onChange={(e) => update("couponCode", e.target.value)} placeholder="e.g. WELCOME10" />
        </Field>
        <Field label="Start Date">
          <Input required type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
        </Field>
        <Field label="End Date">
          <Input required type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
        </Field>
        <Field label="Minimum Order Value (optional)">
          <Input type="number" step="0.01" min="0" value={form.minimumOrderValue} onChange={(e) => update("minimumOrderValue", e.target.value)} />
        </Field>
        <Field label="Usage Limit (optional)">
          <Input type="number" min="0" value={form.usageLimit} onChange={(e) => update("usageLimit", e.target.value)} />
        </Field>
        <Field label="Banner Image URL (optional)" className="sm:col-span-2">
          <Input value={form.bannerImage} onChange={(e) => update("bannerImage", e.target.value)} placeholder="https://..." />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => update("active", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        Active
      </label>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
          Categories ({form.categoryIds.length}) — leave empty to apply store-wide
        </p>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-100 p-3">
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold">
              <input
                type="checkbox"
                checked={form.categoryIds.includes(c.slug)}
                onChange={() => toggleId("categoryIds", c.slug)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
          Occasions ({form.occasionIds.length})
        </p>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-100 p-3">
          {occasions.map((o) => (
            <label key={o.id} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold">
              <input
                type="checkbox"
                checked={form.occasionIds.includes(o.id)}
                onChange={() => toggleId("occasionIds", o.id)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              {o.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
          Specific Products ({form.productIds.length})
        </p>
        <div className="grid max-h-56 grid-cols-1 gap-1 overflow-y-auto rounded-2xl border border-gray-100 p-3 sm:grid-cols-2">
          {products.map((p) => (
            <label key={p.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50">
              <input
                type="checkbox"
                checked={form.productIds.includes(p.id)}
                onChange={() => toggleId("productIds", p.id)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : promotion ? "Save Changes" : "Create Promotion"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/promotions")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
    </label>
  );
}
