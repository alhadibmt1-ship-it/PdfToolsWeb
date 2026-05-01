import { useParams, Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, ArrowLeft, User, Tag, Zap, FileText } from "lucide-react";
import { getBlogPost, blogPosts, type BlogPost } from "@/data/blogData";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";
import { getBlogTranslation, type BlogTranslation } from "@/data/blogTranslations/index";

const BASE_URL = "https://pdfhub24.com";

function parseFAQsFromContent(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.trim().split('\n');
  let inFaqSection = false;
  let currentQuestion = '';
  let currentAnswer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed.toLowerCase().includes('frequently asked questions') && trimmed.startsWith('##')) {
      inFaqSection = true;
      continue;
    }

    if (inFaqSection) {
      if (trimmed.startsWith('## ') && !trimmed.toLowerCase().includes('frequently asked questions')) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        }
        break;
      }

      if (trimmed.startsWith('### ')) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        }
        currentQuestion = trimmed.slice(4).trim();
        currentAnswer = [];
      } else if (trimmed && currentQuestion) {
        const cleanText = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/`([^`]+)`/g, '$1');
        currentAnswer.push(cleanText);
      }
    }
  }

  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
  }

  return faqs;
}

function buildArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "PDF HUB 24",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.png`
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`
    },
    "image": `${BASE_URL}/og-image.png`,
    "url": `${BASE_URL}/blog/${post.slug}`
  };
}

function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function AdPlaceholder({ position }: { position: string }) {
  return (
    <div
      className="hidden"
      data-ad-slot={position}
      data-testid={`ad-placeholder-${position}`}
      aria-hidden="true"
    />
  );
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let inTable = false;
  let tableRows: string[][] = [];

  const processInlineMarkdown = (text: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      const codeMatch = remaining.match(/`([^`]+)`/);

      const matches = [
        { type: 'link', match: linkMatch, index: linkMatch?.index ?? Infinity },
        { type: 'bold', match: boldMatch, index: boldMatch?.index ?? Infinity },
        { type: 'code', match: codeMatch, index: codeMatch?.index ?? Infinity },
      ].filter(m => m.match).sort((a, b) => a.index - b.index);

      if (matches.length === 0 || matches[0].index === Infinity) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      const firstMatch = matches[0];
      if (firstMatch.index > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, firstMatch.index)}</span>);
      }

      if (firstMatch.type === 'link' && firstMatch.match) {
        const [fullMatch, linkText, linkUrl] = firstMatch.match;
        if (linkUrl.startsWith('/')) {
          parts.push(
            <Link key={key++} href={linkUrl} className="text-primary hover:underline font-medium">
              {linkText}
            </Link>
          );
        } else {
          parts.push(
            <a key={key++} href={linkUrl} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
              {linkText}
            </a>
          );
        }
        remaining = remaining.slice(firstMatch.index + fullMatch.length);
      } else if (firstMatch.type === 'bold' && firstMatch.match) {
        const [fullMatch, boldText] = firstMatch.match;
        parts.push(<strong key={key++} className="font-semibold">{boldText}</strong>);
        remaining = remaining.slice(firstMatch.index + fullMatch.length);
      } else if (firstMatch.type === 'code' && firstMatch.match) {
        const [fullMatch, codeText] = firstMatch.match;
        parts.push(<code key={key++} className="bg-muted px-1.5 py-0.5 rounded text-sm">{codeText}</code>);
        remaining = remaining.slice(firstMatch.index + fullMatch.length);
      }
    }

    return parts;
  };

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} className={`${listType === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 mb-4 space-y-2`}>
          {currentList.map((item, i) => (
            <li key={i} className="text-muted-foreground">{processInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, ...body] = tableRows;
      elements.push(
        <div key={elements.length} className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border rounded-lg">
            <thead className="bg-muted">
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left font-semibold border-b border-border">
                    {processInlineMarkdown(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.filter(row => !row.every(cell => cell.trim().match(/^-+$/))).map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-muted-foreground">
                      {processInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      flushList();
      inTable = true;
      const cells = trimmedLine.split('|').slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (trimmedLine === '') {
      flushList();
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold mt-8 mb-4">
          {trimmedLine.slice(3)}
        </h2>
      );
    } else if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold mt-6 mb-3">
          {trimmedLine.slice(4)}
        </h3>
      );
    } else if (trimmedLine.match(/^[0-9]+\.\s/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(trimmedLine.replace(/^[0-9]+\.\s/, ''));
    } else if (trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(trimmedLine.slice(2));
    } else {
      flushList();
      elements.push(
        <p key={elements.length} className="text-muted-foreground mb-4 leading-relaxed">
          {processInlineMarkdown(trimmedLine)}
        </p>
      );
    }
  }

  flushList();
  flushTable();

  return <div className="prose-custom">{elements}</div>;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug || '');
  const { lang } = useLanguage();

  const [translation, setTranslation] = useState<BlogTranslation | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (lang !== "en" && params.slug) {
      getBlogTranslation(lang, params.slug).then((tr) => {
        if (!cancelled) setTranslation(tr);
      });
    } else {
      setTranslation(null);
    }
    return () => { cancelled = true; };
  }, [lang, params.slug]);

  const displayTitle = translation?.title || post?.title || "";
  const displayContent = translation?.content || post?.content || "";
  const displayMetaTitle = translation?.metaTitle || post?.metaTitle || "Blog | PDF HUB 24";
  const displayMetaDesc = translation?.metaDescription || post?.metaDescription || "Free PDF tips, tutorials, and guides.";

  const faqs = useMemo(() => post ? parseFAQsFromContent(displayContent) : [], [post, displayContent]);

  const faqSchema = useMemo(() => buildFAQSchema(faqs), [faqs]);

  useSEO({
    title: displayMetaTitle,
    description: displayMetaDesc,
    canonicalPath: `/blog/${params.slug}`
  });

  useEffect(() => {
    // Server-side already injects Article + BreadcrumbList for blog posts.
    // Only inject FAQPage here — it's parsed from markdown client-side and not server-side.
    if (!post || !faqSchema) return;

    const existingScripts = document.querySelectorAll('script[data-blog-schema]');
    existingScripts.forEach(s => s.remove());

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-schema', 'blog-faq');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[data-blog-schema]');
      scripts.forEach(s => s.remove());
    };
  }, [post, faqSchema]);

  if (!post) {
    return <NotFound />;
  }

  const sameCategoryPosts = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category);
  const otherPosts = sameCategoryPosts.length >= 3
    ? sameCategoryPosts.slice(0, 3)
    : [
        ...sameCategoryPosts,
        ...blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category)
      ].slice(0, 3);
  const primaryTool = post.relatedTools[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/#tools">
              <Button variant="ghost" size="sm" data-testid="button-back-tools">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t(lang, "backToTools")}
              </Button>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/blog">
              <Button variant="ghost" size="sm" data-testid="button-back-blog">
                Back to Blog
              </Button>
            </Link>
          </div>

          <AdPlaceholder position="blog-top" />

          <article>
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-post-title">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            <div className="border-t pt-8">
              <MarkdownContent content={displayContent} />
            </div>

            <AdPlaceholder position="blog-mid" />

            <Card className="my-8 bg-primary/5 border-primary/20">
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 py-6">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold mb-1">
                    {primaryTool ? `Try ${primaryTool.name} Free` : "Try Our PDF Tools Free"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {primaryTool ? primaryTool.description : "Convert, merge, compress, and edit PDFs instantly."} No signup required.
                  </p>
                </div>
                <Link href={primaryTool ? primaryTool.path : "/#tools"}>
                  <Button data-testid="button-mid-cta">
                    <Zap className="h-4 w-4 mr-2" />
                    {primaryTool ? `Use ${primaryTool.name}` : "Explore Tools"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>

          <section className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-bold mb-6">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {post.relatedTools.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-tool-${tool.path.slice(1)}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {otherPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-bold mb-2">More Guides You'll Find Useful</h2>
              <p className="text-sm text-muted-foreground mb-6">Related articles from our PDF resource library</p>
              <div className="space-y-4">
                {otherPosts.map((otherPost) => (
                  <Link key={otherPost.slug} href={`/blog/${otherPost.slug}`}>
                    <Card className="hover-elevate cursor-pointer" data-testid={`card-related-${otherPost.slug}`}>
                      <CardHeader className="py-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="text-xs flex-shrink-0 mt-0.5">{otherPost.category}</Badge>
                          <div>
                            <CardTitle className="text-base">{otherPost.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">{otherPost.excerpt}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/blog">
                  <Button variant="outline" size="sm" data-testid="button-all-articles">
                    View All 25 Blog Articles
                  </Button>
                </Link>
              </div>
            </section>
          )}

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-semibold">Ready to Work with PDFs?</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Use our free online PDF tools to convert, edit, merge, compress, and more. No installation or signup needed.
              </p>
              <Link href="/#tools">
                <Button size="lg" data-testid="button-bottom-cta">
                  <Zap className="h-4 w-4 mr-2" />
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          <AdPlaceholder position="blog-bottom" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
