"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function GiftMessage({
  value,
  onChange,
  maxLength = 300,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  const { t } = useTranslation();
  const remaining = maxLength - value.length;

  return (
    <div>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={t("gift.messagePlaceholder")}
        rows={3}
        className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
      />
      <p className="mt-1 text-right text-[11px] text-gray-400">
        {t("gift.charactersRemaining", { count: remaining })}
      </p>
    </div>
  );
}
