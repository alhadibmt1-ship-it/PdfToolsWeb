import { useState } from "react";
import { ChevronLeft, Download, RefreshCw } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

export default function ConvertImagePage() {
  useSEO({
    title: "Convert Image Free - JPG PNG WebP | PDF HUB 24",
    description: "Convert image format free online. JPG to PNG, PNG to WebP, WebP to JPG. Best free image converter - fast, high quality. No signup.",
    keywords: "convert image free, image converter online, jpg to png free, png to jpg, webp to jpg, change image format free",
    canonicalPath: "/convert-image"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("convert-image", lang, getToolSEOData("convert-image")?.longTailH1 || "Convert Image");
  const toolDesc = getToolDesc("convert-image", lang, "Convert images between JPG, PNG, WebP, GIF, BMP, and TIFF formats with adjustable quality.");

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

          <EnhancedToolSEOContent toolId="convert-image" />
          
          <RelatedTools currentToolId="convert-image" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
