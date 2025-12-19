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

export default function PdfToPngPage() {
  useSEO({
    title: "PDF to PNG Free Online - Convert PDF to Image | PDF HUB 24",
    description: "Convert PDF to PNG free online. Transform PDF pages to high-quality PNG images with transparency. Best free PDF to PNG converter - extract all pages as pictures. No signup.",
    keywords: "pdf to png free, convert pdf to png, pdf to image free, save pdf as png, pdf to png converter free, extract pdf pages as images"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isZipFile, setIsZipFile] = useState(true);
  const [filename, setFilename] = useState("images.zip");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const { blob, contentType, responseFilename } = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-png", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF");
        }

        const contentType = response.headers.get("Content-Type") || "";
        const disposition = response.headers.get("Content-Disposition") || "";
        const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        const responseFilename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : "download";
        
        const blob = await response.blob();
        
        return { blob, contentType, responseFilename };
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setIsZipFile(contentType.includes("zip"));
      setFilename(responseFilename);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to PNG successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = filename;
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to PNG</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert each page of your PDF into high-quality PNG images with transparent background support. Single-page PDFs download as PNG, multi-page as ZIP.
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
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to PNG
              </Button>
            )}

            {status === "processing" && (
              <ProcessingState 
                status="processing"
                message="Converting PDF to PNG images..." 
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
                    {isZipFile 
                      ? "Your PNG images are ready for download as a ZIP file."
                      : "Your PNG image is ready for download."}
                  </p>
                  <Button onClick={handleDownload} size="lg" data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download {isZipFile ? "ZIP" : "PNG"}
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
            toolName="PDF to PNG Converter"
            toolId="pdf-to-png"
            toolDescription="Our PDF to PNG converter transforms your PDF documents into high-quality PNG images with lossless compression. PNG format supports transparent backgrounds and maintains crisp edges, making it ideal for graphics, logos, diagrams, and images that require pixel-perfect quality. Each page becomes a separate PNG file at high resolution (up to 2048px), perfect for professional use."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Click the 'Convert to PNG' button to start the conversion process.",
              "Wait for the processing to complete — a progress bar shows the status.",
              "Download your PNG images (single file or ZIP archive for multiple pages)."
            ]}
            benefits={[
              "High-quality PNG output with lossless compression",
              "Transparent background support for graphics",
              "Perfect for presentations, web use, and editing",
              "Fast cloud-based conversion in seconds",
              "No software installation required",
              "Crisp edges preserved for text and diagrams",
              "Works with any PDF document type",
              "Multi-page PDFs packaged in convenient ZIP files",
              "No registration or hidden fees"
            ]}
            faqs={[
              {
                question: "What's the difference between PNG and JPG?",
                answer: "PNG supports transparent backgrounds and uses lossless compression, making it better for graphics, logos, text, and diagrams where crisp edges matter. JPG uses lossy compression which is better for photographs and images where small quality loss is acceptable for smaller file sizes."
              },
              {
                question: "Can I convert multiple PDF pages to PNG?",
                answer: "Yes! Multi-page PDFs are converted to individual PNG files and downloaded as a convenient ZIP archive. Single-page PDFs download directly as a PNG file without zipping."
              },
              {
                question: "What resolution are the PNG images?",
                answer: "Our converter produces high-resolution PNG images at up to 2048px maximum dimension, ensuring excellent quality for any use case including print, web, and professional presentations."
              },
              {
                question: "Will my PNG have a transparent background?",
                answer: "PNG format supports transparency, but the resulting transparency depends on your original PDF. If your PDF has a white background, the PNG will also have a white background. PDFs with actual transparency will maintain it in the PNG output."
              },
              {
                question: "Why choose PNG over JPG?",
                answer: "Choose PNG when you need transparent backgrounds, lossless quality, or are working with graphics, logos, and text. Choose JPG for photographs where smaller file sizes are more important than pixel-perfect quality."
              }
            ]}
            keywords={["pdf to png", "convert pdf to png", "pdf to image lossless", "pdf pages to png", "transparent pdf images"]}
            relatedLinks={[
              { text: "Convert to JPG format using PDF to JPG", href: "/pdf-to-jpg" },
              { text: "Extract embedded images using Extract Images", href: "/extract-images" },
              { text: "Convert PNG back to PDF using PNG to PDF", href: "/png-to-pdf" },
              { text: "Select specific pages using Split PDF", href: "/split" }
            ]}
            extraSections={[
              {
                title: "When to Use PNG vs JPG",
                content: "Choosing the right format ensures the best quality and file size for your needs.",
                items: [
                  "Use PNG for graphics, logos, and diagrams",
                  "Use PNG when you need transparent backgrounds",
                  "Use PNG for screenshots and text-heavy images",
                  "Use JPG for photographs and natural images",
                  "Use PNG for professional design work"
                ]
              },
              {
                title: "Common Use Cases for PDF to PNG",
                content: "Our PDF to PNG converter is ideal for various professional and personal needs:",
                items: [
                  "Designers extracting graphics from PDF portfolios",
                  "Web developers adding document content to websites",
                  "Marketers creating social media graphics",
                  "Educators preparing teaching materials",
                  "Professionals sharing document pages in presentations",
                  "Anyone needing high-quality document images"
                ]
              }
            ]}
            exampleTable={{
              title: "PDF to PNG Conversion Output",
              rows: [
                { label: "Logo PDF", before: "Vector PDF", after: "Crisp PNG with transparency" },
                { label: "Diagram (1 page)", before: "Technical drawing", after: "High-res PNG image" },
                { label: "Presentation (10 slides)", before: "10 pages", after: "ZIP with 10 PNGs" },
                { label: "Infographic", before: "Graphics-heavy PDF", after: "Lossless PNG output" }
              ]
            }}
          />

          <RelatedTools currentToolId="pdf-to-png" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
