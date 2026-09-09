"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Recipient } from "@/types";
import { RecipientErrors } from "@/services/recipients";
import { useTranslation } from "@/hooks/useTranslation";

const EMPTY_RECIPIENT: Recipient = {
  fullName: "",
  phone: "",
  email: "",
  address: { line1: "", line2: "", city: "", area: "", postalCode: "", country: "" },
};

export function GiftRecipientForm({
  value,
  onChange,
  errors,
}: {
  value?: Recipient;
  onChange: (recipient: Recipient) => void;
  errors?: RecipientErrors;
}) {
  const { t } = useTranslation();
  const recipient = value ?? EMPTY_RECIPIENT;

  function update(patch: Partial<Recipient>) {
    onChange({ ...recipient, ...patch });
  }

  function updateAddress(patch: Partial<Recipient["address"]>) {
    onChange({ ...recipient, address: { ...recipient.address, ...patch } });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{t("gift.recipient")}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="recipientFullName">Recipient full name</Label>
          <Input
            id="recipientFullName"
            value={recipient.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            error={errors?.fullName}
            placeholder="Sarah Ahmad"
          />
        </div>
        <div>
          <Label htmlFor="recipientPhone">Recipient phone</Label>
          <Input
            id="recipientPhone"
            type="tel"
            value={recipient.phone}
            onChange={(e) => update({ phone: e.target.value })}
            error={errors?.phone}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="recipientEmail">Recipient email (optional)</Label>
          <Input
            id="recipientEmail"
            type="email"
            value={recipient.email ?? ""}
            onChange={(e) => update({ email: e.target.value })}
            error={errors?.email}
            placeholder="sarah@example.com"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="recipientLine1">Delivery address</Label>
          <Input
            id="recipientLine1"
            value={recipient.address.line1}
            onChange={(e) => updateAddress({ line1: e.target.value })}
            error={errors?.line1}
            placeholder="123 Maple Street"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="recipientLine2">Apartment/unit (optional)</Label>
          <Input
            id="recipientLine2"
            value={recipient.address.line2 ?? ""}
            onChange={(e) => updateAddress({ line2: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="recipientCity">City</Label>
          <Input
            id="recipientCity"
            value={recipient.address.city}
            onChange={(e) => updateAddress({ city: e.target.value })}
            error={errors?.city}
          />
        </div>
        <div>
          <Label htmlFor="recipientArea">Area (optional)</Label>
          <Input
            id="recipientArea"
            value={recipient.address.area ?? ""}
            onChange={(e) => updateAddress({ area: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="recipientPostalCode">Postal code (where applicable)</Label>
          <Input
            id="recipientPostalCode"
            value={recipient.address.postalCode ?? ""}
            onChange={(e) => updateAddress({ postalCode: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="recipientCountry">Country</Label>
          <Input
            id="recipientCountry"
            value={recipient.address.country}
            onChange={(e) => updateAddress({ country: e.target.value })}
            error={errors?.country}
          />
        </div>
      </div>
    </div>
  );
}
