import { ArrowRight } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="text-xl font-bold">
          SubList Me
        </a>
        <a
          href="https://app.sublistme.com"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
