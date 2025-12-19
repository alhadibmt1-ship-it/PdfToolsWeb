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

export default function GifToPdfPage() {
  useSEO({
    title: "GIF to PDF Free Online - Convert GIF to PDF | PDF HUB 24",
    description: "Convert GIF to PDF free. Transform GIF images to PDF documents instantly. Combine multiple GIFs. No signup.",
    keywords: "gif to pdf free, convert gif to pdf, gif to pdf converter free, image to pdf, animated gif to pdf"
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
        description: "Please select a GIF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    addRecentTool("gif-to-pdf");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/gif-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert GIF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "GIF converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert GIF. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">GIF to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert GIF images to PDF documents. Upload multiple GIF files to combine them into a single PDF.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".gif"
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
              message={status === "processing" ? "Converting GIF to PDF..." : undefined}
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
            toolName="GIF to PDF Converter"
            toolId="gif-to-pdf"
            toolDescription="Convert GIF images to PDF format easily. Our converter handles both static and animated GIF files, extracting frames and creating high-quality PDF documents."
            howToSteps={[
              "Upload your GIF file(s) by clicking the upload area or drag and drop.",
              "Add multiple GIF files to combine them into a single PDF.",
              "Click Convert to process your images.",
              "Download your new PDF document."
            ]}
            benefits={[
              "Convert static and animated GIF files",
              "Combine multiple GIFs into one PDF",
              "Extract first frame from animated GIFs",
              "Preserve image quality",
              "Completely free with no registration",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "What happens to animated GIFs?",
                answer: "For animated GIFs, our converter extracts the first frame and converts it to a static image in the PDF. Each GIF file becomes one page in the output PDF."
              },
              {
                question: "Can I convert multiple GIF files?",
                answer: "Yes! You can upload multiple GIF files and they will be combined into a single PDF document with each image as a separate page."
              },
              {
                question: "Is the quality preserved?",
                answer: "Yes, our converter maintains the original quality of your GIF images while converting them to PDF format."
              }
            ]}
          />

          <RelatedTools currentToolId="gif-to-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="GIF to PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
