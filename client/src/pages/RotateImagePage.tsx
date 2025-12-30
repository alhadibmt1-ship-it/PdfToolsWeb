import { useState, useEffect } from "react";
import { ChevronLeft, Download, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Rotate & Flip Image</h1>
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

          <ToolSEOContent
            toolName="Rotate & Flip Image"
            toolId="rotate-image"
            toolDescription="Rotate or flip any image instantly with our free online rotation tool. Fix incorrectly oriented photos by rotating 90°, 180°, or 270° clockwise or counterclockwise. Create mirror effects by flipping images horizontally or vertically. Our real-time preview shows exactly how your final image will look before you download. Perfect for correcting smartphone photos taken in the wrong orientation, preparing scanned documents, creating artistic mirror effects, or aligning images for collages and compositions. Supports all popular formats including JPG, PNG, WebP, and GIF with zero quality loss during rotation."
            howToSteps={[
              "Upload your image by clicking the upload area or drag and drop your file.",
              "Use the rotation buttons to rotate left or right by 90 degrees.",
              "Use the flip buttons to flip horizontally or vertically.",
              "Preview your changes in real-time, then click 'Apply Changes' to download."
            ]}
            benefits={[
              "Rotate images 90°, 180°, or 270°",
              "Flip horizontally or vertically",
              "Real-time preview of changes",
              "Supports JPG, PNG, WebP, and GIF",
              "No quality loss during rotation",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "Does rotating an image reduce quality?",
                answer: "No, our rotation tool preserves the original image quality. Rotation is a lossless operation that simply rearranges pixels."
              },
              {
                question: "Can I combine rotation and flip?",
                answer: "Yes! You can rotate and flip in any combination. The preview shows exactly how your final image will look."
              },
              {
                question: "Why are my phone photos sideways?",
                answer: "Smartphones store orientation data in EXIF metadata. Some software ignores this data, showing photos sideways. Use our rotate tool to permanently fix the orientation by actually rotating the pixels."
              },
              {
                question: "What's the difference between rotate and flip?",
                answer: "Rotation turns the image around its center (like spinning a wheel). Flipping creates a mirror image - horizontal flip swaps left and right, vertical flip swaps top and bottom."
              },
              {
                question: "Can I rotate by custom angles like 45 degrees?",
                answer: "Our tool supports 90-degree increments (90°, 180°, 270°) which are the most common rotation needs. For custom angle rotation, you would need specialized image editing software."
              }
            ]}
            keywords={["rotate image online", "flip image", "image rotator free", "mirror image", "rotate photo 90 degrees"]}
            relatedLinks={[
              { text: "Resize images to specific dimensions", href: "/resize-image" },
              { text: "Crop images to remove areas", href: "/crop-image" },
              { text: "Convert images to different formats", href: "/convert-image" }
            ]}
            extraSections={[
              {
                title: "When to Rotate or Flip Images",
                content: "Image rotation and flipping are fundamental editing operations needed in numerous real-world scenarios. The most common need is fixing photos that appear sideways or upside down. This often happens with smartphone photos because the phone's orientation sensor sometimes records incorrect metadata, or when software fails to read the embedded orientation data correctly. Scanned documents frequently need rotation when pages are fed into the scanner at the wrong angle or orientation. Photographers use rotation to straighten horizons or experiment with different compositions. Flipping images is popular for creating mirror effects in artistic work, for adjusting selfies (which are mirrored by front-facing cameras), or for creating symmetrical designs. Video editors often flip footage when the subject should face a different direction for better visual flow. Our real-time preview lets you see exactly how rotations and flips will look before committing to the changes.",
                items: [
                  "Fixing photos taken in wrong orientation",
                  "Correcting sideways smartphone photos",
                  "Creating mirror effects for artistic purposes",
                  "Flipping selfies to match your real appearance",
                  "Preparing scanned documents that were fed incorrectly",
                  "Aligning images for collages and compositions"
                ]
              },
              {
                title: "Rotation vs Flipping Explained",
                content: "While rotation and flipping might seem similar, they produce fundamentally different results. Rotation pivots the image around its center point, like spinning a playing card on a table. A 90-degree clockwise rotation turns a landscape photo into portrait orientation (and vice versa). A 180-degree rotation turns the image completely upside down, useful for fixing photos taken with an inverted camera. In contrast, flipping creates a mirror image without rotating the angle. Horizontal flipping swaps the left and right sides, like looking at a reflection in a mirror. This is commonly used to correct selfies, which front-facing cameras capture as mirror images. Vertical flipping swaps top and bottom, creating an upside-down reflection effect useful for artistic purposes or creating water reflection effects. You can combine rotation and flipping operations to achieve any desired orientation for your image.",
                items: [
                  "Rotation turns the image clockwise or counterclockwise",
                  "90° rotation turns landscape to portrait (or vice versa)",
                  "180° rotation turns the image upside down",
                  "Horizontal flip creates a mirror image (left-right swap)",
                  "Vertical flip creates an upside-down mirror effect",
                  "Combine rotation and flip for any orientation needed"
                ]
              },
              {
                title: "Fixing Common Orientation Problems",
                content: "Many image orientation issues stem from how different devices and software handle EXIF orientation metadata. Modern smartphones embed orientation data in the image file rather than physically rotating the pixels. This saves processing time but causes problems when software ignores this metadata, displaying images sideways or upside down. The solution is to use our rotation tool to physically rotate the image pixels, which works universally regardless of how software handles metadata. For batch processing scanned documents, rotate each page as you scan to maintain consistency. When preparing images for web uploads, always rotate to the correct orientation beforehand since some platforms strip EXIF data during upload. If your rotated image looks correct in our preview but wrong elsewhere, the issue is likely EXIF metadata conflicts, and re-saving the rotated version from our tool will resolve it permanently."
              }
            ]}
          />
          
          <RelatedTools currentToolId="rotate-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
