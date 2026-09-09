"use client";

import { useEffect, useState } from "react";
import { GiftCard, GiftOptions as GiftOptionsType, GiftWrapping, Recipient, StoreSettings } from "@/types";
import { getGiftCardOptions, getGiftWrappingOptions } from "@/services/gift-options";
import { getStoreSettings } from "@/services/settings";
import { RecipientErrors } from "@/services/recipients";
import { trackGiftWrappingSelected, trackGiftCardSelected, trackGiftMessageAdded } from "@/services/analytics";
import { GiftWrappingSelector } from "@/components/gift/GiftWrappingSelector";
import { GiftCardSelector } from "@/components/gift/GiftCardSelector";
import { GiftMessage } from "@/components/gift/GiftMessage";
import { GiftPreview } from "@/components/gift/GiftPreview";
import { GiftRecipientForm } from "@/components/gift/GiftRecipientForm";
import { GiftDeliveryOptions } from "@/components/gift/GiftDeliveryOptions";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/**
 * The single gift-configuration editor, used both inline on the Cart page
 * (editing an existing line) and inside the "Send as a Gift" modal on the
 * product page (configuring a brand-new line). `wrapped` stays the overall
 * "gift options are engaged for this line" flag for backward compatibility
 * with cartService.addItem's merge logic and the cart/checkout display —
 * a wrapping paper itself is still optional (wrappingId may be unset).
 */
export function GiftOptions({
  productImage,
  productName,
  value,
  onChange,
  recipientErrors,
}: {
  productImage: string;
  productName: string;
  value?: GiftOptionsType;
  onChange: (options: GiftOptionsType | undefined) => void;
  recipientErrors?: RecipientErrors;
}) {
  const { t } = useTranslation();
  const [wrappings, setWrappings] = useState<GiftWrapping[]>([]);
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const engaged = value?.wrapped ?? false;
  const sendAsGift = value?.sendAsGift ?? false;

  useEffect(() => {
    getGiftWrappingOptions().then(setWrappings);
    getGiftCardOptions().then(setCards);
    getStoreSettings().then(setSettings);
  }, []);

  function toggleEngaged(next: boolean) {
    if (!next) {
      onChange(undefined);
      return;
    }
    onChange({ wrapped: true, ...value });
  }

  function toggleSendAsGift(next: boolean) {
    onChange({
      ...(value as GiftOptionsType),
      wrapped: true,
      sendAsGift: next,
      recipient: next ? value?.recipient : undefined,
      isSurprise: next ? value?.isSurprise : undefined,
      preferredDeliveryDate: next ? value?.preferredDeliveryDate : undefined,
      revealSenderName: next ? value?.revealSenderName : undefined,
    });
  }

  function updateRecipient(recipient: Recipient) {
    onChange({ ...(value as GiftOptionsType), wrapped: true, sendAsGift: true, recipient });
  }

  const selectedWrapping = wrappings.find((w) => w.id === value?.wrappingId);
  const selectedCard = cards.find((c) => c.id === value?.cardId);
  const maxMessageLength = settings?.maxGiftMessageLength ?? 300;

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-gray-800">
        <input
          type="checkbox"
          checked={engaged}
          onChange={(e) => toggleEngaged(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        {t("gift.wrapAsGift")}
      </label>

      {engaged && (
        <div className="mt-4 flex flex-col gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Who is this for?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleSendAsGift(false)}
                className={cn(
                  "flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold sm:flex-none sm:px-6",
                  !sendAsGift ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {t("gift.myself")}
              </button>
              <button
                type="button"
                onClick={() => toggleSendAsGift(true)}
                className={cn(
                  "flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold sm:flex-none sm:px-6",
                  sendAsGift ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {t("gift.someoneElse")}
              </button>
            </div>
          </div>

          {sendAsGift && (
            <>
              <GiftRecipientForm value={value?.recipient} onChange={updateRecipient} errors={recipientErrors} />
              <GiftDeliveryOptions
                isSurprise={value?.isSurprise ?? false}
                preferredDeliveryDate={value?.preferredDeliveryDate}
                revealSenderName={value?.revealSenderName ?? true}
                scheduledDeliveryEnabled={settings?.scheduledDeliveryEnabled ?? true}
                onChange={(patch) => onChange({ ...(value as GiftOptionsType), wrapped: true, ...patch })}
              />
            </>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_160px]">
            <div className="flex flex-col gap-4">
              {(settings?.giftWrappingEnabled ?? true) && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">{t("gift.giftWrapping")}</p>
                  <GiftWrappingSelector
                    options={wrappings}
                    selectedId={value?.wrappingId}
                    onChange={(id) => {
                      onChange({ ...(value as GiftOptionsType), wrapped: true, wrappingId: id });
                      if (id) trackGiftWrappingSelected(id);
                    }}
                  />
                </div>
              )}
              {(settings?.giftCardsEnabled ?? true) && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">{t("gift.giftCard")}</p>
                  <GiftCardSelector
                    options={cards}
                    selectedId={value?.cardId}
                    onChange={(id) => {
                      onChange({ ...(value as GiftOptionsType), wrapped: true, cardId: id });
                      if (id) trackGiftCardSelected(id);
                    }}
                  />
                </div>
              )}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">{t("gift.personalMessage")}</p>
                <GiftMessage
                  value={value?.message ?? ""}
                  maxLength={maxMessageLength}
                  onChange={(message) => {
                    onChange({ ...(value as GiftOptionsType), wrapped: true, message });
                    trackGiftMessageAdded();
                  }}
                />
              </div>
            </div>
            <GiftPreview
              productImage={productImage}
              productName={productName}
              wrapping={selectedWrapping}
              card={selectedCard}
              message={value?.message}
            />
          </div>
        </div>
      )}
    </div>
  );
}
