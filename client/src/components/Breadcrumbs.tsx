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
      <ol 
        className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          className="flex items-center"
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/" 
            className="hover:text-primary transition-colors flex items-center gap-1" 
            data-testid="breadcrumb-home"
            itemProp="item"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center"
            {...(item.href ? {
              itemProp: "itemListElement",
              itemScope: true,
              itemType: "https://schema.org/ListItem"
            } : {})}
          >
            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" aria-hidden="true" />
            {item.href ? (
              <>
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                  data-testid={`breadcrumb-${index}`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <meta itemProp="position" content={String(index + 2)} />
              </>
            ) : (
              <span 
                className="text-foreground font-medium" 
                data-testid={`breadcrumb-current-${index}`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const CATEGORY_LABELS: Record<string, { label: string; href: string }> = {
  "from-pdf": { label: "Convert from PDF", href: "/convert-pdf" },
  "to-pdf":   { label: "Convert to PDF",   href: "/convert-pdf" },
  "edit-pdf": { label: "Edit PDF",          href: "/edit-pdf-tools" },
  "utility":  { label: "Image Tools",       href: "/image-tools" },
};

export function ToolBreadcrumbs({ toolName, category }: { toolName: string; category: string }) {
  const catInfo = CATEGORY_LABELS[category];
  const items: BreadcrumbItem[] = catInfo
    ? [{ label: catInfo.label, href: catInfo.href }, { label: toolName }]
    : [{ label: toolName }];
  return <Breadcrumbs items={items} />;
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
