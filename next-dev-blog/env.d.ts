declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_MICROSOFT_CLARITY?: string;
    /** Public blog API base (browser + server fallback). */
    readonly NEXT_PUBLIC_API_URL?: string;
    /** Server-only: Nest `backend-service` base URL for admin BFF. */
    readonly BLOG_API_URL?: string;
    /** Server-only: must match Nest `ADMIN_TOKEN` for `x-admin-token`. */
    readonly ADMIN_TOKEN?: string;
    /** Server-only: password for `/admin/login` form. */
    readonly BLOG_ADMIN_PASSWORD?: string;
    /** Server-only: HMAC secret for signed admin session cookie. */
    readonly BLOG_ADMIN_SESSION_SECRET?: string;
  }
}
