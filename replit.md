# PDF HUB 24

## Overview
PDF HUB 24 is a comprehensive web-based PDF manipulation platform offering 19 PDF tools organized in 3 categories:

### Convert from PDF (5 tools)
1. **PDF to Word** - Convert PDF to editable DOCX
2. **PDF to JPG** - Convert PDF pages to JPG images
3. **PDF to PNG** - Convert PDF pages to PNG images
4. **PDF to Excel** - Convert PDF tables to XLS spreadsheet
5. **Extract Text** - Extract text content from PDF

### Convert to PDF (4 tools)
6. **Word to PDF** - Convert DOCX to PDF
7. **JPG to PDF** - Convert JPG images to PDF
8. **PNG to PDF** - Convert PNG images to PDF
9. **Excel to PDF** - Convert XLS/XLSX spreadsheet to PDF

### Edit PDF (10 tools)
10. **Merge PDF** - Combine multiple PDFs into one
11. **Split PDF** - Extract specific pages
12. **Compress PDF** - Reduce file size
13. **Rotate PDF** - Rotate pages 90°, 180°, 270°
14. **Delete Pages** - Remove unwanted pages
15. **Protect PDF** - Add password protection
16. **Unlock PDF** - Remove password protection
17. **Add Page Numbers** - Add page numbers to documents
18. **Add Watermark** - Add text watermark to pages
19. **Reorder Pages** - Drag-and-drop page reordering

Features full dark mode support, user settings, localStorage persistence, and professional-grade PDF processing. Homepage displays tools organized by category with visual conversion icons showing source→target formats (colored labels with arrows). Deployed at pdfhub24.com with complete SEO optimization and PDF24-inspired UX patterns.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for bundling, and Wouter for routing. UI components are built with Radix UI primitives and shadcn/ui, styled using Tailwind CSS, following a "Clean Modern Utility Design" aesthetic. The application supports dark mode, user settings, and a consistent layout across all tool and trust pages. State management relies on local React state, `localStorage` for theme and settings persistence, and TanStack Query for server state. Code splitting is implemented using `React.lazy()` for performance.

### Backend Architecture
The backend is built with Express.js and TypeScript. PDF processing is handled server-side using libraries like `pdf-lib-with-encrypt` (for core PDF manipulation and encryption), `sharp` (image processing), `pdf-img-convert` (PDF to image), `docx` (PDF to Word), `mammoth` (Word to PDF), `pdf-parse` (text extraction), and `archiver` (ZIP creation). File uploads are managed by Multer with in-memory storage, including magic byte and MIME type validation. All API endpoints (`/api/merge`, `/api/split`, `/api/compress`, etc.) are secured with Zod schema validation for request parameters and comprehensive error handling.

### Data Storage
The application currently uses `localStorage` for client-side persistence of theme preferences and user settings. There is no active persistent database, though Drizzle ORM and NeonDB are configured for future PostgreSQL integration, with schema definitions in `shared/schema.ts`. In-memory storage is used for transient user data during sessions.

### UI/UX Decisions
The design emphasizes a "Clean Modern Utility Design" with a vibrant color scheme. It includes TrustBadges and RelatedTools components on all tool pages to enhance user trust and discoverability, inspired by PDF24. Homepage improvements include a "How It Works" section and "Why Choose PDF HUB 24?" feature cards. Comprehensive SEO content, including "About Our Tool," "How to Use," "Key Benefits," and FAQs, is integrated into each tool page.

### Technical Implementations
Key technical implementations include:
- **Performance Optimization**: Image optimization with WebP, code splitting with `React.lazy()`, asynchronous Google Fonts loading, and deferred Google Analytics.
- **Security**: Magic byte validation for file uploads, comprehensive error handling, and Zod schema validation for all request parameters.
- **SEO**: Dynamic meta tags via `useSEO` hook, `sitemap.xml`, and `robots.txt` for Google Search Console integration.
- **Conversion Quality**: Advanced PDF to Word conversion with intelligent formatting (headers, tables, lists, quotes, code blocks), and improved PDF to JPG conversion with high-resolution output and ZIP archiving for multi-page PDFs.
- **User Settings**: Dark mode toggle and a settings panel for managing default compression levels with `localStorage` persistence.

## External Dependencies

### Third-party Services
- **Google Fonts CDN**: For typography (Inter font family).
- **CloudConvert API**: Integrated for high-quality PDF to Word conversions, with a fallback mechanism.

### Key NPM Packages
- **PDF Processing**: `pdf-lib-with-encrypt`, `pdf-img-convert`, `pdf-parse`, `docx`, `mammoth`, `sharp`, `archiver`.
- **Frontend UI**: `@radix-ui/`, `@tanstack/react-query`, `wouter`.
- **Backend**: `express`, `multer`, `zod`.
- **Database (Future)**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`.
- **Development Tools**: `typescript`, `vite`, `tsx`.