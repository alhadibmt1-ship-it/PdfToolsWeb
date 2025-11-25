import { useState } from "react";
import { ChevronLeft, Download, Lock } from "lucide-react";
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

export default function ProtectPdfPage() {
  useSEO({
    title: "Protect PDF Online Free - Password Protect PDF Files | PDF HUB 24",
    description: "Add password protection to your PDF files for free. Encrypt PDF documents with a password to prevent unauthorized access. Secure and easy to use.",
    keywords: "protect pdf, password protect pdf, encrypt pdf, secure pdf, lock pdf, pdf security"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleProtect = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to protect",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 4) {
      toast({
        title: "Error",
        description: "Password must be at least 4 characters",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("userPassword", password);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/protect-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to protect PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF protected successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to protect PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "protected.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Protect PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Add password protection to your PDF file to prevent unauthorized access.
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
                  <Lock className="w-5 h-5" />
                  Set Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      data-testid="input-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      data-testid="input-confirm-password"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Password must be at least 4 characters. Keep it safe - you'll need it to open the PDF.
                  </p>
                </div>
                <Button 
                  onClick={handleProtect} 
                  className="w-full"
                  size="lg"
                  data-testid="button-protect"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Protect PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Encrypting your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your protected PDF is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  Remember your password - you'll need it to open this PDF.
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Protected PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Protect PDF"
            toolDescription="Secure your sensitive PDF documents with password protection. Our free online tool encrypts your PDF files so only people with the password can open and view them. Perfect for confidential documents, financial records, and private information."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Enter a strong password and confirm it.",
              "Click the Protect PDF button to encrypt your document.",
              "Download your password-protected PDF file."
            ]}
            benefits={[
              "Strong encryption to secure your documents",
              "Password required to open the PDF",
              "Protect confidential and sensitive information",
              "Free and easy to use",
              "No registration required",
              "Files are deleted after processing",
              "Works with any PDF file",
              "Fast encryption process"
            ]}
            faqs={[
              {
                question: "How secure is the password protection?",
                answer: "We use industry-standard PDF encryption. The password you set is required to open the PDF. Choose a strong password with a mix of letters, numbers, and symbols for best security."
              },
              {
                question: "Can I remove the password later?",
                answer: "Yes, use our Unlock PDF tool to remove the password protection. You'll need to enter the correct password to unlock the file."
              },
              {
                question: "What happens if I forget the password?",
                answer: "Unfortunately, if you forget the password, there's no way to recover it. The encryption is designed to prevent unauthorized access, which includes forgotten passwords. Always keep your passwords safe."
              },
              {
                question: "Can people print or copy a protected PDF?",
                answer: "The protection also restricts printing and copying by default. Users will need the password just to open and view the document."
              },
              {
                question: "Is my PDF secure during upload?",
                answer: "Yes, all file transfers use secure HTTPS encryption. Your files are processed in memory and deleted immediately after you download the result."
              }
            ]}
            keywords={["encrypt pdf", "pdf password", "secure documents"]}
          />
          
          <RelatedTools currentToolId="protect-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
