import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import { ChevronDown, Shield, Lock, Zap, Globe, ArrowRight, Star } from "lucide-react";
import { SiFacebook, SiYoutube, SiX } from "react-icons/si";
import siteLogo from "@assets/generated_images/logo-64.webp";

const FOOTER_BLOG_POSTS = [
  { slug: "how-to-compress-pdf-for-email", title: "How to Compress PDF for Email" },
  { slug: "convert-pdf-to-word-without-losing-formatting", title: "Convert PDF to Word Without Losing Formatting" },
  { slug: "merge-pdf-files-guide", title: "How to Merge PDF Files Online" },
  { slug: "protect-pdf-with-password", title: "How to Password Protect a PDF" },
  { slug: "pdf-tools-for-students", title: "Essential PDF Tools for Students" },
  { slug: "how-to-split-pdf-pages", title: "How to Split PDF Pages" },
  { slug: "add-page-numbers-to-pdf", title: "How to Add Page Numbers to PDF" },
  { slug: "convert-images-to-pdf", title: "How to Convert Images to PDF" },
  { slug: "ocr-scanned-pdf-to-text", title: "OCR: Scanned PDF to Searchable Text" },
  { slug: "sign-pdf-electronically", title: "How to Sign a PDF Electronically" },
];

const FOOTER_HOWTO_GUIDES = [
  { slug: "compress-pdf-under-100kb", label: "Compress PDF to Under 100KB" },
  { slug: "merge-pdf-for-visa-application", label: "Merge PDF for Visa Application" },
  { slug: "convert-scanned-pdf-to-word-editable", label: "Scanned PDF to Editable Word" },
  { slug: "make-pdf-smaller-for-email", label: "Make PDF Smaller for Email" },
  { slug: "pdf-to-jpg-high-quality", label: "PDF to High Quality JPG" },
  { slug: "add-signature-to-pdf-free", label: "Add Signature to PDF Free" },
  { slug: "compress-pdf-without-losing-quality", label: "Compress PDF Without Losing Quality" },
  { slug: "split-pdf-by-pages", label: "Split PDF by Page Number" },
  { slug: "protect-pdf-with-password-free", label: "Protect PDF with Password" },
  { slug: "add-page-numbers-to-pdf-free", label: "Add Page Numbers to PDF" },
];

interface FooterLinkProps {
  href: string;
  testId: string;
  children: React.ReactNode;
  isVisible: boolean;
}

function FooterLink({ href, testId, children, isVisible }: FooterLinkProps) {
  return (
    <a
      href={href}
      data-testid={testId}
      tabIndex={isVisible ? 0 : -1}
      className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors block py-0.5 hover:translate-x-0.5 transition-transform duration-150"
      aria-hidden={!isVisible}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [isFromPdfOpen, setIsFromPdfOpen] = useState(false);
  const [isToPdfOpen, setIsToPdfOpen] = useState(false);
  const [isEditPdfOpen, setIsEditPdfOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const fromPdfTools = PDF_TOOLS.filter(t => t.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(t => t.category === "to-pdf");
  const editPdfTools = PDF_TOOLS.filter(t => t.category === "edit-pdf");
  const utilityTools = PDF_TOOLS.filter(t => t.category === "utility");

  const isFromPdfVisible = isDesktop || isFromPdfOpen;
  const isToPdfVisible = isDesktop || isToPdfOpen;
  const isEditPdfVisible = isDesktop || isEditPdfOpen;
  const isCompanyVisible = isDesktop || isCompanyOpen;
  const isHowToVisible = isDesktop || isHowToOpen;
  const isBlogVisible = isDesktop || isBlogOpen;

  return (
    <footer className="mt-12 sm:mt-16 md:mt-20">

      {/* ── CTA Banner ───────────────────────────── */}
      <div className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-3">Free Forever</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            49+ Free PDF Tools — No Registration
          </h2>
          <p className="opacity-85 mb-6 max-w-xl mx-auto">
            Convert, merge, compress, edit and sign PDFs instantly. Works on all devices.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
          >
            Start Using Free Tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ── Trust Bar ────────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
            {[
              { icon: Shield, color: "text-green-400", label: "SSL Encrypted", sub: "Secure & Private" },
              { icon: Lock, color: "text-blue-400", label: "Auto-Delete", sub: "Files Removed Instantly" },
              { icon: Zap, color: "text-yellow-400", label: "Cloud Powered", sub: "Lightning Fast" },
              { icon: Globe, color: "text-purple-400", label: "All Devices", sub: "No Install Needed" },
            ].map(({ icon: Icon, color, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-slate-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ─────────────────────── */}
      <div className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-12">

            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={siteLogo} alt="PDF HUB 24" className="w-9 h-9 rounded-xl" width="36" height="36" loading="lazy" />
                <span className="text-white font-bold text-xl tracking-tight">PDF HUB 24</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                Your complete free PDF toolkit. Convert, merge, split, compress, sign and edit PDFs online. No registration, no watermarks, no limits.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-5 mb-6">
                {[["49+", "Tools"], ["100%", "Free"], ["24/7", "Online"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="text-xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= 5 ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`} />
                  ))}
                </div>
                <span className="text-sm text-slate-400">4.9 · Trusted by users worldwide</span>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/profile.php?id=61584792122187" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#1877F2] flex items-center justify-center transition-colors">
                  <SiFacebook className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
                <a href="https://youtube.com/@pdfhub24" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#FF0000] flex items-center justify-center transition-colors">
                  <SiYoutube className="w-4 h-4 text-slate-400" />
                </a>
                <a href="https://twitter.com/hassanizhar419" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <SiX className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Convert from PDF */}
            <div>
              <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsFromPdfOpen(!isFromPdfOpen)} aria-expanded={isFromPdfVisible}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Convert from PDF</h3>
                <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isFromPdfOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isFromPdfVisible ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="flex flex-col gap-1.5">
                  {fromPdfTools.map(tool => (
                    <FooterLink key={tool.id} href={tool.path} testId={`link-footer-${tool.id}`} isVisible={isFromPdfVisible}>
                      {tool.title}
                    </FooterLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Convert to PDF */}
            <div>
              <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsToPdfOpen(!isToPdfOpen)} aria-expanded={isToPdfVisible}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Convert to PDF</h3>
                <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isToPdfOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isToPdfVisible ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="flex flex-col gap-1.5">
                  {toPdfTools.map(tool => (
                    <FooterLink key={tool.id} href={tool.path} testId={`link-footer-${tool.id}`} isVisible={isToPdfVisible}>
                      {tool.title}
                    </FooterLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Edit PDF + Company */}
            <div className="space-y-8">
              <div>
                <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsEditPdfOpen(!isEditPdfOpen)} aria-expanded={isEditPdfVisible}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Edit PDF</h3>
                  <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isEditPdfOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isEditPdfVisible ? "max-h-[500px]" : "max-h-0"}`}>
                  <div className="flex flex-col gap-1.5">
                    {editPdfTools.slice(0, 10).map(tool => (
                      <FooterLink key={tool.id} href={tool.path} testId={`link-footer-${tool.id}`} isVisible={isEditPdfVisible}>
                        {tool.title}
                      </FooterLink>
                    ))}
                    {editPdfTools.length > 10 && (
                      <a href="/all-tools" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium py-0.5">
                        View All Tools →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsCompanyOpen(!isCompanyOpen)} aria-expanded={isCompanyVisible}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Company</h3>
                  <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isCompanyOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isCompanyVisible ? "max-h-[600px]" : "max-h-0"}`}>
                  <div className="flex flex-col gap-1.5">
                    {[
                      ["/about", "About Us"], ["/blog", "Blog"], ["/contact", "Contact"],
                      ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"],
                      ["/data-security", "Data Security"], ["/pricing", "Pricing"],
                      ["/write-for-us", "Write for Us"], ["/all-tools", "All Tools"],
                      ["/pdf-glossary", "PDF Glossary"], ["/sitemap", "Site Map"],
                    ].map(([href, label]) => (
                      <FooterLink key={href} href={href} testId={`link-footer-${href.replace("/","")}`} isVisible={isCompanyVisible}>
                        {label}
                      </FooterLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tools Grid */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Popular Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {[
                ["/merge-pdf", "Merge PDF"],
                ["/compress-pdf", "Compress PDF"],
                ["/pdf-to-word", "PDF to Word"],
                ["/split-pdf", "Split PDF"],
                ["/pdf-to-jpg", "PDF to JPG"],
                ["/sign-pdf", "Sign PDF"],
                ["/protect-pdf", "Protect PDF"],
                ["/ocr-pdf", "OCR PDF"],
                ["/edit-pdf", "Edit PDF"],
                ["/word-to-pdf", "Word to PDF"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-sm text-slate-400 hover:text-primary transition-colors py-1 hover:translate-x-0.5 transition-transform duration-150">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Utility Tools */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Utility & Image Tools</h3>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {utilityTools.map(tool => (
                <FooterLink key={tool.id} href={tool.path} testId={`link-footer-util-${tool.id}`} isVisible={true}>
                  {tool.title}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* How-To Guides */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsHowToOpen(!isHowToOpen)} aria-expanded={isHowToVisible}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">How-To Guides</h3>
              <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isHowToOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isHowToVisible ? "max-h-[400px]" : "max-h-0"}`}>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {FOOTER_HOWTO_GUIDES.map(page => (
                  <FooterLink key={page.slug} href={`/tools/${page.slug}`} testId={`link-footer-guide-${page.slug}`} isVisible={isHowToVisible}>
                    {page.label}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Articles */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <button className="w-full flex items-center justify-between md:cursor-default mb-4" onClick={() => !isDesktop && setIsBlogOpen(!isBlogOpen)} aria-expanded={isBlogVisible}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Popular Articles</h3>
              <ChevronDown className={`w-4 h-4 text-slate-600 md:hidden transition-transform ${isBlogOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden md:overflow-visible transition-all duration-300 ${isBlogVisible ? "max-h-[400px]" : "max-h-0"}`}>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {FOOTER_BLOG_POSTS.map(post => (
                  <FooterLink key={post.slug} href={`/blog/${post.slug}`} testId={`link-footer-blog-${post.slug}`} isVisible={isBlogVisible}>
                    {post.title}
                  </FooterLink>
                ))}
                <a href="/blog" className="text-sm text-primary hover:text-primary/80 transition-colors py-0.5 font-medium">
                  View All Articles →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
              </p>
              <span className="hidden sm:inline text-slate-700">·</span>
              <p className="text-xs text-slate-600">
                Built by{" "}
                <a href="/about" className="hover:text-primary transition-colors text-slate-500">Izhar Hassan</a>
                {" "}· Burewala, Pakistan
              </p>
            </div>
            <div className="flex items-center gap-5 text-sm">
              {["/privacy", "/terms", "/contact"].map((href) => (
                <a key={href} href={href} className="text-slate-500 hover:text-primary transition-colors capitalize">
                  {href.replace("/", "")}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
