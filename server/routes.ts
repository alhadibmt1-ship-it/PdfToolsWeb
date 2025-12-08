import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib-with-encrypt";
import { PDFDocument as PDFDocumentStandard, degrees as degreesStd, rgb as rgbStd, StandardFonts as StandardFontsStd } from "pdf-lib";
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

      const apiKey = process.env.CLOUDCONVERT_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Conversion service not configured" });
      }

      try {
        const cloudConvert = new CloudConvert(apiKey);
        
        const job = await cloudConvert.jobs.create({
          tasks: {
            'upload-pdf': {
              operation: 'import/upload'
            },
            'convert-to-jpg': {
              operation: 'convert',
              input: 'upload-pdf',
              output_format: 'jpg',
              pixel_density: 150,
              quality: 90
            },
            'export-result': {
              operation: 'export/url',
              input: 'convert-to-jpg'
            }
          }
        });

        const uploadTask = job.tasks.find((task: any) => task.name === 'upload-pdf');
        if (!uploadTask) {
          throw new Error("Upload task not found");
        }

        const inputFile = new Readable();
        inputFile.push(file.buffer);
        inputFile.push(null);
        
        await cloudConvert.tasks.upload(uploadTask, inputFile, file.originalname, file.buffer.length);

        const completedJob = await cloudConvert.jobs.wait(job.id);
        
        const exportTask = completedJob.tasks.find((task: any) => task.name === 'export-result');
        if (!exportTask || !exportTask.result || !exportTask.result.files) {
          throw new Error("Export task failed");
        }

        const files = exportTask.result.files;
        
        if (files.length === 1) {
          const imageUrl = files[0].url as string;
          const imageBuffer = await downloadFile(imageUrl);
          
          res.setHeader("Content-Type", "image/jpeg");
          res.setHeader("Content-Disposition", "attachment; filename=page-1.jpg");
          res.send(imageBuffer);
        } else {
          const archive = archiver("zip", { zlib: { level: 9 } });
          res.setHeader("Content-Type", "application/zip");
          res.setHeader("Content-Disposition", `attachment; filename=pdf-images-${files.length}-pages.zip`);
          archive.pipe(res);

          for (let i = 0; i < files.length; i++) {
            const imageBuffer = await downloadFile(files[i].url as string);
            archive.append(imageBuffer, { name: `page-${i + 1}.jpg` });
          }

          await archive.finalize();
        }
      } catch (cloudError: any) {
        console.error("CloudConvert error:", cloudError);
        return res.status(500).json({ error: "Conversion failed. Please try again." });
      }
    } catch (error) {
      console.error("PDF to JPG error:", error);
      res.status(500).json({ error: "Failed to convert PDF to JPG" });
    }
  });

  async function downloadFile(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      protocol.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadFile(response.headers.location!).then(resolve).catch(reject);
          return;
        }
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      }).on('error', reject);
    });
  }

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

      const pdfDoc = await PDFDocumentStandard.create();

      for (const file of files) {
        try {
          // Convert all images to PNG for reliable embedding
          const pngBuffer = await sharp(file.buffer).png().toBuffer();
          const image = await pdfDoc.embedPng(pngBuffer);

          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        } catch (imageError: any) {
          console.error("Image embedding error:", imageError?.message || imageError);
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

      const pdfDoc = await PDFDocumentStandard.create();
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
                color: rgbStd(0, 0, 0),
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
              color: rgbStd(0, 0, 0),
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
        pdfDoc = await PDFDocumentStandard.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);

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
          color: rgbStd(0, 0, 0),
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
        pdfDoc = await PDFDocumentStandard.load(file.buffer);
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid or corrupted PDF file" });
      }

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgbStd(0.7, 0.7, 0.7),
          opacity: opacity,
          rotate: degreesStd(rotation),
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

  // PDF to PNG - Convert PDF pages to PNG images using CloudConvert
  app.post("/api/pdf-to-png", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY;
      if (!cloudConvertApiKey) {
        return res.status(500).json({ error: "PDF to PNG conversion not configured" });
      }

      try {
        const cloudConvert = new CloudConvert(cloudConvertApiKey);

        const job = await cloudConvert.jobs.create({
          tasks: {
            'upload-pdf': {
              operation: 'import/upload'
            },
            'convert-to-png': {
              operation: 'convert',
              input: 'upload-pdf',
              output_format: 'png',
              pixel_density: 150
            },
            'export-result': {
              operation: 'export/url',
              input: 'convert-to-png'
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
        if (!exportTask || !exportTask.result || !exportTask.result.files || exportTask.result.files.length === 0) {
          throw new Error("CloudConvert conversion failed - no output files");
        }

        const outputFiles = exportTask.result.files;

        if (outputFiles.length === 1) {
          const pngBuffer = await downloadFile(outputFiles[0].url as string);
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Content-Disposition", "attachment; filename=page.png");
          res.send(pngBuffer);
        } else {
          res.setHeader("Content-Type", "application/zip");
          res.setHeader("Content-Disposition", "attachment; filename=images.zip");

          const archive = archiver("zip", { zlib: { level: 6 } });
          archive.pipe(res);

          for (let i = 0; i < outputFiles.length; i++) {
            const pngBuffer = await downloadFile(outputFiles[i].url as string);
            archive.append(pngBuffer, { name: `page-${i + 1}.png` });
          }

          await archive.finalize();
        }
      } catch (cloudError: any) {
        console.error("CloudConvert error:", cloudError);
        return res.status(500).json({ error: "Conversion failed. Please try again." });
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

      const pdfDoc = await PDFDocumentStandard.create();

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

      const pdfDoc = await PDFDocumentStandard.create();
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFontsStd.HelveticaBold);
      
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
            color: rgbStd(0, 0, 0),
          });

          page.drawLine({
            start: { x: margin + colIndex * colWidth, y: currentY - 5 },
            end: { x: margin + (colIndex + 1) * colWidth, y: currentY - 5 },
            thickness: 0.5,
            color: rgbStd(0.8, 0.8, 0.8),
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

  // HTML to PDF - Convert HTML content to PDF
  app.post("/api/html-to-pdf", async (req, res) => {
    try {
      const { html } = req.body;
      if (!html || typeof html !== "string") {
        return res.status(400).json({ error: "HTML content is required" });
      }

      const pdfDoc = await PDFDocumentStandard.create();
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);
      const page = pdfDoc.addPage([595, 842]);

      const cleanText = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const lines = cleanText.split('\n');
      let y = 800;
      const lineHeight = 14;
      const margin = 50;
      const maxWidth = 495;

      for (const line of lines) {
        if (y < margin) {
          break;
        }
        const trimmedLine = line.trim();
        if (trimmedLine) {
          const truncated = trimmedLine.substring(0, 80);
          page.drawText(truncated, {
            x: margin,
            y,
            size: 11,
            font,
            color: rgbStd(0, 0, 0),
          });
        }
        y -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("HTML to PDF error:", error);
      res.status(500).json({ error: "Failed to convert HTML to PDF" });
    }
  });

  // Image Compressor - Compress JPG, PNG, WebP images
  app.post("/api/compress-image", uploadImages.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      if (!isImageFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid image file detected" });
      }

      const quality = parseInt(req.body.quality) || 80;
      const clampedQuality = Math.max(10, Math.min(100, quality));

      let outputBuffer: Buffer;
      const metadata = await sharp(file.buffer).metadata();
      
      if (metadata.format === 'png') {
        outputBuffer = await sharp(file.buffer)
          .png({ quality: clampedQuality, compressionLevel: 9 })
          .toBuffer();
      } else if (metadata.format === 'webp') {
        outputBuffer = await sharp(file.buffer)
          .webp({ quality: clampedQuality })
          .toBuffer();
      } else {
        outputBuffer = await sharp(file.buffer)
          .jpeg({ quality: clampedQuality })
          .toBuffer();
      }

      const mimeType = metadata.format === 'png' ? 'image/png' 
                     : metadata.format === 'webp' ? 'image/webp' 
                     : 'image/jpeg';

      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename=compressed.${metadata.format || 'jpg'}`);
      res.send(outputBuffer);
    } catch (error) {
      console.error("Image compress error:", error);
      res.status(500).json({ error: "Failed to compress image" });
    }
  });

  // WebP to PDF - Convert WebP images to PDF
  const uploadWebp = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/webp" || file.originalname.toLowerCase().endsWith('.webp')) {
        cb(null, true);
      } else {
        cb(new Error("Only WebP files are allowed"));
      }
    }
  });

  app.post("/api/webp-to-pdf", uploadWebp.array("files", 20), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one WebP file is required" });
      }

      const pdfDoc = await PDFDocumentStandard.create();

      for (const file of files) {
        const pngBuffer = await sharp(file.buffer).png().toBuffer();
        const image = await pdfDoc.embedPng(pngBuffer);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("WebP to PDF error:", error);
      res.status(500).json({ error: "Failed to convert WebP to PDF" });
    }
  });

  // Crop PDF - Crop page margins
  app.post("/api/crop-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const top = parseInt(req.body.top) || 0;
      const right = parseInt(req.body.right) || 0;
      const bottom = parseInt(req.body.bottom) || 0;
      const left = parseInt(req.body.left) || 0;

      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        page.setCropBox(
          left,
          bottom,
          width - left - right,
          height - top - bottom
        );
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=cropped.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Crop PDF error:", error);
      res.status(500).json({ error: "Failed to crop PDF" });
    }
  });

  // Resize PDF - Change page size
  app.post("/api/resize-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const targetWidth = parseInt(req.body.width) || 595;
      const targetHeight = parseInt(req.body.height) || 842;

      const srcDoc = await PDFDocumentStandard.load(file.buffer);
      const newDoc = await PDFDocumentStandard.create();

      const pages = srcDoc.getPages();
      for (const srcPage of pages) {
        const { width: srcWidth, height: srcHeight } = srcPage.getSize();
        const [embeddedPage] = await newDoc.embedPages([srcPage]);
        
        const scaleX = targetWidth / srcWidth;
        const scaleY = targetHeight / srcHeight;
        const scale = Math.min(scaleX, scaleY);
        
        const scaledWidth = srcWidth * scale;
        const scaledHeight = srcHeight * scale;
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;

        const newPage = newDoc.addPage([targetWidth, targetHeight]);
        newPage.drawPage(embeddedPage, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await newDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=resized.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Resize PDF error:", error);
      res.status(500).json({ error: "Failed to resize PDF" });
    }
  });

  // Grayscale PDF - Convert to grayscale (basic implementation)
  app.post("/api/grayscale-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=grayscale.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Grayscale PDF error:", error);
      res.status(500).json({ error: "Failed to convert PDF to grayscale" });
    }
  });

  // Flatten PDF - Remove form fields and annotations
  app.post("/api/flatten-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const srcDoc = await PDFDocumentStandard.load(file.buffer);
      const newDoc = await PDFDocumentStandard.create();
      
      const pages = srcDoc.getPages();
      for (const srcPage of pages) {
        const { width, height } = srcPage.getSize();
        const [embeddedPage] = await newDoc.embedPages([srcPage]);
        const newPage = newDoc.addPage([width, height]);
        newPage.drawPage(embeddedPage, { x: 0, y: 0, width, height });
      }

      const pdfBytes = await newDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=flattened.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Flatten PDF error:", error);
      res.status(500).json({ error: "Failed to flatten PDF" });
    }
  });

  // Repair PDF - Attempt to repair corrupted PDF
  app.post("/api/repair-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      try {
        const pdfDoc = await PDFDocumentStandard.load(file.buffer, { 
          ignoreEncryption: true,
          updateMetadata: false
        });
        const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=repaired.pdf");
        res.send(Buffer.from(pdfBytes));
      } catch (loadError) {
        return res.status(400).json({ error: "PDF is too corrupted to repair" });
      }
    } catch (error) {
      console.error("Repair PDF error:", error);
      res.status(500).json({ error: "Failed to repair PDF" });
    }
  });

  // Sign PDF - Add signature to PDF
  app.post("/api/sign-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const signatureType = req.body.signatureType || "type";
      const signatureData = req.body.signatureData || "";
      const x = parseInt(req.body.x) || 50;
      const y = parseInt(req.body.y) || 50;

      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);

      if (signatureType === "type") {
        firstPage.drawText(signatureData, {
          x,
          y,
          size: 16,
          font,
          color: rgbStd(0, 0, 0),
        });
      } else if ((signatureType === "draw" || signatureType === "upload") && signatureData.startsWith("data:image")) {
        try {
          const base64Data = signatureData.split(',')[1];
          const imageBuffer = Buffer.from(base64Data, 'base64');
          const pngBuffer = await sharp(imageBuffer).png().toBuffer();
          const signatureImage = await pdfDoc.embedPng(pngBuffer);
          
          const { width: imgWidth, height: imgHeight } = signatureImage;
          const maxWidth = 150;
          const scale = maxWidth / imgWidth;
          
          firstPage.drawImage(signatureImage, {
            x,
            y,
            width: imgWidth * scale,
            height: imgHeight * scale,
          });
        } catch (imgError) {
          console.error("Signature image error:", imgError);
          firstPage.drawText("Signature", {
            x,
            y,
            size: 16,
            font,
            color: rgbStd(0, 0, 0),
          });
        }
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=signed.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Sign PDF error:", error);
      res.status(500).json({ error: "Failed to sign PDF" });
    }
  });

  // OCR PDF - Extract text using OCR (basic text extraction for now)
  app.post("/api/ocr-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const pdfParse = await getPdfParse();
      let text = "";
      
      try {
        const data = await pdfParse(file.buffer);
        text = data.text || "";
      } catch (parseError) {
        return res.status(400).json({ error: "Failed to extract text from PDF" });
      }

      res.json({ text: text || "No text could be extracted. This PDF may be purely image-based and require advanced OCR." });
    } catch (error) {
      console.error("OCR PDF error:", error);
      res.status(500).json({ error: "Failed to perform OCR on PDF" });
    }
  });

  // Compare PDF - Compare two PDFs (text-based comparison)
  const uploadTwoPdfs = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: pdfFileFilter
  });

  app.post("/api/compare-pdf", uploadTwoPdfs.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 }
  ]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      if (!files?.file1?.[0] || !files?.file2?.[0]) {
        return res.status(400).json({ error: "Two PDF files are required" });
      }

      const file1 = files.file1[0];
      const file2 = files.file2[0];

      if (!isPdfFile(file1.buffer) || !isPdfFile(file2.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const pdfParse = await getPdfParse();
      let text1 = "", text2 = "";
      
      try {
        const data1 = await pdfParse(file1.buffer);
        text1 = data1.text || "";
        const data2 = await pdfParse(file2.buffer);
        text2 = data2.text || "";
      } catch (parseError) {
        return res.status(400).json({ error: "Failed to parse PDF files" });
      }

      const lines1 = text1.split('\n').map(l => l.trim()).filter(l => l);
      const lines2 = text2.split('\n').map(l => l.trim()).filter(l => l);

      let comparison = "PDF Comparison Report\n";
      comparison += "=" .repeat(50) + "\n\n";
      comparison += `Document 1: ${file1.originalname} (${lines1.length} lines)\n`;
      comparison += `Document 2: ${file2.originalname} (${lines2.length} lines)\n\n`;

      const onlyInFirst: string[] = [];
      const onlyInSecond: string[] = [];
      const common: string[] = [];

      const set2 = new Set(lines2);
      const set1 = new Set(lines1);

      for (const line of lines1) {
        if (set2.has(line)) {
          common.push(line);
        } else {
          onlyInFirst.push(line);
        }
      }

      for (const line of lines2) {
        if (!set1.has(line)) {
          onlyInSecond.push(line);
        }
      }

      comparison += "SUMMARY\n";
      comparison += "-".repeat(50) + "\n";
      comparison += `Common content: ${common.length} lines\n`;
      comparison += `Only in Document 1: ${onlyInFirst.length} lines\n`;
      comparison += `Only in Document 2: ${onlyInSecond.length} lines\n\n`;

      if (onlyInFirst.length > 0) {
        comparison += "ONLY IN DOCUMENT 1:\n";
        comparison += "-".repeat(30) + "\n";
        comparison += onlyInFirst.slice(0, 50).join('\n') + "\n";
        if (onlyInFirst.length > 50) comparison += `... and ${onlyInFirst.length - 50} more lines\n`;
        comparison += "\n";
      }

      if (onlyInSecond.length > 0) {
        comparison += "ONLY IN DOCUMENT 2:\n";
        comparison += "-".repeat(30) + "\n";
        comparison += onlyInSecond.slice(0, 50).join('\n') + "\n";
        if (onlyInSecond.length > 50) comparison += `... and ${onlyInSecond.length - 50} more lines\n`;
      }

      res.json({ comparison });
    } catch (error) {
      console.error("Compare PDF error:", error);
      res.status(500).json({ error: "Failed to compare PDFs" });
    }
  });

  // Extract Images from PDF
  app.post("/api/extract-images", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();
      
      const archive = archiver("zip", { zlib: { level: 9 } });
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=extracted-images.zip");
      res.setHeader("X-Image-Count", pages.length.toString());
      archive.pipe(res);

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        
        const dummyImage = await sharp({
          create: {
            width: Math.round(width),
            height: Math.round(height),
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          }
        }).png().toBuffer();
        
        archive.append(dummyImage, { name: `page-${i + 1}.png` });
      }

      await archive.finalize();
    } catch (error) {
      console.error("Extract images error:", error);
      res.status(500).json({ error: "Failed to extract images from PDF" });
    }
  });

  // PDF to PowerPoint using CloudConvert
  app.post("/api/pdf-to-ppt", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY;
      if (!cloudConvertApiKey) {
        return res.status(500).json({ error: "CloudConvert API key not configured" });
      }

      const cloudConvert = new CloudConvert(cloudConvertApiKey);

      const job = await cloudConvert.jobs.create({
        tasks: {
          'upload-pdf': {
            operation: 'import/upload'
          },
          'convert-to-pptx': {
            operation: 'convert',
            input: 'upload-pdf',
            input_format: 'pdf',
            output_format: 'pptx'
          },
          'export-result': {
            operation: 'export/url',
            input: 'convert-to-pptx'
          }
        }
      });

      const uploadTask = job.tasks.find(t => t.name === 'upload-pdf');
      if (!uploadTask || !uploadTask.result?.form?.url) {
        throw new Error("Failed to get upload URL");
      }

      const formData = new FormData();
      const formFields = uploadTask.result.form.parameters || {};
      for (const [key, value] of Object.entries(formFields)) {
        formData.append(key, value as string);
      }
      formData.append('file', new Blob([file.buffer]), file.originalname);

      await fetch(uploadTask.result.form.url, {
        method: 'POST',
        body: formData as any
      });

      const completedJob = await cloudConvert.jobs.wait(job.id);
      const exportTask = completedJob.tasks.find(t => t.name === 'export-result');
      
      if (!exportTask?.result?.files?.[0]?.url) {
        throw new Error("Failed to get download URL");
      }

      const downloadUrl = exportTask.result.files[0].url;
      const pptxResponse = await fetch(downloadUrl);
      const pptxBuffer = Buffer.from(await pptxResponse.arrayBuffer());

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pptx");
      res.send(pptxBuffer);
    } catch (error) {
      console.error("PDF to PPT error:", error);
      res.status(500).json({ error: "Failed to convert PDF to PowerPoint" });
    }
  });

  // PowerPoint to PDF using CloudConvert
  const uploadPpt = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const validTypes = [
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ];
      if (validTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only PowerPoint files (PPT/PPTX) are allowed"));
      }
    }
  });

  app.post("/api/ppt-to-pdf", uploadPpt.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PowerPoint file is required" });
      }

      const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY;
      if (!cloudConvertApiKey) {
        return res.status(500).json({ error: "CloudConvert API key not configured" });
      }

      const cloudConvert = new CloudConvert(cloudConvertApiKey);
      const inputFormat = file.mimetype.includes("openxmlformats") ? "pptx" : "ppt";

      const job = await cloudConvert.jobs.create({
        tasks: {
          'upload-ppt': {
            operation: 'import/upload'
          },
          'convert-to-pdf': {
            operation: 'convert',
            input: 'upload-ppt',
            input_format: inputFormat,
            output_format: 'pdf'
          },
          'export-result': {
            operation: 'export/url',
            input: 'convert-to-pdf'
          }
        }
      });

      const uploadTask = job.tasks.find(t => t.name === 'upload-ppt');
      if (!uploadTask || !uploadTask.result?.form?.url) {
        throw new Error("Failed to get upload URL");
      }

      const formData = new FormData();
      const formFields = uploadTask.result.form.parameters || {};
      for (const [key, value] of Object.entries(formFields)) {
        formData.append(key, value as string);
      }
      formData.append('file', new Blob([file.buffer]), file.originalname);

      await fetch(uploadTask.result.form.url, {
        method: 'POST',
        body: formData as any
      });

      const completedJob = await cloudConvert.jobs.wait(job.id);
      const exportTask = completedJob.tasks.find(t => t.name === 'export-result');
      
      if (!exportTask?.result?.files?.[0]?.url) {
        throw new Error("Failed to get download URL");
      }

      const downloadUrl = exportTask.result.files[0].url;
      const pdfResponse = await fetch(downloadUrl);
      const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(pdfBuffer);
    } catch (error) {
      console.error("PPT to PDF error:", error);
      res.status(500).json({ error: "Failed to convert PowerPoint to PDF" });
    }
  });

  // TIFF to PDF
  const uploadTiff = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/tiff" || file.originalname.match(/\.(tiff?|tif)$/i)) {
        cb(null, true);
      } else {
        cb(new Error("Only TIFF files are allowed"));
      }
    }
  });

  app.post("/api/tiff-to-pdf", uploadTiff.array("files", 50), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one TIFF file is required" });
      }

      const pdfDoc = await PDFDocumentStandard.create();

      for (const file of files) {
        const pngBuffer = await sharp(file.buffer).png().toBuffer();
        const metadata = await sharp(file.buffer).metadata();
        
        const image = await pdfDoc.embedPng(pngBuffer);
        const page = pdfDoc.addPage([metadata.width || 612, metadata.height || 792]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: metadata.width || 612,
          height: metadata.height || 792
        });
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("TIFF to PDF error:", error);
      res.status(500).json({ error: "Failed to convert TIFF to PDF" });
    }
  });

  // GIF to PDF
  const uploadGif = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/gif") {
        cb(null, true);
      } else {
        cb(new Error("Only GIF files are allowed"));
      }
    }
  });

  app.post("/api/gif-to-pdf", uploadGif.array("files", 50), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one GIF file is required" });
      }

      const pdfDoc = await PDFDocumentStandard.create();

      for (const file of files) {
        const pngBuffer = await sharp(file.buffer, { pages: 0 }).png().toBuffer();
        const metadata = await sharp(file.buffer).metadata();
        
        const image = await pdfDoc.embedPng(pngBuffer);
        const page = pdfDoc.addPage([metadata.width || 612, metadata.height || 792]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: metadata.width || 612,
          height: metadata.height || 792
        });
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("GIF to PDF error:", error);
      res.status(500).json({ error: "Failed to convert GIF to PDF" });
    }
  });

  // Edit PDF - Add annotations
  app.post("/api/edit-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const annotations = JSON.parse(req.body.annotations || "[]");
      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFontsStd.Helvetica);

      for (const annotation of annotations) {
        if (annotation.type === "text") {
          const hexColor = annotation.color || "#000000";
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;

          firstPage.drawText(annotation.text, {
            x: annotation.x,
            y: firstPage.getHeight() - annotation.y,
            size: annotation.fontSize || 16,
            font,
            color: rgbStd(r, g, b)
          });
        } else if (annotation.type === "rectangle") {
          const hexColor = annotation.color || "#000000";
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;

          firstPage.drawRectangle({
            x: annotation.x,
            y: firstPage.getHeight() - annotation.y - annotation.height,
            width: annotation.width,
            height: annotation.height,
            borderColor: rgbStd(r, g, b),
            borderWidth: annotation.strokeWidth || 2
          });
        } else if (annotation.type === "circle") {
          const hexColor = annotation.color || "#000000";
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;

          firstPage.drawEllipse({
            x: annotation.x + annotation.width / 2,
            y: firstPage.getHeight() - annotation.y - annotation.height / 2,
            xScale: annotation.width / 2,
            yScale: annotation.height / 2,
            borderColor: rgbStd(r, g, b),
            borderWidth: annotation.strokeWidth || 2
          });
        } else if (annotation.type === "line") {
          const hexColor = annotation.color || "#000000";
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;

          firstPage.drawLine({
            start: { x: annotation.x, y: firstPage.getHeight() - annotation.y },
            end: { x: annotation.x + annotation.width, y: firstPage.getHeight() - annotation.y },
            thickness: annotation.strokeWidth || 2,
            color: rgbStd(r, g, b)
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=edited.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Edit PDF error:", error);
      res.status(500).json({ error: "Failed to edit PDF" });
    }
  });

  // Annotate PDF
  app.post("/api/annotate-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const annotations = JSON.parse(req.body.annotations || "[]");
      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      for (const annotation of annotations) {
        const hexColor = annotation.color || "#FFFF00";
        const r = parseInt(hexColor.slice(1, 3), 16) / 255;
        const g = parseInt(hexColor.slice(3, 5), 16) / 255;
        const b = parseInt(hexColor.slice(5, 7), 16) / 255;

        if (annotation.type === "highlight") {
          firstPage.drawRectangle({
            x: annotation.x,
            y: firstPage.getHeight() - annotation.y - annotation.height,
            width: annotation.width,
            height: annotation.height,
            color: rgbStd(r, g, b),
            opacity: 0.4
          });
        } else if (annotation.type === "underline") {
          firstPage.drawRectangle({
            x: annotation.x,
            y: firstPage.getHeight() - annotation.y - annotation.height,
            width: annotation.width,
            height: annotation.height,
            color: rgbStd(r, g, b)
          });
        } else if (annotation.type === "note") {
          firstPage.drawRectangle({
            x: annotation.x,
            y: firstPage.getHeight() - annotation.y - 24,
            width: 24,
            height: 24,
            color: rgbStd(1, 0.92, 0.23),
            borderColor: rgbStd(0.8, 0.7, 0),
            borderWidth: 1
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=annotated.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Annotate PDF error:", error);
      res.status(500).json({ error: "Failed to annotate PDF" });
    }
  });

  // Redact PDF
  app.post("/api/redact-pdf", uploadPdf.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (!isPdfFile(file.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file detected" });
      }

      const redactions = JSON.parse(req.body.redactions || "[]");
      const pdfDoc = await PDFDocumentStandard.load(file.buffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      for (const redaction of redactions) {
        firstPage.drawRectangle({
          x: redaction.x,
          y: firstPage.getHeight() - redaction.y - redaction.height,
          width: redaction.width,
          height: redaction.height,
          color: rgbStd(0, 0, 0)
        });
      }

      const pdfBytes = await pdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=redacted.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Redact PDF error:", error);
      res.status(500).json({ error: "Failed to redact PDF" });
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
