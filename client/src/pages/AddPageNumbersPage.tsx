import { useState } from "react";
import { ChevronLeft, Download, Hash } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export default function AddPageNumbersPage() {
  useSEO({
    title: "Add Page Numbers to PDF Online Free | PDF HUB 24",
    description: "Add page numbers to your PDF documents for free. Choose position, starting number, and font size. Easy online PDF page numbering tool.",
    keywords: "add page numbers pdf, pdf page numbers, number pdf pages, page numbering pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState("1");
  const [fontSize, setFontSize] = useState("12");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleAddNumbers = async () => {
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
    formData.append("position", position);
    formData.append("startNumber", startNumber);
    formData.append("fontSize", fontSize);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/add-page-numbers", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to add page numbers");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Page numbers added successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to add page numbers. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "numbered.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Add Page Numbers</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Add page numbers to every page of your PDF document.
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
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Page Number Options
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select value={position} onValueChange={(v) => setPosition(v as Position)}>
                      <SelectTrigger data-testid="select-position">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-center">Top Center</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-center">Bottom Center</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startNumber">Start Number</Label>
                    <Input
                      id="startNumber"
                      type="number"
                      min="1"
                      value={startNumber}
                      onChange={(e) => setStartNumber(e.target.value)}
                      data-testid="input-start-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Input
                      id="fontSize"
                      type="number"
                      min="8"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      data-testid="input-font-size"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddNumbers} 
                  className="w-full"
                  size="lg"
                  data-testid="button-add-numbers"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Add Page Numbers
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Adding page numbers..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your numbered PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF with Page Numbers
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Add Page Numbers to PDF"
            toolId="add-page-numbers"
            toolDescription="Add professional page numbers to your PDF documents with our free online tool. Choose from six position options (top or bottom, left, center, or right), set a custom starting number, and adjust the font size to match your document style. Perfect for reports, manuscripts, legal documents, academic papers, and any multi-page PDFs that need clear page identification for printing or navigation."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Choose the position for page numbers from six options (top/bottom, left/center/right).",
              "Set the starting page number and adjust the font size as needed.",
              "Click 'Add Page Numbers' and download your professionally numbered PDF."
            ]}
            benefits={[
              "Six flexible position options for page numbers",
              "Customizable starting number for any sequence",
              "Adjustable font size (8pt to 24pt) for any document style",
              "Numbers added to every page automatically",
              "Professional Helvetica font for clean appearance",
              "Works with any PDF document regardless of size",
              "Fast processing even for lengthy documents",
              "No watermarks added to your numbered PDF",
              "Perfect for professional and academic documents"
            ]}
            faqs={[
              {
                question: "Can I start page numbering from a specific number other than 1?",
                answer: "Yes! Use the 'Start Number' field to set any starting number. This is useful when your PDF is part of a larger document, such as a chapter starting at page 25. The numbers will continue sequentially from your chosen starting point."
              },
              {
                question: "What font and style are used for page numbers?",
                answer: "We use Helvetica, a universally compatible and professional-looking font that works well with virtually any document type. The numbers appear clean and readable at all supported sizes from 8pt to 24pt."
              },
              {
                question: "Can I add 'Page X of Y' format instead of simple numbers?",
                answer: "Currently we support simple sequential numbering (1, 2, 3...). This format is the most widely used and compatible. More complex formats like 'Page X of Y' may be added in future updates."
              },
              {
                question: "What if page numbers overlap with my existing content?",
                answer: "Page numbers are placed in the document margins. If your PDF has very small margins or content that extends near the edges, try selecting a different position or reducing the font size. Bottom-center placement typically has the best compatibility."
              },
              {
                question: "Can I remove page numbers after adding them?",
                answer: "Page numbers become permanently embedded in the PDF content. To remove them, you would need to use your original un-numbered document. We recommend keeping a backup of your original file before adding page numbers."
              }
            ]}
            keywords={["add page numbers pdf", "pdf pagination tool", "number pdf pages", "pdf page numbering", "insert page numbers"]}
            relatedLinks={[
              { text: "Add watermark for branding or protection", href: "/add-watermark" },
              { text: "Reorder pages before numbering", href: "/reorder-pages" },
              { text: "Delete unwanted pages first", href: "/delete-pages" },
              { text: "Compress PDF after adding numbers", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "When to Add Page Numbers to PDFs",
                content: "Page numbering is essential for many document types:",
                items: [
                  "Academic papers and dissertations for easy reference",
                  "Legal documents requiring specific page citations",
                  "Business reports and proposals for professional presentation",
                  "Manuscripts and book drafts for editing and review",
                  "Training manuals and guides for quick navigation",
                  "Multi-page contracts and agreements"
                ]
              },
              {
                title: "Choosing the Best Position for Page Numbers",
                content: "Select the optimal placement based on your document type:",
                items: [
                  "Bottom-center: Most common, works for nearly all documents",
                  "Bottom-right: Standard for reports and formal documents",
                  "Top-right: Good for legal documents and manuscripts",
                  "Top-center: Suitable for academic papers and books",
                  "Bottom-left: Alternative when right side has binding margin",
                  "Top-left: Less common, used for specific formatting needs"
                ]
              }
            ]}
            exampleTable={{
              title: "Page Number Position Examples",
              rows: [
                { label: "Business Report", before: "No page numbers", after: "Bottom-right, size 12" },
                { label: "Academic Paper", before: "Unnumbered draft", after: "Top-right, size 10" },
                { label: "Legal Document", before: "No pagination", after: "Bottom-center, size 11" },
                { label: "Book Chapter (starts at 45)", before: "Start number: 45", after: "Pages 45, 46, 47..." }
              ]
            }}
          />
          
          <RelatedTools currentToolId="add-page-numbers" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
