import Link from 'next/link';
import { PetalMark } from '@/components/PetalMark';

export default function NotFound() {
  return (
    <section className="section bg-bone">
      <div className="container" style={{ maxWidth: 620, textAlign: 'center' }}>
        <PetalMark size={36} />
        <div className="eyebrow" style={{ justifyContent: 'center', marginTop: 18 }}>
          <span className="dot">●</span> Page not found
        </div>
        <h1 className="h1 serif-em" style={{ margin: '14px 0 14px', maxWidth: '20ch', marginInline: 'auto' }}>
          We can’t find that <em>arrangement</em>.
        </h1>
        <p className="body-lg" style={{ marginBottom: 28 }}>
          The page may have moved, or the link is mistyped. Start from the bouquets — or message us
          and we’ll point you to it.
        </p>
        <div className="center gap-3 wrap" style={{ justifyContent: 'center' }}>
          <Link href="/bouquets" className="btn">Shop bouquets</Link>
          <Link href="/" className="btn btn-ghost">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
