import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code, Copy, CheckCircle, ArrowRight, ExternalLink, Settings,
  Monitor, Smartphone, Zap
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = "https://pdfhub24.com";

const embeddableTools = [
  { id: "merge", name: "Merge PDF", path: "/merge" },
  { id: "split", name: "Split PDF", path: "/split" },
  { id: "compress", name: "Compress PDF", path: "/compress" },
  { id: "pdf-to-word", name: "PDF to Word", path: "/pdf-to-word" },
  { id: "pdf-to-jpg", name: "PDF to JPG", path: "/pdf-to-jpg" },
  { id: "word-to-pdf", name: "Word to PDF", path: "/word-to-pdf" },
  { id: "jpg-to-pdf", name: "JPG to PDF", path: "/jpg-to-pdf" },
  { id: "rotate", name: "Rotate PDF", path: "/rotate" },
  { id: "protect-pdf", name: "Protect PDF", path: "/protect-pdf" },
  { id: "unlock-pdf", name: "Unlock PDF", path: "/unlock-pdf" },
  { id: "sign-pdf", name: "Sign PDF", path: "/sign-pdf" },
  { id: "image-compressor", name: "Image Compressor", path: "/image-compressor" },
  { id: "resize-image", name: "Resize Image", path: "/resize-image" },
  { id: "convert-image", name: "Convert Image", path: "/convert-image" }
];

const widthOptions = ["100%", "800px", "600px", "400px"];
const heightOptions = ["700px", "600px", "500px", "400px"];

export default function EmbedWidgetPage() {
  const [selectedTool, setSelectedTool] = useState(embeddableTools[0]);
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("600px");
  const [showBorder, setShowBorder] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const embedCode = `<iframe src="${BASE_URL}${selectedTool.path}?embed=true" width="${width}" height="${height}" frameborder="${showBorder ? "1" : "0"}" style="border: ${showBorder ? "1px solid #e5e7eb" : "none"}; border-radius: 8px;" allowfullscreen title="${selectedTool.name} - PDF HUB 24"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({ title: "Copied!", description: "Embed code copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please select and copy the code manually.", variant: "destructive" });
    }
  };

  useSEO({
    title: "Embed PDF Tools on Your Website Free — Widget Generator | PDF HUB 24",
    description: "Embed free PDF tools on your website with our widget generator. Get iframe code for merge, compress, convert, and 40+ PDF tools. Easy copy-paste integration.",
    keywords: "embed pdf tools, pdf widget, iframe pdf converter, embed pdf merger, website pdf tools",
    canonicalPath: "/embed",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Embed PDF Tools Widget Generator",
      "description": "Generate embed code to add PDF tools to your website",
      "url": `${BASE_URL}/embed`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Embed Widget</span>
          </nav>

          <div className="text-center mb-10">
            <Code className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Embed PDF Tools on Your Website</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add free PDF tools to your website, blog, or web application with a simple embed code. Choose a tool, customize the size, and copy the iframe snippet.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-10">
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Select Tool</label>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={selectedTool.id}
                    onChange={(e) => {
                      const tool = embeddableTools.find(t => t.id === e.target.value);
                      if (tool) setSelectedTool(tool);
                    }}
                    data-testid="select-tool"
                  >
                    {embeddableTools.map(tool => (
                      <option key={tool.id} value={tool.id}>{tool.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Width</label>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    data-testid="select-width"
                  >
                    {widthOptions.map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Height</label>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    data-testid="select-height"
                  >
                    {heightOptions.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="show-border"
                    checked={showBorder}
                    onChange={(e) => setShowBorder(e.target.checked)}
                    className="rounded"
                    data-testid="checkbox-border"
                  />
                  <label htmlFor="show-border" className="text-sm">Show border</label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Preview
              </h2>
              <Card className="overflow-visible">
                <CardContent className="p-4">
                  <div className="bg-muted/30 rounded-md p-4 flex items-center justify-center" style={{ minHeight: "300px" }}>
                    <div className="text-center">
                      <ExternalLink className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium mb-1">{selectedTool.name}</p>
                      <p className="text-xs text-muted-foreground mb-3">Embed preview: {width} x {height}</p>
                      <a href={`${selectedTool.path}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" data-testid="button-preview-tool">
                          Open Tool
                          <ExternalLink className="w-3 h-3 ml-1.5" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Embed Code
            </h2>
            <Card className="overflow-visible">
              <CardContent className="p-4">
                <div className="relative">
                  <pre className="bg-muted/50 rounded-md p-4 text-xs overflow-x-auto font-mono leading-relaxed" data-testid="text-embed-code">
                    {embedCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                    data-testid="button-copy-code"
                  >
                    {copied ? <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to Embed</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Choose Your Tool</h3>
                  <p className="text-sm text-muted-foreground">Select from 14+ embeddable PDF and image tools. Each tool works independently within the iframe.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Customize Size</h3>
                  <p className="text-sm text-muted-foreground">Set the width and height to fit your website layout. Responsive widths (100%) adapt to any container.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Copy & Paste</h3>
                  <p className="text-sm text-muted-foreground">Copy the generated iframe code and paste it into your website's HTML wherever you want the tool to appear.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Embed Our Tools?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <Smartphone className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Responsive Design</h3>
                  <p className="text-sm text-muted-foreground">Our tools adapt to any screen size, providing a seamless experience on desktop, tablet, and mobile devices.</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <Zap className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Fast & Lightweight</h3>
                  <p className="text-sm text-muted-foreground">Embeds load quickly and don't slow down your website. Processing happens on our servers, not yours.</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <Shield className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Secure Processing</h3>
                  <p className="text-sm text-muted-foreground">All file processing uses SSL encryption with automatic deletion. Your users' files are safe.</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <CheckCircle className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Free Forever</h3>
                  <p className="text-sm text-muted-foreground">Embedding our tools is completely free. No API keys, no usage fees, no hidden costs.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Available Tools for Embedding</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {embeddableTools.map((tool) => (
                <div key={tool.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/all-tools">
              <Button variant="outline" data-testid="button-view-all-tools">
                View All 43+ Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
