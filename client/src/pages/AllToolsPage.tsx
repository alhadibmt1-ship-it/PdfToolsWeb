import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, ArrowRight, LayoutGrid, FileOutput, FileInput, FileEdit, Wrench, 
  ChevronDown, ChevronUp, Shield, Zap, CheckCircle, HelpCircle, X
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { PDF_TOOLS } from "@shared/schema";

const BASE_URL = "https://pdfhub24.com";

const categoryConfig = {
  "from-pdf": { label: "Convert from PDF", icon: FileOutput, description: "Convert your PDF files to Word, Excel, JPG, PNG, PowerPoint, and other popular formats." },
  "to-pdf": { label: "Convert to PDF", icon: FileInput, description: "Convert documents and images to PDF format. Supports Word, Excel, JPG, PNG, TIFF, GIF, and more." },
  "edit-pdf": { label: "Edit PDF", icon: FileEdit, description: "Merge, split, compress, rotate, sign, annotate, and modify your PDF documents." },
  "utility": { label: "Utility & Image Tools", icon: Wrench, description: "View, compare PDFs, compress images, resize, crop, rotate, and convert between image formats." }
};

type CategoryKey = keyof typeof categoryConfig;

function FAQItem({ question, answer, isOpen, onClick, id }: { question: string; answer: string; isOpen: boolean; onClick: () => void; id: string }) {
  return (
    <Card className="overflow-visible">
      <button
        className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
        data-testid={`toggle-faq-${id}`}
      >
        <h3 className="font-semibold text-sm sm:text-base">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-faq-answer-${id}`}>{answer}</p>
        </div>
      )}
    </Card>
  );
}

export default function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "All 49+ Free PDF Tools Online - Complete Tool List | PDF HUB 24",
    description: "Browse all 49+ free online PDF tools. Convert, edit, merge, split, compress PDF files and more. Complete list of PDF HUB 24 tools - no registration required.",
    keywords: "free pdf tools, all pdf tools, pdf converter, pdf editor, merge pdf, split pdf, compress pdf, pdf to word, pdf tools list, online pdf tools",
    canonicalPath: "/all-tools",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "All Tools", "item": `${BASE_URL}/all-tools` }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PDF HUB 24 - All PDF Tools",
        "url": `${BASE_URL}/all-tools`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "description": "Browse all 49+ free online PDF tools. Convert, edit, merge, split, compress PDF files.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    ]
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "All Tools", "item": `${BASE_URL}/all-tools` }
      ]
    });
    document.head.appendChild(script);
    return () => {
      document.querySelectorAll('script[data-page-schema="true"]').forEach(s => s.remove());
    };
  }, []);

  const filteredTools = PDF_TOOLS.filter(tool => {
    const matchesSearch = searchQuery === "" || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: (CategoryKey | "all")[] = ["all", "from-pdf", "to-pdf", "edit-pdf", "utility"];
  const categoryLabels: Record<string, string> = { all: "All Tools", ...Object.fromEntries(Object.entries(categoryConfig).map(([k, v]) => [k, v.label])) };

  const faqs = [
    { question: "Are all PDF HUB 24 tools completely free?", answer: "Yes, every single one of our 49+ tools is 100% free to use. There are no hidden fees, no premium tiers, and no usage limits. You can convert, edit, merge, split, compress, and perform any operation without paying anything." },
    { question: "Do I need to create an account to use the tools?", answer: "No registration or account creation is required. Simply visit any tool page, upload your file, and get your result instantly. We believe in making PDF tools accessible to everyone without barriers." },
    { question: "Are my files safe and private?", answer: "Absolutely. All file transfers use SSL/TLS encryption. Your uploaded files are processed securely and automatically deleted after processing. We never store, share, or access your documents. Your privacy is our top priority." },
    { question: "Can I use these tools on my phone or tablet?", answer: "Yes! All 49+ tools are fully responsive and work perfectly on smartphones, tablets, and desktops. Whether you're using an iPhone, Android, iPad, or any other device, you'll have full access to every feature." },
    { question: "What file formats does PDF HUB 24 support?", answer: "We support a comprehensive range of formats including PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, TIFF, GIF, WebP, HTML, and more. Check individual tool pages for specific format support." },
    { question: "How does PDF HUB 24 compare to Adobe Acrobat?", answer: "While Adobe Acrobat is excellent desktop software, PDF HUB 24 offers similar core functionality entirely free and online. You don't need to download or install anything. For most everyday PDF tasks like converting, merging, splitting, and compressing, our tools provide professional results at zero cost." }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-all-tools">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LayoutGrid className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">All 49+ Free PDF Tools Online</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our complete collection of free online PDF tools. Convert, edit, merge, split, compress PDF files and much more. 
            Every tool is free to use with no registration required. PDF HUB 24 provides professional-grade 
            <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> PDF</a> processing 
            tools that work on any device, anywhere in the world.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools... (e.g., merge, compress, convert)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              data-testid="input-search-tools"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover-elevate" data-testid="button-clear-search">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              data-testid={`button-filter-${cat}`}
            >
              {categoryLabels[cat]} {cat === "all" ? `(${PDF_TOOLS.length})` : `(${PDF_TOOLS.filter(t => t.category === cat).length})`}
            </Button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6" data-testid="text-results-count">
          Showing {filteredTools.length} of {PDF_TOOLS.length} tools
        </p>

        {activeCategory === "all" && searchQuery === "" ? (
          (Object.keys(categoryConfig) as CategoryKey[]).map((catKey) => {
            const config = categoryConfig[catKey];
            const Icon = config.icon;
            const tools = PDF_TOOLS.filter(t => t.category === catKey);
            return (
              <section key={catKey} className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{config.label}</h2>
                  <span className="text-sm text-muted-foreground">({tools.length} tools)</span>
                </div>
                <p className="text-muted-foreground mb-6">{config.description}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools.map((tool) => (
                    <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
                      <Card className="hover-elevate cursor-pointer h-full">
                        <CardContent className="p-5 flex items-start gap-3">
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">{tool.title}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{tool.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filteredTools.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No tools found</p>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}

        <section className="max-w-4xl mx-auto mb-12">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">Why Choose PDF HUB 24 for Your PDF Needs?</h2>
            <p>
              PDF HUB 24 provides a comprehensive suite of over 43 professional PDF tools, all completely free and available online without any registration. 
              Whether you need to convert a <Link href="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link>, 
              <Link href="/merge-pdf" className="text-primary hover:underline"> merge multiple PDFs</Link>, or 
              <Link href="/compress-pdf" className="text-primary hover:underline"> compress a large PDF file</Link>, 
              our platform delivers professional results instantly.
            </p>
            <p>
              The <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portable Document Format (PDF)</a> 
              has been the standard for document sharing since its creation by Adobe in 1993. Today, it's standardized as 
              <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ISO 32000</a>, 
              ensuring compatibility across all platforms and devices. PDF HUB 24 supports the latest PDF standards to ensure your documents maintain 
              their formatting and quality through every conversion and edit.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 py-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">Secure & Private</div>
                  <div className="text-xs">SSL encryption, auto-delete after processing</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">Lightning Fast</div>
                  <div className="text-xs">Cloud-powered processing for instant results</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">No Watermarks</div>
                  <div className="text-xs">Professional output, completely free</div>
                </div>
              </div>
            </div>
            <p>
              Our tools are used by business professionals, students, educators, and legal teams worldwide. From simple tasks like 
              <Link href="/rotate-pdf" className="text-primary hover:underline"> rotating a PDF</Link> to advanced operations like 
              <Link href="/ocr-pdf" className="text-primary hover:underline"> OCR text recognition</Link> and 
              <Link href="/redact-pdf" className="text-primary hover:underline"> PDF redaction</Link>, 
              PDF HUB 24 covers every PDF workflow. Learn more about PDF usage trends on our 
              <Link href="/pdf-statistics" className="text-primary hover:underline"> PDF Statistics</Link> page.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                id={`all-tools-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </section>

        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Start Processing Your PDFs Now</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            No downloads, no signups, no fees. Choose any tool above and get started in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/convert-pdf">
              <Button className="gap-2" data-testid="link-free-converter">
                <FileOutput className="w-4 h-4" />
                PDF Converter
              </Button>
            </Link>
            <Link href="/edit-pdf">
              <Button variant="outline" className="gap-2" data-testid="link-free-editor">
                <FileEdit className="w-4 h-4" />
                PDF Editor
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
