import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Download, Plus, AlertCircle, CheckCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { useSEO } from "@/hooks/useSEO";

interface CapturedImage {
  id: string;
  file: File;
  preview: string;
}

export default function ScanToPdfPage() {
  useSEO({
    title: "Scan to PDF Online Free — Convert Camera Photos to PDF | PDF HUB 24",
    description: "Scan to PDF online free. Convert camera photos and images to PDF instantly from your browser. No app download needed.",
    keywords: "scan to pdf online free, scan document to pdf, photo to pdf scanner online, mobile scan to pdf, convert scanned image to pdf",
    canonicalPath: "/scan-to-pdf"
  });

  const [images, setImages] = useState<CapturedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  const addImages = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages: CapturedImage[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const preview = URL.createObjectURL(file);
      newImages.push({ id: `${Date.now()}-${Math.random()}`, file, preview });
    }
    setImages(prev => [...prev, ...newImages]);
    setDownloadUrl(null);
    addRecentTool("scan-to-pdf");
  }, [addRecentTool]);

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter(i => i.id !== id);
    });
    setDownloadUrl(null);
  };

  const moveImage = (id: string, direction: "up" | "down") => {
    setImages(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      toast({ title: "No images", description: "Please add at least one photo to convert.", variant: "destructive" });
      return;
    }
    setIsConverting(true);
    try {
      const formData = new FormData();
      images.forEach(img => formData.append("files", img.file));

      const response = await fetch("/api/jpg-to-pdf", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Conversion failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast({ title: "Converted!", description: `${images.length} photo${images.length > 1 ? "s" : ""} converted to PDF successfully.` });
    } catch {
      toast({ title: "Conversion failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadPdf = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "scanned_document.pdf";
    a.click();
  };

  const reset = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setImages([]);
    setDownloadUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Scan to PDF</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Use your camera to scan documents, receipts, or whiteboards and instantly convert them into a PDF file.
          </p>
        </div>

        <TrustBadges variant="expanded" className="mb-8" />

        {/* Camera / Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover-elevate transition-colors cursor-pointer"
            data-testid="button-open-camera"
          >
            <Camera className="w-10 h-10 text-primary" />
            <div>
              <div className="font-semibold">Use Camera</div>
              <div className="text-sm text-muted-foreground">Take a photo with your device camera</div>
            </div>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-border bg-muted/30 hover-elevate transition-colors cursor-pointer"
            data-testid="button-upload-images"
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <div>
              <div className="font-semibold">Upload Photos</div>
              <div className="text-sm text-muted-foreground">Select images from your device</div>
            </div>
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={e => addImages(e.target.files)}
          data-testid="input-camera"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => addImages(e.target.files)}
          data-testid="input-file"
        />

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-base">{images.length} page{images.length > 1 ? "s" : ""} ready</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} data-testid="button-add-more">
                    <Plus className="w-4 h-4 mr-1" /> Add more
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset} data-testid="button-reset">
                    <RotateCw className="w-4 h-4 mr-1" /> Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border aspect-[3/4] bg-muted">
                    <img
                      src={img.preview}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      <button
                        onClick={() => moveImage(img.id, "up")}
                        disabled={idx === 0}
                        className="w-7 h-7 rounded bg-white/20 text-white text-xs flex items-center justify-center disabled:opacity-30 hover:bg-white/40"
                        data-testid={`button-move-up-${idx}`}
                      >↑</button>
                      <button
                        onClick={() => removeImage(img.id)}
                        className="w-7 h-7 rounded bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500"
                        data-testid={`button-remove-${idx}`}
                      ><X className="w-4 h-4" /></button>
                      <button
                        onClick={() => moveImage(img.id, "down")}
                        disabled={idx === images.length - 1}
                        className="w-7 h-7 rounded bg-white/20 text-white text-xs flex items-center justify-center disabled:opacity-30 hover:bg-white/40"
                        data-testid={`button-move-down-${idx}`}
                      >↓</button>
                    </div>
                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      Page {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Banner */}
        {images.length === 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-sm text-muted-foreground mb-6">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Tip: </span>
              On mobile, tap "Use Camera" to open your camera directly. On desktop, you can upload multiple photos at once. Each photo becomes one page in your PDF.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {images.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {!downloadUrl ? (
              <Button
                className="flex-1 gap-2"
                onClick={convertToPdf}
                disabled={isConverting}
                data-testid="button-convert"
              >
                {isConverting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Converting...</>
                ) : (
                  <><Camera className="w-4 h-4" /> Convert {images.length} photo{images.length > 1 ? "s" : ""} to PDF</>
                )}
              </Button>
            ) : (
              <>
                <Button className="flex-1 gap-2" onClick={downloadPdf} data-testid="button-download">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button variant="outline" onClick={reset} data-testid="button-scan-again">
                  <Camera className="w-4 h-4 mr-2" /> Scan Again
                </Button>
              </>
            )}
          </div>
        )}

        {downloadUrl && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400 mb-8">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Your PDF is ready. Click Download to save it.
          </div>
        )}

        {/* How It Works */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">How to Scan Documents to PDF</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Open Camera", desc: "Tap 'Use Camera' to open your device camera. On mobile this uses your rear camera." },
                { step: "2", title: "Take Photos", desc: "Photograph each page of your document. Add multiple pages — each photo becomes a PDF page." },
                { step: "3", title: "Convert & Download", desc: "Click Convert, and your scanned pages are combined into a single downloadable PDF." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{step}</div>
                  <div>
                    <div className="font-semibold mb-1">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <EnhancedToolSEOContent toolId="scan-to-pdf" />
      </div>
    </div>
  );
}
