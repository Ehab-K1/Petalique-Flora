'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  slug: string;
  index?: number;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  ratio?: '4/5' | '1/1' | '3/4' | '16/9';
};

const FALLBACK_GRADIENT = 'radial-gradient(70% 70% at 30% 30%, #cfddd1, #7c9c89)';

export function ProductImage({
  slug,
  index = 1,
  alt,
  priority = false,
  sizes = '(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw',
  className = '',
  ratio = '4/5',
}: Props) {
  const [errored, setErrored] = useState(false);
  const src = `/v2/products/${slug}-${index}.webp`;

  if (errored) {
    return (
      <div
        className={`pimg pimg-fallback ${className}`}
        role="img"
        aria-label={alt}
        style={{
          aspectRatio: ratio,
          background: FALLBACK_GRADIENT,
        }}
      >
        <span className="pimg-fallback-label">{slug.replace(/-/g, ' ')}</span>
      </div>
    );
  }

  return (
    <div className={`pimg ${className}`} style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover' }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
