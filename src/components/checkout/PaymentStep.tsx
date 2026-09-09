"use client";

import { CreditCard, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string; // used only to derive brand + last4 for the mock order; never persisted or sent anywhere
  expiry: string;
  cvc: string;
}

export function PaymentStep({
  data,
  errors,
  onChange,
}: {
  data: PaymentFormData;
  errors: Partial<Record<keyof PaymentFormData, string>>;
  onChange: (data: PaymentFormData) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-2xl bg-ocean-50 p-3 text-xs font-medium text-ocean-700">
        <Lock className="h-4 w-4 shrink-0" />
        This is a demo checkout. No real card numbers are transmitted or stored — this form is a placeholder for a
        future Stripe Elements integration (see services/payment.ts).
      </div>

      <div>
        <Label htmlFor="cardholderName">Name on card</Label>
        <Input
          id="cardholderName"
          value={data.cardholderName}
          onChange={(e) => onChange({ ...data, cardholderName: e.target.value })}
          error={errors.cardholderName}
          placeholder="Jamie Rivera"
        />
      </div>
      <div>
        <Label htmlFor="cardNumber">Card number</Label>
        <div className="relative">
          <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="cardNumber"
            value={data.cardNumber}
            onChange={(e) => onChange({ ...data, cardNumber: e.target.value.replace(/[^\d\s]/g, "") })}
            error={errors.cardNumber}
            placeholder="4242 4242 4242 4242"
            className="pl-11"
            inputMode="numeric"
            maxLength={19}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">Expiry (MM/YY)</Label>
          <Input
            id="expiry"
            value={data.expiry}
            onChange={(e) => onChange({ ...data, expiry: e.target.value })}
            error={errors.expiry}
            placeholder="12/28"
          />
        </div>
        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            value={data.cvc}
            onChange={(e) => onChange({ ...data, cvc: e.target.value.replace(/\D/g, "") })}
            error={errors.cvc}
            placeholder="123"
            inputMode="numeric"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
}
