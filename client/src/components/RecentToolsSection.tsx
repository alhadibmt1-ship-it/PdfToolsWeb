import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import { PDF_TOOLS } from "@shared/schema";
import ToolIcon from "@/components/ToolIcon";

export default function RecentToolsSection() {
  const { recentTools, clearRecentTools } = useRecentTools();
  
  if (recentTools.length === 0) {
    return null;
  }

  const recentToolsData = recentTools
    .map(id => PDF_TOOLS.find(t => t.id === id))
    .filter(Boolean);

  if (recentToolsData.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Recently Used</h2>
              <p className="text-sm text-muted-foreground">Pick up where you left off</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentTools}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-clear-recent"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {recentToolsData.map((tool, index) => (
            <motion.div
              key={tool!.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={tool!.path}>
                <Card 
                  className="p-4 h-full hover-elevate active-elevate-2 cursor-pointer transition-all group"
                  data-testid={`card-recent-${tool!.id}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 transform group-hover:scale-110 transition-transform">
                      <ToolIcon iconType={tool!.icon} size="sm" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {tool!.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
