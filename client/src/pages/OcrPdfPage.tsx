import { useState } from "react";
import { ChevronLeft, Download, ScanText } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function OcrPdfPage() {
  useSEO({
    title: "OCR PDF Free - Extract Scanned Text | PDF HUB 24",
    description: "OCR PDF free online. Extract text from scanned PDF documents instantly. Best free PDF OCR tool - convert image-based PDFs to searchable text. No signup.",
    keywords: "ocr pdf free, pdf ocr online, extract text from scanned pdf, pdf text recognition free, scan to text pdf, image pdf to text",
    canonicalPath: "/ocr-pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [extractedText, setExtractedText] = useState<string>("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleOcr = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const result = await runWithProgress(async () => {
        const response = await fetch("/api/ocr-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to process PDF");
        }

        return await response.json();
      });

      setExtractedText(result.text || "");
      setStatus("success");

      toast({
        title: "Success!",
        description: "Text extracted successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to extract text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(extractedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">OCR PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Extract text from scanned PDF documents using optical character recognition (OCR).
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ScanText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready for OCR</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: For scanned documents or image-based PDFs, OCR will attempt to recognize text. For regular PDFs with selectable text, use our Extract Text tool instead.
                </p>
                <Button 
                  onClick={handleOcr} 
                  className="w-full"
                  size="lg"
                  data-testid="button-ocr"
                >
                  Extract Text with OCR
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Performing OCR on your PDF..." : undefined}
            />

            {status === "success" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Extracted Text</h3>
                <div className="p-4 bg-muted rounded-md max-h-96 overflow-auto">
                  <pre className="whitespace-pre-wrap text-sm" data-testid="text-result">
                    {extractedText || "No text could be extracted from this PDF."}
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopy}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-copy"
                  >
                    Copy to Clipboard
                  </Button>
                  <Button 
                    onClick={handleDownload} 
                    className="flex-1"
                    data-testid="button-download"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download as TXT
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setStatus("idle");
                    setExtractedText("");
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Process Another PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="OCR PDF"
            toolId="ocr-pdf"
            toolDescription="Extract text from scanned PDF documents and image-based PDFs using optical character recognition (OCR). Our free online tool recognizes text in scanned documents, photos of documents, receipts, and PDFs where text is embedded as images. Unlike regular text extraction, OCR can read text from images, making previously unsearchable documents fully accessible and editable."
            howToSteps={[
              "Upload your scanned PDF or image-based PDF file by clicking the upload area or dragging and dropping.",
              "Click the 'Extract Text with OCR' button to start processing.",
              "Wait while our OCR engine analyzes and recognizes text in the document images.",
              "Copy the extracted text to your clipboard or download it as a plain text file."
            ]}
            benefits={[
              "Extract text from scanned documents and image-based PDFs",
              "Process photos of documents, receipts, and handwritten notes",
              "Copy recognized text directly to clipboard",
              "Download extracted text as a plain text file",
              "Works with various document types and layouts",
              "No software installation required",
              "Fast cloud-based OCR processing",
              "Completely free with no registration required",
              "Make scanned documents searchable and editable"
            ]}
            faqs={[
              {
                question: "What's the difference between OCR and Extract Text?",
                answer: "OCR (Optical Character Recognition) is for scanned documents and image-based PDFs where text exists as pixels in images. Extract Text is for regular PDFs where text is already stored as selectable characters. Use OCR when you cannot select or highlight text in your PDF — that means the text is actually an image that needs to be 'read' by OCR."
              },
              {
                question: "How accurate is the OCR?",
                answer: "Accuracy depends primarily on document quality. Clear, high-resolution scans (300 DPI or higher) with good contrast produce the best results — often 95%+ accuracy. Blurry, skewed, low-quality scans, or documents with unusual fonts may have errors. Straightening and enhancing your scan before processing can improve results."
              },
              {
                question: "What languages are supported?",
                answer: "Our OCR engine works best with English and other Latin-alphabet languages (Spanish, French, German, Italian, Portuguese, etc.). Complex scripts like Arabic, Chinese, Japanese, and Korean may have reduced accuracy. For best results with non-Latin scripts, ensure high-quality, clear scans."
              },
              {
                question: "Why is my text not extracted correctly?",
                answer: "Common causes include poor scan quality, blurry images, skewed pages, unusual fonts, handwriting, or complex layouts with multiple columns. To improve results: scan at higher resolution (300 DPI+), ensure pages are straight, use good lighting, and choose documents with standard fonts."
              },
              {
                question: "Can OCR read handwritten documents?",
                answer: "OCR works best with printed text. Handwritten text is much harder to recognize and results vary significantly based on handwriting clarity. Neat, legible handwriting may be partially recognized, but messy handwriting typically won't be processed accurately."
              }
            ]}
            keywords={["ocr pdf", "pdf ocr online", "scan to text", "extract scanned text", "pdf text recognition"]}
            relatedLinks={[
              { text: "Extract text from regular PDFs using Extract Text", href: "/extract-text" },
              { text: "Convert scanned PDF to Word using PDF to Word", href: "/pdf-to-word" },
              { text: "Extract tables from PDFs using PDF to Excel", href: "/pdf-to-excel" },
              { text: "Compress large scanned PDFs using Compress PDF", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "When to Use OCR vs Extract Text",
                content: "Choosing the right tool ensures the best results for your document type.",
                items: [
                  "Use OCR for scanned paper documents saved as PDF",
                  "Use OCR for photos of documents, receipts, or whiteboards",
                  "Use OCR for PDFs where you cannot select text",
                  "Use Extract Text for digital PDFs with selectable text",
                  "Use Extract Text when text can be copied from the PDF"
                ]
              },
              {
                title: "Tips for Best OCR Results",
                content: "Follow these guidelines to improve OCR accuracy:",
                items: [
                  "Scan documents at 300 DPI or higher resolution",
                  "Ensure pages are straight and not skewed",
                  "Use good lighting and contrast when photographing documents",
                  "Choose documents with standard, printed fonts",
                  "Avoid creased, stained, or damaged paper",
                  "Process single-column documents for best accuracy"
                ]
              }
            ]}
            exampleTable={{
              title: "OCR Processing Examples",
              rows: [
                { label: "Scanned Contract", before: "Image-based PDF", after: "Searchable, copyable text" },
                { label: "Photo of Receipt", before: "Camera photo in PDF", after: "Extracted transaction data" },
                { label: "Old Document Scan", before: "Archived paper scan", after: "Digitized text content" },
                { label: "Faxed Document", before: "Fax image PDF", after: "Editable text file" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="ocr-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
