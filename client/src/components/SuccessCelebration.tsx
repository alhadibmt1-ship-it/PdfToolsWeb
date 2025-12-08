import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Twitter, Facebook, Linkedin, Copy, CheckCircle, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface SuccessCelebrationProps {
  isVisible: boolean;
  toolName: string;
  fileName?: string;
  originalSize?: number;
  newSize?: number;
  onDownload: () => void;
  onClose: () => void;
  downloadReady?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);
  
  useEffect(() => {
    const colors = ["#0057FF", "#00D4FF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            left: `${particle.x}%`, 
            top: "-10px",
            backgroundColor: particle.color
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ 
            y: "100vh", 
            opacity: 0,
            rotate: Math.random() * 720 - 360
          }}
          transition={{ 
            duration: 2 + Math.random(),
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessCelebration({
  isVisible,
  toolName,
  fileName,
  originalSize,
  newSize,
  onDownload,
  onClose,
  downloadReady = true
}: SuccessCelebrationProps) {
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `I just used ${toolName} on PDF HUB 24 - it's fast, free, and amazing! Check it out:`;

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible]);

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share it with your friends and colleagues",
      });
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const savingsPercent = originalSize && newSize 
    ? Math.round((1 - newSize / originalSize) * 100) 
    : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {showConfetti && <Confetti />}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Card className="p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PartyPopper className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">Success!</h3>
                      <PartyPopper className="w-5 h-5 text-primary transform scale-x-[-1]" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Your file is ready for download
                    </p>
                  </motion.div>

                  {savingsPercent !== null && savingsPercent > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                    >
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {savingsPercent}% smaller
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatBytes(originalSize!)} → {formatBytes(newSize!)}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={onDownload}
                      disabled={!downloadReady}
                      data-testid="button-download-success"
                    >
                      <Download className="w-4 h-4" />
                      Download File
                    </Button>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">
                        Love PDF HUB 24? Share it with others!
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleShare("twitter")}
                          data-testid="button-share-twitter"
                          className="hover-elevate"
                        >
                          <Twitter className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleShare("facebook")}
                          data-testid="button-share-facebook"
                          className="hover-elevate"
                        >
                          <Facebook className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleShare("linkedin")}
                          data-testid="button-share-linkedin"
                          className="hover-elevate"
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopyLink}
                          data-testid="button-copy-link"
                          className="hover-elevate"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link href="/">
                        <span className="inline-flex items-center gap-1 text-sm text-primary hover:underline cursor-pointer" data-testid="link-explore-more">
                          Explore more tools
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
