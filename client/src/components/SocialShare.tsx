import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
}

export default function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="gap-2 cursor-pointer"
          data-testid="share-facebook"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="gap-2 cursor-pointer"
          data-testid="share-twitter"
        >
          <Twitter className="w-4 h-4 text-sky-500" />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="gap-2 cursor-pointer"
          data-testid="share-linkedin"
        >
          <Linkedin className="w-4 h-4 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={copyToClipboard}
          className="gap-2 cursor-pointer"
          data-testid="share-copy-link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
