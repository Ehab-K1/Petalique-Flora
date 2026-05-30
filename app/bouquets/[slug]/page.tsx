import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, productBySlug } from '@/lib/catalog';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: 'Bouquet' };
  return {
    title: product.name,
    description: `${product.blurb} ${product.description.slice(0, 110)}`,
    openGraph: { title: `${product.name} · Petalique Flora`, description: product.blurb },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.occasions.some((o) => product.occasions.includes(o)),
  ).slice(0, 4);

  return (
    <>
      <section className="section-sm bg-bone">
        <div className="container">
          <ProductDetail product={product} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-sm bg-cream">
          <div className="container">
            <Reveal>
              <div className="between" style={{ alignItems: 'baseline', marginBottom: 'var(--s-5)' }}>
                <h2 className="h2">Pairs well with</h2>
                <Link href="/bouquets" className="link-underline">
                  All bouquets →
                </Link>
              </div>
            </Reveal>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
