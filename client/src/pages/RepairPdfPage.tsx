import { useState } from "react";
import { ChevronLeft, Download, Wrench } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function RepairPdfPage() {
  useSEO({
    title: "Repair PDF Online Free - Fix Corrupted PDF Files | PDF HUB 24",
    description: "Repair corrupted or damaged PDF files online for free. Fix PDF documents that won't open or display correctly. Fast, secure PDF repair tool.",
    keywords: "repair pdf, fix pdf, corrupted pdf, damaged pdf, pdf repair tool, fix broken pdf"
  });

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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Repair PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Attempt to repair corrupted or damaged PDF files. Fix documents that won't open or display incorrectly.
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

          <ToolSEOContent
            toolName="Repair PDF"
            toolDescription="Fix corrupted or damaged PDF files with our free online PDF repair tool. If your PDF won't open, displays incorrectly, or shows error messages, our tool attempts to rebuild the document structure and recover your content."
            howToSteps={[
              "Upload your damaged or corrupted PDF file.",
              "Click the Repair PDF button to start the repair process.",
              "Wait while we analyze and attempt to fix the document.",
              "Download the repaired PDF and verify the content."
            ]}
            benefits={[
              "Fix PDFs that won't open",
              "Repair corrupted document structure",
              "Recover content from damaged files",
              "Handle incomplete or broken downloads",
              "Fix PDF viewer compatibility issues",
              "No software installation required",
              "Quick processing",
              "Free with no registration"
            ]}
            faqs={[
              {
                question: "What types of damage can be repaired?",
                answer: "Our tool can fix structural issues like damaged headers, cross-reference tables, and stream objects. Severely corrupted files with missing data may not be fully recoverable."
              },
              {
                question: "Will all my content be recovered?",
                answer: "We attempt to recover as much content as possible, but results depend on the extent of corruption. Minor corruption usually results in full recovery."
              },
              {
                question: "Why do PDFs become corrupted?",
                answer: "Common causes include incomplete downloads, storage drive errors, software crashes while editing, or transmission errors. Virus damage can also corrupt files."
              },
              {
                question: "What if the repair doesn't work?",
                answer: "If the file is too damaged, repair may not be possible. Try the repair tool multiple times or check if you have a backup of the original file."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["repair pdf", "fix corrupted pdf", "damaged pdf", "pdf recovery"]}
          />
          
          <RelatedTools currentToolId="repair-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
