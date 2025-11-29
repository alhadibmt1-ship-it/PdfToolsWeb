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
    title: "Crop PDF Online Free - Trim PDF Page Margins | PDF HUB 24",
    description: "Crop PDF pages online for free. Remove unwanted margins, white space, or trim PDF to specific dimensions. Fast, secure PDF cropping tool.",
    keywords: "crop pdf, trim pdf, remove pdf margins, pdf cropper, resize pdf pages, cut pdf"
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
            toolDescription="Trim unwanted margins and white space from your PDF documents with our free online PDF cropping tool. Whether you need to remove printer margins, reduce page size, or focus on specific content, our tool makes it easy to crop all pages in your PDF at once."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Enter the amount to crop from each edge (top, bottom, left, right).",
              "Click the Crop PDF button to process all pages.",
              "Download your cropped PDF with reduced margins."
            ]}
            benefits={[
              "Remove unwanted margins from PDFs",
              "Trim white space from scanned documents",
              "Crop all pages uniformly at once",
              "Precise control with point measurements",
              "Reduce PDF page dimensions",
              "Perfect for printing optimization",
              "No software installation required",
              "Free with no registration"
            ]}
            faqs={[
              {
                question: "What units are used for cropping?",
                answer: "We use points (pt) as the unit of measurement. 72 points equals 1 inch, and approximately 28 points equals 1 centimeter."
              },
              {
                question: "Will cropping affect all pages?",
                answer: "Yes, the crop settings are applied uniformly to all pages in your PDF document."
              },
              {
                question: "Can I undo the cropping?",
                answer: "The cropping is permanent on the downloaded file, but your original file remains unchanged. Keep your original file as a backup."
              },
              {
                question: "Does cropping reduce file size?",
                answer: "Cropping changes the visible area but may not significantly reduce file size since the content is still stored. Use our Compress PDF tool for size reduction."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["crop pdf", "trim pdf margins", "remove white space", "pdf cropper"]}
          />
          
          <RelatedTools currentToolId="crop-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
