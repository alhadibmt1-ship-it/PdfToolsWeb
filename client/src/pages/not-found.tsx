import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  FileX, 
  Home, 
  Search, 
  Combine, 
  FileDown, 
  FileText,
  ArrowRight
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const popularTools = [
  { path: "/merge-pdf", title: "Merge PDF", icon: Combine, description: "Combine multiple PDFs" },
  { path: "/compress-pdf", title: "Compress PDF", icon: FileDown, description: "Reduce file size" },
  { path: "/pdf-to-word", title: "PDF to Word", icon: FileText, description: "Convert to DOCX" },
];

export default function NotFound() {
  useSEO({
    title: "Page Not Found - PDF HUB 24",
    description: "The page you're looking for doesn't exist. Explore our 49+ free PDF tools for converting, merging, compressing, and editing PDF files.",
    keywords: "404, page not found, PDF tools, PDF HUB 24"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <FileX className="w-12 h-12 text-red-500" />
            </div>
          </div>
          
          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-go-home">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="/all-tools">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-browse-tools">
                <Search className="w-4 h-4 mr-2" />
                Browse All Tools
              </Button>
            </Link>
          </div>
          
          {/* Popular Tools Section */}
          <div className="border-t pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Popular PDF Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <div 
                    className="group p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                    data-testid={`link-404-tool-${tool.path.slice(1)}`}
                  >
                    <tool.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Use Tool</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Help Text */}
          <p className="text-sm text-muted-foreground mt-8">
            Need help? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> or explore our{" "}
            <Link href="/blog" className="text-primary hover:underline">blog</Link> for PDF tips and tutorials.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
