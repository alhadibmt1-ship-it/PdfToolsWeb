import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2, Clock, Shield, CheckCircle, ArrowRight, HelpCircle,
  ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const faqs = [
  { question: "When exactly are my files deleted?", answer: "All uploaded files and processed outputs are permanently deleted within 1 hour of upload. The deletion process runs automatically and cannot be delayed or prevented." },
  { question: "Can I recover a deleted file?", answer: "No. Once deleted, files cannot be recovered by anyone — including our team. We do not maintain backups of user files. Always download your processed files before the deletion window expires." },
  { question: "Are temporary files also deleted?", answer: "Yes. All temporary files, processing artifacts, cached data, and intermediate outputs are deleted along with the primary files. Nothing related to your document remains on our servers." },
  { question: "Does deletion happen even if I don't download?", answer: "Yes. Files are deleted based on upload time, not download status. If you upload a file and do not download the result within the window, both files are still permanently deleted." },
  { question: "How do I know my files were actually deleted?", answer: "Our deletion process is automated and irreversible. Download links expire after the deletion window. We do not retain file access logs that could identify your specific documents." },
  { question: "Is the deletion secure (not just marked as deleted)?", answer: "Yes. Files are permanently removed from the filesystem, not merely marked as deleted. The storage space is overwritten, making recovery impossible even with forensic tools." }
];

export default function AutoDeletePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Auto-Delete — How We Remove Your Files | PDF HUB 24",
    description: "PDF HUB 24 automatically deletes all uploaded files within 1 hour. Learn how our automatic file deletion works to protect your privacy and security.",
    keywords: "auto delete files, file deletion, privacy, secure deletion, temporary files",
    canonicalPath: "/auto-delete",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Automatic File Deletion",
      "description": "How PDF HUB 24 automatically deletes uploaded files",
      "url": `${BASE_URL}/auto-delete`,
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
            <span className="text-foreground font-medium">Auto-Delete</span>
          </nav>

          <div className="text-center mb-10">
            <div className="relative inline-block mb-4">
              <Clock className="w-14 h-14 text-primary" />
              <Trash2 className="w-6 h-6 text-red-500 absolute -bottom-1 -right-1" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Automatic File Deletion</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every file you upload to PDF HUB 24 is automatically and permanently deleted within 1 hour. No exceptions, no extensions, no copies retained.
            </p>
          </div>

          <Card className="mb-10 border-green-500/20 bg-green-500/5 overflow-visible">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h2 className="font-bold text-lg mb-2">Your Privacy Is Our Priority</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We built auto-delete as a core feature, not an afterthought. From day one, PDF HUB 24 was designed so that your files exist on our servers only for as long as needed to process them. After that, they are gone permanently.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Auto-Delete Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">You Upload a File</h3>
                  <p className="text-muted-foreground text-sm">When you upload a PDF or image to any of our tools, the file is transferred over an encrypted connection and stored temporarily on our processing server. A deletion timer starts immediately.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">We Process Your File</h3>
                  <p className="text-muted-foreground text-sm">Your file is processed by the tool you selected — compression, conversion, merging, or any other operation. Processing typically completes in seconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">You Download the Result</h3>
                  <p className="text-muted-foreground text-sm">The processed file is available for download immediately. We recommend downloading right away, as the file will be deleted within the auto-delete window.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Files Are Permanently Deleted</h3>
                  <p className="text-muted-foreground text-sm">Within 1 hour of upload, both your original file and the processed output are permanently deleted. The storage space is overwritten. No recovery is possible.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Gets Deleted</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Your original uploaded file",
                "The processed/converted output file",
                "Any temporary files created during processing",
                "Processing logs and metadata",
                "Cached previews and thumbnails",
                "Download links (expired and invalidated)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-visible">
                  <button
                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    data-testid={`toggle-faq-${index}`}
                  >
                    <h3 className="font-semibold text-sm sm:text-base">{faq.question}</h3>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/data-security">
              <Button variant="outline" data-testid="link-data-security">
                <Shield className="w-4 h-4 mr-2" />
                Full Security Details
              </Button>
            </Link>
            <Link href="/all-tools">
              <Button data-testid="link-start-tools">
                Start Using Tools Securely
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
