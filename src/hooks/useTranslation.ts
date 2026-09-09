"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type Dictionary = Record<string, unknown>;

const DICTIONARIES: Record<string, Dictionary> = { en, ar };

function lookup(dict: Dictionary, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : undefined;
}

/**
 * Nested-key translation lookup (e.g. t("nav.shop")) with English fallback.
 * `vars` does simple {placeholder} interpolation, e.g. t("gift.charactersRemaining", { count: 12 }).
 */
export function useTranslation() {
  const { locale, dir, setLocale } = useLocale();

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, string | number>) => {
      const raw = lookup(DICTIONARIES[locale], key) ?? lookup(DICTIONARIES.en, key) ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce((str, [name, val]) => str.replace(`{${name}}`, String(val)), raw);
    };
  }, [locale]);

  return { t, locale, dir, setLocale };
}
