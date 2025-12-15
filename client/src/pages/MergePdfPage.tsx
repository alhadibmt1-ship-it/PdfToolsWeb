import { useState, useEffect } from "react";
import { ChevronLeft, Download, Combine } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import SortablePdfPages from "@/components/SortablePdfPages";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import StepIndicator from "@/components/StepIndicator";
import SuccessCelebration from "@/components/SuccessCelebration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
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
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back to Tools
            </div>
          </Link>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">Merge PDF Files</h1>
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

          <ToolSEOContent
            toolName="Merge PDF Files"
            toolId="merge"
            toolDescription="Combine multiple PDF documents into a single unified file with our free online PDF merger tool. Whether you're consolidating reports, combining chapters of an eBook, assembling legal documents, or merging scanned pages, PDF HUB 24 makes it effortless. Our advanced merge tool lets you preview every page, drag and drop to reorder, and remove unwanted content before creating your final document."
            howToSteps={[
              "Upload multiple PDF files by clicking the upload area or dragging and dropping (up to 10 files at once).",
              "Preview all pages and drag to reorder them in your desired sequence, or remove pages you don't need.",
              "Click the 'Merge' button to combine all selected pages into a single PDF document.",
              "Download your merged PDF instantly - ready for sharing, printing, or archiving."
            ]}
            benefits={[
              "Merge up to 10 PDF files into one document",
              "Visual page preview with drag-and-drop reordering",
              "Remove unwanted pages with a single click",
              "Maintain original quality, formatting, and hyperlinks",
              "Combine PDFs from different sources seamlessly",
              "No watermarks added to your merged documents",
              "Secure processing with automatic file deletion",
              "Works on desktop, tablet, and mobile browsers",
              "Fast processing even for large multi-page documents"
            ]}
            faqs={[
              {
                question: "How many PDF files can I merge at once?",
                answer: "You can merge up to 10 PDF files in a single operation. For larger projects, simply merge in batches of 10, then combine the resulting files. There's no limit to how many times you can use the tool."
              },
              {
                question: "Will merging PDFs reduce the quality of my documents?",
                answer: "No, our PDF merger preserves 100% of the original quality. Text remains sharp and searchable, images retain their resolution, and all formatting, fonts, and hyperlinks are maintained exactly as they appear in the source files."
              },
              {
                question: "Can I rearrange pages from different PDF files?",
                answer: "Absolutely! After uploading your files, you'll see thumbnails of every page from all documents. Simply drag and drop individual pages to arrange them in any order you want. You can interleave pages from different PDFs or group them however you prefer."
              },
              {
                question: "Is there a file size limit for merging?",
                answer: "Our tool handles most standard PDF files without issues. Files with many high-resolution images or complex graphics may take slightly longer to process. For best performance, we recommend keeping individual files under 50MB each."
              },
              {
                question: "Are my documents secure when using this tool?",
                answer: "Yes, security is our priority. All uploaded files are processed using encrypted connections, and documents are automatically deleted from our servers immediately after processing. We never store, view, or share your documents with anyone."
              }
            ]}
            keywords={["combine pdf files", "join pdfs together", "merge multiple pdfs", "pdf combiner online", "unite pdf documents"]}
            relatedLinks={[
              { text: "Split PDF into separate files", href: "/split" },
              { text: "Reorder pages within a PDF", href: "/reorder-pages" },
              { text: "Delete unwanted pages from PDF", href: "/delete-pages" },
              { text: "Compress merged PDF to reduce size", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Common Uses for Merging PDFs",
                content: "Combining PDF files is essential for many professional and personal tasks. Here are the most popular use cases:",
                items: [
                  "Consolidating multiple invoices or receipts into one file",
                  "Combining chapters or sections of a book or report",
                  "Assembling legal documents with exhibits and attachments",
                  "Merging scanned pages into a complete document",
                  "Creating portfolios from multiple design files",
                  "Compiling research papers and references"
                ]
              },
              {
                title: "Why Choose Our PDF Merger?",
                content: "PDF HUB 24's merge tool stands out from other online services for these reasons:",
                items: [
                  "Visual page preview helps you verify content before merging",
                  "Drag-and-drop reordering gives you full control",
                  "No account registration or signup required",
                  "Works directly in your browser - no software installation",
                  "Completely free with no hidden fees or limits",
                  "Mobile-friendly for on-the-go document management"
                ]
              }
            ]}
            exampleTable={{
              title: "PDF Merge Use Case Examples",
              rows: [
                { label: "Contract + Appendices", before: "5 separate files", after: "1 complete contract" },
                { label: "Monthly Reports (12 files)", before: "12 PDFs", after: "1 annual report" },
                { label: "Resume + Cover Letter + Portfolio", before: "3 documents", after: "1 job application" },
                { label: "Scanned Book Pages", before: "50 scanned pages", after: "1 complete book" }
              ]
            }}
          />
          
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
