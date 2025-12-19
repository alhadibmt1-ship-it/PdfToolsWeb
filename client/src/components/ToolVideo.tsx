interface ToolVideoProps {
  videoId: string;
  title: string;
}

export default function ToolVideo({ videoId, title }: ToolVideoProps) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg border border-border/50 bg-muted">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          data-testid="video-youtube-embed"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-3">
        Watch how to use {title}
      </p>
    </div>
  );
}
