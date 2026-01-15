import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        All Your Subscriptions,
        <br />
        <span className="text-primary/70">One Dashboard</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Track, manage, and optimize all your subscription services in one place.
        Never miss a payment or forget what you're subscribed to.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://app.sublistme.com"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#features"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
