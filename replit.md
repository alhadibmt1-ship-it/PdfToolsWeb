# PDF HUB 24

## Overview
PDF HUB 24 is a comprehensive web-based platform offering 49 tools for PDF and image manipulation across four categories: Convert from PDF, Convert to PDF, Edit PDF, and Utility & Image Tools. Its primary purpose is to provide a user-friendly, professional-grade solution for document processing, emphasizing robust SEO and UX to build user trust. The platform aims to be a leading, SEO-optimized solution for everyday document needs, offering extensive conversion, editing, and utility features.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend uses React 18 with TypeScript, Vite, Wouter for routing, Radix UI, and shadcn/ui. Styling is managed with Tailwind CSS, adhering to a "Clean Modern Utility Design." It includes dark mode, user settings persistence via `localStorage`, and state management with React's local state and TanStack Query. Performance is enhanced through code splitting.

### Backend
The backend is built with Express.js and TypeScript. PDF processing uses `pdf-lib-with-encrypt` for encryption and `pdf-lib` for other operations. Multer handles file uploads with in-memory storage, including magic byte and MIME type validation. Zod is used for API schema validation and error handling.

### Data Storage
Client-side user preferences and theme settings are stored in `localStorage`. For future persistent data, Drizzle ORM and NeonDB are configured for PostgreSQL.

### UI/UX Design
The design focuses on a "Clean Modern Utility Design" with a vibrant color scheme. TrustBadges, RelatedTools, and CountrySpotlight are integrated to enhance user confidence and tool discovery. CountrySpotlight shows top-20 country-specific landing page links on /compress, /merge, /pdf-to-word, /sign-pdf, and /protect-pdf. Each tool page includes SEO-rich content like "About Our Tool," "How to Use," and FAQs. The /sign-pdf page includes a legal validity section covering US ESIGN, EU eIDAS, and UK eIDAS regulations.
- **Tool Icons**: All tool icons use unique per-tool color schemes (ToolIcon.tsx, ConversionIcon in HomePage.tsx, RelatedTools.tsx) — e.g. compress=orange, merge=blue, split=purple, lock=red, unlock=green, ocr=teal, etc. — replacing the former uniform blue.
- **MobileQuickActions**: Bottom mobile nav bar has 6 items (compress, merge, pdf-to-word, pdf-to-jpg, split, "More"/all-tools).
- **ScrollToTop**: Floating back-to-top button (ChevronUp, appears after 400px scroll, hidden on mobile below 400px, uses `bottom-20` so it clears the mobile bottom nav).
- **SocialProofSection**: Redesigned stats (50K+ Users, 1M+ PDFs, 49+ Tools, 99% Success) with large count-up animation; testimonial cards with colored left borders, avatar initials, mixed ratings (Jennifer K. = 4 stars), Trustpilot link; dynamic live counter (60–200 range).
- **Breadcrumbs**: Blue link colors, bold current-page label.
- **Hero Upload Box**: Larger (max-w-xl, py-4 px-5), gradient background, stronger dashed border, gradient icon container.

### Technical Features
- **Performance**: Optimized with WebP images, code splitting, asynchronous font loading, deferred analytics, and preconnect hints.
- **Security**: File upload validation and Zod schema validation.
- **SEO**: Dynamic meta tags, `sitemap.xml`, `robots.txt`, server-side SEO injection, and Hreflang tags for 13 languages. All 49 tool pages have unique OG images via `/api/og-image/{slug}`. Blog posts use dynamic OG images with correct Article schema image URL. sitemap-tools.xml excludes 158 redirect URLs and includes daily lastmod dates. Static sitemap.xml lastmod dates updated to 2026-04-22.
- **Internationalization**: Support for 13 languages with URL prefix routing, RTL support, and translated URL slugs for Latin-script languages. Full native-language body content and meta tags are provided for all language pages. `toolContentTranslations.ts` provides complete translated content (about, use cases, tutorial, FAQs, troubleshooting, security) for all 12 non-English languages (es, ar, hi, fr, pt, de, zh, ja, id, ru, it, ur) — each with unique regional context (RGPD/DSGVO/LGPD/PIPL/DPDPA/APPI/UU-PDP/FZ-152 references, local document examples), wired into `EnhancedToolSEOContent.tsx` giving ~90-95% translation coverage on all language tool pages.
- **Content Differentiation**: `toolCategoryContent.ts` maps all 49 tools into 8 categories (compress, merge_split, pdf_to_editable, pdf_to_image, to_pdf, security, edit, ocr_extract) with unique use-case items (6 per category) and troubleshooting entries (2 per category) in all 12 non-English languages. `EnhancedToolSEOContent.tsx` overrides the per-language use-case and troubleshooting content with category-specific content, ensuring tools in different categories on the same language have meaningfully distinct body content (reducing duplication from ~85% to ~55%). Route duplicate-key warnings for translated slugs also fixed. TOOL_CATEGORY_MAP includes both canonical IDs (e.g. 'compress-pdf') and short-form aliases used by pages (e.g. 'compress', 'merge', 'split', 'rotate', 'pdf-to-powerpoint', 'powerpoint-to-pdf', 'pdf-to-pdfa') so category content resolves correctly for all tools.
- **Conversion Quality**: Advanced PDF to Word conversion and high-resolution PDF to JPG output.
- **Interactive Editing**: Canvas-based editing tools with real-time preview and undo functionality.
- **Pre-render Shell**: Rich static HTML is generated server-side for all page types (tools, blogs, programmatic, category hubs) to optimize initial content delivery for crawlers.
- **Invalid Blog Slug Protection**: Unknown `/blog/:slug` paths (not in blogData) automatically receive `noindex, nofollow` robots directive to prevent thin content indexing.
- **Unknown Page noindex**: Any English path not matched by seoConfig, toolSEOData, blog slugs, or programmatic patterns gets `noindex, nofollow` + hreflang suppressed — prevents garbage/typo URLs from being indexed as soft 404s. `/tools/` paths are always treated as programmatic (never soft-404d).
- **Cache-Control Headers**: HTML pages: `public, max-age=3600, stale-while-revalidate=86400`; sitemaps/robots: 12-hour; JS/CSS: 1-year immutable; images: 7-day.
- **GSC Verification**: Set `GOOGLE_SITE_VERIFICATION` env var to automatically inject the Google Search Console meta verification tag site-wide.
- **Programmatic SEO**: Extensive generation of landing pages based on various parameters (countries, industries, document types) with deep country-specific content uniqueness.
  - COUNTRY_RICH system provides local portals, document names, compliance laws, and cities for 170 countries (Tier-2 compliance upgraded to named laws: DPDPA 2023, APPs 1988, PIPEDA, PDPA 2010, NDPR, Kenya DPA 2019, Egypt DPA No.151/2020, etc.)
  - 4 structural content variants per page type (slugVariant hash determines which variant)
  - 5th content variant (industry angle) for top-20 countries via slugVariant5() + industryAngleContent() — COUNTRY_INDUSTRIES map provides sector context per country
  - secPara() helper: 5 structurally distinct data-security closing paragraphs (eliminates template fingerprint)
  - rotateSecPara(): ~20% of pages open with the secPara paragraph instead of closing — breaks "always-last" structural fingerprint
  - faqYes() helper: 6 varied FAQ answer openers (eliminates uniform "Yes." pattern)
  - faqQ1() helper: 6 structurally distinct FAQ Q1 question patterns — wired into all 11 tool generators + 3 country page generators; edit-pdf previously used banned pattern (fixed T007)
  - toolCount() helper: 6 varied phrasings of "49+ free tools" (eliminates repetition)
  - NOINDEX_COUNTRY_SLUGS: 35 low-volume countries skipped from genCountryPages + genCountryToolPages
  - COUNTRY_SPECIFIC_FAQS: 24-country native-language FAQ map (France RGPD, Spain LOPDGDD, Italy Codice Privacy, South Korea PIPA, Poland RODO, Argentina Ley 25.326, Turkey KVKK, Thailand PDPA added — all in native language) appended to all 11 tool FAQ arrays + 3 country page FAQ arrays
  - COUNTRY_DOC_SCENARIOS: 24-country × up-to-11-tool specific doc scenario map; replaces use-case bullet[0] in generator for top countries (T008: added France, South Korea, Spain, Italy, Poland, Argentina, Turkey, Thailand in native language)
  - TOP_20_COUNTRY_SLUGS: Set of 20 high-volume countries targeted for enhanced content (5th variant, specific FAQs, doc scenarios)
  - compress-pdf-online-{c} differentiated as "browser vs. desktop software" (4 angles: cost, any-device, IT-restriction, infrequent-use)
  - free-pdf-tools-{c} differentiated as "cost-comparison vs. paid tools" (vs. Adobe/Smallpdf paid tiers)

## External Dependencies

### Third-party Services
- **Google Fonts CDN**: For web typography.
- **CloudConvert API**: Used for advanced conversions (PDF to Word, PDF to JPG, PDF to PNG, PDF to PowerPoint, Grayscale PDF, OCR PDF).

### Key NPM Packages
- **PDF Processing**: `pdf-lib`, `pdf-lib-with-encrypt`, `pdf-parse`, `docx`, `mammoth`, `sharp`, `archiver`, `xlsx`.
- **Frontend**: `@radix-ui/`, `@tanstack/react-query`, `wouter`.
- **Backend**: `express`, `multer`, `zod`, `cloudconvert`.
- **Database (Future)**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`.