import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Petalique Flora handles your information.',
};

export default function PrivacyPage() {
  return (
    <section className="section-sm bg-bone">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="marker">Legal</div>
        <h1 className="h1" style={{ marginTop: 8 }}>Privacy</h1>

        <div className="legal-body">
          <p className="body-lg">
            We keep what we need, never sell it, and delete it on request. The short version is below;
            the long version is a paragraph longer, on request to <a className="link-underline" href="mailto:privacy@petalique.com">privacy@petalique.com</a>.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>What we collect</h2>
          <p className="body">
            Order details (recipient, address, delivery date, message), your contact, and the email
            you give us. No card details — those go to Stripe. We use first-party analytics to know
            which pages help people pick a bouquet.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Why we collect it</h2>
          <p className="body">
            To make and deliver your order, to remember it for an anniversary reorder, and to reply
            when you message us. That’s it.
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Who sees it</h2>
          <p className="body">
            The florist who makes it, the driver who carries it, and the systems we use to invoice
            and confirm. We don’t share data with advertisers. Subprocessors: Stripe (payments),
            Resend (email), Twilio (SMS), Vercel (hosting).
          </p>

          <h2 className="h3" style={{ marginTop: 'var(--s-6)' }}>Your rights</h2>
          <p className="body">
            Access, correct, export or delete what we hold by emailing the address above. We respond
            within seven working days.
          </p>

          <p className="caption" style={{ marginTop: 'var(--s-6)' }}>
            Last updated: the day this site launched.
          </p>
        </div>
      </div>
    </section>
  );
}
