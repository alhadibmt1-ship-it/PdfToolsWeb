import { CheckCircle, Infinity, Shield, Zap, Lock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

interface TrustBadgesProps {
  variant?: "inline" | "expanded" | "prominent";
  className?: string;
}

export default function TrustBadges({ variant = "inline", className }: TrustBadgesProps) {
  const { lang } = useLanguage();

  if (variant === "prominent") {
    return (
      <div className={cn("rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 border border-primary/10 p-4 sm:p-5", className)}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center gap-2.5" data-testid="trust-badge-free">
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "hundredFree")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "noHiddenCosts")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-secure">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "secure")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "sslEncrypted")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-fast">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "fast")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "cloudPowered")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-nolimit">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Infinity className="w-5 h-5 text-purple-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "noLimits")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "unlimitedUse")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-gdpr">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-blue-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "gdprCompliant")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "euPrivacyLaw")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5" data-testid="trust-badge-noreg">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-teal-500" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-sm">{t(lang, "noRegistration")}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "noAccountNeeded")}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-6", className)}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-free">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" aria-hidden="true" />
          <span>{t(lang, "hundredFree")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-secure">
          <Shield className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span>{t(lang, "secure")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-fast">
          <Zap className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
          <span>{t(lang, "fast")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-nolimit">
          <Infinity className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span>{t(lang, "noLimits")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-gdpr">
          <Lock className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
          <span>{t(lang, "gdprCompliant")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="trust-badge-noreg">
          <Globe className="w-5 h-5 text-teal-500 shrink-0" aria-hidden="true" />
          <span>{t(lang, "noRegistration")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-free">
        <CheckCircle className="w-3 h-3 text-green-500" aria-hidden="true" />
        {t(lang, "free")}
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-secure">
        <Shield className="w-3 h-3 text-primary" aria-hidden="true" />
        {t(lang, "secure")}
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-fast">
        <Zap className="w-3 h-3 text-orange-500" aria-hidden="true" />
        {t(lang, "fast")}
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-nolimit">
        <Infinity className="w-3 h-3 text-purple-500" aria-hidden="true" />
        {t(lang, "noLimits")}
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-gdpr">
        <Lock className="w-3 h-3 text-blue-500" aria-hidden="true" />
        {t(lang, "gdprCompliant")}
      </Badge>
      <Badge variant="secondary" className="text-xs gap-1.5" data-testid="trust-badge-noreg">
        <Globe className="w-3 h-3 text-teal-500" aria-hidden="true" />
        {t(lang, "noRegistration")}
      </Badge>
    </div>
  );
}
