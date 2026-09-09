import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-ocean-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20 lg:px-8">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-600 shadow-soft">
            <Sparkles className="h-3.5 w-3.5" /> New arrivals every week
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Their Next{" "}
            <span className="relative inline-block text-brand-500">
              Favorite Toy
              <svg
                className="absolute -bottom-2 left-0 w-full text-sunny-400"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 9C50 2 150 2 198 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-gray-600">
            Discover toys that inspire creativity, learning, and endless fun.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-600">
                Shop Toys <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/shop?deals=1">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:-translate-y-0.5 hover:bg-gray-900 hover:text-white">
                Explore Deals
              </span>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <div>
              <p className="font-display text-2xl font-extrabold text-gray-900">40+</p>
              <p>Toy categories</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="font-display text-2xl font-extrabold text-gray-900">4.8★</p>
              <p>Average rating</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="font-display text-2xl font-extrabold text-gray-900">2-day</p>
              <p>Fast shipping</p>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-4xl bg-white shadow-card-hover sm:aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80"
              alt="Colorful building blocks and toys arranged playfully"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rotate-[-6deg] rounded-3xl bg-white p-4 shadow-card-hover sm:block">
            <p className="font-display text-sm font-bold text-gray-900">🚚 Free shipping over $50</p>
          </div>
          <div className="absolute -right-4 -top-4 hidden rotate-6 rounded-2xl bg-sunny-400 px-4 py-2 shadow-card-hover sm:block">
            <p className="font-display text-sm font-extrabold text-gray-900">Up to 30% off</p>
          </div>
        </div>
      </div>
    </section>
  );
}
