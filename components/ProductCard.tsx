import Link from 'next/link';
import type { Product } from '@/lib/types';
import { money } from '@/lib/pricing';
import { Placeholder } from './Placeholder';

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <Link href={`/bouquets/${product.slug}`} className="product-card card-hover" aria-label={product.name}>
      <div className="product-card-media">
        <Placeholder label={product.shotLabel} tone={product.imageTone} caption={product.blurb} />
        {product.badges?.[0] && <span className="product-badge badge">{product.badges[0]}</span>}
      </div>
      <div className="product-card-body">
        <div className="between" style={{ alignItems: 'baseline', gap: 12 }}>
          <h3 className="display" style={{ fontSize: 22, lineHeight: 1.1 }}>
            {product.name}
          </h3>
          <span className="display" style={{ fontSize: 18, whiteSpace: 'nowrap' }}>
            from {money(product.basePrice)}
          </span>
        </div>
        <p className="display-italic muted" style={{ fontSize: 14, marginTop: 2 }}>
          {product.latin}
        </p>
      </div>
    </Link>
  );
}
