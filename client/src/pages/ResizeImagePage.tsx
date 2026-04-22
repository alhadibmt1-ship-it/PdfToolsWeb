import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download, Maximize2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ResizeImagePage() {
  useSEO({
    title: "Resize Image Free Online - Change Image Size | PDF HUB 24",
    description: "Resize image free online. Change image dimensions by pixels or percentage. Best free image resizer - JPG, PNG, WebP supported. Preserve quality. No signup.",
    keywords: "resize image free, image resizer online, change image size, reduce image dimensions, scale image free, enlarge photo online",
    canonicalPath: "/resize-image"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("resize-image", lang, getToolSEOData("resize-image")?.longTailH1 || "Resize Image");
  const toolDesc = getToolDesc("resize-image", lang, "Change image dimensions by pixels or percentage. Supports JPG, PNG, WebP, and GIF formats.");

  const [files, setFiles] = useState<File[]>([]);
  const [resizeMode, setResizeMode] = useState<"pixels" | "percentage">("pixels");
  const [width, setWidth] = useState<string>("800");
  const [height, setHeight] = useState<string>("600");
  const [percentage, setPercentage] = useState<string>("50");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
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

  const handleResize = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image to resize",
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
    formData.append("mode", resizeMode);
    if (resizeMode === "pixels") {
      formData.append("width", width);
      formData.append("height", height);
      formData.append("maintainAspectRatio", maintainAspectRatio.toString());
    } else {
      formData.append("percentage", percentage);
    }

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/resize-image", {
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
        description: "Image resized successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to resize image. Please try again.",
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
      const ext = files[0]?.name.split('.').pop() || 'jpg';
      a.download = `resized.${ext}`;
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
              acceptedFormats=".jpg,.jpeg,.png,.webp,.gif"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Maximize2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Resize Settings</h3>
                </div>

                <RadioGroup value={resizeMode} onValueChange={(v) => setResizeMode(v as "pixels" | "percentage")} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pixels" id="pixels" data-testid="radio-pixels" />
                    <Label htmlFor="pixels">By Pixels</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" data-testid="radio-percentage" />
                    <Label htmlFor="percentage">By Percentage</Label>
                  </div>
                </RadioGroup>

                {resizeMode === "pixels" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="width" className="mb-2 block">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          min="1"
                          max="10000"
                          data-testid="input-width"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="mb-2 block">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          min="1"
                          max="10000"
                          data-testid="input-height"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="aspect"
                        checked={maintainAspectRatio}
                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-aspect"
                      />
                      <Label htmlFor="aspect">Maintain aspect ratio</Label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="percentage-input" className="mb-2 block">Scale to {percentage}%</Label>
                    <Input
                      id="percentage-input"
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      min="1"
                      max="500"
                      data-testid="input-percentage"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Enter 50 to halve the size, 200 to double it</p>
                  </div>
                )}

                <Button 
                  onClick={handleResize} 
                  className="w-full"
                  size="lg"
                  data-testid="button-resize"
                >
                  Resize Image
                </Button>
              </div>
            )}

            <ProcessingState
              status={status === "processing" || status === "error" ? status : "idle"}
              progress={progress}
              message={status === "processing" ? "Resizing your image..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your resized image is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resized Image
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
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="resize-image" />
          
          <RelatedTools currentToolId="resize-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
