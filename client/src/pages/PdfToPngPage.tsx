import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function PdfToPngPage() {
  useSEO({
    title: "PDF to PNG Free Online - Convert PDF to Image | PDF HUB 24",
    description: "Convert PDF to PNG free. Transform PDF pages to PNG images with transparency. Extract all pages. No signup.",
    keywords: "pdf to png free, convert pdf to png, pdf to image free, save pdf as png, pdf to png converter free, extract pdf pages as images",
    canonicalPath: "/pdf-to-png"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("pdf-to-png", lang, getToolSEOData("pdf-to-png")?.longTailH1 || "PDF to PNG");
  const toolDesc = getToolDesc("pdf-to-png", lang, "Convert each page of your PDF into high-quality PNG images with transparent background support. Single-page PDFs download as PNG, multi-page as ZIP.");

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isZipFile, setIsZipFile] = useState(true);
  const [filename, setFilename] = useState("images.zip");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    setStatus("idle");
    setErrorMessage("");
    setFiles(newFiles);
  }, [resultUrl]);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }

    // Client-side file size validation
    if (files[0].size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Please upload a file under ${MAX_FILE_SIZE_MB}MB. Your file is ${(files[0].size / 1024 / 1024).toFixed(1)}MB.`,
        variant: "destructive",
      });
      return;
    }
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const { blob, contentType, responseFilename } = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-png", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let serverError = "Conversion failed. Please try again.";
          try { const errBody = await response.clone().json(); if (errBody?.error) serverError = errBody.error; } catch {}
          throw new Error(serverError);
        }

        const contentType = response.headers.get("Content-Type") || "";
        const disposition = response.headers.get("Content-Disposition") || "";
        const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        const responseFilename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : "download";
        
        const blob = await response.blob();
        
        return { blob, contentType, responseFilename };
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setIsZipFile(contentType.includes("zip"));
      setFilename(responseFilename);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to PNG successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFiles([]);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = filename;
      a.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{toolTitle}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {toolDesc}
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to PNG
              </Button>
            )}

            {status === "processing" && (
              <ProcessingState 
                status="processing"
                message="Converting PDF to PNG images..." 
                progress={progress}
              />
            )}

            {status === "success" && resultUrl && (
              <div className="text-center space-y-4">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Conversion Complete!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm mb-4">
                    {isZipFile 
                      ? "Your PNG images are ready for download as a ZIP file."
                      : "Your PNG image is ready for download."}
                  </p>
                  <Button onClick={handleDownload} size="lg" data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download {isZipFile ? "ZIP" : "PNG"}
                  </Button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center">
                <Button 
                  onClick={() => setStatus("idle")} 
                  variant="outline"
                  data-testid="button-try-again"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent
            toolId="pdf-to-png"
            fallbackToolName="PDF to PNG Converter"
            fallbackDescription="Our PDF to PNG converter transforms your PDF documents into high-quality PNG images with lossless compression."
          />

          <RelatedTools currentToolId="pdf-to-png" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
