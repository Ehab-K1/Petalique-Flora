import type { Metadata } from 'next';
import { HomePlanBuilder, SubscriptionsHero } from '@/components/HomePlanBuilder';

export const metadata: Metadata = {
  title: 'Subscriptions · Lived Spaces',
  description:
    'Weekly, biweekly or monthly arrangements for the home. Composed by the atelier, swapped at the vessel, paused any time.',
};

export default function SubscriptionsPage() {
  return (
    <>
      <SubscriptionsHero />
      <section className="section-sm bg-bone">
        <div className="container">
          <HomePlanBuilder />
        </div>
      </section>
    </>
  );
}
