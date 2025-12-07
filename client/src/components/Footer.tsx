import { useState } from "react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import { ChevronDown, Shield, Lock, Zap, Globe } from "lucide-react";
import siteLogo from "@assets/generated_images/logo-64.webp";

export default function Footer() {
  const [isFromPdfOpen, setIsFromPdfOpen] = useState(false);
  const [isToPdfOpen, setIsToPdfOpen] = useState(false);
  const [isEditPdfOpen, setIsEditPdfOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const fromPdfTools = PDF_TOOLS.filter(tool => tool.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(tool => tool.category === "to-pdf");
  const editPdfTools = PDF_TOOLS.filter(tool => tool.category === "edit-pdf").slice(0, 8);

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/30 mt-12 sm:mt-16 md:mt-20">
      {/* Trust Indicators Bar */}
      <div className="border-b border-border/50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="font-semibold text-sm">Secure & Private</div>
                <div className="text-xs text-muted-foreground">SSL Encrypted</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Auto-Delete</div>
                <div className="text-xs text-muted-foreground">Files Removed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="font-semibold text-sm">Fast Processing</div>
                <div className="text-xs text-muted-foreground">Cloud Powered</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-purple-500" />
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
                <div className="text-xl font-bold text-primary">32+</div>
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
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => setIsFromPdfOpen(!isFromPdfOpen)}
              data-testid="button-footer-from-pdf-toggle"
              aria-expanded={isFromPdfOpen}
              aria-controls="footer-from-pdf-content"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Convert from PDF</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isFromPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <div 
              id="footer-from-pdf-content"
              className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isFromPdfOpen ? 'max-h-[500px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}
            >
              <div className="flex flex-col gap-2">
                {fromPdfTools.map((tool) => (
                  <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      {tool.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Convert to PDF - Collapsible on mobile */}
          <div>
            <button 
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => setIsToPdfOpen(!isToPdfOpen)}
              data-testid="button-footer-to-pdf-toggle"
              aria-expanded={isToPdfOpen}
              aria-controls="footer-to-pdf-content"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Convert to PDF</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isToPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <div 
              id="footer-to-pdf-content"
              className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isToPdfOpen ? 'max-h-[500px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}
            >
              <div className="flex flex-col gap-2">
                {toPdfTools.map((tool) => (
                  <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      {tool.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Company & Edit PDF - Collapsible on mobile */}
          <div className="space-y-6">
            {/* Edit PDF Links */}
            <div>
              <button 
                className="w-full flex items-center justify-between md:cursor-default"
                onClick={() => setIsEditPdfOpen(!isEditPdfOpen)}
                data-testid="button-footer-edit-pdf-toggle"
                aria-expanded={isEditPdfOpen}
                aria-controls="footer-edit-pdf-content"
              >
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Edit PDF</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isEditPdfOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <div 
                id="footer-edit-pdf-content"
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isEditPdfOpen ? 'max-h-[300px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}
              >
                <div className="flex flex-col gap-2">
                  {editPdfTools.map((tool) => (
                    <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                      <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                        {tool.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <button 
                className="w-full flex items-center justify-between md:cursor-default"
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                data-testid="button-footer-company-toggle"
                aria-expanded={isCompanyOpen}
                aria-controls="footer-company-content"
              >
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <div 
                id="footer-company-content"
                className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isCompanyOpen ? 'max-h-[200px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}
              >
                <div className="flex flex-col gap-2">
                  <Link href="/about" data-testid="link-footer-about">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      About Us
                    </span>
                  </Link>
                  <Link href="/contact" data-testid="link-footer-contact">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      Contact
                    </span>
                  </Link>
                  <Link href="/privacy" data-testid="link-footer-privacy">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      Privacy Policy
                    </span>
                  </Link>
                  <Link href="/terms" data-testid="link-footer-terms">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5">
                      Terms of Service
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="premium-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
          </p>
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
