import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Download, Crop } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function CropImagePage() {
  useSEO({
    title: "Crop Image Free Online - Trim Photos Easily | PDF HUB 24",
    description: "Crop image free online. Remove unwanted areas from photos. Best free image cropper - JPG, PNG, WebP. Live preview. No signup.",
    keywords: "crop image free, image cropper online, trim image, cut photo free, crop photo online, remove unwanted areas",
    canonicalPath: "/crop-image"
  });

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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Crop Image</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Remove unwanted areas from your images. Specify exact crop dimensions for precise results.
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

          <ToolSEOContent
            toolName="Crop Image"
            toolId="crop-image"
            toolDescription="Remove unwanted areas from your images with our free online image cropper. Specify exact pixel coordinates for precise cropping, giving you complete control over the final result. Whether you need to prepare images for social media profile pictures, remove distracting backgrounds, focus on specific subjects in group photos, or create perfectly sized thumbnails, our cropping tool handles it all. The tool supports all popular image formats including JPG, PNG, WebP, and GIF. Simply enter your crop coordinates, preview the original image, and download your perfectly cropped result instantly."
            howToSteps={[
              "Upload your image by clicking the upload area or drag and drop your file.",
              "View your image and note the original dimensions.",
              "Enter the starting X and Y coordinates and the width and height of your crop area.",
              "Click 'Crop Image' and download your cropped image."
            ]}
            benefits={[
              "Crop images with pixel-perfect precision",
              "Supports JPG, PNG, WebP, and GIF formats",
              "Preview original image before cropping",
              "No quality loss during cropping",
              "Perfect for social media profile pictures",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "How do I know what coordinates to use?",
                answer: "The X and Y values represent the top-left corner of your crop area (starting from 0,0 at the image's top-left). Width and Height define the size of the area to keep. Use an image editor to find exact coordinates if needed."
              },
              {
                question: "Will cropping reduce image quality?",
                answer: "No, cropping does not compress or reduce quality. It simply removes the pixels outside your selected area, keeping the original quality of the remaining portion."
              },
              {
                question: "How do I crop an image to a square for Instagram?",
                answer: "To create a square crop, enter the same value for both width and height. For Instagram, 1080x1080 pixels is the ideal size. Position your crop area using the X and Y coordinates to center on your subject."
              },
              {
                question: "Can I crop multiple images at once?",
                answer: "Currently, our tool processes one image at a time for maximum precision. For batch cropping, process each image individually to ensure perfect results."
              },
              {
                question: "What happens if my crop area is larger than the image?",
                answer: "If you enter dimensions that exceed the original image size, you'll receive an error message. Make sure your crop area fits within the original image boundaries shown in the preview."
              }
            ]}
            keywords={["crop image online", "image cropper free", "trim image", "cut image borders", "photo crop tool"]}
            relatedLinks={[
              { text: "Resize images to specific dimensions", href: "/resize-image" },
              { text: "Rotate and flip images", href: "/rotate-image" },
              { text: "Compress images to reduce file size", href: "/image-compressor" }
            ]}
            extraSections={[
              {
                title: "Common Cropping Use Cases",
                content: "Cropping is an essential image editing technique that allows you to remove unwanted portions while keeping the important parts intact. One of the most common uses is creating profile pictures for social media platforms, which typically require square images centered on a face. Photographers and content creators frequently crop photos to remove distracting elements from backgrounds, whether it's a passerby in a street photo or clutter in a product shot. E-commerce sellers rely heavily on cropping to create consistent product images with clean backgrounds and proper framing. Screenshots often need cropping to remove browser chrome, desktop clutter, or sensitive information visible in other windows. Professional photographers crop to improve composition, applying techniques like the rule of thirds after the fact to create more visually appealing images.",
                items: [
                  "Creating square profile pictures from rectangular photos",
                  "Removing unwanted backgrounds or distractions",
                  "Focusing on specific subjects in group photos",
                  "Preparing product images for e-commerce listings",
                  "Cutting borders or watermarks from screenshots",
                  "Creating banner images from landscape photos"
                ]
              },
              {
                title: "Popular Crop Aspect Ratios",
                content: "Understanding aspect ratios is crucial for effective cropping. The aspect ratio describes the proportional relationship between an image's width and height. Different platforms and use cases have standardized around specific aspect ratios. The 1:1 square format has become ubiquitous thanks to Instagram's original square-only format, and it remains ideal for profile pictures across platforms. The 4:3 aspect ratio is traditional for photography and presentations, while the wider 16:9 format dominates video content, YouTube thumbnails, and modern displays. Vertical 9:16 content has exploded with TikTok and Instagram Stories, requiring portrait-oriented crops. For printing photographs, 2:3 and 3:2 ratios align with standard photo paper sizes. Understanding these ratios helps you crop images that display perfectly without unexpected cropping by platforms.",
                items: [
                  "1:1 Square - Instagram posts, profile pictures",
                  "4:3 Standard - Traditional photos, presentations",
                  "16:9 Widescreen - YouTube thumbnails, headers",
                  "9:16 Portrait - Instagram Stories, TikTok",
                  "2:3 Photo - Standard photo prints",
                  "3:2 Landscape - DSLR camera photos"
                ]
              },
              {
                title: "How to Calculate Crop Coordinates",
                content: "Calculating the right crop coordinates ensures you get exactly the portion of the image you want. The coordinate system starts at the top-left corner of your image, which is position (0, 0). The X value increases as you move right, and the Y value increases as you move down. To center your crop on a specific subject, first find the subject's approximate center point in your image. Then subtract half your desired width from the X position to get your starting X coordinate, and subtract half your desired height from the Y position to get your starting Y coordinate. For example, if your subject is centered at position (500, 400) and you want a 200x200 pixel crop, you would use X=400, Y=300, Width=200, Height=200. Most image viewers show cursor coordinates when you hover over an image, making it easy to identify exact positions for precise cropping."
              }
            ]}
          />
          
          <RelatedTools currentToolId="crop-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
