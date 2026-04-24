/**
 * AdSlot — Placeholder for Google AdSense manual ad units.
 *
 * HOW TO ACTIVATE WHEN ADSENSE IS APPROVED:
 * 1. Add your AdSense script to index.html <head>:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 *
 * 2. Update the adClient and adSlot props on each <AdSlot> with your real values:
 *    <AdSlot adClient="ca-pub-XXXXXXXXXXXXXXXX" adSlot="1234567890" />
 *
 * 3. That's it — the <ins> element will render and AdSense will fill it automatically.
 */

import { useEffect, useRef } from "react";

interface AdSlotProps {
  adClient?: string;
  adSlot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot({
  adClient,
  adSlot,
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adClient && adSlot && insRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [adClient, adSlot]);

  if (adClient && adSlot) {
    return (
      <div className={`my-6 text-center overflow-hidden ${className}`} aria-label={label}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return null;
}
