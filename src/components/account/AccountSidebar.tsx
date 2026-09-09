"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, Heart, MapPin, LogOut, Gift } from "lucide-react";
import { logout } from "@/services/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/gifts", label: "My Gifts", icon: Gift },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 lg:flex-col lg:overflow-visible" aria-label="Account">
      {LINKS.map((link) => {
        const active = pathname === link.href;
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

export function AddressCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <div className="mb-1 flex items-center gap-1.5 text-gray-400">
        <MapPin className="h-3.5 w-3.5" />
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm text-gray-600">No saved address yet. Add one at checkout to save it here.</p>
    </div>
  );
}
