"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { CustomerInfoStep, CustomerInfo } from "@/components/checkout/CustomerInfoStep";
import { ShippingAddressStep } from "@/components/checkout/ShippingAddressStep";
import { DeliveryMethodStep, DELIVERY_OPTIONS } from "@/components/checkout/DeliveryMethodStep";
import { PaymentStep, PaymentFormData } from "@/components/checkout/PaymentStep";
import { OrderReviewStep } from "@/components/checkout/OrderReviewStep";
import { Address } from "@/types";
import { createOrder } from "@/services/orders";
import { charge, guessCardBrand } from "@/services/payment";
import { getCurrentUser } from "@/services/auth";
import { generateId } from "@/lib/utils";
import { recordPromotionUsage } from "@/services/promotions";
import { calculateGiftOrder, GiftOrderResult } from "@/services/gifts";
import { notifyBuyerOrderConfirmation, notifyGiftRecipient } from "@/services/notifications";
import { trackGiftCheckoutStarted, trackGiftOrderCompleted } from "@/services/analytics";

const TOTAL_STEPS = 5;

export default function CheckoutPage() {
  const { lines, totals, hydrated, clear } = useCart();
  const { value: couponCode, setValue: setCouponCode } = useLocalStorageState<string | null>("toyhub_coupon", null);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [giftOrder, setGiftOrder] = useState<GiftOrderResult | null>(null);
  const hasGiftLines = lines.some((l) => l.item.giftOptions?.wrapped);

  useEffect(() => {
    calculateGiftOrder(lines, couponCode ?? undefined).then(setGiftOrder);
  }, [lines, couponCode]);

  useEffect(() => {
    if (hasGiftLines) trackGiftCheckoutStarted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [customer, setCustomer] = useState<CustomerInfo>({ fullName: "", email: "", phone: "" });
  const [address, setAddress] = useState<Address>({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
  });
  const [deliveryId, setDeliveryId] = useState("standard");
  const [payment, setPayment] = useState<PaymentFormData>({ cardholderName: "", cardNumber: "", expiry: "", cvc: "" });

  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [addressErrors, setAddressErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!;

  const giftFeesTotal = giftOrder?.giftFeesTotal ?? 0;
  const promoDiscount = giftOrder?.discount.amount ?? 0;
  const shipmentGroups = giftOrder?.shipmentGroups ?? [];
  // The buyer's chosen delivery method prices their own package; gift
  // packages to other recipients ship at the standard per-destination rate
  // computed by services/shipments.ts (reused via calculateGiftOrder).
  const buyerGroup = shipmentGroups.find((g) => !g.recipient);
  const recipientGroups = shipmentGroups.filter((g) => g.recipient);
  const buyerShippingCost = buyerGroup && buyerGroup.itemIndexes.length > 0 ? delivery.price : 0;
  const recipientShippingCost = recipientGroups.reduce((sum, g) => sum + g.shippingCost, 0);
  const shipping = giftOrder?.discount.freeShipping ? 0 : buyerShippingCost + recipientShippingCost;
  const finalTotals = {
    ...totals,
    shipping,
    total: Math.max(
      0,
      +(totals.subtotal - totals.discount + shipping + totals.tax + giftFeesTotal - promoDiscount).toFixed(2)
    ),
  };

  if (hydrated && lines.length === 0 && step === 1) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add a few toys to your cart before checking out."
          action={
            <Link href="/shop">
              <Button>Browse Toys</Button>
            </Link>
          }
        />
      </div>
    );
  }

  function validateCustomer(): boolean {
    const errors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!customer.fullName.trim()) errors.fullName = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) errors.email = "Enter a valid email address.";
    if (!customer.phone.trim()) errors.phone = "Phone number is required.";
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateAddress(): boolean {
    const errors: Partial<Record<keyof Address, string>> = {};
    if (!address.line1.trim()) errors.line1 = "Street address is required.";
    if (!address.city.trim()) errors.city = "City is required.";
    if (!address.state.trim()) errors.state = "State is required.";
    if (!/^[A-Za-z0-9\- ]{3,10}$/.test(address.postalCode)) errors.postalCode = "Enter a valid postal code.";
    if (!address.country.trim()) errors.country = "Country is required.";
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validatePayment(): boolean {
    const errors: Partial<Record<keyof PaymentFormData, string>> = {};
    if (!payment.cardholderName.trim()) errors.cardholderName = "Name on card is required.";
    const digits = payment.cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(digits)) errors.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errors.expiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(payment.cvc)) errors.cvc = "Enter a valid CVC.";
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (step === 1 && !validateCustomer()) return;
    if (step === 2 && !validateAddress()) return;
    if (step === 4 && !validatePayment()) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function handlePlaceOrder() {
    setSubmitting(true);
    const chargeResult = await charge(finalTotals.total, {
      cardholderName: payment.cardholderName,
      cardBrandGuess: guessCardBrand(payment.cardNumber),
      last4: payment.cardNumber.replace(/\s/g, "").slice(-4),
    });

    if (!chargeResult.success) {
      setSubmitting(false);
      return;
    }

    const user = await getCurrentUser();
    const order = await createOrder({
      customerId: user?.id ?? `guest_${generateId()}`,
      customerName: customer.fullName,
      customerEmail: customer.email,
      items: lines.map(({ item, product }) => ({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: item.quantity,
        giftOptions: item.giftOptions,
      })),
      subtotal: finalTotals.subtotal,
      shipping: finalTotals.shipping,
      discount: finalTotals.discount,
      tax: finalTotals.tax,
      total: finalTotals.total,
      shippingAddress: { ...address, fullName: customer.fullName, phone: customer.phone },
      deliveryMethod: delivery.label,
      paymentMethod: `${guessCardBrand(payment.cardNumber)} ending in ${payment.cardNumber.replace(/\s/g, "").slice(-4)}`,
      shipmentGroups,
    });

    if (giftOrder?.discount.appliedPromotions.length) {
      await recordPromotionUsage(giftOrder.discount.appliedPromotions.map((p) => p.id));
    }

    await notifyBuyerOrderConfirmation(order);
    for (const group of order.shipmentGroups) {
      if (group.recipient) await notifyGiftRecipient(order, group);
    }
    if (hasGiftLines) trackGiftOrderCompleted(order.id);

    setCouponCode(null);
    clear();
    router.push(`/account/orders/${order.id}?justPlaced=1`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Checkout</h1>
      <CheckoutStepper currentStep={step} />

      <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
        {step === 1 && <CustomerInfoStep data={customer} errors={customerErrors} onChange={setCustomer} />}
        {step === 2 && <ShippingAddressStep data={address} errors={addressErrors} onChange={setAddress} />}
        {step === 3 && <DeliveryMethodStep selected={deliveryId} onChange={setDeliveryId} />}
        {step === 4 && <PaymentStep data={payment} errors={paymentErrors} onChange={setPayment} />}
        {step === 5 && (
          <OrderReviewStep
            lines={lines}
            customer={customer}
            address={address}
            delivery={delivery}
            payment={payment}
            totals={finalTotals}
            wrappings={giftOrder?.wrappings ?? []}
            cards={giftOrder?.cards ?? []}
            giftFeesTotal={giftFeesTotal}
            promoDiscount={promoDiscount}
            appliedPromotions={giftOrder?.discount.appliedPromotions ?? []}
            shipmentGroups={shipmentGroups}
          />
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1 || submitting}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < TOTAL_STEPS ? (
            <Button onClick={handleNext}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handlePlaceOrder} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? "Placing order..." : "Place Order"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
