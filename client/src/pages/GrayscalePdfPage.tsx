import { useState } from "react";
import { ChevronLeft, Download, Contrast } from "lucide-react";
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

export default function GrayscalePdfPage() {
  useSEO({
    title: "PDF to Grayscale Free - Black and White | PDF HUB 24",
    description: "Convert PDF to grayscale free. Change color PDF to black and white for printing. Best free PDF to B&W converter. No signup.",
    keywords: "pdf to grayscale free, black and white pdf, convert pdf grayscale free, pdf to bw, grayscale pdf converter free",
    canonicalPath: "/grayscale-pdf"
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
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/grayscale-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF to grayscale");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to grayscale successfully",
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
      a.download = "grayscale.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to Grayscale</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your color PDF documents to grayscale (black and white). Perfect for saving ink when printing.
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
                  <Contrast className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready to Convert</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All colors in your PDF will be converted to grayscale shades.
                </p>
                <Button 
                  onClick={handleConvert} 
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  Convert to Grayscale
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting PDF to grayscale..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your grayscale PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Grayscale PDF
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
                  Convert Another PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="PDF to Grayscale Converter"
            toolId="grayscale-pdf"
            toolDescription="Convert your color PDF documents to professional grayscale (black and white) with our free online tool. Transform colorful PDFs into print-friendly versions that save ink and toner costs while maintaining excellent text clarity and image quality. Perfect for office printing, document archiving, reducing visual distractions in study materials, or preparing documents that need to look professional without color."
            howToSteps={[
              "Upload your color PDF file by clicking the upload area or dragging and dropping your document.",
              "Click the 'Convert to Grayscale' button to start the conversion process.",
              "Wait while our tool processes all pages, converting colors to appropriate gray shades.",
              "Download your grayscale PDF — ready for economical printing or professional use."
            ]}
            benefits={[
              "Convert all colors to professional grayscale shades",
              "Save up to 50% on ink and toner costs when printing",
              "Reduce visual distractions in study and work documents",
              "Create uniform, professional-looking documents",
              "All pages converted consistently and uniformly",
              "Maintain text sharpness and image clarity",
              "Prepare documents for black-and-white printing",
              "Reduce file size slightly by removing color data",
              "Free with no registration or usage limits"
            ]}
            faqs={[
              {
                question: "Will text remain clear and readable after conversion?",
                answer: "Absolutely. Text remains perfectly sharp and readable after grayscale conversion. Black text stays black, and colored text is converted to appropriate gray shades that maintain good contrast and legibility. The conversion optimizes for readability, so even light-colored text becomes visible in grayscale."
              },
              {
                question: "Are images and graphics converted to grayscale too?",
                answer: "Yes, all visual elements in the PDF are converted to grayscale, including photographs, charts, diagrams, logos, and any colored graphics. Each color is mapped to an appropriate shade of gray based on its luminosity, preserving the visual structure and detail of the original images."
              },
              {
                question: "Will grayscale conversion reduce my PDF file size?",
                answer: "Grayscale conversion may slightly reduce file size since color channel data is removed, but the reduction is typically modest (10-20%). For significant file size reduction, we recommend using our Compress PDF tool after converting to grayscale for maximum optimization."
              },
              {
                question: "Can I convert the grayscale PDF back to color?",
                answer: "No, grayscale conversion is a one-way process. Once colors are converted to gray shades, the original color information is permanently removed. Always keep a backup copy of your original color PDF if you might need the colored version later."
              },
              {
                question: "What's the difference between grayscale and black-and-white?",
                answer: "Grayscale includes the full spectrum of shades from white through various grays to black (typically 256 levels), which preserves image detail and smooth gradients. True black-and-white (also called 1-bit) uses only pure black and pure white with no grays, which is best for simple line drawings or text documents but loses photographic detail."
              }
            ]}
            keywords={["pdf to grayscale online", "convert pdf black white", "grayscale pdf free", "color to bw pdf", "pdf grayscale converter"]}
            relatedLinks={[
              { text: "Reduce file size using Compress PDF", href: "/compress" },
              { text: "Prepare for printing using Resize PDF", href: "/resize-pdf" },
              { text: "Convert to images using PDF to JPG", href: "/pdf-to-jpg" },
              { text: "Remove unwanted pages using Delete Pages", href: "/delete-pages" }
            ]}
            extraSections={[
              {
                title: "Why Convert PDFs to Grayscale?",
                content: "Grayscale conversion offers practical benefits for many document use cases:",
                items: [
                  "Save significant money on color ink and toner cartridges",
                  "Prepare documents for black-and-white office printers",
                  "Create uniform, professional-looking documentation",
                  "Reduce visual distractions in study materials",
                  "Archive documents with smaller file sizes",
                  "Meet printing requirements for legal or official submissions"
                ]
              },
              {
                title: "Best Use Cases for Grayscale Documents",
                content: "Consider converting these types of documents to grayscale for optimal results:",
                items: [
                  "Office reports and internal documentation",
                  "Legal documents and contracts",
                  "Academic papers and research documents",
                  "Manuals and instructional guides",
                  "Invoice and receipt archives",
                  "Handouts and printed materials for meetings"
                ]
              }
            ]}
            exampleTable={{
              title: "Printing Cost Comparison",
              rows: [
                { label: "10-page color report", before: "Color printing", after: "50% ink savings" },
                { label: "50-page manual", before: "Expensive color", after: "Economical B&W" },
                { label: "Photo-heavy document", before: "Full color images", after: "Clear grayscale" },
                { label: "Presentation handout", before: "Color slides", after: "Professional gray" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="grayscale-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
