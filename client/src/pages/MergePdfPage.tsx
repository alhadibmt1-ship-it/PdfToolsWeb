import { useState, useEffect } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import SortablePdfPages from "@/components/SortablePdfPages";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { usePdfThumbnails, type PdfPage } from "@/hooks/usePdfThumbnails";
import { Skeleton } from "@/components/ui/skeleton";
import { useSEO } from "@/hooks/useSEO";

export default function MergePdfPage() {
  useSEO({
    title: "Merge PDF Files Online Free - Combine Multiple PDFs | PDF HUB 24",
    description: "Merge multiple PDF files into one document online for free. Combine PDFs in any order, fast and secure. No registration required.",
    keywords: "merge pdf, combine pdf, join pdf files, merge pdf online free, pdf merger, combine pdf files"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [selectedPages, setSelectedPages] = useState<PdfPage[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();
  const { pages, loading: thumbnailsLoading, error: thumbnailsError } = usePdfThumbnails(files);

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

      toast({
        title: "Success!",
        description: "PDFs merged successfully",
      });
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Merge PDF Files</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Combine multiple PDF documents into a single file. Preview pages, reorder them by dragging, and remove unwanted pages.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf"
              multiple={true}
              maxFiles={10}
              disabled={status === "processing" || thumbnailsLoading}
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
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your merged PDF is ready!</h3>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleDownload} 
                    className="flex-1"
                    size="lg"
                    data-testid="button-download"
                  >
                    <Download className="w-4 h-4 mr-2" />
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
            )}
          </div>

          <ToolSEOContent
            toolName="Merge PDF Files"
            toolDescription="Combine multiple PDF documents into a single file with our free online PDF merger. Whether you're consolidating reports, combining chapters of a book, or merging business documents, our tool makes it easy. Preview pages before merging, drag and drop to reorder, and remove unwanted pages - all within your browser."
            howToSteps={[
              "Upload multiple PDF files by clicking the upload area or dragging and dropping files.",
              "Preview all pages from your documents and arrange them in your desired order.",
              "Remove any pages you don't want to include by clicking the X button on each page.",
              "Click the Merge button to combine all selected pages into one PDF.",
              "Download your merged PDF file - it's ready to use immediately."
            ]}
            benefits={[
              "Merge unlimited PDF files into one document",
              "Preview and reorder pages before combining",
              "Remove unwanted pages with a single click",
              "Maintain original quality and formatting",
              "Combine PDFs from different sources easily",
              "No watermarks on your merged documents",
              "Secure processing with automatic file deletion",
              "Works on any device with a web browser"
            ]}
            faqs={[
              {
                question: "How many PDF files can I merge at once?",
                answer: "You can merge up to 10 PDF files at once with our tool. For larger batches, simply merge in groups and then combine the resulting files."
              },
              {
                question: "Will merging PDFs reduce quality?",
                answer: "No, our PDF merger preserves the original quality of all your documents. Text, images, and formatting remain exactly as they were in the original files."
              },
              {
                question: "Can I rearrange pages from different PDFs?",
                answer: "Yes! After uploading your files, you can drag and drop individual pages to arrange them in any order before merging. You can also remove specific pages you don't need."
              },
              {
                question: "Is there a file size limit?",
                answer: "Our tool handles most standard PDF files without issues. For very large files or documents with many high-resolution images, processing may take a bit longer."
              },
              {
                question: "Are my documents kept private?",
                answer: "Yes, all uploaded files are processed securely and automatically deleted after processing. We never store, view, or share your documents."
              }
            ]}
            keywords={["combine pdf files", "join pdfs together", "merge multiple pdfs"]}
          />
          
          <RelatedTools currentToolId="merge" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
