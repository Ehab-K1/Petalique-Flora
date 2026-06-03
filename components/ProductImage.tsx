import Image from 'next/image';
import { existsSync } from 'fs';
import path from 'path';

type Props = {
  slug: string;
  index?: number;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  ratio?: '4/5' | '1/1' | '3/4' | '16/9';
};

function publicExists(p: string) {
  try {
    return existsSync(path.join(process.cwd(), 'public', p));
  } catch {
    return false;
  }
}

const TONES: Record<string, [string, string]> = {
  blush: ['#f6dde0', '#e0b8be'],
  ember: ['#e8c7be', '#c98a7c'],
  sage: ['#d8e0cd', '#9eaa8a'],
  cream: ['#f0eadb', '#cdc2a8'],
  aubergine: ['#2b1f29', '#1a1320'],
  forest: ['#cfddd1', '#7c9c89'],
};

export function ProductImage({
  slug,
  index = 1,
  alt,
  priority = false,
  sizes = '(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw',
  className = '',
  ratio = '4/5',
}: Props) {
  const candidates = [
    `/v2/products/${slug}-${index}.webp`,
    `/v2/products/${slug}-${index}.jpg`,
    `/v2/products/${slug}.webp`,
    `/products/${slug}-${index}.webp`,
    `/products/${slug}.webp`,
  ];
  const found = candidates.find((c) => publicExists(c));

  if (!found) {
    const [a, b] = TONES.forest;
    return (
      <div
        className={`pimg pimg-fallback ${className}`}
        role="img"
        aria-label={alt}
        style={{
          aspectRatio: ratio,
          background: `radial-gradient(70% 70% at 30% 30%, ${a}, ${b})`,
        }}
      >
        <span className="pimg-fallback-label">{slug.replace(/-/g, ' ')}</span>
      </div>
    );
  }

  return (
    <div className={`pimg ${className}`} style={{ aspectRatio: ratio }}>
      <Image
        src={found}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
