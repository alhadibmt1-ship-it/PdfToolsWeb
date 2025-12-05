import { CheckCircle, Infinity, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import siteLogo from "@assets/generated_images/logo-64.webp";

interface TrustBadgesProps {
  variant?: "inline" | "expanded";
}

export default function TrustBadges({ variant = "inline" }: TrustBadgesProps) {
  if (variant === "expanded") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          <span>100% Free</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <img src={siteLogo} alt="PDF HUB 24" className="w-5 h-5 shrink-0" />
          <span>Online</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Infinity className="w-5 h-5 text-primary shrink-0" />
          <span>No Limits</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <span>Secure</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="text-xs gap-1.5">
        <CheckCircle className="w-3 h-3 text-green-500" />
        Free
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5">
        <img src={siteLogo} alt="PDF HUB 24" className="w-3 h-3" />
        Online
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5">
        <Infinity className="w-3 h-3 text-primary" />
        No Limits
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5">
        <Shield className="w-3 h-3 text-primary" />
        Secure
      </Badge>
    </div>
  );
}
