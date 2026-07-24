import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download, Droplet } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function AddWatermarkPage() {
  useSEO({
    title: "Add Watermark to PDF Free Online - Stamp PDF | PDF HUB 24",
    description: "Add watermark to PDF free. Insert text stamps, customize opacity and position. Best free PDF watermark tool. No signup.",
    keywords: "add watermark to pdf free, pdf watermark, stamp pdf, watermark pdf online free, insert text on pdf, brand pdf",
    canonicalPath: "/add-watermark"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("add-watermark", lang, getToolSEOData("add-watermark")?.longTailH1 || "Add Watermark");
  const toolDesc = getToolDesc("add-watermark", lang, "Add a text watermark to every page of your PDF document.");

  const [files, setFiles] = useState<File[]>([]);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState([0.3]);
  const [fontSize, setFontSize] = useState("48");
  const [rotation, setRotation] = useState("-45");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    setStatus("idle");
    setFiles(newFiles);
  }, [resultUrl]);

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

    // Client-side file size validation
    if (files[0].size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Please upload a file under ${MAX_FILE_SIZE_MB}MB. Your file is ${(files[0].size / 1024 / 1024).toFixed(1)}MB.`,
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
          let serverError = "Conversion failed. Please try again.";
          try { const errBody = await response.clone().json(); if (errBody?.error) serverError = errBody.error; } catch {}
          throw new Error(serverError);
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

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFiles([]);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + "-watermarked.pdf";
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
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{toolTitle}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {toolDesc}
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
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
              status={status === "processing" || status === "error" ? status : "idle"}
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
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleReset}
                  data-testid="button-convert-another"
                >
                  Convert Another File
                </Button>
                <div className="pt-3 border-t border-border/50 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">What's next?</span>
                  <Link href="/protect-pdf" className="text-primary hover:underline font-medium" data-testid="link-post-download-protect">Protect PDF →</Link>
                  <Link href="/compress-pdf" className="text-primary hover:underline font-medium" data-testid="link-post-download-compress">Compress PDF →</Link>
                </div>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="add-watermark" />
          
          <RelatedTools currentToolId="add-watermark" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
