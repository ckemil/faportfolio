# uixfathima.com

Fathima's portfolio, rebuilt in Next.js (App Router) from the original Framer site.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

## Edit content

All text, links, projects, stack tools and case-study content live in `lib/data.ts`.
Images are in `public/images`, the footer video in `public/video`.

## Deploy (Vercel)

Push to GitHub, then import the repo at https://vercel.com/new (framework is auto-detected as Next.js).
Add `uixfathima.com` under Project → Settings → Domains and update DNS as Vercel instructs.
