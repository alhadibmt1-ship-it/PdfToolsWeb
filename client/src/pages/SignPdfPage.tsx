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
            toolId="sign-pdf"
            toolDescription="Add your electronic signature to PDF documents instantly with our free online signing tool. Choose from three convenient methods: type your name in a signature-style font, draw your signature with your mouse or touchscreen, or upload an image of your handwritten signature. Sign contracts, agreements, forms, and any PDF documents without printing, scanning, or faxing — saving time, paper, and money."
            howToSteps={[
              "Upload the PDF document you need to sign by clicking the upload area or dragging and dropping.",
              "Choose your signature method: Type your name, Draw with mouse/touchscreen, or Upload a signature image.",
              "Adjust the X and Y position coordinates to place your signature exactly where needed on the page.",
              "Click 'Add Signature to PDF' and download your professionally signed document."
            ]}
            benefits={[
              "Three flexible signature methods: type, draw, or upload image",
              "No printing, scanning, or faxing required",
              "Precise X/Y positioning control for accurate placement",
              "Works on desktop, tablet, and mobile devices",
              "Draw signatures with mouse, stylus, or touchscreen",
              "Upload PNG images with transparent backgrounds",
              "Professional cursive-style typed signatures",
              "No software installation or account needed",
              "Completely free to use with unlimited signatures"
            ]}
            faqs={[
              {
                question: "Is an electronic signature legally binding?",
                answer: "In most countries, electronic signatures are legally valid and enforceable for the majority of business and personal documents under laws like the US ESIGN Act, EU eIDAS regulation, and similar legislation worldwide. However, certain documents like wills, real estate deeds, and some government forms may still require handwritten signatures. Always check your local laws and the specific requirements of your document or agreement."
              },
              {
                question: "Which signature method should I use?",
                answer: "Each method has its advantages: Drawing produces the most authentic handwritten look and is ideal for formal documents. Uploading an image of your real signature provides the most consistent and professional result across multiple documents. Typing is the fastest option and works well for internal documents or when a handwritten appearance isn't critical."
              },
              {
                question: "Can I sign multiple pages in the same document?",
                answer: "Currently, the signature is added to the first page at the coordinates you specify. For documents requiring signatures on multiple pages, you can process the document multiple times with different pages, or for initials/stamps on every page, consider using our Add Watermark tool which can place content on all pages simultaneously."
              },
              {
                question: "How do I position my signature correctly?",
                answer: "Use the X (horizontal) and Y (vertical) position fields measured in points (72 points = 1 inch). X is the distance from the left edge, Y is the distance from the bottom of the page. Standard PDF pages are 612x792 points (Letter) or 595x842 points (A4). For a signature near the bottom-left, try X=50 and Y=100. For bottom-right on Letter paper, try X=400 and Y=100."
              },
              {
                question: "What image format works best for uploading a signature?",
                answer: "PNG format with a transparent background works best, as it allows your signature to appear naturally on top of the document without a white box around it. You can create this by signing on white paper, photographing or scanning it, and using any image editor to remove the white background. JPEG images will also work but may show a rectangular background."
              }
            ]}
            keywords={["sign pdf online", "electronic signature free", "add signature to pdf", "esign document", "pdf digital signature"]}
            relatedLinks={[
              { text: "Protect signed document using Protect PDF", href: "/protect-pdf" },
              { text: "Add date stamp using Add Watermark", href: "/add-watermark" },
              { text: "Flatten signed forms using Flatten PDF", href: "/flatten-pdf" },
              { text: "Compress before sending using Compress PDF", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Why Use Electronic Signatures?",
                content: "Electronic signatures streamline document workflows and offer significant advantages over traditional paper signing:",
                items: [
                  "Sign documents instantly from anywhere in the world",
                  "Eliminate printing, scanning, and mailing costs",
                  "Reduce document turnaround time from days to minutes",
                  "Create a paperless, environmentally friendly workflow",
                  "Store signed documents securely in digital format",
                  "Easily share signed documents via email or cloud storage"
                ]
              },
              {
                title: "Common Document Types for E-Signing",
                content: "Our PDF signing tool works great for many types of documents:",
                items: [
                  "Employment contracts and offer letters",
                  "Rental agreements and lease documents",
                  "Sales contracts and purchase orders",
                  "Non-disclosure agreements (NDAs)",
                  "Permission forms and consent documents",
                  "Invoice approvals and financial documents"
                ]
              }
            ]}
            exampleTable={{
              title: "Signature Positioning Guide",
              rows: [
                { label: "Bottom-left (Letter)", before: "Unsigned", after: "X=50, Y=100" },
                { label: "Bottom-right (Letter)", before: "Unsigned", after: "X=400, Y=100" },
                { label: "Center-bottom (A4)", before: "Unsigned", after: "X=250, Y=100" },
                { label: "Above footer", before: "Unsigned", after: "X=50, Y=150" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="sign-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
