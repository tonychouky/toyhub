"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Product, AgeRange, CategorySlug } from "@/types";
import { categories as CATEGORIES } from "@/data/categories";
import { adminCreateProduct, adminUpdateProduct, AdminProductInput } from "@/services/products";

const AGE_RANGES: AgeRange[] = ["0-2", "3-5", "6-8", "9-12", "13+"];

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    brand: product?.brand ?? "",
    category: product?.category ?? CATEGORIES[0].slug,
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    originalPrice: product?.originalPrice?.toString() ?? "",
    ageRange: product?.ageRange ?? "3-5",
    stock: product?.stock?.toString() ?? "0",
    image: product?.images?.[0] ?? "",
    features: product?.features?.join("\n") ?? "",
    barcode: product?.barcode ?? "",
    safetyInformation: product?.safetyInformation ?? "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const price = parseFloat(form.price) || 0;
    const originalPrice = form.originalPrice ? parseFloat(form.originalPrice) : undefined;
    const discount = originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;

    const payload: AdminProductInput = {
      name: form.name,
      brand: form.brand,
      category: form.category as CategorySlug,
      description: form.description,
      price,
      originalPrice,
      discount,
      images: [form.image || "https://picsum.photos/seed/toyhub-new-product/900/900"],
      ageRange: form.ageRange as AgeRange,
      stock: parseInt(form.stock, 10) || 0,
      barcode: form.barcode || undefined,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      specifications: product?.specifications ?? {},
      safetyInformation: form.safetyInformation || undefined,
    };

    if (product) {
      await adminUpdateProduct(product.id, payload);
    } else {
      await adminCreateProduct(payload);
    }
    setSaving(false);
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Product Name">
          <Input required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Brand">
          <Input required value={form.brand} onChange={(e) => update("brand", e.target.value)} />
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={(e) => update("category", e.target.value as CategorySlug)}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Age Range">
          <Select value={form.ageRange} onChange={(e) => update("ageRange", e.target.value as AgeRange)}>
            {AGE_RANGES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Price (USD)">
          <Input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} />
        </Field>
        <Field label="Original Price (optional)">
          <Input type="number" step="0.01" min="0" value={form.originalPrice} onChange={(e) => update("originalPrice", e.target.value)} />
        </Field>
        <Field label="Stock Quantity">
          <Input required type="number" min="0" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
        </Field>
        <Field label="Barcode (optional)">
          <Input value={form.barcode} onChange={(e) => update("barcode", e.target.value)} placeholder="194735123456" />
        </Field>
        <Field label="Image URL" className="sm:col-span-2">
          <Input value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
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
        <Field label="Features (one per line)" className="sm:col-span-2">
          <textarea
            rows={3}
            value={form.features}
            onChange={(e) => update("features", e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
          />
        </Field>
        <Field label="Safety Information (optional)" className="sm:col-span-2">
          <textarea
            rows={2}
            value={form.safetyInformation}
            onChange={(e) => update("safetyInformation", e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : product ? "Save Changes" : "Create Product"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/products")}>
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
