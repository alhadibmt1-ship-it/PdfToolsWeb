import { z } from "zod";

export const compressionLevelSchema = z.enum(["low", "medium", "high"]);
export type CompressionLevel = z.infer<typeof compressionLevelSchema>;

export const rotationAngleSchema = z.enum(["90", "180", "270"]);
export type RotationAngle = z.infer<typeof rotationAngleSchema>;

export const splitOptionsSchema = z.object({
  startPage: z.number().min(1),
  endPage: z.number().min(1),
});
export type SplitOptions = z.infer<typeof splitOptionsSchema>;

export const deletePageOptionsSchema = z.object({
  pagesToDelete: z.array(z.number().min(1)),
});
export type DeletePageOptions = z.infer<typeof deletePageOptionsSchema>;

export const protectPdfOptionsSchema = z.object({
  userPassword: z.string().min(4, "Password must be at least 4 characters"),
  ownerPassword: z.string().min(4).optional(),
});
export type ProtectPdfOptions = z.infer<typeof protectPdfOptionsSchema>;

export const unlockPdfOptionsSchema = z.object({
  password: z.string().min(1, "Password is required"),
});
export type UnlockPdfOptions = z.infer<typeof unlockPdfOptionsSchema>;

export const pageNumberOptionsSchema = z.object({
  position: z.enum(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"]),
  startNumber: z.number().min(1).default(1),
  fontSize: z.number().min(8).max(24).default(12),
});
export type PageNumberOptions = z.infer<typeof pageNumberOptionsSchema>;

export const watermarkOptionsSchema = z.object({
  text: z.string().min(1),
  opacity: z.number().min(0.1).max(1).default(0.3),
  fontSize: z.number().min(12).max(72).default(48),
  rotation: z.number().min(-90).max(90).default(-45),
});
export type WatermarkOptions = z.infer<typeof watermarkOptionsSchema>;

export const reorderPagesOptionsSchema = z.object({
  pageOrder: z.array(z.number().min(1)),
});
export type ReorderPagesOptions = z.infer<typeof reorderPagesOptionsSchema>;

export interface PDFTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  acceptedFormats: string;
  category: "from-pdf" | "to-pdf" | "edit-pdf" | "utility";
}

export const PDF_TOOLS: PDFTool[] = [
  // FROM PDF - Convert PDF to other formats
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable DOCX document",
    icon: "pdf-to-word",
    path: "/pdf-to-word",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    icon: "pdf-to-jpg",
    path: "/pdf-to-jpg",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG images",
    icon: "pdf-to-png",
    path: "/pdf-to-png",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel spreadsheet",
    icon: "pdf-to-excel",
    path: "/pdf-to-excel",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "pdf-to-ppt",
    title: "PDF to PowerPoint",
    description: "Convert PDF to editable PPT slides",
    icon: "pdf-to-ppt",
    path: "/pdf-to-ppt",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "extract-text",
    title: "Extract Text",
    description: "Extract text content from PDF files",
    icon: "file-type",
    path: "/extract-text",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  // TO PDF - Convert other formats to PDF
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX documents to PDF format",
    icon: "word-to-pdf",
    path: "/word-to-pdf",
    acceptedFormats: ".docx",
    category: "to-pdf"
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to a single PDF document",
    icon: "jpg-to-pdf",
    path: "/jpg-to-pdf",
    acceptedFormats: "image/*",
    category: "to-pdf"
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF document",
    icon: "png-to-pdf",
    path: "/png-to-pdf",
    acceptedFormats: ".png",
    category: "to-pdf"
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF",
    icon: "excel-to-pdf",
    path: "/excel-to-pdf",
    acceptedFormats: ".xlsx,.xls",
    category: "to-pdf"
  },
  {
    id: "ppt-to-pdf",
    title: "PowerPoint to PDF",
    description: "Convert PPT/PPTX slides to PDF",
    icon: "ppt-to-pdf",
    path: "/ppt-to-pdf",
    acceptedFormats: ".ppt,.pptx",
    category: "to-pdf"
  },
  {
    id: "tiff-to-pdf",
    title: "TIFF to PDF",
    description: "Convert TIFF images to PDF document",
    icon: "tiff-to-pdf",
    path: "/tiff-to-pdf",
    acceptedFormats: ".tiff,.tif",
    category: "to-pdf"
  },
  {
    id: "gif-to-pdf",
    title: "GIF to PDF",
    description: "Convert GIF images to PDF document",
    icon: "gif-to-pdf",
    path: "/gif-to-pdf",
    acceptedFormats: ".gif",
    category: "to-pdf"
  },
  // EDIT PDF - Modify existing PDFs
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: "merge",
    path: "/merge",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract specific pages from your PDF file",
    icon: "split",
    path: "/split",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    icon: "compress",
    path: "/compress",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "rotate",
    title: "Rotate PDF",
    description: "Rotate pages in your PDF document",
    icon: "rotate-cw",
    path: "/rotate",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "delete-pages",
    title: "Delete Pages",
    description: "Remove unwanted pages from PDF",
    icon: "trash",
    path: "/delete-pages",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "reorder-pages",
    title: "Reorder Pages",
    description: "Rearrange page order in your PDF",
    icon: "move",
    path: "/reorder-pages",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "add-page-numbers",
    title: "Add Page Numbers",
    description: "Add page numbers to your PDF document",
    icon: "hash",
    path: "/add-page-numbers",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "add-watermark",
    title: "Add Watermark",
    description: "Add text watermark to PDF pages",
    icon: "droplet",
    path: "/add-watermark",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password protection to your PDF files",
    icon: "lock",
    path: "/protect-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password from protected PDF files",
    icon: "unlock",
    path: "/unlock-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "crop-pdf",
    title: "Crop PDF",
    description: "Trim margins and remove unwanted whitespace",
    icon: "crop",
    path: "/crop-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "resize-pdf",
    title: "Resize PDF",
    description: "Change PDF page size to A4, Letter, and more",
    icon: "resize",
    path: "/resize-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "sign-pdf",
    title: "Sign PDF",
    description: "Add your signature to PDF documents",
    icon: "signature",
    path: "/sign-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "flatten-pdf",
    title: "Flatten PDF",
    description: "Flatten forms and layers into static content",
    icon: "layers",
    path: "/flatten-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "grayscale-pdf",
    title: "PDF to Grayscale",
    description: "Convert PDF to black and white for printing",
    icon: "grayscale",
    path: "/grayscale-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "repair-pdf",
    title: "Repair PDF",
    description: "Fix corrupted or damaged PDF files",
    icon: "repair",
    path: "/repair-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, and shapes to PDF",
    icon: "edit-pdf",
    path: "/edit-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "annotate-pdf",
    title: "Annotate PDF",
    description: "Highlight, underline, and mark up PDFs",
    icon: "annotate",
    path: "/annotate-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  {
    id: "redact-pdf",
    title: "Redact PDF",
    description: "Permanently black out sensitive information",
    icon: "redact",
    path: "/redact-pdf",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  },
  // NEW TO-PDF CONVERSIONS
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert HTML code to PDF documents",
    icon: "html-to-pdf",
    path: "/html-to-pdf",
    acceptedFormats: ".html",
    category: "to-pdf"
  },
  {
    id: "webp-to-pdf",
    title: "WebP to PDF",
    description: "Convert WebP images to PDF",
    icon: "webp-to-pdf",
    path: "/webp-to-pdf",
    acceptedFormats: ".webp",
    category: "to-pdf"
  },
  // NEW FROM-PDF CONVERSIONS
  {
    id: "extract-images",
    title: "Extract Images",
    description: "Extract all images from PDF documents",
    icon: "images",
    path: "/extract-images",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF",
    description: "Extract text from scanned PDFs with OCR",
    icon: "ocr",
    path: "/ocr-pdf",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  // UTILITY TOOLS
  {
    id: "pdf-viewer",
    title: "PDF Viewer",
    description: "View PDF files directly in your browser",
    icon: "viewer",
    path: "/pdf-viewer",
    acceptedFormats: ".pdf",
    category: "utility"
  },
  {
    id: "compare-pdf",
    title: "Compare PDF",
    description: "Find differences between two PDF files",
    icon: "compare",
    path: "/compare-pdf",
    acceptedFormats: ".pdf",
    category: "utility"
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images",
    icon: "image-compress",
    path: "/image-compressor",
    acceptedFormats: ".jpg,.jpeg,.png,.webp",
    category: "utility"
  },
  {
    id: "resize-image",
    title: "Resize Image",
    description: "Resize images to any dimension or percentage",
    icon: "resize-image",
    path: "/resize-image",
    acceptedFormats: ".jpg,.jpeg,.png,.webp,.gif",
    category: "utility"
  },
  {
    id: "crop-image",
    title: "Crop Image",
    description: "Crop images to remove unwanted areas",
    icon: "crop-image",
    path: "/crop-image",
    acceptedFormats: ".jpg,.jpeg,.png,.webp,.gif",
    category: "utility"
  },
  {
    id: "rotate-image",
    title: "Rotate & Flip Image",
    description: "Rotate or flip images in any direction",
    icon: "rotate-image",
    path: "/rotate-image",
    acceptedFormats: ".jpg,.jpeg,.png,.webp,.gif",
    category: "utility"
  },
  {
    id: "convert-image",
    title: "Convert Image",
    description: "Convert images between JPG, PNG, WebP formats",
    icon: "convert-image",
    path: "/convert-image",
    acceptedFormats: ".jpg,.jpeg,.png,.webp,.gif,.bmp,.tiff,.tif",
    category: "utility"
  },
  {
    id: "scan-to-pdf",
    title: "Scan to PDF",
    description: "Use your camera to scan documents and convert to PDF",
    icon: "camera",
    path: "/scan-to-pdf",
    acceptedFormats: ".jpg,.jpeg,.png,.webp",
    category: "to-pdf"
  },
  {
    id: "pdf-to-pdfa",
    title: "PDF to PDF/A",
    description: "Convert PDF to PDF/A format for long-term archiving",
    icon: "archive",
    path: "/pdf-to-pdfa",
    acceptedFormats: ".pdf",
    category: "from-pdf"
  },
  {
    id: "batch-compress",
    title: "Batch Compress PDF",
    description: "Compress multiple PDF files at once and download as ZIP",
    icon: "layers",
    path: "/batch-compress",
    acceptedFormats: ".pdf",
    category: "edit-pdf"
  }
];
