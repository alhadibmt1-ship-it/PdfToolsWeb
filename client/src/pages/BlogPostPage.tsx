import { useParams, Link } from "wouter";
import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";
import { getBlogPost, blogPosts } from "@/data/blogData";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

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

  useSEO({
    title: post?.metaTitle || "Blog | PDF HUB 24",
    description: post?.metaDescription || "PDF tips and tutorials",
    canonicalPath: `/blog/${params.slug}`
  });

  if (!post) {
    return <NotFound />;
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/#tools">
              <Button variant="ghost" size="sm" data-testid="button-back-tools">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/blog">
              <Button variant="ghost" size="sm" data-testid="button-back-blog">
                Back to Blog
              </Button>
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-post-title">
                {post.title}
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
              <MarkdownContent content={post.content} />
            </div>

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
              <h2 className="text-xl font-bold mb-6">More Articles</h2>
              <div className="space-y-4">
                {otherPosts.map((otherPost) => (
                  <Link key={otherPost.slug} href={`/blog/${otherPost.slug}`}>
                    <Card className="hover-elevate cursor-pointer" data-testid={`card-related-${otherPost.slug}`}>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">{otherPost.title}</CardTitle>
                        <CardDescription className="text-sm">{otherPost.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
