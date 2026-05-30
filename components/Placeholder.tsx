// Art-directed placeholder. Stands in for commissioned editorial photography
// (35/50mm, single overcast window light, warm shadows, >35% negative space).
// The mono label states exactly what photograph belongs here.

export function Placeholder({
  label,
  ratio = '4 / 5',
  tone = 'cream',
  className = '',
  rounded = true,
  caption,
}: {
  label: string;
  ratio?: string;
  tone?: 'blush' | 'ember' | 'sage' | 'cream' | 'aubergine';
  className?: string;
  rounded?: boolean;
  caption?: string;
}) {
  return (
    <figure
      className={`ph ph-${tone} ${rounded ? 'ph-r' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="ph-mark" aria-hidden="true" />
      <span className="ph-label mono">{label}</span>
      {caption && <figcaption className="ph-caption display-italic">{caption}</figcaption>}
    </figure>
  );
}
