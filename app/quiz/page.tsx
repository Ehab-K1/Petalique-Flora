import type { Metadata } from 'next';
import { BouquetQuiz } from '@/components/BouquetQuiz';

export const metadata: Metadata = {
  title: 'Bouquet quiz · 60 seconds',
  description:
    'Not sure what to send? Four questions about how the moment should feel and we’ll choose three bouquets we’d send ourselves.',
};

export default function QuizPage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">02.A — Bouquet quiz</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '18ch' }}>
            Not sure what to send? <em>We’ll choose.</em>
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            Four questions about how the moment should feel, not what colours you like. About sixty
            seconds. We’ll recommend three bouquets we’d send ourselves.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <BouquetQuiz />
        </div>
      </section>
    </>
  );
}
