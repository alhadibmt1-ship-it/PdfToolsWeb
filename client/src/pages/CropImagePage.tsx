import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Download, Crop } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

export default function CropImagePage() {
  useSEO({
    title: "Crop Image Free Online - Trim Photos Easily | PDF HUB 24",
    description: "Crop image free online. Remove unwanted areas from photos. Best free image cropper - JPG, PNG, WebP. Live preview. No signup.",
    keywords: "crop image free, image cropper online, trim image, cut photo free, crop photo online, remove unwanted areas",
    canonicalPath: "/crop-image"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("crop-image", lang, getToolSEOData("crop-image")?.longTailH1 || "Crop Image");
  const toolDesc = getToolDesc("crop-image", lang, "Remove unwanted areas from your images. Specify exact crop dimensions for precise results.");

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState<string>("0");
  const [cropY, setCropY] = useState<string>("0");
  const [cropWidth, setCropWidth] = useState<string>("400");
  const [cropHeight, setCropHeight] = useState<string>("300");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        setCropWidth(Math.min(400, img.width).toString());
        setCropHeight(Math.min(300, img.height).toString());
      };
      img.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [files]);

  const handleCrop = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image to crop",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("x", cropX);
    formData.append("y", cropY);
    formData.append("width", cropWidth);
    formData.append("height", cropHeight);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/crop-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to crop image");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Image cropped successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to crop image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      const ext = files[0]?.name.split('.').pop() || 'jpg';
      a.download = `cropped.${ext}`;
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
              onFilesSelected={setFiles}
              acceptedFormats=".jpg,.jpeg,.png,.webp,.gif"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crop className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Crop Settings</h3>
                </div>

                {imageSize && (
                  <p className="text-sm text-muted-foreground">
                    Original image size: {imageSize.width} x {imageSize.height} pixels
                  </p>
                )}

                {previewUrl && (
                  <div className="relative border rounded-lg overflow-hidden bg-muted p-2">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-auto max-h-64 mx-auto"
                      data-testid="img-preview"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crop-x" className="mb-2 block">Start X (px)</Label>
                    <Input
                      id="crop-x"
                      type="number"
                      value={cropX}
                      onChange={(e) => setCropX(e.target.value)}
                      min="0"
                      data-testid="input-crop-x"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-y" className="mb-2 block">Start Y (px)</Label>
                    <Input
                      id="crop-y"
                      type="number"
                      value={cropY}
                      onChange={(e) => setCropY(e.target.value)}
                      min="0"
                      data-testid="input-crop-y"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-width" className="mb-2 block">Width (px)</Label>
                    <Input
                      id="crop-width"
                      type="number"
                      value={cropWidth}
                      onChange={(e) => setCropWidth(e.target.value)}
                      min="1"
                      data-testid="input-crop-width"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-height" className="mb-2 block">Height (px)</Label>
                    <Input
                      id="crop-height"
                      type="number"
                      value={cropHeight}
                      onChange={(e) => setCropHeight(e.target.value)}
                      min="1"
                      data-testid="input-crop-height"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleCrop} 
                  className="w-full"
                  size="lg"
                  data-testid="button-crop"
                >
                  Crop Image
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Cropping your image..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your cropped image is ready!</h3>
                <div className="border rounded-lg overflow-hidden bg-muted p-2">
                  <img 
                    src={resultUrl} 
                    alt="Cropped result" 
                    className="max-w-full h-auto max-h-64 mx-auto"
                    data-testid="img-result"
                    loading="lazy"
                  />
                </div>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cropped Image
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="crop-image" />
          
          <RelatedTools currentToolId="crop-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
