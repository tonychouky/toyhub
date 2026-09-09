"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Occasion, Product, Promotion } from "@/types";
import { adminCreateOccasion, adminUpdateOccasion } from "@/services/occasions";
import { getProducts } from "@/services/products";
import { getAllPromotionsForAdmin } from "@/services/promotions";

export function OccasionManager({ occasion }: { occasion?: Occasion }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form, setForm] = useState({
    name: occasion?.name ?? "",
    slug: occasion?.slug ?? "",
    description: occasion?.description ?? "",
    bannerImage: occasion?.bannerImage ?? "",
    giftIdeasNote: occasion?.giftIdeasNote ?? "",
    active: occasion?.active ?? true,
    productIds: occasion?.productIds ?? [],
    promotionIds: occasion?.promotionIds ?? [],
  });

  useEffect(() => {
    getProducts().then(setProducts);
    getAllPromotionsForAdmin().then(setPromotions);
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleId(key: "productIds" | "promotionIds", id: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((v) => v !== id) : [...prev[key], id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      bannerImage: form.bannerImage || "https://picsum.photos/seed/toyhub-new-occasion/1600/600",
      giftIdeasNote: form.giftIdeasNote || undefined,
      active: form.active,
      productIds: form.productIds,
      promotionIds: form.promotionIds,
    };
    if (occasion) {
      await adminUpdateOccasion(occasion.id, payload);
    } else {
      await adminCreateOccasion(payload);
    }
    setSaving(false);
    router.push("/admin/occasions");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Slug (optional — auto-generated from name)">
          <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. mothers-day" />
        </Field>
        <Field label="Banner Image URL" className="sm:col-span-2">
          <Input value={form.bannerImage} onChange={(e) => update("bannerImage", e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Description" className="sm:col-span-2">
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
          />
        </Field>
        <Field label="Gift Ideas Note (optional)" className="sm:col-span-2">
          <Input value={form.giftIdeasNote} onChange={(e) => update("giftIdeasNote", e.target.value)} />
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
          Assigned Products ({form.productIds.length})
        </p>
        <div className="grid max-h-64 grid-cols-1 gap-1 overflow-y-auto rounded-2xl border border-gray-100 p-3 sm:grid-cols-2">
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

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
          Assigned Promotions ({form.promotionIds.length})
        </p>
        <div className="grid max-h-48 grid-cols-1 gap-1 overflow-y-auto rounded-2xl border border-gray-100 p-3 sm:grid-cols-2">
          {promotions.map((promo) => (
            <label key={promo.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50">
              <input
                type="checkbox"
                checked={form.promotionIds.includes(promo.id)}
                onChange={() => toggleId("promotionIds", promo.id)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              {promo.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : occasion ? "Save Changes" : "Create Occasion"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/occasions")}>
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
