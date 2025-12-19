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
    title: "Compress Image Free - JPG PNG WebP | PDF HUB 24",
    description: "Compress images free. Reduce JPG, PNG, WebP file size up to 80%. Best free image compressor. No signup.",
    keywords: "compress image free, image compressor online, reduce image size, jpg compressor free, png compressor, compress photo online"
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
            toolId="image-compressor"
            toolDescription="Reduce your image file sizes by up to 90% without sacrificing visible quality using our free online image compressor. Whether you need to optimize images for websites, email attachments, social media, or save storage space on your device, our tool offers precise quality control from 10% to 100%. Supports JPG, PNG, and WebP formats — the most popular image types for web and digital photography. See exactly how much space you saved before downloading."
            howToSteps={[
              "Upload your image by clicking the upload area or drag and drop your JPG, PNG, or WebP file.",
              "Adjust the quality slider (10-100%) to balance file size reduction with image quality.",
              "Click the 'Compress Image' button to start the optimization process.",
              "Review the size comparison and download your compressed image — savings displayed instantly."
            ]}
            benefits={[
              "Compress JPG, PNG, and WebP images with one tool",
              "Adjustable quality settings from 10% to 100% for precise control",
              "See exact file size savings instantly before downloading",
              "Maintain imperceptible quality loss at 80%+ settings",
              "Perfect for web optimization and faster page loading",
              "Reduce email attachment sizes to meet limits",
              "No watermarks added to your compressed images",
              "Free with no registration or account required",
              "Process images up to 50MB in size"
            ]}
            faqs={[
              {
                question: "What image formats does the compressor support?",
                answer: "Our compressor supports JPG/JPEG, PNG, and WebP image formats. These are the most widely used formats on the web and in digital photography. Each format is optimized differently — JPGs use lossy compression, PNGs maintain transparency while reducing file size, and WebPs offer modern efficient compression."
              },
              {
                question: "How do I choose the right quality level for my needs?",
                answer: "For web images where loading speed matters, 70-80% quality usually offers the best balance between file size and visual quality. For photos you want to keep high quality (like portfolio images), use 85-95%. Lower settings (10-50%) create much smaller files but may show visible compression artifacts — useful for thumbnails or previews."
              },
              {
                question: "Will my images lose visible quality after compression?",
                answer: "At higher quality settings (80% and above), the quality loss is typically imperceptible to the human eye. Most users cannot distinguish between an original image and one compressed at 85% quality. Lower settings will show more compression artifacts but create significantly smaller files."
              },
              {
                question: "What is the maximum file size I can compress?",
                answer: "We support images up to 50MB in size. Most images from cameras, phones, and design software compress successfully regardless of their original size. Very large professional photography files may take slightly longer to process."
              },
              {
                question: "How much space can I typically save with image compression?",
                answer: "Depending on the original image and quality setting, you can typically save 30-90% of the file size. Photos taken with smartphones often reduce from 3-5MB to under 500KB at 80% quality. High-resolution images from cameras can shrink even more dramatically."
              }
            ]}
            keywords={["compress image online", "reduce image file size", "jpg compressor free", "png optimizer", "webp compression tool"]}
            relatedLinks={[
              { text: "Convert images to PDF using JPG to PDF", href: "/jpg-to-pdf" },
              { text: "Convert images to PDF using PNG to PDF", href: "/png-to-pdf" },
              { text: "Extract images from PDFs using Extract Images", href: "/extract-images" },
              { text: "Compress PDF files using Compress PDF", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Why Compress Your Images?",
                content: "Image compression is essential for modern digital workflows. Large image files can cause problems in many situations:",
                items: [
                  "Website images slow down page loading and hurt SEO rankings",
                  "Email attachments exceed size limits (usually 25MB)",
                  "Social media platforms re-compress images poorly",
                  "Cloud storage fills up quickly with unoptimized photos",
                  "Mobile data usage increases with large image files",
                  "Sharing via messaging apps becomes slow or impossible"
                ]
              },
              {
                title: "Choosing the Right Quality Setting",
                content: "Different use cases require different compression levels. Here's a guide to help you choose:",
                items: [
                  "90-100%: Archive-quality, no visible loss — use for photos you want to preserve",
                  "80-90%: High quality with significant savings — ideal for portfolio and print",
                  "70-80%: Balanced quality — perfect for website images and blogs",
                  "50-70%: Smaller files — suitable for social media and email",
                  "10-50%: Maximum compression — use for thumbnails and previews only"
                ]
              }
            ]}
            exampleTable={{
              title: "Typical Image Compression Results",
              rows: [
                { label: "Smartphone Photo (4MB)", before: "4 MB", after: "400-600 KB" },
                { label: "DSLR High-Res (15MB)", before: "15 MB", after: "1.5-2.5 MB" },
                { label: "Web Screenshot (2MB)", before: "2 MB", after: "200-400 KB" },
                { label: "Product Photo (8MB)", before: "8 MB", after: "800 KB - 1.2 MB" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="image-compressor" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
