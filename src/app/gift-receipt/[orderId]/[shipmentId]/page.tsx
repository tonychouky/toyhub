import Image from "next/image";
import { notFound } from "next/navigation";
import { Gift } from "lucide-react";
import { getOrderById } from "@/services/orders";
import { getGiftCardById, getGiftWrappingById } from "@/services/gift-options";

interface Props {
  params: { orderId: string; shipmentId: string };
}

export const metadata = { title: "Your Gift" };

export default async function GiftReceiptPage({ params }: Props) {
  const order = await getOrderById(params.orderId);
  if (!order) notFound();
  const shipment = order.shipmentGroups.find((g) => g.id === params.shipmentId);
  if (!shipment || !shipment.recipient) notFound();

  const items = shipment.itemIndexes.map((i) => order.items[i]).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-card">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white">
            T
          </span>
          <span className="font-display text-xl font-extrabold text-gray-900">
            Toy<span className="text-brand-500">Hub</span>
          </span>
        </div>

        <div className="mt-6 flex items-center gap-2 text-brand-600">
          <Gift className="h-5 w-5" />
          <h1 className="font-display text-xl font-extrabold">You&apos;ve received a gift!</h1>
        </div>
        <p className="mt-1 text-sm text-gray-500">Hi {shipment.recipient.fullName}, someone sent you something special.</p>

        <ul className="mt-6 flex flex-col divide-y divide-gray-100">
          {await Promise.all(
            items.map(async (item) => {
              const wrapping = item.giftOptions?.wrappingId ? await getGiftWrappingById(item.giftOptions.wrappingId) : null;
              const card = item.giftOptions?.cardId ? await getGiftCardById(item.giftOptions.cardId) : null;
              return (
                <li key={item.productId} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      {wrapping && <p className="text-xs text-gray-500">{wrapping.name}</p>}
                    </div>
                  </div>
                  {card && (
                    <div className="relative ml-16 h-16 w-28 overflow-hidden rounded-lg border border-gray-100">
                      <Image src={card.image} alt={card.name} fill sizes="112px" className="object-cover" />
                    </div>
                  )}
                  {item.giftOptions?.message && (
                    <p className="ml-16 text-sm italic text-gray-600">&ldquo;{item.giftOptions.message}&rdquo;</p>
                  )}
                  {item.giftOptions?.revealSenderName && (
                    <p className="ml-16 text-xs text-gray-400">— {order.customerName}</p>
                  )}
                </li>
              );
            })
          )}
        </ul>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-xs text-gray-500">
          Need to return or exchange an item? Reach out to hello@toyhub.example within 30 days of delivery with your
          gift reference below and we&apos;ll help you out — no receipt or price information needed.
        </div>
        <p className="mt-3 text-center text-[11px] text-gray-400">Gift reference {order.id}-{shipment.id}</p>
      </div>
    </div>
  );
}
