import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";
import {
  FileText, Image, Lock, Edit3, ArrowRightLeft, Layers, Globe, BookOpen, Info,
} from "lucide-react";

const BASE_URL = "https://pdfhub24.com";

const toolSections = [
  {
    title: "Convert from PDF",
    icon: ArrowRightLeft,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    tools: [
      { path: "/pdf-to-jpg", label: "PDF to JPG" },
      { path: "/pdf-to-png", label: "PDF to PNG" },
      { path: "/pdf-to-word", label: "PDF to Word" },
      { path: "/pdf-to-excel", label: "PDF to Excel" },
      { path: "/pdf-to-ppt", label: "PDF to PowerPoint" },
      { path: "/pdf-to-pdfa", label: "PDF to PDF/A" },
      { path: "/extract-text", label: "Extract Text from PDF" },
      { path: "/extract-images", label: "Extract Images from PDF" },
    ],
  },
  {
    title: "Convert to PDF",
    icon: FileText,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    tools: [
      { path: "/jpg-to-pdf", label: "JPG to PDF" },
      { path: "/png-to-pdf", label: "PNG to PDF" },
      { path: "/word-to-pdf", label: "Word to PDF" },
      { path: "/excel-to-pdf", label: "Excel to PDF" },
      { path: "/ppt-to-pdf", label: "PowerPoint to PDF" },
      { path: "/html-to-pdf", label: "HTML to PDF" },
      { path: "/webp-to-pdf", label: "WebP to PDF" },
      { path: "/tiff-to-pdf", label: "TIFF to PDF" },
      { path: "/gif-to-pdf", label: "GIF to PDF" },
      { path: "/scan-to-pdf", label: "Scan to PDF" },
    ],
  },
  {
    title: "Edit PDF",
    icon: Edit3,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    tools: [
      { path: "/merge", label: "Merge PDF" },
      { path: "/split", label: "Split PDF" },
      { path: "/compress", label: "Compress PDF" },
      { path: "/rotate", label: "Rotate PDF" },
      { path: "/delete-pages", label: "Delete Pages" },
      { path: "/extract-pages", label: "Extract Pages" },
      { path: "/reorder-pages", label: "Reorder Pages" },
      { path: "/crop-pdf", label: "Crop PDF" },
      { path: "/resize-pdf", label: "Resize PDF" },
      { path: "/add-page-numbers", label: "Add Page Numbers" },
      { path: "/add-watermark", label: "Add Watermark" },
      { path: "/edit-pdf", label: "Edit PDF" },
      { path: "/annotate-pdf", label: "Annotate PDF" },
      { path: "/redact-pdf", label: "Redact PDF" },
      { path: "/flatten-pdf", label: "Flatten PDF" },
      { path: "/repair-pdf", label: "Repair PDF" },
      { path: "/batch-compress", label: "Batch Compress" },
      { path: "/translate-pdf", label: "Translate PDF" },
      { path: "/compare-pdf", label: "Compare PDF" },
    ],
  },
  {
    title: "Secure PDF",
    icon: Lock,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    tools: [
      { path: "/protect-pdf", label: "Protect PDF" },
      { path: "/unlock-pdf", label: "Unlock PDF" },
      { path: "/sign-pdf", label: "Sign PDF" },
      { path: "/ocr-pdf", label: "OCR PDF" },
      { path: "/grayscale-pdf", label: "Grayscale PDF" },
    ],
  },
  {
    title: "Image & Utility Tools",
    icon: Image,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    tools: [
      { path: "/image-compressor", label: "Compress Image" },
      { path: "/resize-image", label: "Resize Image" },
      { path: "/crop-image", label: "Crop Image" },
      { path: "/rotate-image", label: "Rotate Image" },
      { path: "/convert-image", label: "Convert Image" },
      { path: "/pdf-viewer", label: "PDF Viewer" },
    ],
  },
];

const blogPosts = [
  { path: "/blog/how-to-compress-pdf-for-email", label: "How to Compress PDF for Email" },
  { path: "/blog/merge-pdf-files-guide", label: "How to Merge PDF Files" },
  { path: "/blog/pdf-to-word-conversion-guide", label: "PDF to Word Conversion Guide" },
  { path: "/blog/best-pdf-tools-2025", label: "Best Free PDF Tools 2025" },
  { path: "/blog/how-to-protect-pdf-with-password", label: "How to Password Protect a PDF" },
  { path: "/blog/pdf-vs-word-which-format", label: "PDF vs Word: Which Format to Use?" },
  { path: "/blog/how-to-reduce-pdf-file-size", label: "How to Reduce PDF File Size" },
  { path: "/blog/split-pdf-pages-guide", label: "How to Split PDF Pages" },
  { path: "/blog/jpg-to-pdf-conversion-tips", label: "JPG to PDF Conversion Tips" },
  { path: "/blog/ocr-pdf-extract-text", label: "How OCR PDF Works" },
  { path: "/blog/add-page-numbers-to-pdf", label: "How to Add Page Numbers to PDF" },
  { path: "/blog/rotate-pdf-pages-guide", label: "How to Rotate PDF Pages" },
  { path: "/blog/watermark-pdf-guide", label: "Adding Watermarks to PDF" },
  { path: "/blog/sign-pdf-digitally-guide", label: "How to Sign PDF Digitally" },
  { path: "/blog/pdf-accessibility-guide", label: "PDF Accessibility Guide" },
  { path: "/blog/excel-to-pdf-guide", label: "Excel to PDF Conversion Guide" },
  { path: "/blog/word-to-pdf-guide", label: "Word to PDF: Complete Guide" },
  { path: "/blog/unlock-pdf-guide", label: "How to Unlock a PDF" },
  { path: "/blog/pdf-file-formats-explained", label: "PDF File Formats Explained" },
  { path: "/blog/compress-images-for-web", label: "Compress Images for Web" },
  { path: "/blog/convert-pdf-to-jpg-guide", label: "Convert PDF to JPG Guide" },
  { path: "/blog/batch-process-pdf-files", label: "Batch Processing PDF Files" },
  { path: "/blog/pdf-form-filling-guide", label: "PDF Form Filling Guide" },
  { path: "/blog/pdf-annotation-guide", label: "PDF Annotation Guide" },
  { path: "/blog/pdf-security-best-practices", label: "PDF Security Best Practices" },
];

const infoPages = [
  { path: "/about", label: "About PDF HUB 24" },
  { path: "/pricing", label: "Pricing — Free vs Pro" },
  { path: "/data-security", label: "Data Security" },
  { path: "/auto-delete", label: "Automatic File Deletion" },
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/dmca", label: "DMCA Policy" },
  { path: "/contact", label: "Contact Us" },
  { path: "/write-for-us", label: "Write for Us" },
  { path: "/embed", label: "Embed Widget" },
  { path: "/pdf-comparison-chart", label: "PDF Tools Comparison Chart" },
  { path: "/pdf-file-formats-guide", label: "PDF File Formats Guide" },
  { path: "/pdf-statistics", label: "PDF Statistics & Facts 2026" },
  { path: "/press", label: "Press Kit" },
  { path: "/best-free-tools", label: "Best Free PDF Tools" },
  { path: "/all-tools", label: "All Tools" },
];

const categories = [
  { path: "/convert-pdf", label: "Convert PDF Hub" },
  { path: "/compress-pdf-tools", label: "Compress PDF Tools Hub" },
  { path: "/edit-pdf-tools", label: "Edit PDF Tools Hub" },
  { path: "/secure-pdf", label: "Secure PDF Hub" },
  { path: "/image-tools", label: "Image Tools Hub" },
];

export default function HtmlSitemapPage() {
  useEffect(() => {
    document.title = "HTML Sitemap — All PDF Tools & Pages | PDF HUB 24";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content",
        "Complete HTML sitemap for PDF HUB 24. Find all 49 PDF tools, 25 blog articles, category hubs, and information pages in one place.");
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `${BASE_URL}/html-sitemap`);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "HTML Sitemap — All PDF Tools & Pages",
      "url": `${BASE_URL}/html-sitemap`,
      "description": "Complete directory of all pages on PDF HUB 24 including tools, blog, and info pages.",
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <ToolBreadcrumbs toolName="HTML Sitemap" category="Resources" />

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">HTML Sitemap</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete directory of all pages on PDF HUB 24 — {toolSections.reduce((s, sec) => s + sec.tools.length, 0)} tools,{" "}
              {blogPosts.length} blog articles, {categories.length} category hubs, and more.
            </p>
          </div>

          {/* Tool Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {toolSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title}>
                  <div className={`flex items-center gap-2 p-3 rounded-md mb-3 ${section.bg}`}>
                    <Icon size={18} className={section.color} />
                    <h2 className={`font-semibold text-base ${section.color}`}>{section.title}</h2>
                    <span className="ml-auto text-xs text-muted-foreground">{section.tools.length} tools</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-1">
                    {section.tools.map((tool) => (
                      <li key={tool.path}>
                        <Link
                          href={tool.path}
                          className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                          data-testid={`link-sitemap-${tool.path.slice(1)}`}
                        >
                          {tool.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Blog & Other Sections */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 p-3 rounded-md mb-3 bg-teal-50 dark:bg-teal-900/20">
                <BookOpen size={18} className="text-teal-600 dark:text-teal-400" />
                <h2 className="font-semibold text-base text-teal-600 dark:text-teal-400">Blog Articles</h2>
                <span className="ml-auto text-xs text-muted-foreground">{blogPosts.length} articles</span>
              </div>
              <ul className="grid grid-cols-2 gap-1">
                {blogPosts.map((post) => (
                  <li key={post.path}>
                    <Link
                      href={post.path}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                    >
                      {post.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              {/* Category Hubs */}
              <div>
                <div className="flex items-center gap-2 p-3 rounded-md mb-3 bg-gray-100 dark:bg-gray-800">
                  <Layers size={18} className="text-gray-600 dark:text-gray-400" />
                  <h2 className="font-semibold text-base">Category Hubs</h2>
                </div>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.path}>
                      <Link href={cat.path} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Pages */}
              <div>
                <div className="flex items-center gap-2 p-3 rounded-md mb-3 bg-gray-100 dark:bg-gray-800">
                  <Info size={18} className="text-gray-600 dark:text-gray-400" />
                  <h2 className="font-semibold text-base">Information Pages</h2>
                </div>
                <ul className="space-y-1">
                  {infoPages.map((page) => (
                    <li key={page.path}>
                      <Link href={page.path} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center gap-2 p-3 rounded-md mb-3 bg-gray-100 dark:bg-gray-800">
                  <Globe size={18} className="text-gray-600 dark:text-gray-400" />
                  <h2 className="font-semibold text-base">Languages</h2>
                </div>
                <ul className="space-y-1">
                  {[
                    { code: "es", label: "Español" }, { code: "ar", label: "العربية" },
                    { code: "hi", label: "हिंदी" }, { code: "fr", label: "Français" },
                    { code: "pt", label: "Português" }, { code: "de", label: "Deutsch" },
                    { code: "zh", label: "中文" }, { code: "ja", label: "日本語" },
                    { code: "id", label: "Bahasa Indonesia" }, { code: "ru", label: "Русский" },
                    { code: "it", label: "Italiano" }, { code: "ur", label: "اردو" },
                  ].map(({ code, label }) => (
                    <li key={code}>
                      <Link href={`/${code}`} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                        {label} (/{code})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
