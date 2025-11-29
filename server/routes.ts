import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib-with-encrypt";
import sharp from "sharp";
import archiver from "archiver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { createRequire } from "module";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { 
  splitOptionsSchema, 
  rotationAngleSchema, 
  deletePageOptionsSchema, 
  compressionLevelSchema,
  protectPdfOptionsSchema,
  unlockPdfOptionsSchema,
  pageNumberOptionsSchema,
  watermarkOptionsSchema,
  reorderPagesOptionsSchema
} from "@shared/schema";
import { z } from "zod";
import CloudConvert from "cloudconvert";
import { Readable } from "stream";
import https from "https";
import http from "http";

const require = createRequire(import.meta.url);
const pdfConverter = require("pdf-img-convert");

let pdfParseModule: any = null;
async function getPdfParse() {
  if (!pdfParseModule) {
    const module = await import('pdf-parse');
    pdfParseModule = module.PDFParse;
  }
  return pdfParseModule;
}

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

const wordFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    cb(null, true);
  } else {
    cb(new Error("Only DOCX files are allowed"));
  }
};

const excelFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const validTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
  ];
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files (XLS/XLSX) are allowed"));
  }
};

const pngFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG files are allowed"));
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

const uploadWord = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: wordFileFilter
});

const uploadExcel = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: excelFileFilter
});

const uploadPng = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: pngFileFilter
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

      const pdfBytes = await mergedPdf.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Merge error:", error);
      res.status(500).json({ error: "Failed to merge PDFs" });
    }
  });

  const uploadAnyPdf = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: pdfFileFilter
  });

  app.post("/api/merge-enhanced", uploadAnyPdf.any(), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one PDF file is required" });
      }

      const pageSelectionStr = req.body.pageSelection;
      if (!pageSelectionStr) {
        return res.status(400).json({ error: "Page selection data is required" });
      }

      let pageSelection: Array<{ fileIndex: number; pageNumber: number }>;
      try {
        pageSelection = JSON.parse(pageSelectionStr);
      } catch {
        return res.status(400).json({ error: "Invalid page selection format" });
      }

      if (pageSelection.length === 0) {
        return res.status(400).json({ error: "At least one page must be selected" });
      }

      const fileMap = new Map<number, Express.Multer.File>();
      files.forEach((file) => {
        const match = file.fieldname.match(/file_(\d+)/);
        if (match) {
          const index = parseInt(match[1], 10);
          fileMap.set(index, file);
        }
      });

      for (const file of files) {
        if (!isPdfFile(file.buffer)) {
          return res.status(400).json({ error: "Invalid PDF file detected" });
        }
      }

      const pdfDocuments: PDFDocument[] = [];
      for (let i = 0; i < fileMap.size; i++) {
        const file = fileMap.get(i);
        if (!file) {
          return res.status(400).json({ error: `Missing file at index ${i}` });
        }
        try {
          const pdfDoc = await PDFDocument.load(file.buffer);
          pdfDocuments[i] = pdfDoc;
        } catch (parseError) {
          return res.status(400).json({ error: "Invalid or corrupted PDF file" });
        }
      }

      const mergedPdf = await PDFDocument.create();

      for (const { fileIndex, pageNumber } of pageSelection) {
        const sourcePdf = pdfDocuments[fileIndex];
        if (!sourcePdf) {
          return res.status(400).json({ error: `Invalid file index: ${fileIndex}` });
        }

        if (pageNumber < 1 || pageNumber > sourcePdf.getPageCount()) {
          return res.status(400).json({ 
            error: `Invalid page number ${pageNumber} for file ${fileIndex}` 
          });
        }

        const [copiedPage] = await mergedPdf.copyPages(sourcePdf, [pageNumber - 1]);
        mergedPdf.addPage(copiedPage);
      }

      const pdfBytes = await mergedPdf.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Enhanced merge error:", error);
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

      const pdfBytes = await newPdf.save({ useObjectStreams: false });
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
        useObjectStreams: false
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

      let imageArrays;
      try {
        imageArrays = await pdfConverter.convert(file.buffer, {
          width: 2000,
          height: 2000,
          page_numbers: [],
          base64: false,
        });
      } catch (parseError) {
        console.error("PDF parsing error in pdf-to-jpg:", parseError);
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      if (!imageArrays || imageArrays.length === 0) {
        return res.status(400).json({ error: "Could not extract images from PDF. The file may be empty or corrupted." });
      }

      if (imageArrays.length === 1) {
        const pngBuffer = Buffer.from(imageArrays[0]);
        const jpgBuffer = await sharp(pngBuffer)
          .jpeg({ quality: 90 })
          .toBuffer();
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Disposition", "attachment; filename=page-1.jpg");
        res.send(jpgBuffer);
      } else {
        const archive = archiver("zip", { zlib: { level: 9 } });
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename=pdf-images-${imageArrays.length}-pages.zip`);
        archive.pipe(res);

        for (let i = 0; i < imageArrays.length; i++) {
          const pngBuffer = Buffer.from(imageArrays[i]);
          const jpgBuffer = await sharp(pngBuffer)
            .jpeg({ quality: 90 })
            .toBuffer();
          archive.append(jpgBuffer, { name: `page-${i + 1}.jpg` });
        }

        await archive.finalize();
      }
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

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
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

      const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY;

      if (cloudConvertApiKey) {
        try {
          const cloudConvert = new CloudConvert(cloudConvertApiKey);

          const job = await cloudConvert.jobs.create({
            tasks: {
              'upload-pdf': {
                operation: 'import/upload'
              },
              'convert-to-docx': {
                operation: 'convert',
                input: 'upload-pdf',
                input_format: 'pdf',
                output_format: 'docx',
                engine: 'pdftron-pdf2word'
              },
              'export-result': {
                operation: 'export/url',
                input: 'convert-to-docx'
              }
            }
          });

          const uploadTask = job.tasks.find((t: any) => t.name === 'upload-pdf');
          if (!uploadTask) {
            throw new Error("Upload task not found");
          }

          await cloudConvert.tasks.upload(uploadTask, file.buffer, file.originalname || 'document.pdf');

          const completedJob = await cloudConvert.jobs.wait(job.id);

          const exportTask = completedJob.tasks.find((t: any) => t.name === 'export-result' && t.status === 'finished');
          if (!exportTask || !exportTask.result || !exportTask.result.files || !exportTask.result.files[0]) {
            throw new Error("CloudConvert conversion failed - no output file");
          }

          const outputUrl = exportTask.result.files[0].url as string;
          if (!outputUrl) {
            throw new Error("CloudConvert conversion failed - no download URL");
          }

          const docxBuffer = await new Promise<Buffer>((resolve, reject) => {
            const protocol = outputUrl.startsWith('https') ? https : http;
            protocol.get(outputUrl, (response) => {
              const chunks: Buffer[] = [];
              response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
              response.on('end', () => resolve(Buffer.concat(chunks)));
              response.on('error', reject);
            }).on('error', reject);
          });

          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
          res.setHeader("Content-Disposition", "attachment; filename=converted.docx");
          res.send(docxBuffer);
          return;
        } catch (cloudConvertError: any) {
          console.error("CloudConvert error:", cloudConvertError);
          console.log("Falling back to text-based conversion...");
        }
      } else {
        console.log("CloudConvert API key not configured, using text-based conversion");
      }

      let text = "";
      try {
        const PDFParse = await getPdfParse();
        const parser = new PDFParse({ data: file.buffer });
        const result = await parser.getText();
        text = result.text;
        await parser.destroy();
      } catch (parseError) {
        console.error("PDF parsing error in pdf-to-word:", parseError);
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const rawLines = text.split('\n');
      
      const commonAbbreviations = ['Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Sr', 'Jr', 'etc', 'e.g', 'i.e', 'vs', 'Inc', 'Ltd', 'Corp', 'Co', 'Ave', 'St', 'Rd', 'Blvd'];
      const abbreviationPattern = new RegExp(`\\b(${commonAbbreviations.join('|')})\\.\\s*$`, 'i');
      
      const mergedLines: string[] = [];
      for (let i = 0; i < rawLines.length; i++) {
        const currentLine = rawLines[i];
        const currentTrimmed = currentLine.trim();
        const endsWithHyphen = /[a-zA-Z]-\s*$/.test(currentTrimmed);
        const nextLine = i < rawLines.length - 1 ? rawLines[i + 1] : '';
        const nextTrimmed = nextLine.trim();
        const shouldMerge = endsWithHyphen && nextTrimmed && /^[a-z]/.test(nextTrimmed) && !nextTrimmed.match(/^[•\u2022\u2023\u25E6]/);
        
        if (shouldMerge) {
          const currentIndent = currentLine.length - currentLine.trimStart().length;
          const dehyphenated = currentTrimmed.replace(/-\s*$/, '');
          const mergedText = dehyphenated + nextTrimmed;
          const mergedLine = ' '.repeat(currentIndent) + mergedText;
          mergedLines.push(mergedLine);
          i++;
        } else {
          mergedLines.push(currentLine);
        }
      }
      
      const linesWithIndent = mergedLines.map(raw => ({
        raw,
        trimmed: raw.trim(),
        indent: raw.length - raw.trimStart().length,
        isBlank: raw.trim().length === 0
      }));

      const paragraphs: Paragraph[] = [];
      let currentParagraph: string[] = [];

      for (let i = 0; i < linesWithIndent.length; i++) {
        const { raw, trimmed, indent, isBlank } = linesWithIndent[i];
        const nextLine = linesWithIndent[i + 1];
        const prevLine = linesWithIndent[i - 1];

        if (isBlank) {
          if (currentParagraph.length > 0) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
              spacing: { after: 220 }
            }));
            currentParagraph = [];
          }
          continue;
        }

        const isPageNumber = /^[\divxlc]+$|^Page\s+\d+/i.test(trimmed) && trimmed.length < 15;
        const isFooterHeader = trimmed.length < 40 && (/^\d{1,2}\/\d{1,2}\/\d{2,4}|©|\(c\)|copyright/i.test(trimmed));
        const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 5 && /[A-Z]/.test(trimmed);
        const isBullet = /^[\u2022\u2023\u25E6\u2043\u2219\u25AA\u25AB\u25CF\u25CB\u25A0\u25A1\u2605\u2606\u27A2\u2794\u25B8\u25B9\u25BA\u25BB•·‣⁃➢➣➤►▸▹●○■□★☆➢➤▪▫◦‧⦿⦾-]\s|^[a-z]\)|\d+[\.)]\s/i.test(trimmed);
        const endsWithSentence = /[.!?:;]$/.test(trimmed);
        const endsWithAbbreviation = abbreviationPattern.test(trimmed);
        const endsWithPeriod = endsWithSentence && !endsWithAbbreviation;
        const isShortLine = trimmed.length < 70;
        const isProbablyTitle = isShortLine && !endsWithPeriod && !isBullet && trimmed.length > 3;

        if (isPageNumber || isFooterHeader) {
          continue;
        }

        const hasTableSpacing = /\S+\s{4,}\S+/.test(trimmed);
        if (hasTableSpacing) {
          const parts = trimmed.split(/\s{4,}/);
          if (parts.length >= 2 && parts.every(p => p.length > 0 && p.length < 50)) {
            if (currentParagraph.length > 0) {
              paragraphs.push(new Paragraph({
                children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
                spacing: { after: 200 }
              }));
              currentParagraph = [];
            }
            
            const tableRow = parts.map(cell => new TextRun({ text: cell + '    ', size: 22 }));
            paragraphs.push(new Paragraph({
              children: tableRow,
              spacing: { after: 120 },
              indent: { left: 240 }
            }));
            continue;
          }
        }

        if (isAllCaps) {
          if (currentParagraph.length > 0) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
              spacing: { after: 200 }
            }));
            currentParagraph = [];
          }
          
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: trimmed, bold: true, size: 32 })],
            spacing: { before: 300, after: 180 },
            heading: 1 as any
          }));
          continue;
        }

        if (isProbablyTitle && (!prevLine || prevLine.isBlank)) {
          if (currentParagraph.length > 0) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
              spacing: { after: 200 }
            }));
            currentParagraph = [];
          }
          
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: trimmed, bold: true, size: 28 })],
            spacing: { before: 240, after: 140 },
            heading: 2 as any
          }));
          continue;
        }

        if (isBullet) {
          if (currentParagraph.length > 0) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
              spacing: { after: 200 }
            }));
            currentParagraph = [];
          }

          const indentLevel = indent > 2 ? 720 : 360;
          const bulletLevel = indent > 2 ? 1 : 0;
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: trimmed, size: 22 })],
            spacing: { after: 100 },
            indent: { left: indentLevel },
            bullet: { level: bulletLevel }
          }));
          continue;
        }

        if (isProbablyTitle && nextLine && !nextLine.isBlank && !endsWithPeriod) {
          if (currentParagraph.length > 0) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
              spacing: { after: 200 }
            }));
            currentParagraph = [];
          }
          
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: trimmed, bold: true, size: 24 })],
            spacing: { before: 200, after: 120 }
          }));
          continue;
        }

        currentParagraph.push(trimmed);

        const nextIsDifferentType = !nextLine || nextLine.isBlank || isProbablyTitle || isAllCaps || isBullet;
        if (endsWithPeriod && nextIsDifferentType) {
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
            spacing: { after: 220 }
          }));
          currentParagraph = [];
        }
      }

      if (currentParagraph.length > 0) {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: currentParagraph.join(' '), size: 22 })],
          spacing: { after: 220 }
        }));
      }

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
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

  app.post("/api/word-to-pdf", uploadWord.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Word file is required" });
      }

      if (file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return res.status(400).json({ error: "Only DOCX files are supported" });
      }

      let result;
      try {
        result = await mammoth.extractRawText({ buffer: file.buffer });
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted Word file" });
      }

      const text = result.value.trim();
      if (!text) {
        return res.status(400).json({ error: "No text could be extracted from the Word document" });
      }

      const pdfDoc = await PDFDocument.create();
      const paragraphs = text.split("\n\n").filter(p => p.trim());
      
      const fontSize = 12;
      const lineHeight = fontSize * 1.2;
      const margin = 72;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const maxWidth = pageWidth - 2 * margin;
      
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let yPosition = pageHeight - margin;

      for (const paragraph of paragraphs) {
        const lines = paragraph.split("\n").filter(l => l.trim());
        
        for (const line of lines) {
          const words = line.trim().split(" ");
          let currentLine = "";
          
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const textWidth = testLine.length * (fontSize * 0.5);
            
            if (textWidth > maxWidth && currentLine) {
              if (yPosition < margin + lineHeight) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                yPosition = pageHeight - margin;
              }
              
              currentPage.drawText(currentLine, {
                x: margin,
                y: yPosition,
                size: fontSize,
                color: rgb(0, 0, 0),
              });
              yPosition -= lineHeight;
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          
          if (currentLine) {
            if (yPosition < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
            
            currentPage.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
            yPosition -= lineHeight;
          }
        }
        
        yPosition -= lineHeight * 0.5;
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Word to PDF error:", error);
      res.status(500).json({ error: "Failed to convert Word to PDF" });
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

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
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

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
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

      let text = "";
      try {
        const PDFParse = await getPdfParse();
        const parser = new PDFParse({ data: file.buffer });
        const result = await parser.getText();
        text = result.text;
        await parser.destroy();
      } catch (parseError) {
        console.error("Extract text parsing error:", parseError);
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      res.json({ text });
    } catch (error) {
      console.error("Extract text error:", error);
      res.status(500).json({ error: "Failed to extract text from PDF" });
    }
  });

  app.post("/api/protect-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = protectPdfOptionsSchema.safeParse({
        userPassword: req.body.userPassword,
        ownerPassword: req.body.ownerPassword || req.body.userPassword,
      });
      
      if (!validated.success) {
        return res.status(400).json({ error: "Password is required" });
      }

      const { userPassword, ownerPassword } = validated.data;

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        userPassword: userPassword,
        ownerPassword: ownerPassword || userPassword,
        permissions: {
          printing: 'lowResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false,
        },
      } as any);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=protected.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Protect PDF error:", error);
      res.status(500).json({ error: "Failed to protect PDF" });
    }
  });

  app.post("/api/unlock-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const validated = unlockPdfOptionsSchema.safeParse({
        password: req.body.password,
      });
      
      if (!validated.success) {
        return res.status(400).json({ error: "Password is required" });
      }

      const { password } = validated.data;

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer, { password });
      } catch (parseError: any) {
        if (parseError.message?.includes('password') || parseError.message?.includes('encrypted')) {
          return res.status(400).json({ error: "Incorrect password or unable to decrypt PDF" });
        }
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=unlocked.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Unlock PDF error:", error);
      res.status(500).json({ error: "Failed to unlock PDF" });
    }
  });

  app.post("/api/add-page-numbers", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const startNumParsed = parseInt(req.body.startNumber);
      const fontSizeParsed = parseInt(req.body.fontSize);
      
      const validated = pageNumberOptionsSchema.safeParse({
        position: req.body.position || "bottom-center",
        startNumber: isNaN(startNumParsed) ? 1 : startNumParsed,
        fontSize: isNaN(fontSizeParsed) ? 12 : fontSizeParsed,
      });
      
      if (!validated.success) {
        return res.status(400).json({ error: "Invalid options provided" });
      }

      const { position, startNumber, fontSize } = validated.data;

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont('Helvetica' as any);

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = `${startNumber + index}`;
        const textWidth = font.widthOfTextAtSize(pageNumber, fontSize);
        
        let x: number, y: number;
        const margin = 40;
        
        switch (position) {
          case "top-left":
            x = margin;
            y = height - margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin;
            break;
          case "top-right":
            x = width - textWidth - margin;
            y = height - margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - textWidth - margin;
            y = margin;
            break;
          default:
            x = (width - textWidth) / 2;
            y = margin;
        }

        page.drawText(pageNumber, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=numbered.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Add page numbers error:", error);
      res.status(500).json({ error: "Failed to add page numbers" });
    }
  });

  app.post("/api/add-watermark", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const opacityParsed = parseFloat(req.body.opacity);
      const fontSizeParsed = parseInt(req.body.fontSize);
      const rotationParsed = parseInt(req.body.rotation);
      
      const validated = watermarkOptionsSchema.safeParse({
        text: req.body.text,
        opacity: isNaN(opacityParsed) ? 0.3 : opacityParsed,
        fontSize: isNaN(fontSizeParsed) ? 48 : fontSizeParsed,
        rotation: isNaN(rotationParsed) ? -45 : rotationParsed,
      });
      
      if (!validated.success) {
        return res.status(400).json({ error: "Watermark text is required" });
      }

      const { text, opacity, fontSize, rotation } = validated.data;

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont('Helvetica' as any);

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.7, 0.7, 0.7),
          opacity: opacity,
          rotate: degrees(rotation),
        });
      });

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=watermarked.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Add watermark error:", error);
      res.status(500).json({ error: "Failed to add watermark" });
    }
  });

  app.post("/api/pdf-info", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pageCount = pdfDoc.getPageCount();
      res.json({ pageCount });
    } catch (error) {
      console.error("PDF info error:", error);
      res.status(500).json({ error: "Failed to get PDF info" });
    }
  });

  app.post("/api/reorder-pages", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      let pageOrder;
      try {
        pageOrder = JSON.parse(req.body.pageOrder);
      } catch (e) {
        return res.status(400).json({ error: "Invalid page order format. Expected JSON array." });
      }

      const validated = reorderPagesOptionsSchema.safeParse({ pageOrder });
      
      if (!validated.success) {
        return res.status(400).json({ error: "Page order must be an array of positive integers" });
      }

      const { pageOrder: order } = validated.data;

      let sourcePdf;
      try {
        sourcePdf = await PDFDocument.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const totalPages = sourcePdf.getPageCount();
      
      const validOrder = order.filter(p => p >= 1 && p <= totalPages);
      if (validOrder.length === 0) {
        return res.status(400).json({ error: "No valid page numbers provided" });
      }

      if (validOrder.length !== totalPages) {
        return res.status(400).json({ 
          error: `Page order must include all ${totalPages} pages. Received ${validOrder.length} valid page references.` 
        });
      }

      const uniquePages = new Set(validOrder);
      if (uniquePages.size !== validOrder.length) {
        return res.status(400).json({ error: "Duplicate page numbers are not allowed in reordering" });
      }

      const newPdf = await PDFDocument.create();
      
      for (const pageNum of validOrder) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=reordered.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Reorder pages error:", error);
      res.status(500).json({ error: "Failed to reorder pages" });
    }
  });

  // PDF to PNG - Convert PDF pages to PNG images
  app.post("/api/pdf-to-png", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const outputImages = await pdfConverter.convert(file.buffer, {
        width: 2048,
        height: 2048,
        page_numbers: null,
        base64: false
      });

      if (outputImages.length === 1) {
        const pngBuffer = await sharp(Buffer.from(outputImages[0]))
          .png({ quality: 100 })
          .toBuffer();

        res.setHeader("Content-Type", "image/png");
        res.setHeader("Content-Disposition", "attachment; filename=page.png");
        res.send(pngBuffer);
      } else {
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=images.zip");

        const archive = archiver("zip", { zlib: { level: 6 } });
        archive.pipe(res);

        for (let i = 0; i < outputImages.length; i++) {
          const pngBuffer = await sharp(Buffer.from(outputImages[i]))
            .png({ quality: 100 })
            .toBuffer();
          archive.append(pngBuffer, { name: `page-${i + 1}.png` });
        }

        await archive.finalize();
      }
    } catch (error) {
      console.error("PDF to PNG error:", error);
      res.status(500).json({ error: "Failed to convert PDF to PNG" });
    }
  });

  // PNG to PDF - Convert PNG images to PDF
  app.post("/api/png-to-pdf", uploadPng.array("files", 20), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No PNG files provided" });
      }

      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const pngImage = await pdfDoc.embedPng(file.buffer);
        const { width, height } = pngImage.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("PNG to PDF error:", error);
      res.status(500).json({ error: "Failed to convert PNG to PDF" });
    }
  });

  // PDF to Excel - Extract tables from PDF to Excel format
  app.post("/api/pdf-to-excel", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const pdfParse = await getPdfParse();
      let textContent = "";
      
      try {
        const data = await pdfParse(file.buffer);
        textContent = data.text || "";
      } catch (parseError) {
        return res.status(400).json({ error: "Failed to parse PDF content" });
      }

      const lines = textContent.split("\n").filter(line => line.trim());
      const rows: string[][] = [];
      
      for (const line of lines) {
        const cells = line.split(/\t|  +/).map(cell => cell.trim()).filter(cell => cell);
        if (cells.length > 0) {
          rows.push(cells);
        }
      }

      if (rows.length === 0) {
        rows.push(["No tabular data found in PDF"]);
      }

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
      const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=converted.xlsx");
      res.send(Buffer.from(excelBuffer));
    } catch (error) {
      console.error("PDF to Excel error:", error);
      res.status(500).json({ error: "Failed to convert PDF to Excel" });
    }
  });

  // Excel to PDF - Convert Excel spreadsheet to PDF
  app.post("/api/excel-to-pdf", uploadExcel.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No Excel file provided" });
      }

      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const data: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pageWidth = 842;
      const pageHeight = 595;
      const margin = 50;
      const cellPadding = 5;
      const fontSize = 9;
      const headerFontSize = 10;
      const lineHeight = 20;
      
      let currentY = pageHeight - margin;
      let page = pdfDoc.addPage([pageWidth, pageHeight]);

      const maxCols = Math.max(...data.map(row => row.length), 1);
      const colWidth = (pageWidth - 2 * margin) / maxCols;

      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        
        if (currentY < margin + lineHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          currentY = pageHeight - margin;
        }

        const isHeader = rowIndex === 0;
        const currentFont = isHeader ? boldFont : font;
        const currentFontSize = isHeader ? headerFontSize : fontSize;

        for (let colIndex = 0; colIndex < maxCols; colIndex++) {
          const cellValue = row[colIndex] !== undefined ? String(row[colIndex]) : "";
          const x = margin + colIndex * colWidth + cellPadding;
          
          const maxChars = Math.floor((colWidth - 2 * cellPadding) / (currentFontSize * 0.5));
          const truncatedValue = cellValue.length > maxChars 
            ? cellValue.substring(0, maxChars - 2) + ".." 
            : cellValue;

          page.drawText(truncatedValue, {
            x,
            y: currentY,
            size: currentFontSize,
            font: currentFont,
            color: rgb(0, 0, 0),
          });

          page.drawLine({
            start: { x: margin + colIndex * colWidth, y: currentY - 5 },
            end: { x: margin + (colIndex + 1) * colWidth, y: currentY - 5 },
            thickness: 0.5,
            color: rgb(0.8, 0.8, 0.8),
          });
        }

        currentY -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Excel to PDF error:", error);
      res.status(500).json({ error: "Failed to convert Excel to PDF" });
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
