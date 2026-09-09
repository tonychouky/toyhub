import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "sale" | "new" | "outOfStock" | "success" | "info";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-900 text-white",
  sale: "bg-berry-500 text-white",
  new: "bg-leaf-500 text-white",
  outOfStock: "bg-gray-200 text-gray-600",
  success: "bg-leaf-50 text-leaf-600",
  info: "bg-ocean-50 text-ocean-600",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
