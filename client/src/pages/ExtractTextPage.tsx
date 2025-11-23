import { useState } from "react";
import { ChevronLeft, Download, Copy } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ExtractTextPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Failed to extract text");
      }

      const data = await response.json();
      setExtractedText(data.text);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Text extracted successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to extract text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Extract Text from PDF</h1>
            <p className="text-muted-foreground leading-relaxed">
              Extract all text content from your PDF document. The text will be displayed here and can be downloaded as a .txt file.
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
              <Button 
                onClick={handleExtract} 
                className="w-full"
                size="lg"
                data-testid="button-extract"
              >
                Extract Text
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Extracting text from PDF..." : undefined}
            />

            {status === "success" && extractedText && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Extracted Text</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCopy} 
                      variant="outline"
                      size="sm"
                      data-testid="button-copy"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      onClick={handleDownloadText} 
                      variant="outline"
                      size="sm"
                      data-testid="button-download-text"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="textarea-extracted-text"
                />
                <p className="text-xs text-muted-foreground">
                  {extractedText.length} characters extracted
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
