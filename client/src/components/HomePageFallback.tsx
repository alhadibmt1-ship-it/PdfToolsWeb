export default function HomePageFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl h-14 sm:h-16 flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center">
          <a href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">PDF</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">PDF HUB 24</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-[1.1] tracking-tight">
            Professional PDF Tools
            <span className="block gradient-text mt-1">100% Free Online</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Convert, merge, compress, and edit PDF files instantly.{" "}
            Trusted by millions of users worldwide.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="h-9 w-32 rounded-md bg-primary/10 animate-pulse" />
            <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
            <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
