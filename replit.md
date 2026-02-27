# PDF HUB 24

## Overview
PDF HUB 24 is a comprehensive web-based platform designed for PDF and image manipulation, offering 43 tools across four main categories: Convert from PDF, Convert to PDF, Edit PDF, and Utility & Image Tools. The platform aims to provide professional-grade document processing, enhance user trust through robust SEO and UX, and offer a wide array of free tools for various PDF and image tasks. Key capabilities include conversion between various formats (e.g., PDF to Word, JPG to PDF), extensive PDF editing (merge, split, compress, protect, sign, annotate, redact), and general image utilities (compress, resize, crop, convert). The business vision is to be a leading, user-friendly, and SEO-optimized solution for everyday document processing needs, inspired by successful platforms like PDF24.

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
- **Performance**: WebP image optimization, code splitting, asynchronous font loading, and deferred analytics.
- **Security**: File upload validation (magic byte, MIME type), comprehensive error handling, and Zod schema validation.
- **SEO**: Dynamic meta tags, `sitemap.xml`, and `robots.txt` integration. Server-side SEO injection via `injectSEO()` in `server/app.ts`.
- **Conversion Quality**: Advanced PDF to Word conversion with intelligent formatting, high-resolution PDF to JPG output.
- **User Settings**: Dark mode toggle and configurable compression levels.
- **Interactive Editing**: Canvas-based editing for tools like Edit PDF, Annotate PDF, and Redact PDF, featuring real-time preview and undo functionality.

## SEO Architecture
- **Server-side meta tags**: `server/seo-config.ts` provides unique title, description, keywords, canonical, OG, Twitter, and robots tags for every page. `injectSEO()` strips existing tags and reinjects correct ones.
- **Structured data**: WebApplication + FAQPage + BreadcrumbList schemas on all 43 tool pages (client-side via `EnhancedToolSEOContent`). WebPage schema server-side. Organization + FAQ schemas on homepage. Article + FAQ schemas on blog pages.
- **Internal linking**: Each tool page links to 8+ related tools and 2+ blog articles via `toolSEOData.ts`. Blog articles contain 3-15+ internal links to tools.
- **Sitemap**: `client/public/sitemap.xml` covers all tools, blogs, categories, and information pages.
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
- **Footer**: Organized by category, limited to top 10 edit-pdf tools and 10 blog articles, includes sitemap link
