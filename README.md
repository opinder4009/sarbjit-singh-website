# Personal brand site — mortgage advisor

A cinematic, scroll-driven personal brand site built with Next.js and GSAP ScrollTrigger.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before launch

- Fill in your real name, title, brokerage, NMLS number, state, and email in [`lib/brand.ts`](lib/brand.ts).
- Replace the bracketed `[X]` placeholders in the `stats` array with real, verifiable numbers — this is a regulated industry, so performance claims should be accurate.
- Wire [`app/api/contact/route.ts`](app/api/contact/route.ts) to an actual email/CRM provider (e.g. Resend, SendGrid) — right now it only logs submissions server-side.
- Review the footer disclosure in `lib/brand.ts` with your compliance process for your state(s).
- The "My Journey" story and timeline (`journeyBody`, `journeyTimeline` in `lib/brand.ts`) are placeholder copy about stepping away in 2021 and returning — replace with your real story.
- The Lifestyle page (`lifestyleBlocks` in `lib/brand.ts`) reuses the two existing portrait photos as placeholders — swap in real lifestyle photography.
- The three posts in `lib/posts.ts` are placeholder blog content — replace with real posts, or clear the array to show an empty blog.

## Structure

- `components/NavBar.tsx` — global black site navigation (Lifestyle, My Journey, Blogs, Book Appointment), used in `app/layout.tsx` on every page.
- `components/Hero.tsx` — the signature moment: a pinned, scroll-scrubbed 3D dolly-in on the hero video.
- `components/StatTicker.tsx` — ambient scrolling stat marquee.
- `components/CloseProcess.tsx` — the four-step closing process, paired with the seated portrait.
- `components/Specialties.tsx` — loan types handled.
- `components/ContactSection.tsx` — inline lead form, posts to `/api/contact`.
- `components/PageBanner.tsx` / `components/BookCta.tsx` — shared header and call-to-action band used across the Lifestyle, My Journey and Blogs pages.
- `app/my-journey/page.tsx`, `app/lifestyle/page.tsx`, `app/blogs/page.tsx`, `app/blogs/[slug]/page.tsx` — the pages linked from the nav.
- `lib/brand.ts` — all editable copy and identity details in one place.
- `lib/posts.ts` — blog post content.
