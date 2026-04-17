import { useState } from "react";
import { ChevronLeft, Download, Wrench } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

export default function RepairPdfPage() {
  useSEO({
    title: "Repair PDF Free - Fix Corrupted Files | PDF HUB 24",
    description: "Repair PDF free. Fix corrupted or damaged PDF files that won't open. Recover broken documents. No signup.",
    keywords: "repair pdf free, fix corrupted pdf, damaged pdf repair, pdf repair online free, fix broken pdf, recover pdf file",
    canonicalPath: "/repair-pdf"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("repair-pdf", lang, getToolSEOData("repair-pdf")?.longTailH1 || "Repair PDF");
  const toolDesc = getToolDesc("repair-pdf", lang, "Attempt to repair corrupted or damaged PDF files. Fix documents that won't open or display incorrectly.");

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleRepair = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to repair",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/repair-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to repair PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF repair attempted successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to repair PDF. The file may be too damaged.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "repaired.pdf";
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
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready to Repair</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll attempt to fix structural issues in your PDF. Results depend on the extent of corruption.
                </p>
                <Button 
                  onClick={handleRepair} 
                  className="w-full"
                  size="lg"
                  data-testid="button-repair"
                >
                  Repair PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Attempting to repair your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Repair completed!</h3>
                <p className="text-sm text-muted-foreground">
                  Please download and test the repaired file. If the original was severely corrupted, some content may not be recoverable.
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Repaired PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setStatus("idle");
                    setResultUrl(null);
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Repair Another PDF
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="repair-pdf" />
          
          <RelatedTools currentToolId="repair-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
