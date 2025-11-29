import { useState } from "react";
import { ChevronLeft, Download, Maximize2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

const PAGE_SIZES = [
  { value: "a4", label: "A4 (210 × 297 mm)", width: 595, height: 842 },
  { value: "letter", label: "Letter (8.5 × 11 in)", width: 612, height: 792 },
  { value: "legal", label: "Legal (8.5 × 14 in)", width: 612, height: 1008 },
  { value: "a3", label: "A3 (297 × 420 mm)", width: 842, height: 1191 },
  { value: "a5", label: "A5 (148 × 210 mm)", width: 420, height: 595 },
  { value: "tabloid", label: "Tabloid (11 × 17 in)", width: 792, height: 1224 },
];

export default function ResizePdfPage() {
  useSEO({
    title: "Resize PDF Online Free - Change PDF Page Size | PDF HUB 24",
    description: "Resize PDF pages to different paper sizes online for free. Change PDF to A4, Letter, Legal, A3, and more. Fast, secure PDF resizing tool.",
    keywords: "resize pdf, change pdf size, pdf page size, resize pdf pages, pdf to a4, pdf to letter"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState("a4");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleResize = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to resize",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const selectedSize = PAGE_SIZES.find(s => s.value === pageSize);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("width", selectedSize?.width.toString() || "595");
    formData.append("height", selectedSize?.height.toString() || "842");

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/resize-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to resize PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF resized successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to resize PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "resized.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resize PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Change your PDF page size to standard paper sizes like A4, Letter, Legal, and more.
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
                <div className="flex items-center gap-2 mb-2">
                  <Maximize2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Select Page Size</h3>
                </div>
                <div>
                  <Label htmlFor="pageSize">Target Page Size</Label>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-full" data-testid="select-size">
                      <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZES.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  Content will be scaled to fit the new page size while maintaining aspect ratio.
                </p>
                <Button 
                  onClick={handleResize} 
                  className="w-full"
                  size="lg"
                  data-testid="button-resize"
                >
                  Resize PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Resizing your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your resized PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resized PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Resize PDF"
            toolDescription="Change the page size of your PDF documents with our free online PDF resizing tool. Convert PDFs between different standard paper sizes including A4, Letter, Legal, A3, A5, and Tabloid. Perfect for printing preparation or document standardization."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Select your desired target page size from the dropdown.",
              "Click the Resize PDF button to process all pages.",
              "Download your resized PDF document."
            ]}
            benefits={[
              "Convert between standard paper sizes",
              "Supports A4, Letter, Legal, A3, A5, Tabloid",
              "Maintains content proportions",
              "All pages resized uniformly",
              "Perfect for print preparation",
              "Standardize document sizes",
              "No software installation required",
              "Free with no registration"
            ]}
            faqs={[
              {
                question: "Will my content be distorted?",
                answer: "No, the content is scaled proportionally to fit the new page size while maintaining the original aspect ratio. Some additional margins may appear if the proportions differ."
              },
              {
                question: "What page sizes are available?",
                answer: "We support common paper sizes: A4, A3, A5, Letter, Legal, and Tabloid. These cover most printing and document needs."
              },
              {
                question: "Does resizing affect all pages?",
                answer: "Yes, all pages in your PDF are resized to the selected paper size uniformly."
              },
              {
                question: "Can I resize a PDF for printing?",
                answer: "Absolutely! This tool is perfect for converting documents to your printer's paper size, like converting Letter to A4 or vice versa."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["resize pdf", "change pdf size", "pdf to a4", "pdf page size"]}
          />
          
          <RelatedTools currentToolId="resize-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
