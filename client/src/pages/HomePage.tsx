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
  Presentation,
  FileEdit,
  Highlighter,
  EyeOff,
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
  FileCheck,
  LayoutGrid,
  Filter,
  Headphones
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { useLocation } from "wouter";
import RecentToolsSection from "@/components/RecentToolsSection";
import SocialProofSection from "@/components/SocialProofSection";
import TrustBadges from "@/components/TrustBadges";
import { useUploadContext } from "@/contexts/UploadContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, tFormat, getToolTitle } from "@/lib/languages";

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
  "edit-pdf": FileEdit,
  annotate: Highlighter,
  redact: EyeOff,
};

type CategoryFilter = "all" | "from-pdf" | "to-pdf" | "edit-pdf" | "utility";

const categoryInfo: Record<CategoryFilter, { labelKey: string; color: string; gradient: string }> = {
  "all":      { labelKey: "allTools",       color: "text-primary",     gradient: "from-primary to-blue-600" },
  "from-pdf": { labelKey: "convertFromPdf", color: "text-red-500",     gradient: "from-red-500 to-red-600" },
  "to-pdf":   { labelKey: "convertToPdf",   color: "text-green-500",   gradient: "from-green-500 to-green-600" },
  "edit-pdf": { labelKey: "editPdf",        color: "text-blue-500",    gradient: "from-blue-500 to-blue-600" },
  "utility":  { labelKey: "utilityTools",   color: "text-purple-500",  gradient: "from-purple-500 to-purple-600" },
};

const featuredTools = [
  { id: "compress", tagline: "Reduce file size instantly", highlight: "Up to 90% smaller" },
  { id: "merge", tagline: "Combine multiple PDFs", highlight: "Drag & drop ordering" },
  { id: "pdf-to-word", tagline: "Perfect conversion quality", highlight: "Keeps formatting" },
  { id: "split", tagline: "Extract pages you need", highlight: "Quick & precise" }
];

function ConversionIcon({ iconType, size = "default" }: { iconType: string; size?: "default" | "large" }) {
  const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
    pdf: { bgColor: "bg-red-600", textColor: "text-white", label: "PDF" },
    word: { bgColor: "bg-blue-600", textColor: "text-white", label: "DOC" },
    jpg: { bgColor: "bg-orange-600", textColor: "text-white", label: "JPG" },
    png: { bgColor: "bg-purple-600", textColor: "text-white", label: "PNG" },
    excel: { bgColor: "bg-green-700", textColor: "text-white", label: "XLS" },
    html: { bgColor: "bg-orange-700", textColor: "text-white", label: "HTML" },
    webp: { bgColor: "bg-cyan-700", textColor: "text-white", label: "WEBP" },
    ppt: { bgColor: "bg-orange-500", textColor: "text-white", label: "PPT" },
    tiff: { bgColor: "bg-indigo-600", textColor: "text-white", label: "TIFF" },
    gif: { bgColor: "bg-pink-600", textColor: "text-white", label: "GIF" },
  };

  const sizeClasses = size === "large" 
    ? { box: "w-12 h-12 sm:w-14 sm:h-14", text: "text-xs sm:text-sm", arrow: "w-5 h-5", icon: "w-7 h-7 sm:w-8 sm:h-8" }
    : { box: "w-9 h-9 sm:w-11 sm:h-11", text: "text-[10px] sm:text-xs", arrow: "w-3.5 h-3.5 sm:w-4 sm:h-4", icon: "w-5 h-5 sm:w-7 sm:h-7" };

  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromStyle = formatStyles[from];
    const toStyle = formatStyles[to];

    if (fromStyle && toStyle) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className={`${sizeClasses.box} rounded-lg ${fromStyle.bgColor} ${fromStyle.textColor} flex items-center justify-center ${sizeClasses.text} font-bold shadow-sm`}>
            {fromStyle.label}
          </div>
          <ArrowRight className={`${sizeClasses.arrow} text-muted-foreground`} />
          <div className={`${sizeClasses.box} rounded-lg ${toStyle.bgColor} ${toStyle.textColor} flex items-center justify-center ${sizeClasses.text} font-bold shadow-sm`}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const iconColors: Record<string, { bg: string; text: string }> = {
    compress:         { bg: "bg-orange-500/10",  text: "text-orange-500" },
    merge:            { bg: "bg-blue-500/10",     text: "text-blue-600" },
    split:            { bg: "bg-purple-500/10",   text: "text-purple-500" },
    "rotate-cw":      { bg: "bg-teal-500/10",     text: "text-teal-500" },
    trash:            { bg: "bg-red-500/10",      text: "text-red-500" },
    move:             { bg: "bg-blue-400/10",     text: "text-blue-400" },
    droplet:          { bg: "bg-slate-400/10",    text: "text-slate-500 dark:text-slate-400" },
    lock:             { bg: "bg-red-600/10",      text: "text-red-600 dark:text-red-400" },
    unlock:           { bg: "bg-green-600/10",    text: "text-green-600 dark:text-green-400" },
    hash:             { bg: "bg-blue-500/10",     text: "text-blue-500" },
    layers:           { bg: "bg-slate-500/10",    text: "text-slate-500 dark:text-slate-400" },
    grayscale:        { bg: "bg-gray-500/10",     text: "text-gray-500 dark:text-gray-400" },
    repair:           { bg: "bg-amber-500/10",    text: "text-amber-500" },
    "html-to-pdf":    { bg: "bg-orange-700/10",  text: "text-orange-700 dark:text-orange-400" },
    images:           { bg: "bg-cyan-500/10",     text: "text-cyan-500" },
    ocr:              { bg: "bg-teal-600/10",     text: "text-teal-600" },
    viewer:           { bg: "bg-indigo-500/10",   text: "text-indigo-500" },
    compare:          { bg: "bg-violet-500/10",   text: "text-violet-500" },
    "image-compress": { bg: "bg-orange-400/10",  text: "text-orange-400" },
    signature:        { bg: "bg-blue-600/10",     text: "text-blue-600" },
    "edit-pdf":       { bg: "bg-blue-500/10",     text: "text-blue-500" },
    annotate:         { bg: "bg-amber-500/10",    text: "text-amber-500" },
    redact:           { bg: "bg-zinc-700/10",     text: "text-zinc-700 dark:text-zinc-300" },
    crop:             { bg: "bg-green-500/10",    text: "text-green-500" },
    resize:           { bg: "bg-sky-400/10",      text: "text-sky-400" },
    "file-type":      { bg: "bg-indigo-500/10",   text: "text-indigo-500" },
    "file-image":     { bg: "bg-pink-500/10",     text: "text-pink-500" },
    image:            { bg: "bg-pink-500/10",     text: "text-pink-500" },
    scissors:         { bg: "bg-green-500/10",    text: "text-green-500" },
    camera:           { bg: "bg-rose-500/10",     text: "text-rose-500" },
    archive:          { bg: "bg-yellow-600/10",   text: "text-yellow-600 dark:text-yellow-400" },
    languages:        { bg: "bg-emerald-500/10",  text: "text-emerald-500" },
  };

  const colors = iconColors[iconType] || { bg: "bg-primary/10", text: "text-primary" };

  const containerSize = size === "large" ? "w-14 h-14 sm:w-16 sm:h-16" : "w-11 h-11 sm:w-14 sm:h-14";

  const Icon = iconMap[iconType];
  if (Icon) {
    return (
      <div className={`${containerSize} rounded-xl ${colors.bg} flex items-center justify-center`}>
        <Icon className={`${sizeClasses.icon} ${colors.text}`} />
      </div>
    );
  }

  return (
    <div className={`${containerSize} rounded-xl bg-primary/10 flex items-center justify-center`}>
      <FileText className={`${sizeClasses.icon} text-primary`} />
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

function FeaturedToolCard({ tool, featured }: { tool: typeof PDF_TOOLS[0]; featured: typeof featuredTools[0] }) {
  const { lang } = useLanguage();
  const translatedTitle = getToolTitle(tool.id, lang, tool.title);
  return (
    <Link href={tool.path} data-testid={`link-featured-${tool.id}`}>
      <div className="gradient-border group relative h-full overflow-hidden p-6 sm:p-8 cursor-pointer transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <ConversionIcon iconType={tool.icon} size="large" />
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{t(lang, "featuredLabel")}</span>
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {translatedTitle}
          </h3>
          
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            {featured.tagline}
          </p>
          
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">{featured.highlight}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
            <span>{t(lang, "useTool")} {translatedTitle}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [, navigate] = useLocation();
  const { setUploadedFile } = useUploadContext();
  const { lang } = useLanguage();
  const [showAllInGrid, setShowAllInGrid] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setLocalFile(file);
      setShowToolSelector(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(file);
      setShowToolSelector(true);
    }
  };

  const handleToolSelect = (toolPath: string) => {
    if (localFile) {
      setUploadedFile(localFile, toolPath);
    }
    setShowToolSelector(false);
    navigate(toolPath);
  };

  const closeToolSelector = () => {
    setShowToolSelector(false);
    setLocalFile(null);
  };
  
  const faqs = [
    {
      question: "Is PDF HUB 24 free to use?",
      answer: "Yes, all 49+ tools are completely free with no hidden fees or signups. You can use every feature without any limitations, as many times as you need."
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PDF HUB 24",
    "url": "https://pdfhub24.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pdfhub24.com/og-image.png",
      "width": 1200,
      "height": 630
    },
    "description": "Free online PDF tools - Convert, merge, split, compress PDF files. No registration required.",
    "sameAs": [
      "https://www.facebook.com/pdfhub24",
      "https://www.youtube.com/@pdfhub24"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "availableLanguage": ["English", "Spanish", "Arabic", "Hindi", "French", "Portuguese", "German", "Chinese", "Japanese", "Indonesian", "Russian", "Italian", "Urdu"]
    },
    "foundingDate": "2024",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 }
  };

  useSEO({
    title: "PDF HUB 24 - 49+ Free PDF Tools | Convert, Edit, Compress",
    description: "100% free PDF tools. Convert PDF to Word, JPG, Excel. Merge, split, compress PDFs instantly. Best free PDF converter - no signup, no watermarks.",
    keywords: "free pdf tools, pdf converter free, pdf to word free, merge pdf free, compress pdf free, pdf editor free, convert pdf online, pdf to jpg, split pdf",
    canonicalPath: "/",
    structuredData: organizationSchema
  });

  const allTools = PDF_TOOLS;
  const filteredTools = activeCategory === "all" 
    ? allTools 
    : allTools.filter(tool => tool.category === activeCategory);

  const TOOLS_INITIAL_COUNT = 15;
  const displayedTools = (activeCategory === "all" && !showAllInGrid)
    ? filteredTools.slice(0, TOOLS_INITIAL_COUNT)
    : filteredTools;

  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setShowAllInGrid(false);
  };
  
  const featuredToolsData = featuredTools.map(ft => ({
    tool: PDF_TOOLS.find(t => t.id === ft.id)!,
    featured: ft
  })).filter(ft => ft.tool);

  const categories: CategoryFilter[] = ["all", "from-pdf", "to-pdf", "edit-pdf", "utility"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section — compact, tool-first */}
        <section className="hero-gradient pt-6 pb-4 sm:pt-8 sm:pb-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(217_91%_60%/0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(192_91%_50%/0.08)_0%,transparent_40%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">{t(lang, "heroBadge")}</span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-[1.15] tracking-tight">
                {t(lang, "heroTitle")}
                <span className="gradient-text"> {t(lang, "heroFree")}</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xl mx-auto">
                {t(lang, "heroSubtitle")}
              </p>

              {/* Hero Upload Strip */}
              <div className="max-w-xl mx-auto mb-4">
                <div
                  className="group flex items-center gap-4 border-2 border-dashed border-primary/40 hover:border-primary/80 rounded-2xl px-5 py-4 bg-gradient-to-r from-primary/10 via-card/80 to-cyan-500/5 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
                  data-testid="hero-upload-zone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('hero-file-input')?.click()}
                >
                  <input
                    type="file"
                    id="hero-file-input"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.tiff,.webp,.html"
                    onChange={handleFileSelect}
                    data-testid="input-hero-file"
                  />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-sm sm:text-base">{t(lang, "heroDropFile")}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t(lang, "heroChooseTool")}</p>
                  </div>
                  <Button size="default" className="flex-shrink-0" data-testid="button-upload-hero">
                    {t(lang, "selectFile")}
                  </Button>
                </div>
              </div>

              {/* Trust row — 5 badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-500" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>No Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-orange-500" />
                  <span>Instant Processing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                  <span>No Watermarks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Selector Modal */}
        {showToolSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeToolSelector}>
            <div className="bg-card border rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{t(lang, "whatWouldYouLikeToDo")}</h3>
                  <button onClick={closeToolSelector} className="p-2 hover:bg-muted rounded-lg" data-testid="button-close-tool-selector">
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                {localFile && (
                  <p className="text-sm text-muted-foreground">File: <span className="font-medium text-foreground">{localFile.name}</span></p>
                )}
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PDF_TOOLS.slice(0, 18).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                      data-testid={`button-select-tool-${tool.id}`}
                    >
                      <ConversionIcon iconType={tool.icon} />
                      <span className="text-sm font-medium">{getToolTitle(tool.id, lang, tool.title)}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t text-center">
                  <Link href="/all-tools" onClick={closeToolSelector}>
                    <Button variant="outline" className="gap-2" data-testid="button-view-all-tools" aria-label="View all 49 free PDF tools">
                      <LayoutGrid className="w-4 h-4" />
                     View All 49 PDF Tools
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Tools Section - Adobe Style */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <span className="section-label block mb-3">{t(lang, "mostPopular")}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {t(lang, "featuredTools")}
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredToolsData.map(({ tool, featured }) => (
                <FeaturedToolCard key={tool.id} tool={tool} featured={featured} />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Used Tools */}
        <RecentToolsSection />

        {/* All Tools Section with Category Tabs */}
        <section className="py-12 sm:py-16 md:py-20" id="all-tools">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <span className="section-label block mb-3">{t(lang, "completeToolkit")}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t(lang, "allPdfTools")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(lang, "allPdfToolsSubtitle")}
              </p>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation ${
                    activeCategory === cat
                      ? `bg-gradient-to-r ${categoryInfo[cat].gradient} text-white shadow-lg`
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                  data-testid={`button-filter-${cat}`}
                >
                  {t(lang, categoryInfo[cat].labelKey)}
                  {cat !== "all" && (
                    <span className={`ml-1.5 ${activeCategory === cat ? "opacity-80" : "text-muted-foreground"}`}>
                      ({allTools.filter(tool => tool.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {displayedTools.map((tool, index) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
                  <div 
                    className="group relative h-full overflow-hidden rounded-xl bg-card border border-border/50 p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98] touch-manipulation"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-3 sm:mb-4">
                        <ConversionIcon iconType={tool.icon} />
                      </div>
                      
                      <h3 className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-1">
                        {getToolTitle(tool.id, lang, tool.title)}
                      </h3>
                      
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 flex-1 hidden sm:block">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-center text-[10px] sm:text-xs font-medium text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="hidden sm:inline">{t(lang, "useTool")}</span>
                        <ArrowRight className="w-3 h-3 sm:ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Show all / show less expander */}
            {activeCategory === "all" && filteredTools.length > TOOLS_INITIAL_COUNT && (
              <div className="mt-6 text-center">
                {!showAllInGrid ? (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowAllInGrid(true)}
                    data-testid="button-show-all-tools"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    {tFormat(lang, "showAllTools", { n: filteredTools.length })}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="gap-2 text-muted-foreground"
                    onClick={() => setShowAllInGrid(false)}
                    data-testid="button-show-less-tools"
                  >
                    {t(lang, "showFewerTools")}
                  </Button>
                )}
              </div>
            )}

            {/* Category Stats */}
            <div className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <Download className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-red-600 dark:text-red-400">9 Tools</div>
                <div className="text-xs text-muted-foreground">{t(lang, "convertFromPdf")}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                <Upload className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-600 dark:text-green-400">9 Tools</div>
                <div className="text-xs text-muted-foreground">{t(lang, "convertToPdf")}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">19 Tools</div>
                <div className="text-xs text-muted-foreground">{t(lang, "editPdf")}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                <Settings className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">7 Tools</div>
                <div className="text-xs text-muted-foreground">{t(lang, "utilityTools")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Security Badges Section */}
        <section className="py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <TrustBadges variant="prominent" />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-label block mb-3">{t(lang, "simpleProcess")}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t(lang, "howItWorks")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t(lang, "howItWorksSubtitle")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(lang, "step1Title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select from 49+ free PDF tools including converters, editors, and utilities
                </p>
                <div className="hidden md:block absolute top-10 right-0 w-[calc(50%-2rem)] h-0.5 bg-gradient-to-r from-primary/30 to-transparent translate-x-full" />
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(lang, "step2Title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Drag and drop or click to upload your PDF or document files securely
                </p>
                <div className="hidden md:block absolute top-10 right-0 w-[calc(50%-2rem)] h-0.5 bg-gradient-to-r from-primary/30 to-transparent translate-x-full" />
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold shadow-xl shadow-primary/25">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(lang, "step3Title")}</h3>
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
              <span className="section-label block mb-3">{t(lang, "whyChooseUs")}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t(lang, "whyPdfHub24")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t(lang, "whyChooseSubtitle")}
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
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">256-Bit TLS Encryption</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bank-level encryption for all file transfers. Your documents are protected with the same security used by major financial institutions.
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
                  <Trash2 className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Auto-Delete Files</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your files are automatically deleted after processing. We never store or access your documents.
                </p>
              </div>
              
              <div className="premium-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-5 border border-red-500/10">
                  <Headphones className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our tools are available around the clock. Process your documents anytime, anywhere in the world.
                </p>
              </div>
            </div>
            
            {/* User Rating Section - Trustpilot Style */}
            <div className="mt-12 pt-10 border-t">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`w-6 h-6 ${i <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-500/50 fill-yellow-500/50'}`} />
                    ))}
                  </div>
                  <div className="text-2xl font-bold mb-1">4.9 out of 5</div>
                  <div className="text-sm text-muted-foreground">Highly rated by our users</div>
                </div>
                
                <div className="hidden md:block h-16 w-px bg-border" />
                
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">1M+</div>
                    <div className="text-xs text-muted-foreground">Files Uploaded</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">250K+</div>
                    <div className="text-xs text-muted-foreground">Documents Edited</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">1M+</div>
                    <div className="text-xs text-muted-foreground">Converted</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Certifications - PDFGuru Style */}
            <div className="mt-10 pt-10 border-t">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold mb-2">Trusted & Certified</h3>
                <p className="text-sm text-muted-foreground">Industry-leading security standards</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <Shield className="w-8 h-8 text-green-500 mb-2" />
                  <div className="font-semibold text-xs text-center">SSL Secured</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <Lock className="w-8 h-8 text-primary mb-2" />
                  <div className="font-semibold text-xs text-center">256-Bit TLS</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <FileCheck className="w-8 h-8 text-purple-500 mb-2" />
                  <div className="font-semibold text-xs text-center">GDPR Ready</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="font-semibold text-xs text-center">Safe Browsing</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <Trash2 className="w-8 h-8 text-orange-500 mb-2" />
                  <div className="font-semibold text-xs text-center">Auto-Delete</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border">
                  <Eye className="w-8 h-8 text-cyan-500 mb-2" />
                  <div className="font-semibold text-xs text-center">No Tracking</div>
                </div>
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

        <div className="hidden" data-testid="ad-placeholder-mid" aria-hidden="true" />

        {/* Blog Articles Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-14">
              <span className="section-label block mb-3">Learn</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                PDF Tips & Tutorials
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learn how to work with PDF files effectively with our helpful guides
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <Link href="/blog/how-to-compress-pdf-for-email">
                <Card className="p-5 sm:p-6 h-full hover-elevate cursor-pointer">
                  <h3 className="font-semibold mb-2 text-foreground">How to Compress PDF for Email</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reduce PDF file size under 25MB for email attachments without losing quality.
                  </p>
                  <span className="text-sm text-primary flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Card>
              </Link>
              
              <Link href="/blog/convert-pdf-to-word-without-losing-formatting">
                <Card className="p-5 sm:p-6 h-full hover-elevate cursor-pointer">
                  <h3 className="font-semibold mb-2 text-foreground">Convert PDF to Word Without Losing Formatting</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep layout, fonts, and images intact when converting PDF to DOCX.
                  </p>
                  <span className="text-sm text-primary flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Card>
              </Link>
              
              <Link href="/blog/merge-pdf-files-guide">
                <Card className="p-5 sm:p-6 h-full hover-elevate cursor-pointer">
                  <h3 className="font-semibold mb-2 text-foreground">How to Merge PDF Files</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Combine multiple PDFs into one document in seconds - complete guide.
                  </p>
                  <span className="text-sm text-primary flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Card>
              </Link>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="outline" className="gap-2" data-testid="button-view-all-articles">
                  {t(lang, "viewAllArticles")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-muted/30">
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

        {/* Tools for Students & Business */}
        <section className="py-16 sm:py-20 bg-muted/30 border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-label block mb-3">Built for Real People</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Tools Organized by How You Work
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Whether you're a student, professional, or running a business — we have the right tools for your workflow
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For Students */}
              <div className="bg-card border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Tools for Students</h3>
                    <p className="text-sm text-muted-foreground">Assignments, essays, research & more</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { href: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple assignment files into one submission" },
                    { href: "/compress-pdf", label: "Compress PDF", desc: "Shrink large files to meet university upload limits" },
                    { href: "/pdf-to-word", label: "PDF to Word", desc: "Convert lecture PDFs to editable notes in Word" },
                    { href: "/split-pdf", label: "Split PDF", desc: "Extract specific chapters from large textbook PDFs" },
                    { href: "/ocr-pdf", label: "OCR PDF", desc: "Make scanned handwritten notes searchable and selectable" },
                    { href: "/add-page-numbers", label: "Add Page Numbers", desc: "Number pages on essays and reports automatically" },
                  ].map((tool, i) => (
                    <Link key={i} href={tool.href}>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover-elevate cursor-pointer group">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">{tool.label}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/compress-pdf">
                  <Button className="w-full mt-6 gap-2" variant="outline" data-testid="button-students-cta">
                    <GraduationCap className="w-4 h-4" />
                    Start with Student Tools
                  </Button>
                </Link>
              </div>

              {/* For Business */}
              <div className="bg-card border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Tools for Business</h3>
                    <p className="text-sm text-muted-foreground">Contracts, invoices, reports & presentations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { href: "/protect-pdf", label: "Password Protect PDF", desc: "Lock confidential contracts and financial reports" },
                    { href: "/sign-pdf", label: "Sign PDF", desc: "Add electronic signatures to contracts without printing" },
                    { href: "/redact-pdf", label: "Redact PDF", desc: "Permanently black out sensitive client or employee data" },
                    { href: "/excel-to-pdf", label: "Excel to PDF", desc: "Share financial reports that look perfect on any screen" },
                    { href: "/add-watermark", label: "Add Watermark", desc: "Brand proposals and reports with your company watermark" },
                    { href: "/pdf-to-excel", label: "PDF to Excel", desc: "Extract invoice tables and financial data into spreadsheets" },
                  ].map((tool, i) => (
                    <Link key={i} href={tool.href}>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover-elevate cursor-pointer group">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">{tool.label}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/sign-pdf">
                  <Button className="w-full mt-6 gap-2" variant="outline" data-testid="button-business-cta">
                    <Briefcase className="w-4 h-4" />
                    Start with Business Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProofSection />

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
              <Link href="/merge-pdf">
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
