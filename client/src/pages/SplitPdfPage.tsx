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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function SplitPdfPage() {
  useSEO({
    title: "Split PDF Online Free - Extract Pages from PDF | PDF HUB 24",
    description: "Split PDF files online for free. Extract specific pages or page ranges from your PDF documents. Fast, secure, and easy to use. No registration required.",
    keywords: "split pdf, extract pdf pages, divide pdf, split pdf online free, pdf splitter, separate pdf pages"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleSplit = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to split",
        variant: "destructive",
      });
      return;
    }

    if (startPage < 1 || endPage < startPage) {
      toast({
        title: "Invalid page range",
        description: "Please enter a valid page range",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("startPage", startPage.toString());
    formData.append("endPage", endPage.toString());

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/split", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to split PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF split successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to split PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = `split-pages-${startPage}-${endPage}.pdf`;
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Split PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Extract specific pages from your PDF document by specifying a page range.
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
                <h3 className="font-semibold mb-4">Page Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-page">Start Page</Label>
                    <Input
                      id="start-page"
                      type="number"
                      min="1"
                      value={startPage}
                      onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                      data-testid="input-start-page"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-page">End Page</Label>
                    <Input
                      id="end-page"
                      type="number"
                      min="1"
                      value={endPage}
                      onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                      data-testid="input-end-page"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSplit} 
                  className="w-full"
                  size="lg"
                  data-testid="button-split"
                >
                  Split PDF (Pages {startPage} - {endPage})
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Splitting your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your split PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Split PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Split PDF"
            toolDescription="Extract specific pages from your PDF documents with our free online PDF splitter. Whether you need to separate a single chapter, extract a section of a report, or create smaller files from a large document, our tool makes it easy. Simply specify the page range you want and download the extracted pages as a new PDF."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Enter the start page and end page numbers for the range you want to extract.",
              "Click the Split PDF button to process your document.",
              "Download your new PDF containing only the selected pages."
            ]}
            benefits={[
              "Extract any page range from your PDF instantly",
              "Create smaller, focused documents from large files",
              "Perfect for sharing specific sections of a document",
              "Maintain original quality and formatting",
              "Split documents for easier emailing or printing",
              "Works with any PDF regardless of size",
              "No watermarks or limitations",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "How do I split a PDF into individual pages?",
                answer: "To extract single pages, set both the start and end page to the same number. For example, to extract page 5 only, enter 5 for both start and end page."
              },
              {
                question: "Can I split a PDF into multiple parts?",
                answer: "Yes! Simply use the tool multiple times with different page ranges. For example, first extract pages 1-10, then 11-20, and so on to create multiple smaller PDFs."
              },
              {
                question: "Will splitting affect my original PDF?",
                answer: "No, your original file remains unchanged. The tool creates a new PDF with only the selected pages while your original document stays intact."
              },
              {
                question: "What if I don't know how many pages my PDF has?",
                answer: "Our tool will let you know if the page numbers you enter are out of range. You can also check your PDF's page count in any PDF viewer before splitting."
              },
              {
                question: "Is there a limit to how many pages I can extract?",
                answer: "No, you can extract any number of pages from your document. Whether it's a single page or hundreds, our tool handles it efficiently."
              }
            ]}
            keywords={["extract pdf pages", "separate pdf pages", "split pdf into parts"]}
          />
          
          <RelatedTools currentToolId="split" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
