import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      data-testid="button-back-to-top"
      className={`fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 md:bottom-8 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
