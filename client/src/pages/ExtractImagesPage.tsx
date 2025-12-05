import { useState } from "react";
import { ChevronLeft, Download, Images } from "lucide-react";
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

export default function ExtractImagesPage() {
  useSEO({
    title: "Extract Images from PDF - Get All Images from PDF Free | PDF HUB 24",
    description: "Extract all images from PDF files online for free. Download embedded images from PDF documents as separate image files. Fast, secure extraction.",
    keywords: "extract images from pdf, get images from pdf, pdf image extractor, download pdf images, pdf to images"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState<number>(0);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Extract Images from PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Extract all embedded images from your PDF document. Get your images as separate files in a ZIP archive.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
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
              status={status}
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
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Extract Images from PDF"
            toolId="extract-images"
            toolDescription="Extract all embedded images from your PDF documents with our free online tool. Whether you need to save photos, diagrams, logos, or graphics from a PDF, our extractor pulls out every image at its original quality and packages them in a convenient ZIP download. Perfect for designers, marketers, and anyone who needs to reuse images from PDF files."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Click the 'Extract Images' button to start processing your PDF.",
              "Wait while we scan your PDF for all embedded images — the count is shown when complete.",
              "Download the ZIP file containing all extracted images in their original quality."
            ]}
            benefits={[
              "Extract all images from any PDF instantly",
              "Images saved in original quality without compression",
              "Download all images as a convenient ZIP file",
              "Works with photos, diagrams, logos, and graphics",
              "Preserves original image formats (JPEG, PNG)",
              "No software installation required",
              "Fast processing even for large PDFs",
              "See the number of images found before downloading",
              "Completely free with no limits or registration"
            ]}
            faqs={[
              {
                question: "What image formats are extracted?",
                answer: "Images are extracted in their original format when possible — typically JPEG for photographs and PNG for graphics. Some embedded formats may be converted to PNG for broader compatibility. The quality remains identical to the original embedded images."
              },
              {
                question: "Will the image quality be preserved?",
                answer: "Yes, images are extracted at their original quality and resolution. There's no compression, resizing, or quality loss during extraction. What you get is exactly what was embedded in the PDF."
              },
              {
                question: "What if my PDF has no images?",
                answer: "If no extractable images are found, you'll receive a notification. Note that text, vector graphics, and decorative elements rendered as part of the PDF structure are not extractable as separate images — only embedded raster images can be extracted."
              },
              {
                question: "Can I extract images from scanned PDFs?",
                answer: "Scanned PDFs typically contain the entire page as one image. When you extract images from a scanned PDF, you'll get the full page scans as individual images, not separate elements within them. Each scanned page becomes one image file."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, completely free with no registration required. There are no limits on file size, number of images, or how many PDFs you can process. No hidden costs or subscriptions."
              }
            ]}
            keywords={["extract images from pdf", "pdf image extractor", "get images from pdf", "save pdf images", "download pdf photos"]}
            relatedLinks={[
              { text: "Convert pages to images using PDF to JPG", href: "/pdf-to-jpg" },
              { text: "Convert pages to PNG using PDF to PNG", href: "/pdf-to-png" },
              { text: "Extract text content using Extract Text", href: "/extract-text" },
              { text: "Split PDF into separate pages using Split PDF", href: "/split" }
            ]}
            extraSections={[
              {
                title: "Extract Images vs Convert to Images",
                content: "Understanding the difference helps you choose the right tool for your needs.",
                items: [
                  "Extract Images: Gets embedded photos, graphics, and logos from within the PDF",
                  "PDF to JPG/PNG: Converts entire PDF pages into image files",
                  "Use Extract Images when you need specific graphics from a PDF",
                  "Use PDF to JPG when you want each page as a complete image",
                  "Both tools preserve original quality"
                ]
              },
              {
                title: "Common Use Cases",
                content: "Our image extractor is popular with professionals and creatives:",
                items: [
                  "Designers extracting logos and graphics for projects",
                  "Marketers recovering images from brochures and catalogs",
                  "Researchers saving diagrams and charts from papers",
                  "Content creators repurposing images for new materials",
                  "Archivists preserving embedded photos from documents",
                  "Anyone needing to reuse images from PDF files"
                ]
              }
            ]}
            exampleTable={{
              title: "Image Extraction Examples",
              rows: [
                { label: "Product Catalog (50 images)", before: "PDF with product photos", after: "ZIP with 50 images" },
                { label: "Annual Report (20 charts)", before: "Corporate PDF", after: "ZIP with 20 chart images" },
                { label: "Photo Album PDF", before: "Photo collection", after: "All photos as separate files" },
                { label: "Presentation PDF (15 graphics)", before: "Slide deck", after: "ZIP with 15 graphics" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="extract-images" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
