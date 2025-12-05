import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function DeletePagesPage() {
  useSEO({
    title: "Delete PDF Pages Online Free - Remove Pages from PDF | PDF HUB 24",
    description: "Delete unwanted pages from PDF files online for free. Remove specific pages from your PDF documents. Fast, secure, and easy to use. No registration required.",
    keywords: "delete pdf pages, remove pdf pages, delete pages from pdf, remove pages from pdf online free"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pagesToDelete, setPagesToDelete] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

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
          throw new Error("Failed to delete pages");
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

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "modified.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Delete PDF Pages</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Remove unwanted pages from your PDF document. Enter page numbers separated by commas.
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
              status={status}
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
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Delete PDF Pages"
            toolDescription="Remove unwanted pages from your PDF documents quickly and easily with our free online page deletion tool. Whether you need to eliminate blank pages, remove sensitive information before sharing, delete outdated sections, or clean up scanned documents, PDF HUB 24 makes it simple. Just specify the page numbers you want to remove and download your streamlined PDF in seconds - your original file stays completely intact."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Enter the page numbers you want to delete, separated by commas (e.g., 1,3,5,7).",
              "Click the 'Delete Pages' button to process your document.",
              "Download your cleaned PDF with the specified pages permanently removed."
            ]}
            benefits={[
              "Remove any pages from your PDF instantly",
              "Delete multiple pages in a single operation",
              "Perfect for removing blank or filler pages",
              "Ideal for eliminating sensitive content before sharing",
              "Original document quality fully preserved",
              "Works with PDFs of any size or page count",
              "Fast processing even for large documents",
              "Your original file remains unchanged",
              "No watermarks added to processed files"
            ]}
            faqs={[
              {
                question: "How do I specify which pages to delete?",
                answer: "Enter page numbers separated by commas in the input field. For example, to delete pages 1, 3, and 5, type: 1,3,5. Page numbering starts at 1, so the first page of your document is page 1. You can delete as many pages as needed in a single operation."
              },
              {
                question: "Can I delete a consecutive range of pages at once?",
                answer: "Currently, you enter individual page numbers separated by commas. To delete pages 5 through 10, enter: 5,6,7,8,9,10. For very long ranges, consider using our Split PDF tool to extract only the pages you want to keep instead."
              },
              {
                question: "Will deleting pages affect my original PDF file?",
                answer: "No, your original file is never modified. The tool creates a completely new PDF with the specified pages removed. Your source document remains safe and unchanged, so you can always refer back to it or try different deletions."
              },
              {
                question: "What happens if I enter a page number that doesn't exist?",
                answer: "If you enter a page number outside your document's range (like page 100 in a 50-page PDF), you'll receive an error message asking you to verify your input. Always check your document's total page count before specifying pages to delete."
              },
              {
                question: "Can I recover deleted pages or undo the deletion?",
                answer: "The deletion creates a new PDF file - the removed pages are not included in the output. To 'undo', simply use your original PDF file which remains unchanged. We recommend always keeping a backup of your original document before making any modifications."
              }
            ]}
            keywords={["remove pdf pages", "delete pages from pdf", "clean up pdf document", "pdf page remover", "eliminate pdf pages"]}
            relatedLinks={[
              { text: "Extract specific pages using Split PDF", href: "/split" },
              { text: "Reorder remaining pages after deletion", href: "/reorder-pages" },
              { text: "Merge multiple PDFs together", href: "/merge" },
              { text: "Compress PDF after removing pages", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "When to Delete PDF Pages",
                content: "Page deletion is useful in many common scenarios:",
                items: [
                  "Removing blank pages from scanned documents",
                  "Deleting cover pages or title pages before sharing",
                  "Eliminating confidential sections from reports",
                  "Cleaning up documents with outdated information",
                  "Removing advertisement pages from downloaded PDFs",
                  "Preparing documents for printing without unwanted pages"
                ]
              },
              {
                title: "Tips for Efficient Page Deletion",
                content: "Get the best results from our page deletion tool:",
                items: [
                  "Open your PDF in a viewer first to note exact page numbers",
                  "List all pages to delete at once for efficiency",
                  "Use Split PDF if you want to keep only a few pages",
                  "Keep your original file as a backup before deleting",
                  "Combine with Compress PDF to reduce final file size",
                  "Use Reorder Pages to reorganize after deletion"
                ]
              }
            ]}
            exampleTable={{
              title: "Page Deletion Examples",
              rows: [
                { label: "Remove cover page", before: "25-page report", after: "24 pages (page 1 deleted)" },
                { label: "Delete blank pages", before: "10 pages with 3 blanks", after: "7 content pages only" },
                { label: "Remove appendix", before: "50-page document", after: "40 pages (pages 41-50 removed)" },
                { label: "Clean scanned PDF", before: "20 scanned pages", after: "18 pages (blanks removed)" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="delete-pages" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
