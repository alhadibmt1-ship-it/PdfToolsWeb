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
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function ExcelToPdfPage() {
  useSEO({
    title: "Excel to PDF Free Online - Convert XLSX to PDF | PDF HUB 24",
    description: "Convert Excel to PDF free. Transform XLSX/XLS to PDF instantly. Preserves tables and formatting. No signup needed.",
    keywords: "excel to pdf free, convert xlsx to pdf, spreadsheet to pdf free, xls to pdf, excel to pdf converter free, save excel as pdf",
    canonicalPath: "/excel-to-pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select an Excel file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/excel-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert Excel file");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Excel file converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert Excel file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "converted.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Excel to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your Excel spreadsheets to professional PDF documents. Perfect for sharing reports, invoices, and data tables in a universally readable format.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".xlsx,.xls"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to PDF
              </Button>
            )}

            {status === "processing" && (
              <ProcessingState 
                status="processing"
                message="Converting Excel to PDF..." 
                progress={progress}
              />
            )}

            {status === "success" && resultUrl && (
              <div className="text-center space-y-4">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Conversion Complete!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm mb-4">
                    Your PDF document is ready for download.
                  </p>
                  <Button onClick={handleDownload} size="lg" data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center">
                <Button 
                  onClick={() => setStatus("idle")} 
                  variant="outline"
                  data-testid="button-try-again"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Excel to PDF Converter"
            toolId="excel-to-pdf"
            toolDescription="Convert your Microsoft Excel spreadsheets (XLSX, XLS) to professional PDF documents with our free online converter. Our tool preserves your table structure, formatting, cell borders, and data layout to create clean, print-ready PDF files. Perfect for sharing financial reports, invoices, data tables, and business documents in a universally readable format."
            howToSteps={[
              "Upload your Excel file (XLSX or XLS format) by clicking or dragging.",
              "Click 'Convert to PDF' to start the instant conversion process.",
              "Wait a few seconds while your spreadsheet is transformed to PDF.",
              "Download your professional PDF document ready to share or print."
            ]}
            benefits={[
              "Preserve table structure, formatting, and cell borders",
              "Create professional, print-ready PDF documents",
              "Easy to share via email without Excel required",
              "Compatible with all PDF viewers on any device",
              "Supports both XLSX and legacy XLS formats",
              "Maintains column widths and row heights",
              "Perfect for invoices, reports, and data tables",
              "No software installation or registration needed",
              "Secure processing with automatic file deletion"
            ]}
            faqs={[
              {
                question: "Which Excel formats are supported?",
                answer: "We support both modern Excel files (.xlsx from Excel 2007+) and legacy Excel files (.xls from earlier versions). Both formats are converted to PDF with formatting preserved."
              },
              {
                question: "Will my cell formatting and borders be preserved?",
                answer: "Yes, our converter preserves table structure including cell borders, text formatting, number formats, and column/row sizing. Your PDF will closely match your Excel layout."
              },
              {
                question: "Can I convert spreadsheets with multiple sheets?",
                answer: "The converter processes the first (active) sheet of your workbook. For multi-sheet documents, we recommend converting each sheet separately or combining them in Excel first."
              },
              {
                question: "Are formulas and calculations included in the PDF?",
                answer: "The PDF contains the calculated values (results) of your formulas, not the formulas themselves. This is perfect for sharing final reports where recipients only need to see the data."
              },
              {
                question: "Is there a limit on spreadsheet size?",
                answer: "There's no strict row or column limit. However, very large spreadsheets with thousands of rows may take longer to process. For best results, remove unused rows and columns before converting."
              }
            ]}
            keywords={["excel to pdf", "xlsx to pdf", "spreadsheet to pdf", "xls to pdf converter", "convert excel to pdf free"]}
            relatedLinks={[
              { text: "Convert PDF back to Excel using PDF to Excel", href: "/pdf-to-excel" },
              { text: "Convert Word documents using Word to PDF", href: "/word-to-pdf" },
              { text: "Reduce file size using Compress PDF", href: "/compress" },
              { text: "Combine multiple PDFs using Merge PDF", href: "/merge" }
            ]}
            extraSections={[
              {
                title: "Why Convert Excel to PDF?",
                content: "Converting Excel spreadsheets to PDF offers significant advantages for business and personal use:",
                items: [
                  "Recipients don't need Excel installed to view the document",
                  "Formatting stays exactly as intended on all devices",
                  "Prevents accidental edits to your data and calculations",
                  "Professional appearance for client-facing documents",
                  "Easier printing with consistent page layout",
                  "Secure sharing of financial and sensitive data"
                ]
              },
              {
                title: "Common Use Cases for Excel to PDF",
                content: "Our Excel to PDF converter is trusted by professionals for many purposes:",
                items: [
                  "Creating and sending professional invoices",
                  "Sharing financial reports with stakeholders",
                  "Distributing price lists and catalogs",
                  "Archiving budget spreadsheets and forecasts",
                  "Submitting expense reports and timesheets",
                  "Publishing data tables and research results"
                ]
              }
            ]}
            exampleTable={{
              title: "Excel to PDF Conversion Examples",
              rows: [
                { label: "Invoice (1 page)", before: "25 KB XLSX", after: "85 KB PDF" },
                { label: "Financial Report (10 pages)", before: "150 KB XLSX", after: "320 KB PDF" },
                { label: "Data Table (500 rows)", before: "80 KB XLSX", after: "180 KB PDF" },
                { label: "Price List Catalog", before: "200 KB XLSX", after: "450 KB PDF" }
              ]
            }}
          />

          <RelatedTools currentToolId="excel-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
