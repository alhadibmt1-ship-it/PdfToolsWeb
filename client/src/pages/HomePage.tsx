import { Link } from "wouter";
import { 
  Combine, 
  SplitSquareHorizontal, 
  FileDown, 
  Image, 
  FileImage, 
  FileText, 
  Lock, 
  Unlock, 
  RotateCw, 
  Trash2, 
  Type,
  ArrowRight
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const iconMap: Record<string, any> = {
  merge: Combine,
  split: SplitSquareHorizontal,
  compress: FileDown,
  image: Image,
  "file-image": FileImage,
  "file-text": FileText,
  lock: Lock,
  unlock: Unlock,
  "rotate-cw": RotateCw,
  trash: Trash2,
  "file-type": Type,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 md:py-20 bg-gradient-to-b from-accent/30 to-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Professional PDF Tools
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fast, secure, and free online PDF tools for all your document needs
            </p>
          </div>
        </section>

        <section id="tools" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Choose Your Tool
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PDF_TOOLS.map((tool) => {
                const Icon = iconMap[tool.icon];
                return (
                  <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
                    <Card className="p-6 h-full hover-elevate active-elevate-2 cursor-pointer transition-all hover:scale-[1.02] group">
                      <div className="flex flex-col h-full">
                        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                          {tool.description}
                        </p>
                        
                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Use Tool
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Why Choose PDF Master Tools?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">
                  All files are processed locally in your browser
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <RotateCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Quick processing with no upload wait times
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Always Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no hidden fees, ever
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
