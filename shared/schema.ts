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
}

export const PDF_TOOLS: PDFTool[] = [
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable DOCX document",
    icon: "file-text",
    path: "/pdf-to-word",
    acceptedFormats: ".pdf"
  },
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: "merge",
    path: "/merge",
    acceptedFormats: ".pdf"
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    icon: "image",
    path: "/pdf-to-jpg",
    acceptedFormats: ".pdf"
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract specific pages from your PDF file",
    icon: "split",
    path: "/split",
    acceptedFormats: ".pdf"
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    icon: "compress",
    path: "/compress",
    acceptedFormats: ".pdf"
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to a single PDF document",
    icon: "file-image",
    path: "/jpg-to-pdf",
    acceptedFormats: "image/*"
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX documents to PDF format",
    icon: "file-text",
    path: "/word-to-pdf",
    acceptedFormats: ".docx"
  },
  {
    id: "rotate",
    title: "Rotate PDF",
    description: "Rotate pages in your PDF document",
    icon: "rotate-cw",
    path: "/rotate",
    acceptedFormats: ".pdf"
  },
  {
    id: "delete-pages",
    title: "Delete Pages",
    description: "Remove unwanted pages from PDF",
    icon: "trash",
    path: "/delete-pages",
    acceptedFormats: ".pdf"
  },
  {
    id: "extract-text",
    title: "Extract Text",
    description: "Extract text content from PDF files",
    icon: "file-type",
    path: "/extract-text",
    acceptedFormats: ".pdf"
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password protection to your PDF files",
    icon: "lock",
    path: "/protect-pdf",
    acceptedFormats: ".pdf"
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password from protected PDF files",
    icon: "unlock",
    path: "/unlock-pdf",
    acceptedFormats: ".pdf"
  },
  {
    id: "add-page-numbers",
    title: "Add Page Numbers",
    description: "Add page numbers to your PDF document",
    icon: "hash",
    path: "/add-page-numbers",
    acceptedFormats: ".pdf"
  },
  {
    id: "add-watermark",
    title: "Add Watermark",
    description: "Add text watermark to PDF pages",
    icon: "droplet",
    path: "/add-watermark",
    acceptedFormats: ".pdf"
  },
  {
    id: "reorder-pages",
    title: "Reorder Pages",
    description: "Rearrange page order in your PDF",
    icon: "move",
    path: "/reorder-pages",
    acceptedFormats: ".pdf"
  }
];
