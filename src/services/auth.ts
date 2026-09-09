import { AuthUser } from "@/types";

// -----------------------------------------------------------------------
// Auth service — thin fetch wrapper over app/api/auth/*. Real sessions now:
// an httpOnly signed cookie (see src/lib/session.ts), verified server-side.
// getCurrentUser() is necessarily async now (an httpOnly cookie can't be
// read from client JS) — see AuthGuard.tsx / checkout/page.tsx for the two
// call sites that adjusted for that.
// -----------------------------------------------------------------------

async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    return body?.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function register(name: string, email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, "Could not create account."));
  return res.json();
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, "Invalid email or password."));
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const res = await fetch("/api/auth/session");
  if (!res.ok) return null;
  return res.json();
}
