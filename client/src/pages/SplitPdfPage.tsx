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
            toolDescription="Extract specific pages or page ranges from your PDF documents with our free online PDF splitter tool. Whether you need to separate chapters from an eBook, extract specific sections from a lengthy report, or break down a large document into smaller manageable files, PDF HUB 24 makes it simple and fast. Specify exactly which pages you want, and download a clean new PDF in seconds."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping the document.",
              "Enter the start page and end page numbers for the range you want to extract.",
              "Click the 'Split PDF' button to process and create your new document.",
              "Download your extracted PDF containing only the selected pages."
            ]}
            benefits={[
              "Extract any page range from your PDF instantly",
              "Create focused, smaller documents from large files",
              "Perfect for sharing specific sections without sensitive content",
              "Maintain original quality, formatting, and hyperlinks",
              "Reduce file size by removing unnecessary pages",
              "Works with any PDF regardless of page count",
              "No watermarks added to split documents",
              "Secure processing with automatic file deletion",
              "Ideal for email attachments with size limits"
            ]}
            faqs={[
              {
                question: "How do I split a PDF into individual single pages?",
                answer: "To extract a single page, set both the start and end page to the same number. For example, to extract only page 5, enter 5 for both the start page and end page fields. Repeat this process for each page you need as a separate file."
              },
              {
                question: "Can I split a PDF into multiple separate parts at once?",
                answer: "Use the tool multiple times with different page ranges to create multiple PDFs. For example, extract pages 1-10 first, then 11-20, then 21-30 to divide a 30-page document into three equal parts. Each split creates a separate downloadable file."
              },
              {
                question: "Will splitting affect my original PDF file?",
                answer: "No, your original file remains completely unchanged and safe. The split tool creates a brand new PDF containing only the selected pages. Your source document is never modified, so you can always go back to it if needed."
              },
              {
                question: "What happens if I enter page numbers that don't exist?",
                answer: "If you enter page numbers outside the range of your document (like requesting page 100 from a 50-page PDF), you'll receive an error message. The tool validates your input to ensure a successful split every time."
              },
              {
                question: "Is there a limit to how many pages I can extract?",
                answer: "No, you can extract any number of pages from your document. Whether you need a single page or hundreds of consecutive pages, our tool handles it efficiently. Very large extractions may take slightly longer to process."
              }
            ]}
            keywords={["extract pdf pages", "separate pdf pages", "split pdf into parts", "divide pdf document", "pdf page extractor"]}
            relatedLinks={[
              { text: "Merge multiple PDFs into one file", href: "/merge" },
              { text: "Delete specific pages from PDF", href: "/delete-pages" },
              { text: "Reorder pages in your PDF", href: "/reorder-pages" },
              { text: "Compress PDF to reduce file size", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "When Should You Split a PDF?",
                content: "Splitting PDFs is useful in many professional and personal situations:",
                items: [
                  "Extracting specific chapters from an eBook or manual",
                  "Separating invoice pages for individual processing",
                  "Removing confidential sections before sharing",
                  "Creating handouts from a larger presentation",
                  "Breaking large files to meet email attachment limits",
                  "Extracting forms or certificates from document bundles"
                ]
              },
              {
                title: "Tips for Efficient PDF Splitting",
                content: "Get the most out of our PDF splitter with these helpful tips:",
                items: [
                  "Check your page count before splitting using any PDF viewer",
                  "Extract single pages by entering the same number for start and end",
                  "Use multiple splits to create several separate documents",
                  "Combine with our Merge tool to reorganize complex documents",
                  "Use our Compress tool after splitting to further reduce file size",
                  "Preview your original PDF to identify exact page numbers"
                ]
              }
            ]}
            exampleTable={{
              title: "PDF Split Use Case Examples",
              rows: [
                { label: "100-page Report", before: "Full document", after: "Executive Summary (pages 1-5)" },
                { label: "eBook (300 pages)", before: "Complete book", after: "Single chapter (pages 45-72)" },
                { label: "Scanned Contract", before: "20 pages", after: "Signature page only (page 20)" },
                { label: "Training Manual", before: "150 pages", after: "Module 3 (pages 51-75)" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="split" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
