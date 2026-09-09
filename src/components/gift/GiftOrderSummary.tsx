import { MapPin, Gift } from "lucide-react";
import { ShipmentGroup } from "@/types";
import { CartLineLike } from "@/services/promotions";
import { formatPrice } from "@/lib/utils";

export interface DestinationSummary {
  line1: string;
  city: string;
  country: string;
}

export function GiftOrderSummary({
  shipmentGroups,
  lines,
  buyerAddress,
}: {
  shipmentGroups: (Omit<ShipmentGroup, "status"> & { status?: ShipmentGroup["status"] })[];
  lines: CartLineLike[];
  buyerAddress: DestinationSummary;
}) {
  if (shipmentGroups.length <= 1) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        Ships in {shipmentGroups.length} packages
      </p>
      {shipmentGroups.map((group, idx) => (
        <div key={group.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              {group.recipient ? <Gift className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> : <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />}
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Shipment {idx + 1} — {group.recipient ? `Gift for ${group.recipient.fullName}` : "You"}
                </p>
                <p className="text-xs text-gray-500">
                  {group.recipient
                    ? `${group.recipient.address.line1}, ${group.recipient.address.city}, ${group.recipient.address.country}`
                    : buyerAddress.line1
                      ? `${buyerAddress.line1}, ${buyerAddress.city}, ${buyerAddress.country}`
                      : "Your address (added at checkout)"}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-semibold text-gray-600">
              {group.shippingCost === 0 ? "Free shipping" : formatPrice(group.shippingCost)}
            </span>
          </div>
          <ul className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
            {group.itemIndexes.map((i) => {
              const line = lines[i];
              if (!line) return null;
              return (
                <li key={line.item.id} className="flex justify-between text-xs text-gray-600">
                  <span>
                    {line.product.name} × {line.item.quantity}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
