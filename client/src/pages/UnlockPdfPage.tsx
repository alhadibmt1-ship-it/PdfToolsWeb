import { useState } from "react";
import { ChevronLeft, Download, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function UnlockPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUnlock = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter the password for the PDF",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("password", password);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/unlock", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Failed to unlock PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF unlocked successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to unlock PDF. Please check your password and try again.",
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
            <p className="text-muted-foreground leading-relaxed">
              Remove password protection from your PDF. You'll need to know the current password.
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
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold mb-4">Enter PDF Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the PDF password"
                      data-testid="input-password"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleUnlock} 
                  className="w-full"
                  size="lg"
                  data-testid="button-unlock"
                  disabled={!password}
                >
                  Unlock PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Removing password protection..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your unlocked PDF is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  The password protection has been removed from your PDF.
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
