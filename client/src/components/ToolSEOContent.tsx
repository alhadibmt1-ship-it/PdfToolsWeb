import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Zap, Clock, HelpCircle, Play } from "lucide-react";
import { Link } from "wouter";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  text: string;
  href: string;
}

interface ExtraSection {
  title: string;
  content: string;
  items?: string[];
}

interface ExampleRow {
  label: string;
  before: string;
  after: string;
}

interface ToolSEOContentProps {
  toolName: string;
  toolId?: string;
  toolDescription: string;
  howToSteps: string[];
  benefits: string[];
  faqs: FAQ[];
  keywords?: string[];
  relatedLinks?: RelatedLink[];
  extraSections?: ExtraSection[];
  exampleTable?: {
    title: string;
    rows: ExampleRow[];
  };
}

const toolVideoData: Record<string, { duration: string }> = {
  "merge": { duration: "0:45" },
  "split": { duration: "0:38" },
  "compress": { duration: "0:42" },
  "pdf-to-word": { duration: "0:55" },
  "pdf-to-jpg": { duration: "0:40" },
  "pdf-to-png": { duration: "0:40" },
  "pdf-to-excel": { duration: "0:50" },
  "word-to-pdf": { duration: "0:35" },
  "jpg-to-pdf": { duration: "0:48" },
  "png-to-pdf": { duration: "0:45" },
  "excel-to-pdf": { duration: "0:42" },
  "html-to-pdf": { duration: "0:55" },
  "webp-to-pdf": { duration: "0:38" },
  "rotate": { duration: "0:32" },
  "delete-pages": { duration: "0:45" },
  "protect-pdf": { duration: "0:50" },
  "unlock-pdf": { duration: "0:35" },
  "add-page-numbers": { duration: "0:48" },
  "add-watermark": { duration: "0:52" },
  "reorder-pages": { duration: "0:58" },
  "crop-pdf": { duration: "0:45" },
  "resize-pdf": { duration: "0:40" },
  "sign-pdf": { duration: "1:05" },
  "flatten-pdf": { duration: "0:35" },
  "grayscale-pdf": { duration: "0:30" },
  "repair-pdf": { duration: "0:42" },
  "extract-text": { duration: "0:38" },
  "extract-images": { duration: "0:45" },
  "ocr-pdf": { duration: "1:15" },
  "pdf-viewer": { duration: "0:28" },
  "compare-pdf": { duration: "0:55" },
  "image-compressor": { duration: "0:40" },
};

export default function ToolSEOContent({
  toolName,
  toolId,
  toolDescription,
  howToSteps,
  benefits,
  faqs,
  keywords = [],
  relatedLinks = [],
  extraSections = [],
  exampleTable
}: ToolSEOContentProps) {
  const keywordText = keywords.length >= 3 
    ? keywords.slice(0, 3).join(", ") 
    : keywords.length > 0 
      ? keywords.join(" or ") 
      : "";
  
  const videoInfo = toolId ? toolVideoData[toolId] : null;

  return (
    <div className="mt-16 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">About Our {toolName} Tool</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {toolDescription}
        </p>
        {keywordText && (
          <p className="text-muted-foreground leading-relaxed mt-4">
            Professionals, students, and business users trust our {toolName.toLowerCase()} tool for all their PDF needs. 
            Whether you need to {keywordText}, our free online tool makes it simple, fast, and secure.
          </p>
        )}
        {relatedLinks.length > 0 && (
          <div className="mt-4">
            <p className="text-muted-foreground mb-2">Before using this tool, you can also:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {relatedLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-primary hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-2">All tools are part of the PDF HUB 24 ecosystem.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">How to Use This Tool</h2>
        <div className="grid gap-4 mb-8">
          {howToSteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
        
        {videoInfo && (
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="relative w-full sm:w-64 md:w-72 lg:w-80 flex-shrink-0">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-8 h-10 border-2 border-white rounded" />
                    <div className="absolute bottom-4 right-4 w-6 h-8 border-2 border-white rounded" />
                    <div className="absolute top-1/2 left-1/3 w-5 h-6 border-2 border-white rounded transform -translate-y-1/2" />
                  </div>
                  
                  <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all shadow-lg shadow-primary/30">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                  
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {videoInfo.duration}
                  </div>
                  
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium px-3 py-1.5 rounded-full bg-primary/80">
                      Video Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  Watch: How to {toolName}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Follow along with our step-by-step video tutorial to learn how to use the {toolName.toLowerCase()} tool effectively. 
                  Perfect for first-time users who prefer visual learning.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    No account needed
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Quick & easy
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Why Choose PDF HUB 24?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Process your PDFs in seconds with our optimized servers. No waiting, no delays.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">Your files are automatically deleted after processing. We never store or share your documents.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">No Registration Required</h3>
                <p className="text-sm text-muted-foreground">Use all our tools instantly without creating an account. Completely free, no hidden fees.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Available 24/7</h3>
                <p className="text-sm text-muted-foreground">Access PDF HUB 24 anytime, from any device. Works on desktop, tablet, and mobile.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {extraSections.map((section, index) => (
        <section key={index}>
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
          {section.items && section.items.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {exampleTable && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{exampleTable.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">File Type</th>
                  <th className="text-left p-3 font-semibold">Before</th>
                  <th className="text-left p-3 font-semibold">After</th>
                </tr>
              </thead>
              <tbody>
                {exampleTable.rows.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-muted-foreground">{row.label}</td>
                    <td className="p-3 text-muted-foreground">{row.before}</td>
                    <td className="p-3 text-green-600 font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-2 max-w-2xl mx-auto">
          Upload your file above and experience the fastest, most reliable {toolName.toLowerCase()} tool online. 
          No registration, no downloads, no limits.
        </p>
        <p className="text-sm text-muted-foreground">
          Trusted by thousands of users worldwide for all their PDF needs.
        </p>
      </section>
    </div>
  );
}
