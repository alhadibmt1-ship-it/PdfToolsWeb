import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { PDFDocument, degrees } from "pdf-lib";
import sharp from "sharp";
import archiver from "archiver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "canvas";
import { createRequire } from "module";
import { 
  splitOptionsSchema, 
  rotationAngleSchema, 
  deletePageOptionsSchema, 
  passwordProtectSchema,
  unlockPdfSchema,
  compressionLevelSchema
} from "@shared/schema";
import { z } from "zod";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

function isPdfFile(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  const header = buffer.toString("latin1", 0, 4);
  return header === "%PDF";
}

function isImageFile(buffer: Buffer): boolean {
  if (buffer.length < 8) return false;
  
  const png = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  const jpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
  const gif = buffer.toString("latin1", 0, 3) === "GIF";
  const webp = buffer.toString("latin1", 8, 12) === "WEBP";
  
  return png || jpeg || gif || webp;
}

const pdfFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const imageFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const uploadPdf = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: pdfFileFilter
});

const uploadImages = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: imageFileFilter
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/merge", uploadPdf.array("files", 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length < 2) {
        return res.status(400).json({ error: "At least 2 PDF files are required" });
      }

      for (const file of files) {
        if (!isPdfFile(file.buffer)) {
          return res.status(400).json({ error: "Invalid PDF file detected" });
        }
      }

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        try {
          const pdfDoc = await PDFDocument.load(file.buffer);
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } catch (parseError) {
          return res.status(400).json({ error: "Invalid or corrupted PDF file" });
        }
      }

      const pdfBytes = await mergedPdf.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Merge error:", error);
      res.status(500).json({ error: "Failed to merge PDFs" });
    }
  });

  app.post("/api/split", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = splitOptionsSchema.safeParse({
        startPage: parseInt(req.body.startPage, 10),
        endPage: parseInt(req.body.endPage, 10)
      });

      if (!validated.success) {
        return res.status(400).json({ error: "Invalid page range parameters" });
      }

      const { startPage, endPage } = validated.data;

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const totalPages = pdfDoc.getPageCount();

      if (startPage < 1 || endPage > totalPages || startPage > endPage) {
        return res.status(400).json({ error: `Invalid page range. PDF has ${totalPages} pages.` });
      }

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(
        pdfDoc, 
        Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i)
      );
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=split-${startPage}-${endPage}.pdf`);
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Split error:", error);
      res.status(500).json({ error: "Failed to split PDF" });
    }
  });

  app.post("/api/compress", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = compressionLevelSchema.safeParse(req.body.level || "medium");
      if (!validated.success) {
        return res.status(400).json({ error: "Invalid compression level" });
      }

      const level = validated.data;
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }
      
      const compressionOptions = {
        objectsPerTick: level === "high" ? 200 : level === "low" ? 50 : 100,
      };

      const pdfBytes = await pdfDoc.save(compressionOptions);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=compressed.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Compress error:", error);
      res.status(500).json({ error: "Failed to compress PDF" });
    }
  });

  app.post("/api/pdf-to-jpg", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let pdfDocument;
      try {
        const loadingTask = pdfjsLib.getDocument({ data: file.buffer });
        pdfDocument = await loadingTask.promise;
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const numPages = pdfDocument.numPages;

      const archive = archiver("zip", { zlib: { level: 9 } });
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=images.zip");
      archive.pipe(res);

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");

        await page.render({
          canvasContext: context as any,
          viewport: viewport,
        }).promise;

        const imageBuffer = canvas.toBuffer("image/jpeg", { quality: 0.95 });
        archive.append(imageBuffer, { name: `page-${pageNum}.jpg` });
      }

      await archive.finalize();
    } catch (error) {
      console.error("PDF to JPG error:", error);
      res.status(500).json({ error: "Failed to convert PDF to JPG" });
    }
  });

  app.post("/api/jpg-to-pdf", uploadImages.array("files", 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one image file is required" });
      }

      for (const file of files) {
        if (!isImageFile(file.buffer)) {
          return res.status(400).json({ error: "Invalid image file detected" });
        }
      }

      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        try {
          let image;
          const isJpg = file.mimetype === "image/jpeg" || file.mimetype === "image/jpg";
          const isPng = file.mimetype === "image/png";

          if (isJpg) {
            image = await pdfDoc.embedJpg(file.buffer);
          } else if (isPng) {
            image = await pdfDoc.embedPng(file.buffer);
          } else {
            const convertedBuffer = await sharp(file.buffer).jpeg().toBuffer();
            image = await pdfDoc.embedJpg(convertedBuffer);
          }

          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        } catch (imageError) {
          return res.status(400).json({ error: "Invalid or corrupted image file" });
        }
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("JPG to PDF error:", error);
      res.status(500).json({ error: "Failed to convert images to PDF" });
    }
  });

  app.post("/api/pdf-to-word", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let data;
      try {
        data = await pdf(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const text = data.text;

      const paragraphs = text.split("\n\n").filter(p => p.trim()).map(p => 
        new Paragraph({
          children: [new TextRun(p.trim())],
          spacing: { after: 200 }
        })
      );

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs.length > 0 ? paragraphs : [
            new Paragraph({
              children: [new TextRun("No text could be extracted from this PDF.")]
            })
          ]
        }]
      });

      const buffer = await Packer.toBuffer(doc);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", "attachment; filename=converted.docx");
      res.send(buffer);
    } catch (error) {
      console.error("PDF to Word error:", error);
      res.status(500).json({ error: "Failed to convert PDF to Word" });
    }
  });

  app.post("/api/protect", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = passwordProtectSchema.safeParse({ password: req.body.password });
      if (!validated.success) {
        return res.status(400).json({ error: "Password is required and must be at least 1 character" });
      }

      const { password } = validated.data;
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }
      
      const pdfBytes = await pdfDoc.save({
        userPassword: password,
        ownerPassword: password,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=protected.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Protect error:", error);
      res.status(500).json({ error: "Failed to protect PDF" });
    }
  });

  app.post("/api/unlock", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = unlockPdfSchema.safeParse({ password: req.body.password });
      if (!validated.success) {
        return res.status(400).json({ error: "Password is required" });
      }

      const { password } = validated.data;
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer, { 
          password: password,
          ignoreEncryption: false 
        });
      } catch (parseError) {
        if (parseError instanceof Error && (parseError.message.includes("password") || parseError.message.includes("encrypted"))) {
          return res.status(400).json({ error: "Invalid password" });
        }
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=unlocked.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Unlock error:", error);
      res.status(500).json({ error: "Failed to unlock PDF" });
    }
  });

  app.post("/api/rotate", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = rotationAngleSchema.safeParse(req.body.angle);
      if (!validated.success) {
        return res.status(400).json({ error: "Invalid rotation angle. Must be 90, 180, or 270" });
      }

      const angle = parseInt(validated.data, 10);
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pages = pdfDoc.getPages();

      pages.forEach(page => {
        page.setRotation(degrees(angle));
      });

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=rotated.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Rotate error:", error);
      res.status(500).json({ error: "Failed to rotate PDF" });
    }
  });

  app.post("/api/delete-pages", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let pagesToDelete;
      try {
        pagesToDelete = JSON.parse(req.body.pages);
      } catch (e) {
        return res.status(400).json({ error: "Invalid pages format. Expected JSON array." });
      }

      const validated = deletePageOptionsSchema.safeParse({ pagesToDelete });
      if (!validated.success) {
        return res.status(400).json({ error: "Pages to delete must be a non-empty array of positive integers" });
      }

      const { pagesToDelete: pages } = validated.data;
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const totalPages = pdfDoc.getPageCount();

      const validPages = pages
        .filter(p => p >= 1 && p <= totalPages)
        .sort((a, b) => b - a);

      if (validPages.length === 0) {
        return res.status(400).json({ error: "No valid pages to delete" });
      }

      for (const pageNum of validPages) {
        pdfDoc.removePage(pageNum - 1);
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Delete pages error:", error);
      res.status(500).json({ error: "Failed to delete pages" });
    }
  });

  app.post("/api/extract-text", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let data;
      try {
        data = await pdf(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      res.json({ text: data.text });
    } catch (error) {
      console.error("Extract text error:", error);
      res.status(500).json({ error: "Failed to extract text from PDF" });
    }
  });

  app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message || "Invalid file upload" });
    }
    next();
  });

  const httpServer = createServer(app);
  return httpServer;
}
