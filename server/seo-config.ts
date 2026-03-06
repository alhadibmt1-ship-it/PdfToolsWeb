export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  schema: object;
}

const BASE_URL = "https://pdfhub24.com";
const OG_IMAGE = "https://pdfhub24.com/og-image.png";

export const seoConfig: Record<string, PageSEO> = {
  "/": {
    title: "43+ Free Online PDF Tools (Fast & Secure) | PDF HUB 24",
    description: "43+ free PDF tools online — merge, split, compress, convert PDF to Word & more. No signup, no watermark, 100% secure. Trusted by millions in 2026.",
    keywords: "PDF tools, PDF converter, merge PDF, split PDF, compress PDF, PDF to Word, free PDF editor",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PDF HUB 24",
      "url": BASE_URL,
      "description": "Free online PDF tools - 43+ tools for converting, editing, and managing PDF files",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  },
  "/merge": {
    title: "Merge PDF Free Online (No Watermark, No Signup) | PDF HUB 24",
    description: "Merge multiple PDF files into one document in seconds. Free online PDF merger — no registration, no watermarks. Drag & drop to combine PDFs instantly.",
    keywords: "merge PDF, combine PDF, join PDF files, PDF merger, merge PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Merge PDF - PDF HUB 24",
      "url": `${BASE_URL}/merge`,
      "description": "Combine multiple PDF files into one document",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/split": {
    title: "Split PDF Free Online (Extract Any Page) | PDF HUB 24",
    description: "Split PDF files and extract specific pages in seconds. Free online PDF splitter — select page ranges or extract single pages. No signup, no watermark.",
    keywords: "split PDF, extract PDF pages, PDF splitter, separate PDF pages, split PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Split PDF - PDF HUB 24",
      "url": `${BASE_URL}/split`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/compress": {
    title: "Compress PDF Free Online — Reduce Size 90% (Fast) | PDF HUB 24",
    description: "Compress PDF files and reduce size by up to 90%. Free online PDF compressor — 3 quality levels. Perfect for email under 25MB. No signup required.",
    keywords: "compress PDF, reduce PDF size, PDF compressor, optimize PDF, shrink PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Compress PDF - PDF HUB 24",
      "url": `${BASE_URL}/compress`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/rotate": {
    title: "Rotate PDF Free Online — Fix Orientation (Instant) | PDF HUB 24",
    description: "Rotate PDF pages 90°, 180°, or 270° clockwise. Free online PDF rotator — fix orientation issues instantly. No watermarks, no signup required.",
    keywords: "rotate PDF, turn PDF pages, PDF rotator, flip PDF, rotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/rotate`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-word": {
    title: "PDF to Word Free (No Email, No Watermark, 100% Secure) | PDF HUB 24",
    description: "Convert PDF to editable Word (DOCX) in seconds. Free PDF to Word converter — no email, no watermark, keeps formatting. Works on all devices.",
    keywords: "pdf to word converter free, convert pdf to word online, pdf to docx free, editable word from pdf, free pdf converter no email, secure pdf to word tool",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Word Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-word`,
      "description": "Convert PDF to editable Word documents for free online",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-jpg": {
    title: "PDF to JPG Free Online (High Quality, No Signup) | PDF HUB 24",
    description: "Convert PDF pages to high-quality JPG images instantly. Free PDF to JPG converter — extract all pages as images. No registration, no watermark.",
    keywords: "PDF to JPG, PDF to image, convert PDF to JPG, PDF to JPEG, PDF to JPG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to JPG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-jpg`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-png": {
    title: "PDF to PNG Free Online (Transparent, High Quality) | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images with transparency. Free PDF to PNG converter — perfect for graphics and presentations. No signup.",
    keywords: "PDF to PNG, convert PDF to PNG, PDF to image, PDF to PNG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PNG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-png`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-excel": {
    title: "PDF to Excel Free (Keep Table Format) | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets (XLS/XLSX) instantly. Free PDF to Excel converter — extract data accurately. No registration, no watermark.",
    keywords: "PDF to Excel, PDF to XLS, convert PDF to Excel, PDF to spreadsheet, PDF to Excel online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Excel Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-excel`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-ppt": {
    title: "PDF to PowerPoint Free (Keeps Slides & Format) | PDF HUB 24",
    description: "Convert PDF to editable PowerPoint (PPT/PPTX) in seconds. Free PDF to PowerPoint converter — preserves slides and formatting. No signup required.",
    keywords: "PDF to PowerPoint, PDF to PPT, convert PDF to PowerPoint, PDF to PPTX, PDF to PowerPoint online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PowerPoint Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-ppt`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/word-to-pdf": {
    title: "Word to PDF Free Online (Keeps Formatting) | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF in seconds. Free Word to PDF converter — preserves formatting perfectly. No signup, no watermark required.",
    keywords: "Word to PDF, DOCX to PDF, convert Word to PDF, Word to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Word to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/word-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/jpg-to-pdf": {
    title: "JPG to PDF Free Online (Combine Multiple Images) | PDF HUB 24",
    description: "Convert JPG images to PDF in seconds. Free JPG to PDF converter — combine multiple photos into one PDF. No signup, no watermark, high quality.",
    keywords: "JPG to PDF, image to PDF, convert JPG to PDF, JPEG to PDF, JPG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "JPG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/jpg-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/png-to-pdf": {
    title: "PNG to PDF Free Online (Keeps Transparency) | PDF HUB 24",
    description: "Convert PNG images to PDF in seconds. Free PNG to PDF converter — maintains transparency and quality. No signup, no watermark required.",
    keywords: "PNG to PDF, convert PNG to PDF, image to PDF, PNG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PNG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/png-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/excel-to-pdf": {
    title: "Excel to PDF Free Online (Keeps Tables & Format) | PDF HUB 24",
    description: "Convert Excel spreadsheets (XLS/XLSX) to PDF in seconds. Free Excel to PDF converter — preserves tables and formatting perfectly. No signup.",
    keywords: "Excel to PDF, XLS to PDF, convert Excel to PDF, XLSX to PDF, Excel to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Excel to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/excel-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/ppt-to-pdf": {
    title: "PowerPoint to PDF Free (Keeps Slides) | PDF HUB 24",
    description: "Convert PowerPoint (PPT/PPTX) to PDF in seconds. Free PPT to PDF converter — preserves slides, images, and layout. No signup, no watermark.",
    keywords: "PowerPoint to PDF, PPT to PDF, convert PowerPoint to PDF, PPTX to PDF, PowerPoint to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PowerPoint to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/ppt-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/protect-pdf": {
    title: "Protect PDF Free — Add Password (AES-256 Encryption) | PDF HUB 24",
    description: "Add password protection to PDF files in seconds. Free PDF encryption tool — AES-256 security, set permissions. No signup, no watermark required.",
    keywords: "protect PDF, encrypt PDF, password protect PDF, secure PDF, PDF encryption online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Protect PDF - PDF HUB 24",
      "url": `${BASE_URL}/protect-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/unlock-pdf": {
    title: "Unlock PDF Free Online (Remove Password Instantly) | PDF HUB 24",
    description: "Remove password protection from PDF files in seconds. Free PDF unlocker — unlock PDFs for editing and printing. Requires your password. No signup.",
    keywords: "unlock PDF, remove PDF password, PDF unlocker, decrypt PDF, unlock PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Unlock PDF - PDF HUB 24",
      "url": `${BASE_URL}/unlock-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/delete-pages": {
    title: "Delete PDF Pages Free Online (Select & Remove) | PDF HUB 24",
    description: "Remove unwanted pages from PDF documents in seconds. Free PDF page remover — select and delete specific pages. No signup, no watermark.",
    keywords: "delete PDF pages, remove PDF pages, PDF page remover, delete pages from PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Delete PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/delete-pages`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/add-page-numbers": {
    title: "Add Page Numbers to PDF Free (Custom Position) | PDF HUB 24",
    description: "Add page numbers to PDF documents in seconds. Free PDF numbering tool — customize position, format, and style. No signup, no watermark.",
    keywords: "add page numbers PDF, PDF page numbers, number PDF pages, page numbering PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Add Page Numbers - PDF HUB 24",
      "url": `${BASE_URL}/add-page-numbers`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/add-watermark": {
    title: "Add Watermark to PDF Free (Text & Custom Style) | PDF HUB 24",
    description: "Add text watermarks to PDF documents in seconds. Free PDF watermark tool — customize text, position, and opacity. No signup, no watermark limits.",
    keywords: "add watermark PDF, PDF watermark, watermark PDF online free, stamp PDF",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Add Watermark - PDF HUB 24",
      "url": `${BASE_URL}/add-watermark`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/reorder-pages": {
    title: "Reorder PDF Pages Free (Drag & Drop) | PDF HUB 24",
    description: "Reorder and rearrange PDF pages with drag & drop. Free PDF page organizer — change page sequence instantly. No signup, no watermark required.",
    keywords: "reorder PDF pages, rearrange PDF, organize PDF pages, sort PDF pages, reorder PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Reorder PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/reorder-pages`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/extract-text": {
    title: "Extract Text from PDF Free (Copy & Download) | PDF HUB 24",
    description: "Extract text from PDF documents in seconds. Free PDF text extractor — copy text from any PDF. Works with scanned PDFs via OCR. No signup.",
    keywords: "extract text PDF, PDF to text, copy text from PDF, PDF text extractor, extract text online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Text from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-text`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/extract-images": {
    title: "Extract Images from PDF Free (Original Quality) | PDF HUB 24",
    description: "Extract all images from PDF documents in seconds. Free PDF image extractor — download images in original quality. No signup, no watermark.",
    keywords: "extract images PDF, PDF image extractor, get images from PDF, extract images online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Images from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-images`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/ocr-pdf": {
    title: "OCR PDF Free — Scanned PDF to Searchable Text | PDF HUB 24",
    description: "OCR scanned PDFs and extract text instantly. Free online OCR tool — convert scanned documents to searchable, selectable text. No signup required.",
    keywords: "OCR PDF, optical character recognition, extract text scanned PDF, OCR online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "OCR PDF - PDF HUB 24",
      "url": `${BASE_URL}/ocr-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/crop-pdf": {
    title: "Crop PDF Free Online (Remove Margins Instantly) | PDF HUB 24",
    description: "Crop and trim PDF page margins in seconds. Free PDF cropper — remove white space and unwanted areas. No signup, no watermark required.",
    keywords: "crop PDF, trim PDF margins, PDF cropper, remove PDF margins, crop PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Crop PDF - PDF HUB 24",
      "url": `${BASE_URL}/crop-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/resize-pdf": {
    title: "Resize PDF Free Online — A4, Letter & More | PDF HUB 24",
    description: "Resize PDF pages to A4, Letter, Legal, and custom sizes. Free PDF resizer — change document dimensions instantly. No signup, no watermark.",
    keywords: "resize PDF, change PDF size, PDF page size, resize PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Resize PDF - PDF HUB 24",
      "url": `${BASE_URL}/resize-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/sign-pdf": {
    title: "Sign PDF Free Online (Draw, Type or Upload) | PDF HUB 24",
    description: "Add your signature to PDF documents in seconds. Free PDF signing tool — draw, type, or upload your signature. No signup, no watermark.",
    keywords: "sign PDF, add signature PDF, PDF signature, e-sign PDF, sign PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sign PDF - PDF HUB 24",
      "url": `${BASE_URL}/sign-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/flatten-pdf": {
    title: "Flatten PDF Free Online (Forms & Layers) | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content. Free PDF flattener — convert fillable forms to regular PDFs. Perfect for printing. No signup.",
    keywords: "flatten PDF, merge PDF layers, flatten PDF forms, PDF flattener, flatten PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Flatten PDF - PDF HUB 24",
      "url": `${BASE_URL}/flatten-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/grayscale-pdf": {
    title: "PDF to Grayscale Free (Save Ink & Toner) | PDF HUB 24",
    description: "Convert PDF to grayscale for black & white printing. Free PDF grayscale converter — reduce ink usage by up to 80%. No signup, no watermark.",
    keywords: "PDF to grayscale, black and white PDF, convert PDF grayscale, PDF grayscale online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Grayscale - PDF HUB 24",
      "url": `${BASE_URL}/grayscale-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/repair-pdf": {
    title: "Repair PDF Free Online (Fix Corrupted Files) | PDF HUB 24",
    description: "Repair corrupted or damaged PDF files in seconds. Free PDF repair tool — fix broken PDFs and recover content. No signup, no watermark.",
    keywords: "repair PDF, fix corrupted PDF, PDF repair tool, recover PDF, repair PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Repair PDF - PDF HUB 24",
      "url": `${BASE_URL}/repair-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/edit-pdf": {
    title: "Edit PDF Free Online (Add Text, Images & Shapes) | PDF HUB 24",
    description: "Edit PDF documents online — add text, images, shapes, and annotations. Free PDF editor with drawing tools. No signup, no watermark required.",
    keywords: "edit PDF, PDF editor, add text to PDF, modify PDF, edit PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Edit PDF - PDF HUB 24",
      "url": `${BASE_URL}/edit-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/annotate-pdf": {
    title: "Annotate PDF Free (Highlight, Underline & Notes) | PDF HUB 24",
    description: "Annotate PDF documents with highlights, underlines, and notes. Free PDF annotation tool — mark up any PDF. No signup, no watermark required.",
    keywords: "annotate PDF, highlight PDF, PDF markup, PDF annotation, annotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Annotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/annotate-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/redact-pdf": {
    title: "Redact PDF Free (Permanently Remove Sensitive Info) | PDF HUB 24",
    description: "Redact sensitive information from PDF documents. Free PDF redaction tool — permanently black out text and images. No signup, 100% secure.",
    keywords: "redact PDF, black out PDF, censor PDF, PDF redaction, redact PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Redact PDF - PDF HUB 24",
      "url": `${BASE_URL}/redact-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/tiff-to-pdf": {
    title: "TIFF to PDF Free Online (High Quality) | PDF HUB 24",
    description: "Convert TIFF images to PDF in seconds. Free TIFF to PDF converter — maintains image quality perfectly. No signup, no watermark required.",
    keywords: "TIFF to PDF, convert TIFF to PDF, TIF to PDF, TIFF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TIFF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/tiff-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/gif-to-pdf": {
    title: "GIF to PDF Free Online (All Frames Preserved) | PDF HUB 24",
    description: "Convert GIF images to PDF in seconds. Free GIF to PDF converter — preserves all frames and quality. No signup, no watermark required.",
    keywords: "GIF to PDF, convert GIF to PDF, GIF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GIF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/gif-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/webp-to-pdf": {
    title: "WebP to PDF Free Online (Fast & Lossless) | PDF HUB 24",
    description: "Convert WebP images to PDF in seconds. Free WebP to PDF converter — maintains original quality. No signup, no watermark required.",
    keywords: "WebP to PDF, convert WebP to PDF, WebP to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WebP to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/webp-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/html-to-pdf": {
    title: "HTML to PDF Free Online (Render Web Pages) | PDF HUB 24",
    description: "Convert HTML code to PDF documents in seconds. Free HTML to PDF converter — render web pages as PDFs with styling. No signup, no watermark.",
    keywords: "HTML to PDF, convert HTML to PDF, webpage to PDF, HTML to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "HTML to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/html-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-viewer": {
    title: "PDF Viewer Free Online (No Download Needed) | PDF HUB 24",
    description: "View PDF files directly in your browser. Free online PDF viewer — no download needed. Open and read PDFs instantly on any device.",
    keywords: "PDF viewer, view PDF online, read PDF, open PDF, PDF viewer online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF Viewer - PDF HUB 24",
      "url": `${BASE_URL}/pdf-viewer`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/compare-pdf": {
    title: "Compare PDF Free Online (Find Every Difference) | PDF HUB 24",
    description: "Compare two PDF files and find differences in seconds. Free PDF comparison tool — highlight changes between documents. No signup required.",
    keywords: "compare PDF, PDF comparison, find PDF differences, compare PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Compare PDF - PDF HUB 24",
      "url": `${BASE_URL}/compare-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/image-compressor": {
    title: "Image Compressor Free (JPG PNG WebP — No Quality Loss) | PDF HUB 24",
    description: "Compress images (JPG, PNG, WebP) and reduce file size up to 80%. Free image compressor — maintain quality while saving space. No signup.",
    keywords: "compress image, image compressor, reduce image size, compress JPG PNG, image compressor online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Image Compressor - PDF HUB 24",
      "url": `${BASE_URL}/image-compressor`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/resize-image": {
    title: "Resize Image Free (Pixels or Percentage) | PDF HUB 24",
    description: "Resize images by pixels or percentage in seconds. Free image resizer — scale to any size. Supports JPG, PNG, WebP. No signup, no watermark.",
    keywords: "resize image, change image size, scale image, image resizer, resize image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Resize Image - PDF HUB 24",
      "url": `${BASE_URL}/resize-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/crop-image": {
    title: "Crop Image Free Online (Select & Trim) | PDF HUB 24",
    description: "Crop images to remove unwanted areas in seconds. Free image cropper — select and trim any portion. Supports JPG, PNG, WebP. No signup.",
    keywords: "crop image, trim image, cut image, image cropper, crop image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Crop Image - PDF HUB 24",
      "url": `${BASE_URL}/crop-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/rotate-image": {
    title: "Rotate & Flip Image Free (90°, 180°, Mirror) | PDF HUB 24",
    description: "Rotate or flip images in any direction. Free image rotator — turn images 90°, 180°, or flip horizontally/vertically. No signup required.",
    keywords: "rotate image, flip image, turn image, image rotator, rotate image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rotate & Flip Image - PDF HUB 24",
      "url": `${BASE_URL}/rotate-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/convert-image": {
    title: "Convert Image Free (JPG PNG WebP GIF — Instant) | PDF HUB 24",
    description: "Convert between image formats — JPG, PNG, WebP, GIF, TIFF, BMP. Free image converter — change format instantly. No signup, no watermark.",
    keywords: "convert image, image converter, JPG to PNG, PNG to JPG, convert image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Convert Image - PDF HUB 24",
      "url": `${BASE_URL}/convert-image`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/about": {
    title: "About PDF HUB 24 - Free Online PDF Tools",
    description: "Learn about PDF HUB 24 - your trusted source for free online PDF tools. 43+ tools for converting, editing, and managing PDF files.",
    keywords: "about PDF HUB 24, PDF tools, free PDF converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About PDF HUB 24",
      "url": `${BASE_URL}/about`
    }
  },
  "/privacy": {
    title: "Privacy Policy - PDF HUB 24",
    description: "Read our privacy policy. PDF HUB 24 respects your privacy - files are processed securely and deleted automatically.",
    keywords: "privacy policy, PDF HUB 24 privacy",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - PDF HUB 24",
      "url": `${BASE_URL}/privacy`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/terms": {
    title: "Terms of Service - PDF HUB 24",
    description: "Read our terms of service. Learn about the usage terms for PDF HUB 24's free online PDF tools.",
    keywords: "terms of service, PDF HUB 24 terms",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service - PDF HUB 24",
      "url": `${BASE_URL}/terms`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/contact": {
    title: "Contact Us - PDF HUB 24",
    description: "Get in touch with PDF HUB 24. Contact our support team for questions, feedback, or assistance with our PDF tools.",
    keywords: "contact PDF HUB 24, PDF tools support, contact us",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact PDF HUB 24",
      "url": `${BASE_URL}/contact`
    }
  },
  "/blog": {
    title: "PDF Tips & Tutorials Blog (25+ Free Guides) | PDF HUB 24",
    description: "25+ free PDF tutorials and guides. Learn to compress, convert, merge, edit, sign, and secure PDFs with step-by-step instructions. Updated for 2026.",
    keywords: "PDF tips, PDF tutorials, how to PDF, PDF guide, PDF help",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "PDF HUB 24 Blog",
      "url": `${BASE_URL}/blog`,
      "description": "Tips, tutorials, and guides for working with PDF files"
    }
  },
  "/blog/how-to-compress-pdf-for-email": {
    title: "Compress PDF for Email — Under 25MB (Free, No Signup) | PDF HUB 24",
    description: "Compress PDF for email in seconds. Reduce under 25MB, 10MB, or 1MB while keeping quality. Free step-by-step guide with 3 compression levels.",
    keywords: "compress PDF for email, reduce PDF size, PDF email attachment, shrink PDF",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Compress PDF for Email: Reduce File Size Under 25MB",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "url": `${BASE_URL}/blog/how-to-compress-pdf-for-email`
    }
  },
  "/blog/convert-pdf-to-word-without-losing-formatting": {
    title: "PDF to Word (Keep Formatting, No Email) — Free Guide 2026",
    description: "Convert PDF to Word without losing formatting, tables, or images. Free converter — no email, no watermark. Step-by-step guide with tips for 2026.",
    keywords: "PDF to Word formatting, convert PDF Word, preserve PDF formatting, PDF to DOCX",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert PDF to Word Without Losing Formatting",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "url": `${BASE_URL}/blog/convert-pdf-to-word-without-losing-formatting`
    }
  },
  "/blog/merge-pdf-files-guide": {
    title: "Merge PDF Files Free — Combine 2+ PDFs (No Signup) | PDF HUB 24",
    description: "Merge multiple PDF files into one document for free. Step-by-step guide to combining PDFs online — drag, drop, reorder pages. No signup or watermark.",
    keywords: "merge PDF files, combine PDF, join PDF, PDF merger guide",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Merge PDF Files: Complete Guide to Combining Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "url": `${BASE_URL}/blog/merge-pdf-files-guide`
    }
  },
  "/blog/protect-pdf-with-password": {
    title: "Password Protect PDF Free (AES-256, Step-by-Step) | PDF HUB 24",
    description: "Add password protection to PDF files with AES-256 encryption. Free step-by-step guide to encrypting PDFs, setting permissions, and securing documents.",
    keywords: "password protect PDF, encrypt PDF, secure PDF, PDF password",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Password Protect a PDF: Security Best Practices",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "url": `${BASE_URL}/blog/protect-pdf-with-password`
    }
  },
  "/blog/pdf-tools-for-students": {
    title: "10 Free PDF Tools Every Student Needs in 2026 | PDF HUB 24",
    description: "Essential free PDF tools for students — merge assignments, compress for LMS, convert to Word, sign forms. Complete academic guide for 2026.",
    keywords: "PDF tools students, academic PDF, student PDF guide, free PDF tools school",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Essential PDF Tools Every Student Needs: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2025-12-16",
      "url": `${BASE_URL}/blog/pdf-tools-for-students`
    }
  },
  "/blog/sign-pdf-electronically": {
    title: "Sign PDF Free Online (3 Methods, No Printing) | PDF HUB 24",
    description: "Sign PDF documents electronically for free — draw, type, or upload your signature. No printing, no scanning. Step-by-step e-signing guide for 2026.",
    keywords: "sign PDF electronically, e-sign PDF, digital signature PDF, sign PDF free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Sign a PDF Electronically: Complete Free Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/sign-pdf-electronically`
    }
  },
  "/blog/edit-pdf-text-images": {
    title: "Edit PDF Free — Add Text, Images & Shapes (No Install) | PDF HUB 24",
    description: "Edit PDF files online for free — add text, images, shapes, and annotations. No software install. Step-by-step guide with tips for 2026.",
    keywords: "edit PDF free, add text to PDF, edit PDF online, modify PDF document",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Edit a PDF: Add Text, Images, and Shapes",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/edit-pdf-text-images`
    }
  },
  "/blog/watermark-pdf-documents": {
    title: "Add Watermark to PDF Free (Custom Text & Style) | PDF HUB 24",
    description: "Add text watermarks to PDF documents for free. Set custom position, opacity, and style. Step-by-step guide to branding and protecting your PDFs.",
    keywords: "watermark PDF, add watermark to PDF, PDF watermark free, stamp PDF online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Add Watermark to PDF Documents: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/watermark-pdf-documents`
    }
  },
  "/blog/pdf-to-excel-convert-tables": {
    title: "PDF to Excel Free — Convert Tables (Keep Format) | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets accurately. Extract data to XLS/XLSX while preserving table structure. Free step-by-step guide for 2026.",
    keywords: "PDF to Excel, convert PDF tables, extract data PDF Excel, PDF to spreadsheet",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert PDF Tables to Excel: Step-by-Step Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/pdf-to-excel-convert-tables`
    }
  },
  "/blog/redact-sensitive-pdf-information": {
    title: "Redact PDF Free — Remove Sensitive Info (100% Secure) | PDF HUB 24",
    description: "Permanently redact sensitive information from PDFs. Black out text, images, and personal data securely. Free step-by-step guide for GDPR and HIPAA.",
    keywords: "redact PDF, black out PDF text, remove sensitive info PDF, PDF redaction free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Redact Sensitive Information in PDFs: Complete Guide",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/redact-sensitive-pdf-information`
    }
  },
  "/pdf-statistics": {
    title: "PDF Statistics & Facts 2026 - Data & Trends | PDF HUB 24",
    description: "Comprehensive PDF statistics and facts for 2026. Document usage data, conversion trends, file size benchmarks, and security insights with citable sources.",
    keywords: "PDF statistics, PDF usage data, PDF facts 2026, document format trends, PDF market data",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Statistics & Facts 2026: Comprehensive Usage Data",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/pdf-statistics`
    }
  },
  "/press": {
    title: "Press & Media Kit - PDF HUB 24",
    description: "PDF HUB 24 press kit for journalists and bloggers. Company facts, tool categories, brand assets, and media contact information.",
    keywords: "PDF HUB 24 press kit, media kit, company information, brand assets",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Press & Media Kit - PDF HUB 24",
      "url": `${BASE_URL}/press`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/all-tools": {
    title: "All 43+ Free PDF Tools — Complete List 2026 | PDF HUB 24",
    description: "Browse all 43+ free online PDF tools. Convert, edit, merge, split, compress PDFs and more. Complete tool directory — no signup, no watermark.",
    keywords: "all PDF tools, free PDF tools list, online PDF tools, PDF converter tools, PDF editor tools",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF HUB 24 - All Tools",
      "url": `${BASE_URL}/all-tools`,
      "description": "Complete collection of 43+ free online PDF tools",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/free-pdf-converter": {
    title: "Free PDF Converter (Any File, No Signup) | PDF HUB 24",
    description: "Best free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PPT and more. Convert images and documents to PDF. No signup, no watermark.",
    keywords: "free PDF converter, PDF converter online, convert PDF free, PDF to Word converter, image to PDF converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/free-pdf-converter`,
      "description": "Convert PDF files to and from Word, Excel, JPG, PNG, PowerPoint and more formats for free",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/dmca": {
    title: "DMCA Policy - PDF HUB 24",
    description: "DMCA policy for PDF HUB 24. Learn about our copyright compliance procedures and how to report infringing content.",
    keywords: "DMCA policy, copyright, PDF HUB 24 DMCA",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "DMCA Policy - PDF HUB 24",
      "url": `${BASE_URL}/dmca`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/blog/how-to-split-pdf-pages": {
    title: "Split PDF Free — Extract Pages in Seconds (No Signup) | PDF HUB 24",
    description: "Split PDF pages and extract sections from large PDFs. Free PDF splitter — select page ranges or single pages. No software install, no signup.",
    keywords: "split PDF pages, extract PDF pages, separate PDF sections, PDF splitter free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Split PDF Pages: Extract and Separate PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/how-to-split-pdf-pages`
    }
  },
  "/blog/add-page-numbers-to-pdf": {
    title: "Add Page Numbers to PDF Free (Custom Position & Style) | PDF HUB 24",
    description: "Add page numbers to PDF free. Customize position, style, starting number. Best free PDF numbering tool for reports and theses. No signup.",
    keywords: "add page numbers PDF, PDF page numbering, number PDF pages free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Add Page Numbers to PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/add-page-numbers-to-pdf`
    }
  },
  "/blog/convert-images-to-pdf": {
    title: "Images to PDF Free — JPG PNG WebP (No Signup) | PDF HUB 24",
    description: "Convert images to PDF free. JPG, PNG, WebP, TIFF, GIF to PDF instantly. Best free image to PDF converter — combine multiple images, no signup.",
    keywords: "convert images to PDF, JPG to PDF, PNG to PDF, image to PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert Images to PDF: JPG, PNG, and More",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/convert-images-to-pdf`
    }
  },
  "/blog/ocr-scanned-pdf-to-text": {
    title: "OCR PDF Free — Scanned to Searchable Text (Fast) | PDF HUB 24",
    description: "OCR PDF free online. Convert scanned documents to searchable text. Best free OCR tool — extract text from images and scanned pages instantly.",
    keywords: "OCR PDF, scanned PDF to text, optical character recognition, OCR free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "OCR PDF: Convert Scanned Documents to Searchable Text",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/ocr-scanned-pdf-to-text`
    }
  },
  "/blog/rotate-pdf-pages": {
    title: "Rotate PDF Pages Free — Fix Orientation (90° 180° 270°) | PDF HUB 24",
    description: "Rotate PDF pages free. Fix upside-down or sideways PDFs — rotate 90°, 180°, 270°. Best free PDF rotation tool for all or specific pages.",
    keywords: "rotate PDF pages, fix PDF orientation, rotate PDF free, turn PDF pages",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Rotate PDF Pages: Fix Orientation Issues",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-01",
      "url": `${BASE_URL}/blog/rotate-pdf-pages`
    }
  },
  "/blog/how-to-flatten-pdf": {
    title: "Flatten PDF Free (Forms, Layers & Annotations) | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content for printing and sharing. Free online tool — no signup. Perfect for archiving and distribution.",
    keywords: "flatten PDF, flatten PDF forms, PDF flatten online free, merge PDF layers",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Flatten PDF Forms and Layers",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/how-to-flatten-pdf`
    }
  },
  "/blog/crop-pdf-pages-guide": {
    title: "Crop PDF Pages Free (Remove Margins & Whitespace) | PDF HUB 24",
    description: "Crop PDF pages and remove unwanted margins or whitespace in seconds. Free online PDF cropper — no registration, no watermark needed.",
    keywords: "crop PDF, remove PDF margins, trim PDF pages, PDF cropper free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Crop PDF Pages and Remove Margins",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/crop-pdf-pages-guide`
    }
  },
  "/blog/resize-pdf-to-a4": {
    title: "Resize PDF to A4 or Letter Free (No Software) | PDF HUB 24",
    description: "Change PDF page size to A4, Letter, Legal, or custom dimensions. Free online PDF resizer — no software download, no signup required.",
    keywords: "resize PDF to A4, change PDF page size, PDF resize online free, PDF to letter size",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Resize PDF to A4 or Letter Size",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/resize-pdf-to-a4`
    }
  },
  "/blog/compare-two-pdf-files": {
    title: "Compare 2 PDF Files Free (Find Every Change) | PDF HUB 24",
    description: "Compare two PDF files side by side and find every difference. Free PDF comparison tool — highlight changes between documents. No signup.",
    keywords: "compare PDF files, PDF diff tool, compare two PDFs online, find PDF differences",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Compare Two PDF Files and Find Differences",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/compare-two-pdf-files`
    }
  },
  "/blog/html-to-pdf-conversion": {
    title: "HTML to PDF Free — Render Web Pages (Keeps CSS) | PDF HUB 24",
    description: "Convert HTML and web pages to PDF documents with CSS styling. Free HTML to PDF converter — no signup, no watermark. Perfect for reports.",
    keywords: "HTML to PDF, convert HTML to PDF, web page to PDF, HTML to PDF free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Convert HTML to PDF Documents",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/html-to-pdf-conversion`
    }
  },
  "/blog/extract-text-from-pdf": {
    title: "Extract Text from PDF Free (Works with Scans via OCR) | PDF HUB 24",
    description: "Extract and copy text from PDF files easily. Works with scanned PDFs using OCR. Free online tool — no signup, instant results.",
    keywords: "extract text from PDF, copy text from PDF, PDF text extractor, PDF to text free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Extract Text from PDF Files",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/extract-text-from-pdf`
    }
  },
  "/blog/best-free-pdf-tools-2026": {
    title: "12 Best Free PDF Tools Online in 2026 (No Signup) | PDF HUB 24",
    description: "Complete guide to the best free online PDF tools in 2026. Convert, edit, merge, compress, sign, and more — no signup, no watermark, 100% free.",
    keywords: "best free PDF tools 2026, free PDF editor online, best PDF converter, free PDF tools",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Best Free PDF Tools Online in 2026",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/best-free-pdf-tools-2026`
    }
  },
  "/blog/pdf-accessibility-guide": {
    title: "PDF Accessibility Guide 2026 — OCR, Tags & ADA Tips | PDF HUB 24",
    description: "Make PDFs accessible with OCR, text extraction, and proper formatting. Complete guide to ADA-compliant, inclusive PDF documents for 2026.",
    keywords: "PDF accessibility, accessible PDF, OCR PDF, PDF screen reader, ADA PDF compliance",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Accessibility Guide: Making PDFs Inclusive",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/pdf-accessibility-guide`
    }
  },
  "/blog/batch-convert-images-to-pdf": {
    title: "Batch Convert Images to PDF Free (JPG PNG TIFF) | PDF HUB 24",
    description: "Batch convert JPG, PNG, WebP, TIFF, and GIF images to PDF. Combine multiple images into one PDF — free online, no signup, no watermark.",
    keywords: "batch images to PDF, multiple images to PDF, JPG to PDF, convert photos to PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Batch Convert Images to PDF",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/batch-convert-images-to-pdf`
    }
  },
  "/blog/unlock-pdf-remove-password": {
    title: "Unlock PDF Free — Remove Password (Instant) | PDF HUB 24",
    description: "Remove password protection from PDF files for free. Unlock PDFs for editing, printing, and copying. No signup — requires your password.",
    keywords: "unlock PDF, remove PDF password, PDF password remover free, unprotect PDF online",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Unlock PDF and Remove Password Protection",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-02-27",
      "url": `${BASE_URL}/blog/unlock-pdf-remove-password`
    }
  },
  "/free-pdf-editor": {
    title: "Free PDF Editor Online — 43+ Tools (No Install) | PDF HUB 24",
    description: "Best free PDF editor online. Edit, merge, split, compress, rotate, sign, annotate, and redact PDFs. 43+ tools, no download, no registration needed.",
    keywords: "free PDF editor, edit PDF online, PDF editor free, online PDF editor, modify PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free PDF Editor - PDF HUB 24",
      "url": `${BASE_URL}/free-pdf-editor`,
      "description": "Edit PDF files online for free - merge, split, compress, rotate, sign, annotate, and more",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/convert-pdf": {
    title: "Convert PDF Online Free — All Formats Supported | PDF HUB 24",
    description: "Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. Convert images and documents to PDF. Free online converter with no signup, no watermark.",
    keywords: "convert PDF, PDF converter, PDF to Word, PDF to JPG, Word to PDF, image to PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Convert PDF Tools", "url": `${BASE_URL}/convert-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/compress-pdf-tools": {
    title: "Compress PDF Online Free — Reduce Size Up to 90% | PDF HUB 24",
    description: "Reduce PDF file size by up to 90% without losing quality. Free PDF compressor with 3 compression levels. Perfect for email, upload, and storage.",
    keywords: "compress PDF, reduce PDF size, PDF compressor, shrink PDF, optimize PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Compress PDF Tools", "url": `${BASE_URL}/compress-pdf-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/edit-pdf-tools": {
    title: "Edit PDF Online Free — 15+ Editing Tools (No Install) | PDF HUB 24",
    description: "Edit, merge, split, rotate, sign, annotate, and redact PDF documents free online. 15+ PDF editing tools with no software install and no watermarks.",
    keywords: "edit PDF, PDF editor, merge PDF, split PDF, sign PDF, annotate PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Edit PDF Tools", "url": `${BASE_URL}/edit-pdf-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/secure-pdf": {
    title: "Secure PDF Online Free — Encrypt, Redact & Protect | PDF HUB 24",
    description: "Password protect, encrypt, redact, and secure PDF documents free online. AES-256 encryption, permanent redaction, and file privacy tools.",
    keywords: "secure PDF, protect PDF, encrypt PDF, redact PDF, password protect PDF",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Secure PDF Tools", "url": `${BASE_URL}/secure-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/image-tools": {
    title: "Free Image Tools — Compress, Resize & Convert | PDF HUB 24",
    description: "Free online image tools for compression, resizing, cropping, rotating, and format conversion. Supports JPG, PNG, WebP, GIF, TIFF.",
    keywords: "image tools, compress image, resize image, crop image, convert image, image compressor",
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "Image Tools", "url": `${BASE_URL}/image-tools`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/write-for-us": {
    title: "Write for Us — Contribute to PDF HUB 24 Blog | PDF HUB 24",
    description: "Contribute guest posts to PDF HUB 24. Write about PDF tools, document management, and productivity. Get exposure to 300,000+ monthly readers.",
    keywords: "write for us, guest post, contribute, PDF blog, document management blog",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Write for Us", "url": `${BASE_URL}/write-for-us`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/data-security": {
    title: "Data Security & Privacy — How We Protect Your Files | PDF HUB 24",
    description: "Learn how PDF HUB 24 protects your files. SSL encryption, automatic deletion within 1 hour, zero-access policy, GDPR compliance.",
    keywords: "data security, file privacy, PDF security, GDPR, file encryption, auto delete",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Data Security", "url": `${BASE_URL}/data-security`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/auto-delete": {
    title: "Auto-Delete — How We Remove Your Files | PDF HUB 24",
    description: "PDF HUB 24 automatically deletes all uploaded files within 1 hour. Learn how our automatic file deletion works to protect your privacy.",
    keywords: "auto delete files, file deletion, privacy, secure deletion, temporary files",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Automatic File Deletion", "url": `${BASE_URL}/auto-delete`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pricing": {
    title: "Pricing — 43+ Free PDF Tools (No Hidden Costs) | PDF HUB 24",
    description: "All 43+ PDF tools are 100% free. No signup, no watermarks, no limits. See our free plan features and upcoming Pro plan details.",
    keywords: "free pdf tools, pdf tool pricing, free pdf converter, free pdf editor, pdf hub pricing",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Pricing", "url": `${BASE_URL}/pricing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/embed": {
    title: "Embed PDF Tools on Your Website Free — Widget Generator | PDF HUB 24",
    description: "Embed free PDF tools on your website with our widget generator. Get iframe code for merge, compress, convert, and 40+ PDF tools.",
    keywords: "embed pdf tools, pdf widget, iframe pdf converter, embed pdf merger, website pdf tools",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Embed Widget Generator", "url": `${BASE_URL}/embed`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-comparison-chart": {
    title: "PDF Tools Comparison Chart 2026 | PDF HUB 24",
    description: "Compare 6 free PDF tool platforms side by side. Features, pricing, file limits, and capabilities of PDF HUB 24, Adobe, Smallpdf, ILovePDF, PDF24, and Sejda.",
    keywords: "pdf tools comparison, free pdf tools, best pdf tool, pdf converter comparison, adobe vs smallpdf",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Free PDF Tools Comparison Chart 2026", "url": `${BASE_URL}/pdf-comparison-chart`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/pdf-file-formats-guide": {
    title: "File Formats Guide 2026 — PDF & Documents | PDF HUB 24",
    description: "Complete guide to PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, TIFF, GIF file formats. Specs, use cases, compression types, and conversion options.",
    keywords: "file formats guide, pdf format, docx format, image formats, document formats, file format comparison",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Ultimate Guide to PDF & Document File Formats 2026", "url": `${BASE_URL}/pdf-file-formats-guide`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-pdf-under-100kb": {
    title: "Compress PDF Under 100KB Free Online | PDF HUB 24",
    description: "Reduce PDF file size to under 100KB free online. Perfect for form submissions, online applications, and strict upload limits. No signup required.",
    keywords: "compress pdf under 100kb, reduce pdf size 100kb, small pdf, pdf under 100kb",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF Under 100KB", "url": `${BASE_URL}/tools/compress-pdf-under-100kb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/reduce-pdf-size-to-200kb": {
    title: "Reduce PDF Size to 200KB Free Online | PDF HUB 24",
    description: "Reduce PDF file size to 200KB or less. Free online tool for meeting upload requirements. Maintain quality while shrinking files.",
    keywords: "reduce pdf 200kb, compress pdf 200kb, pdf size 200kb, small pdf file",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Reduce PDF to 200KB", "url": `${BASE_URL}/tools/reduce-pdf-size-to-200kb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-pdf-to-1mb": {
    title: "Compress PDF to 1MB Free Online | PDF HUB 24",
    description: "Compress large PDF files to 1MB or under. Free online PDF compressor with adjustable quality options. Perfect for email attachments and website uploads.",
    keywords: "compress pdf 1mb, reduce pdf to 1mb, pdf under 1mb, shrink pdf 1mb",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF to 1MB", "url": `${BASE_URL}/tools/compress-pdf-to-1mb`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/merge-pdf-for-visa-application": {
    title: "Merge PDF for Visa Application Free Online | PDF HUB 24",
    description: "Combine passport, bank statements, photos, and supporting documents into one PDF for visa applications. Free online merger.",
    keywords: "merge pdf visa, combine documents visa, visa application pdf, merge pdf passport",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Merge PDF for Visa Application", "url": `${BASE_URL}/tools/merge-pdf-for-visa-application`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-scanned-pdf-to-word-editable": {
    title: "Convert Scanned PDF to Editable Word Free | PDF HUB 24",
    description: "Convert scanned PDF documents to editable Word (DOCX) files using OCR technology. Free online tool accurately extracts text from image-based scans.",
    keywords: "scanned pdf to word, ocr pdf to word, convert scan to editable, scanned document to word",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Scanned PDF to Word", "url": `${BASE_URL}/tools/convert-scanned-pdf-to-word-editable`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/make-pdf-smaller-for-email": {
    title: "Make PDF Smaller for Email Free Online | PDF HUB 24",
    description: "Make your PDF smaller for email in seconds. Reduce under 25MB for Gmail, 20MB for Outlook. Free compressor with quality options.",
    keywords: "make pdf smaller email, compress pdf email, pdf too large email, reduce pdf for gmail",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Make PDF Smaller for Email", "url": `${BASE_URL}/tools/make-pdf-smaller-for-email`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/pdf-to-jpg-high-quality": {
    title: "PDF to JPG High Quality Free Online | PDF HUB 24",
    description: "Convert PDF pages to high-resolution JPG images. Free online converter with 300 DPI output. Perfect for presentations and social media.",
    keywords: "pdf to jpg high quality, pdf to image hd, convert pdf jpg high resolution, pdf to jpg 300dpi",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to JPG High Quality", "url": `${BASE_URL}/tools/pdf-to-jpg-high-quality`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/merge-pdf-free-no-limit": {
    title: "Merge PDF Free No Limit — Combine Unlimited Files | PDF HUB 24",
    description: "Combine unlimited PDF files into one document free online. No file count limits, no page limits, no daily caps. Merge as many PDFs as you need.",
    keywords: "merge pdf free no limit, combine pdf unlimited, merge pdf no restriction, unlimited pdf merger",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Merge PDF Free No Limit", "url": `${BASE_URL}/tools/merge-pdf-free-no-limit`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/split-pdf-by-pages": {
    title: "Split PDF by Pages Free Online | PDF HUB 24",
    description: "Split PDF files by page number or range free online. Extract specific pages, split into chapters, or divide large documents. No signup required.",
    keywords: "split pdf by pages, extract pdf pages, split pdf page range, separate pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Split PDF by Pages", "url": `${BASE_URL}/tools/split-pdf-by-pages`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-signature-to-pdf-free": {
    title: "Add Signature to PDF Free Online | PDF HUB 24",
    description: "Sign PDF documents free online. Draw, type, or upload your signature. No printing, no scanning needed. Legally recognized e-signatures.",
    keywords: "add signature pdf, sign pdf free, electronic signature pdf, e-sign pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Signature to PDF", "url": `${BASE_URL}/tools/add-signature-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-pdf-without-losing-quality": {
    title: "Compress PDF Without Losing Quality Free | PDF HUB 24",
    description: "Reduce PDF file size without visible quality loss. Free lossless-like compression preserves text, images, and formatting. Choose from 3 adjustable quality levels.",
    keywords: "compress pdf without losing quality, lossless pdf compression, reduce pdf keep quality",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress PDF Without Losing Quality", "url": `${BASE_URL}/tools/compress-pdf-without-losing-quality`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/pdf-to-word-editable-free": {
    title: "PDF to Word Editable Free Online | PDF HUB 24",
    description: "Convert any PDF to fully editable Word (DOCX) format free online. Preserves tables, images, headers, and formatting perfectly. No email or signup required.",
    keywords: "pdf to word editable, convert pdf to editable word, pdf to docx free, editable word from pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "PDF to Editable Word", "url": `${BASE_URL}/tools/pdf-to-word-editable-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/unlock-pdf-for-editing": {
    title: "Unlock PDF for Editing Free Online | PDF HUB 24",
    description: "Remove editing restrictions from password-protected PDFs free. Unlock PDFs for copying, printing, and editing. Requires your password.",
    keywords: "unlock pdf editing, remove pdf restrictions, unlock pdf free, pdf remove password editing",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Unlock PDF for Editing", "url": `${BASE_URL}/tools/unlock-pdf-for-editing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/rotate-pdf-and-save": {
    title: "Rotate PDF and Save Permanently Free | PDF HUB 24",
    description: "Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scanned pages instantly. Free online tool, no signup.",
    keywords: "rotate pdf save, fix sideways pdf, rotate pdf permanently, turn pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Rotate PDF and Save", "url": `${BASE_URL}/tools/rotate-pdf-and-save`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-jpg-all-pages": {
    title: "Convert PDF to JPG All Pages Free Online | PDF HUB 24",
    description: "Convert every page of your PDF to individual JPG images free online. Download all pages as a ZIP file. High quality 300 DPI output, no signup needed.",
    keywords: "pdf to jpg all pages, convert all pdf pages jpg, pdf pages to images, extract all pages jpg",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to JPG All Pages", "url": `${BASE_URL}/tools/convert-pdf-to-jpg-all-pages`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/protect-pdf-with-password-free": {
    title: "Password Protect PDF Free Online (AES-256) | PDF HUB 24",
    description: "Add AES-256 password protection to PDF files free online. Set open and edit passwords, control printing and copying permissions. Enterprise-grade encryption.",
    keywords: "password protect pdf, encrypt pdf free, aes 256 pdf, pdf password protection online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Password Protect PDF", "url": `${BASE_URL}/tools/protect-pdf-with-password-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/remove-pages-from-pdf": {
    title: "Remove Pages from PDF Free Online | PDF HUB 24",
    description: "Delete specific pages from PDF documents free online. Select and remove unwanted pages instantly with visual preview. Keep your documents clean and organized.",
    keywords: "remove pages pdf, delete pdf pages, remove page from pdf free, delete pages pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Remove Pages from PDF", "url": `${BASE_URL}/tools/remove-pages-from-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/flatten-pdf-for-printing": {
    title: "Flatten PDF for Printing Free Online | PDF HUB 24",
    description: "Flatten PDF forms and layers for reliable printing. Convert fillable fields to static text. Ensures consistent print output across all printers and devices.",
    keywords: "flatten pdf printing, flatten pdf forms, pdf print correctly, flatten fillable pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Flatten PDF for Printing", "url": `${BASE_URL}/tools/flatten-pdf-for-printing`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-watermark-to-pdf-free": {
    title: "Add Watermark to PDF Free Online | PDF HUB 24",
    description: "Add text or image watermarks to PDF files online for free. Customize position, opacity, and rotation. Protect your documents with professional watermarks.",
    keywords: "add watermark pdf free, watermark pdf online, text watermark pdf, image watermark pdf, stamp pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Watermark to PDF Free", "url": `${BASE_URL}/tools/add-watermark-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-excel-to-pdf-free": {
    title: "Convert Excel to PDF Free Online | PDF HUB 24",
    description: "Convert Excel XLS and XLSX files to PDF online for free. Preserve formatting, formulas display, and column widths. No signup required.",
    keywords: "excel to pdf free, convert xlsx to pdf, spreadsheet to pdf, xls to pdf online, excel pdf converter",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Excel to PDF Free", "url": `${BASE_URL}/tools/convert-excel-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  }
};

export function generateMetaTags(path: string): string {
  const seo = seoConfig[path] || seoConfig["/"];
  const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;
  
  return `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${seo.keywords}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="PDF HUB 24" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    
    <!-- Robots -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">${JSON.stringify(seo.schema)}</script>
  `;
}

export function injectSEO(html: string, path: string): string {
  const metaTags = generateMetaTags(path);
  
  return html
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*\/?>/, '')
    .replace(/<link rel="canonical"[^>]*\/?>/, '')
    .replace(/<meta name="robots"[^>]*\/?>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace('</head>', `${metaTags}\n  </head>`);
}
