import { ShieldCheck, Truck, RefreshCcw, Headset } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "Secure Payments", description: "Your data is encrypted end-to-end at checkout." },
  { icon: Truck, title: "Fast Delivery", description: "Most orders arrive within 2-4 business days." },
  { icon: RefreshCcw, title: "Easy Returns", description: "30-day hassle-free returns on every order." },
  { icon: Headset, title: "Customer Support", description: "Real humans, ready to help 7 days a week." },
];

export function TrustSection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-card">
              <item.icon className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-gray-900">{item.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
