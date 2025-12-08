import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
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
import { useRecentTools } from "@/contexts/RecentToolsContext";
import SuccessCelebration from "@/components/SuccessCelebration";

export default function TiffToPdfPage() {
  useSEO({
    title: "TIFF to PDF Converter - Free Online TIFF to PDF | PDF HUB 24",
    description: "Convert TIFF images to PDF online for free. Transform TIFF/TIF files into PDF documents. Fast, secure conversion with high quality output.",
    keywords: "tiff to pdf, tif to pdf, convert tiff to pdf, image to pdf, tiff converter"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();
  const { addRecentTool } = useRecentTools();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a TIFF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    addRecentTool("tiff-to-pdf");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/tiff-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert TIFF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "TIFF converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert TIFF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "converted.pdf";
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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">TIFF to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert TIFF images to PDF documents. Upload multiple TIFF files to combine them into a single PDF.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".tiff,.tif"
              multiple={true}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to PDF
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting TIFF to PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF File
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="TIFF to PDF Converter"
            toolId="tiff-to-pdf"
            toolDescription="Convert TIFF images to PDF format with high quality. Our converter handles multi-page TIFF files and preserves image quality while creating universally compatible PDF documents."
            howToSteps={[
              "Upload your TIFF file(s) by clicking the upload area or drag and drop.",
              "Add multiple TIFF files to combine them into a single PDF.",
              "Click Convert to process your images.",
              "Download your new PDF document."
            ]}
            benefits={[
              "Convert single or multi-page TIFF files",
              "Combine multiple TIFF images into one PDF",
              "Preserve original image quality",
              "Support for all TIFF compression formats",
              "Completely free with no registration",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "What is TIFF format?",
                answer: "TIFF (Tagged Image File Format) is a high-quality image format commonly used in scanning, printing, and professional photography. It supports lossless compression and multiple pages."
              },
              {
                question: "Can I convert multiple TIFF files at once?",
                answer: "Yes! You can upload multiple TIFF files and they will be combined into a single PDF document with each image as a separate page."
              },
              {
                question: "Is the quality preserved?",
                answer: "Yes, our converter maintains the original quality of your TIFF images while converting them to PDF format."
              }
            ]}
          />

          <RelatedTools currentToolId="tiff-to-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="TIFF to PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
