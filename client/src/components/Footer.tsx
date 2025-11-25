import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">PDF HUB 24</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional PDF tools for all your document needs. Fast, secure, and completely free.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {PDF_TOOLS.map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-footer-${tool.id}`}>
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" data-testid="link-footer-about">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  About Us
                </span>
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Contact
                </span>
              </Link>
              <Link href="/privacy" data-testid="link-footer-privacy">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms" data-testid="link-footer-terms">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDF HUB 24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
