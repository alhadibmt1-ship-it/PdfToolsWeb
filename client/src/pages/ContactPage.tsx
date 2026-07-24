import { ChevronLeft, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function ContactPage() {
  useSEO({
    title: "Contact PDF HUB 24 — Support & Feedback | PDF HUB 24",
    description: "Contact PDF HUB 24 for support, feedback, or questions about our free PDF tools. We respond to all inquiries. Get help with any PDF tool.",
    keywords: "contact pdf hub 24, pdfhub24 support, pdf hub 24 help, pdfhub24 feedback, contact pdfhub24, pdf tools support, pdf hub 24 contact us",
    canonicalPath: "/contact"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-contact-back">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-none">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions, feedback, or need help? We'd love to hear from you!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover-elevate" data-testid="card-support">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Need help with a tool or experiencing issues? Reach out to our support team.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feedback">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your thoughts and suggestions to help us improve our service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-general">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    Questions about our service or partnership opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8" data-testid="card-email">
            <CardContent className="p-8">
              <div className="text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll get back to you as soon as possible
                </p>
                <p className="text-xl font-semibold mb-4">support@pdfhub24.com</p>
                <a href="mailto:support@pdfhub24.com">
                  <Button variant="default" data-testid="button-contact-email-main">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is PDF HUB 24 really free?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! All our PDF tools are completely free to use with no hidden charges, 
                    subscriptions, or file size limits.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Are my files safe and private?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. All files are processed over secure HTTPS connections and are 
                    automatically deleted from our servers immediately after processing. We never 
                    store your files permanently.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
                  <p className="text-sm text-muted-foreground">
                    No registration required! You can use all our tools instantly without creating 
                    an account.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Which file formats do you support?</h3>
                  <p className="text-sm text-muted-foreground">
                    We support PDF, DOCX (Word), JPG, PNG, and text formats. Each tool specifies 
                    which formats it accepts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What is the file size limit?</h3>
                  <p className="text-sm text-muted-foreground">
                    We support files up to 50MB for most operations. Larger files may take longer 
                    to process but are generally supported.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              We're always here to help. Don't hesitate to reach out!
            </p>
            <a href="mailto:support@pdfhub24.com">
              <Button variant="default" size="lg" data-testid="button-contact-support">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </a>
          </section>
        </div>
      </main>

      <Footer hideCta />
    </div>
  );
}
