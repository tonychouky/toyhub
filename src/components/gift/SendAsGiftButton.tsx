"use client";

import { useEffect, useState } from "react";
import { Gift, X } from "lucide-react";
import { GiftOptions as GiftOptionsType, Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/providers/ToastProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { getStoreSettings } from "@/services/settings";
import { validateRecipient, RecipientErrors } from "@/services/recipients";
import { trackGiftButtonClicked, trackGiftConfigurationStarted } from "@/services/analytics";
import { GiftOptions } from "@/components/gift/GiftOptions";

export function SendAsGiftButton({ product, quantity }: { product: Product; quantity: number }) {
  const [eligible, setEligible] = useState(false);
  const [open, setOpen] = useState(false);
  const [giftOptions, setGiftOptionsState] = useState<GiftOptionsType | undefined>(undefined);
  const [recipientErrors, setRecipientErrors] = useState<RecipientErrors | undefined>(undefined);
  const { addGiftItem } = useCart();
  const { showToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    getStoreSettings().then((settings) => {
      const categoryOk = settings.eligibleCategories.length === 0 || settings.eligibleCategories.includes(product.category);
      setEligible(settings.sendAsGiftEnabled && product.isGiftable !== false && categoryOk);
    });
  }, [product]);

  if (!eligible) return null;

  function handleOpen() {
    trackGiftButtonClicked(product.id);
    trackGiftConfigurationStarted(product.id);
    setGiftOptionsState({ wrapped: true, sendAsGift: true, revealSenderName: true });
    setRecipientErrors(undefined);
    setOpen(true);
  }

  function handleConfirm() {
    if (giftOptions?.sendAsGift) {
      const { valid, errors } = validateRecipient(giftOptions.recipient);
      if (!valid) {
        setRecipientErrors(errors);
        return;
      }
    }
    addGiftItem(product.id, quantity, giftOptions!);
    setOpen(false);
    showToast(
      giftOptions?.recipient?.fullName
        ? `Gift for ${giftOptions.recipient.fullName} added to cart 🎁`
        : `${product.name} added as a gift 🎁`
    );
  }

  return (
    <>
      <Button size="lg" variant="outline" className="flex-1" onClick={handleOpen}>
        🎁 {t("gift.sendAsGift")}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-card-hover sm:rounded-3xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-gray-900">
                <Gift className="h-5 w-5 text-brand-500" /> {t("gift.sendAsGift")}
              </h2>
              <button onClick={() => setOpen(false)} aria-label={t("common.close")} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <GiftOptions
              productImage={product.images[0]}
              productName={product.name}
              value={giftOptions}
              onChange={setGiftOptionsState}
              recipientErrors={recipientErrors}
            />

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button type="button" onClick={handleConfirm}>
                Add Gift to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
