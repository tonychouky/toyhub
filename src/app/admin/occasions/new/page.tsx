import { OccasionManager } from "@/components/admin/OccasionManager";

export default function NewOccasionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Add Occasion</h1>
        <p className="mt-1 text-sm text-gray-500">Create a new seasonal or celebration occasion.</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <OccasionManager />
      </div>
    </div>
  );
}
