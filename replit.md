# PDF HUB 24

## Overview
PDF HUB 24 is a comprehensive web-based platform designed for PDF and image manipulation, offering 49 tools across four main categories: Convert from PDF, Convert to PDF, Edit PDF, and Utility & Image Tools. The platform aims to provide professional-grade document processing, enhance user trust through robust SEO and UX, and offer a wide array of free tools for various PDF and image tasks. Key capabilities include conversion between various formats (e.g., PDF to Word, JPG to PDF), extensive PDF editing (merge, split, compress, protect, sign, annotate, redact), and general image utilities (compress, resize, crop, convert). The business vision is to be a leading, user-friendly, and SEO-optimized solution for everyday document processing needs, inspired by successful platforms like PDF24.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React 18 with TypeScript, Vite for bundling, and Wouter for routing. UI components leverage Radix UI primitives and shadcn/ui, styled with Tailwind CSS, adhering to a "Clean Modern Utility Design" aesthetic. Features include full dark mode support, user settings, and `localStorage` for theme and settings persistence. State management is primarily local React state and TanStack Query for server state. Performance is optimized with `React.lazy()` for code splitting.

### Backend Architecture
The backend is implemented with Express.js and TypeScript. PDF processing utilizes a dual-library approach with `pdf-lib-with-encrypt` for encryption-specific tasks and standard `pdf-lib` for all other PDF operations. File uploads are handled by Multer with in-memory storage, incorporating magic byte and MIME type validation. All API endpoints are secured with Zod schema validation and robust error handling.

### Data Storage
Client-side persistence for user preferences and theme settings is managed via `localStorage`. For future persistent data needs, Drizzle ORM and NeonDB are configured, with schema definitions in `shared/schema.ts`, indicating a planned transition to PostgreSQL.

### UI/UX Decisions
The design philosophy is "Clean Modern Utility Design" with a vibrant color scheme. The platform incorporates TrustBadges and RelatedTools on all tool pages, drawing inspiration from PDF24, to build user confidence and facilitate tool discovery. The homepage includes sections like "How It Works" and "Why Choose PDF HUB 24?". Each tool page is rich with SEO content, such as "About Our Tool," "How to Use," "Key Benefits," and FAQs.

### Technical Implementations
Key technical features include:
- **Performance**: WebP image optimization, code splitting, asynchronous font loading (media=print trick), deferred analytics, and `preconnect` hints for Google Fonts (googleapis.com + gstatic.com with crossorigin) to reduce LCP latency.
- **Security**: File upload validation (magic byte, MIME type), comprehensive error handling, and Zod schema validation.
- **SEO**: Dynamic meta tags, `sitemap.xml`, and `robots.txt` integration. Server-side SEO injection via `injectSEO()` in `server/app.ts`. Hreflang tags (13 languages + x-default) injected server-side on every page.
- **International SEO**: 13-language support (en, es, ar, hi, fr, pt, de, zh, ja, id, ru, it, ur) with URL prefix routing (`/es/`, `/ar/`, `/de/`, `/ur/` etc.) via Wouter's `base` prop. RTL support for Arabic and Urdu via html `dir` attribute. `LanguageSwitcher` (Globe dropdown), `LanguageBanner` (browser language detection), and `LanguageContext` components. Server-side `injectSEO()` sets `html lang/dir` and uses **self-canonical URLs** for language pages (e.g., `/es/merge` canonical = `pdfhub24.com/es/merge`, not the English URL). `og:url` also self-canonical for language pages.
- **Conversion Quality**: Advanced PDF to Word conversion with intelligent formatting, high-resolution PDF to JPG output.
- **User Settings**: Dark mode toggle and configurable compression levels.
- **Interactive Editing**: Canvas-based editing for tools like Edit PDF, Annotate PDF, and Redact PDF, featuring real-time preview and undo functionality.

### International SEO Architecture
- **Language files**: `client/src/lib/languages.ts` — 13-language config with labels, native labels, hreflang codes, and RTL flags
- **Context**: `client/src/contexts/LanguageContext.tsx` — reads lang from URL path, sets `html lang` and `dir` attributes reactively
- **Components**: `client/src/components/LanguageSwitcher.tsx` (Globe dropdown, desktop + mobile), `client/src/components/LanguageBanner.tsx` (browser language detection with sessionStorage dismissal)
- **Routing**: `client/src/App.tsx` uses `WouterRouter` with `base={/lang}` for non-English paths; English uses root router
- **Server-side**: `server/seo-config.ts` `stripLangPrefix()` strips lang prefix before config lookup; `generateMetaTags()` uses **self-canonical** for language pages (lang !== "en" → canonical = `/${lang}${canonicalPath}`); `injectSEO()` sets `html lang/dir` (RTL for both Arabic AND Urdu) and injects 13 hreflang tags per page
- **Sitemap**: `client/public/sitemap.xml` — 1,131 URLs covering all 49 tools, 25 blogs, 5 category hubs, 40 programmatic pages, misc pages, + 12 language sections (49 tools + 25 blogs per language). Language homepages use no trailing slash (e.g., `/es` not `/es/`). All tool URLs match App.tsx routes (sign-pdf, protect-pdf, unlock-pdf, add-watermark, grayscale-pdf).

## SEO Architecture
- **Server-side meta tags**: `server/seo-config.ts` provides unique title, description, keywords, canonical, OG, Twitter, and robots tags for every page. `injectSEO()` strips existing tags and reinjects correct ones.
- **Structured data**: WebApplication + FAQPage + BreadcrumbList schemas on all 43 tool pages (client-side via `EnhancedToolSEOContent`). WebPage schema server-side. Organization + FAQ schemas on homepage. Article + FAQ schemas on blog pages.
- **Internal linking**: Each tool page links to 8+ related tools and 2+ blog articles via `toolSEOData.ts`. Blog articles contain 3-15+ internal links to tools.
- **Sitemap**: `client/public/sitemap.xml` covers 1,131 URLs — all tools, blogs, categories, programmatic pages, information pages, and international language alternates.
- **Heading hierarchy**: All pages follow H1→H2→H3 structure with long-tail keyword H1s from `toolSEOData.ts`.
- **AdSense placeholders**: `data-ad-slot` divs on tool pages (top, mid, bottom), blog pages (top, mid, bottom), and homepage (hero, mid, bottom).
- **CTA blocks**: "Start Now - It's Free" buttons on tool pages after tutorial steps and at bottom. Blog pages have mid-article and bottom CTAs.
- **Security trust signals**: SSL, auto-delete, GDPR, privacy/DMCA links on every tool page.

## External Dependencies

### Third-party Services
- **Google Fonts CDN**: For typography.
- **CloudConvert API**: Utilized for high-quality conversions including PDF to Word, PDF to JPG, PDF to PNG, PDF to PowerPoint, PowerPoint to PDF, Grayscale PDF, and OCR PDF.

### Key NPM Packages
- **PDF Processing**: `pdf-lib`, `pdf-lib-with-encrypt`, `pdf-parse`, `docx`, `mammoth`, `sharp`, `archiver`, `xlsx`.
- **Frontend UI**: `@radix-ui/`, `@tanstack/react-query`, `wouter`.
- **Backend**: `express`, `multer`, `zod`, `cloudconvert`.
- **Database (Future)**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`.

## Content
- **25 blog articles** covering tutorials, guides, and tool roundups with internal linking
- **43 tool pages** each with EnhancedToolSEOContent (About, Tutorial, Use Cases, Why Choose, Troubleshooting, Security, FAQs, Internal Links, Blog Links, Workflows)
- **5 category hub pages** (/convert-pdf, /compress-pdf-tools, /edit-pdf-tools, /secure-pdf, /image-tools) — 800+ word intros, tool listings, FAQs, blog links, structured data
- **40 programmatic SEO landing pages** (/tools/:slug) — long-tail keyword pages with unique content, CTAs, FAQs, use cases
- **Trust pages**: /data-security (security practices), /auto-delete (file deletion policy), /pricing (free vs pro)
- **Backlink pages**: /write-for-us (guest post guidelines), /embed (iframe widget generator), /pdf-comparison-chart (6-platform comparison), /pdf-file-formats-guide (10-format reference)
- **Footer**: Organized by category with tool category hub links, company links including pricing/security/write-for-us/embed/comparison/formats, popular tools, utility tools, and blog articles
- **Sitemap**: 1,131 URLs covering all tools, blogs, categories, trust pages, linkable assets, programmatic SEO pages, and international language alternates

### Data Files
- `client/src/data/categoryHubData.ts` — 5 category hub configurations with tools, FAQs, blogs
- `client/src/data/programmaticSeoData.ts` — 40 long-tail SEO page configurations
- `client/src/data/toolSEOData.ts` — SEO content for all 43 tool pages
- `client/src/data/blogData.ts` — 25 blog article configurations
