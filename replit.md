# PDF Master Tools

## Overview
PDF Master Tools is a web-based application offering 12 PDF manipulation tools, including merging, splitting, compressing, converting (PDF↔JPG, PDF↔Word), protecting, unlocking, rotating, deleting pages, and extracting text. It features full dark mode support, user settings for compression, and uses localStorage for persistence. The project's ambition is to provide a comprehensive, user-friendly, and secure online PDF utility, aiming for high market potential by offering a robust alternative to existing solutions with a strong focus on user experience and performance.

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