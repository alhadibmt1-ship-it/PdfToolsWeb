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
            toolDescription="Convert your PNG images to professional PDF documents with our free online converter. PNG format is known for its lossless compression and transparency support, and our tool preserves these qualities when creating your PDF. Combine multiple PNG files into a single multi-page document, perfect for graphics, screenshots, diagrams, and high-quality images."
            howToSteps={[
              "Select one or more PNG images by clicking the upload area or dragging and dropping.",
              "Review your selected images - they will appear as pages in upload order.",
              "Click 'Convert to PDF' to create your multi-page PDF document.",
              "Download your finished PDF with all PNG images as separate pages."
            ]}
            benefits={[
              "Combine multiple PNG images into a single PDF document",
              "Preserve original image quality and sharp details",
              "Supports PNG transparency in the output PDF",
              "Perfect for screenshots, diagrams, and graphics",
              "Create photo albums, portfolios, and presentations",
              "Easy document sharing - one file instead of many",
              "Upload up to 20 PNG images at once",
              "No software installation or registration required",
              "Works on all devices including mobile and tablet"
            ]}
            faqs={[
              {
                question: "How many PNG files can I convert at once?",
                answer: "You can convert up to 20 PNG images into a single PDF document in one batch. Each image becomes a separate page in the resulting PDF file."
              },
              {
                question: "Will the image quality and transparency be preserved?",
                answer: "Yes! Our converter maintains the full quality of your PNG images including sharp edges and text. PNG transparency is also preserved when embedding images in the PDF."
              },
              {
                question: "Can I control the page order in the PDF?",
                answer: "Images appear in the PDF in the same order you upload them. For different ordering, re-upload in your preferred sequence, or use our Reorder Pages tool after conversion."
              },
              {
                question: "What's the difference between PNG and JPG for PDF conversion?",
                answer: "PNG is a lossless format ideal for screenshots, text, graphics, and images with transparency. JPG is better for photographs. Both convert well to PDF, but PNG preserves sharper edges and text."
              },
              {
                question: "Is there a file size limit for PNG images?",
                answer: "There's no strict limit on individual PNG file sizes. However, very large images may take longer to process. For best performance, optimize extremely large PNGs before uploading."
              }
            ]}
            keywords={["png to pdf", "convert png to pdf", "png to pdf converter", "combine png files", "png images to pdf"]}
            relatedLinks={[
              { text: "Convert JPG images using JPG to PDF", href: "/jpg-to-pdf" },
              { text: "Convert WebP images using WebP to PDF", href: "/webp-to-pdf" },
              { text: "Extract images from PDF using Extract Images", href: "/extract-images" },
              { text: "Reorder pages using Reorder PDF Pages", href: "/reorder" }
            ]}
            extraSections={[
              {
                title: "Why Convert PNG Images to PDF?",
                content: "PNG to PDF conversion offers unique advantages, especially for graphics and screenshots:",
                items: [
                  "Preserve sharp edges and text clarity from PNG format",
                  "Maintain transparency in graphics and logos",
                  "Create professional presentations and documentation",
                  "Combine multiple screenshots into a single guide",
                  "Archive diagrams and technical drawings",
                  "Universal PDF format opens on any device"
                ]
              },
              {
                title: "Best Use Cases for PNG to PDF",
                content: "Our PNG to PDF converter is ideal for these common scenarios:",
                items: [
                  "Compiling software screenshots for tutorials",
                  "Creating graphic design portfolios",
                  "Archiving infographics and visual content",
                  "Documenting user interface designs",
                  "Sharing charts, graphs, and diagrams",
                  "Building technical documentation with images"
                ]
              }
            ]}
            exampleTable={{
              title: "PNG to PDF Conversion Examples",
              rows: [
                { label: "Screenshot (1920x1080)", before: "1.2 MB PNG", after: "1.3 MB PDF" },
                { label: "Logo with Transparency", before: "150 KB PNG", after: "160 KB PDF" },
                { label: "10 App Screenshots", before: "12 MB total", after: "11.5 MB PDF" },
                { label: "Infographic Collection", before: "8 MB total", after: "7.8 MB PDF" }
              ]
            }}
          />

          <RelatedTools currentToolId="png-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
