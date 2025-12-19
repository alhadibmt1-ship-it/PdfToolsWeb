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
    title: "Compare PDF Free Online - Find Differences in PDFs | PDF HUB 24",
    description: "Compare PDF free online. Find differences between two PDF documents instantly. Best free PDF comparison tool - side by side diff. No signup required.",
    keywords: "compare pdf free, pdf comparison online, diff pdf, find differences between pdfs, compare two pdfs, pdf diff tool free"
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
            toolId="compare-pdf"
            toolDescription="Compare two PDF documents side by side and instantly identify the differences between them with our free online tool. Perfect for reviewing document revisions, verifying contract changes, tracking edits in legal agreements, or ensuring document integrity. Our tool extracts and analyzes text content from both files, delivering a detailed comparison report that highlights what's been added, removed, or modified. No software installation required — just upload, compare, and download your results."
            howToSteps={[
              "Upload the first PDF document (the original version) using the left upload zone.",
              "Upload the second PDF document (the modified or updated version) using the right upload zone.",
              "Click 'Compare PDFs' to analyze both files and generate a detailed comparison report.",
              "Review the highlighted differences and download the comparison report for your records."
            ]}
            benefits={[
              "Instantly find all differences between two document versions",
              "Text-based analysis for accurate content comparison",
              "Perfect for contract reviews and legal document verification",
              "Verify document integrity and detect unauthorized changes",
              "Download comparison results as a downloadable report",
              "Process files quickly with fast server-side comparison",
              "No software installation or account creation required",
              "Ideal for tracking revisions in business documents",
              "Completely free with no hidden fees or limitations"
            ]}
            faqs={[
              {
                question: "How does the PDF comparison work?",
                answer: "Our tool extracts the text content from both PDF documents and performs a detailed line-by-line comparison. The algorithm identifies additions, deletions, and modifications between the two versions, presenting the results in an easy-to-read format. This works best with text-based PDFs rather than scanned documents."
              },
              {
                question: "Does the tool compare images or visual layouts?",
                answer: "Currently, our comparison focuses on text content only. Visual layout differences, formatting changes, or image modifications are not detected. For purely visual comparison needs, we recommend printing both PDFs or using specialized visual diff software."
              },
              {
                question: "Can I compare more than two PDFs at once?",
                answer: "The tool compares two PDFs at a time, which is the standard approach for document comparison. For comparing multiple versions of a document, compare them in sequential pairs (e.g., original vs version 1, then version 1 vs version 2) to track changes over time."
              },
              {
                question: "What about scanned PDFs or image-based documents?",
                answer: "Scanned PDFs contain images rather than selectable text, so direct comparison isn't possible. For scanned documents, first use our OCR PDF tool to convert the images to searchable text, then compare the resulting text-based PDFs."
              },
              {
                question: "Is the comparison secure and private?",
                answer: "Yes, absolutely. Your PDF files are processed securely on our servers and automatically deleted after processing. We never store, share, or access the content of your documents. This makes our tool safe for comparing confidential contracts, legal documents, and sensitive business files."
              }
            ]}
            keywords={["compare pdf files", "pdf diff tool", "find pdf differences", "document comparison online", "pdf version compare"]}
            relatedLinks={[
              { text: "Extract text for manual comparison using Extract Text", href: "/extract-text" },
              { text: "Make scanned PDFs searchable using OCR PDF", href: "/ocr" },
              { text: "Combine document versions using Merge PDF", href: "/merge" },
              { text: "View individual PDFs using PDF Viewer", href: "/pdf-viewer" }
            ]}
            extraSections={[
              {
                title: "When to Use PDF Comparison",
                content: "Our PDF comparison tool is essential for various professional and personal scenarios where document accuracy matters:",
                items: [
                  "Reviewing contract revisions before signing",
                  "Verifying changes in legal agreements and amendments",
                  "Checking edits in academic papers and manuscripts",
                  "Comparing policy document updates",
                  "Auditing financial reports for unauthorized modifications",
                  "Tracking changes in proposals and quotes from vendors"
                ]
              },
              {
                title: "Best Practices for Accurate Comparison",
                content: "Follow these tips to get the most accurate comparison results from our tool:",
                items: [
                  "Use text-based PDFs (not scanned images) for best results",
                  "Convert scanned documents using OCR before comparing",
                  "Compare documents with similar formatting for clearer results",
                  "Use the original file as the first upload and the modified version as the second",
                  "Download the comparison report for documentation and records"
                ]
              }
            ]}
            exampleTable={{
              title: "Common PDF Comparison Scenarios",
              rows: [
                { label: "Contract Revision", before: "Original Agreement", after: "Amended Terms Highlighted" },
                { label: "Policy Update", before: "2023 Policy", after: "2024 Changes Identified" },
                { label: "Legal Document", before: "Draft Version", after: "Final Version Differences" },
                { label: "Report Audit", before: "Initial Report", after: "Modifications Detected" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="compare-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
