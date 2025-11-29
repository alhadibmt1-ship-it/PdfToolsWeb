import { useState } from "react";
import { ChevronLeft, Download, Image as ImageIcon } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function ImageCompressorPage() {
  useSEO({
    title: "Image Compressor - Compress JPG, PNG, WebP Online Free | PDF HUB 24",
    description: "Compress images online for free. Reduce JPG, PNG, and WebP file sizes without losing quality. Fast, secure image compression with adjustable quality settings.",
    keywords: "image compressor, compress image, reduce image size, jpg compressor, png compressor, webp compressor"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState([80]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleCompress = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image to compress",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    setOriginalSize(files[0].size);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("quality", quality[0].toString());

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/compress-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to compress image");
        }

        return await response.blob();
      });

      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Image compressed successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to compress image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      const ext = files[0]?.name.split('.').pop() || 'jpg';
      a.download = `compressed.${ext}`;
      a.click();
    }
  };

  const savings = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Image Compressor</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Reduce your image file size while maintaining quality. Supports JPG, PNG, and WebP formats.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".jpg,.jpeg,.png,.webp"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Compression Settings</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Quality: {quality[0]}%</Label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                      data-testid="slider-quality"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Original size: <span className="font-medium text-foreground">{formatSize(files[0].size)}</span>
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleCompress} 
                  className="w-full"
                  size="lg"
                  data-testid="button-compress"
                >
                  Compress Image
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Compressing your image..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your compressed image is ready!</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-md text-center">
                    <p className="text-xs text-muted-foreground">Original</p>
                    <p className="font-semibold">{formatSize(originalSize)}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-md text-center">
                    <p className="text-xs text-muted-foreground">Compressed</p>
                    <p className="font-semibold text-green-600">{formatSize(compressedSize)}</p>
                  </div>
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <span className="text-lg font-semibold text-green-600">Saved {savings}%</span>
                  </div>
                )}
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed Image
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Image Compressor"
            toolDescription="Reduce your image file sizes without sacrificing quality using our free online image compressor. Whether you need to optimize images for the web, email attachments, or save storage space, our tool offers adjustable quality settings to meet your needs. Supports JPG, PNG, and WebP formats."
            howToSteps={[
              "Upload your image by clicking the upload area or dragging and dropping.",
              "Adjust the quality slider to balance file size and image quality.",
              "Click the Compress Image button to start processing.",
              "Download your compressed image and see exactly how much space you saved."
            ]}
            benefits={[
              "Compress JPG, PNG, and WebP images",
              "Adjustable quality settings from 10% to 100%",
              "See exact file size savings instantly",
              "Maintain image quality at higher settings",
              "Perfect for web optimization",
              "Reduce email attachment sizes",
              "No watermarks or quality loss",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "What image formats are supported?",
                answer: "Our compressor supports JPG/JPEG, PNG, and WebP image formats. These are the most common formats used on the web and in digital photography."
              },
              {
                question: "How do I choose the right quality level?",
                answer: "For web images, 70-80% quality usually offers the best balance. For photos you want to keep high quality, use 85-95%. Lower settings create smaller files but may show visible compression artifacts."
              },
              {
                question: "Will my images lose quality?",
                answer: "At higher quality settings (80%+), the quality loss is typically imperceptible. Lower settings will show more compression but create smaller files."
              },
              {
                question: "Is there a file size limit?",
                answer: "We support images up to 50MB. Most images compress successfully regardless of their original size."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["compress image", "reduce image size", "optimize images", "image optimizer"]}
          />
          
          <RelatedTools currentToolId="image-compressor" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
