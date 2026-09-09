"use client";

import { AuthGuard } from "@/components/account/AuthGuard";
import { AccountSidebar, AddressCard } from "@/components/account/AccountSidebar";

export default function AccountPage() {
  return (
    <AuthGuard>
      {(user) => (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-6 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">My Account</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
            <AccountSidebar />

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-gray-900">Profile</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Name" value={user.name} />
                  <Field label="Email" value={user.email} />
                  <Field label="Account Type" value={user.role === "admin" ? "Administrator" : "Customer"} />
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-gray-900">Saved Addresses</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AddressCard label="Default Shipping" />
                  <AddressCard label="Billing" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
