import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Service terms for Petalique Flora bouquets, subscriptions, weddings and trade.',
};

export default function TermsPage() {
  return (
    <section className="section-sm bg-bone">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="marker">Legal</div>
        <h1 className="h1" style={{ marginTop: 8 }}>Terms of service</h1>

        <div className="legal-body">
          <h2 className="h3" style={{ marginTop: 'var(--s-5)' }}>Orders & substitutions</h2>
          <p className="body">
            We design every bouquet by hand using the freshest stems available that morning. If a
            specific stem is out of season or below our quality bar, we substitute with one of equal
            value and aesthetic &mdash; and tell you what changed.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Fresh-flower guarantee</h2>
          <p className="body">
            If a bouquet arrives less than perfect &mdash; wilted, damaged, mis-coloured &mdash; we
            remake it, no questions, and put it on the doorstep within 24 hours. Photograph what
            you receive and reply to your confirmation email.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Delivery</h2>
          <p className="body">
            Same-day across the GTA when you order by the cutoff (currently 1pm). Our driver waits
            up to nine minutes for a no-answer order, sends a discreet SMS, then leaves the sealed
            box with the building.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Cancellations</h2>
          <p className="body">
            Same-day orders can be cancelled up to 30 minutes before they enter production. Wedding
            and event deposits are 30% of the contract value and become non-refundable 60 days
            before the date. Subscriptions can be paused or cancelled any time from your account.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Trade accounts</h2>
          <p className="body">
            Wholesale customers operate on Net-30 terms once approved. Volume breaks apply at order
            time. Reserved boxes hold stock for 48 hours from confirmation.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Payments</h2>
          <p className="body">
            Card payments are handled by Stripe — we never see card details. Corporate and trade
            invoices are issued in Canadian dollars unless otherwise agreed.
          </p>

          <p className="caption" style={{ marginTop: 'var(--s-6)' }}>
            Last updated: the day this site launched.
          </p>
        </div>
      </div>
    </section>
  );
}
