"use client";

import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

export type Locale = "en" | "ar";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { value: locale, setValue: setLocale, hydrated } = useLocalStorageState<Locale>("toyhub_locale", "en");
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir, hydrated]);

  return <LocaleContext.Provider value={{ locale, dir, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
