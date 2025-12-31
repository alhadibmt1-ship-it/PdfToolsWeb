import { useState, useEffect } from "react";
import { ChevronLeft, Download, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/EnhancedToolSEOContent";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function RotateImagePage() {
  useSEO({
    title: "Rotate Image Free Online - Flip Photo | PDF HUB 24",
    description: "Rotate image free. Flip photos, rotate 90, 180, 270 degrees. Best free image rotator for JPG, PNG, WebP. No signup.",
    keywords: "rotate image free, flip image online, image rotator free, rotate photo, flip photo horizontally, turn image 90 degrees",
    canonicalPath: "/rotate-image"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [files]);

  const handleRotateFlip = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    if (rotation === 0 && !flipH && !flipV) {
      toast({
        title: "No changes",
        description: "Please rotate or flip the image before processing",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("rotation", rotation.toString());
    formData.append("flipH", flipH.toString());
    formData.append("flipV", flipV.toString());

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/rotate-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to process image");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Image processed successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      const ext = files[0]?.name.split('.').pop() || 'jpg';
      a.download = `rotated.${ext}`;
      a.click();
    }
  };

  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);
  const rotateLeft = () => setRotation((prev) => (prev - 90 + 360) % 360);

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("rotate-image")?.longTailH1 || "Rotate & Flip Image"}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rotate images 90°, 180°, 270° or flip them horizontally and vertically.
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
                  <RotateCw className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Rotate & Flip Settings</h3>
                </div>

                {previewUrl && (
                  <div className="border rounded-lg overflow-hidden bg-muted p-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-auto max-h-64 mx-auto transition-transform duration-300"
                      style={{
                        transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`
                      }}
                      data-testid="img-preview"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={rotateLeft}
                    data-testid="button-rotate-left"
                  >
                    <RotateCw className="w-4 h-4 mr-2 scale-x-[-1]" />
                    Rotate Left
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={rotateRight}
                    data-testid="button-rotate-right"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Rotate Right
                  </Button>
                  <Button 
                    variant={flipH ? "default" : "outline"}
                    onClick={() => setFlipH(!flipH)}
                    data-testid="button-flip-h"
                  >
                    <FlipHorizontal className="w-4 h-4 mr-2" />
                    Flip Horizontal
                  </Button>
                  <Button 
                    variant={flipV ? "default" : "outline"}
                    onClick={() => setFlipV(!flipV)}
                    data-testid="button-flip-v"
                  >
                    <FlipVertical className="w-4 h-4 mr-2" />
                    Flip Vertical
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Current rotation: {rotation}° | Flip H: {flipH ? "Yes" : "No"} | Flip V: {flipV ? "Yes" : "No"}
                </div>

                <Button 
                  onClick={handleRotateFlip} 
                  className="w-full"
                  size="lg"
                  data-testid="button-process"
                >
                  Apply Changes
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Processing your image..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your image is ready!</h3>
                <div className="border rounded-lg overflow-hidden bg-muted p-2">
                  <img 
                    src={resultUrl} 
                    alt="Result" 
                    className="max-w-full h-auto max-h-64 mx-auto"
                    data-testid="img-result"
                  />
                </div>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="rotate-image" />
          
          <RelatedTools currentToolId="rotate-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
