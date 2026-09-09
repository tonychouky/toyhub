"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GiftCard, GiftWrapping } from "@/types";
import {
  adminCreateGiftWrapping,
  adminUpdateGiftWrapping,
  adminCreateGiftCard,
  adminUpdateGiftCard,
} from "@/services/gift-options";

type Kind = "wrapping" | "card";

export function GiftWrappingManager({ kind, item }: { kind: Kind; item?: GiftWrapping | GiftCard }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: item?.name ?? "",
    image: item?.image ?? "",
    previewImage: item?.previewImage ?? "",
    price: item?.price?.toString() ?? "",
    occasion: item?.occasion ?? "",
    active: item?.active ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const listHref = "/admin/gift-wrapping";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      image: form.image || `https://picsum.photos/seed/toyhub-new-${kind}/600/600`,
      previewImage: form.previewImage || undefined,
      price: parseFloat(form.price) || 0,
      occasion: form.occasion || undefined,
      active: form.active,
    };
    if (kind === "wrapping") {
      if (item) await adminUpdateGiftWrapping(item.id, payload);
      else await adminCreateGiftWrapping(payload);
    } else {
      if (item) await adminUpdateGiftCard(item.id, payload);
      else await adminCreateGiftCard(payload);
    }
    setSaving(false);
    router.push(listHref);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Price (USD)">
          <Input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} />
        </Field>
        <Field label="Image URL">
          <Input value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Preview Image URL (optional)">
          <Input value={form.previewImage} onChange={(e) => update("previewImage", e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Occasion (optional)" className="sm:col-span-2">
          <Input value={form.occasion} onChange={(e) => update("occasion", e.target.value)} placeholder="e.g. christmas, birthday" />
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

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : item ? "Save Changes" : `Create ${kind === "wrapping" ? "Gift Wrap" : "Gift Card"}`}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push(listHref)}>
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
