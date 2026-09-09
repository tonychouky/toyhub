import { PromotionManager } from "@/components/admin/PromotionManager";

export default function NewPromotionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Create Promotion</h1>
        <p className="mt-1 text-sm text-gray-500">Configure a new discount, coupon, or offer.</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <PromotionManager />
      </div>
    </div>
  );
}
