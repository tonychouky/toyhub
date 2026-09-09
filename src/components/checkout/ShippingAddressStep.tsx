"use client";

import { Address } from "@/types";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function ShippingAddressStep({
  data,
  errors,
  onChange,
}: {
  data: Address;
  errors: Partial<Record<keyof Address, string>>;
  onChange: (data: Address) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="line1">Street address</Label>
        <Input
          id="line1"
          value={data.line1}
          onChange={(e) => onChange({ ...data, line1: e.target.value })}
          error={errors.line1}
          placeholder="123 Maple Street"
          autoComplete="address-line1"
        />
      </div>
      <div>
        <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
        <Input
          id="line2"
          value={data.line2 ?? ""}
          onChange={(e) => onChange({ ...data, line2: e.target.value })}
          autoComplete="address-line2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" value={data.city} onChange={(e) => onChange({ ...data, city: e.target.value })} error={errors.city} autoComplete="address-level2" />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" value={data.state} onChange={(e) => onChange({ ...data, state: e.target.value })} error={errors.state} autoComplete="address-level1" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">ZIP / Postal code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => onChange({ ...data, postalCode: e.target.value })}
            error={errors.postalCode}
            autoComplete="postal-code"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" value={data.country} onChange={(e) => onChange({ ...data, country: e.target.value })} error={errors.country} autoComplete="country-name" />
        </div>
      </div>
    </div>
  );
}
