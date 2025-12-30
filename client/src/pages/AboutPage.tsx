import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function AboutPage() {
  useSEO({
    title: "About Us - PDF HUB 24 | Free Online PDF Tools",
    description: "Learn about PDF HUB 24, your trusted source for free online PDF tools. Convert, merge, split, and manipulate PDF files with ease.",
    keywords: "about pdf hub 24, pdf tools, online pdf converter, pdf manipulation tools",
    canonicalPath: "/about"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-about-back">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">About PDF HUB 24</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDF HUB 24 is dedicated to providing fast, secure, and completely free PDF manipulation tools 
              to users worldwide. We believe that essential document tools should be accessible to everyone, 
              without hidden fees, registration requirements, or file size limitations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Our comprehensive suite of 43+ free PDF tools empowers you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Convert From PDF</strong> - Transform PDFs to Word, JPG, PNG, Excel, PowerPoint with premium quality</li>
              <li><strong>Convert To PDF</strong> - Create PDFs from Word, images, Excel, PowerPoint, HTML, and more</li>
              <li><strong>Edit & Organize</strong> - Merge, split, compress, rotate, reorder, crop, resize, and annotate PDFs</li>
              <li><strong>Secure & Protect</strong> - Password protect, unlock, flatten, redact sensitive content, and add watermarks</li>
              <li><strong>OCR & Extract</strong> - Extract text from scanned documents with OCR, extract images and content</li>
              <li><strong>Image Tools</strong> - Compress, resize, crop, rotate, and convert images between formats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose PDF HUB 24?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no hidden charges. All tools are completely free to use.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are processed securely and deleted immediately after conversion.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">No Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Start using our tools instantly without creating an account.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Adobe-powered PDF to Word conversion with full layout preservation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              PDF HUB 24 utilizes cutting-edge technology including Adobe PDF Services API and CloudConvert for professional-grade 
              conversions, ensuring your documents maintain their formatting, colors, backgrounds, and layouts. 
              All processing happens on secure servers, and your files are never stored permanently.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our infrastructure is built with security-first principles: 256-bit SSL encryption for all transfers, 
              automatic file deletion after processing, isolated processing environments, and GDPR-compliant data handling.
              We never access the contents of your documents or share data with third parties beyond what's necessary for processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Trust & Compliance</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  We follow European data protection regulations. Your files are processed in memory and never permanently stored.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">SSL Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All data transfers are protected with 256-bit SSL encryption, the same standard used by banks.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Auto File Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  Uploaded files are automatically deleted within 1 hour of processing completion.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">No Data Mining</h3>
                <p className="text-sm text-muted-foreground">
                  We never read, analyze, or mine your documents. Your content remains completely private.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button variant="default" data-testid="button-about-contact">
                Visit Contact Page
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
