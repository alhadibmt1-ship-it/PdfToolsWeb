import { useState } from "react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import { ChevronDown } from "lucide-react";
import siteLogo from "@assets/generated_images/logo-64.webp";

export default function Footer() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/30 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <img 
                src={siteLogo} 
                alt="PDF HUB 24" 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg"
                width="32"
                height="32"
              />
              <h3 className="font-bold text-base sm:text-lg tracking-tight">PDF HUB 24</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Professional PDF tools for all your document needs. Fast, secure, and completely free.
            </p>
          </div>
          
          {/* Quick Links - Collapsible on mobile */}
          <div>
            <button 
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              data-testid="footer-tools-toggle"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Quick Links</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isToolsOpen ? 'max-h-[500px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {PDF_TOOLS.slice(0, 10).map((tool) => (
                  <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                    <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-1">
                      {tool.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Company - Collapsible on mobile */}
          <div>
            <button 
              className="w-full flex items-center justify-between md:cursor-default"
              onClick={() => setIsCompanyOpen(!isCompanyOpen)}
              data-testid="footer-company-toggle"
            >
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground md:hidden transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:overflow-visible ${isCompanyOpen ? 'max-h-[200px] mt-3' : 'max-h-0 md:max-h-none md:mt-4'}`}>
              <div className="flex flex-col gap-1.5 sm:gap-2.5">
                <Link href="/about" data-testid="link-footer-about">
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-1">
                    About Us
                  </span>
                </Link>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-1">
                    Contact
                  </span>
                </Link>
                <Link href="/privacy" data-testid="link-footer-privacy">
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-1">
                    Privacy Policy
                  </span>
                </Link>
                <Link href="/terms" data-testid="link-footer-terms">
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-1">
                    Terms of Service
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="premium-divider mb-4 sm:mb-6" />
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
