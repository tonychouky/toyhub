"use client";

import { AuthGuard } from "@/components/account/AuthGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin>
      {() => (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            <AdminSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
