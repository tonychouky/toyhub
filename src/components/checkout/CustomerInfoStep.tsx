"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export function CustomerInfoStep({
  data,
  errors,
  onChange,
}: {
  data: CustomerInfo;
  errors: Partial<Record<keyof CustomerInfo, string>>;
  onChange: (data: CustomerInfo) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          error={errors.fullName}
          placeholder="Jamie Rivera"
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          error={errors.email}
          placeholder="jamie@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          error={errors.phone}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </div>
    </div>
  );
}
