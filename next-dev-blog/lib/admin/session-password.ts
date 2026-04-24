import { createHash, timingSafeEqual } from "crypto";

export function verifyAdminPassword(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
