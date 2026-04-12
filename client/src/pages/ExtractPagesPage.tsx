import { useState } from "react";
import { ChevronLeft, Download, Scissors } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

const EXTRACT_FAQS = [
  { question: "How do I extract pages from a PDF for free?", answer: "Upload your PDF, enter the page numbers you want to keep (e.g., 1,3,5 or 2-7), click Extract Pages, and download your new PDF. It's 100% free with no sign-up needed." },
  { question: "Can I extract a range of pages from a PDF?", answer: "Yes! Enter page ranges like 2-7 to extract pages 2 through 7, or mix single pages and ranges like 1,3-5,8 to get exactly the pages you need." },
  { question: "Will extracting pages damage my original PDF?", answer: "No. Your original file is never modified. We create a brand-new PDF containing only the pages you selected, while your source file stays safe." },
  { question: "What's the difference between Extract Pages and Split PDF?", answer: "Extract Pages lets you pick specific pages to keep in a single output PDF. Split PDF divides a document into multiple files (by page range, size, or count). Use Extract when you want a custom subset of pages." },
];

const EXTRACT_STEPS = [
  "Upload your PDF file by clicking the upload area or dragging and dropping it",
  "Enter the page numbers or ranges to extract (e.g., 1,3,5-8)",
  "Click Extract Pages to create a new PDF with only those pages",
  "Download your extracted PDF instantly — free, no watermarks",
];

function parsePageRanges(input: string, totalPages: number): number[] {
  const pages: Set<number> = new Set();
  const parts = input.split(",").map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      if (!isNaN(start) && !isNaN(end) && start >= 1 && end >= start) {
        for (let i = start; i <= end; i++) pages.add(i);
      }
    } else {
      const n = parseInt(part);
      if (!isNaN(n) && n >= 1) pages.add(n);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export default function ExtractPagesPage() {
  useSEO({
    title: "Extract Pages from PDF Free - PDF Page Extractor | PDF HUB 24",
    description: "Extract specific pages from PDF free. Select single pages or ranges to create a new PDF. No signup, no watermarks. Instant download.",
    keywords: "extract pages from pdf free, pdf page extractor, extract pdf pages, save pages from pdf, pdf extract pages online, pull pages from pdf",
    canonicalPath: "/extract-pages",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pagesToExtract, setPagesToExtract] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({ title: "Error", description: "Please select a PDF file", variant: "destructive" });
      return;
    }
    if (!pagesToExtract.trim()) {
      toast({ title: "Error", description: "Please enter page numbers to extract", variant: "destructive" });
      return;
    }

    const pages = parsePageRanges(pagesToExtract, 9999);
    if (pages.length === 0) {
      toast({ title: "Invalid input", description: "Enter page numbers or ranges (e.g., 1,3,5-8)", variant: "destructive" });
      return;
    }

    setStatus("processing");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("pages", JSON.stringify(pages));

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/extract-pages", { method: "POST", body: formData });
        if (!response.ok) {
          const err = await response.json().catch(() => ({ error: "Extraction failed" }));
          throw new Error(err.error || "Extraction failed");
        }
        return response.blob();
      });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      toast({ title: "Extraction failed", description: err.message || "Something went wrong", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "extracted-pages.pdf";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <ToolBreadcrumbs toolName="Extract PDF Pages" category="edit-pdf" />
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground -ml-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          </Link>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Scissors className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Extract Pages from PDF</h1>
                <p className="text-sm text-muted-foreground">Save specific pages from any PDF as a new document</p>
              </div>
            </div>
          </div>

          <TrustBadges />

          <div className="space-y-4">
            {status === "idle" && files.length === 0 && (
              <FileUploadZone
                onFilesSelected={setFiles}
                acceptedFormats=".pdf"
                maxFiles={1}
              />
            )}

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-medium text-sm">{files[0].name}</p>
                    <p className="text-xs text-muted-foreground">{(files[0].size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setFiles([])}>Change file</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages-input">Pages to extract</Label>
                  <Input
                    id="pages-input"
                    placeholder="e.g. 1,3,5-8,12"
                    value={pagesToExtract}
                    onChange={e => setPagesToExtract(e.target.value)}
                    data-testid="input-pages"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use commas to separate pages and hyphens for ranges: <span className="font-mono">1,3,5-8,12</span>
                  </p>
                </div>

                <Button
                  onClick={handleExtract}
                  className="w-full"
                  size="lg"
                  disabled={!pagesToExtract.trim()}
                  data-testid="button-extract"
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  Extract Pages
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Extracting pages..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your extracted PDF is ready!</h3>
                <Button onClick={handleDownload} className="w-full" size="lg" data-testid="button-download">
                  <Download className="w-4 h-4 mr-2" />
                  Download Extracted PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setFiles([]); setStatus("idle"); setPagesToExtract(""); setResultUrl(null); }}
                  data-testid="button-new"
                >
                  Extract from Another PDF
                </Button>
                <Link href="/split-pdf">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
                    <span className="text-sm">
                      <span className="font-medium text-primary">Need to split the PDF into multiple files?</span>
                      <span className="text-muted-foreground ml-1">Try Split PDF — divide by page ranges or size.</span>
                    </span>
                    <span className="text-xs font-semibold text-primary whitespace-nowrap">Split PDF →</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="extract-pages" />
          <RelatedTools currentToolId="extract-pages" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
