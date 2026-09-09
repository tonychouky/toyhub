import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  accent = "brand",
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: "brand" | "berry" | "ocean" | "leaf" | "sunny";
  hint?: string;
}) {
  const accentClasses: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    berry: "bg-berry-50 text-berry-600",
    ocean: "bg-ocean-50 text-ocean-600",
    leaf: "bg-leaf-50 text-leaf-600",
    sunny: "bg-sunny-50 text-sunny-600",
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", accentClasses[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
