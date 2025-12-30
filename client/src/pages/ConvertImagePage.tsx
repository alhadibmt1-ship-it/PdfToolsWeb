import { useState } from "react";
import { ChevronLeft, Download, RefreshCw } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function ConvertImagePage() {
  useSEO({
    title: "Convert Image Free - JPG PNG WebP | PDF HUB 24",
    description: "Convert image format free online. JPG to PNG, PNG to WebP, WebP to JPG. Best free image converter - fast, high quality. No signup.",
    keywords: "convert image free, image converter online, jpg to png free, png to jpg, webp to jpg, change image format free",
    canonicalPath: "/convert-image"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<string>("90");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an image to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("format", outputFormat);
    formData.append("quality", quality);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/convert-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert image");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: `Image converted to ${outputFormat.toUpperCase()} successfully`,
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      const baseName = files[0]?.name.split('.').slice(0, -1).join('.') || 'converted';
      a.download = `${baseName}.${outputFormat}`;
      a.click();
    }
  };

  const getInputFormat = () => {
    if (files.length === 0) return "";
    const ext = files[0].name.split('.').pop()?.toLowerCase() || "";
    return ext.toUpperCase();
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Convert Image</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert images between JPG, PNG, WebP, GIF, BMP, and TIFF formats with adjustable quality.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".jpg,.jpeg,.png,.webp,.gif,.bmp,.tiff,.tif"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Conversion Settings</h3>
                </div>

                <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{getInputFormat()}</div>
                    <div className="text-xs text-muted-foreground">Input</div>
                  </div>
                  <RefreshCw className="w-6 h-6 text-muted-foreground" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{outputFormat.toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">Output</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger data-testid="select-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpg">JPG / JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                        <SelectItem value="gif">GIF</SelectItem>
                        <SelectItem value="tiff">TIFF</SelectItem>
                        <SelectItem value="bmp">BMP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Quality</Label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger data-testid="select-quality">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100% (Best)</SelectItem>
                        <SelectItem value="90">90% (High)</SelectItem>
                        <SelectItem value="80">80% (Good)</SelectItem>
                        <SelectItem value="70">70% (Medium)</SelectItem>
                        <SelectItem value="50">50% (Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Converting: <span className="font-medium text-foreground">{files[0].name}</span>
                  </p>
                </div>

                <Button 
                  onClick={handleConvert} 
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  Convert to {outputFormat.toUpperCase()}
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting your image..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your converted image is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {outputFormat.toUpperCase()} Image
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Convert Image"
            toolId="convert-image"
            toolDescription="Convert images between popular formats instantly with our free online image converter. Transform JPG to PNG when you need transparency support, convert PNG to WebP for dramatically smaller file sizes ideal for web use, or switch between any combination of JPG, PNG, WebP, GIF, BMP, and TIFF formats. Our adjustable quality settings from 50% to 100% give you complete control over the balance between file size and image quality. Whether you're optimizing images for faster website loading, preparing graphics for different software compatibility, or converting photos for professional printing, PDF HUB 24 handles all your image format conversion needs quickly and easily."
            howToSteps={[
              "Upload your image by clicking the upload area or drag and drop your file.",
              "Select the output format you want to convert to.",
              "Adjust the quality setting (higher = better quality, larger file).",
              "Click 'Convert' and download your converted image."
            ]}
            benefits={[
              "Convert between JPG, PNG, WebP, GIF, BMP, TIFF",
              "Adjustable quality from 50% to 100%",
              "Convert JPG to PNG for transparency support",
              "Convert PNG to WebP for smaller file sizes",
              "Maintain image quality during conversion",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "Which format should I choose?",
                answer: "JPG is best for photos (small file size, no transparency). PNG is best for graphics with transparency. WebP offers the smallest file sizes with good quality. GIF is for simple animations. TIFF is for high-quality print."
              },
              {
                question: "Does converting formats reduce quality?",
                answer: "Converting between lossless formats (PNG, TIFF) preserves quality. Converting to lossy formats (JPG, WebP) may reduce quality slightly, but our high-quality settings minimize loss. Use 90%+ quality for best results."
              },
              {
                question: "How do I convert PNG to JPG with a white background?",
                answer: "When converting PNG to JPG, transparent areas automatically become white since JPG doesn't support transparency. This is the expected behavior."
              },
              {
                question: "Why should I convert images to WebP format?",
                answer: "WebP typically produces files 25-35% smaller than JPG or PNG with similar quality. This speeds up website loading times and reduces bandwidth usage. Most modern browsers support WebP."
              },
              {
                question: "Can I convert animated GIFs to other formats?",
                answer: "When converting animated GIFs, only the first frame is extracted to formats that don't support animation (JPG, PNG, WebP, TIFF, BMP). To preserve animation, keep the GIF format."
              }
            ]}
            keywords={["convert image online", "jpg to png", "png to jpg", "webp converter", "image format converter free"]}
            relatedLinks={[
              { text: "Compress images to reduce file size", href: "/image-compressor" },
              { text: "Resize images to specific dimensions", href: "/resize-image" },
              { text: "Convert images to PDF", href: "/jpg-to-pdf" }
            ]}
            extraSections={[
              {
                title: "Image Format Comparison Guide",
                content: "Choosing the right image format is crucial for balancing quality, file size, and compatibility. JPG (or JPEG) remains the most widely used format for photographs due to its excellent compression that significantly reduces file sizes while maintaining acceptable visual quality. However, JPG uses lossy compression and doesn't support transparency. PNG is the go-to format for graphics, logos, screenshots, and any image requiring transparent backgrounds. It uses lossless compression, preserving every pixel, but produces larger files than JPG for photographs. WebP is a modern format developed by Google that offers superior compression compared to both JPG and PNG while supporting transparency. It's ideal for web use but may not work in older software. GIF is limited to 256 colors but uniquely supports simple animations. TIFF is preferred for professional print production due to its lossless quality and extensive color depth support, though files are substantially larger. BMP is an uncompressed format rarely used today except in legacy systems.",
                items: [
                  "JPG/JPEG: Best for photos, small file size, no transparency",
                  "PNG: Best for graphics, logos, supports transparency",
                  "WebP: Modern format, smallest size, good for web",
                  "GIF: Simple animations, limited to 256 colors",
                  "TIFF: High quality for print, very large files",
                  "BMP: Uncompressed, rarely used today"
                ]
              },
              {
                title: "When to Convert Image Formats",
                content: "Format conversion serves different purposes depending on your needs. Converting PNG to JPG is common when sharing photos, as it dramatically reduces file size (often by 80-90%) while maintaining visual quality for photographs. The reverse, JPG to PNG, is needed when you want to add a transparent background to an image or need lossless quality for further editing. Converting any format to WebP can reduce your website's image payload by 25-35%, significantly improving page load times and Core Web Vitals scores that affect search rankings. Professional print shops often require TIFF files for their high color fidelity and lossless quality. Converting animated GIFs to PNG extracts a single high-quality frame. Converting WebP back to JPG or PNG ensures compatibility with older software or systems that don't support the WebP format. Each conversion scenario requires understanding the tradeoffs between file size, quality, and format capabilities.",
                items: [
                  "PNG to JPG: Reduce file size for photos",
                  "JPG to PNG: Add transparency support",
                  "PNG/JPG to WebP: Optimize for faster websites",
                  "Any to TIFF: Prepare for professional printing",
                  "GIF to PNG: Get higher quality still images",
                  "WebP to JPG/PNG: Compatibility with older software"
                ]
              },
              {
                title: "Quality Settings Explained",
                content: "Our image converter offers adjustable quality settings from 50% to 100%, giving you control over the trade-off between file size and visual fidelity. The quality setting primarily affects lossy formats like JPG and WebP. At 100% quality, you get maximum visual quality with larger file sizes, ideal for professional work or archival purposes. At 90% quality, file sizes are noticeably smaller while visual differences are nearly imperceptible to most viewers, making this an excellent choice for web use. At 75% quality, compression artifacts may become visible in detailed areas but files are significantly smaller, suitable for thumbnails or previews. At 50% quality, compression is clearly visible but files are very small, appropriate only when file size is the primary concern. For PNG and TIFF outputs, quality settings have minimal effect since these are lossless formats. Start with 90% quality and reduce if file size is still too large for your needs."
              }
            ]}
          />
          
          <RelatedTools currentToolId="convert-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
