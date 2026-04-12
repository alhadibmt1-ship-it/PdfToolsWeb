import { useState } from "react";
import { ChevronLeft, Download, GitCompare } from "lucide-react";
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

export default function ComparePdfPage() {
  useSEO({
    title: "Compare PDF Free - PDF Diff Tool | PDF HUB 24",
    description: "Compare PDF free online. Find differences between two PDF files instantly. Best free PDF comparison tool - side by side diff. No signup.",
    keywords: "compare pdf free, pdf comparison online, diff pdf, find differences between pdfs, compare two pdfs, pdf diff tool free",
    canonicalPath: "/compare-pdf"
  });

  const [files1, setFiles1] = useState<File[]>([]);
  const [files2, setFiles2] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [differences, setDifferences] = useState<string>("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleCompare = async () => {
    if (files1.length === 0 || files2.length === 0) {
      toast({
        title: "Error",
        description: "Please select both PDF files to compare",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file1", files1[0]);
    formData.append("file2", files2[0]);

    try {
      const result = await runWithProgress(async () => {
        const response = await fetch("/api/compare-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to compare PDFs");
        }

        return await response.json();
      });

      setDifferences(result.comparison || "");
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDFs compared successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to compare PDFs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([differences], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pdf-comparison.txt";
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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("compare-pdf")?.longTailH1 || "Compare PDF"}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Compare two PDF documents and find the differences between them.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">First PDF (Original)</h3>
                <FileUploadZone
                  onFilesSelected={setFiles1}
                  acceptedFormats=".pdf"
                  multiple={false}
                  disabled={status === "processing"}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Second PDF (Modified)</h3>
                <FileUploadZone
                  onFilesSelected={setFiles2}
                  acceptedFormats=".pdf"
                  multiple={false}
                  disabled={status === "processing"}
                />
              </div>
            </div>

            {files1.length > 0 && files2.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready to Compare</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Comparing: <strong>{files1[0].name}</strong> with <strong>{files2[0].name}</strong>
                </p>
                <Button 
                  onClick={handleCompare} 
                  className="w-full"
                  size="lg"
                  data-testid="button-compare"
                >
                  Compare PDFs
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Comparing your PDFs..." : undefined}
            />

            {status === "success" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Comparison Results</h3>
                <div className="p-4 bg-muted rounded-md max-h-96 overflow-auto">
                  <pre className="whitespace-pre-wrap text-sm" data-testid="text-result">
                    {differences || "No differences found between the documents."}
                  </pre>
                </div>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Comparison Report
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFiles1([]);
                    setFiles2([]);
                    setStatus("idle");
                    setDifferences("");
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Compare Other PDFs
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="compare-pdf" />
          
          <RelatedTools currentToolId="compare-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
