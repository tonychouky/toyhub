// -----------------------------------------------------------------------
// Payment service — placeholder interface only.
//
// This project deliberately does NOT collect or store real card numbers.
// The checkout UI collects only a cardholder name and a self-reported
// "last 4 digits" for display purposes in the mock order confirmation.
//
// To connect a real processor (e.g. Stripe):
//   1. Replace `charge()` below with a call to your backend, which creates
//      a PaymentIntent via the Stripe SDK (server-side, using a secret key
//      that must NEVER be exposed to the client).
//   2. Render Stripe Elements (or Payment Element) in place of the plain
//      <Input> fields in `components/checkout/PaymentStep.tsx` to collect
//      card details directly into Stripe's hosted iframe — card data
//      should never pass through this app's own state or servers.
//   3. Confirm the PaymentIntent client-side with `stripe.confirmPayment()`
//      and pass the resulting status into `charge()`'s result handling.
// -----------------------------------------------------------------------

export interface PaymentDetails {
  cardholderName: string;
  cardBrandGuess: string; // derived from first digit for display only, e.g. "Visa"
  last4: string;
}

export interface ChargeResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

/** Mock charge — always succeeds. Replace with a real PaymentIntent confirmation. */
export async function charge(_amount: number, details: PaymentDetails): Promise<ChargeResult> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    success: true,
    transactionId: `mock_txn_${Date.now()}`,
  };
}

export function guessCardBrand(cardNumber: string): string {
  const first = cardNumber.trim().charAt(0);
  if (first === "4") return "Visa";
  if (first === "5") return "Mastercard";
  if (first === "3") return "Amex";
  if (first === "6") return "Discover";
  return "Card";
}
