import { useState, useEffect } from "react";
import { ChevronLeft, Download, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
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
import type { CompressionLevel } from "@shared/schema";
import { useSEO } from "@/hooks/useSEO";

export default function CompressPdfPage() {
  useSEO({
    title: "Compress PDF Online Free - Reduce PDF File Size | PDF HUB 24",
    description: "Compress PDF files online for free. Reduce PDF file size without losing quality. Choose compression level. Fast and secure PDF compression. No registration required.",
    keywords: "compress pdf, reduce pdf size, compress pdf online free, pdf compressor, shrink pdf, optimize pdf"
  });

  const { settings } = useSettings();
  const { addRecentTool } = useRecentTools();
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(settings.defaultCompressionLevel);
  const [hasManuallyChanged, setHasManuallyChanged] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    addRecentTool("compress");
  }, [addRecentTool]);

  useEffect(() => {
    if (!hasManuallyChanged) {
      setCompressionLevel(settings.defaultCompressionLevel);
    }
  }, [settings.defaultCompressionLevel, hasManuallyChanged]);

  const currentStep = status === "idle" && files.length === 0 ? 1 
    : status === "idle" && files.length > 0 ? 2 
    : status === "processing" ? 2 
    : status === "success" ? 3 
    : 2;

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
          throw new Error("Failed to compress PDF");
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
      a.download = "compressed.pdf";
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
              Back to Tools
            </div>
          </Link>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Compress PDF
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-5">
              Reduce your PDF file size while maintaining quality. Choose your compression level based on your needs.
            </p>
            <TrustBadges variant="prominent" className="max-w-2xl mx-auto" />
          </div>

          <StepIndicator currentStep={currentStep} className="mb-8" />

          <div className="space-y-6">
            {status !== "success" && (
              <FileUploadZone
                onFilesSelected={setFiles}
                acceptedFormats=".pdf"
                multiple={false}
                disabled={status === "processing"}
                toolName="Compress PDF"
              />
            )}

            {files.length > 0 && status === "idle" && (
              <Card className="p-5 sm:p-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Choose Compression Level</h3>
                  <p className="text-sm text-muted-foreground">Select the level that best fits your needs</p>
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
                      <div className="font-medium">Low Compression</div>
                      <div className="text-sm text-muted-foreground">Best quality, slightly smaller file size</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                      Quality
                    </span>
                  </label>
                  
                  <label 
                    htmlFor="medium" 
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/50 bg-primary/5 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="medium" id="medium" data-testid="radio-medium" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        Medium Compression
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                          Recommended
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Balanced quality and file size</div>
                    </div>
                  </label>
                  
                  <label 
                    htmlFor="high" 
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/30 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="high" id="high" data-testid="radio-high" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">High Compression</div>
                      <div className="text-sm text-muted-foreground">Smallest file size, reduced image quality</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium">
                      Smallest
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
                  Compress PDF
                </Button>
              </Card>
            )}

            {status === "processing" && (
              <ProcessingState
                status={status}
                progress={progress}
                message="Compressing your PDF..."
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
                      Compression Complete!
                    </h3>
                    <p className="text-muted-foreground">Your PDF has been optimized and is ready for download</p>
                  </div>

                  {savings > 0 && (
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">Original</div>
                        <div className="font-semibold">{formatBytes(originalSize)}</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-green-500/10">
                        <div className="text-xs text-green-600 dark:text-green-400 mb-1">Saved</div>
                        <div className="font-bold text-green-600 dark:text-green-400 text-lg">{savings}%</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">New Size</div>
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
                      Download Compressed PDF
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      data-testid="button-compress-another"
                    >
                      Compress Another File
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
          </div>

          <ToolSEOContent
            toolName="Compress PDF"
            toolId="compress"
            toolDescription="Reduce your PDF file size instantly while maintaining high quality. Our free online PDF compressor helps you shrink documents for email, WhatsApp, websites, and cloud storage — all with one click. Choose from low, medium, or high compression based on your needs. No signup, no installation, no fees. Large PDF files can slow down uploads, email attachments, and website performance. PDF HUB 24 makes it easy to minimize your PDF size without losing clarity."
            howToSteps={[
              "Upload your PDF file (drag & drop or click to browse).",
              "Select compression level: Low (best quality), Medium (balanced), or High (maximum size reduction).",
              "Click 'Compress PDF' to start processing.",
              "Download your optimized PDF and check how much space you saved."
            ]}
            benefits={[
              "Reduce PDF size up to 90% with high compression",
              "Perfect for email attachments and web uploads",
              "Keep text and images clear and readable",
              "See final file size before downloading",
              "Works with all types of PDFs",
              "Choose from low, medium, or high compression",
              "Maintain text readability even on high compression",
              "Process multiple files one after another",
              "Save your preferred compression level for faster use"
            ]}
            faqs={[
              {
                question: "Which compression level should I choose?",
                answer: "For printing or office use, choose Low compression. For emails and uploads, choose Medium. For maximum size reduction, choose High compression."
              },
              {
                question: "How much can I reduce my PDF size?",
                answer: "Depending on the content, you can reduce size by 30-90%. Image-heavy PDFs shrink the most."
              },
              {
                question: "Will compression affect my text quality?",
                answer: "No. Our tool keeps text sharp and readable. High compression mostly affects image resolution, not text."
              },
              {
                question: "Can I compress password-protected PDFs?",
                answer: "Yes, but you must unlock the file first using our Unlock PDF tool, then compress it."
              },
              {
                question: "Is there a file size limit?",
                answer: "Our tool supports standard PDF sizes. Very large files may take longer, but most compress successfully."
              }
            ]}
            keywords={["compress pdf", "reduce pdf size", "shrink pdf online", "pdf compressor free", "optimize pdf file"]}
            relatedLinks={[
              { text: "Remove unwanted pages using Delete PDF Pages", href: "/delete-pages" },
              { text: "Combine multiple files using Merge PDF", href: "/merge" },
              { text: "Convert documents using PDF to Word", href: "/pdf-to-word" },
              { text: "Extract text content using Extract Text", href: "/extract-text" }
            ]}
            extraSections={[
              {
                title: "Why Do PDF Files Become Large?",
                content: "PDF files can become heavy due to various factors. PDF HUB 24 optimizes these elements to reduce size without affecting readability.",
                items: [
                  "High-resolution images",
                  "Scanned pages",
                  "Embedded fonts and graphics",
                  "Multiple merged documents",
                  "Print-ready formatting"
                ]
              },
              {
                title: "When Should You Compress a PDF?",
                content: "Use this tool when you need to reduce file size for various purposes:",
                items: [
                  "Email attachment size is too large",
                  "Uploading documents to government websites",
                  "Sharing files on WhatsApp or Messenger",
                  "Saving storage on your mobile or laptop",
                  "Uploading PDFs to your website for speed optimization",
                  "Sending invoices, ID copies, certificates, contracts"
                ]
              }
            ]}
            exampleTable={{
              title: "Example PDF Size Reduction",
              rows: [
                { label: "Scanned Document (10 MB)", before: "10 MB", after: "1.2 MB" },
                { label: "Image-heavy PDF (25 MB)", before: "25 MB", after: "3-5 MB" },
                { label: "Office Document (5 MB)", before: "5 MB", after: "600-800 KB" },
                { label: "Web-optimized PDF", before: "3 MB", after: "300-500 KB" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="compress" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="Compress PDF"
        fileName={files[0]?.name}
        originalSize={originalSize}
        newSize={compressedSize}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
