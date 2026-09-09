// services/*.ts are called from both client components (relative fetch works
// fine in the browser) and server components (relative fetch does NOT work
// server-side — there's no implicit origin). This resolves to an absolute
// URL only when running on the server so every service function can keep
// calling fetch(apiUrl("/api/...")) unconditionally.
export function apiUrl(path: string): string {
  if (typeof window !== "undefined") return path;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  return `${base}${path}`;
}
