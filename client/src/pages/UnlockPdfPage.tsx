import { useState } from "react";
import { ChevronLeft, Download, Unlock } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function UnlockPdfPage() {
  useSEO({
    title: "Unlock PDF Free - Remove Password | PDF HUB 24",
    description: "Unlock PDF free. Remove password from PDF when you know the password. Best free PDF unlocker. No signup.",
    keywords: "unlock pdf free, remove pdf password, pdf unlocker free, decrypt pdf, remove password from pdf, unlock protected pdf",
    canonicalPath: "/unlock-pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleUnlock = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to unlock",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter the PDF password",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("password", password);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/unlock-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to unlock PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF unlocked successfully",
      });
    } catch (error: any) {
      setStatus("error");
      toast({
        title: "Error",
        description: error.message || "Failed to unlock PDF. Please check the password and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "unlocked.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("unlock-pdf")?.longTailH1 || "Unlock PDF"}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Remove password protection from your PDF file when you know the password.
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
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Unlock className="w-5 h-5" />
                  Enter PDF Password
                </h3>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter the PDF password"
                    data-testid="input-password"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the password that was used to protect this PDF.
                  </p>
                </div>
                <Button 
                  onClick={handleUnlock} 
                  className="w-full"
                  size="lg"
                  data-testid="button-unlock"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Unlock PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Unlocking your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your unlocked PDF is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  The password protection has been removed. You can now freely open, edit, and share this PDF.
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Unlocked PDF
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="unlock-pdf" />
          
          <RelatedTools currentToolId="unlock-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
