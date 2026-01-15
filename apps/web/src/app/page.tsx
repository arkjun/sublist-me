import { Header } from '@/components/header';
import { SubscriptionList } from '@/components/subscription/subscription-list';

export default function Home() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <Header />
      <SubscriptionList />
    </main>
  );
}
