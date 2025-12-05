import { Link } from "wouter";
import { 
  Combine, 
  SplitSquareHorizontal, 
  FileDown, 
  Image, 
  FileImage, 
  FileText, 
  RotateCw, 
  Trash2, 
  Type,
  ArrowRight,
  Lock,
  Unlock,
  Hash,
  Droplet,
  Move,
  Zap,
  Shield,
  Infinity,
  Clock,
  CheckCircle,
  Table,
  FileSpreadsheet,
  Download,
  Upload,
  Crop,
  Maximize2,
  PenTool,
  Layers,
  Contrast,
  Wrench,
  FileCode,
  Images,
  ScanText,
  Eye,
  GitCompare,
  ImageDown,
  Settings,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  HelpCircle,
  Smartphone
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import siteLogo from "@assets/generated_images/logo-64.webp";

const iconMap: Record<string, any> = {
  merge: Combine,
  split: SplitSquareHorizontal,
  compress: FileDown,
  image: Image,
  "file-image": FileImage,
  "file-text": FileText,
  "rotate-cw": RotateCw,
  trash: Trash2,
  "file-type": Type,
  lock: Lock,
  unlock: Unlock,
  hash: Hash,
  droplet: Droplet,
  move: Move,
  crop: Crop,
  resize: Maximize2,
  signature: PenTool,
  layers: Layers,
  grayscale: Contrast,
  repair: Wrench,
  "html-to-pdf": FileCode,
  images: Images,
  ocr: ScanText,
  viewer: Eye,
  compare: GitCompare,
  "image-compress": ImageDown,
};

function ConversionIcon({ iconType }: { iconType: string }) {
  const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
    pdf: { bgColor: "bg-red-500", textColor: "text-white", label: "PDF" },
    word: { bgColor: "bg-blue-500", textColor: "text-white", label: "DOC" },
    jpg: { bgColor: "bg-orange-500", textColor: "text-white", label: "JPG" },
    png: { bgColor: "bg-purple-500", textColor: "text-white", label: "PNG" },
    excel: { bgColor: "bg-green-600", textColor: "text-white", label: "XLS" },
    html: { bgColor: "bg-orange-600", textColor: "text-white", label: "HTML" },
    webp: { bgColor: "bg-cyan-500", textColor: "text-white", label: "WEBP" },
  };

  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromStyle = formatStyles[from];
    const toStyle = formatStyles[to];

    if (fromStyle && toStyle) {
      return (
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${fromStyle.bgColor} ${fromStyle.textColor} flex items-center justify-center text-xs font-bold`}>
            {fromStyle.label}
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <div className={`w-10 h-10 rounded-lg ${toStyle.bgColor} ${toStyle.textColor} flex items-center justify-center text-xs font-bold`}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const Icon = iconMap[iconType];
  if (Icon) {
    return (
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
      <FileText className="w-7 h-7 text-primary" />
    </div>
  );
}

export default function HomePage() {
  useSEO({
    title: "PDF HUB 24 - Free Online PDF Tools | Convert, Merge, Split & More",
    description: "Free online PDF tools for converting PDF to Word, Excel, JPG, PNG and more. Merge PDFs, split, compress, and edit PDF files. Fast, secure, and easy to use - no registration required.",
    keywords: "pdf to word, pdf to excel, merge pdf, pdf to jpg, pdf to png, split pdf, compress pdf, jpg to pdf, png to pdf, excel to pdf, word to pdf, free pdf tools"
  });

  const fromPdfTools = PDF_TOOLS.filter(tool => tool.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(tool => tool.category === "to-pdf");
  const editPdfTools = PDF_TOOLS.filter(tool => tool.category === "edit-pdf");
  const utilityTools = PDF_TOOLS.filter(tool => tool.category === "utility");

  const renderToolGrid = (tools: typeof PDF_TOOLS) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {tools.map((tool, index) => (
        <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
          <div 
            className="premium-card p-6 h-full cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <ConversionIcon iconType={tool.icon} />
              </div>
              
              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                {tool.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-primary opacity-80 group-hover:opacity-100 group-hover:gap-2 transition-all">
                Use Tool
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="hero-gradient py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.05)_0%,transparent_40%)]" />
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="section-label">Professional PDF Tools</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              All PDF Tools You Need
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Free and easy to use online PDF tools. Convert, merge, split, compress, and edit PDF files with no registration required.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 stagger-children">
              <div className="glass-badge px-5 py-2.5 rounded-full flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="glass-badge px-5 py-2.5 rounded-full flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Available 24/7</span>
              </div>
              <div className="glass-badge px-5 py-2.5 rounded-full flex items-center gap-2.5">
                <Infinity className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">No Limits</span>
              </div>
              <div className="glass-badge px-5 py-2.5 rounded-full flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Secure Processing</span>
              </div>
            </div>
          </div>
        </section>

        <section id="from-pdf" className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/10">
                <Download className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <span className="section-label block mb-1">Export & Convert</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Convert from PDF
                </h2>
              </div>
            </div>
            {renderToolGrid(fromPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        <section id="to-pdf" className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/10">
                <Upload className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <span className="section-label block mb-1">Import & Create</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Convert to PDF
                </h2>
              </div>
            </div>
            {renderToolGrid(toPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        <section id="edit-pdf" className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="section-label block mb-1">Modify & Organize</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Edit PDF
                </h2>
              </div>
            </div>
            {renderToolGrid(editPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        <section id="utility" className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/10">
                <Settings className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <span className="section-label block mb-1">Extra Tools</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Utility Tools
                </h2>
              </div>
            </div>
            {renderToolGrid(utilityTools)}
          </div>
        </section>

        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="section-label block mb-3">Why Us</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Why Choose PDF HUB 24?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by thousands of users worldwide for reliable PDF processing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="premium-card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mx-auto mb-5 border border-green-500/10">
                  <CheckCircle className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold mb-3">100% Free</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>No hidden costs</li>
                  <li>No premium versions</li>
                  <li>All features included</li>
                </ul>
              </div>
              
              <div className="premium-card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/10">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">Easy to Use</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>No installation required</li>
                  <li>Works on any device</li>
                  <li>Simple drag and drop</li>
                </ul>
              </div>
              
              <div className="premium-card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/10">
                  <Infinity className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">No Restrictions</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>No registration required</li>
                  <li>No subscription traps</li>
                  <li>Use as often as you like</li>
                </ul>
              </div>
              
              <div className="premium-card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/10">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">Secure Processing</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>SSL encrypted transfer</li>
                  <li>Files auto-deleted</li>
                  <li>Privacy guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="section-label block mb-3">Simple Process</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-lg shadow-primary/20">
                  1
                </div>
                <h3 className="font-semibold mb-2">Select Your Tool</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose from our collection of free PDF tools above
                </p>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-lg shadow-primary/20">
                  2
                </div>
                <h3 className="font-semibold mb-2">Upload Your Files</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Drag and drop or click to upload your PDF files
                </p>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-lg shadow-primary/20">
                  3
                </div>
                <h3 className="font-semibold mb-2">Download Result</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get your processed file instantly - no waiting
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive SEO Content */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
              All PDF Tools You Need - Free, Fast & Secure
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center mb-8">
              PDF HUB 24 offers a complete set of online PDF tools to convert, edit, optimize, and manage your documents. 
              Whether you need to compress files, convert formats, merge PDFs, extract pages, or protect your documents — 
              everything is available in one place, free of cost, and with no registration required.
            </p>
            <p className="text-muted-foreground leading-relaxed text-center">
              Our tools are designed for students, professionals, office users, freelancers, and anyone who works with PDF files daily.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-semibold">Convert From PDF</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Turn your PDF into the format you need:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/pdf-to-word" className="hover:text-primary">PDF to Word</Link> - Edit documents easily</li>
                  <li><Link href="/pdf-to-jpg" className="hover:text-primary">PDF to JPG</Link> - Convert pages to images</li>
                  <li><Link href="/pdf-to-png" className="hover:text-primary">PDF to PNG</Link> - High-quality image output</li>
                  <li><Link href="/pdf-to-excel" className="hover:text-primary">PDF to Excel</Link> - Extract tables and data</li>
                  <li><Link href="/extract-text" className="hover:text-primary">Extract Text</Link> - Copy and reuse content instantly</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Perfect for editing, printing, uploading, or repurposing your documents.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold">Convert to PDF</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Create clean, secure, and universally compatible PDF files:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/word-to-pdf" className="hover:text-primary">Word to PDF</Link></li>
                  <li><Link href="/jpg-to-pdf" className="hover:text-primary">JPG to PDF</Link></li>
                  <li><Link href="/png-to-pdf" className="hover:text-primary">PNG to PDF</Link></li>
                  <li><Link href="/excel-to-pdf" className="hover:text-primary">Excel to PDF</Link></li>
                  <li><Link href="/html-to-pdf" className="hover:text-primary">HTML to PDF</Link></li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Great for emailing documents, applying signatures, or preserving formatting.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Edit PDF</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Make changes to your PDF without downloading any software:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/compress" className="hover:text-primary">Compress PDF</Link> - Reduce file size</li>
                  <li><Link href="/merge" className="hover:text-primary">Merge PDF</Link> - Combine multiple documents</li>
                  <li><Link href="/split" className="hover:text-primary">Split PDF</Link> - Separate pages easily</li>
                  <li><Link href="/rotate" className="hover:text-primary">Rotate PDF</Link> - Fix upside-down pages</li>
                  <li><Link href="/protect" className="hover:text-primary">Protect PDF</Link> - Add password for security</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  All editing tools work online and complete within seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Who Is This Website For?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold">Students</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compress assignments, convert images to PDF, extract text, merge notes.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold">Office Users</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create PDFs from Word/Excel, protect documents, optimize for emailing.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="font-semibold">Professionals</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prepare contracts, proposals, business files, secure PDFs.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-semibold">Freelancers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Convert client files, reduce file size, extract images or text.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold">Government Upload Users</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Resize PDFs to meet upload size limits for official submissions.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h3 className="font-semibold">Mobile Users</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Works perfectly on Android and iPhone - process PDFs on the go.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              What Makes PDF HUB 24 Better?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">32+ PDF tools in one platform</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Simple and clean interface</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Cloud-powered conversion</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Fast processing for all file sizes</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Accurate conversion with minimal errors</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Supports scanned PDFs with OCR</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Works on all devices - mobile, tablet, desktop</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">No registration or signup required</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-2xl md:text-3xl font-semibold">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Is PDF HUB 24 free to use?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, all tools are completely free with no hidden fees or signups. You can use every feature without any limitations.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How long are my files stored?</h3>
                <p className="text-muted-foreground text-sm">
                  All files are deleted automatically after processing for maximum privacy. We never store or share your documents.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can I use this website on mobile?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely — PDF HUB 24 works perfectly on Android and iPhone. Access all tools from any device, anywhere.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Is there a limit to file size?</h3>
                <p className="text-muted-foreground text-sm">
                  Most PDFs can be processed normally. Very large files may take longer but still work. There are no artificial file size limits.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Do you support all PDF operations?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, our platform includes 32+ tools for conversion, editing, compression, merging, splitting, security, and more.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Choose any tool above and start processing your PDF files instantly. 
              No registration, no downloads, no limits - just fast, reliable PDF tools.
            </p>
            <p className="text-sm text-muted-foreground">
              Trusted by thousands of users worldwide for all their PDF needs.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
