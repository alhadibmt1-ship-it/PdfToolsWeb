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
    title: "Password Protect PDF Free - Lock PDF | PDF HUB 24",
    description: "Password protect PDF free. Add password to PDF files instantly. Best free PDF encryptor - lock PDF. No signup.",
    keywords: "password protect pdf free, lock pdf, encrypt pdf free, add password to pdf, secure pdf, pdf password protection free",
    canonicalPath: "/protect-pdf"
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
            toolId="protect-pdf"
            toolDescription="Secure your sensitive PDF documents with password protection using industry-standard AES encryption. Our free online tool encrypts your PDF files so only authorized users with the correct password can open, view, print, or copy the contents. Perfect for confidential business documents, financial records, legal contracts, personal identification files, and any private information you need to share securely via email or cloud storage."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Enter a strong password (minimum 4 characters) and confirm it by typing again.",
              "Click the 'Protect PDF' button to encrypt your document with secure encryption.",
              "Download your password-protected PDF and share it safely — remember to keep your password secure."
            ]}
            benefits={[
              "Strong AES encryption to secure your documents",
              "Password required to open, view, or print the PDF",
              "Protect confidential business and personal information",
              "Prevent unauthorized copying and editing",
              "Share sensitive files safely via email or cloud",
              "No registration or account required",
              "Files are processed securely and deleted after download",
              "Works with all PDF files regardless of size",
              "Fast encryption process takes just seconds"
            ]}
            faqs={[
              {
                question: "How secure is the password protection?",
                answer: "We use industry-standard PDF encryption that requires the password to open the file. The encryption prevents unauthorized access even if someone intercepts the file. For maximum security, choose a strong password with at least 8 characters including uppercase, lowercase, numbers, and symbols. Never share your password through the same channel as the PDF."
              },
              {
                question: "Can I remove the password later?",
                answer: "Yes, you can use our Unlock PDF tool to remove the password protection from your document. You will need to enter the correct password to unlock the file. Once unlocked, you can save the PDF without protection or apply a new password."
              },
              {
                question: "What happens if I forget the password?",
                answer: "Unfortunately, if you forget the password, there is no way to recover or reset it. The encryption is specifically designed to prevent any access without the password — this includes the document owner. Always store your passwords securely using a password manager or written backup in a safe location."
              },
              {
                question: "Can people print or copy content from a protected PDF?",
                answer: "When you protect a PDF with our tool, users must enter the password to open and view the document. This means unauthorized users cannot access any content including printing or copying. Once opened with the correct password, standard PDF viewing capabilities are available."
              },
              {
                question: "Is my PDF secure during upload and processing?",
                answer: "Absolutely. All file transfers use secure HTTPS/TLS encryption. Your files are processed entirely in memory on our secure servers and are automatically deleted immediately after you download the result. We never store your files or passwords, and your documents are never shared with third parties."
              }
            ]}
            keywords={["encrypt pdf", "password protect pdf", "secure pdf online", "lock pdf file", "pdf encryption free"]}
            relatedLinks={[
              { text: "Remove password protection using Unlock PDF", href: "/unlock-pdf" },
              { text: "Add watermark for additional security using Add Watermark", href: "/add-watermark" },
              { text: "Flatten forms before protecting using Flatten PDF", href: "/flatten-pdf" },
              { text: "Compress before sharing using Compress PDF", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Why Password Protect Your PDF Files?",
                content: "Password protection is essential for documents containing sensitive information. PDF HUB 24 makes it easy to secure your files before sharing.",
                items: [
                  "Protect financial statements and tax documents",
                  "Secure legal contracts and agreements",
                  "Safeguard personal identification documents (ID, passport scans)",
                  "Protect medical records and health information",
                  "Secure business proposals and confidential reports",
                  "Prevent unauthorized access to employee records"
                ]
              },
              {
                title: "Best Practices for PDF Password Security",
                content: "Follow these guidelines to maximize the security of your protected PDF documents:",
                items: [
                  "Use passwords with at least 8 characters",
                  "Include uppercase, lowercase, numbers, and symbols",
                  "Never share passwords through the same email as the PDF",
                  "Use different passwords for different documents",
                  "Store passwords securely in a password manager",
                  "Consider using our Flatten PDF tool before protecting to prevent form editing"
                ]
              }
            ]}
            exampleTable={{
              title: "Common Password Protection Use Cases",
              rows: [
                { label: "Financial Report", before: "Unprotected", after: "Password Required" },
                { label: "Legal Contract", before: "Open to anyone", after: "Client-only access" },
                { label: "Medical Records", before: "Visible to all", after: "Patient-protected" },
                { label: "Employee Documents", before: "Accessible", after: "HR-secured" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="protect-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
