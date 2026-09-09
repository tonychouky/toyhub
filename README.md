# ToyHub

A production-quality online toy store built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui-style primitives. Uses local mock data and LocalStorage for cart/wishlist/orders/auth so it runs fully client-side today, with clean service-layer seams for plugging in a real backend later.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To type-check and lint:

```bash
npm run typecheck
npm run lint
npm run build
```

## Demo accounts

- **Customer**: register any account at `/register`, or just browse as a guest (cart/wishlist work without login; checkout/account require login).
- **Admin**: log in at `/login` with `admin@toyhub.com` / `admin123`, then visit `/admin`.

## Architecture

- `src/types` — shared domain types (Product, Order, Customer, etc.) — the contract the UI is built against.
- `src/data` — static mock catalog/customers/orders.
- `src/services` — the ONLY layer that touches data. Every function (`getProducts`, `createOrder`, `login`, etc.) is written so its **body** can be swapped for real API/database calls without touching any component.
- `src/hooks` — `useCart` / `useWishlist` wrap the services + LocalStorage persistence for React components.
- `src/components` — reusable UI split by domain (products, cart, checkout, account, admin, layout, ui primitives).
- `src/app` — routes, per the spec.

## What's implemented

- Full product catalog (42 products) with barcode field, filtering, sorting, and search (name/brand/category/description/barcode) with suggestions.
- Product detail pages with gallery, specs, reviews, related/also-bought/recently-viewed.
- Cart + wishlist, persisted to LocalStorage, with live totals (subtotal/discount/shipping/tax/total).
- 5-step checkout with validation and a placeholder payment form (no real card storage — swap `services/payment.ts` for Stripe later).
- Mock auth (LocalStorage-backed) with a clean `services/auth.ts` seam for a real provider.
- Order history + order detail with a visual status timeline.
- Admin dashboard: revenue/orders/customers/products stats, low-stock alerts, recent orders.
- Admin products: list, add, edit, delete (persisted via a LocalStorage "overlay" over the mock catalog).
- Admin orders: view all orders, update order status and payment status inline.
- Admin customers: list + order history per customer.
- Admin inventory: stock levels, low-stock/out-of-stock views, inline stock editing.

## Known limitations (mock-data stage)

- All persistence is LocalStorage — clearing browser storage resets everything. There is no real database or multi-device sync.
- Auth is a mock (plaintext password comparison in LocalStorage) — **not secure**, for demo/dev only.
- Payment step is a UI placeholder only; no real card numbers should ever be sent here, and none are stored.
- Barcode "search" matches against the mock catalog's `barcode` field — there's no physical scanner/camera integration wired up (see `services/barcode.ts` for where to add one).
- Images are placeholder URLs (Unsplash/Picsum).

## Connecting a real backend later

Because all data access goes through `src/services/*`, the swap path is:

1. Stand up a real API (REST/GraphQL) + database.
2. Rewrite the bodies of the functions in `services/products.ts`, `services/orders.ts`, `services/customers.ts`, `services/auth.ts`, `services/cart.ts`, `services/payment.ts`, `services/barcode.ts` to call that API instead of mock arrays/LocalStorage.
3. Replace `services/auth.ts` with a real provider (NextAuth, Clerk, Auth0, or custom session/JWT).
4. Replace `services/payment.ts` with real Stripe integration (Payment Intents / Elements).
5. Add a barcode scanning library/camera API and call `services/barcode.ts#getProductByBarcode` with the decoded value.

No component code needs to change for any of this — that's the point of the service boundary.
