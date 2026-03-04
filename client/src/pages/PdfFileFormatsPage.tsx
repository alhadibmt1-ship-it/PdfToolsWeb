import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText, CheckCircle, ArrowRight, BookOpen, HelpCircle,
  ChevronDown, ChevronUp, Layers, Image, Type, Lock
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const formats = [
  {
    name: "PDF (Portable Document Format)",
    extension: ".pdf",
    icon: FileText,
    description: "The universal document format created by Adobe in 1993 and standardized as ISO 32000. PDF preserves fonts, images, graphics, and layout regardless of the application or platform used to view it. It is the most widely used document format globally with over 2.5 trillion PDF files opened annually.",
    specs: "Standard: ISO 32000-2:2020 | Max file size: Theoretically unlimited | Color spaces: RGB, CMYK, Grayscale | Compression: Multiple methods supported",
    useCases: ["Business documents, contracts, and invoices", "Academic papers and research publications", "Government forms and legal filings", "Print-ready materials and brochures", "Archival documents (PDF/A variant)"],
    tools: [{ name: "Compress PDF", path: "/compress" }, { name: "Merge PDF", path: "/merge" }, { name: "Edit PDF", path: "/edit-pdf" }]
  },
  {
    name: "PDF/A (Archival PDF)",
    extension: ".pdf",
    icon: Lock,
    description: "PDF/A is a specialized version of PDF designed specifically for long-term digital preservation of documents. It is standardized as ISO 19005 and mandates that all fonts, images, and color profiles be embedded within the file. PDF/A prohibits features that could prevent reliable future rendering, including JavaScript, audio/video content, and external content references.",
    specs: "Standard: ISO 19005 | Variants: PDF/A-1 (based on PDF 1.4), PDF/A-2 (PDF 1.7), PDF/A-3 (allows attachments) | Required: All fonts embedded, no encryption",
    useCases: ["Government and legal document archiving", "Healthcare record preservation (HIPAA)", "Financial document retention (SOX compliance)", "Library and museum digital collections", "Court filing systems"],
    tools: [{ name: "Flatten PDF", path: "/flatten-pdf" }, { name: "Protect PDF", path: "/protect-pdf" }]
  },
  {
    name: "DOCX (Word Document)",
    extension: ".docx",
    icon: Type,
    description: "DOCX is Microsoft Word's default format since 2007, based on the Office Open XML (OOXML) standard. It uses ZIP compression containing XML files for content, styles, and metadata. DOCX is the most widely used word processing format and is fully supported by Microsoft Word, Google Docs, LibreOffice, and most modern word processors.",
    specs: "Standard: ECMA-376, ISO/IEC 29500 | Compression: ZIP | Structure: XML-based | Max file size: 512MB (Word limitation)",
    useCases: ["Business correspondence and reports", "Academic papers and manuscripts", "Collaborative document editing", "Template-based document creation", "Mail merge and automated documents"],
    tools: [{ name: "PDF to Word", path: "/pdf-to-word" }, { name: "Word to PDF", path: "/word-to-pdf" }]
  },
  {
    name: "XLSX (Excel Spreadsheet)",
    extension: ".xlsx",
    icon: Layers,
    description: "XLSX is Microsoft Excel's default format since 2007, also based on Office Open XML. It stores tabular data, formulas, charts, and formatting in a compressed XML package. XLSX is the standard for financial data, scientific data, and any structured numeric information that requires calculation capabilities.",
    specs: "Standard: ECMA-376, ISO/IEC 29500 | Max rows: 1,048,576 | Max columns: 16,384 | Max file size: Depends on content complexity",
    useCases: ["Financial reports and budgets", "Data analysis and visualization", "Inventory management", "Scientific research data", "Project tracking and scheduling"],
    tools: [{ name: "PDF to Excel", path: "/pdf-to-excel" }, { name: "Excel to PDF", path: "/excel-to-pdf" }]
  },
  {
    name: "PPTX (PowerPoint Presentation)",
    extension: ".pptx",
    icon: Layers,
    description: "PPTX is Microsoft PowerPoint's default format for presentations since 2007. It stores slides, animations, multimedia content, and speaker notes in an Office Open XML package. PPTX files can contain complex layouts with text, images, charts, audio, and video elements.",
    specs: "Standard: ECMA-376, ISO/IEC 29500 | Max slide size: 56\" x 56\" | Supports: Animations, transitions, embedded multimedia",
    useCases: ["Business presentations and pitch decks", "Educational lectures and courseware", "Conference talks and webinars", "Product demonstrations", "Training materials"],
    tools: [{ name: "PDF to PowerPoint", path: "/pdf-to-ppt" }, { name: "PowerPoint to PDF", path: "/ppt-to-pdf" }]
  },
  {
    name: "JPG/JPEG",
    extension: ".jpg, .jpeg",
    icon: Image,
    description: "JPEG (Joint Photographic Experts Group) is the most widely used image format, designed for compressing photographic images. It uses lossy compression that reduces file size by discarding image data that is less perceptible to the human eye. JPEG supports 24-bit color (16.7 million colors) and is universally compatible with all devices, browsers, and applications.",
    specs: "Standard: ITU-T T.81, ISO/IEC 10918-1 | Color depth: 24-bit (16.7M colors) | Compression: Lossy (adjustable quality) | No transparency support",
    useCases: ["Digital photography", "Web images and thumbnails", "Social media graphics", "Email attachments", "Document scanning"],
    tools: [{ name: "PDF to JPG", path: "/pdf-to-jpg" }, { name: "JPG to PDF", path: "/jpg-to-pdf" }, { name: "Image Compressor", path: "/image-compressor" }]
  },
  {
    name: "PNG (Portable Network Graphics)",
    extension: ".png",
    icon: Image,
    description: "PNG is a raster image format that uses lossless compression, meaning no image quality is lost during compression. It supports transparency (alpha channel), making it ideal for logos, icons, graphics, and images that need to be placed on different colored backgrounds. PNG produces larger files than JPEG for photographs but provides perfect quality for graphics.",
    specs: "Standard: ISO/IEC 15948:2004 | Color depth: Up to 48-bit | Compression: Lossless (DEFLATE) | Supports: Alpha transparency, interlacing",
    useCases: ["Logos and brand graphics", "Screenshots and UI elements", "Graphics requiring transparency", "Technical diagrams and illustrations", "High-quality image archives"],
    tools: [{ name: "PDF to PNG", path: "/pdf-to-png" }, { name: "PNG to PDF", path: "/png-to-pdf" }, { name: "Convert Image", path: "/convert-image" }]
  },
  {
    name: "WebP",
    extension: ".webp",
    icon: Image,
    description: "WebP is a modern image format developed by Google that provides superior compression for web images. It supports both lossy and lossless compression, transparency, and animation — combining the best features of JPEG, PNG, and GIF into a single format. WebP images are typically 25-35% smaller than equivalent JPEG files at the same visual quality.",
    specs: "Developer: Google (2010) | Compression: Lossy and lossless | Supports: Alpha transparency, animation | Max dimensions: 16383 x 16383 pixels",
    useCases: ["Website images for faster loading", "Core Web Vitals optimization", "Progressive web applications", "Mobile app assets", "E-commerce product images"],
    tools: [{ name: "WebP to PDF", path: "/webp-to-pdf" }, { name: "Convert Image", path: "/convert-image" }]
  },
  {
    name: "TIFF (Tagged Image File Format)",
    extension: ".tiff, .tif",
    icon: Image,
    description: "TIFF is a flexible, high-quality image format used primarily in professional photography, publishing, and medical imaging. It supports lossless compression, multiple pages (multi-page TIFF), and very high color depths including 16-bit per channel. TIFF files are typically much larger than JPEG or PNG but preserve maximum image quality.",
    specs: "Developed: 1986 (Aldus/Adobe) | Color depth: Up to 64-bit | Compression: Uncompressed, LZW, ZIP, JPEG | Supports: Multiple pages, layers, ICC profiles",
    useCases: ["Professional print production", "Medical imaging (DICOM conversion)", "Fax documents (Group 4 compression)", "GIS and satellite imagery", "Archival scanning at maximum quality"],
    tools: [{ name: "TIFF to PDF", path: "/tiff-to-pdf" }, { name: "Convert Image", path: "/convert-image" }]
  },
  {
    name: "GIF (Graphics Interchange Format)",
    extension: ".gif",
    icon: Image,
    description: "GIF is an image format that supports both static and animated images with a palette of up to 256 colors. While limited in color depth compared to JPEG and PNG, GIF's animation support has made it a cornerstone of internet culture. For static images, PNG has largely replaced GIF due to better compression and color support, but GIF remains the standard for simple animations.",
    specs: "Standard: GIF89a (1989) | Colors: 256 maximum (8-bit palette) | Compression: Lossless (LZW) | Supports: Animation, transparency (binary)",
    useCases: ["Simple animations and reaction images", "Loading indicators and UI animations", "Low-color graphics and icons", "Banner advertisements", "Social media animated content"],
    tools: [{ name: "GIF to PDF", path: "/gif-to-pdf" }, { name: "Convert Image", path: "/convert-image" }]
  }
];

const faqs = [
  { question: "Which format is best for sharing documents?", answer: "PDF is the best format for sharing finalized documents because it preserves formatting across all devices and platforms. For editable documents, DOCX is the standard for text, XLSX for spreadsheets, and PPTX for presentations." },
  { question: "What is the difference between lossy and lossless compression?", answer: "Lossy compression (JPEG, some WebP) reduces file size by discarding some image data, resulting in slight quality loss. Lossless compression (PNG, TIFF, some WebP) preserves all original data. Lossy is better for photos where small quality loss is acceptable; lossless is better for graphics, text, and images requiring exact reproduction." },
  { question: "Which image format is best for websites?", answer: "WebP offers the best compression for web images, providing 25-35% smaller files than JPEG at equal quality. If browser compatibility is a concern, JPEG is universally supported for photos, and PNG for graphics with transparency." },
  { question: "What is PDF/A and when should I use it?", answer: "PDF/A is an archival variant of PDF designed for long-term document preservation. Use it when documents must be readable decades from now, such as legal records, government archives, and compliance documents. It requires all fonts and resources to be embedded within the file." },
  { question: "Can I convert between all these formats?", answer: "Yes. PDF HUB 24 supports conversion between PDF and all listed document formats (DOCX, XLSX, PPTX) and image formats (JPG, PNG, WebP, TIFF, GIF). Use our dedicated conversion tools for the best quality results." },
  { question: "Which format supports transparency?", answer: "PNG and WebP support full alpha transparency (256 levels). GIF supports binary transparency (fully transparent or fully opaque). PDF supports transparency through layers and blending. JPEG and TIFF (standard) do not support transparency." }
];

export default function PdfFileFormatsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "PDF & Document File Formats Guide 2026 — 10 Formats Explained | PDF HUB 24",
    description: "Complete guide to PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, TIFF, GIF file formats. Specs, use cases, compression types, and conversion options explained.",
    keywords: "file formats guide, pdf format, docx format, image formats, document formats, file format comparison, pdf specifications",
    canonicalPath: "/pdf-file-formats-guide",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Ultimate Guide to PDF & Document File Formats 2026",
      "description": "Complete technical reference for 10 common document and image file formats",
      "url": `${BASE_URL}/pdf-file-formats-guide`,
      "datePublished": "2026-01-20",
      "dateModified": "2026-03-01",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }
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
            <span className="text-foreground font-medium">File Formats Guide</span>
          </nav>

          <div className="text-center mb-10">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">The Ultimate Guide to PDF & Document File Formats</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive technical reference covering 10 essential document and image file formats. Understand specifications, compression types, use cases, and how to convert between formats.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: March 2026 | 10 formats covered</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {formats.map(f => (
                <a key={f.extension} href={`#${f.name.split(' ')[0].toLowerCase()}`}>
                  <Button variant="outline" size="sm" data-testid={`link-nav-${f.name.split(' ')[0].toLowerCase()}`}>
                    {f.name.split(' (')[0]}
                  </Button>
                </a>
              ))}
            </div>
          </div>

          <div data-ad-slot="top-banner" className="w-full min-h-[90px] flex items-center justify-center my-6 bg-muted/30 rounded-md" data-testid="ad-slot-top">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <div className="space-y-10 mb-12">
            {formats.map((format, index) => (
              <section key={format.name} id={format.name.split(' ')[0].toLowerCase()}>
                <div className="flex items-center gap-3 mb-3">
                  <format.icon className="w-7 h-7 text-primary" />
                  <h2 className="text-2xl font-bold">{format.name}</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-3 font-mono">{format.extension}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{format.description}</p>

                <Card className="mb-4 overflow-visible">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-1">Technical Specifications</h3>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed">{format.specs}</p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Common Use Cases</h3>
                    <ul className="space-y-1.5">
                      {format.useCases.map((uc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Related Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {format.tools.map(tool => (
                        <Link key={tool.path} href={tool.path}>
                          <Button variant="outline" size="sm" data-testid={`link-tool-${tool.path.replace('/', '')}`}>
                            {tool.name}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {index === 4 && (
                  <div data-ad-slot="in-content" className="w-full min-h-[90px] flex items-center justify-center my-6 bg-muted/30 rounded-md" data-testid="ad-slot-mid">
                    <span className="text-xs text-muted-foreground">Advertisement</span>
                  </div>
                )}
              </section>
            ))}
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Format Comparison Table</h2>
            <Card className="overflow-visible">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[700px]" data-testid="table-format-comparison">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left p-3 font-semibold">Format</th>
                        <th className="text-center p-3 font-semibold">Type</th>
                        <th className="text-center p-3 font-semibold">Compression</th>
                        <th className="text-center p-3 font-semibold">Transparency</th>
                        <th className="text-center p-3 font-semibold">Animation</th>
                        <th className="text-center p-3 font-semibold">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["PDF", "Document", "Multiple", "Yes (layers)", "No", "Universal documents"],
                        ["PDF/A", "Document", "Multiple", "Limited", "No", "Archival"],
                        ["DOCX", "Document", "ZIP", "N/A", "No", "Editable text"],
                        ["XLSX", "Spreadsheet", "ZIP", "N/A", "No", "Data & formulas"],
                        ["PPTX", "Presentation", "ZIP", "N/A", "Yes", "Slides & visuals"],
                        ["JPEG", "Image", "Lossy", "No", "No", "Photos"],
                        ["PNG", "Image", "Lossless", "Yes (alpha)", "No", "Graphics & logos"],
                        ["WebP", "Image", "Both", "Yes (alpha)", "Yes", "Web images"],
                        ["TIFF", "Image", "Both", "No*", "No", "Print & medical"],
                        ["GIF", "Image", "Lossless", "Binary", "Yes", "Simple animations"]
                      ].map(([format, type, comp, trans, anim, best], i) => (
                        <tr key={i} className="border-b">
                          <td className="p-3 font-medium">{format}</td>
                          <td className="p-3 text-center">{type}</td>
                          <td className="p-3 text-center">{comp}</td>
                          <td className="p-3 text-center">{trans}</td>
                          <td className="p-3 text-center">{anim}</td>
                          <td className="p-3 text-center">{best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="mb-10 overflow-visible bg-muted/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-2">Cite This Guide</h2>
              <p className="text-sm text-muted-foreground mb-3">Reference this guide in your content using:</p>
              <code className="text-xs bg-background p-3 rounded-md block overflow-x-auto">
                PDF HUB 24. "Ultimate Guide to PDF & Document File Formats 2026." pdfhub24.com/pdf-file-formats-guide. Accessed {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
              </code>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-visible">
                  <button
                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    data-testid={`toggle-faq-${index}`}
                  >
                    <h3 className="font-semibold text-sm sm:text-base">{faq.question}</h3>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">Convert Between Any Format Free</h2>
            <p className="text-muted-foreground text-sm mb-4">Use our 43+ free tools to convert, compress, and edit any of these file formats.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/convert-pdf">
                <Button variant="outline" data-testid="link-convert-tools">
                  Conversion Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/all-tools">
                <Button data-testid="link-all-tools">
                  All 43+ Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
