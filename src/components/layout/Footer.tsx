import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white">
                T
              </span>
              <span className="font-display text-xl font-extrabold text-gray-900">
                Toy<span className="text-brand-500">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Toys, gifts, celebrations, and event services — delivered to your door.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-card hover:text-brand-500"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-brand-600">Toys</Link></li>
              <li><Link href="/gift-services" className="hover:text-brand-600">Gifts</Link></li>
              <li><Link href="/shop?sort=newest" className="hover:text-brand-600">New Arrivals</Link></li>
              <li><Link href="/shop?sort=best-selling" className="hover:text-brand-600">Best Sellers</Link></li>
              <li><Link href="/promotions" className="hover:text-brand-600">Promotions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">Occasions</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/occasions/christmas" className="hover:text-brand-600">Christmas</Link></li>
              <li><Link href="/occasions/birthday" className="hover:text-brand-600">Birthday</Link></li>
              <li><Link href="/occasions/easter" className="hover:text-brand-600">Easter</Link></li>
              <li><Link href="/occasions/new-year" className="hover:text-brand-600">New Year</Link></li>
              <li><Link href="/occasions" className="hover:text-brand-600">All Occasions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">Gift Services</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/gift-services" className="hover:text-brand-600">Gift Wrapping</Link></li>
              <li><Link href="/gift-services" className="hover:text-brand-600">Gift Cards</Link></li>
              <li><Link href="/gift-services" className="hover:text-brand-600">Gift Ideas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">Events</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-brand-600">Event Services</Link></li>
              <li><Link href="/events/request" className="hover:text-brand-600">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-brand-600">About</Link></li>
              <li><a href="#" className="hover:text-brand-600">Contact</a></li>
              <li><a href="#" className="hover:text-brand-600">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-600">Terms</a></li>
              <li><a href="#" className="hover:text-brand-600">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ToyHub, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" /> hello@toyhub.example
          </p>
        </div>
      </div>
    </footer>
  );
}
