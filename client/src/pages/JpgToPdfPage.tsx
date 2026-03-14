import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import UrlImportButton from "@/components/UrlImportButton";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/EnhancedToolSEOContent";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function JpgToPdfPage() {
  useSEO({
    title: "JPG to PDF Free Online - Convert Images to PDF | PDF HUB 24",
    description: "Convert JPG to PDF free. Combine multiple images into one PDF. Best free image to PDF converter. No signup.",
    keywords: "jpg to pdf free, convert image to pdf, photo to pdf, picture to pdf free, jpg to pdf converter free, combine images to pdf",
    canonicalPath: "/jpg-to-pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/jpg-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert images");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Images converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert images. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("jpg-to-pdf")?.longTailH1 || "JPG to PDF"}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert multiple images into a single PDF document. Images will appear in the order you upload them.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats="image/*"
              multiple={true}
              maxFiles={10}
              disabled={status === "processing"}
            />
            <div className="flex justify-center">
              <UrlImportButton
                accept="image/*"
                onFileImported={(file) => setFiles(prev => [...prev, file])}
              />
            </div>

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert {files.length} Image{files.length > 1 ? "s" : ""} to PDF
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting images to PDF..." : undefined}
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
                  Download PDF
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="jpg-to-pdf" />
          
          <RelatedTools currentToolId="jpg-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
