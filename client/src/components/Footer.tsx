import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
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
  const editPdfTools = PDF_TOOLS.filter(tool => tool.category === "edit-pdf").slice(0, 8);

  const isFromPdfVisible = isDesktop || isFromPdfOpen;
  const isToPdfVisible = isDesktop || isToPdfOpen;
  const isEditPdfVisible = isDesktop || isEditPdfOpen;
  const isCompanyVisible = isDesktop || isCompanyOpen;

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
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isEditPdfVisible ? 'max-h-[300px] mt-3 md:mt-4' : 'max-h-0'}`}
              >
                <div className="flex flex-col gap-2">
                  {editPdfTools.map((tool) => (
                    <FooterLink 
                      key={tool.id} 
                      href={tool.path} 
                      testId={`link-footer-${tool.id}`}
                      isVisible={isEditPdfVisible}
                    >
                      {tool.title}
                    </FooterLink>
                  ))}
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
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isCompanyVisible ? 'max-h-[200px] mt-3 md:mt-4' : 'max-h-0'}`}
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
                </div>
              </div>
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
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
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
