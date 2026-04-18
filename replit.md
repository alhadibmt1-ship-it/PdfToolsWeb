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
The design focuses on a "Clean Modern Utility Design" with a vibrant color scheme. TrustBadges and RelatedTools, inspired by PDF24, are integrated to enhance user confidence and tool discovery. Each tool page includes SEO-rich content like "About Our Tool," "How to Use," and FAQs.

### Technical Features
- **Performance**: Optimized with WebP images, code splitting, asynchronous font loading, deferred analytics, and preconnect hints.
- **Security**: File upload validation and Zod schema validation.
- **SEO**: Dynamic meta tags, `sitemap.xml`, `robots.txt`, server-side SEO injection, and Hreflang tags for 13 languages.
- **Internationalization**: Support for 13 languages with URL prefix routing, RTL support, and translated URL slugs for Latin-script languages. Full native-language body content and meta tags are provided for all language pages.
- **Conversion Quality**: Advanced PDF to Word conversion and high-resolution PDF to JPG output.
- **Interactive Editing**: Canvas-based editing tools with real-time preview and undo functionality.
- **Pre-render Shell**: Rich static HTML is generated server-side for all page types (tools, blogs, programmatic, category hubs) to optimize initial content delivery for crawlers.
- **Programmatic SEO**: Extensive generation of landing pages based on various parameters (countries, industries, document types) with deep country-specific content uniqueness.

## External Dependencies

### Third-party Services
- **Google Fonts CDN**: For web typography.
- **CloudConvert API**: Used for advanced conversions (PDF to Word, PDF to JPG, PDF to PNG, PDF to PowerPoint, Grayscale PDF, OCR PDF).

### Key NPM Packages
- **PDF Processing**: `pdf-lib`, `pdf-lib-with-encrypt`, `pdf-parse`, `docx`, `mammoth`, `sharp`, `archiver`, `xlsx`.
- **Frontend**: `@radix-ui/`, `@tanstack/react-query`, `wouter`.
- **Backend**: `express`, `multer`, `zod`, `cloudconvert`.
- **Database (Future)**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`.