"use client";

import { Truck, Zap, Home } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

export interface DeliveryOption {
  id: string;
  label: string;
  description: string;
  price: number;
  icon: "standard" | "express" | "pickup";
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", label: "Standard Shipping", description: "Arrives in 4-6 business days", price: 5.99, icon: "standard" },
  { id: "express", label: "Express Shipping", description: "Arrives in 1-2 business days", price: 14.99, icon: "express" },
  { id: "pickup", label: "Store Pickup", description: "Ready today at your nearest ToyHub location", price: 0, icon: "pickup" },
];

const ICONS = { standard: Truck, express: Zap, pickup: Home };

export function DeliveryMethodStep({ selected, onChange }: { selected: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      {DELIVERY_OPTIONS.map((option) => {
        const Icon = ICONS[option.icon];
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors",
              isSelected ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
            )}
            aria-pressed={isSelected}
          >
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", isSelected ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500")}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-gray-900">{option.label}</p>
              <p className="text-xs text-gray-500">{option.description}</p>
            </div>
            <span className="font-display text-sm font-extrabold text-gray-900">
              {option.price === 0 ? "Free" : formatPrice(option.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
