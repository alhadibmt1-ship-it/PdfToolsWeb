import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
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
            <p className="text-muted-foreground leading-relaxed">
              Remove unwanted pages from your PDF document. Enter page numbers separated by commas.
            </p>
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
            toolDescription="Remove unwanted pages from your PDF documents with our free online tool. Whether you need to delete blank pages, remove confidential information, or simply clean up a document before sharing, our page deletion tool makes it easy. Specify exactly which pages to remove and download your streamlined PDF instantly."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging it in.",
              "Enter the page numbers you want to delete (separated by commas, e.g., 1,3,5).",
              "Click the Delete Pages button to process your document.",
              "Download your PDF with the specified pages removed."
            ]}
            benefits={[
              "Remove any pages from your PDF instantly",
              "Delete multiple pages in a single operation",
              "Perfect for removing blank or unwanted pages",
              "Great for cleaning up documents before sharing",
              "Original document quality is preserved",
              "Works with any size PDF document",
              "Fast processing regardless of page count",
              "Secure - your files are never stored"
            ]}
            faqs={[
              {
                question: "How do I specify which pages to delete?",
                answer: "Enter page numbers separated by commas. For example, to delete pages 1, 3, and 5, enter: 1,3,5. Page numbers start at 1 (the first page is page 1)."
              },
              {
                question: "Can I delete a range of pages?",
                answer: "Currently, you enter individual page numbers separated by commas. To delete pages 5 through 10, enter: 5,6,7,8,9,10."
              },
              {
                question: "Will deleting pages affect my original file?",
                answer: "No, your original file remains unchanged. We create a new PDF with the specified pages removed. You can always use your original if needed."
              },
              {
                question: "What happens if I enter an invalid page number?",
                answer: "If you enter a page number that doesn't exist (like page 100 in a 50-page document), you'll receive an error message. Double-check your page numbers before processing."
              },
              {
                question: "Can I undo page deletion?",
                answer: "The tool creates a new PDF without the deleted pages. To 'undo', simply use your original PDF file. We recommend keeping a copy of your original document before making changes."
              }
            ]}
            keywords={["remove pdf pages", "delete pages from pdf", "clean up pdf document"]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
