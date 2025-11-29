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
    title: "Convert PDF to Grayscale - Black and White PDF Free | PDF HUB 24",
    description: "Convert color PDF to grayscale online for free. Transform PDF documents to black and white for printing. Fast, secure conversion.",
    keywords: "pdf to grayscale, black and white pdf, convert pdf grayscale, pdf color to bw, grayscale pdf converter"
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
            toolDescription="Convert your color PDF documents to grayscale with our free online tool. Transform colorful PDFs into black and white versions perfect for printing or reducing visual complexity. Save ink and create print-friendly documents instantly."
            howToSteps={[
              "Upload your color PDF file by clicking the upload area or dragging and dropping.",
              "Click the Convert to Grayscale button.",
              "Wait while we process all pages in your document.",
              "Download your grayscale PDF document."
            ]}
            benefits={[
              "Convert color PDFs to black and white",
              "Save ink when printing documents",
              "Reduce visual distractions in documents",
              "Create print-friendly versions",
              "All pages converted uniformly",
              "Maintains text and image clarity",
              "No software installation required",
              "Completely free with no limits"
            ]}
            faqs={[
              {
                question: "Will text remain readable?",
                answer: "Yes, all text remains perfectly readable. The conversion only affects colors, converting them to appropriate grayscale shades."
              },
              {
                question: "Are images converted too?",
                answer: "Yes, all images in the PDF are converted to grayscale along with any colored text or graphics."
              },
              {
                question: "Will this reduce file size?",
                answer: "Grayscale conversion may slightly reduce file size since color information is removed, but for significant size reduction, use our Compress PDF tool."
              },
              {
                question: "Can I convert back to color?",
                answer: "No, grayscale conversion is one-way. Keep your original color PDF if you need to preserve colors."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["pdf to grayscale", "black white pdf", "convert pdf bw", "grayscale converter"]}
          />
          
          <RelatedTools currentToolId="grayscale-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
