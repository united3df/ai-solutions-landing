/** Trailing newlines/spaces in hosting env UI often break HMAC verify vs sign. */
export function getBlogAdminPassword(): string | undefined {
  const v = process.env.BLOG_ADMIN_PASSWORD?.trim();
  return v || undefined;
}

export function getBlogAdminSessionSecret(): string | undefined {
  const v = process.env.BLOG_ADMIN_SESSION_SECRET?.trim();
  return v || undefined;
}
