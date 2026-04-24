This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Blog API and admin

Public blog pages load posts from the Nest app in [`../backend-service`](../backend-service) (default `http://localhost:3001`). Admin UI lives at `/admin` (password login) and proxies writes through same-origin `/api/admin/*` using a server-side `ADMIN_TOKEN`.

Set for local development (example):

```bash
# next-dev-blog (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
BLOG_API_URL=http://localhost:3001
ADMIN_TOKEN=your-shared-secret-with-nest
BLOG_ADMIN_PASSWORD=choose-a-login-password
BLOG_ADMIN_SESSION_SECRET=long-random-string-for-cookie-signing
```

`ADMIN_TOKEN` must match `ADMIN_TOKEN` in `backend-service` and must be **ASCII-only** (no Cyrillic in the value); otherwise `fetch` will throw when setting the `x-admin-token` header. Add the blog site origin to `CORS_ORIGINS` in the Nest env if the browser calls the API directly (public reads); admin mutations use the Next BFF and do not need CORS for `/api/admin/*`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
