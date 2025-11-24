import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
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
            <p className="text-muted-foreground leading-relaxed">
              Rotate all pages in your PDF document by 90°, 180°, or 270° clockwise.
            </p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
