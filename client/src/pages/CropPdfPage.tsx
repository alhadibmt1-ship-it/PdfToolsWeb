import { useState } from "react";
import { ChevronLeft, Download, Crop } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function CropPdfPage() {
  useSEO({
    title: "Crop PDF Free Online - Trim PDF Margins | PDF HUB 24",
    description: "Crop PDF free. Remove white margins, trim PDF pages. Best free PDF cropper - cut unwanted borders. No signup.",
    keywords: "crop pdf free, trim pdf, remove pdf margins, pdf cropper free, cut pdf borders, resize pdf pages free"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [margins, setMargins] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleCrop = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to crop",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("top", margins.top.toString());
    formData.append("right", margins.right.toString());
    formData.append("bottom", margins.bottom.toString());
    formData.append("left", margins.left.toString());

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/crop-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to crop PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF cropped successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to crop PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "cropped.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Crop PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Remove unwanted margins or trim your PDF pages to specific dimensions. Perfect for removing white space.
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
                  <Crop className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Crop Settings (in points, 72 points = 1 inch)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="top">Top Margin</Label>
                    <Input
                      id="top"
                      type="number"
                      min={0}
                      value={margins.top}
                      onChange={(e) => setMargins({...margins, top: parseInt(e.target.value) || 0})}
                      data-testid="input-top"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bottom">Bottom Margin</Label>
                    <Input
                      id="bottom"
                      type="number"
                      min={0}
                      value={margins.bottom}
                      onChange={(e) => setMargins({...margins, bottom: parseInt(e.target.value) || 0})}
                      data-testid="input-bottom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="left">Left Margin</Label>
                    <Input
                      id="left"
                      type="number"
                      min={0}
                      value={margins.left}
                      onChange={(e) => setMargins({...margins, left: parseInt(e.target.value) || 0})}
                      data-testid="input-left"
                    />
                  </div>
                  <div>
                    <Label htmlFor="right">Right Margin</Label>
                    <Input
                      id="right"
                      type="number"
                      min={0}
                      value={margins.right}
                      onChange={(e) => setMargins({...margins, right: parseInt(e.target.value) || 0})}
                      data-testid="input-right"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the amount to trim from each edge. Use 72 points for 1 inch, or 28 points for 1 cm.
                </p>
                <Button 
                  onClick={handleCrop} 
                  className="w-full"
                  size="lg"
                  data-testid="button-crop"
                >
                  Crop PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Cropping your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your cropped PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cropped PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Crop PDF"
            toolId="crop-pdf"
            toolDescription="Trim unwanted margins, white space, and borders from your PDF documents with our free online PDF cropping tool. Precisely remove excess space from all four edges of every page in your document with custom measurements. Perfect for removing printer margins from scanned documents, focusing on specific content areas, preparing PDFs for presentations, or optimizing documents for digital viewing on screens and mobile devices."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Enter the amount (in points) to crop from each edge: top, bottom, left, and right margins.",
              "Click the 'Crop PDF' button to apply the crop settings to all pages uniformly.",
              "Download your cropped PDF with reduced margins and optimized page dimensions."
            ]}
            benefits={[
              "Remove unwanted margins and white borders from PDFs",
              "Trim excess white space from scanned documents",
              "Crop all pages uniformly with one click",
              "Precise control with point-based measurements",
              "Reduce visual page dimensions for better presentation",
              "Optimize PDFs for screen viewing and mobile devices",
              "Prepare documents for embedding in presentations",
              "No software installation required",
              "Completely free with no registration needed"
            ]}
            faqs={[
              {
                question: "What units are used for cropping measurements?",
                answer: "We use points (pt) as the unit of measurement, which is the standard unit in PDF documents. For reference: 72 points equals 1 inch, and approximately 28.35 points equals 1 centimeter. For example, to crop half an inch from each side, enter 36 points."
              },
              {
                question: "Will cropping affect all pages in my PDF?",
                answer: "Yes, the crop settings you specify are applied uniformly to all pages in your PDF document. This ensures consistent margins and dimensions throughout the entire document, which is ideal for multi-page documents like reports, books, or presentations."
              },
              {
                question: "Can I undo the cropping after downloading?",
                answer: "The cropping is permanent on the downloaded file, but your original uploaded file remains unchanged on your device. Always keep a backup of your original document before cropping. If you need to try different crop settings, simply upload the original file again."
              },
              {
                question: "Does cropping reduce the PDF file size?",
                answer: "Cropping changes the visible area of pages but may not significantly reduce file size because the underlying content data is often still stored in the PDF. For substantial file size reduction, we recommend using our Compress PDF tool after cropping."
              },
              {
                question: "How do I know how much to crop from my PDF?",
                answer: "Start with small values (like 20-40 points) and preview the result. Standard PDF pages are typically 612x792 points (Letter) or 595x842 points (A4). For scanned documents with large white borders, you might need 50-100 points. Experiment to find the optimal settings for your document."
              }
            ]}
            keywords={["crop pdf online", "trim pdf margins", "remove white space pdf", "pdf cropper free", "cut pdf borders"]}
            relatedLinks={[
              { text: "Change page dimensions using Resize PDF", href: "/resize-pdf" },
              { text: "Remove unwanted pages using Delete Pages", href: "/delete-pages" },
              { text: "Reduce file size using Compress PDF", href: "/compress" },
              { text: "Rotate pages if needed using Rotate PDF", href: "/rotate" }
            ]}
            extraSections={[
              {
                title: "Why Crop PDF Pages?",
                content: "Cropping PDF pages helps optimize your documents for various use cases. Here are common reasons to trim your PDFs:",
                items: [
                  "Remove scanner borders from scanned documents",
                  "Eliminate printer margins for cleaner presentation",
                  "Focus on specific content areas in documents",
                  "Prepare PDFs for embedding in PowerPoint presentations",
                  "Optimize documents for mobile device viewing",
                  "Remove headers/footers from pages"
                ]
              },
              {
                title: "Cropping Tips and Measurement Guide",
                content: "Use these guidelines to determine the right crop amounts for your documents:",
                items: [
                  "72 points = 1 inch (use for documents with inch-based margins)",
                  "28 points = approximately 1 cm (use for metric measurements)",
                  "Start with 36 points (0.5 inch) for typical scanner borders",
                  "Use 18 points (0.25 inch) for minor margin adjustments",
                  "Standard letter page is 612 x 792 points",
                  "Standard A4 page is 595 x 842 points"
                ]
              }
            ]}
            exampleTable={{
              title: "Common PDF Cropping Scenarios",
              rows: [
                { label: "Scanned document", before: "Large white borders", after: "Clean edges" },
                { label: "Book pages", before: "Wide margins", after: "Content-focused" },
                { label: "Presentation slides", before: "Excess padding", after: "Optimized view" },
                { label: "Mobile reading", before: "Wasted screen space", after: "Full content display" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="crop-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
