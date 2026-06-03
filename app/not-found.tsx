import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section bg-bone">
      <div className="container" style={{ maxWidth: 620, textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          <span className="dot">●</span> Page not found
        </div>
        <h1 className="h1" style={{ margin: '14px 0 14px', maxWidth: '22ch', marginInline: 'auto' }}>
          We can&rsquo;t find that page.
        </h1>
        <p className="body-lg" style={{ marginBottom: 28 }}>
          It may have moved, or the link is mistyped. Start from the bouquets &mdash; or message us
          and we&rsquo;ll point you to it.
        </p>
        <div className="center gap-3 wrap" style={{ justifyContent: 'center' }}>
          <Link href="/bouquets" className="btn">Shop bouquets</Link>
          <Link href="/" className="btn btn-ghost">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
