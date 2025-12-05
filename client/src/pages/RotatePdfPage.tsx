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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import type { RotationAngle } from "@shared/schema";
import { useSEO } from "@/hooks/useSEO";

export default function RotatePdfPage() {
  useSEO({
    title: "Rotate PDF Online Free - Rotate PDF Pages 90, 180, 270 Degrees | PDF HUB 24",
    description: "Rotate PDF pages online for free. Turn your PDF pages 90, 180, or 270 degrees. Fast, secure PDF rotation. No registration required.",
    keywords: "rotate pdf, rotate pdf pages, turn pdf, rotate pdf online free, flip pdf, pdf rotation"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [angle, setAngle] = useState<RotationAngle>("90");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleRotate = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to rotate",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("angle", angle);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/rotate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to rotate PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF rotated successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to rotate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "rotated.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Rotate PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rotate all pages in your PDF document by 90°, 180°, or 270° clockwise.
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
                <h3 className="font-semibold mb-4">Rotation Angle</h3>
                <RadioGroup value={angle} onValueChange={(value) => setAngle(value as RotationAngle)}>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="90" id="90" data-testid="radio-90" />
                    <Label htmlFor="90" className="cursor-pointer flex-1">
                      <div className="font-medium">90° Clockwise</div>
                      <div className="text-sm text-muted-foreground">Rotate right by a quarter turn</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="180" id="180" data-testid="radio-180" />
                    <Label htmlFor="180" className="cursor-pointer flex-1">
                      <div className="font-medium">180°</div>
                      <div className="text-sm text-muted-foreground">Rotate upside down</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="270" id="270" data-testid="radio-270" />
                    <Label htmlFor="270" className="cursor-pointer flex-1">
                      <div className="font-medium">270° Clockwise</div>
                      <div className="text-sm text-muted-foreground">Rotate left by a quarter turn</div>
                    </Label>
                  </div>
                </RadioGroup>
                <Button 
                  onClick={handleRotate} 
                  className="w-full"
                  size="lg"
                  data-testid="button-rotate"
                >
                  Rotate PDF by {angle}°
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Rotating your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your rotated PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Rotated PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Rotate PDF"
            toolDescription="Fix the orientation of your PDF documents instantly with our free online PDF rotation tool. Whether your scanned document came out sideways, your mobile photos are upside down, or you need to convert between landscape and portrait layouts, PDF HUB 24 makes it effortless. Choose from 90°, 180°, or 270° rotation angles and apply the change to all pages with a single click - no quality loss, no watermarks."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Select your desired rotation angle: 90° clockwise, 180° flip, or 270° counter-clockwise.",
              "Click the 'Rotate PDF' button to apply the rotation to all pages.",
              "Download your correctly oriented PDF file, ready for viewing or printing."
            ]}
            benefits={[
              "Fix wrongly-oriented scanned documents instantly",
              "Rotate all pages simultaneously with one click",
              "Three rotation options: 90°, 180°, or 270°",
              "Perfect for landscape to portrait conversion",
              "Lossless rotation preserves all content quality",
              "Works with any PDF regardless of file size",
              "Fast processing even for multi-page documents",
              "No watermarks added to rotated PDFs",
              "Ideal for fixing mobile phone scans and photos"
            ]}
            faqs={[
              {
                question: "Does rotation apply to all pages in my PDF?",
                answer: "Yes, the selected rotation angle is applied uniformly to every page in your document. If you need to rotate only specific pages, use our Split PDF tool to extract those pages first, rotate them separately, then use Merge PDF to combine them back with the rest of your document."
              },
              {
                question: "What's the difference between 90° and 270° rotation?",
                answer: "90° rotates clockwise (to the right), turning a portrait page into landscape with the top now on the right side. 270° rotates counter-clockwise (to the left), putting the top on the left side. 180° flips the page completely upside down. Choose based on your current document orientation."
              },
              {
                question: "Will rotating my PDF affect text searchability or quality?",
                answer: "No, rotation is a completely lossless operation. All text remains searchable and selectable, images retain their original resolution, and hyperlinks continue to work. Only the visual orientation of the pages changes."
              },
              {
                question: "How do I rotate a PDF back to its original orientation?",
                answer: "Simply apply the opposite rotation. If you rotated by 90° clockwise, rotate by 270° to return to the original. For 180° rotation, just apply 180° again. You can rotate as many times as needed without any quality degradation."
              },
              {
                question: "Why do scanned documents often need rotation?",
                answer: "Scanners and mobile phone cameras often capture documents in the wrong orientation, especially during batch scanning or when documents are fed at different angles. Our tool provides a quick fix for these common orientation problems before sharing or printing."
              }
            ]}
            keywords={["rotate pdf pages", "fix pdf orientation", "turn pdf sideways", "flip pdf upside down", "pdf rotation tool"]}
            relatedLinks={[
              { text: "Split PDF to rotate specific pages only", href: "/split" },
              { text: "Merge rotated pages back together", href: "/merge" },
              { text: "Reorder pages after rotation", href: "/reorder-pages" },
              { text: "Compress PDF after making changes", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Common Rotation Scenarios",
                content: "PDF rotation is frequently needed in these situations:",
                items: [
                  "Scanned documents captured in wrong orientation",
                  "Photos taken with mobile phones in portrait mode",
                  "Landscape spreadsheets that need portrait printing",
                  "Architectural drawings requiring different viewing angles",
                  "Batch-scanned documents with mixed orientations",
                  "PDFs created from sideways camera captures"
                ]
              },
              {
                title: "Understanding Rotation Angles",
                content: "Choose the right rotation angle for your needs:",
                items: [
                  "90° Clockwise: Rotates right - top moves to right side",
                  "180° Flip: Turns page upside down - top becomes bottom",
                  "270° Counter-clockwise: Rotates left - top moves to left side",
                  "Use 90° or 270° to switch between portrait and landscape",
                  "Use 180° to flip upside-down scans right-side up",
                  "Multiple rotations can be combined for any final orientation"
                ]
              }
            ]}
            exampleTable={{
              title: "Rotation Angle Reference",
              rows: [
                { label: "Sideways scan (top on right)", before: "Wrong orientation", after: "90° clockwise fix" },
                { label: "Upside-down document", before: "Flipped content", after: "180° to correct" },
                { label: "Sideways scan (top on left)", before: "Wrong orientation", after: "270° counter-clockwise fix" },
                { label: "Landscape to Portrait", before: "Wide layout", after: "90° or 270° rotation" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="rotate" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
