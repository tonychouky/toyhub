"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Heart, ShoppingCart, User, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { categories } from "@/data/categories";
import { SearchBar } from "@/components/products/SearchBar";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totals, hydrated: cartHydrated } = useCart();
  const { ids: wishlistIds, hydrated: wishlistHydrated } = useWishlist();
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.shop"), href: "/shop" },
    { label: t("nav.occasions"), href: "/occasions" },
    { label: t("nav.giftServices"), href: "/gift-services" },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.promotions"), href: "/promotions" },
    { label: t("nav.about"), href: "/about" },
  ];

  const cartCount = cartHydrated ? totals.itemCount : 0;
  const wishlistCount = wishlistHydrated ? wishlistIds.length : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      {/* Top announcement bar */}
      <div className="hidden bg-gray-900 py-2 text-center text-xs font-medium text-white sm:block">
        <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-sunny-400" />
        Free shipping on orders over $50 — no code needed
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile hamburger */}
        <button
          className="-ml-2 rounded-full p-2 hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-1.5" aria-label="ToyHub home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white">
            T
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-gray-900">
            Toy<span className="text-brand-500">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search */}
        <div className="hidden flex-1 max-w-md lg:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher className="hidden sm:flex" />

          <button
            className="rounded-full p-2.5 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5 text-gray-700" />
          </button>

          <IconLink href="/wishlist" label={t("nav.wishlist")} count={wishlistCount}>
            <Heart className="h-5 w-5" />
          </IconLink>

          <IconLink href="/cart" label={t("nav.cart")} count={cartCount}>
            <ShoppingCart className="h-5 w-5" />
          </IconLink>

          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-full border-2 border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 sm:flex"
          >
            <User className="h-4 w-4" /> {t("nav.account")}
          </Link>
          <Link href="/account" className="rounded-full p-2.5 hover:bg-gray-100 sm:hidden" aria-label={t("nav.account")}>
            <User className="h-5 w-5 text-gray-700" />
          </Link>
        </div>
      </div>

      {/* Mobile search row */}
      {mobileSearchOpen && (
        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
          <SearchBar autoFocus onNavigate={() => setMobileSearchOpen(false)} />
        </div>
      )}

      {/* Mobile drawer nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-card-hover animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-extrabold text-gray-900">
                Toy<span className="text-brand-500">Hub</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}

              <p className="mt-4 px-3 text-xs font-bold uppercase tracking-wide text-gray-400">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {cat.name}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  {t("nav.account")}
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  {t("nav.wishlist")}
                </Link>
                <LanguageSwitcher className="justify-start" />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="relative rounded-full p-2.5 hover:bg-gray-100" aria-label={`${label}${count ? `, ${count} items` : ""}`}>
      {children}
      {count > 0 && (
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white animate-pop"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
