import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield, Lock, Trash2, Globe, Server, CheckCircle, ArrowRight,
  Eye, FileX, Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const securityFeatures = [
  { icon: Lock, title: "SSL/TLS Encryption", description: "All file transfers between your device and our servers use 256-bit SSL/TLS encryption, the same standard used by banks and financial institutions. Your files are encrypted in transit and cannot be intercepted." },
  { icon: Trash2, title: "Automatic File Deletion", description: "All uploaded files are automatically and permanently deleted from our servers within 1 hour of processing. No copies are retained, no backups are made, and no file content is stored long-term." },
  { icon: Eye, title: "Zero Access Policy", description: "Our team never accesses, views, reads, or analyzes the content of your uploaded files. Processing is fully automated with no human involvement in file handling." },
  { icon: Server, title: "Secure Processing Servers", description: "File processing happens on isolated, secure servers with strict access controls. Each processing session is sandboxed to prevent any interaction between different users' files." },
  { icon: FileX, title: "No Data Mining", description: "We do not extract, index, or mine any data from your documents. File content is never used for training AI models, analytics, advertising, or any purpose other than the specific tool operation you requested." },
  { icon: Globe, title: "GDPR Compliant", description: "Our data handling practices comply with the European Union's General Data Protection Regulation (GDPR). We process only the minimum data necessary and respect your rights as a data subject." }
];

export default function DataSecurityPage() {
  useSEO({
    title: "Data Security & Privacy — How We Protect Your Files | PDF HUB 24",
    description: "Learn how PDF HUB 24 protects your files. SSL encryption, automatic deletion within 1 hour, zero-access policy, GDPR compliance. Your documents are safe.",
    keywords: "data security, file privacy, PDF security, GDPR, file encryption, auto delete",
    canonicalPath: "/data-security",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Data Security & Privacy",
      "description": "How PDF HUB 24 protects your uploaded files and personal data",
      "url": `${BASE_URL}/data-security`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Data Security</span>
          </nav>

          <div className="text-center mb-10">
            <Shield className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Your Files Are Safe with Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take the security and privacy of your documents seriously. Every file you upload is processed securely and deleted automatically. Here is exactly how we protect your data.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {securityFeatures.map((feature, i) => (
              <Card key={i} className="overflow-visible">
                <CardContent className="p-5">
                  <feature.icon className="w-8 h-8 text-primary mb-3" />
                  <h2 className="font-semibold text-base mb-2">{feature.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">File Processing Lifecycle</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Upload (Encrypted Transfer)</h3>
                  <p className="text-sm text-muted-foreground">Your file is transferred over an encrypted SSL/TLS connection. During transfer, the data is protected from interception or tampering.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Processing (Isolated Environment)</h3>
                  <p className="text-sm text-muted-foreground">Your file is processed in an isolated server environment. No other user's files can interact with yours. Processing is fully automated with zero human access.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Download (Secure Delivery)</h3>
                  <p className="text-sm text-muted-foreground">The processed file is delivered to you over an encrypted connection. Only you have access to the download link.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Deletion (Permanent Removal)</h3>
                  <p className="text-sm text-muted-foreground">Within 1 hour, both your original upload and the processed output are permanently deleted from our servers. No copies, no backups, no traces.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What We Do NOT Do</h2>
            <Card className="overflow-visible">
              <CardContent className="p-5">
                <ul className="space-y-3">
                  {[
                    "We do NOT read, view, or analyze the content of your files",
                    "We do NOT store your files beyond the 1-hour processing window",
                    "We do NOT share your files or data with any third party",
                    "We do NOT use your document content for AI training or analytics",
                    "We do NOT require personal information or account creation",
                    "We do NOT track which documents you process",
                    "We do NOT create backups or copies of your uploaded files",
                    "We do NOT sell, rent, or monetize your data in any way"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Compliance & Standards</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">GDPR (EU)</h3>
                  <p className="text-sm text-muted-foreground">We comply with the General Data Protection Regulation, including data minimization, purpose limitation, and the right to erasure.</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">CCPA (California)</h3>
                  <p className="text-sm text-muted-foreground">We honor California Consumer Privacy Act rights including the right to know, delete, and opt-out of data sales (we do not sell data).</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">SSL/TLS Encryption</h3>
                  <p className="text-sm text-muted-foreground">256-bit SSL/TLS encryption protects all data in transit between your browser and our servers.</p>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">ISO 27001 Aligned</h3>
                  <p className="text-sm text-muted-foreground">Our security practices are aligned with ISO 27001 information security management standards.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auto-delete">
              <Button variant="outline" data-testid="link-auto-delete">
                <Clock className="w-4 h-4 mr-2" />
                Learn About Auto-Delete
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" data-testid="link-privacy">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Button>
            </Link>
            <Link href="/all-tools">
              <Button data-testid="link-all-tools">
                Start Using Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
