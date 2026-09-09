import { GiftWrappingManager } from "@/components/admin/GiftWrappingManager";

export default function NewGiftWrappingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Add Gift Paper</h1>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <GiftWrappingManager kind="wrapping" />
      </div>
    </div>
  );
}
