import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Trash2, BarChart3, Globe, FileText, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";

interface AuditUrl {
  loc: string;
  urlPath: string;
  category: string;
  status: "ok" | "issue";
  issue?: string;
}

interface ContentQualityItem {
  toolId: string;
  urlPath: string;
  score: number;
  issues: string[];
  hasH1: boolean;
  hasMetaDesc: boolean;
  hasFaqs: boolean;
  hasInternalLinks: boolean;
  hasUseCases: boolean;
  hasTutorial: boolean;
}

interface AuditReport {
  sitemapStats: { total: number; english: number; langVariants: number };
  routeIssues: AuditUrl[];
  validRoutes: AuditUrl[];
  contentQuality: ContentQualityItem[];
  overallScore: number;
  generatedAt: string;
}

const categoryColors: Record<string, string> = {
  tool: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  blog: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  programmatic: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  category: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  page: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono w-8 text-right">{score}</span>
    </div>
  );
}

export default function SeoAuditPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "content">("overview");
  const qc = useQueryClient();

  const { data: report, isLoading, error, refetch } = useQuery<AuditReport>({
    queryKey: ["/api/seo/audit"],
    staleTime: 5 * 60 * 1000,
  });

  const fixMutation = useMutation({
    mutationFn: (urlPath: string) => apiRequest("POST", "/api/seo/fix", { path: urlPath }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/seo/audit"] });
    },
  });

  const tabs = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "issues", label: `Issues (${report?.routeIssues.length ?? 0})`, icon: AlertTriangle },
    { key: "content", label: "Content Quality", icon: Star },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">SEO Audit Dashboard</h1>
            <p className="text-muted-foreground">
              Validates sitemap URLs against registered routes and checks content quality across all tool pages.
            </p>
            {report && (
              <p className="text-xs text-muted-foreground mt-1">
                Last run: {new Date(report.generatedAt).toLocaleString()}
              </p>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <RefreshCw className="animate-spin" size={20} />
              Running audit — this may take a few seconds…
            </div>
          )}

          {error && (
            <Card className="border-destructive">
              <CardContent className="p-6 text-destructive">
                Audit failed: {(error as Error).message}
              </CardContent>
            </Card>
          )}

          {report && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe size={16} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Sitemap URLs</span>
                    </div>
                    <div className="text-2xl font-bold">{report.sitemapStats.total.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{report.sitemapStats.english} English + {report.sitemapStats.langVariants} lang variants</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Valid Routes</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{report.validRoutes.length}</div>
                    <div className="text-xs text-muted-foreground">Pass validation</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle size={16} className="text-red-500" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Route Issues</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{report.routeIssues.length}</div>
                    <div className="text-xs text-muted-foreground">Potential 404s</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 size={16} className="text-primary" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Health Score</span>
                    </div>
                    <div className={`text-2xl font-bold ${report.overallScore >= 90 ? "text-green-600 dark:text-green-400" : report.overallScore >= 70 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}>
                      {report.overallScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Route validity</div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 border-b">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    data-testid={`tab-${key}`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
                <div className="ml-auto flex items-center pb-1">
                  <Button size="sm" variant="outline" onClick={() => refetch()} data-testid="button-refresh-audit">
                    <RefreshCw size={14} className="mr-1" />
                    Re-run
                  </Button>
                </div>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sitemap Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(["tool", "blog", "programmatic", "page", "category"] as const).map(cat => {
                          const count = report.validRoutes.filter(r => r.category === cat).length
                            + report.routeIssues.filter(r => r.category === cat).length;
                          return (
                            <div key={cat} className="text-center p-3 rounded-md bg-muted/40">
                              <div className="text-xl font-bold">{count}</div>
                              <div className="text-xs text-muted-foreground capitalize">{cat === "programmatic" ? "Prog. SEO" : cat} pages</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Content Quality Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        {[
                          { label: "Avg Quality Score", value: `${Math.round(report.contentQuality.reduce((s, i) => s + i.score, 0) / Math.max(report.contentQuality.length, 1))}%` },
                          { label: "Tools with FAQs", value: `${report.contentQuality.filter(i => i.hasFaqs).length}/${report.contentQuality.length}` },
                          { label: "Tools with Internal Links", value: `${report.contentQuality.filter(i => i.hasInternalLinks).length}/${report.contentQuality.length}` },
                          { label: "Tools with Use Cases", value: `${report.contentQuality.filter(i => i.hasUseCases).length}/${report.contentQuality.length}` },
                          { label: "Tools with Tutorial", value: `${report.contentQuality.filter(i => i.hasTutorial).length}/${report.contentQuality.length}` },
                          { label: "Tools Needing Work", value: `${report.contentQuality.filter(i => i.score < 80).length}` },
                        ].map(({ label, value }) => (
                          <div key={label} className="p-3 rounded-md bg-muted/40">
                            <div className="font-semibold">{value}</div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Issues Tab */}
              {activeTab === "issues" && (
                <Card>
                  <CardContent className="p-0">
                    {report.routeIssues.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <CheckCircle size={40} className="text-green-500" />
                        <div>
                          <div className="font-semibold">No route issues found</div>
                          <div className="text-sm text-muted-foreground">All sitemap URLs match registered routes</div>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/30">
                              <th className="text-left p-3 font-medium">Path</th>
                              <th className="text-left p-3 font-medium">Category</th>
                              <th className="text-left p-3 font-medium">Issue</th>
                              <th className="text-right p-3 font-medium">Fix</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.routeIssues.map((item) => (
                              <tr key={item.urlPath} className="border-b last:border-0 hover:bg-muted/20">
                                <td className="p-3 font-mono text-xs">{item.urlPath}</td>
                                <td className="p-3">
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.category] || categoryColors.page}`}>
                                    {item.category}
                                  </span>
                                </td>
                                <td className="p-3 text-muted-foreground text-xs">{item.issue}</td>
                                <td className="p-3 text-right">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => fixMutation.mutate(item.urlPath)}
                                    disabled={fixMutation.isPending}
                                    data-testid={`button-remove-${item.urlPath}`}
                                  >
                                    <Trash2 size={12} className="mr-1" />
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Content Quality Tab */}
              {activeTab === "content" && (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="text-left p-3 font-medium">Tool</th>
                            <th className="text-left p-3 font-medium">Score</th>
                            <th className="p-3 font-medium text-center">H1</th>
                            <th className="p-3 font-medium text-center">Meta</th>
                            <th className="p-3 font-medium text-center">FAQs</th>
                            <th className="p-3 font-medium text-center">Links</th>
                            <th className="p-3 font-medium text-center">Cases</th>
                            <th className="p-3 font-medium text-center">Tutorial</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.contentQuality.map((item) => (
                            <tr key={item.toolId} className="border-b last:border-0 hover:bg-muted/20">
                              <td className="p-3 font-mono text-xs">{item.urlPath}</td>
                              <td className="p-3 min-w-[100px]"><ScoreBar score={item.score} /></td>
                              {[item.hasH1, item.hasMetaDesc, item.hasFaqs, item.hasInternalLinks, item.hasUseCases, item.hasTutorial].map((v, i) => (
                                <td key={i} className="p-3 text-center">
                                  {v ? <CheckCircle size={14} className="inline text-green-500" /> : <XCircle size={14} className="inline text-red-400" />}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
