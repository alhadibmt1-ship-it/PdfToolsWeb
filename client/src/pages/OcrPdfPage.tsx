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
    title: "OCR PDF - Extract Text from Scanned PDF Free | PDF HUB 24",
    description: "Extract text from scanned PDF documents using OCR online for free. Convert image-based PDFs to searchable text. Fast, accurate OCR processing.",
    keywords: "ocr pdf, pdf ocr, extract text scanned pdf, pdf text recognition, scan to text, image to text pdf"
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
            toolDescription="Extract text from scanned PDF documents and image-based PDFs using optical character recognition (OCR). Our free online tool recognizes text in scanned documents, photos of documents, and PDFs where text is embedded as images."
            howToSteps={[
              "Upload your scanned PDF or image-based PDF file.",
              "Click the Extract Text with OCR button.",
              "Wait while our OCR engine processes the document.",
              "Copy the extracted text or download it as a text file."
            ]}
            benefits={[
              "Extract text from scanned documents",
              "Process image-based PDFs",
              "Copy text directly to clipboard",
              "Download as plain text file",
              "Works with photos of documents",
              "No software installation required",
              "Quick processing",
              "Completely free to use"
            ]}
            faqs={[
              {
                question: "What's the difference between OCR and Extract Text?",
                answer: "OCR is for scanned documents where text exists as images. Extract Text is for regular PDFs where text is already selectable. Use OCR when you can't select text in your PDF."
              },
              {
                question: "How accurate is the OCR?",
                answer: "Accuracy depends on document quality. Clear, high-resolution scans produce the best results. Blurry, skewed, or low-quality scans may have errors."
              },
              {
                question: "What languages are supported?",
                answer: "Our OCR primarily works best with English and other Latin-alphabet languages. Complex scripts may have reduced accuracy."
              },
              {
                question: "Why is my text not extracted correctly?",
                answer: "Poor scan quality, unusual fonts, or complex layouts can affect accuracy. Try rescanning at higher resolution or using clearer source documents."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["ocr pdf", "scan to text", "extract scanned text", "pdf text recognition"]}
          />
          
          <RelatedTools currentToolId="ocr-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
