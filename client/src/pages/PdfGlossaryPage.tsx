import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Home, BookOpen, Search, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTool?: { name: string; href: string };
  seeAlso?: string[];
}

const GLOSSARY: Record<string, GlossaryTerm[]> = {
  A: [
    { term: "Acrobat Reader", definition: "Adobe's free PDF viewing application, first released in 1993. Acrobat Reader displays PDF files but does not allow editing. The paid Adobe Acrobat Pro adds editing, signing, and conversion capabilities.", seeAlso: ["PDF", "PDF viewer"] },
    { term: "Annotation", definition: "A note, comment, highlight, drawing, or markup added to a PDF document without altering the original content. Annotations are stored as a separate layer and can be shown or hidden. Common types include sticky notes, highlights, underlines, freehand drawings, and text boxes.", relatedTool: { name: "Annotate PDF", href: "/annotate-pdf" }, seeAlso: ["Markup", "Comment"] },
    { term: "Archival PDF (PDF/A)", definition: "An ISO standard (ISO 19005) for long-term preservation of electronic documents. PDF/A files are completely self-contained — fonts, color profiles, and all resources are embedded — ensuring the document renders identically regardless of the viewer or operating system used.", relatedTool: { name: "PDF to PDF/A", href: "/pdf-to-pdfa" }, seeAlso: ["PDF/A", "ISO 19005"] },
    { term: "AcroForm", definition: "The original PDF form standard introduced by Adobe. AcroForm fields include text boxes, checkboxes, radio buttons, dropdowns, and signature fields. AcroForms are supported by virtually all PDF viewers.", seeAlso: ["XFA Form", "Form field", "Flatten PDF"] },
    { term: "Auto-rotate", definition: "A feature in PDF viewers and printers that automatically rotates pages to match the paper orientation. In PDF processing tools, auto-rotate detects the text orientation and corrects upside-down or sideways pages.", seeAlso: ["Rotate PDF", "Page orientation"] },
  ],
  B: [
    { term: "Batch processing", definition: "The ability to perform an operation on multiple PDF files simultaneously. Batch processing saves time when compressing, converting, merging, or watermarking large numbers of documents.", relatedTool: { name: "Batch Compress PDF", href: "/batch-compress" }, seeAlso: ["Bulk operations"] },
    { term: "Binding", definition: "In PDF printing, the edge of the document where pages are bound together. Common binding types include left, right, top (calendar), and saddle-stitch. Binding affects duplex printing and page layout.", seeAlso: ["Duplex printing", "Margin"] },
    { term: "Bleed", definition: "In print design, bleed refers to the portion of a PDF page that extends beyond the intended trim boundary. Bleed (typically 3-5mm) ensures no white borders appear when the printed document is cut to its final size.", seeAlso: ["Crop marks", "Trim box"] },
    { term: "Bookmarks", definition: "A clickable table of contents embedded in a PDF, displayed in the viewer's navigation panel. Bookmarks link directly to specific pages, sections, or locations within the document. Also called Outline entries.", relatedTool: { name: "Edit PDF", href: "/edit-pdf" }, seeAlso: ["Outline", "Navigation panel"] },
    { term: "Bounding box", definition: "The smallest rectangle that completely encloses a page element such as text, an image, or a graphic. Bounding boxes are used in PDF processing to position and align content accurately.", seeAlso: ["MediaBox", "CropBox"] },
  ],
  C: [
    { term: "Calibrated color", definition: "Color specified relative to a device-independent reference, ensuring consistent appearance across different displays and printers. PDF supports calibrated color through ICC profiles embedded in the file.", seeAlso: ["ICC profile", "Color space"] },
    { term: "Certificate-based signature", definition: "A digital signature in a PDF that uses a public-key certificate to verify the identity of the signer. Certificate-based signatures provide stronger authenticity guarantees than basic electronic signatures.", seeAlso: ["Digital signature", "Electronic signature"] },
    { term: "CMapResource", definition: "A Character Map resource in PDF that maps character codes to Unicode values and glyph names. CMaps are essential for correct text search and extraction in PDFs with non-Latin scripts.", seeAlso: ["Unicode", "Text extraction"] },
    { term: "Color space", definition: "The mathematical model used to represent color in a PDF. Common PDF color spaces include DeviceRGB (screen), DeviceCMYK (print), DeviceGray (grayscale), and ICC-based profiles for device-independent color.", relatedTool: { name: "Grayscale PDF", href: "/grayscale-pdf" }, seeAlso: ["CMYK", "RGB", "ICC profile"] },
    { term: "Compression", definition: "The process of reducing a PDF's file size by removing redundant data, downsampling images, and applying encoding algorithms like Flate (ZIP), JPEG, or JBIG2. PDF compression can reduce file size by 40-90% depending on content type.", relatedTool: { name: "Compress PDF", href: "/compress-pdf" }, seeAlso: ["Lossless compression", "Lossy compression", "Image downsampling"] },
    { term: "Content stream", definition: "The low-level PDF data that describes what to draw on a page — text, graphics, and images. Content streams contain PostScript-like instructions interpreted by the PDF renderer to build the visual page.", seeAlso: ["PDF structure", "Page object"] },
    { term: "Crop box", definition: "A rectangle defining the visible region of a PDF page, trimming away content outside the box. The CropBox overrides the MediaBox for display purposes but does not permanently delete content outside it.", relatedTool: { name: "Crop PDF", href: "/crop-pdf" }, seeAlso: ["MediaBox", "TrimBox", "BleedBox"] },
    { term: "Cross-reference table (XRef)", definition: "An index at the end of a PDF file that records the byte offset of every object in the file. The XRef table enables random-access reading of PDF objects without parsing the entire file. Corrupted XRef tables are a common cause of unreadable PDFs.", seeAlso: ["PDF object", "PDF structure"] },
  ],
  D: [
    { term: "Digital signature", definition: "A cryptographic mechanism that verifies the identity of the signer and ensures the document has not been modified after signing. Digital signatures in PDF use public-key infrastructure (PKI) and are legally binding in most jurisdictions.", seeAlso: ["Electronic signature", "Certificate-based signature"] },
    { term: "Document Information Dictionary", definition: "PDF metadata stored as a dictionary object containing fields like Title, Author, Subject, Keywords, Creator, Producer, and creation/modification dates. Visible in most PDF viewers under File > Properties.", relatedTool: { name: "Edit PDF", href: "/edit-pdf" }, seeAlso: ["XMP metadata", "PDF metadata"] },
    { term: "DPI (Dots Per Inch)", definition: "A measure of print resolution indicating how many ink dots are printed per linear inch. For PDF images destined for print, 300 DPI is standard. Screen-only PDFs typically use 72-96 DPI. Higher DPI means sharper images but larger file sizes.", seeAlso: ["Resolution", "Image downsampling"] },
    { term: "Duplex printing", definition: "Printing on both sides of a page. PDF viewers can direct printers to use short-edge (flip top) or long-edge (flip side) binding for duplex output. Duplex settings can also be embedded in a PDF's viewer preferences.", seeAlso: ["Binding", "Page orientation"] },
  ],
  E: [
    { term: "Electronic signature", definition: "Any electronic method of signing a document, ranging from a typed name or scanned signature image to a more secure certificate-based digital signature. Electronic signatures are legally valid in most countries under laws like eIDAS (EU) and ESIGN (USA).", relatedTool: { name: "Sign PDF", href: "/sign-pdf" }, seeAlso: ["Digital signature", "eIDAS"] },
    { term: "Embedded font", definition: "A font whose glyph data is included directly within a PDF file. Embedding fonts ensures the document renders with the correct typeface on any device, even if the font is not installed. PDF/A requires all fonts to be fully embedded.", seeAlso: ["Font subsetting", "PDF/A"] },
    { term: "Encryption", definition: "The process of securing PDF content using a cipher so only authorized users can access it. PDF supports 40-bit RC4, 128-bit RC4, 128-bit AES, and 256-bit AES encryption. Password-protected PDFs use encryption to prevent unauthorized opening or editing.", relatedTool: { name: "Protect PDF", href: "/protect" }, seeAlso: ["Password protection", "AES-256", "Permissions"] },
    { term: "Extract pages", definition: "The operation of copying one or more pages from a PDF into a new, separate PDF file. The original document is not modified. Page extraction is useful for sharing specific sections of a report without sending the entire document.", relatedTool: { name: "Extract Pages", href: "/extract-pages" }, seeAlso: ["Split PDF", "Delete pages"] },
  ],
  F: [
    { term: "Flate compression", definition: "A lossless compression algorithm (based on DEFLATE/ZIP) used in PDF to compress streams including content, images, and fonts. Flate compression is the most common algorithm in modern PDFs and produces no quality loss.", seeAlso: ["Compression", "Lossless compression"] },
    { term: "Flatten PDF", definition: "The process of merging interactive elements (form fields, annotations, layers) permanently into the PDF page content so they become non-editable static content. Flattening is used before printing or archiving to ensure consistent rendering.", relatedTool: { name: "Flatten PDF", href: "/flatten-pdf" }, seeAlso: ["Form field", "Annotation", "Layer"] },
    { term: "Font subsetting", definition: "Embedding only the specific glyphs (characters) used in a document rather than the entire font. Subsetting reduces file size — for example, if a document only uses 30 characters from a 2,000-glyph font, only those 30 glyphs are embedded.", seeAlso: ["Embedded font", "PDF/A"] },
    { term: "Form field", definition: "An interactive element in a PDF that allows users to enter data. Types include text fields, checkboxes, radio buttons, dropdowns, list boxes, and signature fields. Form fields are part of the AcroForm or XFA form framework.", relatedTool: { name: "Flatten PDF", href: "/flatten-pdf" }, seeAlso: ["AcroForm", "XFA Form", "Flatten PDF"] },
  ],
  G: [
    { term: "Grayscale PDF", definition: "A PDF in which all color content has been converted to shades of gray. Grayscale conversion reduces file size and is useful for documents destined for black-and-white printing or archiving.", relatedTool: { name: "Grayscale PDF", href: "/grayscale-pdf" }, seeAlso: ["Color space", "DeviceGray"] },
    { term: "Graphics state", definition: "A set of parameters that define how graphics are rendered on a PDF page, including line width, line join style, color, opacity, and the current transformation matrix. The graphics state is modified by graphics state operators in content streams.", seeAlso: ["Content stream", "Transparency"] },
  ],
  H: [
    { term: "Header and footer", definition: "Text or graphics added to the top (header) and bottom (footer) of PDF pages, typically containing page numbers, document title, date, or company name. Headers and footers can be added to existing PDFs without altering the original content area.", relatedTool: { name: "Add Page Numbers", href: "/add-page-numbers" }, seeAlso: ["Page numbers", "Watermark"] },
    { term: "Hyperlink", definition: "A clickable element in a PDF that navigates to a URL, email address, another page in the document, or another file. PDF hyperlinks are stored as annotation objects of type URI or GoTo.", seeAlso: ["Annotation", "Bookmark"] },
  ],
  I: [
    { term: "ICC profile", definition: "An International Color Consortium profile embedded in a PDF that describes the color characteristics of the device on which the content was created. ICC profiles enable consistent color reproduction across different displays and printers.", seeAlso: ["Color space", "Calibrated color", "PDF/X"] },
    { term: "Image downsampling", definition: "Reducing the resolution of images in a PDF during compression. Downsampling from 300 DPI to 150 DPI significantly reduces file size. There are three methods: subsampling (fast, lower quality), averaging (moderate quality), and bicubic (slower, best quality).", relatedTool: { name: "Compress PDF", href: "/compress-pdf" }, seeAlso: ["DPI", "Compression"] },
    { term: "Incremental update", definition: "A PDF modification method that appends changes to the end of the file rather than rewriting the entire file. Incremental updates allow digital signatures to remain valid because the original signed content is preserved. Also used by PDF viewers for efficient autosave.", seeAlso: ["Digital signature", "Cross-reference table"] },
    { term: "ISO 32000", definition: "The international standard (published by the International Organization for Standardization) that formally specifies the PDF format. ISO 32000-1 covers PDF 1.7, while ISO 32000-2 covers PDF 2.0.", seeAlso: ["PDF 2.0", "PDF/A", "PDF/X"] },
  ],
  J: [
    { term: "JBIG2", definition: "A compression standard designed for black-and-white images, commonly used for scanned text pages in PDFs. JBIG2 achieves very high compression ratios (often 2-5x better than G4 fax) while preserving sharp text edges.", seeAlso: ["Compression", "OCR"] },
    { term: "JPEG compression", definition: "A lossy compression algorithm applied to color and grayscale images within PDFs. JPEG reduces file size by discarding some image detail. Higher compression levels produce smaller files but more visible artifacts, particularly around sharp edges.", relatedTool: { name: "Compress PDF", href: "/compress-pdf" }, seeAlso: ["Lossy compression", "Image downsampling"] },
    { term: "JavaScript in PDF", definition: "Embedded JavaScript code in a PDF that can perform calculations, validate form input, display alerts, or trigger other actions. PDF JavaScript is supported by Acrobat but disabled in many third-party PDF viewers for security reasons.", seeAlso: ["AcroForm", "Form field"] },
  ],
  L: [
    { term: "Layer (Optional Content Group)", definition: "A feature that allows PDF content to be organized into named groups that can be shown or hidden. Commonly used in technical drawings, maps, and multilingual documents where different content layers are selectively visible.", seeAlso: ["OCG", "Flatten PDF"] },
    { term: "Linear PDF (Fast Web View)", definition: "A PDF file organized so the first page can be displayed before the entire file is downloaded. Linear PDFs are useful for web viewing. Also called 'optimized' or 'Fast Web View' PDFs.", seeAlso: ["Optimize PDF", "PDF structure"] },
    { term: "Lossless compression", definition: "A compression method that reduces file size without any loss of data. The decompressed output is identical to the original. PDF uses Flate (ZIP) for lossless compression of content streams, fonts, and images.", seeAlso: ["Lossy compression", "Flate compression"] },
    { term: "Lossy compression", definition: "A compression method that permanently discards some data to achieve higher compression ratios. JPEG is the most common lossy compression for images in PDF. The lost data cannot be recovered, but the visual impact at moderate compression levels is minimal.", seeAlso: ["Lossless compression", "JPEG compression"] },
  ],
  M: [
    { term: "MediaBox", definition: "The largest bounding box in a PDF page, defining the full extent of the page including bleed, printer marks, and any overflow content. The MediaBox defines the physical media size (e.g., A4, Letter). Other boxes — CropBox, TrimBox, BleedBox — must fit within the MediaBox.", seeAlso: ["CropBox", "TrimBox", "BleedBox"] },
    { term: "Merge PDF", definition: "The operation of combining two or more PDF files into a single multi-page PDF. The page order follows the input file order. Merging preserves the bookmarks, annotations, and form fields from each source document.", relatedTool: { name: "Merge PDF", href: "/merge-pdf" }, seeAlso: ["Split PDF", "Page order"] },
    { term: "Metadata", definition: "Data about the PDF document stored separately from its content. PDF metadata includes author, title, subject, keywords, creation date, and modification date. Metadata can be stored in the Document Information Dictionary or in XMP format.", relatedTool: { name: "Edit PDF", href: "/edit-pdf" }, seeAlso: ["XMP metadata", "Document Information Dictionary"] },
    { term: "MRC (Mixed Raster Content)", definition: "A compression technique for scanned PDFs that separates the page into layers — foreground (text), background (images), and mask — and applies different compression to each. MRC significantly reduces scanned document file sizes while preserving text sharpness.", seeAlso: ["OCR", "Compression"] },
  ],
  N: [
    { term: "Named destination", definition: "A named location in a PDF that hyperlinks and bookmarks can target. Unlike page-number-based links, named destinations remain valid even when pages are inserted or removed.", seeAlso: ["Bookmark", "Hyperlink"] },
  ],
  O: [
    { term: "OCR (Optical Character Recognition)", definition: "The technology that converts images of text (from scans or photos) into machine-readable, searchable text within a PDF. OCR enables text search, copy-paste, and screen reader access for scanned documents.", relatedTool: { name: "OCR PDF", href: "/ocr-pdf" }, seeAlso: ["Scan to PDF", "Searchable PDF"] },
    { term: "Open password", definition: "A PDF password required to open and view the document. Also called the User password or Document Open password. Different from the Permissions (Owner) password, which controls editing rights without restricting viewing.", relatedTool: { name: "Protect PDF", href: "/protect" }, seeAlso: ["Permissions password", "Encryption"] },
    { term: "Optimize PDF", definition: "The process of restructuring a PDF to improve performance. Optimization may include linearizing for fast web view, removing duplicate objects, compressing streams, downsampling images, and removing unused resources.", relatedTool: { name: "Compress PDF", href: "/compress-pdf" }, seeAlso: ["Linear PDF", "Compression"] },
    { term: "Owner password", definition: "A PDF password that controls document permissions (printing, copying, editing) without preventing the document from being opened. The owner password unlocks all restrictions and gives full control over the document.", relatedTool: { name: "Unlock PDF", href: "/unlock-pdf" }, seeAlso: ["Open password", "Permissions", "Encryption"] },
  ],
  P: [
    { term: "Page size", definition: "The dimensions of a PDF page as defined by its MediaBox. Common standard sizes include A4 (210×297mm), US Letter (8.5×11in), A3, A5, US Legal, and Tabloid/Ledger. PDF pages in the same file can have different sizes.", seeAlso: ["MediaBox", "A4", "US Letter"] },
    { term: "PDF (Portable Document Format)", definition: "A file format developed by Adobe in 1992 and standardized as ISO 32000 in 2008. PDF preserves the visual appearance, fonts, and layout of documents regardless of the operating system, software, or hardware used to view them.", seeAlso: ["ISO 32000", "Adobe Acrobat"] },
    { term: "PDF 2.0", definition: "The latest major version of the PDF specification (ISO 32000-2), published in 2017. PDF 2.0 adds improvements in encryption (AES-256), digital signatures, accessibility, and color management while maintaining backward compatibility.", seeAlso: ["ISO 32000", "PDF"] },
    { term: "PDF/A", definition: "An ISO standard (ISO 19005) for archiving electronic documents using the PDF format. PDF/A ensures long-term preservation by requiring self-contained files with embedded fonts, color profiles, and metadata, and prohibiting dynamic content like JavaScript.", relatedTool: { name: "PDF to PDF/A", href: "/pdf-to-pdfa" }, seeAlso: ["Archival PDF", "ISO 19005"] },
    { term: "PDF/E", definition: "An ISO standard (ISO 24517) for engineering documents, extending PDF with support for 3D content, geospatial data, and rich media. Used in CAD, GIS, and manufacturing workflows.", seeAlso: ["PDF", "PDF/X"] },
    { term: "PDF/UA", definition: "An ISO standard (ISO 14289) that defines requirements for universally accessible PDF documents, ensuring compatibility with assistive technologies like screen readers. UA stands for Universal Accessibility.", seeAlso: ["Accessibility", "Tagged PDF"] },
    { term: "PDF/X", definition: "A family of ISO standards (ISO 15930) for the reliable exchange of print-ready PDF files. PDF/X ensures that PDFs intended for print have all necessary fonts, colors, and trim information embedded.", seeAlso: ["ICC profile", "Print-ready PDF"] },
    { term: "Permissions password", definition: "A PDF password that restricts operations such as printing, copying text, editing, or adding annotations without preventing the document from being opened. Also called the Owner password.", relatedTool: { name: "Protect PDF", href: "/protect" }, seeAlso: ["Open password", "Encryption"] },
    { term: "PostScript", definition: "A page description language developed by Adobe in 1984, and the predecessor of PDF. PostScript files cannot be directly viewed without a PostScript interpreter. Many printers use PostScript, and many PDFs are generated by printing to a PostScript driver.", seeAlso: ["PDF", "Content stream"] },
  ],
  R: [
    { term: "Rasterize", definition: "Converting vector graphics or text in a PDF into a pixel-based (raster) image. Rasterizing a PDF page produces an image file (JPG, PNG, TIFF) at a specified DPI. This is used for PDF to image conversions.", relatedTool: { name: "PDF to JPG", href: "/pdf-to-jpg" }, seeAlso: ["Vector graphics", "DPI"] },
    { term: "Redaction", definition: "The permanent removal of sensitive information from a PDF. True redaction burns black boxes into the page content, destroying the underlying data — not just covering it visually. Redacted content cannot be recovered.", relatedTool: { name: "Redact PDF", href: "/redact-pdf" }, seeAlso: ["Sensitive information", "Flatten PDF"] },
    { term: "Reorder pages", definition: "The operation of changing the sequence of pages in a PDF. Common in situations where pages were scanned out of order, or when reorganizing a report.", relatedTool: { name: "Reorder Pages", href: "/reorder-pages" }, seeAlso: ["Merge PDF", "Delete pages"] },
    { term: "Rotate PDF", definition: "The operation of changing the display orientation of one or more pages in a PDF. Rotation values are stored in the page dictionary and can be 0°, 90°, 180°, or 270°.", relatedTool: { name: "Rotate PDF", href: "/rotate-pdf" }, seeAlso: ["Page orientation", "Auto-rotate"] },
  ],
  S: [
    { term: "Searchable PDF", definition: "A PDF in which text content is machine-readable and can be searched, selected, and copied. Searchable PDFs contain actual text objects (not just images), either from the source document or added via OCR processing.", relatedTool: { name: "OCR PDF", href: "/ocr-pdf" }, seeAlso: ["OCR", "Tagged PDF"] },
    { term: "Signature field", definition: "An interactive form field in a PDF designated to receive a digital or electronic signature. Signature fields have a defined location on the page and can be configured to require certificate-based or approval signatures.", relatedTool: { name: "Sign PDF", href: "/sign-pdf" }, seeAlso: ["Digital signature", "AcroForm"] },
    { term: "Split PDF", definition: "Dividing a PDF into multiple smaller files by specifying page ranges or splitting at every page. Splitting is useful for sharing specific chapters, distributing reports by section, or reducing file sizes.", relatedTool: { name: "Split PDF", href: "/split-pdf" }, seeAlso: ["Extract pages", "Merge PDF"] },
    { term: "Structured PDF (Tagged PDF)", definition: "A PDF that contains semantic structure information (tags) describing the document's organization — headings, paragraphs, lists, tables, images. Tagged PDFs are required for accessibility compliance (PDF/UA) and enable reflowable reading on small screens.", seeAlso: ["PDF/UA", "Accessibility", "Reading order"] },
  ],
  T: [
    { term: "Tagged PDF", definition: "A PDF with an embedded logical structure tree (tags) that defines reading order, content type, and relationships between elements. Tagged PDFs are essential for screen reader accessibility and are required by PDF/UA.", seeAlso: ["Structured PDF", "PDF/UA", "Accessibility"] },
    { term: "Transparency", definition: "The ability of PDF objects to be partially or fully transparent, allowing content below to show through. PDF transparency is controlled by opacity values and blend modes. Transparency can increase rendering complexity and may require flattening for certain print workflows.", seeAlso: ["Flatten PDF", "Blend mode"] },
    { term: "TrimBox", definition: "A rectangle defining the intended final dimensions of a printed page after trimming. The TrimBox excludes bleed and printer marks. It is the primary rectangle for finished print output.", seeAlso: ["MediaBox", "BleedBox", "CropBox"] },
  ],
  U: [
    { term: "Unicode", definition: "An international encoding standard that assigns a unique code point to every character in every writing system. PDF files with proper Unicode mapping allow correct text search, extraction, and accessibility, especially for non-Latin scripts.", seeAlso: ["CMapResource", "Embedded font"] },
    { term: "Unlock PDF", definition: "The process of removing password protection or restrictions from a PDF file. Unlocking requires knowing the original password. The output PDF can be opened and used without a password.", relatedTool: { name: "Unlock PDF", href: "/unlock-pdf" }, seeAlso: ["Encryption", "Open password", "Permissions password"] },
  ],
  V: [
    { term: "Vector graphics", definition: "Graphics defined by mathematical paths and shapes rather than pixels. Vector content in PDFs (lines, curves, filled shapes) scales to any size without loss of quality. Text is also vector-based. In contrast, embedded images are raster (pixel-based).", seeAlso: ["Rasterize", "DPI"] },
    { term: "Version stamp (PDF version)", definition: "The PDF version indicator at the start of a PDF file (e.g., %PDF-1.7). The version determines which features the file uses. Common versions include 1.4, 1.5, 1.6, 1.7, and 2.0.", seeAlso: ["PDF 2.0", "ISO 32000"] },
  ],
  W: [
    { term: "Watermark", definition: "Text or an image applied semi-transparently over PDF page content, typically to indicate confidentiality, ownership, or draft status. Watermarks can be added as annotations (removable) or burned into the content stream (permanent).", relatedTool: { name: "Add Watermark", href: "/add-watermark" }, seeAlso: ["Annotation", "Redaction"] },
    { term: "Word to PDF", definition: "The conversion of Microsoft Word documents (.doc or .docx) to PDF format, preserving all formatting, fonts, images, and layout. Word to PDF conversion is one of the most common document workflows.", relatedTool: { name: "Word to PDF", href: "/word-to-pdf" }, seeAlso: ["PDF", "Convert to PDF"] },
  ],
  X: [
    { term: "XFA Form (XML Forms Architecture)", definition: "An Adobe-proprietary XML-based form technology for complex, dynamic PDF forms. XFA forms can reflow and resize based on data. XFA is not supported by many PDF viewers outside Adobe Acrobat and was deprecated in PDF 2.0.", seeAlso: ["AcroForm", "Form field"] },
    { term: "XMP metadata", definition: "Extensible Metadata Platform — an XML-based metadata standard embedded in PDFs. XMP provides richer metadata than the traditional Document Information Dictionary, including copyright information, usage rights, and provenance data.", relatedTool: { name: "Edit PDF", href: "/edit-pdf" }, seeAlso: ["Document Information Dictionary", "Metadata"] },
  ],
  Z: [
    { term: "ZIP compression (Zlib)", definition: "A lossless data compression algorithm used in PDF to compress non-image streams. Also called Flate or Deflate. ZIP compression is applied to content streams, font data, and other binary objects within a PDF.", seeAlso: ["Flate compression", "Lossless compression"] },
  ],
};

const LETTERS = Object.keys(GLOSSARY).sort();
const TOTAL_TERMS = Object.values(GLOSSARY).reduce((sum, terms) => sum + terms.length, 0);

export default function PdfGlossaryPage() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: `PDF Glossary — ${TOTAL_TERMS} PDF Terms Explained | PDF HUB 24`,
    description: `Complete A-Z PDF glossary with ${TOTAL_TERMS}+ terms. Clear definitions for PDF/A, OCR, compression, encryption, annotations, metadata, and more. Free reference for students and professionals.`,
    keywords: "pdf glossary, pdf terms, pdf definitions, what is pdf/a, pdf compression terms, pdf encryption glossary, pdf metadata, pdf annotations, ocr definition",
    canonicalPath: "/pdf-glossary",
  });

  useEffect(() => {
    const existing = document.querySelector('script[data-schema="glossary"]');
    if (existing) existing.remove();

    const allTerms = Object.values(GLOSSARY).flat();
    const definedTermSet = {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "name": "PDF Glossary — Complete A-Z Reference",
      "description": `Comprehensive glossary of ${TOTAL_TERMS} PDF terms covering format specifications, compression, security, accessibility, and PDF processing tools.`,
      "url": `${BASE_URL}/pdf-glossary`,
      "inLanguage": "en",
      "hasDefinedTerm": allTerms.map(t => ({
        "@type": "DefinedTerm",
        "name": t.term,
        "description": t.definition,
        "inDefinedTermSet": `${BASE_URL}/pdf-glossary`
      }))
    };

    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-schema", "glossary");
    script.textContent = JSON.stringify(definedTermSet);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-schema="glossary"]');
      if (s) s.remove();
    };
  }, []);

  const filteredGlossary = searchQuery.trim()
    ? Object.entries(GLOSSARY).reduce((acc, [letter, terms]) => {
        const q = searchQuery.toLowerCase();
        const matching = terms.filter(t =>
          t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
        );
        if (matching.length > 0) acc[letter] = matching;
        return acc;
      }, {} as Record<string, GlossaryTerm[]>)
    : GLOSSARY;

  const visibleLetters = Object.keys(filteredGlossary).sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
            <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-foreground font-medium">PDF Glossary</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Reference</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">PDF Glossary — A-Z Reference</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              {TOTAL_TERMS} PDF terms clearly explained — from compression algorithms and color spaces to digital signatures, PDF standards, and archiving formats. Whether you're a student, developer, or document professional, this reference covers everything you need to understand the PDF ecosystem.
            </p>
            <p className="text-sm text-muted-foreground">
              Free to use, share, and reference. Updated regularly as the PDF standard evolves.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search terms (e.g. OCR, compression, encryption...)"
              className="w-full pl-10 pr-4 py-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              data-testid="input-glossary-search"
              aria-label="Search glossary terms"
            />
          </div>

          {/* Letter Nav */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-1.5 mb-10" role="navigation" aria-label="Jump to letter">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
                const hasTerms = LETTERS.includes(letter);
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    onClick={() => hasTerms && setActiveLetter(letter)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      hasTerms
                        ? "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                        : "text-muted-foreground/40 cursor-default"
                    }`}
                    data-testid={`link-letter-${letter}`}
                    aria-disabled={!hasTerms}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          )}

          {/* Term count for search */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-6">
              {Object.values(filteredGlossary).flat().length} term{Object.values(filteredGlossary).flat().length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          )}

          {/* Glossary Sections */}
          <div className="space-y-12">
            {visibleLetters.map(letter => (
              <section key={letter} id={`letter-${letter}`} aria-labelledby={`heading-${letter}`}>
                <h2 id={`heading-${letter}`} className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold text-lg">
                    {letter}
                  </span>
                  <span className="text-muted-foreground text-sm font-normal">{filteredGlossary[letter].length} term{filteredGlossary[letter].length !== 1 ? "s" : ""}</span>
                </h2>
                <div className="space-y-4">
                  {filteredGlossary[letter].map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                          <h3 className="text-lg font-semibold" id={`term-${item.term.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}>
                            {item.term}
                          </h3>
                          {item.relatedTool && (
                            <Link href={item.relatedTool.href}>
                              <Button variant="outline" size="sm" className="gap-1.5 flex-shrink-0" data-testid={`link-tool-${item.relatedTool.href.replace("/", "")}`}>
                                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                                {item.relatedTool.name}
                                <ArrowRight className="w-3 h-3" aria-hidden="true" />
                              </Button>
                            </Link>
                          )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
                        {item.seeAlso && item.seeAlso.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-3">
                            See also: <span className="italic">{item.seeAlso.join(", ")}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {visibleLetters.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-40" />
              <p>No terms found matching "{searchQuery}"</p>
              <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-4">Clear search</Button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Ready to work with PDFs?</h2>
            <p className="text-muted-foreground mb-6">
              PDF HUB 24 offers 49+ free tools for every task in this glossary — from OCR and compression to PDF/A conversion and digital signing.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/compress-pdf">
                <Button data-testid="button-cta-compress">Compress PDF</Button>
              </Link>
              <Link href="/merge-pdf">
                <Button variant="outline" data-testid="button-cta-merge">Merge PDF</Button>
              </Link>
              <Link href="/ocr-pdf">
                <Button variant="outline" data-testid="button-cta-ocr">OCR PDF</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="gap-1" data-testid="button-cta-all-tools">
                  View All 49 Tools <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Explore More PDF Resources</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/pdf-file-formats-guide", text: "PDF File Formats Guide", desc: "In-depth guide to PDF/A, PDF/X, PDF/E, PDF/UA and more" },
                { href: "/pdf-comparison-chart", text: "PDF Tool Comparison", desc: "Compare PDF HUB 24 against other popular PDF platforms" },
                { href: "/blog/best-free-pdf-tools-2026", text: "Best Free PDF Tools 2026", desc: "Our roundup of the top free PDF tools available online" },
                { href: "/blog/how-to-compress-pdf-for-email", text: "PDF Compression Guide", desc: "How to compress PDFs for email without losing quality" },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm flex items-center gap-1">
                        {link.text} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
