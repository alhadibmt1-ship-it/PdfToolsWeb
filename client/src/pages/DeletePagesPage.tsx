import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, Download } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

const DELETE_FAQS = [
  { question: "How do I delete pages from PDF for free?", answer: "Upload your PDF file, enter the page numbers you want to remove (separated by commas), click Delete Pages, and download your modified PDF. It's 100% free with no registration required." },
  { question: "Can I remove multiple pages from PDF at once?", answer: "Yes! Enter all page numbers separated by commas (e.g., 1,3,5,7) to delete multiple pages in a single operation. Fast and efficient." },
  { question: "Is this PDF page remover safe to use?", answer: "Absolutely. Your files are processed securely and deleted after download. We never store or access your documents. Your privacy is guaranteed." },
  { question: "Will removing pages affect my original PDF?", answer: "No, your original file is never modified. We create a new PDF with the pages removed, keeping your source document safe." }
];

const DELETE_STEPS = [
  "Upload your PDF file by clicking the upload area or drag and drop",
  "Enter page numbers to delete, separated by commas (e.g., 1,3,5)",
  "Click the Delete Pages button to remove unwanted pages",
  "Download your cleaned PDF instantly - free, no watermarks"
];

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function DeletePagesPage() {
  useSEO({
    title: "Delete PDF Pages Free - PDF Page Remover | PDF HUB 24",
    description: "Delete pages from PDF free. Remove unwanted pages instantly with our PDF page remover. Clean up PDFs fast. No signup.",
    keywords: "delete pages from pdf free, delete pdf pages, remove pages from pdf, pdf page remover, remove pdf pages, delete pdf pages online, pdf delete pages",
    canonicalPath: "/delete-pages"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("delete-pages", lang, getToolSEOData("delete-pages")?.longTailH1 || "Delete Pages from PDF Free");
  const toolDesc = getToolDesc("delete-pages", lang, "Remove unwanted pages from your PDF instantly. Free PDF page remover - no signup, no watermarks.");

  const [files, setFiles] = useState<File[]>([]);
  const [pagesToDelete, setPagesToDelete] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    setStatus("idle");
    setFiles(newFiles);
  }, [resultUrl]);

  const handleDelete = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (!pagesToDelete.trim()) {
      toast({
        title: "Error",
        description: "Please enter page numbers to delete",
        variant: "destructive",
      });
      return;
    }

    const pages = pagesToDelete.split(",").map(p => parseInt(p.trim())).filter(p => !isNaN(p) && p > 0);
    
    if (pages.length === 0) {
      toast({
        title: "Invalid page numbers",
        description: "Please enter valid page numbers (e.g., 1,3,5)",
        variant: "destructive",
      });
      return;
    }

    // Client-side file size validation
    if (files[0].size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Please upload a file under ${MAX_FILE_SIZE_MB}MB. Your file is ${(files[0].size / 1024 / 1024).toFixed(1)}MB.`,
        variant: "destructive",
      });
      return;
    }
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("pages", JSON.stringify(pages));

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/delete-pages", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let serverError = "Conversion failed. Please try again.";
          try { const errBody = await response.clone().json(); if (errBody?.error) serverError = errBody.error; } catch {}
          throw new Error(serverError);
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: `Deleted ${pages.length} page${pages.length > 1 ? "s" : ""} successfully`,
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to delete pages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFiles([]);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + "-modified.pdf";
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
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold mb-4">Pages to Delete</h3>
                <div className="space-y-2">
                  <Label htmlFor="pages">Page Numbers</Label>
                  <Input
                    id="pages"
                    type="text"
                    value={pagesToDelete}
                    onChange={(e) => setPagesToDelete(e.target.value)}
                    placeholder="e.g., 1,3,5 or 2,4,6-8"
                    data-testid="input-pages"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter page numbers separated by commas (e.g., 1,3,5)
                  </p>
                </div>
                <Button 
                  onClick={handleDelete} 
                  className="w-full"
                  size="lg"
                  data-testid="button-delete"
                  disabled={!pagesToDelete.trim()}
                >
                  Delete Pages
                </Button>
              </div>
            )}

            <ProcessingState
              status={status === "processing" || status === "error" ? status : "idle"}
              progress={progress}
              message={status === "processing" ? "Deleting pages..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your modified PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Modified PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleReset}
                  data-testid="button-convert-another"
                >
                  Convert Another File
                </Button>
                <div className="pt-3 border-t border-border/50 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">What's next?</span>
                  <Link href="/extract-pages" className="text-primary hover:underline font-medium" data-testid="link-post-download-1">Extract Pages →</Link>
                  <Link href="/merge-pdf" className="text-primary hover:underline font-medium" data-testid="link-post-download-2">Merge PDF →</Link>
                </div>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="delete-pages" />
          
          <RelatedTools currentToolId="delete-pages" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
