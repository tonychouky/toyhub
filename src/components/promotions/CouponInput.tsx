"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { validateCoupon, CouponResult } from "@/services/promotions";
import { useTranslation } from "@/hooks/useTranslation";

export function CouponInput({
  appliedCode,
  onApplied,
  onRemove,
}: {
  appliedCode?: string | null;
  onApplied: (result: CouponResult & { code: string }) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    const result = await validateCoupon(code);
    setLoading(false);
    if (!result.valid) {
      setError(result.reason ?? t("promotions.invalidCoupon"));
      return;
    }
    onApplied({ ...result, code: code.trim().toUpperCase() });
    setCode("");
  }

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-leaf-50 px-4 py-3 text-sm font-semibold text-leaf-600">
        <span className="flex items-center gap-1.5">
          <Tag className="h-4 w-4" /> {t("promotions.couponApplied")}: {appliedCode}
        </span>
        <button onClick={onRemove} aria-label="Remove coupon" className="text-leaf-600 hover:text-leaf-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t("promotions.couponCode")}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        <Button type="button" variant="secondary" onClick={handleApply} disabled={loading}>
          {t("promotions.applyCoupon")}
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
