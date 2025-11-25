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

export default function WordToPdfPage() {
  useSEO({
    title: "Word to PDF Converter - Convert DOCX to PDF Online Free | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF online for free. Fast Word to PDF conversion with preserved formatting. Secure and easy to use. No registration required.",
    keywords: "word to pdf, docx to pdf, convert word to pdf, doc to pdf, word document to pdf converter"
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
        description: "Please select a Word file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/word-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert Word document");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Word document converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert Word document. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Word to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your Word documents (DOCX) to PDF format. Perfect for sharing and preserving formatting.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".docx"
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
              message={status === "processing" ? "Converting Word to PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your PDF is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  Your Word document has been successfully converted to PDF format.
                </p>
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
            toolName="Word to PDF Converter"
            toolDescription="Convert your Microsoft Word documents (DOCX) to universally compatible PDF format with our free online converter. Perfect for sharing documents while preserving formatting, creating print-ready files, or ensuring your documents look the same on any device. Our tool processes your Word file instantly with no software installation required."
            howToSteps={[
              "Upload your Word document (.docx file) by clicking the upload area or dragging it in.",
              "Wait a few seconds while our server converts your document to PDF format.",
              "Click the download button to save your new PDF file.",
              "Open your PDF in any PDF viewer - it's ready to share or print."
            ]}
            benefits={[
              "Preserve fonts, images, and formatting from Word",
              "Create universally readable PDF documents",
              "Perfect for professional document sharing",
              "Ideal for creating print-ready files",
              "Works with DOCX files from any version of Word",
              "Fast conversion - usually under 10 seconds",
              "No quality loss during conversion",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "What Word formats are supported?",
                answer: "Our converter supports DOCX format (Microsoft Word 2007 and later). This is the standard format for modern Word documents. Older DOC files should first be opened in Word and saved as DOCX."
              },
              {
                question: "Will my formatting be preserved?",
                answer: "Yes, our converter preserves your document's formatting including fonts, images, tables, headers, and page layouts. The PDF will look just like your original Word document."
              },
              {
                question: "Is there a page limit?",
                answer: "No, you can convert Word documents of any length. Multi-page documents with complex formatting are fully supported."
              },
              {
                question: "Can I convert multiple Word files to PDF?",
                answer: "Currently, you can convert one file at a time. For multiple documents, simply repeat the process for each file you need to convert."
              },
              {
                question: "Are my documents kept private?",
                answer: "Absolutely. Your documents are processed securely and deleted immediately after conversion. We never store, view, or share your files."
              }
            ]}
            keywords={["convert word to pdf", "docx to pdf online", "word document to pdf"]}
          />
          
          <RelatedTools currentToolId="word-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
