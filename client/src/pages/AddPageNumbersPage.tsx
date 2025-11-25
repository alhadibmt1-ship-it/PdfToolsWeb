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
            toolName="Add Page Numbers"
            toolDescription="Easily add page numbers to your PDF documents with our free online tool. Choose where to place the numbers, customize the starting number, and adjust the font size. Perfect for reports, manuscripts, and any multi-page documents."
            howToSteps={[
              "Upload your PDF file by clicking or dragging.",
              "Choose the position for page numbers (top/bottom, left/center/right).",
              "Set the starting number and font size if needed.",
              "Click Add Page Numbers and download your result."
            ]}
            benefits={[
              "Six position options for page numbers",
              "Customizable starting number",
              "Adjustable font size",
              "Works with any PDF document",
              "Free and easy to use",
              "No registration required",
              "Fast processing",
              "Professional results"
            ]}
            faqs={[
              {
                question: "Can I start numbering from a specific page?",
                answer: "The tool adds numbers to all pages, but you can set any starting number. If you want to skip pages, use our Split PDF tool first to separate the pages you want numbered."
              },
              {
                question: "What font is used for page numbers?",
                answer: "We use Helvetica, a clean and professional font that works well with all types of documents."
              },
              {
                question: "Can I customize the format (like 'Page 1 of 10')?",
                answer: "Currently we support simple numbering (1, 2, 3...). More complex formats may be added in the future."
              },
              {
                question: "Will page numbers overlap with existing content?",
                answer: "Page numbers are placed in the margins. If your document has very small margins, there might be some overlap. Choose a smaller font size in that case."
              },
              {
                question: "Can I remove page numbers after adding them?",
                answer: "Page numbers become part of the PDF content. To remove them, you'd need the original document without numbers."
              }
            ]}
            keywords={["number pdf pages", "pdf pagination", "page numbering"]}
          />
          
          <RelatedTools currentToolId="add-page-numbers" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
