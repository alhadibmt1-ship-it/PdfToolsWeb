import { useState } from "react";
import { ChevronLeft, Download, Maximize2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function ResizeImagePage() {
  useSEO({
    title: "Resize Image Free Online - Change Image Size | PDF HUB 24",
    description: "Resize image free online. Change image dimensions by pixels or percentage. Best free image resizer - JPG, PNG, WebP supported. Preserve quality. No signup.",
    keywords: "resize image free, image resizer online, change image size, reduce image dimensions, scale image free, enlarge photo online",
    canonicalPath: "/resize-image"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [resizeMode, setResizeMode] = useState<"pixels" | "percentage">("pixels");
  const [width, setWidth] = useState<string>("800");
  const [height, setHeight] = useState<string>("600");
  const [percentage, setPercentage] = useState<string>("50");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleResize = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image to resize",
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
          throw new Error("Failed to resize image");
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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resize Image</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Change image dimensions by pixels or percentage. Supports JPG, PNG, WebP, and GIF formats.
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
              status={status}
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
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Resize Image"
            toolId="resize-image"
            toolDescription="Resize any image to your desired dimensions instantly with our free online image resizer. Whether you need to reduce an image for web use, enlarge a photo for printing, or prepare images for social media platforms, PDF HUB 24 makes it effortless. Our advanced resizing tool offers two flexible modes: resize by exact pixel dimensions for precise control, or resize by percentage for quick scaling. The optional aspect ratio lock ensures your images never look stretched or distorted. Our high-quality bicubic resampling algorithm preserves maximum detail even when scaling images up or down significantly."
            howToSteps={[
              "Upload your image by clicking the upload area or drag and drop your JPG, PNG, WebP, or GIF file.",
              "Choose resize mode: by pixels (specify width and height) or by percentage.",
              "Enter your desired dimensions or scale percentage.",
              "Click 'Resize Image' and download your resized image."
            ]}
            benefits={[
              "Resize images by exact pixels or percentage",
              "Maintain or ignore aspect ratio as needed",
              "Supports JPG, PNG, WebP, and GIF formats",
              "High-quality resizing algorithm preserves details",
              "Perfect for social media, web, and print",
              "No watermarks on resized images",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "Will resizing reduce my image quality?",
                answer: "Our tool uses high-quality bicubic resampling to preserve as much detail as possible. When reducing size, quality loss is minimal. When enlarging, some quality loss is unavoidable, but our algorithm minimizes artifacts."
              },
              {
                question: "What's the maximum image size I can resize?",
                answer: "You can resize images up to 50MB and up to 10,000 pixels in width or height. This covers most use cases from social media to print-ready images."
              },
              {
                question: "How do I resize for specific social media platforms?",
                answer: "Common sizes: Instagram post (1080x1080), Facebook cover (820x312), Twitter header (1500x500), LinkedIn banner (1584x396). Enter these dimensions in pixel mode."
              },
              {
                question: "Should I resize images before uploading to my website?",
                answer: "Yes, resizing images to the exact display size reduces file size and improves page load speed. Oversized images slow down websites and waste bandwidth. Use our tool to match your website's required dimensions."
              },
              {
                question: "What's the difference between resizing by pixels vs percentage?",
                answer: "Pixel mode gives you exact control over final dimensions - perfect when you need specific sizes. Percentage mode is faster for quick scaling - enter 50 to halve the size or 200 to double it."
              }
            ]}
            keywords={["resize image online", "image resizer free", "change image dimensions", "scale image", "reduce image size"]}
            relatedLinks={[
              { text: "Compress images to reduce file size", href: "/image-compressor" },
              { text: "Crop images to specific areas", href: "/crop-image" },
              { text: "Convert images to different formats", href: "/convert-image" }
            ]}
            extraSections={[
              {
                title: "Popular Image Size Presets",
                content: "Different platforms and use cases require specific image dimensions for optimal display. Using the wrong size can result in cropped images, stretched photos, or rejected uploads. Social media platforms are particularly strict about image dimensions. Instagram requires square images at 1080x1080 pixels for feed posts, while Stories need vertical 1080x1920 images. Facebook cover photos work best at 820x312 pixels to display properly on both desktop and mobile. For professional networking, LinkedIn banners should be 1584x396 pixels. YouTube thumbnails at 1280x720 pixels (16:9 ratio) ensure your video previews look crisp and professional. Using our resize tool with these exact dimensions ensures your images meet platform requirements perfectly.",
                items: [
                  "Instagram Square Post: 1080 x 1080 pixels",
                  "Instagram Story/Reels: 1080 x 1920 pixels",
                  "Facebook Cover Photo: 820 x 312 pixels",
                  "Twitter Header: 1500 x 500 pixels",
                  "LinkedIn Banner: 1584 x 396 pixels",
                  "YouTube Thumbnail: 1280 x 720 pixels"
                ]
              },
              {
                title: "When to Resize Images",
                content: "Image resizing is one of the most common photo editing tasks, essential for both personal and professional use. Website optimization is perhaps the most important reason to resize images. Large photos straight from cameras can be 5-10 MB each, dramatically slowing page load times. Resizing to display dimensions (typically 800-1200 pixels wide for web content) can reduce file sizes by 90% or more. Email attachments with oversized images often fail to send or get blocked by spam filters. Job applications frequently have file size limits that require resizing. E-commerce product photos need consistent dimensions for professional-looking catalogs. Even printing requires specific dimensions based on the desired print size and resolution (typically 300 DPI for high-quality prints).",
                items: [
                  "Optimizing website loading speed with smaller images",
                  "Preparing photos for email attachments",
                  "Meeting upload requirements for job applications",
                  "Creating thumbnails for galleries and catalogs",
                  "Printing photos at specific dimensions",
                  "Fitting images into presentation slides"
                ]
              },
              {
                title: "Tips for Best Resizing Results",
                content: "To achieve the best results when resizing images, keep these professional tips in mind. Always start with the highest quality original image available, as resizing cannot add detail that doesn't exist. When reducing image size, you'll almost always get excellent results because you're removing pixels rather than creating them. When enlarging images, quality loss is unavoidable, so limit upscaling to 150-200% maximum for acceptable results. If you need to resize multiple images to the same dimensions, process them one at a time using our tool to ensure consistent quality across your entire batch. For web use, consider using the percentage mode to quickly create multiple size variants (100%, 75%, 50%, 25%) for responsive websites. After resizing, always preview your image at 100% zoom to verify the quality meets your needs before downloading."
              }
            ]}
          />
          
          <RelatedTools currentToolId="resize-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
