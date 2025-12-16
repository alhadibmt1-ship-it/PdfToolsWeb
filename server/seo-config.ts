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
    title: "PDF HUB 24 - Free Online PDF Tools | Convert, Merge, Split & More",
    description: "Free online PDF tools for merging, splitting, compressing, converting PDF files. 43+ tools including PDF to Word, image conversion, and editing. No registration required.",
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
      "@type": "SoftwareApplication",
      "name": "Merge PDF - PDF HUB 24",
      "url": `${BASE_URL}/merge`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Combine multiple PDF files into one document"
    }
  },
  "/split": {
    title: "Split PDF Online Free - Extract Pages from PDF | PDF HUB 24",
    description: "Split PDF files and extract specific pages instantly. Free online PDF splitter - select page ranges, extract single pages. No registration required.",
    keywords: "split PDF, extract PDF pages, PDF splitter, separate PDF pages, split PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Split PDF - PDF HUB 24",
      "url": `${BASE_URL}/split`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/compress": {
    title: "Compress PDF Online Free - Reduce PDF File Size | PDF HUB 24",
    description: "Compress PDF files and reduce file size by up to 90%. Free online PDF compressor with quality options. Optimize PDFs for email and web sharing.",
    keywords: "compress PDF, reduce PDF size, PDF compressor, optimize PDF, shrink PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Compress PDF - PDF HUB 24",
      "url": `${BASE_URL}/compress`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/rotate": {
    title: "Rotate PDF Online Free - Turn PDF Pages | PDF HUB 24",
    description: "Rotate PDF pages 90°, 180°, or 270° clockwise. Free online PDF rotator - fix orientation issues instantly. No watermarks, no registration.",
    keywords: "rotate PDF, turn PDF pages, PDF rotator, flip PDF, rotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Rotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/rotate`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-to-word": {
    title: "PDF to Word Converter Online Free - Convert PDF to DOCX | PDF HUB 24",
    description: "Convert PDF to editable Word documents (DOCX) instantly. Free online PDF to Word converter with high accuracy. Preserves formatting and layout.",
    keywords: "PDF to Word, PDF to DOCX, convert PDF to Word, PDF converter, PDF to Word online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to Word Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-word`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-to-jpg": {
    title: "PDF to JPG Converter Online Free - Convert PDF to Images | PDF HUB 24",
    description: "Convert PDF pages to high-quality JPG images instantly. Free online PDF to JPG converter - extract all pages as separate images. No registration.",
    keywords: "PDF to JPG, PDF to image, convert PDF to JPG, PDF to JPEG, PDF to JPG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to JPG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-jpg`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-to-png": {
    title: "PDF to PNG Converter Online Free - Convert PDF to PNG | PDF HUB 24",
    description: "Convert PDF pages to high-quality PNG images with transparency. Free online PDF to PNG converter - perfect for graphics and presentations.",
    keywords: "PDF to PNG, convert PDF to PNG, PDF to image, PDF to PNG online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to PNG Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-png`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-to-excel": {
    title: "PDF to Excel Converter Online Free - Convert PDF to XLS | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets (XLS/XLSX) instantly. Free online PDF to Excel converter - extract data accurately. No registration.",
    keywords: "PDF to Excel, PDF to XLS, convert PDF to Excel, PDF to spreadsheet, PDF to Excel online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to Excel Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-excel`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-to-ppt": {
    title: "PDF to PowerPoint Converter Online Free - Convert PDF to PPT | PDF HUB 24",
    description: "Convert PDF to editable PowerPoint presentations (PPT/PPTX) instantly. Free online PDF to PowerPoint converter - preserves slides and formatting.",
    keywords: "PDF to PowerPoint, PDF to PPT, convert PDF to PowerPoint, PDF to PPTX, PDF to PowerPoint online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to PowerPoint Converter - PDF HUB 24",
      "url": `${BASE_URL}/pdf-to-ppt`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/word-to-pdf": {
    title: "Word to PDF Converter Online Free - Convert DOCX to PDF | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF instantly. Free online Word to PDF converter - preserves formatting perfectly. No registration required.",
    keywords: "Word to PDF, DOCX to PDF, convert Word to PDF, Word to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Word to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/word-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/jpg-to-pdf": {
    title: "JPG to PDF Converter Online Free - Convert Images to PDF | PDF HUB 24",
    description: "Convert JPG images to PDF documents instantly. Free online JPG to PDF converter - combine multiple images into one PDF. No registration.",
    keywords: "JPG to PDF, image to PDF, convert JPG to PDF, JPEG to PDF, JPG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "JPG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/jpg-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/png-to-pdf": {
    title: "PNG to PDF Converter Online Free - Convert PNG to PDF | PDF HUB 24",
    description: "Convert PNG images to PDF documents instantly. Free online PNG to PDF converter - maintains transparency and quality. No registration required.",
    keywords: "PNG to PDF, convert PNG to PDF, image to PDF, PNG to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PNG to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/png-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/excel-to-pdf": {
    title: "Excel to PDF Converter Online Free - Convert XLS to PDF | PDF HUB 24",
    description: "Convert Excel spreadsheets (XLS/XLSX) to PDF instantly. Free online Excel to PDF converter - preserves tables and formatting perfectly.",
    keywords: "Excel to PDF, XLS to PDF, convert Excel to PDF, XLSX to PDF, Excel to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Excel to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/excel-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/ppt-to-pdf": {
    title: "PowerPoint to PDF Converter Online Free - Convert PPT to PDF | PDF HUB 24",
    description: "Convert PowerPoint presentations (PPT/PPTX) to PDF instantly. Free online PowerPoint to PDF converter - preserves slides and animations.",
    keywords: "PowerPoint to PDF, PPT to PDF, convert PowerPoint to PDF, PPTX to PDF, PowerPoint to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PowerPoint to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/ppt-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/protect-pdf": {
    title: "Protect PDF with Password Online Free - Encrypt PDF | PDF HUB 24",
    description: "Add password protection to PDF files instantly. Free online PDF encryption tool - secure your documents with strong encryption. No registration.",
    keywords: "protect PDF, encrypt PDF, password protect PDF, secure PDF, PDF encryption online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Protect PDF - PDF HUB 24",
      "url": `${BASE_URL}/protect-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/unlock-pdf": {
    title: "Unlock PDF Online Free - Remove PDF Password | PDF HUB 24",
    description: "Remove password protection from PDF files instantly. Free online PDF unlocker - unlock password-protected PDFs. Requires knowing the password.",
    keywords: "unlock PDF, remove PDF password, PDF unlocker, decrypt PDF, unlock PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Unlock PDF - PDF HUB 24",
      "url": `${BASE_URL}/unlock-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/delete-pages": {
    title: "Delete PDF Pages Online Free - Remove Pages from PDF | PDF HUB 24",
    description: "Remove unwanted pages from PDF documents instantly. Free online PDF page remover - select and delete specific pages. No registration required.",
    keywords: "delete PDF pages, remove PDF pages, PDF page remover, delete pages from PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Delete PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/delete-pages`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/add-page-numbers": {
    title: "Add Page Numbers to PDF Online Free | PDF HUB 24",
    description: "Add page numbers to PDF documents instantly. Free online PDF page numbering tool - customize position, format, and style. No registration.",
    keywords: "add page numbers PDF, PDF page numbers, number PDF pages, page numbering PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Add Page Numbers - PDF HUB 24",
      "url": `${BASE_URL}/add-page-numbers`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/add-watermark": {
    title: "Add Watermark to PDF Online Free | PDF HUB 24",
    description: "Add text watermarks to PDF documents instantly. Free online PDF watermarking tool - customize text, position, and opacity. No registration.",
    keywords: "add watermark PDF, PDF watermark, watermark PDF online free, stamp PDF",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Add Watermark - PDF HUB 24",
      "url": `${BASE_URL}/add-watermark`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/reorder-pages": {
    title: "Reorder PDF Pages Online Free - Rearrange Pages | PDF HUB 24",
    description: "Reorder and rearrange PDF pages with drag and drop. Free online PDF page organizer - change page sequence instantly. No registration required.",
    keywords: "reorder PDF pages, rearrange PDF, organize PDF pages, sort PDF pages, reorder PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Reorder PDF Pages - PDF HUB 24",
      "url": `${BASE_URL}/reorder-pages`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/extract-text": {
    title: "Extract Text from PDF Online Free - PDF to Text | PDF HUB 24",
    description: "Extract text content from PDF documents instantly. Free online PDF text extractor - copy text from any PDF. No registration required.",
    keywords: "extract text PDF, PDF to text, copy text from PDF, PDF text extractor, extract text online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Extract Text from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-text`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/extract-images": {
    title: "Extract Images from PDF Online Free | PDF HUB 24",
    description: "Extract all images from PDF documents instantly. Free online PDF image extractor - download images in original quality. No registration.",
    keywords: "extract images PDF, PDF image extractor, get images from PDF, extract images online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Extract Images from PDF - PDF HUB 24",
      "url": `${BASE_URL}/extract-images`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/ocr-pdf": {
    title: "OCR PDF Online Free - Extract Text from Scanned PDF | PDF HUB 24",
    description: "OCR scanned PDFs and extract text using optical character recognition. Free online OCR tool - convert scanned documents to searchable text.",
    keywords: "OCR PDF, optical character recognition, extract text scanned PDF, OCR online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "OCR PDF - PDF HUB 24",
      "url": `${BASE_URL}/ocr-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/crop-pdf": {
    title: "Crop PDF Online Free - Trim PDF Margins | PDF HUB 24",
    description: "Crop and trim PDF page margins instantly. Free online PDF cropper - remove white space and unwanted areas. No registration required.",
    keywords: "crop PDF, trim PDF margins, PDF cropper, remove PDF margins, crop PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Crop PDF - PDF HUB 24",
      "url": `${BASE_URL}/crop-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/resize-pdf": {
    title: "Resize PDF Online Free - Change PDF Page Size | PDF HUB 24",
    description: "Resize PDF pages to A4, Letter, Legal, and more. Free online PDF resizer - change document dimensions instantly. No registration.",
    keywords: "resize PDF, change PDF size, PDF page size, resize PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Resize PDF - PDF HUB 24",
      "url": `${BASE_URL}/resize-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/sign-pdf": {
    title: "Sign PDF Online Free - Add Signature to PDF | PDF HUB 24",
    description: "Add your signature to PDF documents instantly. Free online PDF signing tool - draw or type your signature. No registration required.",
    keywords: "sign PDF, add signature PDF, PDF signature, e-sign PDF, sign PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sign PDF - PDF HUB 24",
      "url": `${BASE_URL}/sign-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/flatten-pdf": {
    title: "Flatten PDF Online Free - Merge Layers | PDF HUB 24",
    description: "Flatten PDF forms and layers into static content. Free online PDF flattener - convert fillable forms to regular PDFs. No registration.",
    keywords: "flatten PDF, merge PDF layers, flatten PDF forms, PDF flattener, flatten PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Flatten PDF - PDF HUB 24",
      "url": `${BASE_URL}/flatten-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/grayscale-pdf": {
    title: "Convert PDF to Grayscale Online Free - Black & White | PDF HUB 24",
    description: "Convert PDF to grayscale (black and white) for printing. Free online PDF grayscale converter - reduce ink usage. No registration required.",
    keywords: "PDF to grayscale, black and white PDF, convert PDF grayscale, PDF grayscale online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF to Grayscale - PDF HUB 24",
      "url": `${BASE_URL}/grayscale-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/repair-pdf": {
    title: "Repair PDF Online Free - Fix Corrupted PDF | PDF HUB 24",
    description: "Repair corrupted or damaged PDF files instantly. Free online PDF repair tool - fix broken PDFs and recover content. No registration.",
    keywords: "repair PDF, fix corrupted PDF, PDF repair tool, recover PDF, repair PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Repair PDF - PDF HUB 24",
      "url": `${BASE_URL}/repair-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/edit-pdf": {
    title: "Edit PDF Online Free - Add Text & Images | PDF HUB 24",
    description: "Edit PDF documents online - add text, images, and shapes. Free online PDF editor with drawing tools. No registration required.",
    keywords: "edit PDF, PDF editor, add text to PDF, modify PDF, edit PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Edit PDF - PDF HUB 24",
      "url": `${BASE_URL}/edit-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/annotate-pdf": {
    title: "Annotate PDF Online Free - Highlight & Markup | PDF HUB 24",
    description: "Annotate PDF documents with highlights, underlines, and notes. Free online PDF annotation tool - mark up any PDF. No registration.",
    keywords: "annotate PDF, highlight PDF, PDF markup, PDF annotation, annotate PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Annotate PDF - PDF HUB 24",
      "url": `${BASE_URL}/annotate-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/redact-pdf": {
    title: "Redact PDF Online Free - Black Out Sensitive Info | PDF HUB 24",
    description: "Redact sensitive information from PDF documents. Free online PDF redaction tool - permanently black out text. No registration required.",
    keywords: "redact PDF, black out PDF, censor PDF, PDF redaction, redact PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Redact PDF - PDF HUB 24",
      "url": `${BASE_URL}/redact-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/tiff-to-pdf": {
    title: "TIFF to PDF Converter Online Free | PDF HUB 24",
    description: "Convert TIFF images to PDF documents instantly. Free online TIFF to PDF converter - maintains image quality. No registration required.",
    keywords: "TIFF to PDF, convert TIFF to PDF, TIF to PDF, TIFF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "TIFF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/tiff-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/gif-to-pdf": {
    title: "GIF to PDF Converter Online Free | PDF HUB 24",
    description: "Convert GIF images to PDF documents instantly. Free online GIF to PDF converter - preserves all frames. No registration required.",
    keywords: "GIF to PDF, convert GIF to PDF, GIF to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "GIF to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/gif-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/webp-to-pdf": {
    title: "WebP to PDF Converter Online Free | PDF HUB 24",
    description: "Convert WebP images to PDF documents instantly. Free online WebP to PDF converter - maintains quality. No registration required.",
    keywords: "WebP to PDF, convert WebP to PDF, WebP to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "WebP to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/webp-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/html-to-pdf": {
    title: "HTML to PDF Converter Online Free | PDF HUB 24",
    description: "Convert HTML code to PDF documents instantly. Free online HTML to PDF converter - render web pages as PDFs. No registration required.",
    keywords: "HTML to PDF, convert HTML to PDF, webpage to PDF, HTML to PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "HTML to PDF Converter - PDF HUB 24",
      "url": `${BASE_URL}/html-to-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/pdf-viewer": {
    title: "PDF Viewer Online Free - View PDF Files | PDF HUB 24",
    description: "View PDF files directly in your browser. Free online PDF viewer - no download required. Open and read PDFs instantly.",
    keywords: "PDF viewer, view PDF online, read PDF, open PDF, PDF viewer online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF Viewer - PDF HUB 24",
      "url": `${BASE_URL}/pdf-viewer`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/compare-pdf": {
    title: "Compare PDF Files Online Free - Find Differences | PDF HUB 24",
    description: "Compare two PDF files and find differences instantly. Free online PDF comparison tool - highlight changes between documents.",
    keywords: "compare PDF, PDF comparison, find PDF differences, compare PDF online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Compare PDF - PDF HUB 24",
      "url": `${BASE_URL}/compare-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/image-compressor": {
    title: "Image Compressor Online Free - Compress JPG PNG WebP | PDF HUB 24",
    description: "Compress images (JPG, PNG, WebP) and reduce file size. Free online image compressor - maintain quality while saving space.",
    keywords: "compress image, image compressor, reduce image size, compress JPG PNG, image compressor online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Image Compressor - PDF HUB 24",
      "url": `${BASE_URL}/image-compressor`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/resize-image": {
    title: "Resize Image Online Free - Change Image Dimensions | PDF HUB 24",
    description: "Resize images by pixels or percentage. Free online image resizer - scale images to any size. Supports JPG, PNG, WebP.",
    keywords: "resize image, change image size, scale image, image resizer, resize image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Resize Image - PDF HUB 24",
      "url": `${BASE_URL}/resize-image`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/crop-image": {
    title: "Crop Image Online Free - Trim Images | PDF HUB 24",
    description: "Crop images to remove unwanted areas. Free online image cropper - select and trim any portion. Supports JPG, PNG, WebP.",
    keywords: "crop image, trim image, cut image, image cropper, crop image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Crop Image - PDF HUB 24",
      "url": `${BASE_URL}/crop-image`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/rotate-image": {
    title: "Rotate & Flip Image Online Free | PDF HUB 24",
    description: "Rotate or flip images in any direction. Free online image rotator - turn images 90°, 180°, or flip horizontally/vertically.",
    keywords: "rotate image, flip image, turn image, image rotator, rotate image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Rotate & Flip Image - PDF HUB 24",
      "url": `${BASE_URL}/rotate-image`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  },
  "/convert-image": {
    title: "Convert Image Online Free - JPG PNG WebP GIF | PDF HUB 24",
    description: "Convert between image formats - JPG, PNG, WebP, GIF, TIFF, BMP. Free online image converter - change format instantly.",
    keywords: "convert image, image converter, JPG to PNG, PNG to JPG, convert image online free",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Convert Image - PDF HUB 24",
      "url": `${BASE_URL}/convert-image`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
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
      "url": `${BASE_URL}/privacy`
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
      "url": `${BASE_URL}/terms`
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
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${metaTags}\n  </head>`);
}
