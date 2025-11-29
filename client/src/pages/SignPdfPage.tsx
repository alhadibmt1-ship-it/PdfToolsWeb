import { useState, useRef } from "react";
import { ChevronLeft, Download, PenTool, Trash2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function SignPdfPage() {
  useSEO({
    title: "Sign PDF Online Free - Add Signature to PDF | PDF HUB 24",
    description: "Add your signature to PDF documents online for free. Draw, type, or upload your signature. Sign PDFs instantly without printing.",
    keywords: "sign pdf, add signature to pdf, pdf signature, electronic signature, esign pdf, sign document online"
  });

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
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Sign PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Add your signature to PDF documents. Draw, type, or upload your signature image.
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
                        <img src={signatureImage} alt="Uploaded signature" className="max-h-20 mx-auto" />
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

          <ToolSEOContent
            toolName="Sign PDF"
            toolDescription="Add your electronic signature to PDF documents with our free online tool. Choose from three convenient methods: type your signature, draw it with your mouse or touchscreen, or upload an image of your signature. Sign documents instantly without printing, scanning, or faxing."
            howToSteps={[
              "Upload the PDF document you need to sign.",
              "Choose how to create your signature: type, draw, or upload.",
              "Adjust the position where the signature should appear.",
              "Click Add Signature and download your signed PDF."
            ]}
            benefits={[
              "Three signature methods: type, draw, or upload",
              "No printing or scanning required",
              "Precise positioning control",
              "Works on any device",
              "Saves on first page by default",
              "Professional-looking signatures",
              "No software installation needed",
              "Completely free to use"
            ]}
            faqs={[
              {
                question: "Is an electronic signature legally binding?",
                answer: "In many jurisdictions, electronic signatures are legally valid for most documents. However, some documents (like wills or certain contracts) may require handwritten signatures. Check your local laws for specific requirements."
              },
              {
                question: "Which signature method works best?",
                answer: "Drawing or uploading a signature image looks most like a handwritten signature. Typed signatures are quick and consistent. Choose based on your needs and the document's formality."
              },
              {
                question: "Can I sign multiple pages?",
                answer: "Currently, the signature is added to the first page. For multi-page signing, you can process the document multiple times or use our Add Watermark tool for content that appears on all pages."
              },
              {
                question: "How do I position my signature?",
                answer: "Use the X and Y position fields. X is distance from the left edge, Y is distance from the bottom. Standard PDF pages are 612×792 points (Letter) or 595×842 points (A4)."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["sign pdf", "electronic signature", "esign document", "pdf signature"]}
          />
          
          <RelatedTools currentToolId="sign-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
