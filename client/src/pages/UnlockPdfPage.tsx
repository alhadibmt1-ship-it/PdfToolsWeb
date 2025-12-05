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
            toolId="unlock-pdf"
            toolDescription="Remove password protection from PDF files when you know the password with our free online PDF unlocker. Our secure tool decrypts your protected documents so you can regain full access to edit, print, copy, and share without restrictions. Perfect for when you have the password but need an unrestricted version of your own documents for archiving, editing, or sharing with colleagues."
            howToSteps={[
              "Upload your password-protected PDF file by clicking the upload area or dragging and dropping.",
              "Enter the correct password that was used to protect the PDF document.",
              "Click the 'Unlock PDF' button to decrypt and remove the password protection.",
              "Download your unlocked PDF file — now free from password restrictions."
            ]}
            benefits={[
              "Remove password protection from PDFs you own",
              "Regain full access to edit and modify documents",
              "Enable printing and copying without restrictions",
              "Share documents freely without password hassle",
              "Create backup copies without protection",
              "Merge unlocked PDFs with other documents",
              "No software installation required",
              "Secure processing with automatic file deletion",
              "Fast decryption takes just seconds"
            ]}
            faqs={[
              {
                question: "Do I need the password to unlock a PDF?",
                answer: "Yes, you must know and enter the correct password to unlock a protected PDF. This tool is designed for legitimate use when you have authorized access but want to remove the protection for convenience. It does not bypass or crack unknown passwords — it simply removes the protection layer once you provide the correct credentials."
              },
              {
                question: "Is this tool for cracking or bypassing PDF passwords?",
                answer: "No, absolutely not. This tool is not designed for bypassing security or cracking passwords. It is intended solely for legitimate use cases where you own the document or have been given the password. The tool requires the correct password to function and cannot recover or guess unknown passwords."
              },
              {
                question: "What if I forgot the PDF password?",
                answer: "Unfortunately, if you have forgotten the password, this tool cannot help you. PDF encryption is specifically designed to prevent access without the password. Try checking your email for when the file was originally shared, look in a password manager, or contact the person who originally protected the file."
              },
              {
                question: "Will unlocking affect the PDF content or quality?",
                answer: "No, unlocking only removes the password protection layer. All content including text, images, formatting, fonts, and interactive elements remain exactly the same. The document's visual appearance and file size will be virtually identical to the original."
              },
              {
                question: "Can I add a different password after unlocking?",
                answer: "Yes, after downloading the unlocked PDF, you can use our Protect PDF tool to add new password protection with any password of your choice. This is useful if you need to change the password or share with different access credentials."
              }
            ]}
            keywords={["unlock pdf online", "remove pdf password", "decrypt pdf free", "pdf password remover", "unlock encrypted pdf"]}
            relatedLinks={[
              { text: "Add new password using Protect PDF", href: "/protect-pdf" },
              { text: "Compress unlocked file using Compress PDF", href: "/compress" },
              { text: "Edit pages using Delete Pages", href: "/delete-pages" },
              { text: "Merge with other documents using Merge PDF", href: "/merge" }
            ]}
            extraSections={[
              {
                title: "Why Unlock Password-Protected PDFs?",
                content: "There are many legitimate reasons to remove PDF password protection when you have authorized access:",
                items: [
                  "Create editable copies of your own protected documents",
                  "Archive documents without needing to remember passwords",
                  "Share documents with colleagues without password complexity",
                  "Prepare PDFs for merging with other documents",
                  "Enable printing on devices that don't support password entry",
                  "Simplify document management in shared folders"
                ]
              },
              {
                title: "When Should You Keep Password Protection?",
                content: "Consider keeping password protection in these situations:",
                items: [
                  "Documents containing sensitive personal information",
                  "Financial records and tax documents",
                  "Legal contracts and confidential agreements",
                  "Medical or health-related documents",
                  "Files shared via unsecured channels",
                  "Documents stored in cloud services without encryption"
                ]
              }
            ]}
            exampleTable={{
              title: "Common PDF Unlock Scenarios",
              rows: [
                { label: "Old protected document", before: "Password required", after: "Open freely" },
                { label: "Archived report", before: "Password forgotten", after: "Accessible (with password)" },
                { label: "Shared contract", before: "Print restricted", after: "Full print access" },
                { label: "Team document", before: "Individual access", after: "Shared access" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="unlock-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
