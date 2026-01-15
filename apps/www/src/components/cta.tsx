import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="border-t border-border px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Take Control?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Start managing your subscriptions today. It's free to get started.
        </p>
        <a
          href="https://app.sublistme.com"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-4 text-base font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Get Started Free
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
