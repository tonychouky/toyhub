"use client";

import { Input } from "@/components/ui/Input";
import { useTranslation } from "@/hooks/useTranslation";

export function GiftDeliveryOptions({
  isSurprise,
  preferredDeliveryDate,
  revealSenderName,
  scheduledDeliveryEnabled,
  onChange,
}: {
  isSurprise: boolean;
  preferredDeliveryDate?: string;
  revealSenderName: boolean;
  scheduledDeliveryEnabled: boolean;
  onChange: (patch: { isSurprise?: boolean; preferredDeliveryDate?: string; revealSenderName?: boolean }) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
        <input
          type="checkbox"
          checked={isSurprise}
          onChange={(e) => onChange({ isSurprise: e.target.checked, revealSenderName: e.target.checked ? false : revealSenderName })}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        {t("gift.surpriseGift")}
      </label>
      {isSurprise && (
        <p className="ml-6 text-xs text-gray-500">
          Pricing won&apos;t appear on the gift package, and the recipient will only see appropriate gift information.
        </p>
      )}

      <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
        <input
          type="checkbox"
          checked={revealSenderName}
          onChange={(e) => onChange({ revealSenderName: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        Show my name to the recipient
      </label>

      {scheduledDeliveryEnabled && (
        <div>
          <label htmlFor="preferredDeliveryDate" className="mb-1.5 block text-sm font-semibold text-gray-700">
            {t("gift.deliveryDate")}
          </label>
          <Input
            id="preferredDeliveryDate"
            type="date"
            value={preferredDeliveryDate ?? ""}
            onChange={(e) => onChange({ preferredDeliveryDate: e.target.value || undefined })}
          />
          <p className="mt-1 text-xs text-gray-400">{t("gift.deliveryDateNotice")}</p>
        </div>
      )}
    </div>
  );
}
