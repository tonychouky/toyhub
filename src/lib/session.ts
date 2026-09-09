import crypto from "crypto";
import { AuthUser } from "@/types";

// Minimal signed session token (HMAC-SHA256), no JWT library needed for a
// payload this small. Format: base64url(payload json) + "." + base64url(hmac).
// AUTH_SECRET must be set server-side only (never exposed to the client) —
// see .env.local. Verifying tampers-with/expired tokens both fail closed
// (return null), same as an invalid/missing session.

const SESSION_COOKIE = "toyhub_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

interface SessionPayload extends AuthUser {
  exp: number; // unix seconds
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return secret;
}

function base64url(input: Buffer): string {
  return input.toString("base64url");
}

export function createSessionToken(user: AuthUser): string {
  const payload: SessionPayload = { ...user, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS };
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const signature = base64url(crypto.createHmac("sha256", getSecret()).update(payloadB64).digest());
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined): AuthUser | null {
  if (!token) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = base64url(crypto.createHmac("sha256", getSecret()).update(payloadB64).digest());
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString()) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    const { exp: _exp, ...user } = payload;
    return user;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;
