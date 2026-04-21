import { useState, useRef } from "react";
import { ChevronLeft, Download, PenTool, Trash2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import CountrySpotlight from "@/components/CountrySpotlight";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

export default function SignPdfPage() {
  useSEO({
    title: "Sign PDF Free Online - Add Signature to PDF | PDF HUB 24",
    description: "Sign PDF free online. Add your signature to PDF documents instantly - draw, type, or upload. Best free eSign tool - no printing needed. No signup required.",
    keywords: "sign pdf free, add signature to pdf, pdf signature free, esign pdf online, electronic signature free, sign document online free",
    canonicalPath: "/sign-pdf"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("sign-pdf", lang, getToolSEOData("sign-pdf")?.longTailH1 || "Sign PDF");
  const toolDesc = getToolDesc("sign-pdf", lang, "Add your signature to PDF documents. Draw, type, or upload your signature image.");

  const [files, setFiles] = useState<File[]>([]);
  const [signatureType, setSignatureType] = useState<"draw" | "type" | "upload">("type");
  const [typedSignature, setTypedSignature] = useState("");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 750 });
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleSign = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    let signatureData = "";
    if (signatureType === "type") {
      if (!typedSignature.trim()) {
        toast({
          title: "Error",
          description: "Please enter your signature text",
          variant: "destructive",
        });
        return;
      }
      signatureData = typedSignature;
    } else if (signatureType === "draw") {
      const canvas = canvasRef.current;
      if (canvas) {
        signatureData = canvas.toDataURL("image/png");
      }
    } else if (signatureType === "upload" && signatureImage) {
      signatureData = signatureImage;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("signatureType", signatureType);
    formData.append("signatureData", signatureData);
    formData.append("x", position.x.toString());
    formData.append("y", position.y.toString());

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/sign-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to sign PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF signed successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to sign PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "signed.pdf";
      a.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{toolTitle}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {toolDesc}
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
                <div className="flex items-center gap-2 mb-2">
                  <PenTool className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Create Your Signature</h3>
                </div>

                <Tabs value={signatureType} onValueChange={(v) => setSignatureType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="type" data-testid="tab-type">Type</TabsTrigger>
                    <TabsTrigger value="draw" data-testid="tab-draw">Draw</TabsTrigger>
                    <TabsTrigger value="upload" data-testid="tab-upload">Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="type" className="space-y-4">
                    <div>
                      <Label htmlFor="signature">Type your signature</Label>
                      <Input
                        id="signature"
                        value={typedSignature}
                        onChange={(e) => setTypedSignature(e.target.value)}
                        placeholder="Your Name"
                        className="font-cursive text-xl"
                        style={{ fontFamily: 'cursive' }}
                        data-testid="input-signature"
                      />
                    </div>
                    {typedSignature && (
                      <div className="p-4 bg-muted rounded-md text-center">
                        <span style={{ fontFamily: 'cursive', fontSize: '24px' }}>{typedSignature}</span>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="draw" className="space-y-4">
                    <div className="border rounded-md bg-white p-2">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={150}
                        className="w-full border border-dashed rounded cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        data-testid="canvas-signature"
                      />
                    </div>
                    <Button variant="outline" onClick={clearCanvas} className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Signature
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <div>
                      <Label htmlFor="upload">Upload signature image (PNG with transparent background works best)</Label>
                      <Input
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-2"
                        data-testid="input-upload"
                      />
                    </div>
                    {signatureImage && (
                      <div className="p-4 bg-muted rounded-md text-center">
                        <img src={signatureImage} alt="Uploaded signature" className="max-h-20 mx-auto" loading="lazy" />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="posX">Position X (from left)</Label>
                    <Input
                      id="posX"
                      type="number"
                      value={position.x}
                      onChange={(e) => setPosition({...position, x: parseInt(e.target.value) || 0})}
                      data-testid="input-pos-x"
                    />
                  </div>
                  <div>
                    <Label htmlFor="posY">Position Y (from bottom)</Label>
                    <Input
                      id="posY"
                      type="number"
                      value={position.y}
                      onChange={(e) => setPosition({...position, y: parseInt(e.target.value) || 0})}
                      data-testid="input-pos-y"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Position values are in points (72 points = 1 inch). Default places signature near bottom left.
                </p>

                <Button 
                  onClick={handleSign} 
                  className="w-full"
                  size="lg"
                  data-testid="button-sign"
                >
                  Add Signature to PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Adding signature to your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your signed PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Signed PDF
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="sign-pdf" />

          <section className="rounded-lg border bg-card p-6 space-y-4 mt-4">
            <h2 className="text-base font-semibold">Is an Electronic Signature Legally Valid?</h2>
            <p className="text-sm text-muted-foreground">
              Electronic signatures created with PDF HUB 24 are recognised under three major international frameworks. Understanding your jurisdiction helps you sign with confidence.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-md border p-4 space-y-1">
                <h3 className="text-sm font-medium">🇺🇸 United States — ESIGN Act</h3>
                <p className="text-xs text-muted-foreground">The federal E-SIGN Act (2000) and UETA give electronic signatures the same legal weight as handwritten signatures for contracts, agreements, and business documents. Click-to-sign, drawn signatures, and typed signatures all qualify as valid electronic signatures under US law.</p>
              </div>
              <div className="rounded-md border p-4 space-y-1">
                <h3 className="text-sm font-medium">🇪🇺 European Union — eIDAS</h3>
                <p className="text-xs text-muted-foreground">The EU eIDAS Regulation (No 910/2014) establishes three tiers: Simple Electronic Signature (SES), Advanced (AES), and Qualified (QES). Signatures created here are SES — legally valid for most commercial contracts, NDAs, and internal business documents across all EU member states including France, Germany, and Spain.</p>
              </div>
              <div className="rounded-md border p-4 space-y-1">
                <h3 className="text-sm font-medium">🇬🇧 United Kingdom — UK eIDAS</h3>
                <p className="text-xs text-muted-foreground">After Brexit, the UK retained eIDAS principles under the Electronic Identification and Trust Services Regulation 2018. Electronic signatures are valid for contracts, employment agreements, and business documents throughout England, Wales, Scotland, and Northern Ireland. Witnessed signatures for deeds still require physical presence.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              For high-stakes legal documents — property deeds, wills, or notarised contracts — always consult a qualified solicitor or attorney in your jurisdiction. This information is general guidance, not legal advice.
            </p>
          </section>

          <CountrySpotlight toolCountrySlug="sign-pdf" />
          
          <RelatedTools currentToolId="sign-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
