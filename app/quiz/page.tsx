import type { Metadata } from 'next';
import { BouquetQuiz } from '@/components/BouquetQuiz';

export const metadata: Metadata = {
  title: 'Find the right bouquet · 60-second quiz',
  description:
    'Not sure what to send? Four short questions and we recommend three bouquets we would send ourselves. Takes about sixty seconds.',
};

export default function QuizPage() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Bouquet quiz</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '20ch' }}>
            Not sure what to send? We&rsquo;ll choose.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            Four short questions about how the moment should feel. About sixty seconds, and
            we&rsquo;ll recommend three bouquets we would send ourselves.
          </p>
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="container">
          <BouquetQuiz />
        </div>
      </section>
    </>
  );
}
