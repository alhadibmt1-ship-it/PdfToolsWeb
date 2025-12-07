import { CheckCircle, Infinity, Shield, Zap, Lock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  variant?: "inline" | "expanded" | "prominent";
  className?: string;
}

export default function TrustBadges({ variant = "inline", className }: TrustBadgesProps) {
  if (variant === "prominent") {
    return (
      <div className={cn("rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 border border-primary/10 p-4 sm:p-5", className)}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5" data-testid="trust-badge-free">
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">100% Free</div>
              <div className="text-xs text-muted-foreground">No hidden costs</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-secure">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">Secure</div>
              <div className="text-xs text-muted-foreground">SSL encrypted</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-fast">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">Fast</div>
              <div className="text-xs text-muted-foreground">Cloud powered</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-nolimit">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Infinity className="w-5 h-5 text-purple-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">No Limits</div>
              <div className="text-xs text-muted-foreground">Unlimited use</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 my-6", className)}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-free">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" aria-hidden="true" />
          <span>100% Free</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-secure">
          <Shield className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-fast">
          <Zap className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
          <span>Fast</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-nolimit">
          <Infinity className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span>No Limits</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-free">
        <CheckCircle className="w-3 h-3 text-green-500" aria-hidden="true" />
        Free
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-secure">
        <Shield className="w-3 h-3 text-primary" aria-hidden="true" />
        Secure
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-fast">
        <Zap className="w-3 h-3 text-orange-500" aria-hidden="true" />
        Fast
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-nolimit">
        <Infinity className="w-3 h-3 text-purple-500" aria-hidden="true" />
        No Limits
      </Badge>
    </div>
  );
}
