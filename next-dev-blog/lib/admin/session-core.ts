export const SESSION_COOKIE_NAME = "blog_admin_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const enc = new TextEncoder();

function utf8ToBase64Url(s: string): string {
  const bytes = enc.encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUtf8(s: string): string {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const base64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function arrayBufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToArrayBuffer(s: string): ArrayBuffer {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const base64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function signAdminSession(secret: string): Promise<string> {
  const payload = { v: 1 as const, exp: Date.now() + SESSION_TTL_MS };
  const payloadB64 = utf8ToBase64Url(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
  const sigB64 = arrayBufferToBase64Url(sigBuf);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(
  token: string,
  secret: string,
): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  let payload: { v?: number; exp?: number };
  try {
    payload = JSON.parse(base64UrlToUtf8(payloadB64)) as {
      v?: number;
      exp?: number;
    };
  } catch {
    return false;
  }
  if (payload.v !== 1 || typeof payload.exp !== "number") return false;
  if (payload.exp < Date.now()) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  let sig: ArrayBuffer;
  try {
    sig = base64UrlToArrayBuffer(sigB64);
  } catch {
    return false;
  }
  return crypto.subtle.verify("HMAC", key, sig, enc.encode(payloadB64));
}

export function sessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}
