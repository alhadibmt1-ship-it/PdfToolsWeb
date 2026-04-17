import { useState } from "react";
import { ChevronLeft, Download, Copy } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

export default function ExtractTextPage() {
  useSEO({
    title: "Extract Text from PDF Free Online - PDF to Text | PDF HUB 24",
    description: "Extract text from PDF free. Copy text from any PDF document instantly. Best free PDF text extractor. No signup.",
    keywords: "extract text from pdf free, pdf to text, copy text from pdf, pdf text extractor free, get text from pdf online",
    canonicalPath: "/extract-text"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("extract-text", lang, getToolSEOData("extract-text")?.longTailH1 || "Extract Text from PDF");
  const toolDesc = getToolDesc("extract-text", lang, "Extract all text content from your PDF document. The text will be displayed here and can be downloaded as a .txt file.");

  const [files, setFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const data = await runWithProgress(async () => {
        const response = await fetch("/api/extract-text", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to extract text");
        }

        return await response.json();
      });

      setExtractedText(data.text);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Text extracted successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to extract text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
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
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleExtract} 
                className="w-full"
                size="lg"
                data-testid="button-extract"
              >
                Extract Text
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Extracting text from PDF..." : undefined}
            />

            {status === "success" && extractedText && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Extracted Text</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCopy} 
                      variant="outline"
                      size="sm"
                      data-testid="button-copy"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      onClick={handleDownloadText} 
                      variant="outline"
                      size="sm"
                      data-testid="button-download-text"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="textarea-extracted-text"
                />
                <p className="text-xs text-muted-foreground">
                  {extractedText.length} characters extracted
                </p>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent
            toolId="extract-text"
            fallbackToolName="Extract Text from PDF"
            fallbackDescription="Pull all text content from your PDF documents with our free online text extractor."
          />
          
          <RelatedTools currentToolId="extract-text" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
