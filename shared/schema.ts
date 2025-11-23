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

export const passwordProtectSchema = z.object({
  password: z.string().min(1),
});
export type PasswordProtectOptions = z.infer<typeof passwordProtectSchema>;

export const unlockPdfSchema = z.object({
  password: z.string().min(1),
});
export type UnlockPdfOptions = z.infer<typeof unlockPdfSchema>;

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
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: "merge",
    path: "/merge",
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
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    icon: "image",
    path: "/pdf-to-jpg",
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
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable DOCX document",
    icon: "file-text",
    path: "/pdf-to-word",
    acceptedFormats: ".pdf"
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
    id: "protect",
    title: "Password Protect",
    description: "Encrypt your PDF with a password",
    icon: "lock",
    path: "/protect",
    acceptedFormats: ".pdf"
  },
  {
    id: "unlock",
    title: "Unlock PDF",
    description: "Remove password protection from PDF",
    icon: "unlock",
    path: "/unlock",
    acceptedFormats: ".pdf"
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
  }
];
