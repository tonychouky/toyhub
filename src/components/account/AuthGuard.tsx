"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getCurrentUser } from "@/services/auth";
import { AuthUser } from "@/types";

/**
 * Client-side route guard. Redirects to /login if there's no valid session
 * cookie (checked via GET /api/auth/session, since an httpOnly cookie can't
 * be read directly from client JS).
 */
export function AuthGuard({ children, requireAdmin = false }: { children: (user: AuthUser) => React.ReactNode; requireAdmin?: boolean }) {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    getCurrentUser().then((current) => {
      if (cancelled) return;
      if (!current || (requireAdmin && current.role !== "admin")) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      setUser(current);
    });
    return () => {
      cancelled = true;
    };
  }, [router, pathname, requireAdmin]);

  if (user === undefined) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    );
  }
  if (!user) return null;

  return <>{children(user)}</>;
}
