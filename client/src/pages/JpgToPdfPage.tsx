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
            toolDescription="Convert your JPG and JPEG images into professional PDF documents with our free online converter. Our tool allows you to combine multiple photos into a single PDF file, making it perfect for creating photo albums, portfolios, scanned document archives, or presentations. Each image becomes a full page in your PDF, preserving the original quality and appearing in your upload order."
            howToSteps={[
              "Select one or more JPG/JPEG images by clicking the upload area or dragging and dropping files.",
              "Review your selected images - they will appear as pages in the order uploaded.",
              "Click 'Convert to PDF' to create your multi-page PDF document.",
              "Download your finished PDF containing all images as separate pages."
            ]}
            benefits={[
              "Convert multiple JPG images to a single PDF document",
              "Supports JPG, JPEG, and other common image formats",
              "Images appear in the exact order you upload them",
              "Each image becomes a full-size page in the PDF",
              "Perfect for creating photo albums and portfolios",
              "Ideal for archiving scanned documents and receipts",
              "Easy sharing - send one PDF instead of many images",
              "High-quality output preserves all image detail",
              "No software installation or account required"
            ]}
            faqs={[
              {
                question: "What image formats are supported?",
                answer: "Our JPG to PDF converter primarily supports JPG and JPEG images, but also accepts PNG, GIF, BMP, and WebP formats. Simply upload your images and our tool automatically handles the conversion process."
              },
              {
                question: "How many images can I convert at once?",
                answer: "You can upload and convert up to 10 images at a time. Each image becomes a separate page in your PDF document. For larger batches, you can convert multiple times and merge the resulting PDFs."
              },
              {
                question: "Will my images lose quality during conversion?",
                answer: "No, your images are embedded in the PDF at their original resolution and quality. We do not compress or reduce the quality of your photos during the conversion process."
              },
              {
                question: "Can I change the order of pages in the PDF?",
                answer: "Images appear in the PDF in the order you upload them. To change the order, you can remove and re-upload images in your preferred sequence, or use our Reorder Pages tool after conversion."
              },
              {
                question: "What size will the PDF pages be?",
                answer: "Each page is automatically sized to fit your image dimensions. The PDF adjusts page dimensions to match each image's aspect ratio, ensuring your photos display perfectly without cropping or distortion."
              }
            ]}
            keywords={["jpg to pdf", "convert images to pdf", "photo to pdf", "combine jpg into pdf", "jpeg to pdf converter"]}
            relatedLinks={[
              { text: "Convert PNG images using PNG to PDF", href: "/png-to-pdf" },
              { text: "Convert WebP images using WebP to PDF", href: "/webp-to-pdf" },
              { text: "Extract images from PDF using Extract Images", href: "/extract-images" },
              { text: "Combine multiple PDFs using Merge PDF", href: "/merge" }
            ]}
            extraSections={[
              {
                title: "Why Convert JPG Images to PDF?",
                content: "Converting JPG images to PDF offers many advantages for organization and sharing:",
                items: [
                  "Combine multiple photos into a single shareable file",
                  "Create professional photo albums and portfolios",
                  "Archive scanned documents, receipts, and records",
                  "Easier email attachments - one file instead of many",
                  "Universal format that opens on any device",
                  "Preserve image quality for printing"
                ]
              },
              {
                title: "Common Use Cases for JPG to PDF",
                content: "Our JPG to PDF converter is popular for various everyday tasks:",
                items: [
                  "Creating digital photo books and memories",
                  "Compiling product images for catalogs",
                  "Archiving scanned receipts and invoices",
                  "Building photography portfolios",
                  "Submitting multi-page documents and forms",
                  "Sharing vacation photos with family"
                ]
              }
            ]}
            exampleTable={{
              title: "JPG to PDF Conversion Examples",
              rows: [
                { label: "Single Photo (4000x3000)", before: "2.5 MB JPG", after: "2.6 MB PDF" },
                { label: "5 Product Images", before: "8 MB total", after: "8.2 MB PDF" },
                { label: "10 Scanned Receipts", before: "15 MB total", after: "14 MB PDF" },
                { label: "Photo Album (10 pages)", before: "25 MB total", after: "24 MB PDF" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="jpg-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
