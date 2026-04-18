import { Link } from "wouter";
import { Globe } from "lucide-react";

interface CountryLink {
  slug: string;
  label: string;
  flag: string;
}

const TOP_COUNTRIES: CountryLink[] = [
  { slug: "united-states", label: "United States", flag: "🇺🇸" },
  { slug: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { slug: "india", label: "India", flag: "🇮🇳" },
  { slug: "canada", label: "Canada", flag: "🇨🇦" },
  { slug: "australia", label: "Australia", flag: "🇦🇺" },
  { slug: "germany", label: "Germany", flag: "🇩🇪" },
  { slug: "france", label: "France", flag: "🇫🇷" },
  { slug: "brazil", label: "Brazil", flag: "🇧🇷" },
  { slug: "japan", label: "Japan", flag: "🇯🇵" },
  { slug: "singapore", label: "Singapore", flag: "🇸🇬" },
  { slug: "uae", label: "UAE", flag: "🇦🇪" },
  { slug: "south-korea", label: "South Korea", flag: "🇰🇷" },
  { slug: "mexico", label: "Mexico", flag: "🇲🇽" },
  { slug: "spain", label: "Spain", flag: "🇪🇸" },
  { slug: "italy", label: "Italy", flag: "🇮🇹" },
  { slug: "netherlands", label: "Netherlands", flag: "🇳🇱" },
  { slug: "south-africa", label: "South Africa", flag: "🇿🇦" },
  { slug: "philippines", label: "Philippines", flag: "🇵🇭" },
  { slug: "nigeria", label: "Nigeria", flag: "🇳🇬" },
  { slug: "indonesia", label: "Indonesia", flag: "🇮🇩" },
];

interface CountrySpotlightProps {
  toolCountrySlug: string;
}

export default function CountrySpotlight({ toolCountrySlug }: CountrySpotlightProps) {
  return (
    <section className="rounded-lg border bg-card p-6 space-y-4 mt-8">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-base font-semibold">Popular in Your Region</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Localized guides with country-specific documents, portals, and compliance tips — free for everyone.
      </p>
      <div className="flex flex-wrap gap-2">
        {TOP_COUNTRIES.map((country) => (
          <Link
            key={country.slug}
            href={`/tools/${toolCountrySlug}-${country.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm hover-elevate transition-colors"
          >
            <span aria-hidden="true">{country.flag}</span>
            <span>{country.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
