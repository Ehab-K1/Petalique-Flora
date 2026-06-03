import Link from 'next/link';
import type { Product } from '@/lib/types';
import { money } from '@/lib/pricing';
import { ProductImage } from './ProductImage';
import { ReviewStars } from './ReviewStars';
import { aggregateFor } from '@/lib/reviews';

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const agg = aggregateFor(product.slug);
  return (
    <Link href={`/bouquets/${product.slug}`} className="product-card product-card-v2" aria-label={product.name}>
      <div className="product-card-media">
        <ProductImage slug={product.slug} alt={`${product.name} bouquet`} priority={eager} ratio="4/5" />
        {product.badges?.[0] && <span className="product-badge badge">{product.badges[0]}</span>}
        <span className="product-card-cta" aria-hidden="true">View bouquet</span>
      </div>
      <div className="product-card-body">
        <div className="product-card-row">
          <h3 className="product-card-name">{product.name}</h3>
          <span className="product-card-price">from {money(product.basePrice)}</span>
        </div>
        <div className="product-card-meta">
          <ReviewStars rating={agg.rating} count={agg.count} size={12} showNumber={false} />
          <span className="product-card-rating">{agg.rating.toFixed(1)} · {agg.count.toLocaleString('en-CA')} reviews</span>
        </div>
      </div>
    </Link>
  );
}
