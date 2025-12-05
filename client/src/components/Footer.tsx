import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import siteLogo from "@assets/generated_images/logo-64.webp";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img 
                src={siteLogo} 
                alt="PDF HUB 24" 
                className="w-8 h-8 rounded-lg"
                width="32"
                height="32"
              />
              <h3 className="font-bold text-lg tracking-tight">PDF HUB 24</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional PDF tools for all your document needs. Fast, secure, and completely free.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {PDF_TOOLS.slice(0, 10).map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Company</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" data-testid="link-footer-about">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  About Us
                </span>
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  Contact
                </span>
              </Link>
              <Link href="/privacy" data-testid="link-footer-privacy">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms" data-testid="link-footer-terms">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="premium-divider mb-6" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
