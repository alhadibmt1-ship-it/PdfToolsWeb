import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download, Images } from "lucide-react";
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

export default function ExtractImagesPage() {
  useSEO({
    title: "Extract Images from PDF Free | PDF HUB 24",
    description: "Extract images from PDF free. Download all pictures from PDF documents. Best free PDF image extractor. No signup.",
    keywords: "extract images from pdf free, get images from pdf, pdf image extractor free, download pdf images, extract pictures from pdf",
    canonicalPath: "/extract-images"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("extract-images", lang, getToolSEOData("extract-images")?.longTailH1 || "Extract Images from PDF");
  const toolDesc = getToolDesc("extract-images", lang, "Extract all embedded images from your PDF document. Get your images as separate files in a ZIP archive.");

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageCount, setImageCount] = useState<number>(0);
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
    setFiles(newFiles);
  }, [resultUrl]);

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
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
      const response = await runWithProgress(async () => {
        const res = await fetch("/api/extract-images", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to extract images");
        }

        return res;
      });

      const countHeader = response.headers.get("X-Image-Count");
      setImageCount(countHeader ? parseInt(countHeader) : 0);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Images extracted successfully",
      });
    } catch (error: any) {
      setStatus("error");
      toast({
        title: "Error",
        description: error.message || "Failed to extract images. Please try again.",
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
      a.download = "extracted-images.zip";
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
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Images className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready to Extract Images</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All images embedded in your PDF will be extracted and downloaded as a ZIP file.
                </p>
                <Button 
                  onClick={handleExtract} 
                  className="w-full"
                  size="lg"
                  data-testid="button-extract"
                >
                  Extract Images
                </Button>
              </div>
            )}

            <ProcessingState
              status={status === "processing" || status === "error" ? status : "idle"}
              progress={progress}
              message={status === "processing" ? "Extracting images from PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Images extracted successfully!</h3>
                {imageCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Found {imageCount} image{imageCount > 1 ? 's' : ''} in your PDF.
                  </p>
                )}
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Images (ZIP)
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setStatus("idle");
                    setResultUrl(null);
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Extract from Another PDF
                </Button>
                <div className="pt-3 border-t border-border/50 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">What's next?</span>
                  <Link href="/image-compressor" className="text-primary hover:underline font-medium" data-testid="link-post-download-1">Image Compressor →</Link>
                  <Link href="/jpg-to-pdf" className="text-primary hover:underline font-medium" data-testid="link-post-download-2">JPG to PDF →</Link>
                </div>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent
            toolId="extract-images"
            fallbackToolName="Extract Images from PDF"
            fallbackDescription="Extract all embedded images from your PDF documents with our free online tool."
          />
          
          <RelatedTools currentToolId="extract-images" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
