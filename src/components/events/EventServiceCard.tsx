import { CheckCircle2 } from "lucide-react";

export function EventServiceCard({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
