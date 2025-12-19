# PDF HUB 24

## Overview
PDF HUB 24 is a comprehensive web-based PDF and image manipulation platform offering 43 tools organized in 4 categories:

### Convert from PDF (8 tools)
1. **PDF to Word** - Convert PDF to editable DOCX
2. **PDF to JPG** - Convert PDF pages to JPG images
3. **PDF to PNG** - Convert PDF pages to PNG images
4. **PDF to Excel** - Convert PDF tables to XLS spreadsheet
5. **PDF to PowerPoint** - Convert PDF to editable PPT slides
6. **Extract Text** - Extract text content from PDF
7. **Extract Images** - Extract all images from PDF documents
8. **OCR PDF** - Extract text from scanned PDFs with OCR

### Convert to PDF (9 tools)
9. **Word to PDF** - Convert DOCX to PDF
10. **JPG to PDF** - Convert JPG images to PDF
11. **PNG to PDF** - Convert PNG images to PDF
12. **Excel to PDF** - Convert XLS/XLSX spreadsheet to PDF
13. **PowerPoint to PDF** - Convert PPT/PPTX slides to PDF
14. **TIFF to PDF** - Convert TIFF images to PDF
15. **GIF to PDF** - Convert GIF images to PDF
16. **HTML to PDF** - Convert HTML code to PDF documents
17. **WebP to PDF** - Convert WebP images to PDF

### Edit PDF (19 tools)
18. **Merge PDF** - Combine multiple PDFs into one
19. **Split PDF** - Extract specific pages
20. **Compress PDF** - Reduce file size (CloudConvert optimization)
21. **Rotate PDF** - Rotate pages 90°, 180°, 270°
22. **Delete Pages** - Remove unwanted pages
23. **Protect PDF** - Add password protection
24. **Unlock PDF** - Remove password protection
25. **Add Page Numbers** - Add page numbers to documents
26. **Add Watermark** - Add text watermark to pages
27. **Reorder Pages** - Drag-and-drop page reordering
28. **Crop PDF** - Trim margins and remove unwanted whitespace
29. **Resize PDF** - Change PDF page size to A4, Letter, and more
30. **Sign PDF** - Add your signature to PDF documents
31. **Flatten PDF** - Flatten forms and layers into static content
32. **PDF to Grayscale** - Convert PDF to black and white for printing
33. **Repair PDF** - Fix corrupted or damaged PDF files
34. **Edit PDF** - Add text, images, and shapes to PDF
35. **Annotate PDF** - Highlight, underline, and mark up PDFs
36. **Redact PDF** - Permanently black out sensitive information

### Utility & Image Tools (7 tools)
37. **PDF Viewer** - View PDF files directly in your browser
38. **Compare PDF** - Find differences between two PDF files
39. **Image Compressor** - Compress JPG, PNG, and WebP images
40. **Resize Image** - Resize images by pixels or percentage
41. **Crop Image** - Crop images to remove unwanted areas
42. **Rotate & Flip Image** - Rotate or flip images in any direction
43. **Convert Image** - Convert between JPG, PNG, WebP, GIF, TIFF, BMP

Features full dark mode support, user settings, localStorage persistence, and professional-grade PDF processing. Homepage displays tools organized by category with visual conversion icons showing source→target formats (colored labels with arrows). Deployed at pdfhub24.com with complete SEO optimization and PDF24-inspired UX patterns.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for bundling, and Wouter for routing. UI components are built with Radix UI primitives and shadcn/ui, styled using Tailwind CSS, following a "Clean Modern Utility Design" aesthetic. The application supports dark mode, user settings, and a consistent layout across all tool and trust pages. State management relies on local React state, `localStorage` for theme and settings persistence, and TanStack Query for server state. Code splitting is implemented using `React.lazy()` for performance.

### Backend Architecture
The backend is built with Express.js and TypeScript. PDF processing uses a dual-library approach due to dependency conflicts:
- **pdf-lib-with-encrypt**: Used ONLY for encryption operations (Protect PDF, Unlock PDF) - requires pako 1.x
- **pdf-lib (standard)**: Used for all non-encryption operations (Add Page Numbers, Add Watermark, JPG to PDF, PNG to PDF, Word to PDF, Excel to PDF, Edit PDF, Annotate PDF, Redact PDF, TIFF to PDF, GIF to PDF) - compatible with pako 2.x
- **CloudConvert API**: Used for high-quality conversions (PDF to Word, PDF to JPG, PDF to PNG, PDF to PowerPoint, PowerPoint to PDF)
- **Other libraries**: `sharp` (image processing including TIFF/GIF conversion), `docx` (PDF to Word generation), `mammoth` (Word text extraction), `pdf-parse` (text extraction), `archiver` (ZIP creation)

File uploads are managed by Multer with in-memory storage, including magic byte and MIME type validation. All API endpoints are secured with Zod schema validation for request parameters and comprehensive error handling.

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
- **Interactive Editing**: Edit PDF, Annotate PDF, and Redact PDF tools feature interactive canvas-based editing with real-time preview, undo functionality, and ProcessingState feedback.

## External Dependencies

### Third-party Services
- **Google Fonts CDN**: For typography (Inter font family).
- **CloudConvert API**: Used for PDF to Word, PDF to JPG, PDF to PNG, PDF to PowerPoint, and PowerPoint to PDF conversions with high-quality output.

### Key NPM Packages
- **PDF Processing**: `pdf-lib` (standard), `pdf-lib-with-encrypt` (encryption only), `pdf-parse`, `docx`, `mammoth`, `sharp`, `archiver`, `xlsx`.
- **Frontend UI**: `@radix-ui/`, `@tanstack/react-query`, `wouter`.
- **Backend**: `express`, `multer`, `zod`, `cloudconvert`.
- **Database (Future)**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`.
- **Development Tools**: `typescript`, `vite`, `tsx`.

## Blog Section
The site includes a blog content hub for SEO and informational traffic:
- **Blog List Page** (/blog): Grid of article cards with categories, read time, and tags
- **Blog Post Pages** (/blog/:slug): Full articles with SEO optimization
- **5 Initial Articles**:
  1. How to Compress PDF for Email
  2. Convert PDF to Word Without Losing Formatting
  3. How to Merge PDF Files
  4. Password Protect PDF Guide
  5. PDF Tools for Students
- **Internal Linking**: Each article includes primary CTA button to relevant tool + related tools section
- **SEO**: Article schema markup, unique meta tags per article, sitemap entries

## Recent Changes (December 2025)
- **Comprehensive SEO Meta Tag Optimization**: Updated all 43 tool pages with improved meta tags emphasizing "free" keyword placement. Pattern: "[Tool Name] Free Online - [Action] | PDF HUB 24". All descriptions include "free", "best free", "no signup" messaging.
- Added blog section with 10 SEO-optimized articles and internal linking to tools
- Added 7 new PDF tools: PDF to PowerPoint, PowerPoint to PDF, TIFF to PDF, GIF to PDF, Edit PDF, Annotate PDF, Redact PDF
- Added 4 new image tools: Resize Image, Crop Image, Rotate & Flip Image, Convert Image
- Updated PDF compression to use CloudConvert optimize API for real compression
- Added Facebook and YouTube social links to footer
- Updated sitemap.xml with all 43 tool URLs + blog URLs
- Updated homepage and footer to reflect 43+ tools
- All new tools follow established patterns (FileUploadZone, ProcessingState, TrustBadges, RelatedTools, ToolSEOContent)
- Added ToolStructuredData component with FAQPage, HowTo, BreadcrumbList, SoftwareApplication schemas
- Added Organization schema on HomePage (no aggregateRating per Google guidelines)
- Added competitor-inspired trust elements (privacy badges, Trusted by Professionals section)
- **Ahrefs SEO Fixes (Dec 2025)**: Removed fabricated aggregateRating from all structured data, added external links to Wikipedia/ISO/Adobe on all tool pages, fixed meta description lengths under 155 chars, fixed title lengths under 60 chars
