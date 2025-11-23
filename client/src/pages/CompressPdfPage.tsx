import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import type { CompressionLevel } from "@shared/schema";

export default function CompressPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const handleCompress = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to compress",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    setProgress(0);
    setOriginalSize(files[0].size);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("level", compressionLevel);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Failed to compress PDF");
      }

      const blob = await response.blob();
      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF compressed successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to compress PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "compressed.pdf";
      a.click();
    }
  };

  const savings = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Compress PDF</h1>
            <p className="text-muted-foreground leading-relaxed">
              Reduce your PDF file size while maintaining quality. Choose your compression level based on your needs.
            </p>
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold mb-4">Compression Level</h3>
                <RadioGroup value={compressionLevel} onValueChange={(value) => setCompressionLevel(value as CompressionLevel)}>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="low" id="low" data-testid="radio-low" />
                    <Label htmlFor="low" className="cursor-pointer flex-1">
                      <div className="font-medium">Low Compression</div>
                      <div className="text-sm text-muted-foreground">Best quality, larger file size</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="medium" id="medium" data-testid="radio-medium" />
                    <Label htmlFor="medium" className="cursor-pointer flex-1">
                      <div className="font-medium">Medium Compression (Recommended)</div>
                      <div className="text-sm text-muted-foreground">Balanced quality and size</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                    <RadioGroupItem value="high" id="high" data-testid="radio-high" />
                    <Label htmlFor="high" className="cursor-pointer flex-1">
                      <div className="font-medium">High Compression</div>
                      <div className="text-sm text-muted-foreground">Smallest file size, reduced quality</div>
                    </Label>
                  </div>
                </RadioGroup>
                <Button 
                  onClick={handleCompress} 
                  className="w-full"
                  size="lg"
                  data-testid="button-compress"
                >
                  Compress PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Compressing your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your compressed PDF is ready!</h3>
                {savings > 0 && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-sm text-muted-foreground">Size reduction:</span>
                    <span className="text-lg font-semibold text-green-600">{savings}%</span>
                  </div>
                )}
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed PDF
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
