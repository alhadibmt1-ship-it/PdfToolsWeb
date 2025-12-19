import { useState, useEffect } from "react";
import { ChevronLeft, ZoomIn, ZoomOut, ChevronRight, ChevronLeftIcon } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function PdfViewerPage() {
  useSEO({
    title: "PDF Viewer Free Online - View PDF in Browser | PDF HUB 24",
    description: "View PDF free. Open and read PDF documents in your browser. Best free PDF viewer - zoom, navigate. No signup.",
    keywords: "pdf viewer free, view pdf online, open pdf free, read pdf online, pdf reader free, view pdf in browser"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPdfUrl(null);
    }
  }, [files]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF Viewer</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              View PDF documents directly in your browser. No software installation needed.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            {!pdfUrl && (
              <FileUploadZone
                onFilesSelected={setFiles}
                acceptedFormats=".pdf"
                multiple={false}
              />
            )}

            {pdfUrl && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{files[0]?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                      data-testid="button-zoom-out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm w-16 text-center">{zoom}%</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                      data-testid="button-zoom-in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiles([]);
                        setPdfUrl(null);
                      }}
                      className="ml-4"
                      data-testid="button-close"
                    >
                      Close PDF
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted overflow-auto" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%`, height: `${10000 / zoom}%` }}
                    title="PDF Viewer"
                    data-testid="iframe-pdf"
                  />
                </div>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="PDF Viewer"
            toolId="pdf-viewer"
            toolDescription="View any PDF document directly in your web browser without installing software or creating an account. Our free online PDF viewer lets you open, read, and navigate through PDF files instantly with zoom controls and smooth scrolling. Perfect for quickly checking documents, contracts, reports, and ebooks on any device — desktop, tablet, or mobile. PDF HUB 24 keeps your files completely private since they never leave your device."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or simply drag and drop your document.",
              "Your PDF will open immediately in the viewer — no processing or waiting required.",
              "Use the zoom controls (+ and -) to adjust the view size for comfortable reading.",
              "Click 'Close PDF' when finished to clear the viewer and open another document."
            ]}
            benefits={[
              "View PDFs instantly without downloading any software",
              "Works on any device with a modern web browser",
              "Zoom in and out from 50% to 200% for better readability",
              "Fast loading and smooth rendering for large documents",
              "100% private — files never leave your device or upload to servers",
              "No registration, account, or sign-up required",
              "Supports all standard PDF files including scanned documents",
              "Completely free with no hidden costs or limitations",
              "Mobile-friendly interface for reading on the go"
            ]}
            faqs={[
              {
                question: "What types of PDFs can I view with this tool?",
                answer: "Our PDF viewer supports all standard PDF files including text documents, scanned pages, image-heavy PDFs, forms, reports, contracts, and ebooks. Some highly interactive PDFs with complex JavaScript elements may have limited functionality, but regular documents display perfectly."
              },
              {
                question: "Is my PDF uploaded to a server when I use this viewer?",
                answer: "No, your PDF is viewed entirely within your browser using local processing. The file never leaves your device, ensuring complete privacy and security. This makes it ideal for viewing confidential documents, contracts, and sensitive business files."
              },
              {
                question: "Can I edit or annotate the PDF in the viewer?",
                answer: "This is a read-only viewing tool designed for quick document review. To edit PDFs, use our other tools like Add Watermark for branding, Add Page Numbers for organization, Sign PDF for signatures, or Rotate PDF for orientation changes."
              },
              {
                question: "Why use an online PDF viewer instead of downloading the file?",
                answer: "Our viewer is perfect for quickly checking PDFs without cluttering your downloads folder, when you're on a device without a PDF reader installed, or when you need to preview documents before committing to a download. It's also faster than installing dedicated software."
              },
              {
                question: "Does the PDF viewer work on mobile devices?",
                answer: "Yes, our PDF viewer is fully responsive and works on smartphones and tablets. The zoom controls help you read comfortably on smaller screens. Whether you're using iOS, Android, or any other platform with a modern browser, you can view your PDFs seamlessly."
              }
            ]}
            keywords={["pdf viewer online", "view pdf in browser", "read pdf free", "open pdf online", "pdf reader no download"]}
            relatedLinks={[
              { text: "Add page numbers to your PDF using Add Page Numbers", href: "/add-page-numbers" },
              { text: "Extract specific pages using Split PDF", href: "/split" },
              { text: "Combine multiple PDFs using Merge PDF", href: "/merge" },
              { text: "Add watermarks for branding using Add Watermark", href: "/add-watermark" }
            ]}
            extraSections={[
              {
                title: "When to Use an Online PDF Viewer",
                content: "Our PDF viewer is designed for situations where you need quick, hassle-free access to PDF documents. Here are the most common use cases:",
                items: [
                  "Previewing email attachments before downloading",
                  "Checking document content on borrowed or public computers",
                  "Viewing PDFs on devices without Adobe Reader installed",
                  "Quickly reviewing contracts, invoices, or reports",
                  "Reading ebooks and manuals in your browser",
                  "Accessing documents when storage space is limited"
                ]
              },
              {
                title: "Privacy and Security Benefits",
                content: "Unlike many online PDF tools, our viewer prioritizes your privacy and security:",
                items: [
                  "Files are processed locally in your browser — no server uploads",
                  "Ideal for confidential business documents and contracts",
                  "No account creation or email required",
                  "No cookies or tracking related to your documents",
                  "Perfect for viewing sensitive legal, financial, or personal files"
                ]
              }
            ]}
          />
          
          <RelatedTools currentToolId="pdf-viewer" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
