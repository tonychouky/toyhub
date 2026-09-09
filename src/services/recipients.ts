import { Recipient } from "@/types";

// -----------------------------------------------------------------------
// Recipient validation only — recipients are never persisted as reusable
// records (no account, no directory), matching the requirement that a gift
// recipient never needs a ToyHub account. If a real backend later wants a
// "recent recipients" convenience for logged-in buyers, that would be a new
// read/write pair here — this file only validates the shape of the data.
// -----------------------------------------------------------------------

export interface RecipientErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  line1?: string;
  city?: string;
  country?: string;
}

export function validateRecipient(recipient: Partial<Recipient> | undefined): {
  valid: boolean;
  errors: RecipientErrors;
} {
  const errors: RecipientErrors = {};
  if (!recipient?.fullName?.trim()) errors.fullName = "Recipient name is required.";
  if (!recipient?.phone?.trim()) errors.phone = "Recipient phone is required.";
  if (recipient?.email && !/^\S+@\S+\.\S+$/.test(recipient.email)) errors.email = "Enter a valid email address.";
  if (!recipient?.address?.line1?.trim()) errors.line1 = "Delivery address is required.";
  if (!recipient?.address?.city?.trim()) errors.city = "City is required.";
  if (!recipient?.address?.country?.trim()) errors.country = "Country is required.";
  return { valid: Object.keys(errors).length === 0, errors };
}
