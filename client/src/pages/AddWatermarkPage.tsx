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
    title: "Add Watermark to PDF Free Online - Stamp PDF | PDF HUB 24",
    description: "Add watermark to PDF free. Insert text stamps, customize opacity and position. Best free PDF watermark tool. No signup.",
    keywords: "add watermark to pdf free, pdf watermark, stamp pdf, watermark pdf online free, insert text on pdf, brand pdf",
    canonicalPath: "/add-watermark"
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
            toolName="Add Watermark to PDF"
            toolId="add-watermark"
            toolDescription="Add professional text watermarks to your PDF documents with our free online tool. Whether you need to mark documents as CONFIDENTIAL, DRAFT, SAMPLE, or add your company name for branding, PDF HUB 24 gives you full control. Customize the watermark text, opacity level, font size, and rotation angle to achieve exactly the look you need. Watermarks are applied to every page automatically, providing consistent protection and branding throughout your document."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Enter your desired watermark text (e.g., CONFIDENTIAL, DRAFT, your company name).",
              "Adjust opacity, font size, and rotation angle to customize the appearance.",
              "Click 'Add Watermark' and download your protected or branded PDF."
            ]}
            benefits={[
              "Fully customizable watermark text for any purpose",
              "Adjustable opacity from subtle (10%) to bold (100%)",
              "Control font size from 12pt to 72pt",
              "Rotation angle from -90° to +90° for diagonal placement",
              "Watermark applied to all pages automatically",
              "Perfect for branding documents with company name",
              "Mark documents as confidential, draft, or sample",
              "Deter unauthorized copying and distribution",
              "No watermarks from our tool added to your PDF"
            ]}
            faqs={[
              {
                question: "What opacity setting should I use for my watermark?",
                answer: "For subtle watermarks that allow easy reading of the underlying content, use 20-30% opacity. For more visible branding or security watermarks, use 40-60%. For very prominent watermarks meant to prevent unauthorized use, use 70% or higher. Test different settings to find the right balance."
              },
              {
                question: "Can I add an image or logo as a watermark?",
                answer: "Currently, our tool supports text-only watermarks for maximum compatibility and professional appearance. Image/logo watermarks may be added in future updates. For now, you can use your company name or abbreviation as a text watermark."
              },
              {
                question: "Will the watermark make my document hard to read?",
                answer: "With appropriate opacity settings (20-40%), watermarks appear in the background without significantly affecting readability. The diagonal rotation (default -45°) helps watermarks cross content areas without blocking specific text. Adjust the settings to find the right balance for your document."
              },
              {
                question: "Can I remove a watermark after adding it?",
                answer: "Watermarks become permanently embedded in the PDF content. To remove a watermark, you would need to use your original un-watermarked document. Always keep a backup of your original file before adding watermarks."
              },
              {
                question: "Can I add multiple different watermarks to one document?",
                answer: "Currently, one watermark text is applied per processing. For multiple watermarks, you can process the file multiple times with different text, or combine your messages into a single watermark (e.g., 'CONFIDENTIAL - DRAFT'). Each processing adds a new layer."
              }
            ]}
            keywords={["add watermark to pdf", "pdf stamp tool", "document watermark", "brand pdf online", "protect pdf with watermark"]}
            relatedLinks={[
              { text: "Add page numbers for professional documents", href: "/add-page-numbers" },
              { text: "Protect PDF with password encryption", href: "/protect" },
              { text: "Compress PDF after adding watermark", href: "/compress" },
              { text: "Merge multiple PDFs before watermarking", href: "/merge" }
            ]}
            extraSections={[
              {
                title: "Common Watermark Use Cases",
                content: "Watermarks serve various important purposes for document management:",
                items: [
                  "Marking documents as CONFIDENTIAL for internal use only",
                  "Labeling documents as DRAFT during review processes",
                  "Adding SAMPLE to prevent misuse of demo documents",
                  "Branding PDFs with company name or logo text",
                  "Adding DO NOT COPY to deter unauthorized reproduction",
                  "Including APPROVED or REVIEWED status indicators"
                ]
              },
              {
                title: "Tips for Effective Watermarks",
                content: "Create professional watermarks with these best practices:",
                items: [
                  "Use ALL CAPS for visibility and professional appearance",
                  "Keep text short and impactful (1-3 words work best)",
                  "Use 30-40% opacity for balance between visibility and readability",
                  "Diagonal rotation (-45°) covers content without blocking it",
                  "Larger font sizes (48-60pt) ensure watermark visibility",
                  "Test on a sample page before processing large documents"
                ]
              }
            ]}
            exampleTable={{
              title: "Watermark Configuration Examples",
              rows: [
                { label: "Subtle branding", before: "Company name, 20% opacity", after: "Professional, readable" },
                { label: "Confidential marking", before: "CONFIDENTIAL, 40% opacity", after: "Visible but not blocking" },
                { label: "Draft indicator", before: "DRAFT, 50% opacity, red", after: "Clear status indicator" },
                { label: "Copy protection", before: "DO NOT COPY, 60% opacity", after: "Strong visual deterrent" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="add-watermark" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
