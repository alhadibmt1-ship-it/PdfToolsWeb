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

export default function WebpToPdfPage() {
  useSEO({
    title: "WebP to PDF Converter - Convert WebP Images to PDF Free | PDF HUB 24",
    description: "Convert WebP images to PDF documents online for free. Transform single or multiple WebP files into a professional PDF. Fast, secure, no registration required.",
    keywords: "webp to pdf, convert webp to pdf, webp to pdf converter, webp image to pdf"
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
        description: "Please select WebP images to convert",
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
        const response = await fetch("/api/webp-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert WebP to PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "WebP images converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">WebP to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your WebP images into a PDF document. Upload multiple images to combine them into a single PDF file.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".webp"
              multiple={true}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">{files.length} image{files.length > 1 ? 's' : ''} selected</h3>
                <p className="text-sm text-muted-foreground">
                  Each image will become a page in your PDF document.
                </p>
                <Button 
                  onClick={handleConvert} 
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  Convert to PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting WebP images to PDF..." : undefined}
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
                  Convert More Images
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="WebP to PDF Converter"
            toolDescription="Convert your WebP images to PDF documents with our free online tool. WebP is a modern image format with superior compression, and our converter transforms these images into universally compatible PDF files. Upload multiple WebP images to create a multi-page PDF document."
            howToSteps={[
              "Upload your WebP image(s) by clicking the upload area or dragging and dropping.",
              "Select multiple files to combine them into a single PDF.",
              "Click the Convert to PDF button to start processing.",
              "Download your PDF document containing all your images."
            ]}
            benefits={[
              "Convert WebP to universally compatible PDF",
              "Combine multiple WebP images into one PDF",
              "Maintains original image quality",
              "Each image becomes a page in the PDF",
              "Perfect for archiving WebP collections",
              "No software installation required",
              "Works on all devices and browsers",
              "Completely free with no limits"
            ]}
            faqs={[
              {
                question: "What is WebP format?",
                answer: "WebP is a modern image format developed by Google that provides superior compression compared to JPEG and PNG. It's widely used on the web for faster loading times."
              },
              {
                question: "Can I convert multiple WebP images at once?",
                answer: "Yes! You can upload multiple WebP images and they'll all be combined into a single PDF document, with each image on its own page."
              },
              {
                question: "Will the image quality be preserved?",
                answer: "Yes, we convert WebP images to PDF at their original resolution and quality. There's no quality loss during conversion."
              },
              {
                question: "Is there a limit on how many images I can convert?",
                answer: "You can convert up to 20 WebP images at once. Each image will become a page in your PDF."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["webp to pdf", "convert webp", "webp converter", "webp to document"]}
          />
          
          <RelatedTools currentToolId="webp-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
