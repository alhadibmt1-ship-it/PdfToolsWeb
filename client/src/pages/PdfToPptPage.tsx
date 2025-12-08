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

export default function PdfToPptPage() {
  useSEO({
    title: "PDF to PowerPoint Converter - Free Online PDF to PPT | PDF HUB 24",
    description: "Convert PDF to PowerPoint (PPTX) online for free. Transform PDF documents into editable presentation slides. Fast, secure PDF to PPT conversion.",
    keywords: "pdf to powerpoint, pdf to ppt, convert pdf to pptx, pdf converter, pdf to slides, online pdf converter"
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
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    addRecentTool("pdf-to-ppt");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-ppt", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "PDF converted to PowerPoint successfully",
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
      a.download = "converted.pptx";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to PowerPoint</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your PDF document to an editable PowerPoint (PPTX) presentation. Perfect for creating slides from PDF content.
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
                Convert to PowerPoint
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting PDF to PowerPoint..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your PowerPoint is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PPTX File
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="PDF to PowerPoint Converter"
            toolId="pdf-to-ppt"
            toolDescription="Our PDF to PowerPoint converter transforms your PDF documents into fully editable Microsoft PowerPoint (PPTX) presentations. Each PDF page becomes a slide, preserving layouts, images, and text for easy editing and presentation."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Wait while our server processes and converts your document to PowerPoint format.",
              "Click the download button to save your new PowerPoint (PPTX) file to your device.",
              "Open the file in Microsoft PowerPoint or Google Slides to edit and present."
            ]}
            benefits={[
              "Convert PDF pages to editable slides instantly",
              "Preserve original layouts and images",
              "Edit content directly in PowerPoint",
              "Works with complex multi-page documents",
              "Completely free with no registration required",
              "Process files securely with automatic deletion",
              "Compatible with PowerPoint, Google Slides, and Keynote"
            ]}
            faqs={[
              {
                question: "Is the PDF to PowerPoint conversion free?",
                answer: "Yes, PDF HUB 24's PDF to PowerPoint converter is completely free to use. There are no hidden fees, subscriptions, or registration required."
              },
              {
                question: "Will the formatting be preserved?",
                answer: "Our converter preserves the original layout including images, text positioning, and colors. Each PDF page becomes a separate slide in the PowerPoint presentation."
              },
              {
                question: "What file formats are supported?",
                answer: "We accept standard PDF files and output PowerPoint PPTX format, which is compatible with Microsoft PowerPoint 2007 and later, as well as Google Slides and Apple Keynote."
              }
            ]}
          />

          <RelatedTools currentToolId="pdf-to-ppt" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="PDF to PowerPoint"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
