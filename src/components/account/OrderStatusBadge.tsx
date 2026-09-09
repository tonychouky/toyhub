import { OrderStatus } from "@/types";
import { ORDER_STATUS_LABELS, cn } from "@/lib/utils";

const STATUS_STYLES: Record<OrderStatus, string> = {
  placed: "bg-gray-100 text-gray-700",
  confirmed: "bg-ocean-50 text-ocean-600",
  preparing: "bg-sunny-50 text-sunny-600",
  shipped: "bg-brand-50 text-brand-600",
  out_for_delivery: "bg-berry-50 text-berry-600",
  delivered: "bg-leaf-50 text-leaf-600",
  cancelled: "bg-red-50 text-red-500",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", STATUS_STYLES[status])}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
