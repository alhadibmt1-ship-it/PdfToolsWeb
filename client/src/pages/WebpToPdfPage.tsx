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
    title: "WebP to PDF Free Online - Convert WebP to PDF | PDF HUB 24",
    description: "Convert WebP to PDF free. Transform WebP images to PDF documents instantly. Combine multiple images. No signup.",
    keywords: "webp to pdf free, convert webp to pdf, webp to pdf converter free, webp image to pdf, webp to pdf online"
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
            toolId="webp-to-pdf"
            toolDescription="Convert your WebP images to universally compatible PDF documents with our free online converter. WebP is Google's modern image format offering superior compression and quality, but not all devices support it natively. Our tool transforms WebP images into PDF files that open anywhere, preserving the original quality and allowing you to combine multiple images into a single document."
            howToSteps={[
              "Upload your WebP image(s) by clicking the upload area or dragging and dropping files.",
              "Select multiple WebP files to combine them into a single multi-page PDF.",
              "Click 'Convert to PDF' to start the instant conversion process.",
              "Download your PDF document containing all images as separate pages."
            ]}
            benefits={[
              "Convert WebP to universally compatible PDF format",
              "Combine multiple WebP images into one PDF document",
              "Maintains original image resolution and quality",
              "Each image becomes a full page in the PDF",
              "Perfect for archiving and sharing WebP collections",
              "Solves WebP compatibility issues on older devices",
              "No software installation or registration required",
              "Works on all devices and browsers instantly",
              "Completely free with unlimited conversions"
            ]}
            faqs={[
              {
                question: "What is WebP format and why convert it?",
                answer: "WebP is a modern image format developed by Google that provides superior compression compared to JPEG and PNG. While great for web use, some older devices and software don't support WebP. Converting to PDF ensures universal compatibility."
              },
              {
                question: "Can I convert multiple WebP images at once?",
                answer: "Yes! You can upload multiple WebP images and combine them into a single PDF document. Each image becomes its own page, appearing in the order you uploaded them."
              },
              {
                question: "Will the image quality be preserved during conversion?",
                answer: "Absolutely. We convert WebP images to PDF at their original resolution and quality. There's no compression or quality loss during the conversion process."
              },
              {
                question: "Is there a limit on how many WebP images I can convert?",
                answer: "You can convert up to 20 WebP images at once into a single PDF. For larger batches, simply convert in multiple sessions and merge the resulting PDFs."
              },
              {
                question: "Can I convert animated WebP files?",
                answer: "Our converter is designed for static WebP images. Animated WebP files will convert, but only the first frame will appear in the PDF. For animations, consider converting each frame separately."
              }
            ]}
            keywords={["webp to pdf", "convert webp to pdf", "webp to pdf converter", "webp image to pdf", "webp pdf online"]}
            relatedLinks={[
              { text: "Convert JPG images using JPG to PDF", href: "/jpg-to-pdf" },
              { text: "Convert PNG images using PNG to PDF", href: "/png-to-pdf" },
              { text: "Extract images from PDF using Extract Images", href: "/extract-images" },
              { text: "Combine PDFs using Merge PDF", href: "/merge" }
            ]}
            extraSections={[
              {
                title: "Why Convert WebP Images to PDF?",
                content: "WebP to PDF conversion solves compatibility issues and offers several benefits:",
                items: [
                  "Universal compatibility - PDFs open on all devices without WebP support",
                  "Easy sharing - combine multiple images into one document",
                  "Professional presentation - create portfolios and galleries",
                  "Long-term archiving - PDF is a stable, widely-supported format",
                  "Print-ready output - PDFs print consistently everywhere",
                  "Preserve quality while gaining compatibility"
                ]
              },
              {
                title: "Common Use Cases for WebP to PDF",
                content: "Our WebP to PDF converter helps with these everyday scenarios:",
                items: [
                  "Converting web-downloaded images for offline viewing",
                  "Creating shareable photo collections from WebP galleries",
                  "Archiving website screenshots saved as WebP",
                  "Building portfolios from WebP design assets",
                  "Preparing images for printing on older systems",
                  "Sharing images with users on older devices"
                ]
              }
            ]}
            exampleTable={{
              title: "WebP to PDF Conversion Examples",
              rows: [
                { label: "Single WebP Photo", before: "800 KB WebP", after: "1.2 MB PDF" },
                { label: "5 WebP Screenshots", before: "2.5 MB total", after: "3.8 MB PDF" },
                { label: "10 Product Images", before: "4 MB total", after: "5.5 MB PDF" },
                { label: "WebP Photo Album", before: "15 MB total", after: "18 MB PDF" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="webp-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
