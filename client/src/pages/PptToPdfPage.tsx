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
import { useRecentTools } from "@/contexts/RecentToolsContext";
import SuccessCelebration from "@/components/SuccessCelebration";

export default function PptToPdfPage() {
  useSEO({
    title: "PowerPoint to PDF Converter - Free Online PPT to PDF | PDF HUB 24",
    description: "Convert PowerPoint to PDF online for free. Transform PPT/PPTX presentations into PDF documents. Fast, secure conversion with preserved formatting.",
    keywords: "powerpoint to pdf, ppt to pdf, pptx to pdf, convert slides to pdf, presentation converter"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();
  const { addRecentTool } = useRecentTools();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PowerPoint file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    addRecentTool("ppt-to-pdf");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/ppt-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PowerPoint");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "PowerPoint converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert PowerPoint. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PowerPoint to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your PowerPoint presentations (PPT/PPTX) to PDF format. Perfect for sharing slides as documents.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".ppt,.pptx"
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
                Convert to PDF
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting PowerPoint to PDF..." : undefined}
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
                  Download PDF File
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="PowerPoint to PDF Converter"
            toolId="ppt-to-pdf"
            toolDescription="Convert your Microsoft PowerPoint presentations to PDF format with perfect quality. Our converter preserves all slides, animations placeholders, images, and formatting while creating a universally compatible PDF document."
            howToSteps={[
              "Upload your PowerPoint file (PPT or PPTX) by clicking the upload area or drag and drop.",
              "Wait while our server converts your presentation to PDF format.",
              "Click the download button to save your new PDF file.",
              "Share the PDF with anyone - they don't need PowerPoint to view it."
            ]}
            benefits={[
              "Convert PPT and PPTX files to PDF instantly",
              "Preserve slide layouts and formatting",
              "Share presentations without PowerPoint required",
              "Reduce file size compared to original",
              "Completely free with no registration",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "Is the PowerPoint to PDF conversion free?",
                answer: "Yes, our PowerPoint to PDF converter is completely free with no hidden fees or registration required."
              },
              {
                question: "Will my slides look the same in PDF?",
                answer: "Yes, our converter preserves the layout, images, text, and formatting of your slides. Each slide becomes a page in the PDF."
              },
              {
                question: "What PowerPoint versions are supported?",
                answer: "We support both legacy PPT format and modern PPTX format from all versions of Microsoft PowerPoint."
              }
            ]}
          />

          <RelatedTools currentToolId="ppt-to-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="PowerPoint to PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
