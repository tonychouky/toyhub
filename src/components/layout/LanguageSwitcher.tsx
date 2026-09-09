"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100",
        className
      )}
      aria-label={t("common.language")}
    >
      <Languages className="h-4 w-4" />
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
