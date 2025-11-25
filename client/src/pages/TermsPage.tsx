import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function TermsPage() {
  useSEO({
    title: "Terms of Service - PDF HUB 24",
    description: "Read PDF HUB 24's terms of service to understand the rules and guidelines for using our free online PDF tools.",
    keywords: "terms of service, terms and conditions, pdf hub 24 terms"
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
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: November 24, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By accessing and using PDF HUB 24, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF HUB 24 provides free online PDF manipulation tools including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>PDF to Word, JPG, and text conversions</li>
              <li>Word and JPG to PDF conversions</li>
              <li>PDF merging, splitting, and compression</li>
              <li>PDF rotation, page deletion, and text extraction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">When using our service, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use the service only for lawful purposes</li>
              <li>Not upload files containing illegal, harmful, or offensive content</li>
              <li>Not upload files that violate copyright or intellectual property rights</li>
              <li>Not attempt to compromise the security or integrity of our systems</li>
              <li>Not use automated tools to overload or abuse our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You retain all rights to files you upload to PDF HUB 24. By uploading files, you represent that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You own the files or have the right to process them</li>
              <li>Processing the files does not violate any third-party rights</li>
              <li>You are solely responsible for the content of your files</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF HUB 24 is provided "as is" without warranties of any kind. We strive to maintain 
              reliable service but do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Uninterrupted or error-free service</li>
              <li>Perfect conversion quality for all documents</li>
              <li>Specific file size limits or processing speeds</li>
              <li>Availability of all features at all times</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF HUB 24 shall not be liable for any direct, indirect, incidental, special, or 
              consequential damages resulting from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use or inability to use our service</li>
              <li>Loss of data or corrupted files</li>
              <li>Errors in file conversion or processing</li>
              <li>Unauthorized access to your files during transmission</li>
              <li>Third-party services we integrate with (e.g., Adobe PDF Services)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">File Processing and Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Files uploaded to PDF HUB 24 are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Processed temporarily in server memory</li>
              <li>Automatically deleted immediately after processing</li>
              <li>Not permanently stored or backed up</li>
              <li>Processed securely over HTTPS connections</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You are responsible for maintaining backups of your original files.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our PDF to Word conversion uses Adobe PDF Services API. When using this feature, you 
              acknowledge that files are transmitted to Adobe's servers and are subject to Adobe's 
              terms of service and privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modify or discontinue features without notice</li>
              <li>Impose file size or usage limits</li>
              <li>Update these terms at any time</li>
              <li>Refuse service to anyone for any reason</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You may not use PDF HUB 24 to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process files containing malware, viruses, or malicious code</li>
              <li>Attempt to reverse engineer or hack our service</li>
              <li>Resell or commercially redistribute our services</li>
              <li>Scrape or automatically download content from our site</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please visit our{" "}
              <Link href="/contact" className="text-primary hover:underline" data-testid="link-contact">
                Contact page
              </Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
