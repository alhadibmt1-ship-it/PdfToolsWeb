import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download, Hash } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function AddPageNumbersPage() {
  useSEO({
    title: "Add Page Numbers to PDF Free Online | PDF HUB 24",
    description: "Add page numbers to PDF free. Insert numbers at any position - top, bottom, corners. Customize font and size. No signup.",
    keywords: "add page numbers to pdf free, pdf page numbers, number pdf pages free, insert page numbers pdf, pdf pagination free",
    canonicalPath: "/add-page-numbers"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("add-page-numbers", lang, getToolSEOData("add-page-numbers")?.longTailH1 || "Add Page Numbers");
  const toolDesc = getToolDesc("add-page-numbers", lang, "Add page numbers to every page of your PDF document.");

  const [files, setFiles] = useState<File[]>([]);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState("1");
  const [fontSize, setFontSize] = useState("12");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    setStatus("idle");
    setFiles(newFiles);
  }, [resultUrl]);

  const handleAddNumbers = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Client-side file size validation
    if (files[0].size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Please upload a file under ${MAX_FILE_SIZE_MB}MB. Your file is ${(files[0].size / 1024 / 1024).toFixed(1)}MB.`,
        variant: "destructive",
      });
      return;
    }
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("position", position);
    formData.append("startNumber", startNumber);
    formData.append("fontSize", fontSize);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/add-page-numbers", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let serverError = "Conversion failed. Please try again.";
          try { const errBody = await response.clone().json(); if (errBody?.error) serverError = errBody.error; } catch {}
          throw new Error(serverError);
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Page numbers added successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to add page numbers. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFiles([]);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + "-numbered.pdf";
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
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {toolTitle}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {toolDesc}
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Page Number Options
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select value={position} onValueChange={(v) => setPosition(v as Position)}>
                      <SelectTrigger data-testid="select-position">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-center">Top Center</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-center">Bottom Center</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startNumber">Start Number</Label>
                    <Input
                      id="startNumber"
                      type="number"
                      min="1"
                      value={startNumber}
                      onChange={(e) => setStartNumber(e.target.value)}
                      data-testid="input-start-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Input
                      id="fontSize"
                      type="number"
                      min="8"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      data-testid="input-font-size"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddNumbers} 
                  className="w-full"
                  size="lg"
                  data-testid="button-add-numbers"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Add Page Numbers
                </Button>
              </div>
            )}

            <ProcessingState
              status={status === "processing" || status === "error" ? status : "idle"}
              progress={progress}
              message={status === "processing" ? "Adding page numbers..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your numbered PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF with Page Numbers
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleReset}
                  data-testid="button-convert-another"
                >
                  Convert Another File
                </Button>
                <div className="pt-3 border-t border-border/50 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">What's next?</span>
                  <Link href="/add-watermark" className="text-primary hover:underline font-medium" data-testid="link-post-download-1">Add Watermark →</Link>
                  <Link href="/protect-pdf" className="text-primary hover:underline font-medium" data-testid="link-post-download-2">Protect PDF →</Link>
                </div>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="add-page-numbers" />
          
          <RelatedTools currentToolId="add-page-numbers" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
