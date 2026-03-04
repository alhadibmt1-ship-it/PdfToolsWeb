import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PenTool, CheckCircle, FileText, Users, ArrowRight, Mail,
  BookOpen, Target, Shield
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const topics = [
  "PDF productivity tips and workflows for professionals",
  "How-to guides for specific PDF tasks (conversion, compression, editing)",
  "Document management best practices for businesses",
  "Digital signature and e-signing guides",
  "PDF security, encryption, and compliance tutorials",
  "Image optimization and conversion tutorials",
  "Remote work document collaboration tips",
  "Paperless office transition guides",
  "Industry-specific PDF workflows (legal, healthcare, education, finance)",
  "Comparison articles: free tools vs paid alternatives"
];

const guidelines = [
  { title: "Original Content Only", description: "All submissions must be 100% original, not published elsewhere. We run plagiarism checks on all content." },
  { title: "Minimum 1,500 Words", description: "Articles should be comprehensive and provide genuine value. Aim for 1,500-3,000 words with actionable advice." },
  { title: "SEO Optimized", description: "Include a focus keyword, use H2/H3 subheadings, write a compelling meta description, and use natural keyword placement." },
  { title: "Include Visuals", description: "Add screenshots, diagrams, or step-by-step images where appropriate. We can help create custom graphics." },
  { title: "Actionable & Practical", description: "Every article should give readers something they can immediately apply. Include step-by-step instructions where relevant." },
  { title: "Link Naturally", description: "You may include 1-2 links to your own site if contextually relevant and non-promotional. We add internal links to our tools." }
];

export default function WriteForUsPage() {
  useSEO({
    title: "Write for Us — Contribute to PDF HUB 24 Blog | PDF HUB 24",
    description: "Contribute guest posts to PDF HUB 24. Write about PDF tools, document management, and productivity. Get exposure to 300,000+ monthly readers.",
    keywords: "write for us, guest post, contribute, PDF blog, document management blog",
    canonicalPath: "/write-for-us",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Write for Us - Guest Posting Guidelines",
      "description": "Contribute guest posts to PDF HUB 24 blog",
      "url": `${BASE_URL}/write-for-us`,
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
            <span className="text-foreground font-medium">Write for Us</span>
          </nav>

          <div className="text-center mb-10">
            <PenTool className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Write for PDF HUB 24</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your expertise with our growing audience. We publish high-quality articles about PDF tools, document management, productivity, and digital workflows.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-10">
            <Card className="text-center overflow-visible">
              <CardContent className="p-5">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-2xl">300K+</p>
                <p className="text-sm text-muted-foreground">Monthly Readers</p>
              </CardContent>
            </Card>
            <Card className="text-center overflow-visible">
              <CardContent className="p-5">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-2xl">25+</p>
                <p className="text-sm text-muted-foreground">Published Articles</p>
              </CardContent>
            </Card>
            <Card className="text-center overflow-visible">
              <CardContent className="p-5">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-2xl">43+</p>
                <p className="text-sm text-muted-foreground">Free Tools</p>
              </CardContent>
            </Card>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Write for Us?</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                PDF HUB 24 is one of the fastest-growing free PDF tool platforms, serving users across the United States, United Kingdom, India, UAE, Pakistan, and 150+ countries worldwide. Our blog attracts professionals, students, and businesses looking for practical document management advice.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By contributing to our blog, you gain exposure to a highly engaged audience actively searching for productivity solutions. Your article will be promoted across our platform, linked from relevant tool pages, and indexed by major search engines. We provide a dofollow author bio link for every published contribution.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We value quality over quantity. Every published article goes through our editorial review to ensure it meets our standards for accuracy, readability, and SEO optimization. We work collaboratively with authors to refine content before publication.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              Topics We Accept
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{topic}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              Submission Guidelines
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {guidelines.map((guideline, i) => (
                <Card key={i} className="overflow-visible">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base mb-2">{guideline.title}</h3>
                    <p className="text-sm text-muted-foreground">{guideline.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">SEO Requirements</h2>
            <Card className="overflow-visible">
              <CardContent className="p-5">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Include a primary focus keyword in the title, first paragraph, and 2-3 subheadings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Write a compelling meta description (150-160 characters) with the focus keyword</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Use proper heading hierarchy: H1 (title) then H2 and H3 subheadings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Include 3-5 internal links to relevant PDF HUB 24 tools and blog articles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Add alt text to all images describing the content for accessibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Keep paragraphs short (3-4 sentences) for readability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to Submit</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Pitch Your Idea</h3>
                  <p className="text-sm text-muted-foreground">Email us your article topic, a brief outline, and your writing credentials. We'll respond within 48 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Write Your Article</h3>
                  <p className="text-sm text-muted-foreground">Once approved, write your article following our guidelines. Submit as a Google Doc or Word file.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Editorial Review</h3>
                  <p className="text-sm text-muted-foreground">Our team reviews for quality, SEO, and accuracy. We may suggest edits or improvements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Publication</h3>
                  <p className="text-sm text-muted-foreground">Your article goes live with your author bio and dofollow link. We promote it across our platform.</p>
                </div>
              </div>
            </div>
          </section>

          <Card className="border-primary/20 bg-primary/5 overflow-visible">
            <CardContent className="p-6 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">Ready to Contribute?</h2>
              <p className="text-sm text-muted-foreground mb-4">Send your pitch to our editorial team. We look forward to hearing from you.</p>
              <a href="mailto:write@pdfhub24.com">
                <Button data-testid="button-email-pitch">
                  Email Your Pitch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-3">write@pdfhub24.com</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
