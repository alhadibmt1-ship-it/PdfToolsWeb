import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import CloudImportBar from "@/components/CloudImportBar";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import CountrySpotlight from "@/components/CountrySpotlight";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import StepIndicator from "@/components/StepIndicator";
import SuccessCelebration from "@/components/SuccessCelebration";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";
import type { CompressionLevel } from "@shared/schema";
import { useSEO } from "@/hooks/useSEO";

export default function CompressPdfPage() {
  useSEO({
    title: "Compress PDF Free - Reduce Size Up to 90% | PDF HUB 24",
    description: "Compress PDF free. Reduce file size up to 90% without losing quality. Best free PDF compressor for email. No signup.",
    keywords: "compress pdf free, reduce pdf size, compress pdf online, pdf compressor free, shrink pdf, make pdf smaller, compress pdf for email",
    canonicalPath: "/compress-pdf"
  });

  const { lang } = useLanguage();
  const { settings } = useSettings();
  const { addRecentTool } = useRecentTools();
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(settings.defaultCompressionLevel);
  const [hasManuallyChanged, setHasManuallyChanged] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const toolTitle = getToolTitle("compress", lang, getToolSEOData("compress")?.longTailH1 || "Compress PDF");
  const toolDesc = getToolDesc("compress", lang, "Reduce your PDF file size while maintaining quality. Choose your compression level based on your needs.");

  useEffect(() => {
    addRecentTool("compress");
  }, [addRecentTool]);

  useEffect(() => {
    if (!hasManuallyChanged) {
      setCompressionLevel(settings.defaultCompressionLevel);
    }
  }, [settings.defaultCompressionLevel, hasManuallyChanged]);

  useEffect(() => {
    if (status === "success" && resultUrl && settings.autoDownload) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + "-compressed.pdf";
      a.click();
    }
  }, [status, resultUrl, settings.autoDownload]);

  const currentStep = status === "idle" && files.length === 0 ? 1 
    : status === "idle" && files.length > 0 ? 2 
    : status === "processing" ? 2 
    : status === "success" ? 3 
    : 2;

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    setStatus("idle");
    setFiles(newFiles);
  }, [resultUrl]);

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
    setOriginalSize(files[0].size);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("level", compressionLevel);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/compress", {
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

      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);
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
      a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + "-compressed.pdf";
      a.click();
    }
  };

  const handleReset = () => {
    setFiles([]);
    setStatus("idle");
    setResultUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  const savings = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              {toolTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-5">
              {toolDesc}
            </p>
            <TrustBadges variant="prominent" className="max-w-2xl mx-auto" />
          </div>

          <StepIndicator currentStep={currentStep} className="mb-8" />

          <div className="space-y-6">
            {status !== "success" && (
              <>
                <FileUploadZone
                  onFilesSelected={handleFilesSelected}
                  acceptedFormats=".pdf"
                  multiple={false}
                  disabled={status === "processing"}
                  toolName={t(lang, "compressPdfBtn")}
                />
                <CloudImportBar
                  accept="pdf"
                  onFileImported={(file) => handleFilesSelected([file])}
                />
              </>
            )}

            {files.length === 0 && status === "idle" && (
              <Link href="/batch-compress">
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/40 border border-border/50 cursor-pointer hover:bg-muted/70 transition-colors" data-testid="link-batch-compress-tip">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t(lang, "batchCompressTip")}</span>
                    {" "}{t(lang, "tryBatchCompress")} — process up to 20 files, download as ZIP.
                  </span>
                  <span className="text-xs font-semibold text-primary whitespace-nowrap shrink-0">Try it →</span>
                </div>
              </Link>
            )}

            {files.length > 0 && status === "idle" && (
              <Card className="p-5 sm:p-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t(lang, "compressionLevelTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t(lang, "compressionLevelDesc")}</p>
                </div>
                
                <RadioGroup 
                  value={compressionLevel} 
                  onValueChange={(value) => {
                    setCompressionLevel(value as CompressionLevel);
                    setHasManuallyChanged(true);
                  }}
                  className="space-y-2"
                >
                  <label 
                    htmlFor="low" 
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/30 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="low" id="low" data-testid="radio-low" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">{t(lang, "lowCompression")}</div>
                      <div className="text-sm text-muted-foreground">{t(lang, "lowCompressionDesc")}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                      {t(lang, "qualityBadge")}
                    </span>
                  </label>
                  
                  <label 
                    htmlFor="medium" 
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/50 bg-primary/5 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="medium" id="medium" data-testid="radio-medium" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {t(lang, "mediumCompression")}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                          {t(lang, "recommended")}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{t(lang, "mediumCompressionDesc")}</div>
                    </div>
                  </label>
                  
                  <label 
                    htmlFor="high" 
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/30 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="high" id="high" data-testid="radio-high" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">{t(lang, "highCompression")}</div>
                      <div className="text-sm text-muted-foreground">{t(lang, "highCompressionDesc")}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium">
                      {t(lang, "smallestBadge")}
                    </span>
                  </label>
                </RadioGroup>
                
                <Button 
                  onClick={handleCompress} 
                  className="w-full gap-2"
                  size="lg"
                  data-testid="button-compress"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  {t(lang, "compressPdfBtn")}
                </Button>
              </Card>
            )}

            {status === "processing" && (
              <ProcessingState
                status={status}
                progress={progress}
                message={t(lang, "processingFile")}
              />
            )}

            {status === "success" && resultUrl && (
              <Card className="p-5 sm:p-6 border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
                <div className="text-center space-y-5">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
                    <Download className="w-8 h-8 text-green-500" aria-hidden="true" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {t(lang, "compressCompleteTitle")}
                    </h3>
                    <p className="text-muted-foreground">{t(lang, "compressReadyDesc")}</p>
                  </div>

                  {savings > 0 && (
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">{t(lang, "originalSizeLabel")}</div>
                        <div className="font-semibold">{formatBytes(originalSize)}</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-green-500/10">
                        <div className="text-xs text-green-600 dark:text-green-400 mb-1">{t(lang, "savedLabel")}</div>
                        <div className="font-bold text-green-600 dark:text-green-400 text-lg">{savings}%</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">{t(lang, "newSizeLabel")}</div>
                        <div className="font-semibold">{formatBytes(compressedSize)}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={handleDownload} 
                      size="lg"
                      className="gap-2"
                      data-testid="button-download"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      {t(lang, "downloadCompressedBtn")}
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      data-testid="button-compress-another"
                    >
                      {t(lang, "compressAnotherBtn")}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {status === "error" && (
              <ProcessingState
                status={status}
                message="Failed to compress PDF. Please try again with a different file."
              />
            )}
            {status === "error" && (
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={handleReset}
                data-testid="button-retry"
              >
                Try Again
              </Button>
            )}
          </div>

          <EnhancedToolSEOContent toolId="compress" />

          <CountrySpotlight toolCountrySlug="compress-pdf-online" />
          
          <RelatedTools currentToolId="compress" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName={t(lang, "compressPdfBtn")}
        fileName={files[0]?.name}
        originalSize={originalSize}
        newSize={compressedSize}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
