import { useState, useEffect } from "react";
import { ChevronLeft, Download, Combine } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import CloudImportBar from "@/components/CloudImportBar";
import ProcessingState from "@/components/ProcessingState";
import SortablePdfPages from "@/components/SortablePdfPages";
import EnhancedToolSEOContent from "@/components/EnhancedToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import StepIndicator from "@/components/StepIndicator";
import SuccessCelebration from "@/components/SuccessCelebration";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { usePdfThumbnails, type PdfPage } from "@/hooks/usePdfThumbnails";
import { Skeleton } from "@/components/ui/skeleton";
import { useSEO } from "@/hooks/useSEO";
import { getToolSEOData } from "@/data/toolSEOData";

const MERGE_FAQS = [
  { question: "How do I merge multiple PDF files into one?", answer: "Upload your PDF files, arrange them in your preferred order using drag-and-drop, then click Merge. Your combined PDF will be ready to download instantly." },
  { question: "Is it free to merge PDFs?", answer: "Yes, our PDF merger is completely free with no registration required. There are no file limits or watermarks." },
  { question: "Can I reorder pages before merging?", answer: "Absolutely! Our visual page preview lets you drag and drop pages to arrange them exactly how you want before merging." },
  { question: "What file formats can I merge?", answer: "Our merge tool works with PDF files. If you have other formats, first convert them to PDF using our conversion tools." }
];

const MERGE_STEPS = [
  "Upload two or more PDF files you want to combine",
  "Drag and drop to reorder pages as needed",
  "Click the Merge button to combine your PDFs",
  "Download your merged PDF document"
];

export default function MergePdfPage() {
  useSEO({
    title: "Merge PDF Free - Combine PDF Files | PDF HUB 24",
    description: "Merge PDF files free. Combine multiple PDFs into one document. Drag and drop to reorder. Best free PDF merger.",
    keywords: "merge pdf free, combine pdf files, join pdf, merge pdf online, pdf merger free, combine multiple pdfs, merge pdfs into one",
    canonicalPath: "/merge"
  });

  const { addRecentTool } = useRecentTools();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPages, setSelectedPages] = useState<PdfPage[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();
  const { pages, loading: thumbnailsLoading, error: thumbnailsError } = usePdfThumbnails(files);

  useEffect(() => {
    addRecentTool("merge");
  }, [addRecentTool]);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setSelectedPages([]);
    setStatus("idle");
    setResultUrl(null);
  };

  const handlePagesChange = (newPages: PdfPage[]) => {
    setSelectedPages(newPages);
  };

  useEffect(() => {
    if (pages.length > 0 && selectedPages.length === 0) {
      setSelectedPages(pages);
    }
  }, [pages]);

  const handleMerge = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    
    if (selectedPages.length > 0) {
      const pageSelection = selectedPages.map(page => ({
        fileIndex: page.fileIndex,
        pageNumber: page.pageNumber,
      }));
      
      formData.append("pageSelection", JSON.stringify(pageSelection));
      
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
    } else {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const endpoint = selectedPages.length > 0 ? "/api/merge-enhanced" : "/api/merge";
      
      const blob = await runWithProgress(async () => {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to merge PDFs");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "merged.pdf";
      a.click();
    }
  };

  const currentStep = status === "idle" && files.length === 0 ? 1 
    : status === "idle" && files.length > 0 ? 2 
    : status === "processing" ? 2 
    : status === "success" ? 3 
    : 2;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ToolBreadcrumbs toolName="Merge PDF" category="edit-pdf" />
          
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back to Tools
            </div>
          </Link>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              {getToolSEOData("merge")?.longTailH1 || "Merge PDF Files"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-5">
              Combine multiple PDF documents into a single file. Preview pages, reorder them by dragging, and remove unwanted pages.
            </p>
            <TrustBadges variant="prominent" className="max-w-2xl mx-auto" />
          </div>

          <StepIndicator currentStep={currentStep} className="mb-8" />

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf"
              multiple={true}
              maxFiles={10}
              disabled={status === "processing" || thumbnailsLoading}
            />
            <CloudImportBar
              accept="pdf"
              onFileImported={(file) => handleFilesSelected([...files, file])}
            />

            {thumbnailsLoading && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Generating page previews...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {thumbnailsError && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <p className="text-sm text-destructive">{thumbnailsError}</p>
              </div>
            )}

            {!thumbnailsLoading && files.length > 0 && status === "idle" && (
              <>
                {pages.length > 0 ? (
                  <SortablePdfPages
                    pages={selectedPages.length > 0 ? selectedPages : pages}
                    onChange={handlePagesChange}
                  />
                ) : (
                  <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Preview generation unavailable. You can still merge your PDFs - they will be combined in the order uploaded.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={handleMerge} 
                    className="flex-1"
                    size="lg"
                    data-testid="button-merge"
                  >
                    {pages.length > 0 
                      ? `Merge ${selectedPages.length || pages.length} Page${(selectedPages.length || pages.length) !== 1 ? "s" : ""}`
                      : `Merge ${files.length} PDF${files.length !== 1 ? "s" : ""}`
                    }
                  </Button>
                  <Button 
                    onClick={() => {
                      setFiles([]);
                      setSelectedPages([]);
                    }}
                    variant="outline"
                    size="lg"
                    data-testid="button-clear"
                  >
                    Clear All
                  </Button>
                </div>
              </>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Merging your PDFs..." : undefined}
              fileCount={files.length}
            />

            {status === "success" && resultUrl && (
              <Card className="p-5 sm:p-6 border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
                <div className="text-center space-y-5">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
                    <Combine className="w-8 h-8 text-green-500" aria-hidden="true" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                      Merge Complete!
                    </h3>
                    <p className="text-muted-foreground">
                      Your {selectedPages.length || pages.length || files.length} pages have been combined into one PDF
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={handleDownload} 
                      size="lg"
                      className="gap-2"
                      data-testid="button-download"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Download Merged PDF
                    </Button>
                    <Button 
                      onClick={() => {
                        setFiles([]);
                        setSelectedPages([]);
                        setStatus("idle");
                        setResultUrl(null);
                      }}
                      variant="outline"
                      size="lg"
                      data-testid="button-merge-another"
                    >
                      Merge Another
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <EnhancedToolSEOContent toolId="merge" />
          
          <RelatedTools currentToolId="merge" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="Merge PDF"
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
