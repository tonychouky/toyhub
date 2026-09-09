import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Customer Info", "Shipping", "Delivery", "Payment", "Review"];

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-4">
      {STEPS.map((label, i) => {
        const stepNumber = i + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                isComplete ? "bg-leaf-500 text-white" : isActive ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-400"
              )}
            >
              {isComplete ? <Check className="h-3.5 w-3.5" /> : stepNumber}
            </span>
            <span className={cn("text-xs font-semibold sm:text-sm", isActive ? "text-gray-900" : "text-gray-400")}>
              {label}
            </span>
            {stepNumber < STEPS.length && <span className="mx-1 h-px w-4 bg-gray-200 sm:w-8" />}
          </li>
        );
      })}
    </ol>
  );
}
