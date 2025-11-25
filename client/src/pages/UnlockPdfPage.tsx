import { useState } from "react";
import { ChevronLeft, Download, Unlock } from "lucide-react";
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

export default function UnlockPdfPage() {
  useSEO({
    title: "Unlock PDF Online Free - Remove Password from PDF | PDF HUB 24",
    description: "Remove password protection from PDF files for free. Unlock encrypted PDF documents when you know the password. Easy and secure PDF unlocker.",
    keywords: "unlock pdf, remove pdf password, pdf unlocker, decrypt pdf, remove pdf protection"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Unlock PDF</h1>
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

          <ToolSEOContent
            toolName="Unlock PDF"
            toolDescription="Remove password protection from PDF files when you know the password. Our free online PDF unlocker helps you regain full access to your documents. Perfect for when you need to edit, print, or share a protected PDF."
            howToSteps={[
              "Upload your password-protected PDF file.",
              "Enter the correct password for the PDF.",
              "Click the Unlock PDF button to remove the protection.",
              "Download your unlocked PDF file."
            ]}
            benefits={[
              "Remove password from PDF files you own",
              "Regain full access to your documents",
              "Edit and modify previously locked PDFs",
              "Print and share without restrictions",
              "Free and easy to use",
              "No registration required",
              "Secure processing",
              "Fast unlocking process"
            ]}
            faqs={[
              {
                question: "Do I need the password to unlock a PDF?",
                answer: "Yes, you must know the correct password to unlock a protected PDF. This tool removes the protection for convenience, but it requires the password to verify you have authorized access."
              },
              {
                question: "Is this tool for cracking PDF passwords?",
                answer: "No, this tool is not for bypassing security. It's designed for legitimate use when you know the password but want to remove the protection for easier access to your own documents."
              },
              {
                question: "What if I forgot the password?",
                answer: "If you've forgotten the password, this tool cannot help. The password is required to decrypt the PDF. Try to remember or recover the password through other means."
              },
              {
                question: "Will unlocking affect the PDF content?",
                answer: "No, unlocking only removes the password protection. All content, formatting, images, and text remain exactly the same."
              },
              {
                question: "Can I add a new password after unlocking?",
                answer: "Yes, after downloading the unlocked PDF, you can use our Protect PDF tool to add new password protection with a different password."
              }
            ]}
            keywords={["decrypt pdf", "remove pdf lock", "pdf password remover"]}
          />
          
          <RelatedTools currentToolId="unlock-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
