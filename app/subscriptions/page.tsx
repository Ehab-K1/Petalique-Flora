import type { Metadata } from 'next';
import { HomePlanBuilder, SubscriptionsHero } from '@/components/HomePlanBuilder';
import { TrustBar } from '@/components/TrustBar';

export const metadata: Metadata = {
  title: 'Flower subscriptions',
  description:
    'Weekly, biweekly or monthly flowers for your home. One monthly invoice. Pause or cancel any time. From $45 per delivery.',
};

export default function SubscriptionsPage() {
  return (
    <>
      <SubscriptionsHero />
      <section className="bg-paper">
        <div className="container">
          <TrustBar />
        </div>
      </section>
      <section className="section-sm bg-bone">
        <div className="container">
          <HomePlanBuilder />
        </div>
      </section>
    </>
  );
}
