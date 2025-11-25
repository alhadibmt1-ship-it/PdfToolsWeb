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
  Upload
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import siteLogo from "@assets/generated_images/pdf_hub_24_logo_icon.png";

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
};

function ConversionIcon({ iconType }: { iconType: string }) {
  const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
    pdf: { bgColor: "bg-red-500", textColor: "text-white", label: "PDF" },
    word: { bgColor: "bg-blue-500", textColor: "text-white", label: "DOC" },
    jpg: { bgColor: "bg-orange-500", textColor: "text-white", label: "JPG" },
    png: { bgColor: "bg-purple-500", textColor: "text-white", label: "PNG" },
    excel: { bgColor: "bg-green-600", textColor: "text-white", label: "XLS" },
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

  const renderToolGrid = (tools: typeof PDF_TOOLS) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
          <Card className="p-6 h-full hover-elevate active-elevate-2 cursor-pointer transition-all hover:scale-[1.02] group">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <ConversionIcon iconType={tool.icon} />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Use Tool
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-accent/20 to-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              All PDF Tools You Need
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Free and easy to use online PDF tools. Convert, merge, split, compress, and edit PDF files with no registration required.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                100% Free
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2">
                <img src={siteLogo} alt="PDF HUB 24" className="w-4 h-4" />
                Online
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2">
                <Infinity className="w-4 h-4 text-primary" />
                No Limits
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Secure
              </Badge>
            </div>
          </div>
        </section>

        <section id="from-pdf" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Convert from PDF
                </h2>
                <p className="text-muted-foreground text-sm">Transform your PDF files into other formats</p>
              </div>
            </div>
            {renderToolGrid(fromPdfTools)}
          </div>
        </section>

        <section id="to-pdf" className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Convert to PDF
                </h2>
                <p className="text-muted-foreground text-sm">Create PDF documents from other file formats</p>
              </div>
            </div>
            {renderToolGrid(toPdfTools)}
          </div>
        </section>

        <section id="edit-pdf" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Edit PDF
                </h2>
                <p className="text-muted-foreground text-sm">Modify and organize your PDF documents</p>
              </div>
            </div>
            {renderToolGrid(editPdfTools)}
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              Why Choose PDF HUB 24?
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Trusted by thousands of users worldwide for reliable PDF processing
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">100% Free</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>No hidden costs</li>
                  <li>No premium versions</li>
                  <li>All features included</li>
                </ul>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Easy to Use</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>No installation required</li>
                  <li>Works on any device</li>
                  <li>Simple drag and drop</li>
                </ul>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Infinity className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">No Restrictions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>No registration required</li>
                  <li>No subscription traps</li>
                  <li>Use as often as you like</li>
                </ul>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Processing</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>SSL encrypted transfer</li>
                  <li>Files auto-deleted</li>
                  <li>Privacy guaranteed</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Select Your Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from our collection of free PDF tools above
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Upload Your Files</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload your PDF files
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Download Result</h3>
                <p className="text-sm text-muted-foreground">
                  Get your processed file instantly - no waiting
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
