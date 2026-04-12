import { toolSEOData } from "../client/src/data/toolSEOData";
import { blogPosts } from "../client/src/data/blogData";
import { getProgrammaticPage } from "../client/src/data/programmaticSeoData";
import { categoryHubs } from "../client/src/data/categoryHubData";
import { TOOL_SLUG_TRANSLATIONS, TRANSLATED_TO_ENGLISH } from "../client/src/lib/translatedSlugs";

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  schema: object;
  h1?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: string;
  robots?: string;
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
      "description": "Free online PDF tools - 43+ tools for converting, editing, and managing PDF files"
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
    title: "PDF to Word Free — No Email, No Watermark | PDF HUB 24",
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
  "/extract-pages": {
    title: "Extract Pages from PDF Free (Select Any Pages) | PDF HUB 24",
    description: "Extract specific pages from any PDF instantly. Free PDF page extractor — enter page numbers or ranges like 1,3,5-8. No signup, no watermark.",
    keywords: "extract pages from PDF, PDF page extractor, extract PDF pages online free, save specific pages PDF, pull pages from PDF",
    canonical: `${BASE_URL}/extract-pages`,
    ogTitle: "Extract Pages from PDF Free | PDF HUB 24",
    ogDescription: "Extract specific pages from any PDF instantly. Enter page numbers or ranges — download in seconds. No signup required.",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Extract Pages from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-pages`,
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
  "/scan-to-pdf": {
    title: "Scan to PDF Free — Camera Scan Documents to PDF | PDF HUB 24",
    description: "Scan documents with your phone camera and convert to PDF instantly. Free online scan-to-PDF tool — take photos, combine into a PDF. No signup required.",
    keywords: "scan to PDF, camera scan PDF, document scanner, phone scan to PDF, scan document to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Scan to PDF - PDF HUB 24",
      "url": `${BASE_URL}/scan-to-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-pdfa": {
    title: "PDF to PDF/A Converter Free — ISO Archive Format | PDF HUB 24",
    description: "Convert PDF to PDF/A-1b for long-term archiving. Free ISO-compliant PDF/A converter — perfect for legal, government, and official records. No signup.",
    keywords: "PDF to PDF/A, PDF/A converter, PDF archiving, ISO 19005, PDF/A-1b, PDF to PDF/A free online",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to PDF/A - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-pdfa`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/translate-pdf": {
    title: "Translate PDF Free — 50+ Languages Online | PDF HUB 24",
    description: "Translate any PDF document into 50+ languages instantly. Free online PDF translator — English, Spanish, French, Arabic, Hindi, Chinese & more. No signup.",
    keywords: "translate PDF, PDF translator online free, translate PDF to Spanish, translate PDF to French, translate PDF to Arabic, translate document online, PDF language translator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Translate PDF - PDF HUB 24",
      "url": `${BASE_URL}/translate-pdf`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/batch-compress": {
    title: "Batch Compress PDF Free — Multiple PDFs at Once | PDF HUB 24",
    description: "Compress multiple PDF files at once and download as a ZIP. Free batch PDF compressor — reduce file sizes in bulk. No signup, no watermark.",
    keywords: "batch compress PDF, compress multiple PDFs, bulk PDF compressor, PDF batch processing, compress PDF ZIP",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Batch Compress PDF - PDF HUB 24",
      "url": `${BASE_URL}/batch-compress`,
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
    title: "Image Compressor Free — JPG PNG WebP (No Loss) | PDF HUB 24",
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
    title: "Privacy Policy — How We Protect Your Files | PDF HUB 24",
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
    title: "Terms of Service — Usage Agreement | PDF HUB 24",
    description: "Read our terms of service. Learn about the usage terms for PDF HUB 24's free online PDF and image tools. Your rights and responsibilities.",
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
    title: "Contact Us — Get Help With PDF Tools | PDF HUB 24",
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
    title: "Compress PDF for Email Under 25MB — Free Guide | PDF HUB 24",
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
    title: "Edit PDF Free — Add Text, Images & Shapes | PDF HUB 24",
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
    title: "Redact PDF Free — Remove Sensitive Info Securely | PDF HUB 24",
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
    title: "DMCA Policy — Copyright Compliance | PDF HUB 24",
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
    title: "Split PDF Free — Extract Pages in Seconds | PDF HUB 24",
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
    title: "Add Page Numbers to PDF Free — Custom Style | PDF HUB 24",
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
    title: "Rotate PDF Pages Free — Fix Orientation (90°–270°) | PDF HUB 24",
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
    title: "Extract Text from PDF Free (Scans + OCR) | PDF HUB 24",
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
  "/blog/annotate-pdf-comments": {
    title: "How to Annotate PDF: Add Comments, Highlights, Notes | PDF HUB 24",
    description: "Learn how to annotate PDF files online free. Add comments, highlights, sticky notes, arrows, and text boxes to any PDF without software.",
    keywords: "annotate PDF, PDF comments, highlight PDF, PDF sticky notes, PDF markup",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Annotate PDF: Add Comments, Highlights, and Notes", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-05", "url": `${BASE_URL}/blog/annotate-pdf-comments` }
  },
  "/blog/translate-pdf-documents": {
    title: "How to Translate a PDF to Any Language Free | PDF HUB 24",
    description: "Translate PDF documents to Spanish, French, German, Arabic, Chinese, and 100+ languages free. No signup. Download translated PDF instantly.",
    keywords: "translate PDF, PDF translation, PDF to Spanish, PDF to French, multilingual PDF",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Translate a PDF to Any Language", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-08", "url": `${BASE_URL}/blog/translate-pdf-documents` }
  },
  "/blog/repair-corrupted-pdf": {
    title: "How to Repair a Corrupted PDF File Free Online | PDF HUB 24",
    description: "Fix corrupted, damaged, or unreadable PDF files free online. Repair PDFs that won't open, show errors, or have missing content. No signup.",
    keywords: "repair PDF, corrupted PDF, damaged PDF, fix PDF, PDF recovery",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Repair a Corrupted or Damaged PDF File", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-10", "url": `${BASE_URL}/blog/repair-corrupted-pdf` }
  },
  "/blog/pdf-to-powerpoint-guide": {
    title: "Convert PDF to PowerPoint Free Online (2026) | PDF HUB 24",
    description: "Convert PDF to PowerPoint (PPT/PPTX) free online. Extract slides, preserve layout and text. No software needed. Download editable presentation instantly.",
    keywords: "PDF to PowerPoint, PDF to PPT, convert PDF presentation, PDF to PPTX free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert PDF to PowerPoint Free Online", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-12", "url": `${BASE_URL}/blog/pdf-to-powerpoint-guide` }
  },
  "/blog/jpg-to-pdf-guide": {
    title: "How to Convert JPG to PDF Free Online (2026) | PDF HUB 24",
    description: "Convert JPG images to PDF free online. Combine multiple JPG photos into one PDF. No signup, no watermark. Download PDF instantly.",
    keywords: "JPG to PDF, convert image to PDF, photo to PDF, JPEG to PDF free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert JPG to PDF: Complete Guide", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-15", "url": `${BASE_URL}/blog/jpg-to-pdf-guide` }
  },
  "/blog/compress-images-online": {
    title: "How to Compress Images Without Losing Quality (2026) | PDF HUB 24",
    description: "Compress JPEG, PNG, WebP images free online. Reduce image file size by up to 80% without visible quality loss. No signup, instant download.",
    keywords: "compress images, reduce image size, image optimizer, compress JPEG PNG free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Compress Images Without Losing Quality", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-18", "url": `${BASE_URL}/blog/compress-images-online` }
  },
  "/blog/reorder-pdf-pages": {
    title: "How to Reorder PDF Pages: Rearrange and Organize | PDF HUB 24",
    description: "Reorder, rearrange, and reorganize PDF pages free online. Drag and drop pages into any order. No software, no signup. Download instantly.",
    keywords: "reorder PDF pages, rearrange PDF, organize PDF pages, move PDF pages",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Reorder PDF Pages: Rearrange, Move, and Organize", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-20", "url": `${BASE_URL}/blog/reorder-pdf-pages` }
  },
  "/blog/remove-background-from-image": {
    title: "Remove Background from Image Free — Transparent PNG | PDF HUB 24",
    description: "Remove image backgrounds free online. Get transparent PNG instantly. Works on photos, logos, product images. No signup, no watermark.",
    keywords: "remove background, transparent PNG, background remover, cut out image free",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Remove Background from Any Image", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-22", "url": `${BASE_URL}/blog/remove-background-from-image` }
  },
  "/blog/convert-pdf-to-png": {
    title: "Convert PDF to PNG Free Online — High Quality | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images free online. Extract PDF as transparent PNG with no quality loss. No signup, instant download.",
    keywords: "PDF to PNG, convert PDF to image, PDF to transparent PNG, extract PDF pages as PNG",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert PDF to PNG: High Quality Image Extraction", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-25", "url": `${BASE_URL}/blog/convert-pdf-to-png` }
  },
  "/blog/excel-to-pdf": {
    title: "Convert Excel to PDF Free — Spreadsheets & Tables | PDF HUB 24",
    description: "Convert Excel (XLS/XLSX) to PDF free online. Preserve tables, formatting, and formulas as values. No signup. Works with all Excel versions.",
    keywords: "Excel to PDF, XLSX to PDF, convert spreadsheet to PDF, Excel PDF converter",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Convert Excel to PDF: Spreadsheets, Tables, and Formatting", "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-03-28", "url": `${BASE_URL}/blog/excel-to-pdf` }
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
    title: "Edit PDF Online Free — 15+ Tools, No Install | PDF HUB 24",
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
    title: "Embed Free PDF Tools on Your Website | PDF HUB 24",
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
  "/pdf-glossary": {
    title: "PDF Glossary — 60+ PDF Terms Explained A-Z | PDF HUB 24",
    description: "Complete A-Z PDF glossary with 60+ terms. Definitions for PDF/A, OCR, compression, encryption, annotations, metadata, digital signatures & more.",
    keywords: "pdf glossary, pdf terms, pdf definitions, what is pdf/a, pdf compression terms, pdf encryption glossary, pdf metadata, pdf annotations, ocr pdf definition",
    canonical: `${BASE_URL}/pdf-glossary`,
    ogTitle: "PDF Glossary — Complete A-Z Reference | PDF HUB 24",
    ogDescription: "60+ PDF terms explained clearly. Covers PDF standards, compression, security, OCR, structured data, and more. Free reference for students and professionals.",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Glossary — Complete A-Z Reference of PDF Terms",
      "description": "Comprehensive glossary of PDF terms covering format specifications, compression, security, accessibility, and PDF processing concepts.",
      "url": `${BASE_URL}/pdf-glossary`,
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-file-formats-guide": {
    title: "File Formats Guide 2026 — PDF & Documents | PDF HUB 24",
    description: "Complete guide to PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, TIFF, GIF file formats. Specs, use cases, compression types, and conversion options.",
    keywords: "file formats guide, pdf format, docx format, image formats, document formats, file format comparison",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Ultimate Guide to PDF & Document File Formats 2026", "url": `${BASE_URL}/pdf-file-formats-guide`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/html-sitemap": {
    title: "HTML Sitemap — All PDF Tools & Pages | PDF HUB 24",
    description: "Complete HTML sitemap for PDF HUB 24. Find all 49 PDF tools, 25 blog articles, category hubs, and information pages in one organized directory.",
    keywords: "sitemap, pdf tools list, all pdf tools, site map, pdf hub 24 pages",
    canonical: `${BASE_URL}/html-sitemap`,
    ogTitle: "HTML Sitemap — All PDF Tools & Pages | PDF HUB 24",
    ogDescription: "Navigate all 49 PDF tools, 25 blog articles, and information pages on PDF HUB 24.",
    ogUrl: `${BASE_URL}/html-sitemap`,
    twitterTitle: "HTML Sitemap — All PDF Tools & Pages",
    twitterDescription: "Find every tool and page on PDF HUB 24 in one organized directory.",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "HTML Sitemap", "url": `${BASE_URL}/html-sitemap`, "description": "Complete directory of all pages on PDF HUB 24.", "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/best-free-tools": {
    title: "Best Free PDF Tools 2026 — No Signup, No Watermarks | PDF HUB 24",
    description: "Best free PDF tools of 2026: merge, compress, convert, sign, and edit PDFs online — no signup, no watermarks. Compare vs iLovePDF, Smallpdf, PDF24.",
    keywords: "best free pdf tools, free pdf tools 2026, pdf tools no signup, free pdf merger, best online pdf tools, free pdf converter",
    canonical: `${BASE_URL}/best-free-tools`,
    ogTitle: "Best Free PDF Tools 2026 — No Signup, No Watermarks",
    ogDescription: "Handpicked free PDF tools you can use right now. No account, no watermarks, no hidden fees. 49 tools compared.",
    ogUrl: `${BASE_URL}/best-free-tools`,
    twitterTitle: "Best Free PDF Tools 2026",
    twitterDescription: "49 free PDF tools — no signup, no watermarks. Merge, compress, convert, sign and more.",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Best Free PDF Tools 2026 — No Signup, No Watermarks", "url": `${BASE_URL}/best-free-tools`, "author": { "@type": "Organization", "name": "PDF HUB 24" }, "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }, "datePublished": "2026-01-01" }
  },
  "/seo-audit": {
    title: "SEO Audit Dashboard | PDF HUB 24",
    description: "Internal SEO audit dashboard for PDF HUB 24. Validates sitemap URLs and checks content quality.",
    keywords: "seo audit, sitemap validation, content quality",
    robots: "noindex, nofollow",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "SEO Audit Dashboard", "url": `${BASE_URL}/seo-audit` }
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
    description: "Reduce PDF file size without visible quality loss. Free lossless compression preserves text, images & formatting. Choose from 3 adjustable quality levels.",
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
  },
  "/tools/convert-word-to-pdf-free-online": {
    title: "Convert Word to PDF Free Online | PDF HUB 24",
    description: "Convert Word DOC and DOCX files to PDF free online. Preserves fonts, images, and formatting perfectly. No signup, no watermark required.",
    keywords: "convert word to pdf free, word to pdf online, docx to pdf free, doc to pdf converter, word pdf free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Word to PDF Free Online", "url": `${BASE_URL}/tools/convert-word-to-pdf-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-docx-to-pdf-keep-formatting": {
    title: "Convert DOCX to PDF Keep Formatting Free | PDF HUB 24",
    description: "Convert DOCX to PDF while preserving all formatting, fonts, and layout. Free online tool ensures your Word document looks identical as a PDF.",
    keywords: "docx to pdf keep formatting, word to pdf preserve layout, convert docx pdf formatting, word pdf same format",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert DOCX to PDF Keep Formatting", "url": `${BASE_URL}/tools/convert-docx-to-pdf-keep-formatting`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/edit-pdf-text-online-free": {
    title: "Edit PDF Text Online Free | PDF HUB 24",
    description: "Edit text in PDF documents online for free. Add, modify, or delete text directly in your PDF files. No software download or signup required.",
    keywords: "edit pdf text online free, modify pdf text, change text in pdf, pdf text editor free, edit pdf content",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Edit PDF Text Online Free", "url": `${BASE_URL}/tools/edit-pdf-text-online-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/edit-pdf-without-adobe-acrobat": {
    title: "Edit PDF Without Adobe Acrobat Free Online | PDF HUB 24",
    description: "Edit PDF files without Adobe Acrobat. Free online PDF editor with text, images, shapes, and annotations. No expensive software needed.",
    keywords: "edit pdf without adobe, pdf editor no acrobat, free alternative adobe acrobat, edit pdf free no adobe",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Edit PDF Without Adobe Acrobat", "url": `${BASE_URL}/tools/edit-pdf-without-adobe-acrobat`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-excel-with-tables": {
    title: "Convert PDF to Excel With Tables Free Online | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets accurately. Free online tool preserves table structure, rows, and columns. Extract data from PDF to XLSX.",
    keywords: "pdf to excel with tables, extract tables pdf excel, pdf table to spreadsheet, convert pdf tables xlsx",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to Excel With Tables", "url": `${BASE_URL}/tools/convert-pdf-to-excel-with-tables`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/extract-tables-from-pdf-to-spreadsheet": {
    title: "Extract Tables From PDF to Spreadsheet Free | PDF HUB 24",
    description: "Extract tables from PDF documents into editable spreadsheets. Free online tool detects and converts PDF tables to Excel or CSV format accurately.",
    keywords: "extract tables pdf, pdf table to spreadsheet, pdf table extractor, copy table from pdf to excel",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Extract Tables From PDF to Spreadsheet", "url": `${BASE_URL}/tools/extract-tables-from-pdf-to-spreadsheet`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-jpg-to-pdf-free-online": {
    title: "Convert JPG to PDF Free Online | PDF HUB 24",
    description: "Convert JPG and JPEG images to PDF free online. Combine multiple photos into one PDF document. Adjust page size and orientation. No signup needed.",
    keywords: "convert jpg to pdf free, jpeg to pdf online, jpg to pdf converter, image to pdf free online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert JPG to PDF Free Online", "url": `${BASE_URL}/tools/convert-jpg-to-pdf-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-multiple-images-to-one-pdf": {
    title: "Convert Multiple Images to One PDF Free Online | PDF HUB 24",
    description: "Combine multiple images into a single PDF document. Supports JPG, PNG, WebP, and more. Drag and drop to reorder pages. Free online, no signup.",
    keywords: "multiple images to pdf, combine images pdf, merge photos to pdf, images to one pdf free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert Multiple Images to One PDF", "url": `${BASE_URL}/tools/convert-multiple-images-to-one-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/add-page-numbers-to-pdf-free": {
    title: "Add Page Numbers to PDF Free Online | PDF HUB 24",
    description: "Add page numbers to any PDF document free online. Customize position, font, size, and starting number. Perfect for reports and manuscripts.",
    keywords: "add page numbers pdf free, number pdf pages, pdf page numbering, insert page numbers pdf online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Add Page Numbers to PDF Free", "url": `${BASE_URL}/tools/add-page-numbers-to-pdf-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/redact-pdf-black-out-text": {
    title: "Redact PDF Black Out Text Free Online | PDF HUB 24",
    description: "Black out sensitive text in PDF documents permanently. Free PDF redaction tool removes confidential information securely. GDPR and HIPAA compliant.",
    keywords: "redact pdf black out text, censor pdf text, black out pdf, remove sensitive info pdf, pdf redaction tool",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Redact PDF Black Out Text", "url": `${BASE_URL}/tools/redact-pdf-black-out-text`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/crop-pdf-margins-free-online": {
    title: "Crop PDF Margins Free Online | PDF HUB 24",
    description: "Crop and remove PDF margins free online. Trim white space, adjust page boundaries, and resize PDF content area. Perfect for printing and presentations.",
    keywords: "crop pdf margins free, trim pdf margins, remove pdf white space, pdf margin cutter online",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Crop PDF Margins Free Online", "url": `${BASE_URL}/tools/crop-pdf-margins-free-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/resize-pdf-to-a4-free": {
    title: "Resize PDF to A4 Free Online | PDF HUB 24",
    description: "Resize PDF pages to A4 paper size (210x297mm) free online. Convert Letter, Legal, or custom sizes to standard A4 format for printing.",
    keywords: "resize pdf a4 free, change pdf to a4, pdf a4 size converter, convert pdf page size a4",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Resize PDF to A4 Free", "url": `${BASE_URL}/tools/resize-pdf-to-a4-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-html-webpage-to-pdf": {
    title: "Convert HTML Webpage to PDF Free Online | PDF HUB 24",
    description: "Convert any HTML webpage to PDF free online. Render web pages with CSS styling, images, and layout preserved. Save websites as PDF documents.",
    keywords: "convert html to pdf, webpage to pdf, save website as pdf, html page to pdf online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert HTML Webpage to PDF", "url": `${BASE_URL}/tools/convert-html-webpage-to-pdf`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/compress-jpg-png-image-online": {
    title: "Compress JPG PNG Image Online Free | PDF HUB 24",
    description: "Compress JPG and PNG images online for free. Reduce image file size by up to 80% without visible quality loss. Perfect for web and email.",
    keywords: "compress jpg png online, image compressor free, reduce image size, compress photo online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Compress JPG PNG Image Online", "url": `${BASE_URL}/tools/compress-jpg-png-image-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/rearrange-pdf-pages-free": {
    title: "Rearrange PDF Pages Free Online | PDF HUB 24",
    description: "Rearrange and reorder PDF pages free online. Drag and drop to change page sequence. Move, swap, or reverse page order instantly. No signup needed.",
    keywords: "rearrange pdf pages free, reorder pdf pages, change pdf page order, move pdf pages, sort pdf pages",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Rearrange PDF Pages Free", "url": `${BASE_URL}/tools/rearrange-pdf-pages-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-png-high-resolution": {
    title: "Convert PDF to PNG High Resolution Free | PDF HUB 24",
    description: "Convert PDF pages to high-resolution PNG images free online. 300 DPI output with transparency support. Perfect for graphics and design work.",
    keywords: "pdf to png high resolution, convert pdf png hd, pdf to png 300dpi, high quality pdf to png",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to PNG High Resolution", "url": `${BASE_URL}/tools/convert-pdf-to-png-high-resolution`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/annotate-pdf-highlight-text-free": {
    title: "Annotate PDF Highlight Text Free Online | PDF HUB 24",
    description: "Highlight, underline, and annotate text in PDF documents free online. Add notes, comments, and markup to any PDF. Perfect for study and review.",
    keywords: "annotate pdf highlight text, highlight pdf free, pdf annotation tool, mark up pdf online free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Annotate PDF Highlight Text Free", "url": `${BASE_URL}/tools/annotate-pdf-highlight-text-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-powerpoint-free": {
    title: "Convert PDF to PowerPoint Free Online | PDF HUB 24",
    description: "Convert PDF files to editable PowerPoint (PPTX) presentations free online. Preserves slides, text, images, and layout. No signup or watermark.",
    keywords: "convert pdf to powerpoint free, pdf to pptx online, pdf to ppt converter free, pdf to slides free",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to PowerPoint Free", "url": `${BASE_URL}/tools/convert-pdf-to-powerpoint-free`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/convert-pdf-to-word-without-losing-formatting": {
    title: "Convert PDF to Word Without Losing Formatting Free | PDF HUB 24",
    description: "Convert PDF to Word DOCX without losing formatting. Free online converter preserves fonts, tables, images, and layout exactly as in the original PDF.",
    keywords: "pdf to word without losing formatting, convert pdf word keep format, pdf to docx preserve layout",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Convert PDF to Word Without Losing Formatting", "url": `${BASE_URL}/tools/convert-pdf-to-word-without-losing-formatting`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  },
  "/tools/unlock-pdf-remove-password-online": {
    title: "Unlock PDF Remove Password Online Free | PDF HUB 24",
    description: "Remove password protection from PDF files online for free. Unlock PDFs for editing, printing, and copying. Requires your password. 100% secure.",
    keywords: "unlock pdf remove password, remove pdf password online, pdf password remover free, unlock protected pdf",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "Unlock PDF Remove Password Online", "url": `${BASE_URL}/tools/unlock-pdf-remove-password-online`, "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL } }
  }
};

const SUPPORTED_HREFLANG_LANGS = ["en", "es", "ar", "hi", "fr", "pt", "de", "zh", "ja", "id", "ru", "it", "ur"];

function stripLangPrefix(path: string): { lang: string; canonicalPath: string; localPath: string } {
  const match = path.match(/^\/(es|ar|hi|fr|pt|de|zh|ja|id|ru|it|ur)(\/.*)?$/);
  if (match) {
    const lang = match[1];
    const rawPath = match[2] || "/";
    // Resolve translated slug to English path for config lookup
    const slug = rawPath.replace(/^\//, "");
    const englishSlug = TRANSLATED_TO_ENGLISH[slug];
    const canonicalPath = englishSlug ? `/${englishSlug}` : rawPath;
    return { lang, canonicalPath, localPath: rawPath };
  }
  return { lang: "en", canonicalPath: path, localPath: path };
}

/** Get the translated slug path for a given language and English tool path */
function getTranslatedPathForLang(lang: string, englishPath: string): string {
  const englishSlug = englishPath.replace(/^\//, "");
  const translated = TOOL_SLUG_TRANSLATIONS[englishSlug]?.[lang];
  return translated ? `/${translated}` : englishPath;
}

function generateHreflangTags(canonicalPath: string): string {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const tags = SUPPORTED_HREFLANG_LANGS.map(lang => {
    if (lang === "en") return `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`;
    const langPath = getTranslatedPathForLang(lang, canonicalPath);
    const url = `${BASE_URL}/${lang}${langPath === "/" ? "" : langPath}`;
    return `<link rel="alternate" hreflang="${lang}" href="${url}" />`;
  });
  tags.push(`<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
  return tags.join("\n    ");
}

function getLangAttribute(lang: string): string {
  const langMap: Record<string, string> = { en: "en", es: "es", ar: "ar", hi: "hi", fr: "fr", pt: "pt", de: "de", zh: "zh", ja: "ja", id: "id", ru: "ru", it: "it", ur: "ur" };
  return langMap[lang] || "en";
}

export function generateMetaTags(path: string): string {
  const { lang, canonicalPath, localPath } = stripLangPrefix(path);
  const seo = seoConfig[canonicalPath] || seoConfig["/"];
  // canonical uses the localPath (translated slug) so Google indexes the translated URL
  const canonicalUrl = lang === "en"
    ? `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`
    : `${BASE_URL}/${lang}${localPath === "/" ? "" : localPath}`;
  const hreflangTags = generateHreflangTags(canonicalPath);
  const langAttr = getLangAttribute(lang);

  const isNoindex = !!(seo.robots && seo.robots.includes("noindex"));
  const hreflangBlock = isNoindex ? "" : `\n    <!-- Hreflang International SEO -->\n    ${hreflangTags}`;

  // ── Detect page type ──────────────────────────────────────────────────────
  const blogSlugMatch = canonicalPath.match(/^\/blog\/([^/]+)$/);
  const blogPost = blogSlugMatch ? blogPosts.find(p => p.slug === blogSlugMatch[1]) : null;
  const progSlugMatch = canonicalPath.match(/^\/tools\/([^/]+)$/);
  const progPage = progSlugMatch ? (getProgrammaticPage(progSlugMatch[1]) ?? null) : null;
  const toolId = canonicalPath.replace(/^\//, "");
  const toolData = toolSEOData[toolId as keyof typeof toolSEOData] || null;

  // ── Override seo title/description from progPage for generated pages ──────
  const effectiveTitle = progPage ? progPage.title : seo.title;
  const effectiveDescription = progPage ? progPage.description : seo.description;
  const effectiveKeywords = seo.keywords || "";

  const ogTitle = seo.ogTitle || effectiveTitle;
  const ogDescription = seo.ogDescription || effectiveDescription;
  const ogUrl = isNoindex ? "" : (seo.ogUrl || canonicalUrl);
  const twitterTitle = seo.twitterTitle || ogTitle;
  const twitterDescription = seo.twitterDescription || ogDescription;
  const robotsContent = seo.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // ── og:type + article-specific OG tags ───────────────────────────────────
  const ogType = blogPost ? "article" : "website";
  const articleOgTags = blogPost ? `
    <meta property="article:published_time" content="${blogPost.publishDate || ""}" />
    <meta property="article:author" content="PDF HUB 24" />
    <meta property="article:section" content="${blogPost.category || "Tutorials"}" />
    ${(blogPost.tags || []).slice(0, 5).map(t => `<meta property="article:tag" content="${t}" />`).join("\n    ")}` : "";

  // ── Build JSON-LD schema array ────────────────────────────────────────────
  const schemas: object[] = [];

  if (blogPost) {
    // Full Article schema with all recommended fields
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blogPost.title || "",
      "description": blogPost.excerpt || "",
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png` }
      },
      "datePublished": blogPost.publishDate || "",
      "dateModified": blogPost.publishDate || "",
      "url": `${BASE_URL}/blog/${blogPost.slug}`,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${blogPost.slug}` },
      "keywords": (blogPost.tags || []).join(", "),
      "articleSection": blogPost.category || "Tutorials",
      "image": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png`, "width": 1200, "height": 630 }
    });
    // BreadcrumbList for blog article
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": blogPost.title || "", "item": `${BASE_URL}/blog/${blogPost.slug}` }
      ]
    });

  } else if (toolData) {
    // SoftwareApplication schema for tool pages
    const toolName = (toolData as any).pageTitle || seo.title.split(" | ")[0];
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": toolName,
      "description": (toolData as any).metaDescription || seo.description,
      "url": `${BASE_URL}${canonicalPath}`,
      "applicationCategory": "Utilities",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }
    });
    // FAQPage schema if FAQs exist
    if ((toolData as any).faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (toolData as any).faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      });
    }
    // BreadcrumbList for tool pages
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": toolName, "item": `${BASE_URL}${canonicalPath}` }
      ]
    });

  } else if (progPage) {
    // SoftwareApplication + FAQPage for programmatic/long-tail pages
    const pageName = (progPage.title || "").split(" | ")[0];
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": pageName,
      "description": progPage.description || "",
      "url": `${BASE_URL}${canonicalPath}`,
      "applicationCategory": "Utilities",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }
    });
    if (progPage.faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": progPage.faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      });
    }
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "PDF Tools", "item": `${BASE_URL}/all-tools` },
        { "@type": "ListItem", "position": 3, "name": pageName, "item": `${BASE_URL}${canonicalPath}` }
      ]
    });

  } else {
    // Default: use hardcoded schema from seoConfig
    if (seo.schema) schemas.push(seo.schema);

    if (canonicalPath === "/" || canonicalPath === "") {
      // Homepage: add Organization + FAQPage schemas
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png`, "width": 1200, "height": 630 },
        "sameAs": [],
        "description": "Free online PDF tools — merge, split, compress, convert, and edit PDF files with no signup."
      });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Are all PDF HUB 24 tools completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All 49+ PDF and image tools on PDF HUB 24 are 100% free with no signup, no watermarks, and no hidden limits." } },
          { "@type": "Question", "name": "Is it safe to upload my files to PDF HUB 24?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All uploads use SSL encryption. Files are processed in memory and automatically deleted within 1 hour. We never access or share your files." } },
          { "@type": "Question", "name": "Do I need to create an account to use the tools?", "acceptedAnswer": { "@type": "Answer", "text": "No account is required. All tools work instantly without registration — just upload your file and download the result." } },
          { "@type": "Question", "name": "What file formats does PDF HUB 24 support?", "acceptedAnswer": { "@type": "Answer", "text": "PDF HUB 24 supports PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, WebP, GIF, TIFF, and more." } },
          { "@type": "Question", "name": "Can I use PDF HUB 24 on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PDF HUB 24 is fully responsive and works on all devices — desktop, tablet, and mobile browsers." } }
        ]
      });
    } else {
      // Add BreadcrumbList for non-home pages
      const pageName = seo.title ? seo.title.split(" | ")[0] : "";
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": pageName, "item": `${BASE_URL}${canonicalPath}` }
        ]
      });
    }
  }

  const schemaBlocks = schemas
    .filter(Boolean)
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");

  return `
    <title>${effectiveTitle}</title>
    <meta name="description" content="${effectiveDescription}" />
    <meta name="keywords" content="${effectiveKeywords}" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${hreflangBlock}
    
    <!-- Open Graph -->
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    ${ogUrl ? `<meta property="og:url" content="${ogUrl}" />` : ""}
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="PDF HUB 24" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${langAttr}" />${articleOgTags}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${twitterTitle}" />
    <meta name="twitter:description" content="${twitterDescription}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    
    <!-- Robots -->
    <meta name="robots" content="${robotsContent}" />
    
    <!-- Structured Data -->
    ${schemaBlocks}
  `;
}

function generateCrawlableNav(currentPath: string): string {
  const toolLinks = [
    { href: "/pdf-to-word", text: "PDF to Word" },
    { href: "/pdf-to-jpg", text: "PDF to JPG" },
    { href: "/pdf-to-png", text: "PDF to PNG" },
    { href: "/pdf-to-excel", text: "PDF to Excel" },
    { href: "/pdf-to-ppt", text: "PDF to PowerPoint" },
    { href: "/word-to-pdf", text: "Word to PDF" },
    { href: "/jpg-to-pdf", text: "JPG to PDF" },
    { href: "/png-to-pdf", text: "PNG to PDF" },
    { href: "/excel-to-pdf", text: "Excel to PDF" },
    { href: "/ppt-to-pdf", text: "PowerPoint to PDF" },
    { href: "/tiff-to-pdf", text: "TIFF to PDF" },
    { href: "/gif-to-pdf", text: "GIF to PDF" },
    { href: "/html-to-pdf", text: "HTML to PDF" },
    { href: "/webp-to-pdf", text: "WebP to PDF" },
    { href: "/merge", text: "Merge PDF" },
    { href: "/split", text: "Split PDF" },
    { href: "/compress", text: "Compress PDF" },
    { href: "/rotate", text: "Rotate PDF" },
    { href: "/delete-pages", text: "Delete Pages" },
    { href: "/protect-pdf", text: "Protect PDF" },
    { href: "/unlock-pdf", text: "Unlock PDF" },
    { href: "/add-page-numbers", text: "Add Page Numbers" },
    { href: "/add-watermark", text: "Add Watermark" },
    { href: "/reorder-pages", text: "Reorder Pages" },
    { href: "/crop-pdf", text: "Crop PDF" },
    { href: "/resize-pdf", text: "Resize PDF" },
    { href: "/sign-pdf", text: "Sign PDF" },
    { href: "/flatten-pdf", text: "Flatten PDF" },
    { href: "/grayscale-pdf", text: "PDF to Grayscale" },
    { href: "/repair-pdf", text: "Repair PDF" },
    { href: "/edit-pdf", text: "Edit PDF" },
    { href: "/annotate-pdf", text: "Annotate PDF" },
    { href: "/redact-pdf", text: "Redact PDF" },
    { href: "/extract-text", text: "Extract Text" },
    { href: "/ocr-pdf", text: "OCR PDF" },
    { href: "/pdf-viewer", text: "PDF Viewer" },
    { href: "/compare-pdf", text: "Compare PDF" },
    { href: "/image-compressor", text: "Image Compressor" },
    { href: "/resize-image", text: "Resize Image" },
    { href: "/crop-image", text: "Crop Image" },
    { href: "/rotate-image", text: "Rotate Image" },
    { href: "/convert-image", text: "Convert Image" },
    { href: "/extract-images", text: "Extract Images from PDF" },
  ];

  const categoryLinks = [
    { href: "/convert-pdf", text: "Convert PDF Tools" },
    { href: "/compress-pdf-tools", text: "Compress PDF Tools" },
    { href: "/edit-pdf-tools", text: "Edit PDF Tools" },
    { href: "/secure-pdf", text: "Secure PDF Tools" },
    { href: "/image-tools", text: "Image Tools" },
    { href: "/all-tools", text: "All PDF Tools" },
    { href: "/free-pdf-converter", text: "Free PDF Converter" },
    { href: "/free-pdf-editor", text: "Free PDF Editor" },
  ];

  const programmaticLinks = [
    { href: "/tools/compress-pdf-under-100kb", text: "Compress PDF Under 100KB" },
    { href: "/tools/reduce-pdf-size-to-200kb", text: "Reduce PDF Size to 200KB" },
    { href: "/tools/compress-pdf-to-1mb", text: "Compress PDF to 1MB" },
    { href: "/tools/merge-pdf-for-visa-application", text: "Merge PDF for Visa Application" },
    { href: "/tools/convert-scanned-pdf-to-word-editable", text: "Convert Scanned PDF to Word" },
    { href: "/tools/make-pdf-smaller-for-email", text: "Make PDF Smaller for Email" },
    { href: "/tools/pdf-to-jpg-high-quality", text: "PDF to JPG High Quality" },
    { href: "/tools/merge-pdf-free-no-limit", text: "Merge PDF Free No Limit" },
    { href: "/tools/split-pdf-by-pages", text: "Split PDF by Pages" },
    { href: "/tools/add-signature-to-pdf-free", text: "Add Signature to PDF Free" },
    { href: "/tools/compress-pdf-without-losing-quality", text: "Compress PDF Without Losing Quality" },
    { href: "/tools/pdf-to-word-editable-free", text: "PDF to Word Editable Free" },
    { href: "/tools/unlock-pdf-for-editing", text: "Unlock PDF for Editing" },
    { href: "/tools/rotate-pdf-and-save", text: "Rotate PDF and Save" },
    { href: "/tools/convert-pdf-to-jpg-all-pages", text: "Convert PDF to JPG All Pages" },
    { href: "/tools/protect-pdf-with-password-free", text: "Protect PDF with Password Free" },
    { href: "/tools/remove-pages-from-pdf", text: "Remove Pages from PDF" },
    { href: "/tools/flatten-pdf-for-printing", text: "Flatten PDF for Printing" },
    { href: "/tools/add-watermark-to-pdf-free", text: "Add Watermark to PDF Free" },
    { href: "/tools/convert-excel-to-pdf-free", text: "Convert Excel to PDF Free" },
    { href: "/tools/convert-word-to-pdf-free-online", text: "Convert Word to PDF Free Online" },
    { href: "/tools/convert-docx-to-pdf-keep-formatting", text: "Convert DOCX to PDF Keep Formatting" },
    { href: "/tools/edit-pdf-text-online-free", text: "Edit PDF Text Online Free" },
    { href: "/tools/edit-pdf-without-adobe-acrobat", text: "Edit PDF Without Adobe Acrobat" },
    { href: "/tools/convert-pdf-to-excel-with-tables", text: "Convert PDF to Excel With Tables" },
    { href: "/tools/extract-tables-from-pdf-to-spreadsheet", text: "Extract Tables From PDF to Spreadsheet" },
    { href: "/tools/convert-jpg-to-pdf-free-online", text: "Convert JPG to PDF Free Online" },
    { href: "/tools/convert-multiple-images-to-one-pdf", text: "Convert Multiple Images to One PDF" },
    { href: "/tools/add-page-numbers-to-pdf-free", text: "Add Page Numbers to PDF Free" },
    { href: "/tools/redact-pdf-black-out-text", text: "Redact PDF Black Out Text" },
    { href: "/tools/crop-pdf-margins-free-online", text: "Crop PDF Margins Free Online" },
    { href: "/tools/resize-pdf-to-a4-free", text: "Resize PDF to A4 Free" },
    { href: "/tools/convert-html-webpage-to-pdf", text: "Convert HTML Webpage to PDF" },
    { href: "/tools/compress-jpg-png-image-online", text: "Compress JPG PNG Image Online" },
    { href: "/tools/rearrange-pdf-pages-free", text: "Rearrange PDF Pages Free" },
    { href: "/tools/convert-pdf-to-png-high-resolution", text: "Convert PDF to PNG High Resolution" },
    { href: "/tools/annotate-pdf-highlight-text-free", text: "Annotate PDF Highlight Text Free" },
    { href: "/tools/convert-pdf-to-powerpoint-free", text: "Convert PDF to PowerPoint Free" },
    { href: "/tools/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/tools/unlock-pdf-remove-password-online", text: "Unlock PDF Remove Password Online" },
  ];

  const blogLinks = [
    { href: "/blog/how-to-compress-pdf-for-email", text: "How to Compress PDF for Email" },
    { href: "/blog/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/blog/merge-pdf-files-guide", text: "How to Merge PDF Files" },
    { href: "/blog/protect-pdf-with-password", text: "Password Protect PDF Guide" },
    { href: "/blog/pdf-tools-for-students", text: "PDF Tools for Students" },
    { href: "/blog/how-to-split-pdf-pages", text: "How to Split PDF Pages" },
    { href: "/blog/add-page-numbers-to-pdf", text: "Add Page Numbers to PDF" },
    { href: "/blog/convert-images-to-pdf", text: "Convert Images to PDF" },
    { href: "/blog/ocr-scanned-pdf-to-text", text: "OCR Scanned PDF to Text" },
    { href: "/blog/rotate-pdf-pages", text: "Rotate PDF Pages" },
    { href: "/blog/sign-pdf-electronically", text: "Sign PDF Electronically" },
    { href: "/blog/edit-pdf-text-images", text: "Edit PDF Text and Images" },
    { href: "/blog/watermark-pdf-documents", text: "Watermark PDF Documents" },
    { href: "/blog/pdf-to-excel-convert-tables", text: "PDF to Excel Convert Tables" },
    { href: "/blog/redact-sensitive-pdf-information", text: "Redact Sensitive PDF Information" },
    { href: "/blog/how-to-flatten-pdf", text: "How to Flatten PDF" },
    { href: "/blog/crop-pdf-pages-guide", text: "Crop PDF Pages Guide" },
    { href: "/blog/resize-pdf-to-a4", text: "Resize PDF to A4" },
    { href: "/blog/compare-two-pdf-files", text: "Compare Two PDF Files" },
    { href: "/blog/html-to-pdf-conversion", text: "HTML to PDF Conversion" },
    { href: "/blog/extract-text-from-pdf", text: "Extract Text from PDF" },
    { href: "/blog/best-free-pdf-tools-2026", text: "Best Free PDF Tools 2026" },
    { href: "/blog/pdf-accessibility-guide", text: "PDF Accessibility Guide" },
    { href: "/blog/batch-convert-images-to-pdf", text: "Batch Convert Images to PDF" },
    { href: "/blog/unlock-pdf-remove-password", text: "Unlock PDF Remove Password" },
  ];

  const infoLinks = [
    { href: "/", text: "Home" },
    { href: "/blog", text: "Blog" },
    { href: "/about", text: "About Us" },
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/terms", text: "Terms of Service" },
    { href: "/contact", text: "Contact Us" },
    { href: "/dmca", text: "DMCA Policy" },
    { href: "/pricing", text: "Pricing" },
    { href: "/data-security", text: "Data Security" },
    { href: "/auto-delete", text: "Auto-Delete Policy" },
    { href: "/write-for-us", text: "Write for Us" },
    { href: "/embed", text: "Embed Our Tools" },
    { href: "/pdf-comparison-chart", text: "PDF Tools Comparison" },
    { href: "/pdf-file-formats-guide", text: "File Formats Guide" },
    { href: "/pdf-statistics", text: "PDF Statistics 2026" },
    { href: "/press", text: "Press and Media" },
  ];

  const allLinks = [...toolLinks, ...categoryLinks, ...programmaticLinks, ...blogLinks, ...infoLinks]
    .filter(link => link.href !== currentPath);

  const linkHtml = allLinks
    .map(link => `<a href="${link.href}">${link.text}</a>`)
    .join(" ");

  return `<nav aria-label="Site Navigation" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">${linkHtml}</nav>`;
}

function escJs(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, " ").replace(/\r/g, "");
}

function escHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Convert markdown text to plain HTML for crawler visibility
function markdownToHtml(md: string, maxWords = 600): string {
  const lines = md.split("\n");
  const parts: string[] = [];
  let wordCount = 0;
  let ulOpen = false;

  const closeUl = () => { if (ulOpen) { parts.push("</ul>"); ulOpen = false; } };
  const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  for (const rawLine of lines) {
    if (wordCount >= maxWords) break;
    const line = rawLine.trim();

    if (!line) { closeUl(); continue; }

    if (line.startsWith("#### ")) {
      closeUl();
      const text = escHtml(line.slice(5));
      parts.push(`<h4 style="font-size:0.95rem;font-weight:600;margin:1rem 0 0.4rem">${text}</h4>`);
      wordCount += countWords(line.slice(5));
    } else if (line.startsWith("### ")) {
      closeUl();
      const text = escHtml(line.slice(4));
      parts.push(`<h3 style="font-size:1.05rem;font-weight:700;margin:1.25rem 0 0.5rem">${text}</h3>`);
      wordCount += countWords(line.slice(4));
    } else if (line.startsWith("## ")) {
      closeUl();
      const text = escHtml(line.slice(3));
      parts.push(`<h2 style="font-size:1.2rem;font-weight:700;margin:1.5rem 0 0.6rem">${text}</h2>`);
      wordCount += countWords(line.slice(3));
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!ulOpen) { parts.push('<ul style="padding-left:1.5rem;line-height:1.8;margin:0.5rem 0">'); ulOpen = true; }
      const text = escHtml(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<li>${text}</li>`);
      wordCount += countWords(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      closeUl();
      const text = escHtml(line.replace(/^\d+\.\s/, "")).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<p style="margin:0.3rem 0;padding-left:1.2rem">${text}</p>`);
      wordCount += countWords(text);
    } else {
      closeUl();
      const text = escHtml(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      parts.push(`<p style="line-height:1.75;margin:0.6rem 0">${text}</p>`);
      wordCount += countWords(line);
    }
  }
  closeUl();
  return parts.join("\n");
}

function generatePreRenderShell(canonicalPath: string): string {
  try {
  const config = seoConfig[canonicalPath];
  const isHome = canonicalPath === "/";

  // Derive tool id from path (e.g. "/merge" → "merge")
  const toolId = canonicalPath.replace(/^\//, "");
  const toolData = toolSEOData[toolId as keyof typeof toolSEOData];

  // Blog article: /blog/:slug
  const blogSlugMatch = canonicalPath.match(/^\/blog\/([^/]+)$/);
  const blogPost = blogSlugMatch ? blogPosts.find(p => p.slug === blogSlugMatch[1]) : null;

  // Programmatic page: /tools/:slug
  const progSlugMatch = canonicalPath.match(/^\/tools\/([^/]+)$/);
  const progPage = progSlugMatch ? (getProgrammaticPage(progSlugMatch[1]) ?? null) : null;

  // Category hub: /convert-pdf, /edit-pdf-tools, etc.
  const categoryHub = categoryHubs.find(h => `/${h.slug}` === canonicalPath);

  let h1Text = "";
  let descText = "";

  if (isHome) {
    h1Text = "Professional PDF Tools — 100% Free Online";
    descText = "Convert, merge, compress, edit, sign, and secure PDF files instantly. 49 free tools with no registration, no watermarks, and no file size tricks. Trusted by users worldwide.";
  } else if (blogPost) {
    h1Text = blogPost.title || "";
    descText = blogPost.excerpt || "";
  } else if (progPage) {
    h1Text = (progPage.title || "").split(" | ")[0];
    descText = progPage.description || "";
  } else if (categoryHub) {
    h1Text = categoryHub.h1 || "";
    descText = categoryHub.description || "";
  } else if (toolData) {
    h1Text = toolData.longTailH1 || config?.title?.split(" | ")[0] || "";
    descText = toolData.metaDescription || config?.description || "";
  } else if (config?.h1) {
    h1Text = config.h1;
    descText = config.description || "";
  } else if (config?.title) {
    h1Text = config.title.split(" | ")[0];
    descText = config.description || "";
  } else {
    return "";
  }

  // Build rich content sections
  let richContent = "";

  // ── BLOG ARTICLE ────────────────────────────────────────────────────────────
  if (blogPost) {
    const meta = `<p style="font-size:0.875rem;color:#64748b;margin-bottom:1.5rem">
      ${escHtml(blogPost.publishDate || "")} &bull; ${escHtml(blogPost.readTime || "")} &bull; ${escHtml(blogPost.category || "")}
    </p>`;
    richContent += meta;
    richContent += `<article style="text-align:left;max-width:800px;width:100%;line-height:1.75">
      ${markdownToHtml(blogPost.content, 800)}
    </article>`;
    if (blogPost.relatedTools?.length) {
      const links = blogPost.relatedTools.map(t =>
        `<a href="${escHtml(t.path)}" style="color:#2563eb;text-decoration:none">${escHtml(t.name)} — ${escHtml(t.description)}</a>`
      ).join("<br>");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Related PDF Tools</h2>
        <div style="display:flex;flex-direction:column;gap:0.5rem">${links}</div>
      </section>`;
    }
  }

  // ── PROGRAMMATIC PAGE ────────────────────────────────────────────────────────
  else if (progPage) {
    richContent += `<p style="line-height:1.75;max-width:800px;margin-bottom:1.5rem">${escHtml(progPage.content)}</p>`;
    if (progPage.useCases?.length) {
      const items = progPage.useCases.map(u => `<li style="margin-bottom:0.4rem">${escHtml(u)}</li>`).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Common Use Cases</h2>
        <ul style="padding-left:1.5rem;line-height:1.8">${items}</ul>
      </section>`;
    }
    if (progPage.faqs?.length) {
      const faqs = progPage.faqs.map(f =>
        `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Frequently Asked Questions</h2>
        ${faqs}
      </section>`;
    }
  }

  // ── CATEGORY HUB ─────────────────────────────────────────────────────────────
  else if (categoryHub) {
    richContent += `<div style="text-align:left;max-width:800px;width:100%;line-height:1.75;margin-bottom:1.5rem">
      ${markdownToHtml(categoryHub.intro, 400)}
    </div>`;
    if (categoryHub.tools?.length) {
      const toolLinks = categoryHub.tools.map(t =>
        `<li style="margin-bottom:0.5rem"><a href="${escHtml(t.path)}" style="color:#2563eb;text-decoration:none;font-weight:600">${escHtml(t.name)}</a> — ${escHtml(t.description)}</li>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Available Tools</h2>
        <ul style="padding-left:1.5rem;line-height:1.9">${toolLinks}</ul>
      </section>`;
    }
    if (categoryHub.faqs?.length) {
      const faqs = categoryHub.faqs.map(f =>
        `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Frequently Asked Questions</h2>
        ${faqs}
      </section>`;
    }
  }

  // ── TOOL PAGE ─────────────────────────────────────────────────────────────────
  else if (toolData) {
    if (toolData.useCases?.items?.length) {
      const items = toolData.useCases.items.map(i => `<li>${escHtml(i)}</li>`).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(toolData.useCases.title)}</h2>
        <p style="margin-bottom:0.75rem">${escHtml(toolData.useCases.description)}</p>
        <ul style="padding-left:1.5rem;line-height:1.8">${items}</ul>
      </section>`;
    }
    if (toolData.tutorial?.steps?.length) {
      const steps = toolData.tutorial.steps.map((s) =>
        `<li style="margin-bottom:0.75rem"><strong>${escHtml(s.step)}:</strong> ${escHtml(s.detail)}</li>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${escHtml(toolData.tutorial.title)}</h2>
        <ol style="padding-left:1.5rem;line-height:1.8">${steps}</ol>
      </section>`;
    }
    if (toolData.faqs?.length) {
      const faqs = toolData.faqs.map(f =>
        `<div style="margin-bottom:1rem"><h3 style="font-size:1rem;font-weight:600;margin-bottom:0.25rem">${escHtml(f.question)}</h3><p style="line-height:1.7">${escHtml(f.answer)}</p></div>`
      ).join("");
      richContent += `<section style="margin:2rem 0;text-align:left;max-width:800px;width:100%">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">Frequently Asked Questions</h2>
        ${faqs}
      </section>`;
    }
    const realLinks = toolData.internalLinks?.filter(l => !l.href.startsWith("/blog/")) || [];
    if (realLinks.length) {
      const links = realLinks.map(l =>
        `<a href="${escHtml(l.href)}" style="color:#2563eb;text-decoration:none;margin-right:1.5rem">${escHtml(l.text)}</a>`
      ).join("");
      richContent += `<nav style="margin:1.5rem 0;text-align:left;max-width:800px;width:100%;flex-wrap:wrap;display:flex;gap:0.5rem">${links}</nav>`;
    }
  }

  // Comprehensive internal link sections — visible to crawlers on ALL pages
  const ALL_TOOLS = [
    { href: "/pdf-to-word", text: "PDF to Word", cat: "Convert from PDF" },
    { href: "/pdf-to-jpg", text: "PDF to JPG", cat: "Convert from PDF" },
    { href: "/pdf-to-png", text: "PDF to PNG", cat: "Convert from PDF" },
    { href: "/pdf-to-excel", text: "PDF to Excel", cat: "Convert from PDF" },
    { href: "/pdf-to-ppt", text: "PDF to PowerPoint", cat: "Convert from PDF" },
    { href: "/word-to-pdf", text: "Word to PDF", cat: "Convert to PDF" },
    { href: "/jpg-to-pdf", text: "JPG to PDF", cat: "Convert to PDF" },
    { href: "/png-to-pdf", text: "PNG to PDF", cat: "Convert to PDF" },
    { href: "/excel-to-pdf", text: "Excel to PDF", cat: "Convert to PDF" },
    { href: "/ppt-to-pdf", text: "PowerPoint to PDF", cat: "Convert to PDF" },
    { href: "/html-to-pdf", text: "HTML to PDF", cat: "Convert to PDF" },
    { href: "/tiff-to-pdf", text: "TIFF to PDF", cat: "Convert to PDF" },
    { href: "/webp-to-pdf", text: "WebP to PDF", cat: "Convert to PDF" },
    { href: "/merge", text: "Merge PDF", cat: "Edit PDF" },
    { href: "/split", text: "Split PDF", cat: "Edit PDF" },
    { href: "/compress", text: "Compress PDF", cat: "Edit PDF" },
    { href: "/rotate", text: "Rotate PDF", cat: "Edit PDF" },
    { href: "/edit-pdf", text: "Edit PDF Text", cat: "Edit PDF" },
    { href: "/annotate-pdf", text: "Annotate PDF", cat: "Edit PDF" },
    { href: "/redact-pdf", text: "Redact PDF", cat: "Edit PDF" },
    { href: "/add-watermark", text: "Add Watermark", cat: "Edit PDF" },
    { href: "/add-page-numbers", text: "Add Page Numbers", cat: "Edit PDF" },
    { href: "/extract-pages", text: "Extract Pages", cat: "Edit PDF" },
    { href: "/delete-pages", text: "Delete Pages", cat: "Edit PDF" },
    { href: "/reorder-pages", text: "Reorder Pages", cat: "Edit PDF" },
    { href: "/resize-pdf", text: "Resize PDF", cat: "Edit PDF" },
    { href: "/crop-pdf", text: "Crop PDF", cat: "Edit PDF" },
    { href: "/flatten-pdf", text: "Flatten PDF", cat: "Edit PDF" },
    { href: "/repair-pdf", text: "Repair PDF", cat: "Edit PDF" },
    { href: "/grayscale-pdf", text: "PDF to Grayscale", cat: "Edit PDF" },
    { href: "/protect-pdf", text: "Protect PDF", cat: "Secure PDF" },
    { href: "/unlock-pdf", text: "Unlock PDF", cat: "Secure PDF" },
    { href: "/sign-pdf", text: "Sign PDF", cat: "Secure PDF" },
    { href: "/ocr-pdf", text: "OCR PDF", cat: "Utility" },
    { href: "/translate-pdf", text: "Translate PDF", cat: "Utility" },
    { href: "/compare-pdf", text: "Compare PDFs", cat: "Utility" },
    { href: "/batch-compress", text: "Batch Compress", cat: "Utility" },
    { href: "/scan-to-pdf", text: "Scan to PDF", cat: "Utility" },
    { href: "/pdf-to-pdfa", text: "PDF to PDF/A", cat: "Utility" },
    { href: "/compress-img", text: "Compress Image", cat: "Image Tools" },
    { href: "/resize-image", text: "Resize Image", cat: "Image Tools" },
    { href: "/crop-image", text: "Crop Image", cat: "Image Tools" },
    { href: "/convert-image", text: "Convert Image", cat: "Image Tools" },
    { href: "/rotate-image", text: "Rotate Image", cat: "Image Tools" },
    { href: "/remove-bg", text: "Remove Background", cat: "Image Tools" },
    { href: "/jpg-to-png", text: "JPG to PNG", cat: "Image Tools" },
    { href: "/png-to-jpg", text: "PNG to JPG", cat: "Image Tools" },
    { href: "/image-to-text", text: "Image to Text", cat: "Image Tools" },
  ];

  const ALL_BLOGS = [
    { href: "/blog/how-to-compress-pdf-for-email", text: "How to Compress PDF for Email" },
    { href: "/blog/convert-pdf-to-word-without-losing-formatting", text: "Convert PDF to Word Without Losing Formatting" },
    { href: "/blog/merge-pdf-files-guide", text: "How to Merge PDF Files Online for Free" },
    { href: "/blog/protect-pdf-with-password", text: "How to Password Protect a PDF" },
    { href: "/blog/pdf-tools-for-students", text: "Essential PDF Tools Every Student Needs" },
    { href: "/blog/how-to-split-pdf-pages", text: "How to Split PDF Pages" },
    { href: "/blog/add-page-numbers-to-pdf", text: "How to Add Page Numbers to PDF" },
    { href: "/blog/convert-images-to-pdf", text: "How to Convert Images to PDF" },
    { href: "/blog/ocr-scanned-pdf-to-text", text: "OCR PDF: Convert Scanned Documents to Text" },
    { href: "/blog/rotate-pdf-pages", text: "How to Rotate PDF Pages" },
    { href: "/blog/sign-pdf-electronically", text: "How to Sign a PDF Electronically" },
    { href: "/blog/edit-pdf-text-images", text: "How to Edit a PDF" },
    { href: "/blog/watermark-pdf-documents", text: "How to Add Watermark to PDF" },
    { href: "/blog/pdf-to-excel-convert-tables", text: "Convert PDF Tables to Excel" },
    { href: "/blog/redact-sensitive-pdf-information", text: "How to Redact Sensitive Information in PDF" },
    { href: "/blog/how-to-flatten-pdf", text: "How to Flatten a PDF" },
    { href: "/blog/crop-pdf-pages-guide", text: "How to Crop PDF Pages" },
    { href: "/blog/resize-pdf-to-a4", text: "How to Resize PDF to A4" },
    { href: "/blog/compare-two-pdf-files", text: "How to Compare Two PDF Files" },
    { href: "/blog/html-to-pdf-conversion", text: "How to Convert HTML to PDF" },
    { href: "/blog/extract-text-from-pdf", text: "How to Extract Text from PDF" },
    { href: "/blog/best-free-pdf-tools-2026", text: "Best Free PDF Tools in 2026" },
    { href: "/blog/pdf-accessibility-guide", text: "Making PDFs Accessible" },
    { href: "/blog/batch-convert-images-to-pdf", text: "Batch Convert Images to PDF" },
    { href: "/blog/unlock-pdf-remove-password", text: "How to Unlock a PDF" },
    { href: "/blog/annotate-pdf-comments", text: "How to Annotate PDF" },
    { href: "/blog/translate-pdf-documents", text: "How to Translate a PDF" },
    { href: "/blog/repair-corrupted-pdf", text: "How to Repair a Corrupted PDF" },
    { href: "/blog/pdf-to-powerpoint-guide", text: "PDF to PowerPoint Guide" },
    { href: "/blog/jpg-to-pdf-guide", text: "How to Convert JPG to PDF" },
    { href: "/blog/compress-images-online", text: "How to Compress Images" },
    { href: "/blog/reorder-pdf-pages", text: "How to Reorder PDF Pages" },
    { href: "/blog/remove-background-from-image", text: "Remove Image Background" },
    { href: "/blog/convert-pdf-to-png", text: "PDF to PNG Guide" },
    { href: "/blog/excel-to-pdf", text: "How to Convert Excel to PDF" },
  ];

  const lnkStyle = `display:inline-block;padding:0.35rem 0.75rem;background:#f1f5f9;color:#1e40af;text-decoration:none;border-radius:4px;font-size:0.875rem;font-weight:500;margin:0.2rem`;

  if (isHome) {
    const toolsByCategory: Record<string, typeof ALL_TOOLS> = {};
    ALL_TOOLS.forEach(t => {
      if (!toolsByCategory[t.cat]) toolsByCategory[t.cat] = [];
      toolsByCategory[t.cat].push(t);
    });
    let homeToolSections = "";
    for (const [cat, tools] of Object.entries(toolsByCategory)) {
      const toolLinks = tools.map(t => `<a href="${escHtml(t.href)}" style="${lnkStyle}">${escHtml(t.text)}</a>`).join("");
      homeToolSections += `<div style="margin-bottom:1.25rem">
        <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:0.5rem;color:#334155;text-transform:uppercase;letter-spacing:0.05em">${escHtml(cat)}</h3>
        <div style="display:flex;flex-wrap:wrap">${toolLinks}</div>
      </div>`;
    }
    const catHubLinks = [
      { href: "/convert-pdf", text: "Convert PDF Tools" },
      { href: "/edit-pdf-tools", text: "Edit PDF Tools" },
      { href: "/compress-pdf-tools", text: "Compress PDF Tools" },
      { href: "/secure-pdf", text: "Secure PDF Tools" },
      { href: "/image-tools", text: "Image Tools" },
    ].map(c => `<a href="${escHtml(c.href)}" style="${lnkStyle}">${escHtml(c.text)}</a>`).join("");
    const blogLinks = ALL_BLOGS.map(b => `<a href="${escHtml(b.href)}" style="${lnkStyle}">${escHtml(b.text)}</a>`).join("");
    const footerLinks = [
      { href: "/all-tools", text: "All PDF Tools" },
      { href: "/blog", text: "Blog & Guides" },
      { href: "/about", text: "About Us" },
      { href: "/contact", text: "Contact" },
      { href: "/pricing", text: "Pricing" },
      { href: "/data-security", text: "Data Security" },
      { href: "/auto-delete", text: "Auto Delete Policy" },
      { href: "/privacy", text: "Privacy Policy" },
      { href: "/terms", text: "Terms of Service" },
      { href: "/write-for-us", text: "Write for Us" },
      { href: "/embed", text: "Embed Widget" },
      { href: "/pdf-comparison-chart", text: "PDF Tool Comparison" },
      { href: "/pdf-file-formats-guide", text: "PDF Formats Guide" },
    ].map(f => `<a href="${escHtml(f.href)}" style="${lnkStyle}">${escHtml(f.text)}</a>`).join("");

    richContent += `<section style="margin:2.5rem 0 1rem;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;color:#0f172a">All Free PDF &amp; Image Tools</h2>
      ${homeToolSections}
    </section>
    <section style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">Tool Categories</h2>
      <div style="display:flex;flex-wrap:wrap">${catHubLinks}</div>
    </section>
    <section style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">PDF Guides &amp; Tutorials</h2>
      <div style="display:flex;flex-wrap:wrap">${blogLinks}</div>
    </section>
    <nav style="margin:2rem 0;text-align:left;max-width:900px;width:100%">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">Company</h2>
      <div style="display:flex;flex-wrap:wrap">${footerLinks}</div>
    </nav>`;
  } else {
    const allToolLinks = ALL_TOOLS.filter(t => t.href !== canonicalPath)
      .map(t => `<a href="${escHtml(t.href)}" style="${lnkStyle}">${escHtml(t.text)}</a>`).join("");
    richContent += `<section style="margin:2.5rem 0 1rem;padding:1.5rem;background:#f8fafc;border-radius:8px;text-align:left;max-width:800px;width:100%">
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem;color:#0f172a">Explore All Free PDF &amp; Image Tools</h2>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem">${allToolLinks}</div>
    </section>`;
  }

  // Static HTML pre-render — visible to Google on first-wave crawl
  // Small inline script only applies theme colors (no DOM creation)
  return `<div id="__psr" style="min-height:100vh;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;background:#ffffff;color:#0f172a">
  <div style="height:56px;border-bottom:1px solid rgba(0,0,0,0.08);display:flex;align-items:center;padding:0 1.5rem">
    <a href="/" style="font-size:1.25rem;font-weight:700;color:#2563eb;text-decoration:none">PDF HUB 24</a>
  </div>
  <main style="flex:1;max-width:1024px;margin:0 auto;padding:2.5rem 1.5rem;width:100%">
    <h1 style="font-size:clamp(1.5rem,5vw,2.75rem);font-weight:700;line-height:1.15;margin-bottom:1rem">${escHtml(h1Text)}</h1>
    <p style="font-size:1.05rem;line-height:1.7;margin-bottom:1.5rem;max-width:700px">${escHtml(descText)}</p>
    ${richContent}
  </main>
</div>
<script>(function(){try{var e=document.getElementById('__psr');if(!e)return;var t=localStorage.getItem('theme')||'system';var dk=t==='dark'||(t!=='light'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(dk){e.style.background='#0a0a0a';e.style.color='#f8fafc';}}catch(err){}})();</script>`;
  } catch (err) {
    console.error("[SEO] generatePreRenderShell error for", canonicalPath, err);
    return "";
  }
}

export function injectSEO(html: string, path: string): string {
  const { lang, canonicalPath } = stripLangPrefix(path);
  const metaTags = generateMetaTags(path);
  const preRenderShell = generatePreRenderShell(canonicalPath);
  const dir = (lang === "ar" || lang === "ur") ? "rtl" : "ltr";
  
  return html
    .replace(/<html([^>]*)>/, `<html lang="${lang}" dir="${dir}">`)
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*\/?>/, '')
    .replace(/<link rel="canonical"[^>]*\/?>/, '')
    .replace(/<link rel="alternate"[^>]*\/?>/, '')
    .replace(/<meta name="robots"[^>]*\/?>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace('</head>', `${metaTags}\n  </head>`)
    .replace('<div id="root">', `<div id="root">${preRenderShell}`);
}
