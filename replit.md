# PDF Master Tools

## Overview

PDF Master Tools is a web-based PDF utility application that provides 11 different PDF manipulation tools. Users can merge, split, compress, convert (PDF↔JPG, PDF→Word), protect, unlock, rotate PDFs, delete pages, and extract text. The application is built with a React frontend using TypeScript and Vite, and an Express backend with Node.js. All PDF processing occurs on the server using libraries like pdf-lib, sharp, pdfjs-dist, and docx.

## Recent Changes

**November 23, 2025 - Backend Security Hardening**
- Added magic byte (file signature) validation for all PDF and image uploads to prevent MIME type spoofing
- Implemented comprehensive error handling with try-catch blocks around all library parsing operations
- All parsing failures now return controlled 400 errors instead of crashing with 500 errors
- Added Zod schema validation for all request parameters (page ranges, rotation angles, compression levels, passwords)
- Configured separate multer middleware for PDF uploads (uploadPdf) and image uploads (uploadImages)
- Registered Express error handler middleware after routes to properly catch upload and validation errors
- All 11 API endpoints now follow secure validation pattern: MIME filter → magic bytes → zod params → wrapped parsing

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
- Homepage with grid of 11 PDF tools
- Individual tool pages for each PDF operation
- Shared layout components (Header, Footer, FileUploadZone, ProcessingState)
- Each tool page follows the same pattern: file upload → process → download result

**State Management**
- Local React state for file uploads and UI interactions
- No global state management (Redux/Zustand) - keeping it simple
- React Query handles server data fetching and caching

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Separate entry points for development (index-dev.ts) and production (index-prod.ts)
- Development mode uses Vite middleware for HMR
- Production mode serves static files from dist/public

**PDF Processing Libraries**
- pdf-lib: Core PDF manipulation (merge, split, rotate, password protection)
- sharp: Image processing and optimization
- pdfjs-dist with canvas: PDF to image conversion
- docx: PDF to Word conversion
- pdf-parse: Text extraction
- archiver: Creating ZIP files for batch downloads

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
- Document Conversion: docx, sharp, archiver
- Frontend UI: @radix-ui/*, @tanstack/react-query
- Backend: express, multer, drizzle-orm, @neondatabase/serverless
- Validation: zod
- Build Tools: vite, esbuild, tsx

**Development Tools**
- TypeScript for type safety across the stack
- Replit-specific plugins for development environment
- ESM modules throughout (type: "module" in package.json)