import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import { blogPosts } from "@/data/blogData";
import { programmaticPages } from "@/data/programmaticSeoData";
import { ChevronDown, Shield, Lock, Zap, Globe } from "lucide-react";
import { SiFacebook, SiYoutube } from "react-icons/si";
import siteLogo from "@assets/generated_images/logo-64.webp";

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
      className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5"
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
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const fromPdfTools = PDF_TOOLS.filter(tool => tool.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(tool => tool.category === "to-pdf");
  const editPdfTools = PDF_TOOLS.filter(tool => tool.category === "edit-pdf");
  const utilityTools = PDF_TOOLS.filter(tool => tool.category === "utility");

  const isFromPdfVisible = isDesktop || isFromPdfOpen;
  const isToPdfVisible = isDesktop || isToPdfOpen;
  const isEditPdfVisible = isDesktop || isEditPdfOpen;
  const isCompanyVisible = isDesktop || isCompanyOpen;
  const isHowToVisible = isDesktop || isHowToOpen;
  const isBlogVisible = isDesktop || isBlogOpen;

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/30 mt-12 sm:mt-16 md:mt-20">
      {/* Trust Indicators Bar */}
      <div className="border-b border-border/50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-sm">Secure & Private</div>
                <div className="text-xs text-muted-foreground">SSL Encrypted</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-sm">Auto-Delete</div>
                <div className="text-xs text-muted-foreground">Files Removed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-sm">Fast Processing</div>
                <div className="text-xs text-muted-foreground">Cloud Powered</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-sm">Works Everywhere</div>
                <div className="text-xs text-muted-foreground">All Devices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img 
                src={siteLogo} 
                alt="PDF HUB 24" 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg"
                width="36"
                height="36"
                loading="lazy"
              />
              <h3 className="font-bold text-lg tracking-tight">PDF HUB 24</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Your complete PDF toolkit. Convert, merge, split, compress, and edit PDF files online. 
              100% free, secure, and easy to use.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">43+</div>
                <div className="text-xs text-muted-foreground">Tools</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Free</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>
          </div>
          
          {/* Convert from PDF - Collapsible on mobile */}
          <div>
            <button 
              id="footer-from-pdf-button"
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => !isDesktop && setIsFromPdfOpen(!isFromPdfOpen)}
              data-testid="toggle-from-pdf"
              aria-expanded={isFromPdfVisible}
              aria-controls="footer-from-pdf-content"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Convert from PDF</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isFromPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <div 
              id="footer-from-pdf-content"
              role="region"
              aria-labelledby="footer-from-pdf-button"
              hidden={!isFromPdfVisible}
              className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isFromPdfVisible ? 'max-h-[500px] mt-3 md:mt-4' : 'max-h-0'}`}
            >
              <div className="flex flex-col gap-2">
                {fromPdfTools.map((tool) => (
                  <FooterLink 
                    key={tool.id} 
                    href={tool.path} 
                    testId={`link-footer-${tool.id}`}
                    isVisible={isFromPdfVisible}
                  >
                    {tool.title}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>
          
          {/* Convert to PDF - Collapsible on mobile */}
          <div>
            <button 
              id="footer-to-pdf-button"
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => !isDesktop && setIsToPdfOpen(!isToPdfOpen)}
              data-testid="toggle-to-pdf"
              aria-expanded={isToPdfVisible}
              aria-controls="footer-to-pdf-content"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Convert to PDF</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isToPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <div 
              id="footer-to-pdf-content"
              role="region"
              aria-labelledby="footer-to-pdf-button"
              hidden={!isToPdfVisible}
              className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isToPdfVisible ? 'max-h-[500px] mt-3 md:mt-4' : 'max-h-0'}`}
            >
              <div className="flex flex-col gap-2">
                {toPdfTools.map((tool) => (
                  <FooterLink 
                    key={tool.id} 
                    href={tool.path} 
                    testId={`link-footer-${tool.id}`}
                    isVisible={isToPdfVisible}
                  >
                    {tool.title}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>
          
          {/* Company & Edit PDF - Collapsible on mobile */}
          <div className="space-y-6">
            {/* Edit PDF Links */}
            <div>
              <button 
                id="footer-edit-pdf-button"
                className="w-full flex items-center justify-between md:cursor-default"
                onClick={() => !isDesktop && setIsEditPdfOpen(!isEditPdfOpen)}
                data-testid="toggle-edit-pdf"
                aria-expanded={isEditPdfVisible}
                aria-controls="footer-edit-pdf-content"
              >
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Edit PDF</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isEditPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <div 
                id="footer-edit-pdf-content"
                role="region"
                aria-labelledby="footer-edit-pdf-button"
                hidden={!isEditPdfVisible}
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isEditPdfVisible ? 'max-h-[600px] mt-3 md:mt-4' : 'max-h-0'}`}
              >
                <div className="flex flex-col gap-2">
                  {editPdfTools.slice(0, 10).map((tool) => (
                    <FooterLink 
                      key={tool.id} 
                      href={tool.path} 
                      testId={`link-footer-${tool.id}`}
                      isVisible={isEditPdfVisible}
                    >
                      {tool.title}
                    </FooterLink>
                  ))}
                  {editPdfTools.length > 10 && (
                    <a 
                      href="/all-tools" 
                      data-testid="link-footer-edit-pdf-view-all"
                      tabIndex={isEditPdfVisible ? 0 : -1}
                      aria-hidden={!isEditPdfVisible}
                      className="text-sm text-primary hover:text-primary/80 cursor-pointer transition-colors block py-0.5 font-medium"
                    >
                      View All Tools
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <button 
                id="footer-company-button"
                className="w-full flex items-center justify-between md:cursor-default"
                onClick={() => !isDesktop && setIsCompanyOpen(!isCompanyOpen)}
                data-testid="toggle-company"
                aria-expanded={isCompanyVisible}
                aria-controls="footer-company-content"
              >
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <div 
                id="footer-company-content"
                role="region"
                aria-labelledby="footer-company-button"
                hidden={!isCompanyVisible}
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isCompanyVisible ? 'max-h-[600px] mt-3 md:mt-4' : 'max-h-0'}`}
              >
                <div className="flex flex-col gap-2">
                  <FooterLink href="/about" testId="link-footer-about" isVisible={isCompanyVisible}>
                    About Us
                  </FooterLink>
                  <FooterLink href="/blog" testId="link-footer-blog" isVisible={isCompanyVisible}>
                    Blog
                  </FooterLink>
                  <FooterLink href="/contact" testId="link-footer-contact" isVisible={isCompanyVisible}>
                    Contact
                  </FooterLink>
                  <FooterLink href="/privacy" testId="link-footer-privacy" isVisible={isCompanyVisible}>
                    Privacy Policy
                  </FooterLink>
                  <FooterLink href="/terms" testId="link-footer-terms" isVisible={isCompanyVisible}>
                    Terms of Service
                  </FooterLink>
                  <FooterLink href="/dmca" testId="link-footer-dmca" isVisible={isCompanyVisible}>
                    DMCA Policy
                  </FooterLink>
                  <FooterLink href="/pdf-statistics" testId="link-footer-statistics" isVisible={isCompanyVisible}>
                    PDF Statistics 2026
                  </FooterLink>
                  <FooterLink href="/press" testId="link-footer-press" isVisible={isCompanyVisible}>
                    Press Kit
                  </FooterLink>
                  <FooterLink href="/all-tools" testId="link-footer-all-tools" isVisible={isCompanyVisible}>
                    All PDF Tools
                  </FooterLink>
                  <FooterLink href="/free-pdf-converter" testId="link-footer-converter" isVisible={isCompanyVisible}>
                    Free PDF Converter
                  </FooterLink>
                  <FooterLink href="/free-pdf-editor" testId="link-footer-editor" isVisible={isCompanyVisible}>
                    Free PDF Editor
                  </FooterLink>
                  <FooterLink href="/pricing" testId="link-footer-pricing" isVisible={isCompanyVisible}>
                    Pricing
                  </FooterLink>
                  <FooterLink href="/data-security" testId="link-footer-security" isVisible={isCompanyVisible}>
                    Data Security
                  </FooterLink>
                  <FooterLink href="/auto-delete" testId="link-footer-auto-delete" isVisible={isCompanyVisible}>
                    Auto-Delete Policy
                  </FooterLink>
                  <FooterLink href="/write-for-us" testId="link-footer-write" isVisible={isCompanyVisible}>
                    Write for Us
                  </FooterLink>
                  <FooterLink href="/embed" testId="link-footer-embed" isVisible={isCompanyVisible}>
                    Embed Our Tools
                  </FooterLink>
                  <FooterLink href="/pdf-comparison-chart" testId="link-footer-comparison" isVisible={isCompanyVisible}>
                    PDF Tools Comparison
                  </FooterLink>
                  <FooterLink href="/pdf-file-formats-guide" testId="link-footer-formats" isVisible={isCompanyVisible}>
                    File Formats Guide
                  </FooterLink>
                  <FooterLink href="/pdf-glossary" testId="link-footer-glossary" isVisible={isCompanyVisible}>
                    PDF Glossary A-Z
                  </FooterLink>
                  <FooterLink href="/best-free-tools" testId="link-footer-best-tools" isVisible={isCompanyVisible}>
                    Best Free PDF Tools
                  </FooterLink>
                  <FooterLink href="/html-sitemap" testId="link-footer-html-sitemap" isVisible={isCompanyVisible}>
                    HTML Sitemap
                  </FooterLink>
                  <FooterLink href="/sitemap.xml" testId="link-footer-sitemap" isVisible={isCompanyVisible}>
                    Sitemap
                  </FooterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Hubs - Prominent section */}
        <div className="mb-8 pt-6 border-t border-border/50">
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-4">Tool Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <a href="/convert-pdf" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-category-convert">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Convert PDF</span>
            </a>
            <a href="/compress-pdf-tools" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-category-compress">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Compress PDF</span>
            </a>
            <a href="/edit-pdf-tools" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-category-edit">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Edit PDF</span>
            </a>
            <a href="/secure-pdf" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-category-secure">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Secure PDF</span>
            </a>
            <a href="/image-tools" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-category-image">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Image Tools</span>
            </a>
          </div>
        </div>

        {/* Popular PDF Tools - Prominent section for internal linking */}
        <div className="mb-8 pt-6 border-t border-border/50">
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-4">Popular PDF Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <a href="/merge" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-popular-merge">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Merge PDF</span>
            </a>
            <a href="/compress" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-popular-compress">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Compress PDF</span>
            </a>
            <a href="/pdf-to-word" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-popular-pdf-to-word">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">PDF to Word</span>
            </a>
            <a href="/split" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-popular-split">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Split PDF</span>
            </a>
            <a href="/pdf-to-jpg" className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group" data-testid="link-popular-pdf-to-jpg">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">PDF to JPG</span>
            </a>
          </div>
        </div>

        {/* Utility & Image Tools - Horizontal row */}
        <div className="mb-8 pt-6 border-t border-border/50">
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-4">Utility & Image Tools</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {utilityTools.map((tool) => (
              <FooterLink 
                key={tool.id} 
                href={tool.path} 
                testId={`link-footer-${tool.id}`}
                isVisible={true}
              >
                {tool.title}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* How-To Guides - Collapsible on mobile */}
        <div className="mb-8 pt-6 border-t border-border/50">
          <button
            id="footer-howto-button"
            className="w-full flex items-center justify-between md:cursor-default"
            onClick={() => !isDesktop && setIsHowToOpen(!isHowToOpen)}
            data-testid="toggle-howto"
            aria-expanded={isHowToVisible}
            aria-controls="footer-howto-content"
          >
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">How-To Guides</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isHowToOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div
            id="footer-howto-content"
            role="region"
            aria-labelledby="footer-howto-button"
            hidden={!isHowToVisible}
            className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isHowToVisible ? 'max-h-[600px] mt-4' : 'max-h-0'}`}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {programmaticPages.map((page) => (
                <FooterLink 
                  key={page.slug} 
                  href={`/tools/${page.slug}`} 
                  testId={`link-footer-guide-${page.slug}`}
                  isVisible={isHowToVisible}
                >
                  {page.h1.replace(/ — .*$/, '').replace(/ Free$/, '')}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Articles - Collapsible on mobile */}
        <div className="mb-8 pt-6 border-t border-border/50">
          <button
            id="footer-blog-button"
            className="w-full flex items-center justify-between md:cursor-default"
            onClick={() => !isDesktop && setIsBlogOpen(!isBlogOpen)}
            data-testid="toggle-blog"
            aria-expanded={isBlogVisible}
            aria-controls="footer-blog-content"
          >
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Popular Articles</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div
            id="footer-blog-content"
            role="region"
            aria-labelledby="footer-blog-button"
            hidden={!isBlogVisible}
            className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isBlogVisible ? 'max-h-[600px] mt-4' : 'max-h-0'}`}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {blogPosts.map((post) => (
                <FooterLink 
                  key={post.slug} 
                  href={`/blog/${post.slug}`} 
                  testId={`link-footer-blog-${post.slug}`}
                  isVisible={isBlogVisible}
                >
                  {post.title}
                </FooterLink>
              ))}
              <a 
                href="/blog" 
                data-testid="link-footer-blog-view-all"
                className="text-sm text-primary hover:text-primary/80 cursor-pointer transition-colors block py-0.5 font-medium"
              >
                View All Articles
              </a>
            </div>
          </div>
        </div>
        
        <div className="mb-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">PDF Resources</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <a 
              href="https://en.wikipedia.org/wiki/PDF" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="link-resource-wikipedia"
            >
              PDF on Wikipedia
            </a>
            <a 
              href="https://www.iso.org/standard/75839.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="link-resource-iso"
            >
              ISO PDF Standard
            </a>
            <a 
              href="https://www.adobe.com/acrobat/about-adobe-pdf.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="link-resource-adobe"
            >
              Adobe PDF Guide
            </a>
          </div>
        </div>
        <div className="premium-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Built by{" "}
              <a href="/about" className="hover:text-primary transition-colors">Izhar Hassan</a>
              {" "}· Burewala, Pakistan
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61584792122187" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-social-facebook"
                className="text-muted-foreground hover:text-[#1877F2] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@pdfhub24?si=U08xguLjmmBVsbom" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-social-youtube"
                className="text-muted-foreground hover:text-[#FF0000] transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            </Link>
            <Link href="/terms">
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
