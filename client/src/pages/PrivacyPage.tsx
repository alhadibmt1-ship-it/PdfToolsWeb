import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy — Your Files Stay Private | PDF HUB 24",
    description: "PDF HUB 24 privacy policy. Your files are processed securely and automatically deleted. We never store or share your documents.",
    keywords: "pdf hub 24 privacy policy, pdfhub24 privacy, pdf tools privacy, secure pdf processing, pdf hub 24 data privacy, pdfhub24 file security",
    canonicalPath: "/privacy"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-privacy-back">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: November 24, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At PDF HUB 24, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information when you use our online PDF tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">Files You Upload</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you use our PDF tools, you upload files to our servers for processing. These files are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Processed temporarily in server memory</li>
              <li>Automatically deleted immediately after conversion</li>
              <li>Never stored permanently on our servers</li>
              <li>Not shared with third parties</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Usage Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may collect anonymous usage statistics such as which tools are most popular, 
              to help improve our service. This data does not include personal information.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              We use minimal cookies for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Remembering your theme preference (dark/light mode)</li>
              <li>Storing your default compression settings</li>
              <li>These are stored locally in your browser and never sent to our servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To process your PDF files and provide conversions</li>
              <li>To improve our service based on anonymous usage patterns</li>
              <li>To maintain and troubleshoot technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your files during processing:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>HTTPS encryption for all data transfers</li>
              <li>Secure server processing with automatic file deletion</li>
              <li>No permanent file storage</li>
              <li>Regular security updates and monitoring</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use Adobe PDF Services API for premium PDF to Word conversions. When using this tool, 
              files are securely transmitted to Adobe's servers for processing and are subject to 
              Adobe's privacy policies. Files are automatically deleted after processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">GDPR Compliance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PDF HUB 24 is committed to GDPR (General Data Protection Regulation) compliance for all users,
              including those in the European Economic Area. Our practices include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Minimal data collection — we only process what's necessary for the service</li>
              <li>No permanent storage of uploaded files</li>
              <li>Automatic deletion of all processed content within 1 hour</li>
              <li>Transparent data handling with no hidden tracking</li>
              <li>No sale or sharing of user data with third parties for marketing purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since we don't collect or store personal information or files permanently, there is no 
              personal data to access, modify, or delete. Your uploaded files are automatically removed 
              from our servers within 1 hour of processing. Under GDPR, you have the right to request 
              information about any data we may hold — though in practice, we hold none after processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not directed to children under 13 years of age. We do not knowingly 
              collect information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this 
              page with an updated "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please get in touch.
            </p>
            <Link href="/contact">
              <Button variant="default" data-testid="button-privacy-contact">
                Contact Us
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer hideCta />
    </div>
  );
}
