import { useState, useCallback } from "react";
import { ChevronLeft, Download, Move, GripVertical } from "lucide-react";
import { Link } from "wouter";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

interface PageItem {
  id: string;
  pageNumber: number;
}

function SortableItem({ id, pageNumber }: PageItem) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-muted/50 rounded-md border cursor-move hover-elevate"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-5 h-5 text-muted-foreground" />
      <span className="font-medium">Page {pageNumber}</span>
    </div>
  );
}

export default function ReorderPagesPage() {
  useSEO({
    title: "Reorder PDF Pages Free Online - Rearrange PDF | PDF HUB 24",
    description: "Reorder PDF pages free. Drag and drop to rearrange pages in any order. Best free PDF organizer. No signup.",
    keywords: "reorder pdf pages free, rearrange pdf, organize pdf pages, sort pdf pages free, move pdf pages, change pdf page order",
    canonicalPath: "/reorder-pages"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      setStatus("loading");
      
      try {
        const formData = new FormData();
        formData.append("file", selectedFiles[0]);
        
        const response = await fetch("/api/pdf-info", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const count = data.pageCount || 1;
          setPageCount(count);
          setPages(Array.from({ length: count }, (_, i) => ({
            id: `page-${i + 1}`,
            pageNumber: i + 1,
          })));
          setStatus("ready");
        } else {
          const arrayBuffer = await selectedFiles[0].arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          let count = 1;
          const text = new TextDecoder("latin1").decode(uint8Array);
          const matches = text.match(/\/Type\s*\/Page[^s]/g);
          if (matches) {
            count = matches.length;
          }
          setPageCount(count);
          setPages(Array.from({ length: count }, (_, i) => ({
            id: `page-${i + 1}`,
            pageNumber: i + 1,
          })));
          setStatus("ready");
        }
      } catch {
        setPageCount(10);
        setPages(Array.from({ length: 10 }, (_, i) => ({
          id: `page-${i + 1}`,
          pageNumber: i + 1,
        })));
        setStatus("ready");
      }
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleReorder = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("pageOrder", JSON.stringify(pages.map(p => p.pageNumber)));

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/reorder-pages", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to reorder pages");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Pages reordered successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to reorder pages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "reordered.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Reorder Pages</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Drag and drop to rearrange pages in your PDF document.
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

            {status === "loading" && (
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-muted-foreground">Loading PDF pages...</p>
              </div>
            )}

            {status === "ready" && pages.length > 0 && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Move className="w-5 h-5" />
                  Drag to Reorder ({pageCount} pages)
                </h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={pages} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {pages.map((page) => (
                        <SortableItem key={page.id} {...page} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                <p className="text-sm text-muted-foreground">
                  Drag pages to rearrange them. The new order shown here will be the order in your final PDF.
                </p>
                <Button 
                  onClick={handleReorder} 
                  className="w-full"
                  size="lg"
                  data-testid="button-reorder"
                >
                  <Move className="w-4 h-4 mr-2" />
                  Reorder Pages
                </Button>
              </div>
            )}

            <ProcessingState
              status={status === "processing" ? "processing" : status === "success" ? "success" : status === "error" ? "error" : "idle"}
              progress={progress}
              message={status === "processing" ? "Reordering pages..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your reordered PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Reordered PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Reorder PDF Pages"
            toolId="reorder-pages"
            toolDescription="Rearrange pages in your PDF documents effortlessly with our intuitive drag-and-drop interface. Whether you need to move pages to different positions, reverse the entire document order, or create a completely custom page sequence, PDF HUB 24 makes it simple. Our visual reordering tool shows each page clearly so you can organize reports, presentations, manuscripts, and any multi-page documents exactly how you want them."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "View all pages and drag them to rearrange in your desired order.",
              "Click the 'Reorder Pages' button to apply the new page sequence.",
              "Download your reorganized PDF with pages in the perfect order."
            ]}
            benefits={[
              "Intuitive drag-and-drop interface for easy reordering",
              "Visual page list shows exact position of each page",
              "Rearrange any number of pages without limits",
              "Create custom page sequences for any purpose",
              "Perfect for fixing incorrectly ordered documents",
              "Original page content and quality preserved",
              "Fast processing even for large documents",
              "No registration or signup required",
              "Works on any device with a web browser"
            ]}
            faqs={[
              {
                question: "Can I duplicate pages while reordering?",
                answer: "The reorder tool is designed to move pages to new positions only, not duplicate them. If you need to include the same page multiple times, use our Merge PDF tool to combine your document with itself, then reorder the combined result as needed."
              },
              {
                question: "What's the maximum number of pages I can reorder?",
                answer: "There's no strict page limit for reordering. Documents with hundreds of pages work well, though very large files may take slightly longer to process. The drag-and-drop interface remains responsive for typical document sizes."
              },
              {
                question: "How do I reverse the entire page order?",
                answer: "To reverse your document completely, drag the last page to the first position, then the second-to-last to the second position, and so on. For very long documents, you may find it easier to reorder in sections or use multiple passes."
              },
              {
                question: "Will reordering affect my page content or quality?",
                answer: "No, reordering is a non-destructive operation. All page content, formatting, images, text, and hyperlinks remain exactly the same. Only the sequence in which pages appear in the document changes."
              },
              {
                question: "Can I remove pages while reordering?",
                answer: "This tool focuses solely on page reordering to keep the interface simple and focused. To remove unwanted pages, use our Delete Pages tool before or after reordering. You can also use Split PDF to extract only the pages you want."
              }
            ]}
            keywords={["rearrange pdf pages", "sort pdf pages", "organize pdf document", "pdf page order", "move pdf pages"]}
            relatedLinks={[
              { text: "Delete unwanted pages from your PDF", href: "/delete-pages" },
              { text: "Merge multiple PDFs together", href: "/merge" },
              { text: "Split PDF into separate files", href: "/split" },
              { text: "Add page numbers after reordering", href: "/add-page-numbers" }
            ]}
            extraSections={[
              {
                title: "When to Reorder PDF Pages",
                content: "Page reordering is essential in many document management scenarios:",
                items: [
                  "Fixing scanned documents with pages in wrong order",
                  "Reorganizing presentation slides for a different audience",
                  "Moving appendices or references to different positions",
                  "Arranging photo album pages chronologically",
                  "Restructuring reports to highlight key sections first",
                  "Preparing documents for binding or printing"
                ]
              },
              {
                title: "Tips for Efficient Page Reordering",
                content: "Make the most of our reordering tool with these tips:",
                items: [
                  "Plan your desired order before starting to drag pages",
                  "Use the page numbers as reference while reordering",
                  "For major reorganizations, work in sections",
                  "Combine with Delete Pages to remove unwanted content first",
                  "Add page numbers after reordering for professional documents",
                  "Preview your original PDF to identify pages by content"
                ]
              }
            ]}
            exampleTable={{
              title: "Page Reordering Examples",
              rows: [
                { label: "Scanned pages (wrong order)", before: "Pages 3,1,2,5,4", after: "Pages 1,2,3,4,5" },
                { label: "Move summary to front", before: "Summary on page 10", after: "Summary on page 1" },
                { label: "Reverse photo album", before: "Newest to oldest", after: "Oldest to newest" },
                { label: "Reorganize report", before: "Appendix in middle", after: "Appendix at end" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="reorder-pages" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
