"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getStoreSettings, updateStoreSettings } from "@/services/settings";
import { categories } from "@/data/categories";
import { StoreSettings } from "@/types";
import { useToast } from "@/components/providers/ToastProvider";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getStoreSettings().then(setSettings);
  }, []);

  if (!settings) return <p className="text-sm text-gray-500">Loading settings...</p>;

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function toggleCategory(slug: StoreSettings["eligibleCategories"][number]) {
    setSettings((prev) => {
      if (!prev) return prev;
      const has = prev.eligibleCategories.includes(slug);
      return {
        ...prev,
        eligibleCategories: has ? prev.eligibleCategories.filter((s) => s !== slug) : [...prev.eligibleCategories, slug],
      };
    });
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    await updateStoreSettings(settings);
    setSaving(false);
    showToast("Settings saved");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Configure gift features storewide.</p>
      </div>

      <div className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6">
        <ToggleRow
          label="Enable Send as a Gift"
          checked={settings.sendAsGiftEnabled}
          onChange={(v) => update("sendAsGiftEnabled", v)}
        />
        <ToggleRow
          label="Enable gift wrapping"
          checked={settings.giftWrappingEnabled}
          onChange={(v) => update("giftWrappingEnabled", v)}
        />
        <ToggleRow label="Enable gift cards" checked={settings.giftCardsEnabled} onChange={(v) => update("giftCardsEnabled", v)} />
        <ToggleRow
          label="Enable scheduled delivery requests"
          checked={settings.scheduledDeliveryEnabled}
          onChange={(v) => update("scheduledDeliveryEnabled", v)}
        />
        <ToggleRow
          label="Hide prices on surprise-gift receipts"
          checked={settings.hidePricesOnSurpriseGifts}
          onChange={(v) => update("hidePricesOnSurpriseGifts", v)}
        />

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Maximum gift message length</label>
          <Input
            type="number"
            min={20}
            max={1000}
            value={settings.maxGiftMessageLength}
            onChange={(e) => update("maxGiftMessageLength", parseInt(e.target.value, 10) || 0)}
            className="max-w-[160px]"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Eligible product categories for gifting {settings.eligibleCategories.length === 0 && "(none selected = all categories eligible)"}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.slug} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={settings.eligibleCategories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="mt-2 w-fit">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
      />
    </label>
  );
}
