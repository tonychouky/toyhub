"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Boxes, LogOut, Store, Tag, Gift, CalendarHeart, Settings } from "lucide-react";
import { logout } from "@/services/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/promotions", label: "Promotions", icon: Tag },
  { href: "/admin/gift-wrapping", label: "Gift Wrapping", icon: Gift },
  { href: "/admin/occasions", label: "Occasions", icon: CalendarHeart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 lg:sticky lg:top-24 lg:h-fit lg:w-56 lg:flex-col lg:overflow-visible"
      aria-label="Admin"
    >
      <div className="hidden items-center gap-2 px-3 py-2 lg:flex">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 text-white">
          <Store className="h-4 w-4" />
        </div>
        <span className="font-display text-sm font-extrabold text-gray-900">Admin</span>
      </div>
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold",
              active ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <link.icon className="h-4 w-4" /> {link.label}
          </Link>
        );
      })}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50"
      >
        <Store className="h-4 w-4" /> View Store
      </Link>
      <button
        onClick={async () => {
          await logout();
          router.push("/login");
        }}
        className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-500"
      >
        <LogOut className="h-4 w-4" /> Log Out
      </button>
    </nav>
  );
}
