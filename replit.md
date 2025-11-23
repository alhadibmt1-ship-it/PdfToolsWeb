# PDF Master Tools

## Overview

PDF Master Tools is a web-based PDF utility application that provides 12 different PDF manipulation tools. Users can merge, split, compress, convert (PDF↔JPG, PDF↔Word), protect, unlock, rotate PDFs, delete pages, and extract text. The application features complete dark mode support, user settings for compression preferences, and uses localStorage for persistence without requiring a database. The application is built with a React frontend using TypeScript and Vite, and an Express backend with Node.js. All PDF processing occurs on the server using libraries like pdf-lib, sharp, pdfjs-dist, mammoth, and docx.

## Recent Changes

**November 23, 2025 - Feature Expansion & Technical Improvements**
- Added Dark Mode toggle with system preference fallback and localStorage persistence using ThemeProvider context
- Created User Settings panel (SettingsDialog) for managing default compression level preferences
- Added Word to PDF conversion tool (12th tool) using mammoth library for DOCX parsing with proper pagination
- Refactored all 12 conversion pages to use centralized `useConversionProgress` hook for progress management
- Fixed progress interval cleanup to prevent memory leaks - intervals now properly cleared on both success and error paths
- Improved Word file validation to accept only DOCX files (matching mammoth library capability)
- Added specific multer filter for Word uploads with precise MIME type validation

**November 23, 2025 - Backend Security Hardening**
- Added magic byte (file signature) validation for all PDF and image uploads to prevent MIME type spoofing
- Implemented comprehensive error handling with try-catch blocks around all library parsing operations
- All parsing failures now return controlled 400 errors instead of crashing with 500 errors
- Added Zod schema validation for all request parameters (page ranges, rotation angles, compression levels, passwords)
- Configured separate multer middleware for PDF, image, and Word file uploads
- Registered Express error handler middleware after routes to properly catch upload and validation errors
- All 12 API endpoints now follow secure validation pattern: MIME filter → magic bytes → zod params → wrapped parsing

**November 23, 2025 - Password Protection & Conversion Quality Improvements**
- Replaced pdf-lib with pdf-lib-with-encrypt fork to enable proper password encryption/decryption support
- Fixed password protect endpoint to use correct encryption API with full permissions control
- Fixed password unlock endpoint to properly decrypt password-protected PDFs
- Verified PDF to JPG already creates ZIP files (confirmed implementation using archiver library)
- Improved PDF to Word conversion with intelligent text formatting:
  - Detects and formats headers (short lines, all-caps text) with bold styling and larger fonts
  - Preserves bullet points and numbered lists with proper indentation
  - Smart paragraph detection based on sentence endings and line characteristics
  - Better spacing between paragraphs, headers, and list items
- Optimized pdf-parse module loading with module-level caching to prevent repetitive dynamic imports

**November 23, 2025 - Major PDF to Word & PDF to JPG Enhancements**
- Enhanced PDF to Word conversion with professional-grade formatting:
  - **Page number filtering**: Automatically skips page numbers and footer/header text
  - **Table detection**: Recognizes multi-column data (3+ spaces) and formats as aligned table rows
  - **Multi-level headers**: ALL CAPS text formatted as H1 (32pt bold), titles as H2 (28pt bold)
  - **Nested bullets**: Detects indented sub-bullets with proper hierarchy (level 0 and level 1)
  - **Quote blocks**: Formats quoted text with italics, indentation, and left border
  - **Code blocks**: Detects code-like content and formats with Courier New monospace font
  - **Smart paragraph merging**: Joins lines intelligently based on sentence endings and context
  - **Professional spacing**: Proper margins (1 inch all sides) and line spacing throughout
  - **Text size consistency**: All body text at 22pt for better readability
- Improved PDF to JPG conversion:
  - **Single-page PDFs**: Returns direct PNG image file (not ZIP) for convenience
  - **Multi-page PDFs**: Returns ZIP archive with descriptive filename showing page count
  - High-resolution output (2000x2000px) for quality preservation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (New York style variant)
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants
- Design follows "Clean Modern Utility Design" approach (inspired by Dropbox/Google Drive)

**Page Structure**
- Homepage with grid of 12 PDF tools
- Individual tool pages for each PDF operation
- Shared layout components (Header, Footer, FileUploadZone, ProcessingState)
- Each tool page follows the same pattern: file upload → process → download result
- Dark mode toggle in header with ThemeToggle component
- Settings dialog accessible from header

**State Management**
- Local React state for file uploads and UI interactions
- ThemeProvider context for dark mode state with localStorage persistence
- SettingsContext for user preferences (compression levels) with localStorage persistence
- useConversionProgress custom hook for centralized progress management across all conversion tools
- No global state management (Redux/Zustand) - keeping it simple
- React Query handles server data fetching and caching

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Separate entry points for development (index-dev.ts) and production (index-prod.ts)
- Development mode uses Vite middleware for HMR
- Production mode serves static files from dist/public

**PDF Processing Libraries**
- pdf-lib-with-encrypt: Core PDF manipulation with encryption support (merge, split, rotate, password protection/unlocking)
- sharp: Image processing and optimization
- pdf-img-convert: PDF to image conversion (replaced pdfjs-dist)
- docx: PDF to Word conversion with intelligent formatting
- mammoth: Word (DOCX) to PDF conversion via text extraction
- pdf-parse: Text extraction with proper v2 API (PDFParse class)
- archiver: Creating ZIP files for batch downloads (used in PDF to JPG)

**File Upload Handling**
- Multer middleware for multipart form data
- File type validation (PDF and image files)
- Memory storage (files not persisted to disk)
- Multiple file uploads supported for merge and image-to-PDF operations

**API Endpoints Pattern**
- POST /api/merge - Merge multiple PDFs
- POST /api/split - Split PDF by page range
- POST /api/compress - Reduce PDF file size
- POST /api/pdf-to-jpg - Convert PDF pages to images (returns ZIP)
- POST /api/jpg-to-pdf - Convert images to single PDF
- POST /api/pdf-to-word - Convert PDF to DOCX
- POST /api/word-to-pdf - Convert DOCX to PDF (DOCX only, uses mammoth)
- POST /api/protect - Add password protection
- POST /api/unlock - Remove password protection
- POST /api/rotate - Rotate all pages
- POST /api/delete-pages - Remove specific pages
- POST /api/extract-text - Extract text content

**Validation**
- Zod schemas for request validation (compressionLevelSchema, rotationAngleSchema, etc.)
- Type-safe validation shared between frontend and backend via @shared/schema.ts

### Data Storage

**Current Implementation**
- In-memory storage (MemStorage class) for user data
- localStorage for client-side persistence:
  - Theme preference (light/dark mode)
  - User settings (default compression level)
- No persistent database currently in use
- Database schema defined in shared/schema.ts for future PostgreSQL integration
- Drizzle ORM configured but not actively used

**Database Configuration**
- Drizzle Kit configured for PostgreSQL migrations
- NeonDB serverless driver included in dependencies
- Schema location: shared/schema.ts
- Migration output directory: ./migrations

**Session Management**
- Express session setup in code
- connect-pg-simple package included for PostgreSQL session storage (currently unused)

### External Dependencies

**Third-party Services**
- Google Fonts CDN: Inter font family for typography
- No external API integrations for PDF processing (all server-side)

**Key NPM Packages**
- PDF Processing: pdf-lib, pdfjs-dist, pdf-parse, canvas
- Document Conversion: docx, mammoth, sharp, archiver
- Frontend UI: @radix-ui/*, @tanstack/react-query
- Backend: express, multer, drizzle-orm, @neondatabase/serverless
- Validation: zod
- Build Tools: vite, esbuild, tsx

**Development Tools**
- TypeScript for type safety across the stack
- Replit-specific plugins for development environment
- ESM modules throughout (type: "module" in package.json)