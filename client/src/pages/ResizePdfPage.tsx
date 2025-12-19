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
    title: "Resize PDF Free Online - Change PDF Page Size to A4 | PDF HUB 24",
    description: "Resize PDF free online. Change PDF page size to A4, Letter, Legal instantly. Best free PDF resizer - scale pages, adjust dimensions. No signup required.",
    keywords: "resize pdf free, change pdf size, pdf to a4 size, resize pdf pages free, pdf page size changer, scale pdf"
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
            toolId="resize-pdf"
            toolDescription="Change the page dimensions of your PDF documents to any standard paper size with our free online PDF resizing tool. Convert PDFs between A4, Letter, Legal, A3, A5, and Tabloid sizes with automatic content scaling to fit the new dimensions. Perfect for preparing documents for specific printers, standardizing page sizes across multiple documents, or converting international document formats for local printing requirements."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Select your desired target page size from the dropdown menu (A4, Letter, Legal, A3, A5, or Tabloid).",
              "Click the 'Resize PDF' button to scale and reformat all pages to the new dimensions.",
              "Download your resized PDF document ready for printing or sharing."
            ]}
            benefits={[
              "Convert between all standard international paper sizes",
              "Supports A4, A3, A5, Letter, Legal, and Tabloid formats",
              "Content scales proportionally without distortion",
              "All pages resized uniformly for consistency",
              "Perfect for print preparation and standardization",
              "Convert US Letter to A4 for international use",
              "Prepare large format prints with A3 or Tabloid",
              "No software installation required",
              "Completely free with no registration needed"
            ]}
            faqs={[
              {
                question: "Will my content be distorted when resizing?",
                answer: "No, the content is scaled proportionally to fit the new page size while maintaining the original aspect ratio. Since different paper sizes have slightly different proportions (e.g., Letter vs A4), small margins may appear on some edges to preserve the correct proportions of your content."
              },
              {
                question: "What page sizes are available for resizing?",
                answer: "We support the most common standard paper sizes: A4 (210x297mm - international standard), A3 (297x420mm - large format), A5 (148x210mm - half of A4), Letter (8.5x11in - US standard), Legal (8.5x14in - US legal), and Tabloid (11x17in - large US format). These sizes cover virtually all printing and document needs worldwide."
              },
              {
                question: "Does resizing affect all pages in my document?",
                answer: "Yes, all pages in your PDF are resized uniformly to the selected paper size. This ensures consistency throughout your entire document, which is essential for professional printing and document management."
              },
              {
                question: "Can I resize a PDF for a specific printer?",
                answer: "Absolutely! This tool is perfect for preparing documents to match your printer's paper size. For example, if you receive a US Letter document but use A4 paper, you can resize it for perfect printing without manual scaling adjustments."
              },
              {
                question: "What's the difference between resizing and cropping a PDF?",
                answer: "Resizing changes the entire page dimensions and scales the content to fit the new size, while cropping removes portions of the page from the edges without scaling the remaining content. Use resize for changing paper sizes, and crop for removing margins or borders."
              }
            ]}
            keywords={["resize pdf online", "change pdf page size", "convert pdf to a4", "pdf letter to a4", "resize pdf free"]}
            relatedLinks={[
              { text: "Remove margins using Crop PDF", href: "/crop-pdf" },
              { text: "Reduce file size using Compress PDF", href: "/compress" },
              { text: "Rotate pages if needed using Rotate PDF", href: "/rotate" },
              { text: "Prepare for printing using PDF to JPG", href: "/pdf-to-jpg" }
            ]}
            extraSections={[
              {
                title: "When to Resize PDF Documents",
                content: "PDF resizing is essential for various professional and personal document management scenarios:",
                items: [
                  "Convert US documents (Letter) to international format (A4)",
                  "Prepare documents for specific printer paper trays",
                  "Standardize page sizes across merged documents",
                  "Create large format prints from standard documents",
                  "Reduce to A5 for compact printing or booklets",
                  "Prepare legal documents on proper Legal paper size"
                ]
              },
              {
                title: "Paper Size Reference Guide",
                content: "Understanding paper sizes helps you choose the right format for your needs:",
                items: [
                  "A4 (210×297mm / 8.27×11.69in) - Standard international size",
                  "Letter (8.5×11in / 216×279mm) - Standard US size",
                  "Legal (8.5×14in / 216×356mm) - US legal documents",
                  "A3 (297×420mm / 11.69×16.54in) - Large posters, drawings",
                  "A5 (148×210mm / 5.83×8.27in) - Booklets, small prints",
                  "Tabloid (11×17in / 279×432mm) - US large format"
                ]
              }
            ]}
            exampleTable={{
              title: "Common PDF Resize Scenarios",
              rows: [
                { label: "US to International", before: "Letter (8.5×11in)", after: "A4 (210×297mm)" },
                { label: "International to US", before: "A4 (210×297mm)", after: "Letter (8.5×11in)" },
                { label: "Large Format Print", before: "A4 standard", after: "A3 poster size" },
                { label: "Compact Booklet", before: "A4 full size", after: "A5 half size" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="resize-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
