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
  Smartphone,
  ChevronDown,
  ChevronUp,
  Star,
  Globe,
  Cloud,
  Sparkles,
  MousePointerClick,
  FileCheck
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";

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
    pdf: { bgColor: "bg-red-600", textColor: "text-white", label: "PDF" },
    word: { bgColor: "bg-blue-600", textColor: "text-white", label: "DOC" },
    jpg: { bgColor: "bg-orange-600", textColor: "text-white", label: "JPG" },
    png: { bgColor: "bg-purple-600", textColor: "text-white", label: "PNG" },
    excel: { bgColor: "bg-green-700", textColor: "text-white", label: "XLS" },
    html: { bgColor: "bg-orange-700", textColor: "text-white", label: "HTML" },
    webp: { bgColor: "bg-cyan-700", textColor: "text-white", label: "WEBP" },
  };

  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromStyle = formatStyles[from];
    const toStyle = formatStyles[to];

    if (fromStyle && toStyle) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${fromStyle.bgColor} ${fromStyle.textColor} flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm`}>
            {fromStyle.label}
          </div>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${toStyle.bgColor} ${toStyle.textColor} flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm`}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const Icon = iconMap[iconType];
  if (Icon) {
    return (
      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10">
      <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onClick, id }: { question: string; answer: string; isOpen: boolean; onClick: () => void; id: string }) {
  const contentId = `faq-content-${id}`;
  const buttonId = `faq-button-${id}`;
  
  return (
    <div className="premium-card overflow-visible">
      <button
        id={buttonId}
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-testid={`toggle-faq-${id}`}
      >
        <h3 className="font-semibold text-sm sm:text-base">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      <div 
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ${isOpen ? '' : 'hidden'}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-faq-answer-${id}`}>{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  useSEO({
    title: "PDF HUB 24 - Free Online PDF Tools | Convert, Merge, Split & More",
    description: "Free online PDF tools for converting PDF to Word, Excel, JPG, PNG and more. Merge PDFs, split, compress, and edit PDF files. Fast, secure, and easy to use - no registration required.",
    keywords: "pdf to word, pdf to excel, merge pdf, pdf to jpg, pdf to png, split pdf, compress pdf, jpg to pdf, png to pdf, excel to pdf, word to pdf, free pdf tools"
  });

  const fromPdfTools = PDF_TOOLS.filter(tool => tool.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(tool => tool.category === "to-pdf");
  const editPdfTools = PDF_TOOLS.filter(tool => tool.category === "edit-pdf");
  const utilityTools = PDF_TOOLS.filter(tool => tool.category === "utility");

  const faqs = [
    {
      question: "Is PDF HUB 24 free to use?",
      answer: "Yes, all 32+ tools are completely free with no hidden fees or signups. You can use every feature without any limitations, as many times as you need."
    },
    {
      question: "How secure are my files?",
      answer: "Your security is our priority. All file transfers are encrypted with SSL/TLS. Files are automatically deleted after processing and are never stored or shared. We don't have access to your documents."
    },
    {
      question: "Can I use this on mobile devices?",
      answer: "Absolutely! PDF HUB 24 is fully responsive and works perfectly on Android, iPhone, iPad, and any tablet. Access all tools from any device, anywhere."
    },
    {
      question: "Is there a file size limit?",
      answer: "Most PDFs can be processed without issues. Very large files may take longer but still work. There are no artificial file size limits for most operations."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation required! PDF HUB 24 works entirely in your browser. Simply visit the website, choose your tool, upload your file, and download the result."
    }
  ];

  const renderToolGrid = (tools: typeof PDF_TOOLS) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {tools.map((tool, index) => (
        <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
          <div 
            className="premium-card p-4 sm:p-5 md:p-6 h-full cursor-pointer group min-h-[150px] sm:min-h-[170px]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col h-full">
              <div className="mb-3 sm:mb-4">
                <ConversionIcon iconType={tool.icon} />
              </div>
              
              <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                {tool.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-1 leading-relaxed line-clamp-2 hidden sm:block">
                {tool.description}
              </p>
              
              <div className="flex items-center text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all mt-auto">
                <span className="hidden sm:inline">Use Tool</span>
                <span className="sm:hidden">Open</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
        {/* Hero Section */}
        <section className="hero-gradient py-16 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(217_91%_60%/0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(192_91%_50%/0.08)_0%,transparent_40%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6 sm:mb-8">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">32+ Free PDF Tools</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 leading-[1.1] tracking-tight">
                Transform Your PDFs
                <span className="block gradient-text mt-1">With Just a Click</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
                Convert, merge, split, compress, and edit PDF files instantly. 
                Free forever, no registration required, secure and fast.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 max-w-xl sm:max-w-none mx-auto mb-10 sm:mb-12">
                <div className="glass-badge px-4 py-2.5 rounded-full flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">100% Free</span>
                </div>
                <div className="glass-badge px-4 py-2.5 rounded-full flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Secure</span>
                </div>
                <div className="glass-badge px-4 py-2.5 rounded-full flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm font-medium">Fast</span>
                </div>
                <div className="glass-badge px-4 py-2.5 rounded-full flex items-center justify-center gap-2">
                  <Infinity className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">No Limits</span>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link href="/merge">
                  <Button size="lg" className="gap-2" data-testid="button-merge-hero">
                    <Combine className="w-4 h-4" />
                    Merge PDF
                  </Button>
                </Link>
                <Link href="/compress">
                  <Button size="lg" variant="outline" className="gap-2" data-testid="button-compress-hero">
                    <FileDown className="w-4 h-4" />
                    Compress PDF
                  </Button>
                </Link>
                <Link href="/pdf-to-word">
                  <Button size="lg" variant="outline" className="gap-2" data-testid="button-convert-hero">
                    <FileText className="w-4 h-4" />
                    PDF to Word
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Stats Bar */}
        <section className="py-8 sm:py-10 border-b bg-card/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">32+</div>
                <div className="text-sm text-muted-foreground">PDF Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Free Forever</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">SSL</div>
                <div className="text-sm text-muted-foreground">Encrypted</div>
              </div>
            </div>
          </div>
        </section>

        {/* Convert from PDF Section */}
        <section id="from-pdf" className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Download className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <span className="section-label block mb-1">Export & Convert</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Convert from PDF</h2>
              </div>
            </div>
            {renderToolGrid(fromPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        {/* Convert to PDF Section */}
        <section id="to-pdf" className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <span className="section-label block mb-1">Import & Create</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Convert to PDF</h2>
              </div>
            </div>
            {renderToolGrid(toPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        {/* Edit PDF Section */}
        <section id="edit-pdf" className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <span className="section-label block mb-1">Modify & Organize</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Edit PDF</h2>
              </div>
            </div>
            {renderToolGrid(editPdfTools)}
          </div>
        </section>
        
        <div className="premium-divider max-w-5xl mx-auto" />

        {/* Utility Tools Section */}
        <section id="utility" className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <span className="section-label block mb-1">Extra Tools</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Utility Tools</h2>
              </div>
            </div>
            {renderToolGrid(utilityTools)}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-label block mb-3">Simple Process</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three simple steps to transform your PDF files
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Choose Your Tool</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select from 32+ free PDF tools including converters, editors, and utilities
                </p>
                <div className="hidden md:block absolute top-10 right-0 w-[calc(50%-2rem)] h-0.5 bg-gradient-to-r from-primary/30 to-transparent translate-x-full" />
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Upload Your File</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Drag and drop or click to upload your PDF or document files securely
                </p>
                <div className="hidden md:block absolute top-10 right-0 w-[calc(50%-2rem)] h-0.5 bg-gradient-to-r from-primary/30 to-transparent translate-x-full" />
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Download Result</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get your processed file instantly - fast, free, and with no watermarks
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-label block mb-3">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Why PDF HUB 24?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Trusted by users worldwide for fast, secure, and reliable PDF processing
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-5 border border-green-500/10">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Free Forever</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All tools are completely free with no hidden costs, subscriptions, or premium tiers. Use as much as you need.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 border border-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Bank-Level Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  SSL encryption for all transfers. Files are automatically deleted after processing. Your data stays private.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-5 border border-orange-500/10">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Powered by cloud technology for instant processing. Most files are ready in seconds, not minutes.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-5 border border-purple-500/10">
                  <Globe className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access from any device - desktop, tablet, or mobile. No software installation needed, just your browser.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mb-5 border border-cyan-500/10">
                  <Star className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">High Quality Output</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Professional-grade conversions that preserve formatting, fonts, and images. No quality loss guaranteed.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-5 border border-red-500/10">
                  <Infinity className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Limits</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No file count restrictions, no daily limits, no registration required. Just upload and convert endlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-14">
              <span className="section-label block mb-3">For Everyone</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Who Uses PDF HUB 24?
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold">Students</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compress assignments, merge notes, convert images to PDF for submissions.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold">Office Workers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create PDFs from Word/Excel, protect documents, optimize for email.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="font-semibold">Professionals</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prepare contracts, proposals, and secure business documents.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-semibold">Freelancers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Convert client files, reduce file sizes, extract content quickly.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold">Government Users</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Resize PDFs to meet official upload size requirements.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
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

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12">
              <span className="section-label block mb-3">FAQ</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  id={String(index)}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-cyan-500/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FileCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Start Now - It's Free</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your PDFs?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Choose any tool above and start processing your files instantly. 
              No registration, no downloads, no limits.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/merge">
                <Button size="lg" className="gap-2" data-testid="button-merge-cta">
                  <Combine className="w-4 h-4" />
                  Merge PDFs
                </Button>
              </Link>
              <Link href="/pdf-to-word">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-convert-cta">
                  <FileText className="w-4 h-4" />
                  Convert PDF to Word
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              Trusted by users worldwide for all their PDF needs
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
