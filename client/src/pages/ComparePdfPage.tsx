import { useState } from "react";
import { ChevronLeft, Download, GitCompare } from "lucide-react";
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

export default function ComparePdfPage() {
  useSEO({
    title: "Compare PDF Files - Find Differences Between PDFs Free | PDF HUB 24",
    description: "Compare two PDF documents online for free. Find differences between PDF files side by side. Fast, secure PDF comparison tool.",
    keywords: "compare pdf, pdf comparison, diff pdf, find differences pdf, compare documents, pdf diff tool"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Compare PDF</h1>
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

          <ToolSEOContent
            toolName="Compare PDF"
            toolDescription="Compare two PDF documents and find the differences between them with our free online tool. Perfect for reviewing document revisions, checking contract changes, or verifying document integrity. Get a detailed text-based comparison report."
            howToSteps={[
              "Upload the first (original) PDF document.",
              "Upload the second (modified) PDF document.",
              "Click Compare PDFs to analyze both files.",
              "Review the differences and download the comparison report."
            ]}
            benefits={[
              "Find differences between document versions",
              "Text-based comparison of content",
              "Perfect for contract reviews",
              "Verify document integrity",
              "Download comparison as report",
              "Process files quickly",
              "No software installation required",
              "Completely free to use"
            ]}
            faqs={[
              {
                question: "How does the comparison work?",
                answer: "We extract the text content from both PDFs and compare them to find differences. This works best with text-based PDFs rather than scanned documents."
              },
              {
                question: "Does it compare images or layouts?",
                answer: "Currently, we compare text content only. Visual layout differences or image changes are not detected. For visual comparison, print both PDFs and compare manually."
              },
              {
                question: "Can I compare more than two PDFs?",
                answer: "The tool compares two PDFs at a time. For comparing multiple versions, compare them in pairs (e.g., original vs v1, v1 vs v2)."
              },
              {
                question: "What about scanned PDFs?",
                answer: "Scanned PDFs contain images, not text. For scanned documents, first use our OCR tool to extract text, then compare the text files."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["compare pdf", "pdf diff", "find differences", "document comparison"]}
          />
          
          <RelatedTools currentToolId="compare-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
