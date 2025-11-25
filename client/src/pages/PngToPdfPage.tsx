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

export default function PngToPdfPage() {
  useSEO({
    title: "PNG to PDF Converter - Convert PNG Images to PDF Online Free | PDF HUB 24",
    description: "Convert PNG images to PDF documents online for free. Combine multiple PNG files into one PDF. Preserve transparency and quality. No registration required.",
    keywords: "png to pdf, convert png to pdf, image to pdf, png converter, combine png files, create pdf from images"
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
        description: "Please select at least one PNG file",
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
        const response = await fetch("/api/png-to-pdf", {
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
        description: "PNG images converted to PDF successfully",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PNG to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert multiple PNG images into a single PDF document. Images will appear in the order you upload them. Perfect for creating photo albums or document archives.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".png"
              multiple={true}
              maxFiles={20}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert {files.length} PNG{files.length > 1 ? "s" : ""} to PDF
              </Button>
            )}

            {status === "processing" && (
              <ProcessingState 
                status="processing"
                message="Converting PNG images to PDF..." 
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
                    Your PDF document is ready for download.
                  </p>
                  <Button onClick={handleDownload} size="lg" data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
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

          <ToolSEOContent
            toolName="PNG to PDF Converter"
            toolDescription="Our PNG to PDF converter allows you to combine multiple PNG images into a single PDF document. Each image becomes a separate page in the PDF, maintaining the original quality and dimensions of your PNG files."
            howToSteps={[
              "Select one or more PNG images to convert",
              "Arrange the order of images as needed",
              "Click 'Convert to PDF' to start the conversion",
              "Download your combined PDF document"
            ]}
            benefits={[
              "Combine multiple PNG images into one PDF",
              "Preserve original image quality",
              "Create photo albums and portfolios",
              "Easy document sharing and archiving",
              "No file size limits on individual images"
            ]}
            faqs={[
              {
                question: "How many PNG files can I convert at once?",
                answer: "You can convert up to 20 PNG images into a single PDF document in one batch."
              },
              {
                question: "Will the image quality be preserved?",
                answer: "Yes! Our converter maintains the full quality of your PNG images when embedding them in the PDF."
              },
              {
                question: "Can I control the page order?",
                answer: "Yes, images appear in the PDF in the same order you upload them. You can also use our Reorder Pages tool after conversion."
              }
            ]}
          />

          <RelatedTools currentToolId="png-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
