import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviewCount,
  size = "sm",
  className,
}: {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const starSize = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(
              starSize,
              n <= Math.round(value) ? "fill-sunny-400 text-sunny-400" : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="sr-only">{value} out of 5 stars</span>
      {reviewCount !== undefined && (
        <span className="text-xs font-medium text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
}
