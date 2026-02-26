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
    title: "Free Online PDF Tools | Convert & Merge | PDF HUB 24",
    description: "Free online PDF tools for merging, splitting, compressing, and converting. 43+ tools including PDF to Word and image conversion.",
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
    title: "Merge PDF Files Online Free - Combine PDFs | PDF HUB 24",
    description: "Merge multiple PDF files into one document instantly. Free online PDF merger - no registration, no watermarks. Drag and drop to combine PDFs in seconds.",
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
    title: "Split PDF Online Free - Extract Pages from PDF | PDF HUB 24",
    description: "Split PDF files and extract specific pages instantly. Free online PDF splitter - select page ranges, extract single pages. No registration required.",
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
    title: "Compress PDF Online Free - Reduce PDF File Size | PDF HUB 24",
    description: "Compress PDF files and reduce file size by up to 90%. Free online PDF compressor with quality options. Optimize PDFs for email and web sharing.",
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
    title: "Rotate PDF Online Free - Turn PDF Pages | PDF HUB 24",
    description: "Rotate PDF pages 90°, 180°, or 270° clockwise. Free online PDF rotator - fix orientation issues instantly. No watermarks, no registration.",
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
    title: "Free PDF to Word Converter - PDF to DOCX | PDF HUB 24",
    description: "Convert PDF to editable Word documents (DOCX) instantly. Free online PDF to Word converter with high accuracy. Preserves formatting and layout.",
    keywords: "PDF to Word, PDF to DOCX, convert PDF to Word, PDF converter, PDF to Word online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PDF to Word Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-word`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  },
  "/pdf-to-jpg": {
    title: "Free PDF to JPG Converter - PDF to Images | PDF HUB 24",
    description: "Convert PDF pages to high-quality JPG images instantly. Free online PDF to JPG converter - extract all pages as separate images. No registration.",
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
    title: "Free PDF to PNG Converter - PDF to PNG | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images with transparency. Free online PDF to PNG converter - perfect for graphics and presentations.",
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
    title: "Free PDF to Excel Converter - PDF to XLS | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets (XLS/XLSX) instantly. Free online PDF to Excel converter - extract data accurately. No registration.",
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
    title: "Free PDF to PowerPoint Converter - to PPT | PDF HUB 24",
    description: "Convert PDF to editable PowerPoint presentations (PPT/PPTX) instantly. Free online PDF to PowerPoint converter - preserves slides and formatting.",
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
    title: "Free Word to PDF Converter - DOCX to PDF | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF instantly. Free online Word to PDF converter - preserves formatting perfectly. No registration required.",
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
    title: "Free JPG to PDF Converter - Images to PDF | PDF HUB 24",
    description: "Convert JPG images to PDF documents instantly. Free online JPG to PDF converter - combine multiple images into one PDF. No registration.",
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
    title: "Free PNG to PDF Converter - PNG to PDF | PDF HUB 24",
    description: "Convert PNG images to PDF documents instantly. Free online PNG to PDF converter - maintains transparency and quality. No registration required.",
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
    title: "Free Excel to PDF Converter - XLS to PDF | PDF HUB 24",
    description: "Convert Excel spreadsheets (XLS/XLSX) to PDF instantly. Free online Excel to PDF converter - preserves tables and formatting perfectly.",
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
    title: "Free PowerPoint to PDF Converter - PPT to PDF | PDF HUB 24",
    description: "Convert PowerPoint presentations (PPT/PPTX) to PDF instantly. Free online PowerPoint to PDF converter - preserves slides and animations.",
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
    title: "Free PDF Password Protection - Encrypt PDF | PDF HUB 24",
    description: "Add password protection to PDF files instantly. Free online PDF encryption tool - secure your documents with strong encryption. No registration.",
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
    title: "Unlock PDF Online Free - Remove PDF Password | PDF HUB 24",
    description: "Remove password protection from PDF files instantly. Free online PDF unlocker - unlock password-protected PDFs. Requires knowing the password.",
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
    title: "Free Delete PDF Pages - Remove Pages | PDF HUB 24",
    description: "Remove unwanted pages from PDF documents instantly. Free online PDF page remover - select and delete specific pages. No registration required.",
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
    title: "Add Page Numbers to PDF Online Free | PDF HUB 24",
    description: "Add page numbers to PDF documents instantly. Free online PDF page numbering tool - customize position, format, and style. No registration.",
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
    title: "Add Watermark to PDF Online Free | PDF HUB 24",
    description: "Add text watermarks to PDF documents instantly. Free online PDF watermarking tool - customize text, position, and opacity. No registration.",
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
    title: "Reorder PDF Pages Online Free - Rearrange Pages | PDF HUB 24",
    description: "Reorder and rearrange PDF pages with drag and drop. Free online PDF page organizer - change page sequence instantly. No registration required.",
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
    title: "Extract Text from PDF Online Free - PDF to Text | PDF HUB 24",
    description: "Extract text content from PDF documents instantly. Free online PDF text extractor - copy text from any PDF. No registration required.",
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
    title: "Extract Images from PDF Online Free | PDF HUB 24",
    description: "Extract all images from PDF documents instantly. Free online PDF image extractor - download images in original quality. No registration.",
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
    title: "Free OCR PDF - Extract Text from Scans | PDF HUB 24",
    description: "OCR scanned PDFs and extract text using optical character recognition. Free online OCR tool - convert scanned documents to searchable text.",
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
    title: "Crop PDF Online Free - Trim PDF Margins | PDF HUB 24",
    description: "Crop and trim PDF page margins instantly. Free online PDF cropper - remove white space and unwanted areas. No registration required.",
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
    title: "Resize PDF Online Free - Change PDF Page Size | PDF HUB 24",
    description: "Resize PDF pages to A4, Letter, Legal, and more. Free online PDF resizer - change document dimensions instantly. No registration.",
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
    title: "Sign PDF Online Free - Add Signature to PDF | PDF HUB 24",
    description: "Add your signature to PDF documents instantly. Free online PDF signing tool - draw or type your signature. No registration required.",
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
    title: "Flatten PDF Online Free - Merge Layers | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content. Free online PDF flattener - convert fillable forms to regular PDFs. No registration.",
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
    title: "Free PDF to Grayscale - Black & White | PDF HUB 24",
    description: "Convert PDF to grayscale (black and white) for printing. Free online PDF grayscale converter - reduce ink usage. No registration required.",
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
    title: "Repair PDF Online Free - Fix Corrupted PDF | PDF HUB 24",
    description: "Repair corrupted or damaged PDF files instantly. Free online PDF repair tool - fix broken PDFs and recover content. No registration.",
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
    title: "Edit PDF Online Free - Add Text & Images | PDF HUB 24",
    description: "Edit PDF documents online - add text, images, and shapes. Free online PDF editor with drawing tools. No registration required.",
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
    title: "Annotate PDF Online Free - Highlight & Markup | PDF HUB 24",
    description: "Annotate PDF documents with highlights, underlines, and notes. Free online PDF annotation tool - mark up any PDF. No registration.",
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
    title: "Free Redact PDF - Black Out Sensitive Info | PDF HUB 24",
    description: "Redact sensitive information from PDF documents. Free online PDF redaction tool - permanently black out text. No registration required.",
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
    title: "TIFF to PDF Converter Online Free | PDF HUB 24",
    description: "Convert TIFF images to PDF documents instantly. Free online TIFF to PDF converter - maintains image quality. No registration required.",
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
    title: "GIF to PDF Converter Online Free | PDF HUB 24",
    description: "Convert GIF images to PDF documents instantly. Free online GIF to PDF converter - preserves all frames. No registration required.",
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
    title: "WebP to PDF Converter Online Free | PDF HUB 24",
    description: "Convert WebP images to PDF documents instantly. Free online WebP to PDF converter - maintains quality. No registration required.",
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
    title: "HTML to PDF Converter Online Free | PDF HUB 24",
    description: "Convert HTML code to PDF documents instantly. Free online HTML to PDF converter - render web pages as PDFs. No registration required.",
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
    title: "PDF Viewer Online Free - View PDF Files | PDF HUB 24",
    description: "View PDF files directly in your browser. Free online PDF viewer - no download required. Open and read PDFs instantly.",
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
    title: "Free Compare PDF - Find Differences | PDF HUB 24",
    description: "Compare two PDF files and find differences instantly. Free online PDF comparison tool - highlight changes between documents.",
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
    title: "Free Image Compressor - JPG PNG WebP | PDF HUB 24",
    description: "Compress images (JPG, PNG, WebP) and reduce file size. Free online image compressor - maintain quality while saving space.",
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
    title: "Free Resize Image - Change Dimensions | PDF HUB 24",
    description: "Resize images by pixels or percentage. Free online image resizer - scale images to any size. Supports JPG, PNG, WebP.",
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
    title: "Crop Image Online Free - Trim Images | PDF HUB 24",
    description: "Crop images to remove unwanted areas. Free online image cropper - select and trim any portion. Supports JPG, PNG, WebP.",
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
    title: "Rotate & Flip Image Online Free | PDF HUB 24",
    description: "Rotate or flip images in any direction. Free online image rotator - turn images 90°, 180°, or flip horizontally/vertically.",
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
    title: "Convert Image Online Free - JPG PNG WebP GIF | PDF HUB 24",
    description: "Convert between image formats - JPG, PNG, WebP, GIF, TIFF, BMP. Free online image converter - change format instantly.",
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
    title: "PDF Tips & Tutorials Blog | PDF HUB 24",
    description: "Learn how to work with PDF files effectively. Tutorials, guides, and tips for compressing, converting, merging, and editing PDFs.",
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
    title: "Compress PDF for Email - Reduce Under 25MB | PDF HUB 24",
    description: "Learn how to compress PDF files for email attachments. Step-by-step guide to reduce PDF size under 25MB, 10MB, or even 1MB while maintaining quality.",
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
    title: "Convert PDF to Word Without Losing Formatting | PDF HUB 24",
    description: "Learn how to convert PDF to editable Word documents while preserving formatting, tables, and images. Free online converter with step-by-step instructions.",
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
    title: "How to Merge PDF Files - Combine Multiple PDFs | PDF HUB 24",
    description: "Learn how to merge multiple PDF files into one document. Step-by-step guide for combining PDFs online for free. Reorder pages easily.",
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
    title: "Password Protect PDF - Secure Documents | PDF HUB 24",
    description: "Learn how to add password protection to PDF files. Step-by-step guide to encrypting PDFs, setting permissions, and keeping sensitive documents secure.",
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
    title: "PDF Tools for Students - Free Academic Tools | PDF HUB 24",
    description: "Discover the essential PDF tools every student needs for academic success. Free tools for research papers, assignments, presentations, and study materials.",
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
    title: "How to Sign a PDF Electronically - Free Guide | PDF HUB 24",
    description: "Learn how to sign PDF documents electronically for free. Step-by-step guide to adding digital signatures, drawing signatures, and e-signing PDFs online.",
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
    title: "Edit PDF - Add Text, Images & Shapes | PDF HUB 24",
    description: "Learn how to edit PDF files online for free. Add text, images, shapes, and annotations to any PDF document. No software installation required.",
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
    title: "How to Add Watermark to PDF - Free Online Guide | PDF HUB 24",
    description: "Learn how to add text watermarks to PDF documents for free. Protect your PDFs with custom watermarks - set position, opacity, and style.",
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
    title: "How to Convert PDF Tables to Excel - Free Guide | PDF HUB 24",
    description: "Learn how to convert PDF tables to Excel spreadsheets accurately. Extract data from PDF to XLS/XLSX while preserving table structure and formatting.",
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
    title: "Redact Sensitive Info in PDFs Free | PDF HUB 24",
    description: "Learn how to permanently redact sensitive information from PDF documents. Black out text, images, and personal data securely with our free guide.",
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
    title: "All 43+ Free PDF Tools - Complete List | PDF HUB 24",
    description: "Browse all 43+ free online PDF tools. Convert, edit, merge, split, compress PDFs and more. Complete list of PDF HUB 24 tools.",
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
    title: "Free PDF Converter - Convert Any File | PDF HUB 24",
    description: "Best free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. Convert images and documents to PDF. No signup required.",
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
    title: "Split PDF Pages Free - Extract Sections | PDF HUB 24",
    description: "Split PDF pages free online. Extract specific pages, separate sections from large PDFs. Best free PDF splitter - no software install, no signup required.",
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
    title: "Add Page Numbers to PDF Free | PDF HUB 24",
    description: "Add page numbers to PDF free. Customize position, style, starting number. Best free PDF numbering tool for reports. No signup.",
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
    title: "Convert Images to PDF Free - JPG PNG | PDF HUB 24",
    description: "Convert images to PDF free. JPG, PNG, WebP, TIFF, GIF to PDF instantly. Best free image to PDF converter - combine multiple images, no registration.",
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
    title: "OCR PDF Free - Scanned PDF to Text | PDF HUB 24",
    description: "OCR PDF free online. Convert scanned documents to searchable, editable text. Best free OCR tool - extract text from images and scanned pages instantly.",
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
    title: "Rotate PDF Pages Free - Fix Orientation | PDF HUB 24",
    description: "Rotate PDF pages free online. Fix upside-down or sideways PDFs. Rotate 90, 180, 270 degrees. Best free PDF rotation tool for all pages.",
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
  "/free-pdf-editor": {
    title: "Free PDF Editor Online - Edit PDF Files Free | PDF HUB 24",
    description: "Best free online PDF editor. Edit, merge, split, compress, rotate, sign, annotate, and redact PDF files. No software download or registration needed.",
    keywords: "free PDF editor, edit PDF online, PDF editor free, online PDF editor, modify PDF free",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free PDF Editor - PDF HUB 24",
      "url": `${BASE_URL}/free-pdf-editor`,
      "description": "Edit PDF files online for free - merge, split, compress, rotate, sign, annotate, and more",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
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
