import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function AboutPage() {
  useSEO({
    title: "About Us - PDF HUB 24 | Free Online PDF Tools",
    description: "Learn about PDF HUB 24, your trusted source for free online PDF tools. Convert, merge, split, and manipulate PDF files with ease.",
    keywords: "about pdf hub 24, pdf tools, online pdf converter, pdf manipulation tools"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" data-testid="link-back-home">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6" data-testid="button-back">
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
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
              Our comprehensive suite of 10 PDF tools empowers you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Convert PDFs</strong> - Transform PDFs to Word, JPG, or vice versa with premium quality</li>
              <li><strong>Merge & Split</strong> - Combine multiple PDFs or extract specific pages effortlessly</li>
              <li><strong>Compress</strong> - Reduce PDF file sizes while maintaining quality</li>
              <li><strong>Manipulate</strong> - Rotate pages, delete unwanted content, and extract text</li>
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDF HUB 24 utilizes cutting-edge technology including Adobe PDF Services API for professional-grade 
              conversions, ensuring your documents maintain their formatting, colors, backgrounds, and layouts. 
              All processing happens on secure servers, and your files are never stored permanently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Visit our{" "}
              <Link href="/contact" className="text-primary hover:underline" data-testid="link-contact">
                Contact page
              </Link>{" "}
              to get in touch.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
