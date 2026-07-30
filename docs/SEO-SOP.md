# PDF HUB 24 — SEO Standard Operating Procedures

This document exists because a multi-round audit of this site found the same
handful of bug patterns repeatedly, in new places, every time a "final" sweep
was done. These SOPs exist to stop them recurring, not as generic best-practice
theory — every rule below traces back to a real bug found on this exact site.

---

## Before every deploy

**Run the link checker.** It's wired into `npm run build` automatically now
(`npm run check-links` to run it standalone). If it fails, fix the broken
links before deploying — don't skip it. This single script would have caught
every broken-link regression found across this entire project, including ones
hiding in `index.html`'s static fallback content and three separate scattered
"all tools" arrays in `server/seo-config.ts`.

**Run the real build, not just the type-checker.** `tsc --noEmit` catching
zero *new* errors does NOT mean the site will deploy successfully — a
duplicate object key is a valid-enough TypeScript pattern to pass type-checking
in some configurations but will hard-fail the actual `esbuild`/`vite` bundle
step. This exact gap caused hours of silent failed deployments earlier in this
project. Always confirm with `npm run build` from a clean `dist/` before
considering any SEO-adjacent change "done."

---

## Adding a new tool page

1. Add the tool to `shared/schema.ts`'s `PDF_TOOLS` array — **the `path`
   field must exactly match the real registered route in `App.tsx`**, not an
   internal shorthand id. (Found and fixed: `merge`, `split`, `compress`,
   `rotate` had `path: "/merge"` etc. instead of `/merge-pdf` — this was used
   as the real link in the site-wide footer, mobile menu, and search, on
   every page, until fixed.)
2. Register the route in `App.tsx`.
3. Add a full entry to `client/src/data/toolSEOData.ts` — a tool with no
   entry here renders **no SEO content at all** (the component returns
   `null`). Found 4 real, live tools in exactly this state.
4. Add the tool to its correct category hub in `categoryHubData.ts`. A tool
   missing from every hub gets zero pillar-page link equity.
5. Run `npm run check-links` before considering it complete.

## Removing a tool, page, or blog post

Removing content is higher-risk than adding it, because references scatter.
Checklist, based on what actually went wrong when content was removed this
project:
1. Search the **entire codebase**, not just the obvious data file, for the
   slug/path being removed. It will likely appear in more places than
   expected — this project found the same removed blog post referenced in
   `blogData.ts` (expected), `server/seo-config.ts`'s `ALL_BLOGS` array
   (not expected), and a hardcoded copy in `client/index.html`'s static
   fallback content (also not expected, and only discovered because it was
   removed in a *later* round than the last scan of that file).
2. Remove the sitemap entries (check for language-prefixed duplicates too —
   one removed blog post had 13 sitemap entries across languages).
3. Add a 301 redirect for the removed URL rather than letting it 404 — in
   case Google already indexed it or external links point to it.
4. Run `npm run check-links`.

## When a "duplicate content" or "id vs. path" bug shows up once, check for it elsewhere

The single root cause — an internal tool "id" (`merge`, `compress`) being
confused with the real URL path (`/merge-pdf`, `/compress-pdf`) — caused
**four separate, independently-discovered bugs** across this project: broken
sitemap entries for translated pages, broken hreflang tags, the site-wide
footer/nav link bug, and incorrect server-side pre-rendered content. If a
similar mismatch is found in one place, grep the whole codebase for the same
tool ids before assuming it's an isolated fix.

## Content integrity

Never leave content live that promises a feature that doesn't exist. This
project found and removed a complete, well-written how-to blog post for a
"Remove Background" tool that was never built — a genuinely serious
trust/bounce problem, not a cosmetic one. Before publishing any content
(blog post, FAQ, feature claim), confirm the tool/feature it references is
real and reachable.

Never use fabricated trust signals (fake review counts, fake ratings,
unearned certification claims). This project removed a hardcoded
`4.9★ / 3,200 reviews` schema block present identically on every single tool
page — a real Google structured-data policy risk. Don't replace it with a
different fabricated number; only add real review data once it exists.

## Verify claims against the actual enforced behavior

Before stating a limit, capability, or claim in user-facing copy (file size
limits, supported languages, processing speed), check what the server
actually enforces, not what a previous version of the copy said. This project
found the site claiming a "100MB" file limit in FAQs across all 12 languages
while the server enforced 50MB — active misinformation a user would hit at
the exact moment of failure.

---

## Recurring checks (run periodically, not just once)

- `npm run check-links` — before every deploy, no exceptions
- Title length audit (50-60 char target) — after any bulk content change
- Meta description duplicate check — after any bulk content change
- Sitemap `lastmod` accuracy — update only for pages that genuinely changed;
  a sitemap where every URL shares one identical date is a signal Google may
  disregard as unreliable
- Full internal-link validation (routes + blog slugs + `/tools/` long-tail
  slugs) — catches typos too, since a typo'd URL simply won't match any
  valid target

## What this project could NOT fix with code, and why

- **Domain trust / backlinks** — earned over time through real external
  signals, not fixable by editing files. A 2024 domain in a saturated
  "free PDF tools" niche competing against sites with a decade of accumulated
  trust (iLovePDF, Smallpdf) will always be at a structural disadvantage here.
- **E-E-A-T specifics** (real company info, real author bios, real
  certifications) — these require genuine facts from the business, not
  content that merely looks credible. Fabricating them would repeat the
  exact fake-reviews mistake this project already corrected.
- **Google's indexing decision and timeline** — no one can guarantee this,
  including any SEO consultant who claims otherwise.
