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
    title: "Repair PDF Free Online - Fix Corrupted PDF Files | PDF HUB 24",
    description: "Repair PDF free online. Fix corrupted or damaged PDF files that won't open. Best free PDF repair tool - recover broken documents instantly. No signup needed.",
    keywords: "repair pdf free, fix corrupted pdf, damaged pdf repair, pdf repair online free, fix broken pdf, recover pdf file"
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
            toolId="repair-pdf"
            toolDescription="Fix corrupted, damaged, or broken PDF files with our free online PDF repair tool. If your PDF won't open, displays blank pages, shows error messages, or has missing content, our advanced repair engine analyzes the document structure and attempts to rebuild and recover your valuable content. We fix common issues like damaged headers, corrupted cross-reference tables, broken stream objects, and incomplete file downloads."
            howToSteps={[
              "Upload your damaged or corrupted PDF file by clicking the upload area or dragging and dropping.",
              "Click the 'Repair PDF' button to start the automated analysis and repair process.",
              "Wait while our tool scans the document structure and attempts to fix identified issues.",
              "Download the repaired PDF and verify that your content has been successfully recovered."
            ]}
            benefits={[
              "Fix PDFs that won't open in any viewer",
              "Repair corrupted internal document structure",
              "Recover content from partially damaged files",
              "Fix incomplete or interrupted download issues",
              "Resolve PDF viewer compatibility problems",
              "Repair cross-reference table corruption",
              "Fix damaged stream and object data",
              "No software installation required",
              "Free with no registration or file limits"
            ]}
            faqs={[
              {
                question: "What types of PDF damage can be repaired?",
                answer: "Our tool can fix various structural issues including: damaged or missing PDF headers, corrupted cross-reference (xref) tables, broken object streams, truncated file endings from incomplete downloads, minor data corruption in text and images, and compatibility issues that cause some viewers to fail. However, severely corrupted files with large sections of missing or overwritten data may not be fully recoverable."
              },
              {
                question: "Will all my content be recovered from a damaged PDF?",
                answer: "Recovery success depends on the extent and type of corruption. Minor corruption (like damaged headers or xref tables) usually results in complete recovery. Moderate corruption may recover most content with some elements missing. Severe corruption where large portions of data are missing or overwritten may only allow partial recovery. We always recommend keeping backups of important files."
              },
              {
                question: "Why do PDF files become corrupted or damaged?",
                answer: "PDFs can become corrupted for many reasons: incomplete or interrupted downloads from the internet, storage drive errors or bad sectors, software crashes while creating or editing PDFs, email attachment transmission errors, virus or malware damage, improper ejection of USB drives, power outages during file saves, and file system corruption. Network transfers and cloud sync conflicts can also cause issues."
              },
              {
                question: "What should I do if the repair doesn't fully work?",
                answer: "If the first repair attempt doesn't fully restore your file, try these steps: 1) Run the repair tool again as multiple passes can sometimes improve results, 2) Try opening the repaired file in different PDF viewers (Adobe Reader, Chrome, Firefox), 3) Check if you have a backup copy or can re-download the original, 4) If it was emailed, ask the sender to resend the file, 5) For critical documents, consider professional data recovery services."
              },
              {
                question: "Can this tool crack password-protected PDFs?",
                answer: "No, this tool is specifically designed for repairing file corruption and structural damage. It cannot bypass, crack, or remove password protection. If you have a password-protected PDF that you know the password for, use our Unlock PDF tool instead. If you've forgotten the password, you'll need to recover it through other means."
              }
            ]}
            keywords={["repair pdf online", "fix corrupted pdf", "damaged pdf recovery", "broken pdf repair", "pdf file recovery tool"]}
            relatedLinks={[
              { text: "Unlock password-protected files using Unlock PDF", href: "/unlock-pdf" },
              { text: "Compress repaired files using Compress PDF", href: "/compress" },
              { text: "Extract content using Extract Text", href: "/extract-text" },
              { text: "Convert to images using PDF to JPG", href: "/pdf-to-jpg" }
            ]}
            extraSections={[
              {
                title: "Common PDF Corruption Symptoms",
                content: "Your PDF may be corrupted if you experience any of these issues:",
                items: [
                  "PDF viewer shows 'cannot open file' or 'file is damaged' errors",
                  "Document opens but shows blank or white pages",
                  "Only some pages display correctly while others are missing",
                  "Text appears garbled, overlapping, or incorrectly positioned",
                  "Images are missing, distorted, or show as broken icons",
                  "PDF reader crashes when trying to open the file"
                ]
              },
              {
                title: "Preventing PDF Corruption",
                content: "Follow these best practices to avoid PDF file corruption in the future:",
                items: [
                  "Always wait for downloads to complete fully before opening",
                  "Keep backup copies of important PDF documents",
                  "Use 'Safely Remove' when ejecting USB drives",
                  "Avoid editing PDFs during low disk space conditions",
                  "Use reliable cloud storage with version history",
                  "Scan files for viruses before opening unknown PDFs"
                ]
              }
            ]}
            exampleTable={{
              title: "Common Repair Scenarios",
              rows: [
                { label: "Incomplete download", before: "Won't open", after: "Fully accessible" },
                { label: "Corrupted header", before: "Invalid format error", after: "Opens normally" },
                { label: "Damaged xref table", before: "Missing pages", after: "All pages visible" },
                { label: "Partial file save", before: "Truncated content", after: "Content recovered" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="repair-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
