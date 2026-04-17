import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

const BASE_URL = "https://pdfhub24.com";

export default function BlogListPage() {
  useSEO({
    title: "PDF Tips & Tutorials - Learn PDF Tricks | PDF HUB 24",
    description: "Free PDF guides and tutorials. Learn to compress, merge, convert, edit PDFs. Step-by-step instructions for PDF tasks. Best free tips.",
    canonicalPath: "/blog"
  });

  const { lang } = useLanguage();

  useEffect(() => {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "PDF Tips & Tutorials",
      "description": "Learn how to work with PDF files effectively",
      "numberOfItems": blogPosts.length,
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${BASE_URL}/blog/${post.slug}`,
        "name": post.title
      }))
    };

    const existingScript = document.querySelector('script[data-blog-list-schema="true"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-blog-list-schema", "true");
    script.textContent = JSON.stringify(itemListSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-blog-list-schema="true"]');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/#tools">
              <Button variant="ghost" size="sm" data-testid="button-back-tools">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t(lang, "backToTools")}
              </Button>
            </Link>
          </div>
          
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" data-testid="text-blog-title">
              PDF Tips & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to work with PDF files effectively. Discover tutorials, best practices, 
              and tips for all your document needs.
            </p>
          </header>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card 
                  className="hover-elevate cursor-pointer transition-all"
                  data-testid={`card-blog-${post.slug}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs text-muted-foreground flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-primary flex items-center gap-1 text-sm font-medium">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              More tutorials coming soon! Check back regularly for new content.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
