import { Bell, CreditCard, Globe, PieChart } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Track All Subscriptions',
    description:
      'Add and manage all your subscription services from streaming to software in one unified dashboard.',
  },
  {
    icon: PieChart,
    title: 'Spending Analytics',
    description:
      'See your monthly and yearly spending at a glance. Understand where your money goes.',
  },
  {
    icon: Bell,
    title: 'Payment Reminders',
    description:
      'Never miss a billing date. Get notified before charges hit your account.',
  },
  {
    icon: Globe,
    title: 'Multi-Currency Support',
    description:
      'Track subscriptions in different currencies. Perfect for international services.',
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Everything You Need
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Simple tools to help you take control of your subscriptions
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border p-6 transition-colors hover:bg-muted/50"
            >
              <feature.icon className="h-10 w-10 text-primary/70" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
