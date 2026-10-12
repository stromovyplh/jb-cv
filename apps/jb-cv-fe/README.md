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

You can start editing the page by modifying `app`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Caching

The home page is statically generated and revalidated incrementally (ISR):

- `src/sanity/cache.ts` tags every production Sanity query with `profile` and sets
  `revalidate: 86400`, so the page refreshes at most once per day on its own.
  In development the query runs with `cache: 'no-store'`.
- `app/api/revalidate/route.ts` receives the signed Sanity webhook
  (`SANITY_REVALIDATE_SECRET`) and calls `revalidateTag('profile')`. Next applies
  that invalidation in process memory only, once the webhook response is
  finished, so the route also requests the home page from `after()`. That
  self-request forces the re-render which writes the fresh HTML/RSC payload to
  the file system cache before the hosting process can be recycled.
- `cacheMaxMemorySize: 0` in `next.config.ts` makes the on-disk cache the single
  source of truth, so every Passenger process picks up that regenerated page.

### Environment variables

| Variable                   | Purpose                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`                 | Public origin used for canonical URLs and the cache warm-up request. Defaults to `https://jozef-balint.com`. |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the Sanity webhook signature.                                                              |
