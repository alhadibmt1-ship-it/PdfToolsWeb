import { ChevronLeft, Heart, Target, Users, Shield, Zap, Globe, FileText, Star, CheckCircle, Mail } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

export default function AboutPage() {
  useSEO({
    title: "About PDF HUB 24 — Free Online PDF Tools Built for Everyone",
    description: "PDF HUB 24 was built because PDF tools should be free, fast, and simple. No subscriptions, no sign-ups. Learn our story and why millions trust us.",
    keywords: "about pdf hub 24, free pdf tools, pdf converter online, who made pdf hub 24",
    canonicalPath: "/about"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5 border-b">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-sm font-medium text-primary">
              <Heart className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              PDF Tools That Actually Work —<br className="hidden sm:block" /> No Tricks, No Fees
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              PDF HUB 24 started with a simple frustration: every time we needed to convert or edit a PDF, 
              we hit a paywall, a sign-up form, or a watermark. So we built the tool we always wished existed — 
              completely free, no strings attached.
            </p>
          </div>
        </section>

        {/* The Story */}
        <section className="py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why We Built This</h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Think about the last time you needed to merge a few PDF files before a job interview, 
                convert a scanned receipt for an expense claim, or compress a large document before 
                emailing it. Simple tasks — but somehow every tool you found either charged you, 
                limited your file size, or plastered a watermark across your document.
              </p>
              <p>
                That's the problem we set out to solve. PDF HUB 24 offers <strong className="text-foreground">43+ PDF and image tools</strong>, 
                all completely free. Students editing lecture notes, freelancers sending polished proposals, 
                small business owners handling invoices, HR teams processing applications — these are the 
                people we built this for.
              </p>
              <p>
                We're a small, dedicated team of developers who genuinely care about making everyday 
                document tasks easier. We keep the platform free by running unobtrusive ads — never 
                paywalls, never file limits, never forced sign-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Real Use Cases */}
        <section className="py-14 sm:py-20 bg-muted/30 border-y">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Who Uses PDF HUB 24?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real people solving real problems every day
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: "🎓",
                  title: "Students",
                  desc: "Combining assignment PDFs before submission, converting lecture slides to Word for editing, compressing large thesis files to meet university upload limits."
                },
                {
                  icon: "💼",
                  title: "Freelancers",
                  desc: "Merging portfolio pieces into one clean PDF, adding electronic signatures to contracts, converting client briefs from Word to PDF for professional delivery."
                },
                {
                  icon: "🏢",
                  title: "Office Workers",
                  desc: "Compressing scanned invoices for email, extracting tables from PDF reports into Excel, redacting sensitive information before sharing documents."
                },
                {
                  icon: "✈️",
                  title: "Visa Applicants",
                  desc: "Merging passport copies, bank statements, and supporting letters into a single PDF — properly formatted for embassy requirements."
                },
                {
                  icon: "🏥",
                  title: "Healthcare Staff",
                  desc: "Converting medical forms to editable Word format, protecting patient documents with passwords, splitting large records into individual files."
                },
                {
                  icon: "🛒",
                  title: "Small Business Owners",
                  desc: "Creating professional PDF quotes and invoices, adding watermarks to proprietary documents, compressing product catalogs for fast website loading."
                }
              ].map((item, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-5">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">What We Stand For</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-yellow-500" />,
                  title: "Always Free",
                  desc: "Every one of our 43+ tools is 100% free. No subscriptions, no hidden charges — ever."
                },
                {
                  icon: <Shield className="w-6 h-6 text-green-500" />,
                  title: "Private & Secure",
                  desc: "Your files are processed in memory and deleted immediately after. We never store or read your documents."
                },
                {
                  icon: <Globe className="w-6 h-6 text-blue-500" />,
                  title: "Works Everywhere",
                  desc: "No software to install. Works on any phone, tablet, or computer with a browser."
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-500" />,
                  title: "No Registration",
                  desc: "Pick a tool and use it immediately. We don't ask for your email address."
                }
              ].map((item, i) => (
                <Card key={i} className="border text-center">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Numbers */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-cyan-500/5 border-y">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { number: "43+", label: "Free Tools" },
                { number: "100%", label: "Free Forever" },
                { number: "0", label: "Files Stored" },
                { number: "24/7", label: "Available" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Files Are Safe With Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We know you're uploading sensitive documents — contracts, tax forms, medical records, 
              visa paperwork. That's why security isn't an afterthought; it's built into every part of how we work.
            </p>
            <div className="space-y-3">
              {[
                "Files are processed in isolated memory — never written to permanent disk storage",
                "All transfers are protected by 256-bit SSL encryption (the same standard banks use)",
                "Uploaded files are automatically deleted immediately after processing completes",
                "We never access, read, or analyze the contents of your documents",
                "GDPR compliant — your data is never sold or shared with third parties"
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-muted/30 border-t">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              No sign-up. No waiting. Pick a tool and start right now.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button size="lg" className="gap-2" data-testid="button-about-start">
                  <FileText className="w-4 h-4" />
                  Browse All 43+ Tools
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-about-contact">
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
