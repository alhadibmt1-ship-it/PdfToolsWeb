import { useState, useEffect } from "react";
import { ChevronLeft, Download } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";
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
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(settings.defaultCompressionLevel);
  const [hasManuallyChanged, setHasManuallyChanged] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    if (!hasManuallyChanged) {
      setCompressionLevel(settings.defaultCompressionLevel);
    }
  }, [settings.defaultCompressionLevel, hasManuallyChanged]);

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
            <p className="text-muted-foreground leading-relaxed mb-4">
              Reduce your PDF file size while maintaining quality. Choose your compression level based on your needs.
            </p>
            <TrustBadges />
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
                <RadioGroup 
                  value={compressionLevel} 
                  onValueChange={(value) => {
                    setCompressionLevel(value as CompressionLevel);
                    setHasManuallyChanged(true);
                  }}
                >
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

          <ToolSEOContent
            toolName="Compress PDF"
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
    </div>
  );
}
