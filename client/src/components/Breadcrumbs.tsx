import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1" data-testid="breadcrumb-home">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-primary transition-colors"
                data-testid={`breadcrumb-${index}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" data-testid={`breadcrumb-current-${index}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ToolBreadcrumbs({ toolName, category }: { toolName: string; category: string }) {
  const categoryLabels: Record<string, string> = {
    "from-pdf": "Convert from PDF",
    "to-pdf": "Convert to PDF",
    "edit-pdf": "Edit PDF",
    "utility": "Utility Tools"
  };

  return (
    <Breadcrumbs
      items={[
        { label: categoryLabels[category] || "PDF Tools" },
        { label: toolName }
      ]}
    />
  );
}

export function BlogBreadcrumbs({ articleTitle }: { articleTitle?: string }) {
  const items: BreadcrumbItem[] = articleTitle
    ? [
        { label: "Blog", href: "/blog" },
        { label: articleTitle }
      ]
    : [{ label: "Blog" }];

  return <Breadcrumbs items={items} />;
}
