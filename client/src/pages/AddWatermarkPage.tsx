import { useState } from "react";
import { ChevronLeft, Download, Droplet } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function AddWatermarkPage() {
  useSEO({
    title: "Add Watermark to PDF Online Free | PDF HUB 24",
    description: "Add text watermark to your PDF documents for free. Customize opacity, size, and rotation. Perfect for branding and document protection.",
    keywords: "add watermark pdf, pdf watermark, watermark pdf online, stamp pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState([0.3]);
  const [fontSize, setFontSize] = useState("48");
  const [rotation, setRotation] = useState("-45");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleAddWatermark = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (!watermarkText.trim()) {
      toast({
        title: "Error",
        description: "Please enter watermark text",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("text", watermarkText);
    formData.append("opacity", opacity[0].toString());
    formData.append("fontSize", fontSize);
    formData.append("rotation", rotation);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/add-watermark", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to add watermark");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Watermark added successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to add watermark. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "watermarked.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Add Watermark</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Add a text watermark to every page of your PDF document.
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
              <div className="rounded-lg border bg-card p-6 space-y-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5" />
                  Watermark Options
                </h3>
                
                <div>
                  <Label htmlFor="watermarkText">Watermark Text</Label>
                  <Input
                    id="watermarkText"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                    data-testid="input-watermark-text"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fontSize">Font Size: {fontSize}pt</Label>
                    <Input
                      id="fontSize"
                      type="number"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      data-testid="input-font-size"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rotation">Rotation: {rotation}°</Label>
                    <Input
                      id="rotation"
                      type="number"
                      min="-90"
                      max="90"
                      value={rotation}
                      onChange={(e) => setRotation(e.target.value)}
                      data-testid="input-rotation"
                    />
                  </div>
                </div>

                <div>
                  <Label>Opacity: {Math.round(opacity[0] * 100)}%</Label>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    min={0.1}
                    max={1}
                    step={0.1}
                    className="mt-2"
                    data-testid="slider-opacity"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Lower opacity makes the watermark more subtle.
                  </p>
                </div>

                <Button 
                  onClick={handleAddWatermark} 
                  className="w-full"
                  size="lg"
                  data-testid="button-add-watermark"
                >
                  <Droplet className="w-4 h-4 mr-2" />
                  Add Watermark
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Adding watermark..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your watermarked PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Watermarked PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Add Watermark"
            toolDescription="Add a professional text watermark to your PDF documents. Perfect for marking documents as confidential, draft, or with your company name. Customize the text, opacity, size, and rotation to get exactly the look you want."
            howToSteps={[
              "Upload your PDF file.",
              "Enter your watermark text (e.g., CONFIDENTIAL, DRAFT, your company name).",
              "Adjust opacity, font size, and rotation as needed.",
              "Click Add Watermark and download your result."
            ]}
            benefits={[
              "Customizable watermark text",
              "Adjustable opacity for subtle or bold watermarks",
              "Control font size and rotation angle",
              "Applied to all pages automatically",
              "Perfect for branding documents",
              "Mark documents as confidential or draft",
              "Free and easy to use",
              "No registration required"
            ]}
            faqs={[
              {
                question: "What's a good opacity setting?",
                answer: "For subtle watermarks that don't interfere with reading, use 20-30% opacity. For more prominent watermarks, use 50% or higher. Preview with different settings to find what works best."
              },
              {
                question: "Can I add an image watermark?",
                answer: "Currently we support text watermarks only. Image watermarks may be added in the future."
              },
              {
                question: "Will the watermark affect text readability?",
                answer: "With low opacity settings (20-40%), watermarks appear in the background and don't significantly affect readability. The watermark is centered and slightly rotated to avoid covering important content."
              },
              {
                question: "Can I remove a watermark after adding it?",
                answer: "Watermarks become part of the PDF content. To remove them, you'd need the original document without the watermark."
              },
              {
                question: "Can I add multiple watermarks?",
                answer: "Currently, one watermark text is added per processing. For multiple watermarks, process the file multiple times or combine text in a single watermark."
              }
            ]}
            keywords={["pdf stamp", "document watermark", "brand pdf"]}
          />
          
          <RelatedTools currentToolId="add-watermark" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
