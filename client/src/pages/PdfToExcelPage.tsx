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

export default function PdfToExcelPage() {
  useSEO({
    title: "PDF to Excel Converter - Convert PDF to XLSX Online Free | PDF HUB 24",
    description: "Convert PDF tables to Excel spreadsheets online for free. Extract data from PDF documents into editable XLSX format. Fast, accurate conversion. No registration required.",
    keywords: "pdf to excel, convert pdf to xlsx, pdf to spreadsheet, extract tables from pdf, pdf table converter, pdf data extraction"
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
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-excel", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to Excel successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "converted.xlsx";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to Excel</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Extract tables and data from your PDF documents into editable Excel spreadsheets. Perfect for analyzing financial reports, invoices, and data tables.
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
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to Excel
              </Button>
            )}

            {status === "processing" && (
              <ProcessingState 
                status="processing"
                message="Extracting data to Excel..." 
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
                    Your Excel spreadsheet is ready for download.
                  </p>
                  <Button onClick={handleDownload} size="lg" data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download Excel
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
            toolName="PDF to Excel Converter"
            toolDescription="Our PDF to Excel converter extracts tabular data from your PDF documents and converts it into editable XLSX spreadsheets. This tool is perfect for extracting financial data, invoices, reports, and any structured information from PDFs."
            howToSteps={[
              "Upload your PDF file containing tables or data",
              "Click 'Convert to Excel' to start the extraction",
              "Wait for the processing to complete",
              "Download your Excel spreadsheet"
            ]}
            benefits={[
              "Extract tables from PDFs automatically",
              "Editable XLSX format for easy analysis",
              "Works with financial reports and invoices",
              "Preserve data structure and formatting",
              "Compatible with Excel, Google Sheets, and more"
            ]}
            faqs={[
              {
                question: "What types of PDFs work best?",
                answer: "PDFs with clearly structured tables, invoices, and reports convert best. Scanned documents or images may have limited data extraction."
              },
              {
                question: "Can I edit the Excel file after conversion?",
                answer: "Yes! The output is a standard XLSX file that you can open and edit in Microsoft Excel, Google Sheets, or any compatible spreadsheet application."
              },
              {
                question: "Does it preserve formulas?",
                answer: "The converter extracts data values from PDFs. Since PDFs don't contain live formulas, only the visible values are extracted."
              }
            ]}
          />

          <RelatedTools currentToolId="pdf-to-excel" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
