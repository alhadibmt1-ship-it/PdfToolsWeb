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
    title: "Excel to PDF Converter - Convert XLSX to PDF Online Free | PDF HUB 24",
    description: "Convert Excel spreadsheets to PDF documents online for free. Transform XLSX and XLS files into professional PDF format. Preserve formatting. No registration required.",
    keywords: "excel to pdf, convert xlsx to pdf, spreadsheet to pdf, xls to pdf, excel converter, pdf creator"
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
            toolDescription="Our Excel to PDF converter transforms your spreadsheets into professional PDF documents while preserving the table structure and formatting. This makes it easy to share financial reports, data tables, and business documents."
            howToSteps={[
              "Upload your Excel file (XLSX or XLS format)",
              "Click 'Convert to PDF' to start the conversion",
              "Wait for the processing to complete",
              "Download your PDF document"
            ]}
            benefits={[
              "Preserve table structure and formatting",
              "Create professional PDF documents",
              "Easy to share and print",
              "Compatible with all PDF viewers",
              "Supports both XLSX and XLS formats"
            ]}
            faqs={[
              {
                question: "Which Excel formats are supported?",
                answer: "We support both modern Excel files (.xlsx) and legacy Excel files (.xls). Both formats will be converted to PDF."
              },
              {
                question: "Will charts and images be included?",
                answer: "Currently, our converter focuses on table data and text content. For spreadsheets with complex charts, we recommend using Excel's built-in export feature."
              },
              {
                question: "Can I convert multiple sheets?",
                answer: "The converter processes the first sheet of your workbook. For multi-sheet documents, we recommend converting each sheet separately."
              }
            ]}
          />

          <RelatedTools currentToolId="excel-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
