import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function JpgToPdfPage() {
  useSEO({
    title: "JPG to PDF Converter - Convert Images to PDF Online Free | PDF HUB 24",
    description: "Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF document. Fast, secure conversion. No registration required.",
    keywords: "jpg to pdf, image to pdf, convert jpg to pdf, png to pdf, photo to pdf, pictures to pdf"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">JPG to PDF</h1>
            <p className="text-muted-foreground leading-relaxed">
              Convert multiple images into a single PDF document. Images will appear in the order you upload them.
            </p>
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats="image/*"
              multiple={true}
              maxFiles={10}
              disabled={status === "processing"}
            />

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

          <ToolSEOContent
            toolName="JPG to PDF Converter"
            toolDescription="Convert your JPG, PNG, and other image files into professional PDF documents with our free online converter. Perfect for creating photo albums, portfolios, scanned document archives, or combining multiple images into one easy-to-share file. Each image becomes a page in your PDF, maintaining the original upload order."
            howToSteps={[
              "Select one or more image files (JPG, PNG, or other formats) by clicking upload or dragging files.",
              "Arrange your images in the desired order - they'll appear as pages in this sequence.",
              "Click the Convert button to create your PDF document.",
              "Download your finished PDF with all images as pages."
            ]}
            benefits={[
              "Convert multiple images to a single PDF document",
              "Supports JPG, PNG, and other common image formats",
              "Images appear in the order you upload them",
              "Each image becomes a full page in the PDF",
              "Perfect for photo albums and portfolios",
              "Ideal for archiving scanned documents",
              "Easy sharing - one file instead of many",
              "High-quality output preserves image detail"
            ]}
            faqs={[
              {
                question: "What image formats are supported?",
                answer: "We support all common image formats including JPG/JPEG, PNG, GIF, BMP, and WebP. Simply upload your images and our tool handles the rest."
              },
              {
                question: "How many images can I convert at once?",
                answer: "You can upload and convert up to 10 images at a time. Each image will become a separate page in your PDF document."
              },
              {
                question: "Will my images lose quality?",
                answer: "No, your images are embedded in the PDF at their original quality. We don't compress or reduce the resolution of your photos."
              },
              {
                question: "Can I change the order of pages?",
                answer: "Images appear in the PDF in the order you upload them. To change the order, remove and re-upload images in your preferred sequence."
              },
              {
                question: "What size will the PDF pages be?",
                answer: "Each page is sized to fit your image. The PDF automatically adjusts page dimensions to match each image's aspect ratio."
              }
            ]}
            keywords={["convert images to pdf", "photo to pdf", "combine images into pdf"]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
