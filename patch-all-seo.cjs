/**
 * ═══════════════════════════════════════════════════════════
 *  pdfhub24.com — SEO Keyword Patcher
 *  Run: node patch-all-seo.cjs
 *  Place this file NEXT TO the client/src/pages/ folder
 *  i.e. at project root: PdfToolsWeb/patch-all-seo.cjs
 *  It reads each page, finds useSEO(), replaces keywords,
 *  title and description, then saves. Non-destructive for
 *  everything else in the file.
 * ═══════════════════════════════════════════════════════════
 */

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "client", "src", "pages");

// ── Complete SEO map for all pages ──────────────────────────
// NEVER share these keywords with peachpdf.com
const SEO_MAP = {

  /* ── TOOL PAGES ─────────────────────────────────────────── */

  "CompressPdfPage.tsx": {
    title: "Compress PDF Free Online — Reduce Size Up to 90% | PDF HUB 24",
    description: "Compress PDF free online without losing quality. Reduce PDF file size up to 90% instantly. Best free PDF compressor — no signup, no watermarks. PDF HUB 24.",
    keywords: "compress pdf free, compress pdf online, reduce pdf file size free, make pdf smaller free, compress pdf without losing quality, compress pdf to 1mb free, compress pdf under 100kb, compress pdf for email, reduce pdf size online no signup, pdf compressor free no watermark, shrink pdf size free, compress pdf pdf hub 24, best free pdf compressor 2026",
    canonicalPath: "/compress-pdf"
  },

  "MergePdfPage.tsx": {
    title: "Merge PDF Files Free Online — Combine PDFs Instantly | PDF HUB 24",
    description: "Merge multiple PDF files into one free online. Combine PDFs in any order instantly. No registration, no watermarks, no file limit. PDF HUB 24.",
    keywords: "merge pdf free, merge pdf files online, combine pdf free, merge pdf no registration, merge pdf no limit, merge pdf for visa free, combine multiple pdfs free, merge pdf documents online, pdf merger free no watermark, join pdf files free, merge pdf pdf hub 24, combine pdfs 2026",
    canonicalPath: "/merge-pdf"
  },

  "SplitPdfPage.tsx": {
    title: "Split PDF Pages Free Online — Extract Pages Instantly | PDF HUB 24",
    description: "Split PDF files free online. Extract specific pages or page ranges from any PDF instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "split pdf free, split pdf online, extract pages from pdf free, split pdf pages free, split pdf by pages free, pdf splitter free no watermark, split pdf no registration, extract pdf pages online free, split pdf into multiple files free, remove pages from pdf free, split pdf pdf hub 24 2026",
    canonicalPath: "/split-pdf"
  },

  "PdfToWordPage.tsx": {
    title: "PDF to Word Converter Free Online — Keep Formatting | PDF HUB 24",
    description: "Convert PDF to Word free online. Keep all formatting intact when converting PDF to editable DOCX. No signup required. PDF HUB 24.",
    keywords: "pdf to word free, convert pdf to word free, pdf to word converter online, pdf to docx free, convert pdf to word keep formatting, pdf to word no watermark, pdf to word no registration, convert pdf to editable word free, pdf to word online no signup, pdf to word pdf hub 24, best free pdf to word converter 2026",
    canonicalPath: "/pdf-to-word"
  },

  "WordToPdfPage.tsx": {
    title: "Word to PDF Converter Free Online — Perfect Formatting | PDF HUB 24",
    description: "Convert Word to PDF free online. Perfect formatting preserved when converting DOCX to PDF. No signup, no watermarks. PDF HUB 24.",
    keywords: "word to pdf free, convert word to pdf free, word to pdf converter online, docx to pdf free, convert docx to pdf free, word to pdf no watermark, word to pdf no registration, convert word to pdf keep formatting, word to pdf online free, word to pdf pdf hub 24 2026",
    canonicalPath: "/word-to-pdf"
  },

  "PdfToJpgPage.tsx": {
    title: "PDF to JPG Converter Free Online — High Quality | PDF HUB 24",
    description: "Convert PDF to JPG free online. Export every PDF page as a high-quality JPG image instantly. No registration, no watermarks. PDF HUB 24.",
    keywords: "pdf to jpg free, convert pdf to jpg free, pdf to jpg online, pdf to jpg high quality, convert pdf pages to images free, pdf to jpeg free, pdf to jpg all pages free, pdf to jpg no signup, pdf to jpg no watermark, pdf to jpg pdf hub 24, best pdf to jpg converter free 2026",
    canonicalPath: "/pdf-to-jpg"
  },

  "JpgToPdfPage.tsx": {
    title: "JPG to PDF Converter Free Online — Combine Images | PDF HUB 24",
    description: "Convert JPG to PDF free online. Combine multiple images into one PDF instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "jpg to pdf free, convert jpg to pdf free, jpg to pdf online, multiple jpg to pdf free, combine images to pdf free, image to pdf converter free, jpg to pdf no registration, convert photos to pdf free, jpeg to pdf free online, jpg to pdf pdf hub 24 2026",
    canonicalPath: "/jpg-to-pdf"
  },

  "SignPdfPage.tsx": {
    title: "Sign PDF Online Free — Electronic Signature, No Printing | PDF HUB 24",
    description: "Sign PDF online free. Add legally binding electronic signatures without printing or scanning. No signup, no watermarks. PDF HUB 24.",
    keywords: "sign pdf free, sign pdf online free, electronic signature pdf free, esign pdf free, add signature to pdf free, sign pdf without printing, sign pdf no registration, pdf signature free online, digital signature pdf free, sign pdf no watermark, sign pdf pdf hub 24, legally binding pdf signature free 2026",
    canonicalPath: "/sign-pdf"
  },

  "ProtectPdfPage.tsx": {
    title: "Protect PDF with Password Free Online | PDF HUB 24",
    description: "Password protect PDF files free online. Add 256-bit encryption to any PDF instantly. No signup required. PDF HUB 24.",
    keywords: "protect pdf free, password protect pdf free, encrypt pdf free online, add password to pdf free, secure pdf online free, pdf password protection free, protect pdf no registration, lock pdf with password free, encrypt pdf 256 bit free, protect pdf pdf hub 24 2026",
    canonicalPath: "/protect-pdf"
  },

  "UnlockPdfPage.tsx": {
    title: "Unlock PDF Free Online — Remove Password Instantly | PDF HUB 24",
    description: "Unlock PDF and remove password protection free online. Instantly remove PDF passwords with PDF HUB 24. No signup required.",
    keywords: "unlock pdf free, remove pdf password free, unlock pdf online, pdf unlocker free, remove password from pdf free, decrypt pdf free online, unlock pdf no registration, unlock pdf for editing free, remove pdf restrictions free, unlock pdf pdf hub 24 2026",
    canonicalPath: "/unlock-pdf"
  },

  "OcrPdfPage.tsx": {
    title: "OCR PDF Free Online — Convert Scanned PDF to Text | PDF HUB 24",
    description: "OCR PDF free online. Convert scanned PDFs to searchable, editable text instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "ocr pdf free, ocr pdf online free, scanned pdf to text free, convert scanned pdf to word free, make pdf searchable free, ocr pdf no registration, pdf text recognition free, extract text from scanned pdf free, ocr pdf pdf hub 24, best free ocr pdf 2026",
    canonicalPath: "/ocr-pdf"
  },

  "EditPdfPage.tsx": {
    title: "Edit PDF Online Free — No Adobe Acrobat Needed | PDF HUB 24",
    description: "Edit PDF online free. Add text, images and shapes to any PDF without Adobe Acrobat. No signup, no watermarks. PDF HUB 24.",
    keywords: "edit pdf free, edit pdf online free, edit pdf without adobe acrobat, edit pdf text online free, pdf editor free no watermark, edit pdf no registration, online pdf editor free 2026, edit pdf no download, edit pdf on mobile free, edit pdf pdf hub 24",
    canonicalPath: "/edit-pdf"
  },

  "AnnotatePdfPage.tsx": {
    title: "Annotate PDF Free Online — Highlight & Comment | PDF HUB 24",
    description: "Annotate PDF free online. Add highlights, comments, sticky notes and drawings to any PDF. No signup, no watermarks. PDF HUB 24.",
    keywords: "annotate pdf free, highlight pdf online free, comment on pdf free, markup pdf free, add comments to pdf free, annotate pdf no registration, annotate pdf no watermark, pdf annotation tool free, review pdf online free, annotate pdf pdf hub 24 2026",
    canonicalPath: "/annotate-pdf"
  },

  "AddWatermarkPage.tsx": {
    title: "Add Watermark to PDF Free Online | PDF HUB 24",
    description: "Add text or image watermarks to PDF free online. Customize position and opacity. No signup, instant results. PDF HUB 24.",
    keywords: "add watermark to pdf free, pdf watermark free, watermark pdf online free, add text watermark to pdf free, add image watermark pdf free, pdf watermark no registration, watermark pdf no watermark added, custom watermark pdf free, add watermark pdf pdf hub 24 2026",
    canonicalPath: "/add-watermark"
  },

  "AddPageNumbersPage.tsx": {
    title: "Add Page Numbers to PDF Free Online | PDF HUB 24",
    description: "Add page numbers to any PDF free online. Choose position, font size and starting number. No signup, no watermarks. PDF HUB 24.",
    keywords: "add page numbers to pdf free, add page numbers to pdf online, pdf page numbers free, number pdf pages free, insert page numbers pdf, pdf pagination free online, add page numbers to pdf without adobe, number pages in pdf free, add folio numbers to pdf free, pdf page numbering tool free, add page numbers bottom of pdf free, add page numbers pdf pdf hub 24 2026",
    canonicalPath: "/add-page-numbers"
  },

  "RotatePdfPage.tsx": {
    title: "Rotate PDF Pages Free Online — Fix Orientation | PDF HUB 24",
    description: "Rotate PDF pages free online. Fix sideways or upside-down PDF pages in one click. No signup, no watermarks. PDF HUB 24.",
    keywords: "rotate pdf free, rotate pdf pages online free, rotate pdf and save free, fix pdf orientation free, rotate pdf 90 degrees free, rotate pdf no registration, rotate pdf no watermark, rotate pdf pages any device, rotate all pdf pages free, rotate pdf pdf hub 24 2026",
    canonicalPath: "/rotate-pdf"
  },

  "DeletePagesPage.tsx": {
    title: "Delete Pages from PDF Free Online | PDF HUB 24",
    description: "Delete unwanted pages from PDF free online. Remove single or multiple pages instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "delete pages from pdf free, remove pages from pdf free, delete pdf pages online, remove unwanted pdf pages free, delete pdf page no registration, remove pdf pages free online, delete multiple pages pdf free, delete pages pdf pdf hub 24 2026",
    canonicalPath: "/delete-pages"
  },

  "ReorderPagesPage.tsx": {
    title: "Reorder PDF Pages Free Online — Rearrange Instantly | PDF HUB 24",
    description: "Reorder PDF pages free online. Rearrange, reorganize and sort PDF pages with easy drag and drop. No signup. PDF HUB 24.",
    keywords: "reorder pdf pages free, rearrange pdf pages free, reorganize pdf pages free, change pdf page order free, drag drop pdf pages free, reorder pdf no registration, reorder pdf pdf hub 24 2026",
    canonicalPath: "/reorder-pages"
  },

  "RedactPdfPage.tsx": {
    title: "Redact PDF Free Online — Black Out Sensitive Info | PDF HUB 24",
    description: "Redact PDF free online. Permanently black out sensitive text and images from any PDF. No signup. PDF HUB 24.",
    keywords: "redact pdf free, redact pdf online free, black out text in pdf free, pdf redaction tool free, remove sensitive info pdf free, redact pdf no registration, redact pdf no watermark, permanently remove text pdf free, redact pdf pdf hub 24 2026",
    canonicalPath: "/redact-pdf"
  },

  "GrayscalePdfPage.tsx": {
    title: "Convert PDF to Grayscale Free Online | PDF HUB 24",
    description: "Convert PDF to grayscale free online. Make PDF black and white to reduce file size and save printing ink. No signup. PDF HUB 24.",
    keywords: "grayscale pdf free, convert pdf to grayscale free, pdf black and white free, pdf to black white free, grayscale pdf online free, reduce pdf print cost free, grayscale pdf no registration, black and white pdf free, grayscale pdf pdf hub 24 2026",
    canonicalPath: "/grayscale-pdf"
  },

  "FlattenPdfPage.tsx": {
    title: "Flatten PDF Free Online — Lock Forms & Annotations | PDF HUB 24",
    description: "Flatten PDF forms and annotations free online. Lock all layers into the PDF permanently. No signup, instant results. PDF HUB 24.",
    keywords: "flatten pdf free, flatten pdf online free, flatten pdf forms free, flatten pdf annotations free, flatten pdf for printing free, flatten pdf no registration, flatten pdf layers free, lock pdf form fields free, flatten pdf pdf hub 24 2026",
    canonicalPath: "/flatten-pdf"
  },

  "RepairPdfPage.tsx": {
    title: "Repair PDF Free Online — Fix Corrupted PDF Files | PDF HUB 24",
    description: "Repair corrupted and damaged PDF files free online. Fix broken PDFs instantly. No software, no signup. PDF HUB 24.",
    keywords: "repair pdf free, fix corrupted pdf free, repair pdf online free, fix broken pdf free, corrupted pdf repair free, pdf repair tool free, repair pdf no registration, repair damaged pdf free, recover pdf file free, repair pdf pdf hub 24 2026",
    canonicalPath: "/repair-pdf"
  },

  "BatchCompressPage.tsx": {
    title: "Batch Compress PDF Free — Compress 20 PDFs at Once | PDF HUB 24",
    description: "Batch compress multiple PDF files free online. Process up to 20 PDFs at once and download as ZIP. No signup. PDF HUB 24.",
    keywords: "batch compress pdf free, compress multiple pdfs free, bulk compress pdf free, compress 20 pdfs at once free, batch pdf compressor free, compress pdf in bulk free, batch compress no registration, batch compress pdf zip download free, batch compress pdf pdf hub 24 2026",
    canonicalPath: "/batch-compress"
  },

  "ComparePdfPage.tsx": {
    title: "Compare PDF Files Free Online — Find Differences | PDF HUB 24",
    description: "Compare two PDF files free online. Instantly find all differences between PDF documents. No signup. PDF HUB 24.",
    keywords: "compare pdf free, compare pdf files online free, find differences in pdf free, pdf comparison tool free, compare two pdfs free, pdf diff tool free, compare pdf no registration, pdf comparison no watermark, compare pdf pdf hub 24 2026",
    canonicalPath: "/compare-pdf"
  },

  "TranslatePdfPage.tsx": {
    title: "Translate PDF Free Online — 50+ Languages | PDF HUB 24",
    description: "Translate PDF documents free online to 50+ languages instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "translate pdf free, translate pdf online free, pdf translation free, translate pdf to english free, translate pdf 50 languages free, translate document pdf free, translate pdf no registration, pdf translator free, translate pdf pdf hub 24 2026",
    canonicalPath: "/translate-pdf"
  },

  "ExtractTextPage.tsx": {
    title: "Extract Text from PDF Free Online | PDF HUB 24",
    description: "Extract text from any PDF free online. Copy and export all text content from PDFs instantly. No signup. PDF HUB 24.",
    keywords: "extract text from pdf free, copy text from pdf free, pdf text extractor free, extract text pdf online, get text from pdf free, extract text from scanned pdf free, pdf text extraction no registration, extract text pdf pdf hub 24 2026",
    canonicalPath: "/extract-text"
  },

  "HtmlToPdfPage.tsx": {
    title: "HTML to PDF Converter Free Online | PDF HUB 24",
    description: "Convert HTML or any webpage to PDF free online. All CSS styles and images preserved. No signup. PDF HUB 24.",
    keywords: "html to pdf free, convert webpage to pdf free, html to pdf online free, url to pdf free, website to pdf free, convert html to pdf no registration, webpage to pdf no signup, html to pdf pdf hub 24 2026",
    canonicalPath: "/html-to-pdf"
  },

  "PdfToExcelPage.tsx": {
    title: "PDF to Excel Converter Free Online — Extract Tables | PDF HUB 24",
    description: "Convert PDF to Excel free online. Extract tables and data from PDFs into editable spreadsheets. No signup. PDF HUB 24.",
    keywords: "pdf to excel free, convert pdf to excel free, pdf to spreadsheet free, extract tables from pdf free, pdf to xlsx free, pdf to excel online no signup, convert pdf tables to excel free, pdf to excel pdf hub 24 2026",
    canonicalPath: "/pdf-to-excel"
  },

  "ExcelToPdfPage.tsx": {
    title: "Excel to PDF Converter Free Online | PDF HUB 24",
    description: "Convert Excel to PDF free online. Transform spreadsheets to PDF with perfect formatting. No signup. PDF HUB 24.",
    keywords: "excel to pdf free, convert excel to pdf free, xlsx to pdf free, spreadsheet to pdf free, excel to pdf online no signup, excel to pdf no watermark, convert xls to pdf free, excel to pdf pdf hub 24 2026",
    canonicalPath: "/excel-to-pdf"
  },

  "PdfToPptPage.tsx": {
    title: "PDF to PowerPoint Free Online — Editable Slides | PDF HUB 24",
    description: "Convert PDF to PowerPoint free online. Get fully editable PPT slides from any PDF instantly. No signup. PDF HUB 24.",
    keywords: "pdf to powerpoint free, convert pdf to ppt free, pdf to pptx free, pdf to slides free online, convert pdf to presentation free, pdf to powerpoint no registration, pdf to ppt pdf hub 24 2026",
    canonicalPath: "/pdf-to-ppt"
  },

  "PptToPdfPage.tsx": {
    title: "PowerPoint to PDF Converter Free Online | PDF HUB 24",
    description: "Convert PowerPoint to PDF free online. Transform PPT and PPTX files to PDF with formatting preserved. No signup. PDF HUB 24.",
    keywords: "powerpoint to pdf free, convert ppt to pdf free, pptx to pdf free, presentation to pdf free, ppt to pdf online no signup, powerpoint to pdf no watermark, ppt to pdf pdf hub 24 2026",
    canonicalPath: "/ppt-to-pdf"
  },

  "PdfToPngPage.tsx": {
    title: "PDF to PNG Converter Free Online — High Resolution | PDF HUB 24",
    description: "Convert PDF to PNG free online. Export every PDF page as a high-resolution PNG image. No signup. PDF HUB 24.",
    keywords: "pdf to png free, convert pdf to png free, pdf to png online, pdf to png high resolution, convert pdf pages to png free, pdf to png no signup, pdf to png no watermark, pdf to png pdf hub 24 2026",
    canonicalPath: "/pdf-to-png"
  },

  "PngToPdfPage.tsx": {
    title: "PNG to PDF Converter Free Online | PDF HUB 24",
    description: "Convert PNG images to PDF free online. Combine multiple PNG files into one PDF instantly. No signup. PDF HUB 24.",
    keywords: "png to pdf free, convert png to pdf free, png to pdf online, multiple png to pdf free, combine png files to pdf free, png to pdf no registration, png to pdf no watermark, png to pdf pdf hub 24 2026",
    canonicalPath: "/png-to-pdf"
  },

  "TiffToPdfPage.tsx": {
    title: "TIFF to PDF Converter Free Online | PDF HUB 24",
    description: "Convert TIFF images to PDF free online. Transform TIF files to PDF instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "tiff to pdf free, convert tiff to pdf free, tif to pdf free, tiff to pdf online, convert tif to pdf no registration, tiff to pdf no watermark, tiff to pdf pdf hub 24 2026",
    canonicalPath: "/tiff-to-pdf"
  },

  "GifToPdfPage.tsx": {
    title: "GIF to PDF Converter Free Online | PDF HUB 24",
    description: "Convert GIF images to PDF free online. Turn animated or static GIFs into PDF documents instantly. No signup. PDF HUB 24.",
    keywords: "gif to pdf free, convert gif to pdf free, gif to pdf online, animated gif to pdf free, gif to pdf no registration, gif to pdf no watermark, gif to pdf pdf hub 24 2026",
    canonicalPath: "/gif-to-pdf"
  },

  "WebpToPdfPage.tsx": {
    title: "WebP to PDF Converter Free Online | PDF HUB 24",
    description: "Convert WebP images to PDF free online. Transform WebP files to PDF instantly with PDF HUB 24. No signup required.",
    keywords: "webp to pdf free, convert webp to pdf free, webp to pdf online, webp image to pdf free, webp to pdf no registration, webp to pdf no watermark, webp to pdf pdf hub 24 2026",
    canonicalPath: "/webp-to-pdf"
  },

  "ScanToPdfPage.tsx": {
    title: "Scan to PDF Free Online — Phone Camera to PDF | PDF HUB 24",
    description: "Scan documents to PDF free using your phone camera. Convert photos to PDF instantly. No signup. PDF HUB 24.",
    keywords: "scan to pdf free, scan document to pdf free, phone camera to pdf free, scan to pdf online free, scan photo to pdf free, mobile scan to pdf free, scan to pdf no registration, scan to pdf pdf hub 24 2026",
    canonicalPath: "/scan-to-pdf"
  },

  "PdfToAPage.tsx": {
    title: "PDF to PDF/A Converter Free Online — Archiving Format | PDF HUB 24",
    description: "Convert PDF to PDF/A free online for long-term archiving and compliance. No signup. PDF HUB 24.",
    keywords: "pdf to pdfa free, convert pdf to pdfa free, pdf archiving free online, pdf/a converter free, pdf to pdf/a no registration, pdf to pdf-a free, pdf to pdfa pdf hub 24 2026",
    canonicalPath: "/pdf-to-pdfa"
  },

  "PdfViewerPage.tsx": {
    title: "Free Online PDF Viewer — View PDF in Browser | PDF HUB 24",
    description: "View PDF files online free. Open and read any PDF directly in your browser. No download, no signup. PDF HUB 24.",
    keywords: "pdf viewer free online, view pdf online free, open pdf in browser free, read pdf online free, pdf reader online free, pdf viewer no download, online pdf viewer pdf hub 24 2026",
    canonicalPath: "/pdf-viewer"
  },

  "ImageCompressorPage.tsx": {
    title: "Image Compressor Free Online — Compress JPG PNG WebP | PDF HUB 24",
    description: "Compress images free online. Reduce JPG, PNG and WebP file sizes without losing quality. No signup. PDF HUB 24.",
    keywords: "image compressor free, compress image online free, compress jpg free, compress png free, compress webp free, reduce image file size free, image compressor no registration, best free image compressor 2026, image compressor pdf hub 24",
    canonicalPath: "/image-compressor"
  },

  "ResizeImagePage.tsx": {
    title: "Resize Image Free Online — Change Image Dimensions | PDF HUB 24",
    description: "Resize images free online. Change image dimensions and resolution instantly. No signup, no watermarks. PDF HUB 24.",
    keywords: "resize image free, resize image online free, change image size free, scale image free online, resize photo free, resize image no registration, resize image no watermark, resize image pdf hub 24 2026",
    canonicalPath: "/resize-image"
  },

  /* ── CATEGORY / HUB PAGES ─────────────────────────────────── */

  "AllToolsPage.tsx": {
    title: "All 49+ Free PDF Tools — Complete Collection | PDF HUB 24",
    description: "Browse all 49+ free PDF tools at PDF HUB 24. Convert, edit, compress, merge, split, sign and protect PDFs — all free, no signup.",
    keywords: "all free pdf tools, 49 pdf tools free, complete pdf toolkit free, pdf tool collection free, all pdf tools online free, free pdf tools 2026, pdf hub 24 all tools, pdfhub24 tools list, free online pdf toolkit no registration",
    canonicalPath: "/all-tools"
  },

  "FreePdfConverterPage.tsx": {
    title: "Free PDF Converter Online — Convert PDF to Any Format | PDF HUB 24",
    description: "Free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. No signup, no watermarks. PDF HUB 24.",
    keywords: "free pdf converter, pdf converter online free, convert pdf free, pdf format converter free, pdf to any format free, online pdf converter no signup, free pdf converter 2026, pdf converter pdf hub 24",
    canonicalPath: "/convert-pdf"
  },

  "FreePdfEditorPage.tsx": {
    title: "Free PDF Editor Online — Edit PDF Without Software | PDF HUB 24",
    description: "Free PDF editor online. Edit, merge, split, compress and convert PDFs without any software. No signup. PDF HUB 24.",
    keywords: "free pdf editor online, pdf editor free no download, edit pdf free online, best free pdf editor 2026, pdf editor no registration, pdf editor no watermark, pdf editor pdf hub 24, online pdf editor no software",
    canonicalPath: "/edit-pdf-tools"
  },

  /* ── INFO / STATIC PAGES ──────────────────────────────────── */

  "AboutPage.tsx": {
    title: "About PDF HUB 24 — Free PDF Tools for Everyone | PDF HUB 24",
    description: "Learn about PDF HUB 24 — the free online PDF toolkit with 49+ tools. No registration, no watermarks, 100% secure. Trusted by professionals worldwide.",
    keywords: "about pdf hub 24, pdfhub24 about, about pdfhub24, pdf hub 24 company, who made pdf hub 24, free pdf tools platform, pdfhub24.com about us",
    canonicalPath: "/about"
  },

  "AutoDeletePage.tsx": {
    title: "Auto-Delete Policy — Files Deleted After Processing | PDF HUB 24",
    description: "Learn how PDF HUB 24 automatically deletes your files after processing. Your documents are never stored permanently.",
    keywords: "pdf hub 24 auto delete policy, pdfhub24 file deletion, pdf files deleted after processing, pdf tool data security, pdf hub 24 privacy, pdfhub24 file safety",
    canonicalPath: "/auto-delete"
  },

  "PricingPage.tsx": {
    title: "PDF HUB 24 Pricing — 100% Free, No Plans | PDF HUB 24",
    description: "PDF HUB 24 is completely free. No subscription, no premium tier, no hidden fees. All 49+ PDF tools are free forever.",
    keywords: "pdf hub 24 pricing, pdfhub24 free, pdf hub 24 cost, is pdf hub 24 free, pdf hub 24 subscription, pdfhub24 no cost, pdf tools free no subscription 2026",
    canonicalPath: "/pricing"
  },

  "PrivacyPage.tsx": {
    title: "Privacy Policy — Your Files Stay Private | PDF HUB 24",
    description: "PDF HUB 24 privacy policy. Your files are processed securely and automatically deleted. We never store or share your documents.",
    keywords: "pdf hub 24 privacy policy, pdfhub24 privacy, pdf tools privacy, secure pdf processing, pdf hub 24 data privacy, pdfhub24 file security",
    canonicalPath: "/privacy"
  },

  "TermsPage.tsx": {
    title: "Terms of Service | PDF HUB 24",
    description: "Terms of Service for PDF HUB 24. Read our usage terms and conditions for all free PDF tools. Simple, fair terms with no hidden restrictions or fees.",
    keywords: "pdf hub 24 terms of service, pdfhub24 terms, pdf hub 24 usage terms, pdf tools terms and conditions",
    canonicalPath: "/terms"
  },

  "WriteForUsPage.tsx": {
    title: "Write for Us — PDF Guest Posts | PDF HUB 24",
    description: "Write for PDF HUB 24. Submit guest posts about PDF tools, tips and tutorials. Reach our audience of PDF professionals.",
    keywords: "write for pdf hub 24, pdf hub 24 guest post, pdfhub24 write for us, pdf tools guest blogging, write about pdf tools 2026",
    canonicalPath: "/write-for-us"
  },

  "PressKitPage.tsx": {
    title: "Press & Media Kit | PDF HUB 24",
    description: "PDF HUB 24 press and media kit. Logos, screenshots, brand assets and company information for journalists and bloggers.",
    keywords: "pdf hub 24 press kit, pdfhub24 media kit, pdf hub 24 brand assets, pdf hub 24 logo, pdfhub24 press release, pdf tools media kit",
    canonicalPath: "/press"
  },

  "PdfComparisonPage.tsx": {
    title: "PDF Tools Comparison Chart — PDF HUB 24 vs Competitors | PDF HUB 24",
    description: "Compare PDF HUB 24 with Adobe Acrobat, Smallpdf, iLovePDF and other PDF tools. See why PDF HUB 24 is the best free option.",
    keywords: "pdf hub 24 vs adobe acrobat, pdf hub 24 vs smallpdf, best free pdf tool comparison, pdf tools comparison 2026, pdfhub24 vs competitors, free pdf tools comparison chart",
    canonicalPath: "/pdf-comparison-chart"
  },

  "PdfFileFormatsPage.tsx": {
    title: "PDF File Formats Guide — PDF, PDF/A, PDF/X Explained | PDF HUB 24",
    description: "Complete guide to PDF file formats. Learn about PDF, PDF/A, PDF/X and other variants. Free PDF tools at PDF HUB 24.",
    keywords: "pdf file formats guide, pdf format types, pdf vs pdfa, pdf/a format explained, pdf/x format, pdf versions guide, pdf formats pdf hub 24 2026",
    canonicalPath: "/pdf-file-formats-guide"
  },

  "PdfGlossaryPage.tsx": {
    title: "PDF Glossary — PDF Terms & Definitions | PDF HUB 24",
    description: "Complete PDF glossary. Learn the meaning of PDF terms, acronyms and technical definitions. PDF HUB 24 free PDF tools.",
    keywords: "pdf glossary, pdf terms explained, pdf definitions, pdf acronyms, pdf terminology guide, pdf words meaning, pdf glossary pdf hub 24",
    canonicalPath: "/pdf-glossary"
  },

  "PdfStatisticsPage.tsx": {
    title: "PDF Statistics & Facts 2026 — Usage Data | PDF HUB 24",
    description: "PDF usage statistics and facts for 2026. How many PDFs are created, shared and processed globally. PDF HUB 24 free tools.",
    keywords: "pdf statistics 2026, pdf usage facts, how many pdfs created daily, pdf market statistics, pdf facts and figures 2026, pdf statistics pdf hub 24",
    canonicalPath: "/pdf-statistics"
  },

  "HtmlSitemapPage.tsx": {
    title: "Site Map — All PDF Tools & Pages | PDF HUB 24",
    description: "HTML sitemap for PDF HUB 24. Browse all 49+ free PDF tools, blog posts, guides and resources. Complete directory of all pages on pdfhub24.com.",
    keywords: "pdf hub 24 sitemap, pdfhub24 all pages, pdf hub 24 site map, pdf hub 24 tools list, pdfhub24 html sitemap",
    canonicalPath: "/sitemap"
  },

  "SeoAuditPage.tsx": {
    title: "SEO Audit | PDF HUB 24",
    description: "Internal SEO audit page for PDF HUB 24. Analyze meta tags, titles, descriptions, and technical SEO for all tools. Admin use only.",
    keywords: "pdf hub 24 seo, pdfhub24 seo audit, pdf tools seo",
    canonicalPath: "/seo-audit"
  },

  "ProgrammaticSeoPage.tsx": {
    title: "Free PDF Tools — PDF HUB 24",
    description: "Free PDF tools online. Compress, merge, split, convert and edit PDFs free with PDF HUB 24. No signup, no watermarks, no limits. Works on all devices.",
    keywords: "free pdf tools online, pdf hub 24, pdfhub24, online pdf tools free 2026",
    canonicalPath: "/tools"
  },

  "not-found.tsx": {
    title: "Page Not Found — PDF HUB 24",
    description: "Page not found. The page you're looking for doesn't exist or has moved. Browse 49+ free PDF tools — compress, merge, convert and edit PDFs free at PDF HUB 24.",
    keywords: "pdf hub 24 404, pdf hub 24 page not found, free pdf tools pdf hub 24",
    canonicalPath: "/404"
  },
  "DataSecurityPage.tsx": {
    title: "Data Security & Privacy — How We Protect Your Files | PDF HUB 24",
    description: "PDF HUB 24 uses SSL encryption and automatic file deletion. Your files are never stored or shared. 100% secure free PDF tools. No signup required.",
    keywords: "pdf hub 24 security, pdfhub24 privacy, pdf tools secure, file encryption pdf, automatic file deletion pdf, safe pdf converter, secure pdf tools online, pdfhub24 data protection",
    canonicalPath: "/data-security"
  },

  "EmbedWidgetPage.tsx": {
    title: "Embed PDF Tools on Your Website Free — Widget Generator | PDF HUB 24",
    description: "Embed free PDF tools on your website with our widget generator. Get iframe code for compress, merge, convert and 40+ PDF tools. Free, no API key needed.",
    keywords: "embed pdf tools website, pdf widget generator free, iframe pdf tools, embed pdf converter website, pdf tools widget, free pdf widget embed, pdfhub24 embed widget",
    canonicalPath: "/embed-widget"
  },

  "ConvertImagePage.tsx": {
    title: "Convert Image Format Free Online — JPG PNG WebP | PDF HUB 24",
    description: "Convert image format free online. JPG to PNG, PNG to WebP, WebP to JPG and more. Best free image converter — no signup, no watermark. PDF HUB 24.",
    keywords: "convert image free, image converter online free, jpg to png free, png to webp free, webp to jpg free, convert image format online, image format converter no signup, pdfhub24 image converter",
    canonicalPath: "/convert-image"
  },

  "ExtractImagesPage.tsx": {
    title: "Extract Images from PDF Free Online | PDF HUB 24",
    description: "Extract all images from PDF files free online. Download pictures from PDF in JPG or PNG format instantly. No signup, no watermark. PDF HUB 24.",
    keywords: "extract images from pdf free, download images from pdf, pdf image extractor free, extract pictures from pdf online, save images from pdf free, pdf to images free, pdfhub24 extract images",
    canonicalPath: "/extract-images"
  },

  "ResizePdfPage.tsx": {
    title: "Resize PDF Free Online — Change Page Size to A4 or Letter | PDF HUB 24",
    description: "Resize PDF page size to A4, Letter, Legal or custom dimensions free online. Scale PDF pages for printing or submission. No signup, no watermark. PDF HUB 24.",
    keywords: "resize pdf free, change pdf page size free, pdf to a4 free, pdf to letter size free, resize pdf online, pdf page resize free, change pdf size online, pdfhub24 resize pdf 2026",
    canonicalPath: "/resize-pdf"
  },

  "BlogListPage.tsx": {
    title: "PDF Tips, Guides & Tutorials — Free PDF Help | PDF HUB 24",
    description: "Free PDF guides and tutorials. Learn to compress, merge, convert, edit and protect PDFs. Step-by-step tutorials for beginners and professionals. PDF HUB 24.",
    keywords: "pdf tutorials free, pdf tips guides, how to compress pdf, how to merge pdf, pdf help guide, pdf tips 2026, free pdf tutorials, pdfhub24 blog, pdf hub 24 guides",
    canonicalPath: "/blog"
  },

  "CropPdfPage.tsx": {
    title: "Crop PDF Free Online — Trim Margins & White Space | PDF HUB 24",
    description: "Crop PDF pages free online. Remove white margins, trim excess space, resize page content. Best free PDF cropper — no signup, no watermark. PDF HUB 24.",
    keywords: "crop pdf free, crop pdf online, trim pdf margins free, remove pdf margins free, pdf cropper free, crop pdf pages online, resize pdf content free, pdfhub24 crop pdf 2026",
    canonicalPath: "/crop-pdf"
  },

  "BestFreeToolsPage.tsx": {
    title: "Best Free PDF Tools 2026 — Top Rated Online PDF Tools | PDF HUB 24",
    description: "The best free PDF tools online in 2026. Top-rated compress, merge, split, convert PDF tools with no signup, no watermarks, unlimited use. PDF HUB 24.",
    keywords: "best free pdf tools 2026, top pdf tools online, best pdf converter free, best pdf compressor free, best free pdf editor, top rated pdf tools, free pdf tools no signup, pdfhub24 best tools",
    canonicalPath: "/best-free-tools"
  },

  "ExtractPagesPage.tsx": {
    title: "Extract Pages from PDF Free — PDF Page Extractor | PDF HUB 24",
    description: "Extract specific pages from PDF free online. Select single pages or page ranges to create a new PDF instantly. No signup, no watermark. PDF HUB 24.",
    keywords: "extract pages from pdf free, pdf page extractor free, extract single page pdf, pull pages from pdf free, pdf page extraction online, extract pdf pages no signup, pdfhub24 extract pages",
    canonicalPath: "/extract-pages"
  },

  "HomePage.tsx": {
    title: "PDF HUB 24 — 49+ Free PDF Tools Online | No Signup, No Watermark",
    description: "49+ free online PDF tools — compress, merge, split, convert PDF to Word, JPG to PDF, sign, protect and edit PDFs. No registration, no watermarks. PDF HUB 24.",
    keywords: "free pdf tools online, compress pdf free, merge pdf free, split pdf free, pdf to word free, jpg to pdf free, sign pdf free, protect pdf free, pdf hub 24, pdfhub24, free pdf converter 2026",
    canonicalPath: "/"
  },

  "CategoryHubPage.tsx": {
    title: "Free PDF Tools — Convert, Edit & Manage PDFs Online | PDF HUB 24",
    description: "Complete suite of free PDF tools — convert, compress, merge, split, edit, sign, and secure PDF files online. No registration, no watermarks. PDF HUB 24.",
    keywords: "free pdf tools, convert pdf online free, edit pdf free, compress pdf free, pdf tools suite, pdf hub 24 tools, pdfhub24 tools, all pdf tools free 2026",
    canonicalPath: "/convert-pdf"
  },

  "ContactPage.tsx": {
    title: "Contact PDF HUB 24 — Support & Feedback | PDF HUB 24",
    description: "Contact PDF HUB 24 for support, feedback, or questions about our free PDF tools. We respond to all inquiries. Get help with any PDF tool.",
    keywords: "contact pdf hub 24, pdfhub24 support, pdf hub 24 help, pdfhub24 feedback, contact pdfhub24, pdf tools support, pdf hub 24 contact us",
    canonicalPath: "/contact"
  },

  "BlogPostPage.tsx": {
    title: "PDF Guides & Tutorials — Learn PDF Tools | PDF HUB 24",
    description: "Step-by-step PDF guides and tutorials. Learn how to compress, merge, convert, sign, and protect PDF files free online. Expert tips from PDF HUB 24.",
    keywords: "pdf guide, pdf tutorial, how to pdf, pdf tips, learn pdf, pdf help, pdfhub24 guide, pdf hub 24 tutorial, free pdf guide 2026",
    canonicalPath: "/blog"
  },

  "DmcaPage.tsx": {
    title: "DMCA Policy — Copyright Protection | PDF HUB 24",
    description: "DMCA policy for PDF HUB 24. Learn how to report copyright infringement and how we handle takedown requests. We respect intellectual property rights.",
    keywords: "dmca policy pdfhub24, pdf hub 24 dmca, copyright policy pdf tools, dmca takedown pdfhub24, intellectual property pdf hub 24",
    canonicalPath: "/dmca"
  },

  "CropImagePage.tsx": {
    title: "Crop Image Free Online — Trim & Cut Photos | PDF HUB 24",
    description: "Crop image free online. Remove unwanted areas from photos. Set custom crop dimensions or aspect ratios. No signup, no watermark. PDF HUB 24.",
    keywords: "crop image free, crop photo online free, image cropper free, trim photo online, cut image free, crop picture online, image crop tool free, pdfhub24 crop image 2026",
    canonicalPath: "/crop-image"
  },

  "RotateImagePage.tsx": {
    title: "Rotate Image Free Online — Flip & Rotate Photos | PDF HUB 24",
    description: "Rotate image free online. Flip photos horizontally or vertically, rotate 90, 180, 270 degrees. No signup, no watermark. PDF HUB 24.",
    keywords: "rotate image free, flip image online free, rotate photo free, flip photo online, rotate picture 90 degrees, image rotator free, rotate jpg free, pdfhub24 rotate image 2026",
    canonicalPath: "/rotate-image"
  },
  "RemoveWatermarkPage.tsx": {
    title: "Remove Watermark from PDF Free Online | PDF HUB 24",
    description: "Remove text and image watermarks from PDF documents free online. Clean up PDF files and remove stamps instantly. No signup, no watermark added. PDF HUB 24.",
    keywords: "remove watermark pdf free, delete watermark pdf online, pdf watermark remover free, remove text watermark pdf free, clean pdf watermark, remove pdf stamp online free",
    canonicalPath: "/remove-watermark"
  },
  "EditMetadataPage.tsx": {
    title: "Edit PDF Metadata Free Online — Title, Author, Keywords | PDF HUB 24",
    description: "Edit PDF title, author, subject and keywords metadata free online. Update and fix PDF document properties instantly. No signup, no watermark. PDF HUB 24.",
    keywords: "edit pdf metadata free, change pdf title author free, pdf properties editor online, update pdf metadata free, edit pdf document info online, pdf metadata editor no signup",
    canonicalPath: "/edit-metadata"
  },
  "PdfToHtmlPage.tsx": {
    title: "PDF to HTML Free Online — Convert PDF to Web Page | PDF HUB 24",
    description: "Convert PDF documents to HTML web pages free online. Transform PDF files to HTML with text and layout preserved. No signup, no watermark. PDF HUB 24.",
    keywords: "pdf to html free, convert pdf to html online, pdf to webpage free, pdf html converter no signup, export pdf as html free, pdf to web page free online 2026",
    canonicalPath: "/pdf-to-html"
  },
  "InsertPagesPage.tsx": {
    title: "Insert Pages into PDF Free Online | PDF HUB 24",
    description: "Insert blank pages or pages from another PDF at any position in your document free online. Add pages to PDF instantly. No signup, no watermark. PDF HUB 24.",
    keywords: "insert pages into pdf free, add pages to pdf online, insert blank page pdf free, pdf page insertion free, add page to pdf free online, insert pdf pages no signup",
    canonicalPath: "/insert-pages"
  },
  "WhiteoutPdfPage.tsx": {
    title: "Whiteout PDF Free Online — Cover Content with White Boxes | PDF HUB 24",
    description: "Cover and hide content in PDF pages with white boxes free online. Block out text and images without permanent deletion. No signup, no watermark. PDF HUB 24.",
    keywords: "whiteout pdf free, white out pdf online, cover pdf text free, hide pdf content free, pdf whiteout tool online, white box pdf free no signup 2026",
    canonicalPath: "/whiteout-pdf"
  },
  "PdfStamperPage.tsx": {
    title: "Add Stamp to PDF Free Online — Approved, Confidential, Draft | PDF HUB 24",
    description: "Add custom text stamps to PDF pages free online. Approved, confidential, draft, void stamps and more. Customizable position and style. No signup. PDF HUB 24.",
    keywords: "add stamp to pdf free, pdf stamper online free, approved stamp pdf free, confidential stamp pdf, draft stamp pdf online, add text stamp pdf free no signup 2026",
    canonicalPath: "/pdf-stamper"
  },
  "AddBookmarksPage.tsx": {
    title: "Add Bookmarks to PDF Free Online | PDF HUB 24",
    description: "Add clickable bookmarks to PDF documents free online. Create table of contents for easier navigation in large PDFs. No signup, no watermark. PDF HUB 24.",
    keywords: "add bookmarks to pdf free, pdf bookmark creator online, create pdf table of contents free, add pdf navigation free, pdf bookmarks free online no signup 2026",
    canonicalPath: "/add-bookmarks"
  },
  "AddHyperlinksPage.tsx": {
    title: "Add Links to PDF Free Online — Insert Hyperlinks | PDF HUB 24",
    description: "Insert clickable hyperlinks into PDF documents free online. Add website links, email links and internal page links. No signup, no watermark. PDF HUB 24.",
    keywords: "add links to pdf free, insert hyperlinks pdf online, add clickable links pdf free, pdf hyperlink inserter free, add url to pdf online free no signup 2026",
    canonicalPath: "/add-hyperlinks"
  },
  "PdfFormsPage.tsx": {
    title: "Create PDF Form Free Online — Fillable PDF Forms | PDF HUB 24",
    description: "Create fillable PDF forms with text fields, checkboxes, dropdowns and radio buttons free online. Build interactive PDF forms instantly. No signup. PDF HUB 24.",
    keywords: "create pdf form free, fillable pdf form creator online, pdf form builder free, interactive pdf form free, pdf form fields online free, create fillable pdf no signup 2026",
    canonicalPath: "/pdf-forms"
  },
  "PdfToCsvPage.tsx": {
    title: "PDF to CSV Free Online — Extract Tables to CSV | PDF HUB 24",
    description: "Convert PDF tables to CSV spreadsheet format free online. Extract tabular data from any PDF to CSV file instantly. No signup, no watermark. PDF HUB 24.",
    keywords: "pdf to csv free, convert pdf table to csv online, extract pdf data to csv free, pdf csv converter no signup, pdf to spreadsheet csv free, export pdf tables csv 2026",
    canonicalPath: "/pdf-to-csv"
  },
};

// ── Patch function ───────────────────────────────────────────
function patchFile(filename, seoData) {
  const filePath = path.join(PAGES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  SKIP (not found): ${filename}`);
    return;
  }

  let src = fs.readFileSync(filePath, "utf8");

  // Build the replacement useSEO block
  const newSEO = `useSEO({
    title: ${JSON.stringify(seoData.title)},
    description: ${JSON.stringify(seoData.description)},
    keywords: ${JSON.stringify(seoData.keywords)},
    canonicalPath: ${JSON.stringify(seoData.canonicalPath)}
  });`;

  // Regex: match useSEO({ ... }); — handles multi-line, any content inside
  const seoRegex = /useSEO\s*\(\s*\{[\s\S]*?\}\s*\)\s*;/;

  if (seoRegex.test(src)) {
    src = src.replace(seoRegex, newSEO);
    fs.writeFileSync(filePath, src, "utf8");
    console.log(`  ✅ UPDATED: ${filename}`);
  } else {
    // useSEO not found — inject after first export default function line
    const exportRegex = /(export default function \w+\(\)\s*\{)/;
    if (exportRegex.test(src)) {
      src = src.replace(exportRegex, `$1\n  ${newSEO}\n`);
      fs.writeFileSync(filePath, src, "utf8");
      console.log(`  ✅ INJECTED (no existing useSEO): ${filename}`);
    } else {
      console.log(`  ❌ ERROR: Could not find useSEO or export default in ${filename}`);
    }
  }
}

// ── Run patcher ──────────────────────────────────────────────
console.log("\n🚀 PDF HUB 24 — SEO Keyword Patcher");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`📁 Pages dir: ${PAGES_DIR}\n`);

let updated = 0, skipped = 0;

for (const [filename, seoData] of Object.entries(SEO_MAP)) {
  if (fs.existsSync(path.join(PAGES_DIR, filename))) {
    patchFile(filename, seoData);
    updated++;
  } else {
    console.log(`  ⚠️  SKIP: ${filename}`);
    skipped++;
  }
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`✅ Done! Updated: ${updated} | Skipped: ${skipped}`);
console.log("🔁 Commit & push to GitHub → Railway auto-deploys!\n");
